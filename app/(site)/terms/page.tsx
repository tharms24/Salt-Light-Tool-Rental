import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Salt & Light Tool Rental",
  description:
    "Terms and conditions for using the Salt & Light Tool Rental website and booking system.",
};

export default function TermsPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb">Terms &amp; Conditions</div>
          <h1>Terms &amp; Conditions</h1>
          <p>Last updated September 2026.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p>
              These Terms &amp; Conditions govern your use of saltandlighttoolrental.com (the
              &quot;Site&quot;) and our online booking system, operated by Salt &amp; Light Tool
              Rental (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) in Orange County, CA. By
              using the Site or booking a rental through it, you agree to these terms.
            </p>

            <h2>Booking a Tool</h2>
            <p>
              Selecting dates and submitting your information through the Site reserves those
              dates for the selected tool. Submitting a booking does not require payment through
              the Site. The full rental relationship — including ID verification, security
              deposit, payment, and equipment condition — is governed by our{" "}
              <a href="/policies" style={{ textDecoration: "underline" }}>
                Equipment Rental Agreement
              </a>
              , signed at pickup.
            </p>

            <h2>Availability</h2>
            <p>
              We make reasonable efforts to keep the booking calendar accurate. Dates are
              re-checked at the moment you confirm a booking to prevent double-booking, but we
              reserve the right to cancel or reschedule a booking in rare cases (for example,
              equipment damage or an administrative error) and will contact you promptly if that
              happens.
            </p>

            <h2>Text &amp; Email Communications</h2>
            <p>
              When you submit a booking, we may contact you by email or phone regarding your
              reservation. Automated text message notifications triggered by the booking system
              are currently sent only to our own business owners/operators for internal
              operational purposes, not to customers. See our{" "}
              <a href="/privacy-policy" style={{ textDecoration: "underline" }}>
                Privacy Policy
              </a>{" "}
              for details.
            </p>

            <h2>Acceptable Use</h2>
            <p>You agree not to use the Site to:</p>
            <ul>
              <li>Submit false or fraudulent booking information</li>
              <li>Attempt to disrupt or gain unauthorized access to the Site or its systems</li>
              <li>Use the Site for any unlawful purpose</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              The Site&apos;s content, design, and branding are owned by Salt &amp; Light Tool
              Rental and may not be reproduced without permission.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              The Site is provided &quot;as is.&quot; To the fullest extent permitted by law, Salt
              &amp; Light Tool Rental is not liable for indirect, incidental, or consequential
              damages arising from your use of the Site. Liability related to the rented
              equipment itself is governed separately by the Equipment Rental Agreement signed at
              pickup.
            </p>

            <h2>Governing Law</h2>
            <p>These terms are governed by the laws of the State of California.</p>

            <h2>Changes to These Terms</h2>
            <p>
              We may update these Terms &amp; Conditions from time to time. Changes will be
              posted on this page with an updated effective date.
            </p>

            <h2>Contact Us</h2>
            <p>
              Salt &amp; Light Tool Rental &mdash; Orange County, CA
              <br />
              Email:{" "}
              <a href="mailto:hello@saltandlighttoolrental.com">
                hello@saltandlighttoolrental.com
              </a>
              <br />
              Phone: (949) 355-3733
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
