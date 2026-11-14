import type { Metadata } from 'next';
import type { ServiceArea } from '@/components/home/AreasSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { AreaPills } from '@/components/services/AreaPills';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Section } from '@/components/ui/Section';
import { allServicesQuery, serviceAreasQuery } from '@/lib/sanity/queries';
import { safeFetch } from '@/lib/sanity/safeFetch';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { site } from '@/lib/site';
import type { ServiceItem } from '@/types/service';
import { ServicesHero } from '@/components/services/ServicesHero';
import { ServicePriceTable } from '@/components/services/ServicePriceTable';
import { ServicePromises } from '@/components/services/ServicePromises';

export const revalidate = 60;

export const metadata: Metadata = createMetadata({
  title: 'Exterior Cleaning Services in Kamloops, BC',
  description:
    'Window cleaning, gutter cleaning, soft washing, pressure washing and Christmas lights in Kamloops. Insured, WorkSafeBC-covered crew. Free written quotes.',
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
      <JsonLd nodes={[breadcrumbSchema(crumbs)]} />

      <ServicesHero services={services} crumbs={crumbs} />

      <Section
        id="all-services"
        eyebrow="What we do"
        title="Every service, one local crew"
        description="Pick a service to see what's included, how it works and what it costs."
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service._id}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
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