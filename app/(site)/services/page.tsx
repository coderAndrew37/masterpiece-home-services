import type { Metadata } from 'next';
import type { ServiceArea } from '@/components/home/AreasSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { AreaPills } from '@/components/services/AreaPills';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ServicePriceTable } from '@/components/services/ServicePriceTable';
import { ServicePromises } from '@/components/services/ServicePromises';
import { ServicesHero } from '@/components/services/ServicesHero';
import { Section } from '@/components/ui/Section';
import { phoneNumber, phoneTel } from '@/lib/constants';
import { allServicesQuery, serviceAreasQuery } from '@/lib/sanity/queries';
import { safeFetch } from '@/lib/sanity/safeFetch';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, collectionPageSchema } from '@/lib/seo/schema';
import { site } from '@/lib/site';
import type { ServiceItem } from '@/types/service';

export const revalidate = 60;

export const metadata: Metadata = createMetadata({
  title: 'Exterior & Home Cleaning Services in Kamloops, BC',
  description:
    'Pure-water window cleaning, gutter cleaning, house soft washing, pressure washing, indoor cleaning and Christmas lights in Kamloops. Insured, WorkSafeBC-covered crew. Free written quotes.',
  path: site.routes.services,
  image: site.images.og,
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: site.routes.services },
];

export default async function ServicesPage(): Promise<React.JSX.Element> {
  const [services, areas] = await Promise.all([
    safeFetch<ServiceItem[]>(allServicesQuery, []),
    safeFetch<ServiceArea[]>(serviceAreasQuery, []),
  ]);

  return (
    <>
      <JsonLd
        nodes={[
          breadcrumbSchema(crumbs),
          collectionPageSchema({
            name: 'Home & exterior cleaning services in Kamloops',
            path: site.routes.services,
            basePath: site.routes.services,
            items: services.map((service) => ({ name: service.title, slug: service.slug })),
          }),
        ]}
      />

      <ServicesHero services={services} crumbs={crumbs} />

      <Section
        id="all-services"
        eyebrow="What we do"
        title="Every service, one local crew"
        description="Pick a service to see what's included, how it works and what it costs."
      >
        {services.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service._id}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-border bg-surface p-8 text-center text-muted">
            Our services list is temporarily unavailable. Call us on{' '}
            <a href={phoneTel} className="font-bold text-brand-ink underline underline-offset-4">
              {phoneNumber}
            </a>{' '}
            and we&apos;ll help straight away.
          </p>
        )}
      </Section>

      <ServicePriceTable services={services} />
      <ServicePromises />

      {areas.length > 0 && (
        <Section
          id="areas"
          tone="muted"
          eyebrow="Where we work"
          title="Serving Kamloops and nearby neighbourhoods"
          description="Same crew, same standards, wherever you are in the area."
        >
          <AreaPills areas={areas} />
        </Section>
      )}

      <CtaSection
        title="Ready for a spotless home?"
        description="Tell us what you need and we'll confirm your price in writing within one business day. Free and no obligation."
      />
    </>
  );
}