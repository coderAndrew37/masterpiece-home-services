import type { Metadata } from 'next';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { RatingSummary } from '@/components/reviews/RatingSummary';
import { ReviewInvite } from '@/components/reviews/ReviewInvite';
import { CtaSection } from '@/components/sections/CtaSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { fetchGooglePlaceReviews } from '@/lib/google/places';
import { testimonialsQuery } from '@/lib/sanity/queries';
import { safeFetch } from '@/lib/sanity/safeFetch';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';
import { site } from '@/lib/site';
import type { Review } from '@/types/reviews';
import { PageHero } from '@/components/PageHero';

// The Places API is billed per request, so keep this long. New Sanity testimonials appear within the hour.
export const revalidate = 3600;

export const metadata: Metadata = createMetadata({
  title: 'Customer Reviews of Our Kamloops Cleaning Service',
  description:
    'Read real reviews of Masterpiece Home Services from Kamloops homeowners: window cleaning, gutter cleaning, soft washing, pressure washing and more.',
  path: site.routes.testimonials,
  image: site.images.og,
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Reviews', href: site.routes.testimonials },
];

interface SanityTestimonial {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  location?: string;
}

export default async function TestimonialsPage(): Promise<React.JSX.Element> {
  const [googleData, direct] = await Promise.all([
    fetchGooglePlaceReviews().catch(() => null),
    safeFetch<SanityTestimonial[]>(testimonialsQuery, []),
  ]);

  const rating = googleData?.rating ?? null;
  const count = googleData?.userRatingCount ?? null;
  const mapsUrl = googleData?.mapsUrl ?? null;

  const googleReviews: Review[] = (googleData?.reviews ?? [])
    .filter((review) => review.text.trim().length > 0)
    .map((review, index) => ({
      id: `google-${index}`,
      source: 'google',
      rating: review.rating,
      text: review.text,
      author: review.authorName,
      meta: review.relativeTimeDescription,
    }));

  const directReviews: Review[] = direct.map((item) => ({
    id: item._id,
    source: 'direct',
    rating: item.rating,
    text: item.comment,
    author: item.name,
    meta: item.location,
  }));

  const reviews = [...googleReviews, ...directReviews];

  const configuredUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL;
  const googleReviewUrl = configuredUrl?.startsWith('http') ? configuredUrl : undefined;

  return (
    <>
      <JsonLd nodes={[webPageSchema({ name: 'Customer reviews', path: site.routes.testimonials }), breadcrumbSchema(crumbs)]} />

      <PageHero
        eyebrow="Reviews"
        title="What Kamloops homeowners say about us"
        description="Real feedback from homeowners across Kamloops, from Google and from our own customers."
        crumbs={crumbs}
      >
        <ButtonLink href="#review" size="lg">
          Leave a review
        </ButtonLink>
        {rating !== null && count !== null && count > 0 && <RatingSummary rating={rating} count={count} href={mapsUrl} />}
      </PageHero>

      {reviews.length > 0 && (
        <Section
          id="reviews"
          eyebrow="Customer reviews"
          title="Recent feedback"
          description="Reviews are shown as they were written. We don't edit them."
        >
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <li key={review.id}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section
        id="review"
        tone="muted"
        eyebrow="Share your experience"
        title="Worked with us? Tell us how it went"
        description={
          reviews.length > 0
            ? 'Whatever your experience, you are welcome to do either: post a public review, or send us private feedback.'
            : "We're just getting started, so your feedback means a lot. Post a public review or send us private feedback."
        }
      >
        <ReviewInvite googleReviewUrl={googleReviewUrl} />
      </Section>

      <CtaSection
        title="Book with our streak-free guarantee"
        description="If you notice any spots or streaks within 48 hours of service, we’ll return to re-clean the affected areas free of charge. Our crew is fully insured ($5M) and WorkSafeBC covered."
      />
    </>
  );
}