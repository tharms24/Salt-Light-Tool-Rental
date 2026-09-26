import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Salt & Light Tool Rental",
  description:
    "How Salt & Light Tool Rental collects, uses, and protects your information, including our text message communications policy.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb">Privacy Policy</div>
          <h1>Privacy Policy</h1>
          <p>Last updated September 2026.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <p>
              Salt &amp; Light Tool Rental (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
              operates saltandlighttoolrental.com and provides tool rental services in Orange
              County, CA. This Privacy Policy explains what information we collect, how we use
              it, and the choices you have.
            </p>

            <h2>Information We Collect</h2>
            <p>When you book a tool rental through our website, we collect:</p>
            <ul>
              <li>Your name, email address, and phone number</li>
              <li>Your requested rental dates and the tool you&apos;re booking</li>
              <li>
                Your delivery address, if you choose delivery instead of pickup
              </li>
            </ul>
            <p>
              We do not collect payment information through the website — payment, ID
              verification, and the security deposit are handled in person at pickup, per our{" "}
              <a href="/policies" style={{ textDecoration: "underline" }}>
                Rental Agreement
              </a>
              .
            </p>

            <h2>How We Use Your Information</h2>
            <p>We use the information you provide to:</p>
            <ul>
              <li>Confirm and manage your tool rental booking</li>
              <li>Contact you about your reservation, pickup, or delivery</li>
              <li>Notify our own staff (the business owners) that a new booking was made</li>
              <li>Maintain records required by our Rental Agreement</li>
            </ul>
            <p>
              We do not sell your information, and we do not share your mobile phone number
              with third parties for their own marketing purposes.
            </p>

            <h2>Text Message (SMS) Communications</h2>
            <p>
              Our automated text message notifications are currently used only for internal
              business operations — specifically, to notify our own owners/operators when a
              customer completes a booking. We do not currently send marketing or promotional
              text messages to customers.
            </p>
            <ul>
              <li>Mobile phone numbers are never shared or sold to third parties for marketing purposes.</li>
              <li>
                Message frequency depends on booking activity; internal notification recipients
                receive one message per confirmed booking.
              </li>
              <li>Message and data rates may apply.</li>
            </ul>
            <p>
              If this policy changes in the future to include customer-facing text messages,
              this page will be updated to describe how customers can opt in and opt out, and
              standard consent practices will apply.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              We use trusted third-party services to operate our website and business, including
              hosting and database providers, email delivery (for booking confirmations sent to
              our team), and SMS delivery (for the internal notifications described above). These
              providers process data only as needed to provide their service to us and are not
              authorized to use your information for their own purposes.
            </p>

            <h2>Data Retention</h2>
            <p>
              We retain booking records for as long as reasonably necessary for business,
              accounting, and legal purposes, consistent with our Rental Agreement.
            </p>

            <h2>Your Choices</h2>
            <p>
              To request that we delete your information or to ask any question about how your
              data is handled, contact us at{" "}
              <a href="mailto:hello@saltandlighttoolrental.com">
                hello@saltandlighttoolrental.com
              </a>
              .
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on
              this page with an updated effective date.
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
