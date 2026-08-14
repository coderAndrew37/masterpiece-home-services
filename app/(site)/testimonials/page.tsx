// src/app/testimonials/page.tsx
import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { testimonialsQuery } from '@/lib/sanity/queries';
import { fetchGooglePlaceReviews } from '@/lib/google/places';
import TestimonialsClient from './page.client';

const SITE_URL = 'https://www.masterpiecehomeservices.ca';
const PAGE_URL = `${SITE_URL}/testimonials`;

export const metadata: Metadata = {
  title: 'Customer Reviews & Testimonials | Masterpiece Home Services Kamloops',
  description:
    'Real customer reviews for Masterpiece Home Services in Kamloops, BC \u2014 window detailing, soft washing, eavestrough clearing, and more.',
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    title: 'Customer Reviews | Masterpiece Home Services Kamloops',
    description: 'See what Kamloops homeowners say about Masterpiece Home Services.',
    url: PAGE_URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customer Reviews | Masterpiece Home Services Kamloops',
    description: 'See what Kamloops homeowners say about Masterpiece Home Services.',
  },
};

interface SanityTestimonial {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  location?: string;
  publishedAt: string;
  source: string;
}

export default async function TestimonialsPage(): Promise<React.JSX.Element> {
  const [googleData, directTestimonials] = await Promise.all([
    fetchGooglePlaceReviews(),
    client.fetch<SanityTestimonial[]>(testimonialsQuery),
  ]);

  const googleReviewUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || '#';
  const orgId = `${SITE_URL}/#organization`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Testimonials', item: PAGE_URL },
    ],
  };

  // Only emitted when Google returns real numbers — this is the fix for
  // the fabricated hardcoded "5.0" badge that was on this page before.
  const aggregateRatingJsonLd =
    googleData.rating !== null && googleData.userRatingCount !== null && googleData.userRatingCount > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': orgId,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: googleData.rating,
            reviewCount: googleData.userRatingCount,
          },
        }
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {aggregateRatingJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingJsonLd) }} />
      )}
      <TestimonialsClient
        googleRating={googleData.rating}
        googleReviewCount={googleData.userRatingCount}
        googleReviews={googleData.reviews}
        googleMapsUrl={googleData.mapsUrl}
        googleReviewUrl={googleReviewUrl}
        directTestimonials={directTestimonials ?? []}
      />
    </>
  );
}