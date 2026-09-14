import type { Metadata } from "next";
import { Roboto_Slab, Oswald, Inter } from "next/font/google";
import "./globals.css";

const robotoSlab = Roboto_Slab({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const oswald = Oswald({
  variable: "--font-label-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Salt & Light Tool Rental | Orange County, CA",
  description:
    "Quality power tools and equipment for rent in Orange County, CA. Clean, well-maintained tools, fair day & weekly rates, and a simple rental process. Built to Work. Called to Serve.",
  icons: {
    icon: "/assets/img/favicon-32.png",
    apple: "/assets/img/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${robotoSlab.variable} ${oswald.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
