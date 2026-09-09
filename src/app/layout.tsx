import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { company } from "@/data/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vaishnavienterprises.in"),
  title: {
    default: `${company.name} — Aluminium Recycling & Furnace-Ready Alloy`,
    template: `%s — ${company.name}`,
  },
  description: company.summary,
  keywords: [
    "aluminium recycling",
    "ADC-12 alloy",
    "LM-24 alloy",
    "AC-4B alloy",
    "aluminium ingots",
    "aluminium shots",
    "notch bars",
    "secondary aluminium",
    "furnace ready alloy",
    "aluminium scrap India",
  ],
  openGraph: {
    title: `${company.name} — ${company.tagline}`,
    description: company.summary,
    type: "website",
    siteName: company.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    description: company.summary,
    slogan: company.tagline,
    foundingDate: String(company.established),
    logo: "/logo-vaishnavi.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phone,
      email: company.email,
      contactType: "sales",
      areaServed: "IN",
    },
  };

  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col bg-white">
        <script
          type="application/ld+json"
          // Structured data for search engines; content is static and trusted.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-navy-800 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
