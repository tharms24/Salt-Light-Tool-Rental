import Link from "next/link";
import Image from "next/image";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { tools } from "@/db/schema";
import { Icon } from "@/lib/icons";
import { CATEGORIES } from "@/lib/categories";
import ToolCard from "@/components/ToolCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const popularTools = await db.query.tools.findMany({
    where: eq(tools.active, true),
    orderBy: [desc(tools.createdAt)],
    limit: 3,
  });

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-copy">
            <div className="hero-badge">Built to Work. Called to Serve.</div>
            <h1>
              Quality Tools.
              <br />
              Fair Rates.
              <br />
              <em>Local, Trustworthy Service.</em>
            </h1>
            <p className="lead">
              Salt &amp; Light Tool Rental puts well-maintained power tools and equipment in your
              hands for the job at hand &mdash; no big-box hassle, just straightforward rentals
              from a local, faith-driven small business serving Orange County.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-gold" href="/tools">
                Browse Tools
              </Link>
              <Link className="btn btn-outline" href="/contact">
                Message to Reserve
              </Link>
            </div>
          </div>
          <div className="hero-art">
            <div className="ring ring--outer"></div>
            <div className="ring ring--inner"></div>
            <Image
              src="/assets/img/logo-large.png"
              alt="Salt & Light Tool Rental badge"
              width={300}
              height={300}
            />
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#F7F3E8" d="M0 40 C 240 90 480 0 720 30 C 960 60 1200 10 1440 45 L1440 90 L0 90 Z"></path>
          </svg>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          <div className="trust-item">
            <div className="icon"><Icon name="shieldcheck" /></div>
            <div>
              <strong>Clean &amp; Maintained</strong>
              <span>Every tool checked before pickup</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="icon"><Icon name="calendar" /></div>
            <div>
              <strong>Day or Week</strong>
              <span>Flexible rates that fit your project</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="icon"><Icon name="mappin" /></div>
            <div>
              <strong>Local to OC</strong>
              <span>Serving Orange County, CA</span>
            </div>
          </div>
          <div className="trust-item">
            <div className="icon"><Icon name="handshake" /></div>
            <div>
              <strong>Simple Agreement</strong>
              <span>Clear terms, no surprises</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">How It Works</div>
            <h2>Renting a tool shouldn&apos;t be complicated</h2>
          </div>
          <div className="steps">
            <div className="step">
              <span className="num">01</span>
              <h3>Pick Your Dates</h3>
              <p>Browse the catalog, open a tool, and pick your dates right on the page &mdash; no back-and-forth needed to check availability.</p>
            </div>
            <div className="step">
              <span className="num">02</span>
              <h3>Pick Up &amp; Sign</h3>
              <p>Meet up, review the tool together, sign a simple rental agreement, and get to work.</p>
            </div>
            <div className="step">
              <span className="num">03</span>
              <h3>Return &amp; Done</h3>
              <p>Bring it back by the agreed time &mdash; clean, in good shape, and your deposit is released.</p>
            </div>
          </div>
        </div>
      </section>

      {popularTools.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <div className="section-head center">
              <div className="eyebrow">Popular Rentals</div>
              <h2>Recently Added to the Fleet</h2>
            </div>
            <div className="tool-grid">
              {popularTools.map((t) => (
                <ToolCard key={t.id} tool={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">Browse By Category</div>
            <h2>Popular Equipment Categories</h2>
          </div>
          <div className="cat-grid">
            {CATEGORIES.map((cat) => (
              <Link key={cat.id} className="cat-card" href={`/tools?category=${cat.id}`}>
                <div className="icon">
                  <Icon name={cat.icon} />
                </div>
                <h3>{cat.label}</h3>
              </Link>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 36 }}>
            <Link className="btn btn-ghost" href="/tools">
              See Full Catalog
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--navy">
        <div className="container story">
          <div className="story-art">
            <Image src="/assets/img/logo-large.png" alt="Salt & Light Tool Rental badge" width={300} height={300} />
          </div>
          <div className="story-copy">
            <div className="eyebrow">Our Name</div>
            <h2>Why &quot;Salt &amp; Light&quot;?</h2>
            <p>
              &quot;You are the salt of the earth... you are the light of the world.&quot; It&apos;s a call to
              do good, honest work that serves the people around us. That&apos;s the standard
              behind every tool we rent &mdash; cared for, dependable, and handed to you in good
              faith.
            </p>
            <p>
              We&apos;re a local Orange County operation, not a warehouse chain. When you rent
              from us, you&apos;re talking to a real person who wants your project to go well.
            </p>
            <Link className="btn btn-outline" href="/about">
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Ready to get your project done?</h2>
              <p>Browse the catalog and lock in your dates &mdash; or message us if you have questions.</p>
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
