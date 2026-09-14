import { Resend } from "resend";

export interface BookingNotificationInput {
  toolName: string;
  startDate: string;
  endDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  fulfillment: "pickup" | "delivery";
  deliveryAddress: string | null;
  totalPrice: string | null;
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Emails the business owner(s) when a booking is confirmed. Silently no-ops
 * (with a console warning) if RESEND_API_KEY isn't configured yet, so a
 * missing notification setup never blocks a real customer's booking.
 */
export async function sendBookingNotification(input: BookingNotificationInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;
  const from = process.env.NOTIFICATION_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.warn(
      "[email] RESEND_API_KEY or NOTIFICATION_EMAIL not set — skipping booking notification email."
    );
    return;
  }

  const resend = new Resend(apiKey);

  const lines = [
    `Tool: ${input.toolName}`,
    `Dates: ${formatDate(input.startDate)} → ${formatDate(input.endDate)}`,
    `Customer: ${input.customerName}`,
    `Email: ${input.customerEmail}`,
    `Phone: ${input.customerPhone}`,
    `Fulfillment: ${input.fulfillment === "delivery" ? "Delivery" : "Pickup"}`,
  ];
  if (input.fulfillment === "delivery" && input.deliveryAddress) {
    lines.push(`Delivery address: ${input.deliveryAddress}`);
  }
  if (input.totalPrice) {
    lines.push(`Estimated total: $${input.totalPrice}`);
  }

  const text = `New booking confirmed on Salt & Light Tool Rental:\n\n${lines.join("\n")}`;
  const html = `
    <h2 style="font-family:sans-serif;color:#16233f;">New Booking Confirmed</h2>
    <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;">
      ${lines.map((l) => {
        const [label, ...rest] = l.split(": ");
        return `<tr><td style="padding:4px 12px 4px 0;color:#5b6472;">${label}</td><td style="padding:4px 0;font-weight:600;">${rest.join(": ")}</td></tr>`;
      }).join("")}
    </table>
  `;

  try {
    await resend.emails.send({
      from: `Salt & Light Tool Rental <${from}>`,
      to,
      subject: `New Booking: ${input.toolName} (${formatDate(input.startDate)})`,
      text,
      html,
    });
  } catch (err) {
    // A failed notification email should never fail the booking itself —
    // the booking is already safely recorded in the database by this point.
    console.error("[email] Failed to send booking notification:", err);
  }
}
