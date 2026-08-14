// src/app/pricing/page.tsx
import type { Metadata } from 'next';
import PricingClient from './page.client';
import { client } from '@/lib/sanity/client';
import { pricingPageQuery } from '@/lib/sanity/queries';
import type { PricingPlan, Addon, PricingFaqItem } from '@/types/pricing';
import {
  defaultResidentialPricing,
  defaultCommercialPricing,
  defaultAddons,
  defaultFaqs,
} from '@/lib/fallback/pricingData';

const SITE_URL = 'https://www.masterpiecehomeservices.ca';
const PAGE_URL = `${SITE_URL}/pricing`;

export const metadata: Metadata = {
  title: 'Pricing & Free Estimates | Masterpiece Home Services Kamloops',
  description:
    'Transparent, no-hidden-fee pricing for window cleaning, eavestrough clearing, house soft washing, pressure washing, indoor cleaning, and Christmas light installation across Kamloops, BC.',
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Transparent Home Service Pricing | Masterpiece Kamloops',
    description:
      'Clear, honest rates in Canadian dollars for exterior and interior home care across Kamloops & Thompson-Okanagan. No hidden fees, ever.',
    url: PAGE_URL,
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Masterpiece Home Services - Pricing in Kamloops BC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transparent Home Service Pricing | Masterpiece Kamloops',
    description:
      'Clear, honest rates for window washing, gutter clearing, soft washing, and seasonal Christmas light installs in Kamloops, BC.',
    images: ['/images/og-image.jpg'],
  },
};

export const revalidate = 60;

interface PricingPageData {
  residentialPricing: PricingPlan[];
  commercialPricing: PricingPlan[];
  addons: Addon[];
  faqs: PricingFaqItem[];
}

export default async function PricingPage(): Promise<React.JSX.Element> {
  let data: PricingPageData = {
    residentialPricing: defaultResidentialPricing,
    commercialPricing: defaultCommercialPricing,
    addons: defaultAddons,
    faqs: defaultFaqs,
  };

  try {
    const fetched = await client.fetch<PricingPageData | null>(pricingPageQuery);
    if (fetched?.residentialPricing?.length) {
      data = {
        residentialPricing: fetched.residentialPricing,
        commercialPricing: fetched.commercialPricing?.length
          ? fetched.commercialPricing
          : defaultCommercialPricing,
        addons: fetched.addons?.length ? fetched.addons : defaultAddons,
        faqs: fetched.faqs?.length ? fetched.faqs : defaultFaqs,
      };
    }
  } catch (error) {
    console.error('Failed to fetch pricing page from Sanity, falling back to static data:', error);
  }

  const orgId = `${SITE_URL}/#organization`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Pricing', item: PAGE_URL },
    ],
  };

  // Only emitted when real FAQ content exists — never render FAQPage schema
  // against an empty mainEntity array.
  const faqJsonLd =
    data.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }
      : null;

  // Ties this page's pricing catalog back to the canonical Organization
  // node from the homepage rather than redeclaring it — same pattern used
  // on every schema block across the site.
  const pricingPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${PAGE_URL}#pricing`,
    url: PAGE_URL,
    name: 'Pricing & Free Estimates | Masterpiece Home Services',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': orgId },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <PricingClient
        residentialPricing={data.residentialPricing}
        commercialPricing={data.commercialPricing}
        addons={data.addons}
        faqs={data.faqs}
      />
    </>
  );
}