import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import LeadModal from "@/components/LeadModal";
import Newsletter from "@/components/Newsletter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://masterpiecehomeservices.ca";

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Masterpiece Home Services | Window & Exterior Cleaning in Kamloops, BC",
    template: "%s | Masterpiece Home Services",
  },
  description:
    "Top-rated exterior home care in Kamloops & the Thompson-Okanagan. Professional streak-free window cleaning, eavestrough clearing, soft washing, pressure washing, and custom Christmas light installation.",
  keywords: [
    "Window Cleaning Kamloops",
    "Gutter Cleaning Kamloops",
    "Eavestrough Clearing BC",
    "Pressure Washing Thompson-Okanagan",
    "Soft Wash Exterior House Cleaning",
    "Christmas Light Installation Kamloops",
    "Masterpiece Home Services",
  ],
  authors: [{ name: "Masterpiece Home Services" }],
  creator: "Masterpiece Home Services",
  publisher: "Masterpiece Home Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    title: "Masterpiece Home Services | Premium Exterior Home Care",
    description:
      "Professional window detailing, eavestrough clearing, soft washing, and seasonal Christmas lighting across Kamloops and the Thompson-Okanagan.",
    siteName: "Masterpiece Home Services",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Masterpiece Home Services Exterior Cleaning in Kamloops",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Masterpiece Home Services | Kamloops Exterior Cleaning",
    description:
      "Streak-free windows, eavestrough clearing, and full house soft washing in Kamloops, BC.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "CA-BC",
    "geo.placename": "Kamloops",
  },
};

// Local Business Structured Data for Google Search Rich Snippets
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Masterpiece Home Services",
  image: `${SITE_URL}/og-image.jpg`,
  "@id": SITE_URL,
  url: SITE_URL,
  telephone: "+1-250-555-0199",
  email: "info@masterpiecehomeservices.ca",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kamloops",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.6745,
    longitude: -120.3273,
  },
  areaServed: [
    {
      "@type": "AdministrativeArea",
      name: "Kamloops",
    },
    {
      "@type": "AdministrativeArea",
      name: "Thompson-Okanagan",
    },
    {
      "@type": "AdministrativeArea",
      name: "Sun Peaks",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Exterior Home Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Window Cleaning",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Eavestrough & Gutter Care",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "House Soft Washing",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pressure Washing",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Christmas Light Installation",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Inject Schema.org Local Business JSON-LD for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-blue-700 selection:text-white">
        <Header />
        <main className="grow">{children}</main>
        <Newsletter />
        <Footer />

        {/* Global Floating Cookie Consent Banner */}
        <CookieConsent />
        <LeadModal />
        
        {/* Global Toast Provider for Sonner */}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}