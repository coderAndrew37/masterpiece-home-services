/**
 * Single source of truth for business facts.
 * Used by metadata, JSON-LD, links and copy, so nothing is typed twice.
 *
 * Phone number lives in '@/lib/constants' (phoneNumber / phoneTel) and is
 * imported from there directly.
 */

interface OpeningHours {
  days: string[];
  opens: string;
  closes: string;
}

export interface RatingSummary {
  score: number;
  count: number;
  source: string;
}

export const site = {
  name: 'Masterpiece Home Services',
  url: 'https://www.masterpiecehomeservices.ca',
  locale: 'en_CA',
  city: 'Kamloops',
  region: 'BC',
  priceRange: '$$',

  description:
    'Professional residential and commercial window cleaning, gutter (eavestrough) cleaning, soft washing, pressure washing, indoor cleaning and Christmas light installation in Kamloops, BC.',

  address: {
    street: '820 Newman Street',
    city: 'Kamloops',
    region: 'BC',
    postalCode: 'V2B 5H4',
    country: 'CA',
  },
  geo: { latitude: 50.6745, longitude: -120.3273 },

  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
    { days: ['Saturday'], opens: '09:00', closes: '14:00' },
  ] satisfies OpeningHours[],

  neighbourhoods: ['Sahali', 'Aberdeen', 'Westsyde', 'Brocklehurst', 'Pineview Valley', 'Batchelor Heights'],

  /**
   * Real profile URLs only. Empty on purpose: the old page shipped placeholder
   * URLs like "https://www.facebook.com/[your-page]" inside structured data.
   */
  socialLinks: [] as string[],

  /**
   * Set this only from a real, checkable source (e.g. Google Business Profile).
   * The homepage shows a rating line only when this is non-null.
   */
  rating: null as RatingSummary | null,

  nav: [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Work & Reviews', href: '/gallery' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
] as { name: string; href: string }[],

  routes: {
    services: '/services',
    pricing: '/pricing',
    gallery: '/gallery', // confirm this route exists
    blog: '/blog',
    serviceAreas: '/service-areas',
    contact: '/contact', // confirm this route exists
  },

  images: {
    hero: '/images/home-hero.jpg',
    og: '/images/og-image.jpg',
    logo: '/logo.png',
    /** Fallback used when a CMS image is missing. Replace with real photography. */
    placeholder: '/images/residential-1.jpg',
  },
};
