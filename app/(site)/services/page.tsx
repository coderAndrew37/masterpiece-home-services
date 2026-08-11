// src/app/services/page.tsx
import ServicesClient from './page.client';
import type { Metadata } from 'next';
import type { ServiceItem } from '@/types/service';
import { client } from '@/lib/sanity/client';
import { allServicesQuery } from '@/lib/sanity/queries';

export const metadata: Metadata = {
  title: 'All Property Services | Masterpiece Home Services Kamloops',
  description:
    'Explore our complete range of exterior and interior home services in Kamloops: pure-water window detailing, eavestroughs, house soft washing, pressure washing, indoor cleaning, and holiday light setup.',
  openGraph: {
    title: 'Professional Home & Exterior Services | Masterpiece Kamloops',
    description:
      'Window detailing, eavestrough flushing, soft washing, indoor house cleaning, and seasonal Christmas lights installation.',
  },
};

const fallbackServices: ServiceItem[] = [
  {
    _id: '1',
    title: 'Pure-Water Window Detailing',
    slug: 'window-cleaning',
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
    slug: 'eavestroughs',
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
    slug: 'soft-washing',
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
    slug: 'pressure-washing',
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
    slug: 'christmas-lights',
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

export default async function ServicesPage() {
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

  return <ServicesClient services={services} benefits={benefits} />;
}