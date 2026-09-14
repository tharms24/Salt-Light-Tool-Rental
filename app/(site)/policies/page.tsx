import type { Metadata } from "next";
import { Icon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Rental Policies | Salt & Light Tool Rental",
  description:
    "Rental policies for Salt & Light Tool Rental — ID & deposit requirements, rental periods, late fees, permitted use, and damage/loss terms.",
};

export default function PoliciesPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb">Policies</div>
          <h1>Rental Policies &amp; Agreement</h1>
          <p>
            A quick summary of how rentals work. Every rental is governed by our full Equipment
            Rental Agreement, signed at pickup.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="policy-list">
            <div className="policy-item">
              <div className="icon"><Icon name="idcard" /></div>
              <div>
                <h3>Valid ID Required</h3>
                <p>
                  A legible photo or copy of your government-issued photo ID is taken and kept on
                  file for the duration of the rental, in accordance with applicable privacy laws.
                </p>
              </div>
            </div>

            <div className="policy-item">
              <div className="icon"><Icon name="creditcard" /></div>
              <div>
                <h3>Deposit &amp; Card on File</h3>
                <p>
                  A security deposit and a valid credit or debit card are required at signing. The
                  card may be charged for the rental fee, late fees, cleaning, consumables, repair
                  costs, or the full replacement value in the event of loss, theft, or damage
                  beyond normal wear and tear. Deposits are refunded within 5 business days of
                  return, less any amounts owed.
                </p>
              </div>
            </div>

            <div className="policy-item">
              <div className="icon"><Icon name="clock" /></div>
              <div>
                <h3>Rental Period &amp; Late Returns</h3>
                <p>
                  Tools are rented by the 4-hour block, day, weekend, or week. Equipment not
                  returned by the scheduled time incurs a late fee in addition to the rental rate.
                  Equipment not returned within 48 hours of the scheduled return, without
                  communication, may be treated as lost or converted &mdash; making the renter
                  responsible for its full replacement value.
                </p>
              </div>
            </div>

            <div className="policy-item">
              <div className="icon"><Icon name="ban" /></div>
              <div>
                <h3>Permitted Use</h3>
                <ul>
                  <li>Equipment may only be used by the renter or a supervised employee/agent</li>
                  <li>No subleasing, re-renting, or transferring to a third party</li>
                  <li>No use beyond rated capacity or against manufacturer instructions</li>
                  <li>Safety guards, labels, and warnings must stay in place</li>
                  <li>No use while impaired by drugs or alcohol</li>
                  <li>Equipment stays within the disclosed service area unless agreed in writing</li>
                </ul>
              </div>
            </div>

            <div className="policy-item">
              <div className="icon"><Icon name="clipboardcheck" /></div>
              <div>
                <h3>Renter Responsibilities</h3>
                <ul>
                  <li>Inspect the tool at pickup and report any pre-existing damage immediately</li>
                  <li>Operate it safely and per the manufacturer&apos;s manual</li>
                  <li>
                    Supply consumables (fuel, blades, bits, etc.) unless agreed otherwise, and
                    return it reasonably clean
                  </li>
                  <li>Secure the equipment against theft when not in active use</li>
                  <li>Notify us immediately of any damage, malfunction, theft, or accident</li>
                </ul>
              </div>
            </div>

            <div className="policy-item">
              <div className="icon"><Icon name="alerttriangle" /></div>
              <div>
                <h3>Damage, Loss &amp; Theft</h3>
                <p>
                  The renter is responsible for the equipment from pickup until we confirm its
                  return, and agrees to cover the actual repair cost for damage beyond normal wear
                  and tear, or the full replacement value if the tool is lost, stolen, or damaged
                  beyond economical repair. Theft must be reported to police within 24 hours, with
                  a copy of the report provided to us.
                </p>
              </div>
            </div>

            <div className="policy-item">
              <div className="icon"><Icon name="shieldalert" /></div>
              <div>
                <h3>Assumption of Risk</h3>
                <p>
                  Power tools and equipment can cause serious injury if used improperly. By
                  renting, you voluntarily assume the risks of using, transporting, and storing the
                  equipment, and release Salt &amp; Light Tool Rental from claims arising from
                  your use, except where caused by our gross negligence or willful misconduct. We
                  encourage carrying appropriate liability insurance.
                </p>
              </div>
            </div>
          </div>

          <div className="doc-callout">
            <div>
              <h3>Want the full agreement?</h3>
              <p>Download our complete Equipment Rental Agreement, signed at every pickup.</p>
            </div>
            <a
              className="btn btn-navy"
              href="/assets/docs/Salt-and-Light-Rental-Agreement.pdf"
              target="_blank"
              rel="noopener"
            >
              Download PDF
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
