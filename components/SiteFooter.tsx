import Link from "next/link";
import Image from "next/image";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image src="/assets/img/logo-footer.png" alt="Salt & Light Tool Rental logo" width={54} height={54} />
            <div>
              <strong>Salt &amp; Light Tool Rental</strong>
              <div className="tagline">Built to Work. Called to Serve.</div>
              <p>Quality tool rentals serving Orange County, CA.</p>
            </div>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/tools">Tool Catalog</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/policies">Rental Policies</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:+19493553733">Tyler: (949) 355-3733</a></li>
              <li><a href="tel:+19495003584">Nick: (949) 500-3584</a></li>
              <li><a href="mailto:hello@saltandlighttoolrental.com">hello@saltandlighttoolrental.com</a></li>
              <li><Link href="/contact">Send a Message</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Service Area</h4>
            <ul>
              <li>Orange County, CA</li>
              <li>Pickup by appointment</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {year} Salt &amp; Light Tool Rental. All rights reserved.</span>
          <span>Matthew 5:13&ndash;16</span>
        </div>
      </div>
    </footer>
  );
}
