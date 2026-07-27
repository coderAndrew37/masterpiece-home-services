import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { latestPostsQuery } from '@/lib/sanity/queries';
import type { PostCard } from '@/types/blog';
import HomeClient from './page.client';

// BASE METADATA & SEO CONFIGURATION
const SITE_URL = 'https://www.masterpiecehomeservices.ca';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Masterpiece Home Services | Window, Gutter & Exterior Cleaning in Kamloops, BC',
    template: '%s | Masterpiece Home Services',
  },
  description:
    'Top-rated residential & commercial exterior cleaning in Kamloops, BC. Professional window washing, soft wash house siding, eavestrough cleaning & pressure washing. Get a free quote!',
  keywords: [
    'Window Cleaning Kamloops',
    'Gutter Cleaning Kamloops',
    'Eavestrough Cleaning Thompson Okanagan',
    'Soft Wash Siding Cleaning',
    'Pressure Washing Kamloops',
    'Exterior Home Maintenance BC',
    'Masterpiece Home Services',
  ],
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
      'Restore your home’s curb appeal with professional window washing, eavestrough clearing, soft washing & pressure washing in Kamloops & Thompson-Okanagan.',
    url: SITE_URL,
    siteName: 'Masterpiece Home Services',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg', // Update to your real OG share image path
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
    images: ['/images/og-home.jpg'],
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

// Revalidate periodically so new blog posts show up on the homepage without a full redeploy.
export const revalidate = 60;

export default async function HomePage() {
  const latestPosts = await client.fetch<PostCard[]>(latestPostsQuery);

  // LocalBusiness Structured Data (JSON-LD) for Google Local Pack & Maps Rankings
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Masterpiece Home Services',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`, // Path to your logo asset
    image: `${SITE_URL}/images/og-image.jpg`,
    description:
      'Professional residential and commercial window cleaning, soft wash house cleaning, eavestrough clearing, and pressure washing services in Kamloops, BC.',
    areaServed: [
      {
        '@type': 'City',
        name: 'Kamloops',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Thompson-Okanagan',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Exterior Cleaning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Window Cleaning',
            description: 'Streak-free exterior and interior window washing.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Eavestrough & Gutter Cleaning',
            description: 'Debris removal and downspout flushing.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Soft Wash Siding Cleaning',
            description: 'Low-pressure safe exterior house washing for vinyl, stucco, and wood.',
          },
        },
      ],
    },
  };

  return (
    <>
      {/* Inject Structured Data for Google Search Knowledge Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient latestPosts={latestPosts} />
    </>
  );
}