import twilio from "twilio";

export interface BookingSmsInput {
  toolName: string;
  startDate: string;
  endDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  fulfillment: "pickup" | "delivery";
}

// Internal owner notifications only — not customer marketing — so no
// opt-out/STOP language is needed here.
const OWNER_PHONE_NUMBERS = ["+19493553733", "+19495003584"];

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Texts both owners when a booking is confirmed. Silently no-ops (with a
 * console warning) if Twilio isn't configured yet, so a missing SMS setup
 * never blocks a real customer's booking. Runs alongside — not instead of —
 * the existing Resend email notification.
 */
export async function sendBookingSmsNotification(input: BookingSmsInput): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.warn(
      "[sms] TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, or TWILIO_FROM_NUMBER not set — skipping booking text notification."
    );
    return;
  }

  const client = twilio(accountSid, authToken);

  const body = [
    `New booking: ${input.toolName}`,
    `${formatDate(input.startDate)} → ${formatDate(input.endDate)} · ${
      input.fulfillment === "delivery" ? "Delivery" : "Pickup"
    }`,
    `${input.customerName} · ${input.customerPhone} · ${input.customerEmail}`,
  ].join("\n");

  const results = await Promise.allSettled(
    OWNER_PHONE_NUMBERS.map((to) =>
      client.messages.create({ to, from: fromNumber, body })
    )
  );

  for (const [i, result] of results.entries()) {
    if (result.status === "rejected") {
      // A failed text should never fail the booking itself — the booking
      // and the Resend email are already handled independently of this.
      console.error(`[sms] Failed to text ${OWNER_PHONE_NUMBERS[i]}:`, result.reason);
    }
  }
}
