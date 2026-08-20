import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Geometric display face for hero H1 only — Satoshi-like presence without touching body type. */
const interDisplay = Inter({
  variable: "--font-inter-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800", "900"],
});

const siteTitle = "Crawl Corp India — Transforming Ideas Into Digital Reality";
const siteDescription =
  "Crawl Corp India builds powerful digital solutions — from mobile apps to AI-driven automation and enterprise-grade security — that propel businesses into the future.";

export const metadata: Metadata = {
  metadataBase: new URL("https://crawlcorpindia.com"),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Crawl Corp India",
    "digital agency",
    "AI automation",
    "web development",
    "cybersecurity",
    "product engineering",
  ],
  authors: [{ name: "Crawl Corp India" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://crawlcorpindia.com/",
    siteName: "Crawl Corp India",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${interDisplay.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="relative min-h-full overflow-x-hidden bg-background font-sans text-foreground antialiased"
      >
        {children}
      </body>
    </html>
  );
}

