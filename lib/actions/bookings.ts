"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";

export async function cancelBooking(bookingId: number) {
  await requireAdmin();
  await db
    .update(bookings)
    .set({ status: "cancelled" })
    .where(eq(bookings.id, bookingId));
  revalidatePath("/admin/bookings");
  revalidatePath("/tools");
}
