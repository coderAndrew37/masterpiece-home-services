import { cache } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { AreaHero } from '@/components/areas/AreaHero';
import { AreaServices } from '@/components/areas/AreaServices';
import { HowItWorks } from '@/components/home/HowItWorks';
import type { ServiceArea } from '@/components/home/AreasSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { AreaPills } from '@/components/services/AreaPills';
import { Container, Section } from '@/components/ui/Section';
import { client } from '@/lib/sanity/client';
import { imageUrl } from '@/lib/sanity/image';
import { serviceAreaBySlugQuery, serviceAreaSlugsQuery, serviceAreasQuery } from '@/lib/sanity/queries';
import { safeFetch } from '@/lib/sanity/safeFetch';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, serviceAreaSchema } from '@/lib/seo/schema';
import { site } from '@/lib/site';
import type { ServiceAreaDetail } from '@/types/serviceArea';

export const revalidate = 60;

// generateMetadata and the page both need the area; cache() makes it one request.
const getArea = cache(
  async (slug: string): Promise<ServiceAreaDetail | null> =>
    client.fetch<ServiceAreaDetail | null>(serviceAreaBySlugQuery, { slug }),
);

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await client.fetch<string[]>(serviceAreaSlugsQuery);
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = await getArea(slug);
  if (!area) return { title: 'Service area not found', robots: { index: false, follow: false } };

  return createMetadata({
    title: area.seoTitle ? { absolute: area.seoTitle } : `Home services in ${area.name}, ${site.city}`,
    description: area.seoDescription ?? area.intro,
    path: `${site.routes.serviceAreas}/${slug}`,
    image: imageUrl(area.heroImage, { width: 1200, height: 630 }, site.images.og),
  });
}

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<React.JSX.Element> {
  const { slug } = await params;

  const [area, allAreas] = await Promise.all([getArea(slug), safeFetch<ServiceArea[]>(serviceAreasQuery, [])]);
  if (!area) notFound();

  const services = area.relatedServices ?? [];
  const nearby = allAreas.filter((item) => item.slug !== slug);

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Service areas', href: site.routes.serviceAreas },
    { name: area.name, href: `${site.routes.serviceAreas}/${slug}` },
  ];

  return (
    <>
      <JsonLd
        nodes={[
          serviceAreaSchema({ name: area.name, slug, serviceSlugs: services.map((item) => item.service.slug) }),
          breadcrumbSchema(crumbs),
        ]}
      />

      <AreaHero area={area} crumbs={crumbs} />

      {area.localHook && (
        <section aria-label={`Local note for ${area.name}`} className="border-b border-border">
          <Container className="py-10">
            <div className="flex items-start gap-4 rounded-2xl border border-brand/30 bg-brand-soft p-6 sm:p-8">
              <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-brand-ink" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-ink">Local note</p>
                <p className="mt-2 max-w-3xl text-lg leading-relaxed">{area.localHook}</p>
              </div>
            </div>
          </Container>
        </section>
      )}

      <AreaServices areaName={area.name} items={services} />
      <HowItWorks />

      {nearby.length > 0 && (
        <Section
          id="nearby"
          tone="muted"
          eyebrow="Nearby"
          title="Also serving nearby neighbourhoods"
          description="Same crew, same standards across the area."
        >
          <AreaPills areas={nearby} />
        </Section>
      )}

      <CtaSection
        title={`Book exterior cleaning in ${area.name}`}
        description={`Tell us what you need and we'll confirm your price in writing within one business day. Our insured, WorkSafeBC-covered crew re-cleans for free if it's not spotless.`}
      />
    </>
  );
}