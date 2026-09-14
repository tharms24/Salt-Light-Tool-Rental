"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tools, bookings } from "@/db/schema";
import { getUnavailableRanges, isRangeAvailable, isoDate } from "@/lib/availability";
import { sendBookingNotification } from "@/lib/email";

const bookingSchema = z
  .object({
    toolId: z.number().int().positive(),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    customerName: z.string().trim().min(1, "Name is required").max(200),
    customerEmail: z.string().trim().email("Enter a valid email"),
    customerPhone: z.string().trim().min(7, "Enter a valid phone number").max(40),
    fulfillment: z.enum(["pickup", "delivery"]),
    deliveryAddress: z.string().trim().max(500).optional(),
  })
  .refine((v) => v.startDate <= v.endDate, {
    message: "End date must be on or after the start date",
    path: ["endDate"],
  })
  .refine((v) => v.fulfillment !== "delivery" || (v.deliveryAddress && v.deliveryAddress.length > 0), {
    message: "Delivery address is required for delivery",
    path: ["deliveryAddress"],
  });

export type BookingFormInput = z.infer<typeof bookingSchema>;

export type CreateBookingResult =
  | { ok: true; bookingId: number; totalPrice: string | null }
  | { ok: false; error: string };

function todayIso(): string {
  return isoDate(new Date());
}

function countDaysInclusive(start: string, end: string): number {
  const startMs = Date.parse(start + "T00:00:00Z");
  const endMs = Date.parse(end + "T00:00:00Z");
  return Math.round((endMs - startMs) / 86_400_000) + 1;
}

export async function createBooking(input: BookingFormInput): Promise<CreateBookingResult> {
  const parsed = bookingSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid booking details." };
  }
  const data = parsed.data;

  if (data.startDate < todayIso()) {
    return { ok: false, error: "Start date can't be in the past." };
  }

  try {
    const result = await db.transaction(async (tx) => {
      // Lock the tool row so two simultaneous bookings for the same tool
      // are processed one at a time, not interleaved.
      const [tool] = await tx
        .select()
        .from(tools)
        .where(eq(tools.id, data.toolId))
        .for("update");

      if (!tool || !tool.active) {
        throw new BookingError("This tool isn't available for booking right now.");
      }

      const unavailable = await getUnavailableRanges(tx as unknown as typeof db, data.toolId);
      const requested = { startDate: data.startDate, endDate: data.endDate };

      if (!isRangeAvailable(requested, unavailable)) {
        throw new BookingError(
          "Sorry, one or more of those dates were just booked. Please pick different dates."
        );
      }

      const days = countDaysInclusive(data.startDate, data.endDate);
      const totalPrice = (Number(tool.dayRate) * days).toFixed(2);

      const [booking] = await tx
        .insert(bookings)
        .values({
          toolId: data.toolId,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          startDate: data.startDate,
          endDate: data.endDate,
          fulfillment: data.fulfillment,
          deliveryAddress: data.fulfillment === "delivery" ? data.deliveryAddress ?? null : null,
          totalPrice,
          status: "confirmed",
        })
        .returning();

      return { booking, toolName: tool.name };
    });

    // Notification email is best-effort and happens after the booking is
    // already safely committed — a failed email must never undo a booking.
    await sendBookingNotification({
      toolName: result.toolName,
      startDate: result.booking.startDate,
      endDate: result.booking.endDate,
      customerName: result.booking.customerName,
      customerEmail: result.booking.customerEmail,
      customerPhone: result.booking.customerPhone,
      fulfillment: result.booking.fulfillment,
      deliveryAddress: result.booking.deliveryAddress,
      totalPrice: result.booking.totalPrice,
    });

    return { ok: true, bookingId: result.booking.id, totalPrice: result.booking.totalPrice };
  } catch (err) {
    if (err instanceof BookingError) {
      return { ok: false, error: err.message };
    }
    console.error("[createBooking] Unexpected error:", err);
    return { ok: false, error: "Something went wrong saving your booking. Please try again." };
  }
}

class BookingError extends Error {}
