import type { Metadata } from 'next';
import BookingModal from '@/components/BookingModal';
import CookieConsent from '@/components/CookieConsent';
import LeadModal from '@/components/LeadModal';
import QuoteModal from '@/components/QuoteModal';
import { QuoteModalProvider } from '@/components/QuoteModalProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ThemeScript } from '@/components/theme/ThemeScript';
import { BookingProvider } from '@/context/BookingContext';
import { organizationSchema } from '@/lib/seo/schema';
import { site } from '@/lib/site';
import { ThemedToaster } from '@/components/theme/ThemedToaster';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/Footer';

/**
 * Site-wide defaults for the marketing pages (/studio has its own).
 * Deliberately NOT set here: `alternates.canonical`. A canonical in a layout is
 * inherited by every page that doesn't override it, which tells Google that
 * those pages are duplicates of the homepage. Each page sets its own via
 * createMetadata().
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Window & Exterior Cleaning in ${site.city}, ${site.region}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    images: [{ url: site.images.og, width: 1200, height: 630, alt: `${site.name}: exterior cleaning in ${site.city}` }],
  },
  twitter: { card: 'summary_large_image', images: [site.images.og] },
  other: { 'geo.region': 'CA-BC', 'geo.placename': site.city },
};

export default function SiteLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <ThemeProvider>
      {/* Sets the theme before first paint. Needs suppressHydrationWarning on <html> in the root layout. */}
      <ThemeScript />
      {/* One business entity for the whole site, built from lib/site.ts (no second, conflicting copy). */}
      <JsonLd nodes={[organizationSchema()]} />

      <QuoteModalProvider>
        <BookingProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:font-bold focus:text-brand-foreground"
          >
            Skip to content
          </a>

          <Header />
          <main id="main" className="grow">
            {children}
          </main>
          <Footer />

          <CookieConsent />
          <QuoteModal />
          <LeadModal />
          <BookingModal />
          <ThemedToaster />
        </BookingProvider>
      </QuoteModalProvider>
    </ThemeProvider>
  );
}
