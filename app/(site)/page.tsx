import { AreasSection, type ServiceArea } from '@/components/home/AreasSection';
import { FaqSection } from '@/components/home/FaqSection';
import { Hero } from '@/components/home/Hero';
import { HowItWorks } from '@/components/home/HowItWorks';
import { LatestPosts } from '@/components/home/LatestPosts';
import { PricingSection } from '@/components/home/PricingSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { TrustBar } from '@/components/home/TrustBar';
import { WorkSection } from '@/components/home/WorkSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { homeFaqs } from '@/lib/data/homeFaqs';
import { defaultResidentialPricing } from '@/lib/fallback/pricingData';
import {
  allServicesQuery,
  homeGalleryQuery,
  homePricingQuery,
  latestPostsQuery,
  serviceAreasQuery,
} from '@/lib/sanity/queries';
import { safeFetch } from '@/lib/sanity/safeFetch';
import { createMetadata } from '@/lib/seo/metadata';
import { faqSchema, websiteSchema } from '@/lib/seo/schema';
import type { PostCard } from '@/types/blog';
import type { HomeGalleryItem } from '@/types/gallery';
import type { PricingPlan } from '@/types/pricing';
import type { ServiceItem } from '@/types/service';

export const metadata = createMetadata({
  // Primary keywords up front, brand last, under ~60 characters so it isn't truncated.
  title: { absolute: 'Window & Gutter Cleaning in Kamloops, BC | Masterpiece' },
  description:
    'Window, gutter and eavestrough cleaning, soft washing, pressure washing and Christmas lights in Kamloops, BC. Fully insured local crew. Free quotes.',
  path: '/',
});

export const revalidate = 60;

const FEATURED_COUNT = 4;

export default async function HomePage(): Promise<React.JSX.Element> {
  // One parallel batch. Each query fails independently to a safe fallback,
  // so a CMS hiccup degrades a section instead of the whole page.
  const [latestPosts, galleryItems, services, serviceAreas, pricing] = await Promise.all([
    safeFetch<PostCard[]>(latestPostsQuery, []),
    safeFetch<HomeGalleryItem[]>(homeGalleryQuery, []),
    safeFetch<ServiceItem[]>(allServicesQuery, []),
    safeFetch<ServiceArea[]>(serviceAreasQuery, []),
    safeFetch<{ plans: PricingPlan[] } | null>(homePricingQuery, null),
  ]);

  const flagged = services.filter((service) => service.featuredOnHome);
  const featuredServices = (flagged.length > 0 ? flagged : services).slice(0, FEATURED_COUNT);
  const pricingPlans = pricing?.plans?.length ? pricing.plans : defaultResidentialPricing;

  return (
    <>
      {/* The business (Organization) node is emitted site-wide by the (site) layout. */}
      <JsonLd nodes={[websiteSchema(), faqSchema(homeFaqs)]} />

      <Hero />
      <TrustBar />
      <ServicesSection services={featuredServices} />
      <HowItWorks />
      <PricingSection plans={pricingPlans} />
      <WorkSection items={galleryItems} />
      <ReviewsSection />
      <AreasSection areas={serviceAreas} />
      <FaqSection faqs={homeFaqs} />
      <CtaSection
  title="Get your free Kamloops exterior cleaning quote"
  description="Tell us what you need, from windows and gutters to soft washing and Christmas lights. We confirm your exact price in writing within one business day, and our insured, WorkSafeBC-covered crew re-cleans for free if it's not spotless."
/>
      <LatestPosts posts={latestPosts} />
    </>
  );
}
