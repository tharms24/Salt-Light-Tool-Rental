import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Contact | Salt & Light Tool Rental",
  description: "Get in touch with Salt & Light Tool Rental in Orange County, CA.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb">Contact</div>
          <h1>Questions? Let&apos;s Talk.</h1>
          <p>
            Ready to book? Head to the{" "}
            <Link href="/tools" style={{ color: "inherit", textDecoration: "underline" }}>
              tool catalog
            </Link>{" "}
            and reserve your dates right on the page. Otherwise, reach out below.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-card">
              <div className="icon"><Icon name="phone" /></div>
              <h3>Call or Text</h3>
              <p>Fastest way to check same-day availability.</p>
              <a className="value" href="tel:+19493553733">
                Tyler &mdash; (949) 355-3733
              </a>
              <br />
              <a className="value" href="tel:+19495003584">
                Nick &mdash; (949) 500-3584
              </a>
            </div>
            <div className="contact-card">
              <div className="icon"><Icon name="mail" /></div>
              <h3>Email</h3>
              <p>Questions about a tool or your rental.</p>
              <a className="value" href="mailto:hello@saltandlighttoolrental.com">
                hello@saltandlighttoolrental.com
              </a>
            </div>
            <div className="contact-card">
              <div className="icon"><Icon name="message" /></div>
              <h3>Social / DM</h3>
              <p>Message us on Instagram or Facebook.</p>
              <a className="value" href="#">
                [@yourhandle]
              </a>
            </div>
            <div className="contact-card">
              <div className="icon"><Icon name="mappin" /></div>
              <h3>Service Area</h3>
              <p>Pickup available by appointment.</p>
              <span className="value">Orange County, CA</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">Reserving a Tool</div>
            <h2>How to Book</h2>
          </div>
          <div className="reserve-steps">
            <div className="reserve-step">
              <div className="num">1</div>
              <div>
                <h4>Pick your tool &amp; dates</h4>
                <p>
                  Open any tool in the{" "}
                  <Link href="/tools" style={{ textDecoration: "underline" }}>
                    catalog
                  </Link>{" "}
                  and use the calendar to see what&apos;s open and lock in your dates.
                </p>
              </div>
            </div>
            <div className="reserve-step">
              <div className="num">2</div>
              <div>
                <h4>Choose pickup or delivery</h4>
                <p>Tell us how you&apos;d like to get the tool and leave your contact info.</p>
              </div>
            </div>
            <div className="reserve-step">
              <div className="num">3</div>
              <div>
                <h4>Sign, pick up &amp; get to work</h4>
                <p>
                  We review the tool&apos;s condition together, sign the{" "}
                  <Link href="/policies" style={{ textDecoration: "underline" }}>
                    rental agreement
                  </Link>
                  , and you&apos;re on your way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
