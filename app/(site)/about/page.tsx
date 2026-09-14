import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Icon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "About Us | Salt & Light Tool Rental",
  description:
    "Salt & Light Tool Rental is a local, faith-driven tool rental business serving Orange County, CA. Built to Work. Called to Serve.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb">About Us</div>
          <h1>Built to Work. Called to Serve.</h1>
          <p>The story behind the name, and the standard behind every tool we hand you.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="verse-card">
            <p className="verse">
              &ldquo;You are the salt of the earth&hellip; You are the light of the world&hellip; let your
              light shine before others, that they may see your good deeds.&rdquo;
            </p>
            <cite>Matthew 5:13&ndash;16</cite>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container story">
          <div className="story-art">
            <Image
              src="/assets/img/logo-large.png"
              alt="Salt & Light Tool Rental badge — cross on a coastal bluff with a wave"
              width={300}
              height={300}
            />
          </div>
          <div className="story-copy">
            <div className="eyebrow">Our Story</div>
            <h2>A small, local business with a bigger purpose</h2>
            <p>
              Salt &amp; Light Tool Rental started with a simple idea: make it easy for
              homeowners, contractors, and DIYers across Orange County to get their hands on
              quality tools without the cost of buying or the hassle of a big-box rental counter.
            </p>
            <p>
              The name comes straight from our logo &mdash; a cross on the shoreline, waves
              rolling in behind it. It&apos;s a daily reminder that how we do business matters as
              much as what we do. Fair prices, honest condition reports, and tools that actually
              work when you need them &mdash; that&apos;s the goal every time.
            </p>
            <p>
              We&apos;re not a franchise or a warehouse. When you message us, you&apos;re talking
              directly to the people who maintain the equipment and stand behind it.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">What We Stand On</div>
            <h2>Our Values</h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="icon"><Icon name="compass" /></div>
              <h3>Integrity</h3>
              <p>Straightforward pricing and honest answers &mdash; no fine-print surprises.</p>
            </div>
            <div className="value-card">
              <div className="icon"><Icon name="shield" /></div>
              <h3>Reliability</h3>
              <p>Every tool is inspected and ready to perform before it leaves our hands.</p>
            </div>
            <div className="value-card">
              <div className="icon"><Icon name="heart" /></div>
              <h3>Service</h3>
              <p>We treat every job &mdash; big or small &mdash; like it matters, because it does.</p>
            </div>
            <div className="value-card">
              <div className="icon"><Icon name="people" /></div>
              <h3>Community</h3>
              <p>Proud to support the homeowners and tradespeople who build up Orange County.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Serving Orange County, CA</h2>
              <p>Pickup available by appointment. Browse the catalog to check availability near you.</p>
            </div>
            <Link className="btn btn-gold" href="/tools">
              Browse Tools
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
