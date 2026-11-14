import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ServiceArea } from '@/components/home/AreasSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { JsonLd } from '@/components/seo/JsonLd';

import { ServiceFaq } from '@/components/services/ServiceFaq';
import { ServiceGallery } from '@/components/services/ServiceGallery';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceIncluded } from '@/components/services/ServiceIncluded';
import { ServicePricing } from '@/components/services/ServicePricing';
import { Section } from '@/components/ui/Section';
import { Steps } from '@/components/ui/Steps';
import { getServiceCopy } from '@/lib/data/serviceCopy';
import { client } from '@/lib/sanity/client';
import { imageUrl } from '@/lib/sanity/image';
import { allServicesQuery, serviceAreasQuery, serviceBySlugQuery, serviceSlugsQuery } from '@/lib/sanity/queries';
import { safeFetch } from '@/lib/sanity/safeFetch';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo/schema';
import { site } from '@/lib/site';
import type { DetailedService, ServiceItem } from '@/types/service';
import { MobileCtaBar } from '@/components/MobileCtaBar';
import { SubNavItem, ServiceSubNav } from '@/components/services/ServiceSubnav';
import { ServiceOverview } from '@/components/services/ServiceOverview';
import { RelatedLinks } from '@/components/services/RelatedLinks';

export const revalidate = 60;

// generateMetadata and the page both need the service; cache() makes it one request.
const getService = cache(
  async (slug: string): Promise<DetailedService | null> =>
    client.fetch<DetailedService | null>(serviceBySlugQuery, { slug }),
);

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await client.fetch<string[]>(serviceSlugsQuery);
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: 'Service not found', robots: { index: false, follow: false } };

  return createMetadata({
    // An editor-written seoTitle is used exactly as typed; otherwise the layout adds the brand.
    title: service.seoTitle ? { absolute: service.seoTitle } : `${service.title} in ${site.city}, ${site.region}`,
    description: service.seoDescription ?? service.subtitle,
    path: `${site.routes.services}/${slug}`,
    image: imageUrl(service.heroImage ?? service.cardImage, { width: 1200, height: 630 }, site.images.og),
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<React.JSX.Element> {
  const { slug } = await params;

  const [service, allServices, areas] = await Promise.all([
    getService(slug),
    safeFetch<ServiceItem[]>(allServicesQuery, []),
    safeFetch<ServiceArea[]>(serviceAreasQuery, []),
  ]);
  if (!service) notFound();

  const copy = getServiceCopy(slug, service.title);
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: site.routes.services },
    { name: service.title, href: `${site.routes.services}/${slug}` },
  ];

  const steps = (service.processSteps ?? []).map((step) => ({ title: step.title, description: step.desc }));
  const faqs = service.faqs ?? [];
  const related = allServices.filter((item) => item.slug !== slug).slice(0, 3);

  // The calculator is built around window counts, so only window services get it.
  const hasCalculator = slug.includes('window');

  const subNav: SubNavItem[] = [];
  if (service.description?.length) subNav.push({ id: 'overview', label: 'Overview' });
  if (service.whatsIncluded?.length || service.benefits?.length) subNav.push({ id: 'included', label: "What's included" });
  if (steps.length) subNav.push({ id: 'process', label: 'How it works' });
  subNav.push({ id: 'pricing', label: 'Pricing' });
  if (service.gallery?.length) subNav.push({ id: 'work', label: 'Our work' });
  if (faqs.length) subNav.push({ id: 'faq', label: 'FAQ' });

  return (
    <>
      <JsonLd
        nodes={[
          serviceSchema({
            title: service.title,
            slug,
            description: service.subtitle,
            startingPrice: service.startingPrice,
          }),
          breadcrumbSchema(crumbs),
          ...(faqs.length > 0 ? [faqSchema(faqs)] : []),
        ]}
      />

      <ServiceHero service={service} crumbs={crumbs} />
      <ServiceSubNav items={subNav} />

      <ServiceOverview service={service} copy={copy} />
      <ServiceIncluded included={service.whatsIncluded} benefits={service.benefits} />

      {steps.length > 0 && (
        <Section
          id="process"
          eyebrow="How it works"
          title={`How our ${service.title.toLowerCase()} works`}
          description="Clear steps from first quote to final walk-through."
        >
          <Steps items={steps} />
        </Section>
      )}

      <ServicePricing service={service} copy={copy} showCalculator={hasCalculator} />
      <ServiceGallery service={service} />
      <ReviewsSection />
      <ServiceFaq service={service} copy={copy} />
      <RelatedLinks services={related} areas={areas} />

      <CtaSection
        title={`Ready to book ${service.title.toLowerCase()}?`}
        description={`Get a no-obligation quote for ${copy.keyword}. Our insured, WorkSafeBC-covered crew confirms your price within one business day.`}
        service={service.title}
      />

      <MobileCtaBar service={service.title} />
    </>
  );
}