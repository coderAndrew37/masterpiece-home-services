// src/app/services/page.tsx
import ServicesClient from './page.client';
import type { Metadata } from 'next';
import type { ServiceItem } from '@/types/service';
import { client } from '@/lib/sanity/client';
import { allServicesQuery } from '@/lib/sanity/queries';

const SITE_URL = 'https://www.masterpiecehomeservices.ca';
const PAGE_URL = `${SITE_URL}/services`;

export const metadata: Metadata = {
  title: 'All Property Services | Masterpiece Home Services Kamloops',
  description:
    'Explore our complete range of exterior and interior home services in Kamloops: pure-water window detailing, eavestroughs, house soft washing, pressure washing, indoor cleaning, and holiday light setup.',
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
    title: 'Professional Home & Exterior Services | Masterpiece Kamloops',
    description:
      'Window detailing, eavestrough flushing, soft washing, indoor house cleaning, and seasonal Christmas lights installation.',
    url: PAGE_URL,
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Masterpiece Home Services - Full Property Services in Kamloops BC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Home & Exterior Services | Masterpiece Kamloops',
    description:
      'Window detailing, eavestrough flushing, soft washing, indoor house cleaning, and seasonal Christmas lights installation.',
    images: ['/images/og-image.jpg'],
  },
};

const fallbackServices: ServiceItem[] = [
  {
    _id: '1',
    title: 'Pure-Water Window Detailing',
    slug: 'pure-water-window-detailing',
    shortDescription: 'Streak-free interior and exterior glass cleaning using pure deionized water systems.',
    startingPrice: '$199',
    cardImage: { _type: 'image', asset: { _ref: '', _type: 'reference' } },
    features: ['Pure deionized water', 'Interior & exterior detailing', 'Screen washing'],
    icon: 'FiHome',
    badge: 'Most Popular',
    featuredOnHome: true,
  },
  {
    _id: '2',
    title: 'Eavestrough & Gutter Clearing',
    slug: 'eavestrough-gutter-cleaning',
    shortDescription: 'Prevent water damage and foundation erosion with complete gutter debris removal.',
    startingPrice: '$169',
    cardImage: { _type: 'image', asset: { _ref: '', _type: 'reference' } },
    features: ['Debris removal', 'Downspout flush', 'Pre-winter check'],
    icon: 'FiDroplet',
    featuredOnHome: true,
  },
  {
    _id: '3',
    title: 'House Soft Washing',
    slug: 'house-soft-washing',
    shortDescription: 'Safe, low-pressure exterior washing that eliminates algae, moss, and dirt from siding.',
    startingPrice: '$249',
    cardImage: { _type: 'image', asset: { _ref: '', _type: 'reference' } },
    features: ['Low-pressure wash', 'Biodegradable cleaner', 'Siding protection'],
    icon: 'FiSun',
    featuredOnHome: true,
  },
  {
    _id: '4',
    title: 'Pressure & Surface Washing',
    slug: 'pressure-surface-washing',
    shortDescription: 'High-volume surface cleaning to restore driveways, walkways, patios, and decks.',
    startingPrice: '$149',
    cardImage: { _type: 'image', asset: { _ref: '', _type: 'reference' } },
    features: ['Driveway scrubbing', 'Oil stain removal', 'Moss removal'],
    icon: 'FiZap',
    featuredOnHome: false,
  },
  {
    _id: '5',
    title: 'Indoor House Cleaning',
    slug: 'indoor-cleaning',
    shortDescription: 'Comprehensive interior housekeeping, deep cleaning, and move-in/move-out detailing.',
    startingPrice: '$219',
    cardImage: { _type: 'image', asset: { _ref: '', _type: 'reference' } },
    features: ['Deep sanitization', 'Vacuuming & mopping', 'Baseboard dusting'],
    icon: 'FiShield',
    badge: 'New Service',
    featuredOnHome: false,
  },
  {
    _id: '6',
    title: 'Christmas Lights Installation',
    slug: 'christmas-lights-installation',
    shortDescription: 'Turnkey holiday lighting: commercial-grade LED supply, safe hanging, and takedown.',
    startingPrice: 'from $299',
    cardImage: { _type: 'image', asset: { _ref: '', _type: 'reference' } },
    features: ['Commercial LEDs', 'Zero-damage clips', 'Takedown & storage'],
    icon: 'FiCalendar',
    badge: 'Winter Special',
    featuredOnHome: false,
  },
];

const benefits = [
  'Restores and protects your property value & curb appeal',
  'Prevents costly water damage, rot, and glass degradation',
  'Fully insured ($5M liability) and WorkSafeBC covered crew',
  'Eco-friendly, child & pet-safe cleaning solutions',
  'Convenient 24-hour fast quotes and simple online booking',
];

export default async function ServicesPage(): Promise<React.JSX.Element> {
  let services: ServiceItem[] = [];

  try {
    const fetchedServices = await client.fetch<ServiceItem[]>(allServicesQuery);
    if (fetchedServices && fetchedServices.length > 0) {
      services = fetchedServices;
    } else {
      services = fallbackServices;
    }
  } catch (error) {
    console.error('Failed to fetch services from Sanity, falling back to static array:', error);
    services = fallbackServices;
  }

// in page.tsx, right after the fetch
console.log('Sanity services:', JSON.stringify(services.map(s => ({ title: s.title, cardImage: s.cardImage })), null, 2));
  // CollectionPage + ItemList — references each service's REAL url so this
  // page's schema and the /services/[slug] page's own Service schema agree
  // on the canonical URL for every service.
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${PAGE_URL}#collection`,
    url: PAGE_URL,
    name: 'All Property Services | Masterpiece Home Services Kamloops',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/services/${service.slug}`,
        name: service.title,
      })),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Services', item: PAGE_URL },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServicesClient services={services} benefits={benefits} />
    </>
  );
}