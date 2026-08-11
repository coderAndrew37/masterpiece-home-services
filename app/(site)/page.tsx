// src/app/page.tsx
import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { latestPostsQuery, homeGalleryQuery, allServicesQuery } from '@/lib/sanity/queries';
import type { PostCard } from '@/types/blog';
import type { HomeGalleryItem } from '@/types/gallery';
import HomeClient from './page.client';
import { ServiceItem } from '@/types/service';
import { homeFaqs } from '@/lib/data/homeFaqs';
import { phoneNumber } from '@/lib/constants';

// BASE METADATA & SEO CONFIGURATION
const SITE_URL = 'https://www.masterpiecehomeservices.ca';
const ORG_ID = `${SITE_URL}/#organization`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Masterpiece Home Services | Window, Gutter & Exterior Cleaning in Kamloops, BC',
    template: '%s | Masterpiece Home Services',
  },
  description:
    'Top-rated residential & commercial exterior cleaning in Kamloops, BC. Professional window washing, soft wash house siding, eavestrough cleaning & pressure washing. Get a free quote!',
  authors: [{ name: 'Masterpiece Home Services' }],
  creator: 'Masterpiece Home Services',
  publisher: 'Masterpiece Home Services',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Masterpiece Home Services | Window & Exterior Cleaning Kamloops',
    description:
      'Restore your home\u2019s curb appeal with professional window washing, eavestrough clearing, soft washing & pressure washing in Kamloops & Thompson-Okanagan.',
    url: SITE_URL,
    siteName: 'Masterpiece Home Services',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Masterpiece Home Services - Window and Exterior Cleaning in Kamloops BC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Masterpiece Home Services | Exterior Home Cleaning Kamloops',
    description:
      'Streak-free window cleaning, soft wash house washing, and gutter maintenance in Kamloops, BC.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const revalidate = 60;

export default async function HomePage(): Promise<React.JSX.Element> {
  const [latestPosts, galleryItems, services] = await Promise.all([
    client.fetch<PostCard[]>(latestPostsQuery),
    client.fetch<HomeGalleryItem[]>(homeGalleryQuery),
    client.fetch<ServiceItem[]>(allServicesQuery),
  ]);

  const featuredServices = services.filter((s) => s.featuredOnHome).slice(0, 4);

  // LocalBusiness Structured Data (JSON-LD) for Google Local Pack & Maps Rankings
  // @id is REQUIRED here — every /services/[slug] page's Service schema references
  // this node via "provider": { "@id": ORG_ID } instead of repeating the full object.
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': ORG_ID,
    name: 'Masterpiece Home Services',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/images/og-image.jpg`,
    telephone: {phoneNumber}, // TODO: real number
    priceRange: '$$',
    description:
      'Professional residential and commercial window cleaning, soft wash house cleaning, eavestrough clearing, pressure washing, indoor cleaning, and seasonal Christmas lights installation in Kamloops, BC.',
    address: {
  '@type': 'PostalAddress',
  streetAddress: '820 Newman Street',
  addressLocality: 'Kamloops',
  addressRegion: 'BC',
  postalCode: 'V2B 5H4',
  addressCountry: 'CA',
},
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.6745,
      longitude: -120.3273,
    },
    areaServed: [
      { '@type': 'City', name: 'Kamloops' },
      { '@type': 'AdministrativeArea', name: 'Thompson-Okanagan' },
      { '@type': 'Place', name: 'Sahali' },
      { '@type': 'Place', name: 'Aberdeen' },
      { '@type': 'Place', name: 'Westsyde' },
      { '@type': 'Place', name: 'Brocklehurst' },
      { '@type': 'Place', name: 'Pineview Valley' },
      { '@type': 'Place', name: 'Batchelor Heights' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '14:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/[your-page]', // TODO
      'https://www.instagram.com/[your-handle]', // TODO
      'https://www.google.com/maps/place/[your-gbp-place-id]', // TODO
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Home Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pure-Water Window Detailing',
            description: 'Streak-free exterior and interior window washing.',
            url: `${SITE_URL}/services/pure-water-window-detailing`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Eavestrough & Gutter Clearing',
            description: 'Debris removal and downspout flushing.',
            url: `${SITE_URL}/services/eavestrough-gutter-cleaning`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'House Soft Washing',
            description: 'Low-pressure safe exterior house washing for vinyl, stucco, and wood.',
            url: `${SITE_URL}/services/house-soft-washing`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pressure & Surface Washing',
            description: 'Driveway, patio, and concrete surface cleaning.',
            url: `${SITE_URL}/services/pressure-surface-washing`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Indoor House Cleaning & Deep Sanitization',
            description: 'Interior deep cleaning and sanitization services.',
            url: `${SITE_URL}/services/indoor-cleaning`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Seasonal Christmas Lights Installation',
            description: 'Professional holiday lighting installation and takedown.',
            url: `${SITE_URL}/services/christmas-lights-installation`,
          },
        },
      ],
    },
  };

  // FAQPage Structured Data — single source of truth (homeFaqs) shared with
  // the rendered <FAQ> component so schema and on-page copy can never drift apart.
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // WebSite schema enables the sitelinks search box for branded queries
  // ("masterpiece home services") — low effort, only relevant once you
  // have on-site search wired up at the target URL.
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Masterpiece Home Services',
    publisher: { '@id': ORG_ID },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <HomeClient
        latestPosts={latestPosts}
        galleryItems={galleryItems ?? []}
        featuredServices={featuredServices}
        faqs={homeFaqs}
      />
    </>
  );
}