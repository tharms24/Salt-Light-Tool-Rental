"use client";

import { useMemo, useState } from "react";
import { createBooking } from "@/lib/actions/booking";
import Calendar, { type DateRangeValue } from "@/components/Calendar";
import { Icon } from "@/lib/icons";

interface BookingWidgetProps {
  tool: {
    id: number;
    name: string;
    slug: string;
    dayRate: string;
  };
}

type Step = "dates" | "details" | "summary" | "success";

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function countDaysInclusive(start: string, end: string): number {
  const startMs = Date.parse(start + "T00:00:00Z");
  const endMs = Date.parse(end + "T00:00:00Z");
  return Math.round((endMs - startMs) / 86_400_000) + 1;
}

export default function BookingWidget({ tool }: BookingWidgetProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("dates");
  const [range, setRange] = useState<DateRangeValue>({ start: null, end: null });
  const [calendarError, setCalendarError] = useState<string | null>(null);

  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedTotal, setConfirmedTotal] = useState<string | null>(null);

  const days = range.start && range.end ? countDaysInclusive(range.start, range.end) : 0;
  const estimatedTotal = useMemo(() => {
    if (!days) return null;
    return (Number(tool.dayRate) * days).toFixed(2);
  }, [days, tool.dayRate]);

  function reset() {
    setStep("dates");
    setRange({ start: null, end: null });
    setCalendarError(null);
    setFulfillment("pickup");
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setSubmitError(null);
    setConfirmedTotal(null);
  }

  function closeModal() {
    setOpen(false);
    // Give the close animation (if any) a beat before wiping state.
    setTimeout(reset, 200);
  }

  async function handleConfirm() {
    if (!range.start || !range.end) return;
    setSubmitting(true);
    setSubmitError(null);

    const result = await createBooking({
      toolId: tool.id,
      startDate: range.start,
      endDate: range.end,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      fulfillment,
      deliveryAddress: fulfillment === "delivery" ? address : undefined,
    });

    setSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.error);
      return;
    }

    setConfirmedTotal(result.totalPrice);
    setStep("success");
  }

  return (
    <>
      <button className="btn btn-gold btn-block booking-trigger" onClick={() => setOpen(true)}>
        Rent This Tool
      </button>

      {open && (
        <div className="booking-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="booking-modal" role="dialog" aria-modal="true" aria-label={`Book ${tool.name}`}>
            <button className="booking-modal-close" onClick={closeModal} aria-label="Close">
              &times;
            </button>

            {step !== "success" && (
              <>
                <h3>{tool.name}</h3>
                <p className="booking-subtitle">Reserve your dates &mdash; no payment required now.</p>
                <div className="booking-steps">
                  <span className={step === "dates" ? "is-active" : "is-done"} />
                  <span className={step === "details" ? "is-active" : step === "summary" ? "is-done" : ""} />
                  <span className={step === "summary" ? "is-active" : ""} />
                </div>
              </>
            )}

            {step === "dates" && (
              <>
                <Calendar toolId={tool.id} value={range} onChange={setRange} onError={setCalendarError} />
                {calendarError && <div className="booking-error">{calendarError}</div>}
                <div className="booking-field">
                  <label>Selected dates</label>
                  <div>
                    {range.start
                      ? `${formatDate(range.start)}${range.end ? ` → ${formatDate(range.end)}` : " (pick an end date, or click it again for a single day)"}`
                      : "Click a start date on the calendar"}
                  </div>
                </div>
                <div className="booking-actions">
                  <button
                    className="btn btn-navy"
                    disabled={!range.start}
                    onClick={() => {
                      // Allow single-day rentals: clicking only a start date is enough.
                      if (range.start && !range.end) setRange({ start: range.start, end: range.start });
                      setStep("details");
                    }}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {step === "details" && (
              <>
                <div className="fulfillment-toggle">
                  <button
                    type="button"
                    className={fulfillment === "pickup" ? "is-active" : ""}
                    onClick={() => setFulfillment("pickup")}
                  >
                    Pickup
                  </button>
                  <button
                    type="button"
                    className={fulfillment === "delivery" ? "is-active" : ""}
                    onClick={() => setFulfillment("delivery")}
                  >
                    Delivery
                  </button>
                </div>

                {fulfillment === "pickup" ? (
                  <p style={{ fontSize: "0.88rem", color: "var(--gray)", marginBottom: 16 }}>
                    Pickup is by appointment in Orange County. We&apos;ll confirm a time and exact
                    location after you submit this reservation.
                  </p>
                ) : (
                  <div className="booking-field">
                    <label>Delivery Address</label>
                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street address, city, ZIP" />
                  </div>
                )}

                <div className="booking-field">
                  <label>Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="booking-field">
                  <label>Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="booking-field">
                  <label>Phone</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="booking-actions">
                  <button className="btn btn-ghost" onClick={() => setStep("dates")}>
                    Back
                  </button>
                  <button
                    className="btn btn-navy"
                    disabled={!name || !email || !phone || (fulfillment === "delivery" && !address)}
                    onClick={() => setStep("summary")}
                  >
                    Review
                  </button>
                </div>
              </>
            )}

            {step === "summary" && range.start && range.end && (
              <>
                <div className="booking-summary">
                  <dl>
                    <dt>Tool</dt>
                    <dd>{tool.name}</dd>
                    <dt>Dates</dt>
                    <dd>
                      {formatDate(range.start)} &rarr; {formatDate(range.end)}
                    </dd>
                    <dt>Days</dt>
                    <dd>{days}</dd>
                    <dt>{fulfillment === "delivery" ? "Delivery" : "Pickup"}</dt>
                    <dd>{fulfillment === "delivery" ? address : "In person, Orange County"}</dd>
                    <dt>Contact</dt>
                    <dd>
                      {name} &middot; {phone}
                    </dd>
                    <div className="total-row" style={{ display: "contents" }}>
                      <dt>Est. Total</dt>
                      <dd>${estimatedTotal}</dd>
                    </div>
                  </dl>
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--gray)", marginBottom: 16 }}>
                  This locks in your dates. Payment, ID, and a security deposit are handled in
                  person at pickup per our{" "}
                  <a href="/policies" style={{ textDecoration: "underline" }}>
                    rental agreement
                  </a>
                  .
                </p>
                {submitError && <div className="booking-error">{submitError}</div>}
                <div className="booking-actions">
                  <button className="btn btn-ghost" onClick={() => setStep("details")} disabled={submitting}>
                    Back
                  </button>
                  <button className="btn btn-gold" onClick={handleConfirm} disabled={submitting}>
                    {submitting ? "Booking..." : "Confirm Booking"}
                  </button>
                </div>
              </>
            )}

            {step === "success" && (
              <div className="booking-success">
                <div className="icon-circle">
                  <Icon name="shieldcheck" />
                </div>
                <h3>You&apos;re Booked!</h3>
                <p style={{ color: "var(--gray)", marginBottom: 4 }}>
                  {tool.name}, {range.start && formatDate(range.start)} &rarr; {range.end && formatDate(range.end)}
                </p>
                {confirmedTotal && (
                  <p style={{ color: "var(--gray)" }}>Estimated total: ${confirmedTotal}</p>
                )}
                <p style={{ fontSize: "0.88rem", color: "var(--gray)", margin: "16px 0" }}>
                  We&apos;ve got your details and will follow up to confirm pickup or delivery.
                  A confirmation has been sent to our team.
                </p>
                <button className="btn btn-navy" onClick={closeModal}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
