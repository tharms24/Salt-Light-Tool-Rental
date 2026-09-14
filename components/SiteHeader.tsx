"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
  { href: "/policies", label: "Policies" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>Serving Orange County, CA &amp; surrounding areas</span>
          <div className="topbar-links">
            <a href="tel:+19493553733">Call/Text (949) 355-3733</a>
            <Link href="/contact">Message Us to Reserve</Link>
          </div>
        </div>
      </div>

      <header className="site-header">
        <nav className="nav container">
          <Link className="brand" href="/">
            <Image src="/assets/img/logo-nav.png" alt="Salt & Light Tool Rental logo" width={56} height={56} />
            <span className="brand-word">
              <strong>Salt &amp; Light</strong>
              <span>Tool Rental &middot; OC</span>
            </span>
          </Link>
          <div className={`nav-links${navOpen ? " is-open" : ""}`}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? "is-active" : ""}
                onClick={() => setNavOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="nav-cta">
            <Link className="btn btn-gold btn-sm" href="/contact">
              <span className="long">Reserve a&nbsp;</span>Tool
            </Link>
            <button
              className="nav-toggle"
              aria-label="Toggle menu"
              onClick={() => setNavOpen((v) => !v)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
