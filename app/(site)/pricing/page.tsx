import type { Metadata } from 'next';
import PricingTable, { type PricingRow } from '@/components/PricingTable';
import ServiceCalculator from '@/components/ServiceCalculator';
import { CtaSection } from '@/components/sections/CtaSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { Section } from '@/components/ui/Section';
import {
  defaultAddons,
  defaultCommercialPricing,
  defaultFaqs,
  defaultResidentialPricing,
} from '@/lib/fallback/pricingData';
import { pricingPageQuery } from '@/lib/sanity/queries';
import { safeFetch } from '@/lib/sanity/safeFetch';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/seo/schema';
import { site } from '@/lib/site';
import type { Addon, PricingFaqItem, PricingPlan } from '@/types/pricing';
import PricingTiers from '@/components/PricingTiers';
import { PageHero } from '@/components/PageHero';
// Import your new FaqSection component
import FaqSection from '@/components/FaqSection'; 

export const revalidate = 60;

interface PricingPageData {
  heroTagline?: string;
  heroTitle?: string;
  heroDescription?: string;
  residentialPricing?: PricingPlan[];
  commercialPricing?: PricingPlan[];
  addons?: Addon[];
  faqs?: PricingFaqItem[];
}

export const metadata: Metadata = createMetadata({
  title: 'Window, Gutter & Exterior Cleaning Prices in Kamloops',
  description:
    'Transparent, no-hidden-fee pricing for window cleaning, gutter cleaning, house soft washing, pressure washing, indoor cleaning and Christmas lights in Kamloops, BC. Free written quotes.',
  path: site.routes.pricing,
  image: site.images.og,
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Pricing', href: site.routes.pricing },
];

async function getPricingData(): Promise<PricingPageData> {
  const data = await safeFetch<PricingPageData | null>(pricingPageQuery, null);
  if (data?.residentialPricing?.length) return data;

  return {
    residentialPricing: defaultResidentialPricing,
    commercialPricing: defaultCommercialPricing,
    addons: defaultAddons,
    faqs: defaultFaqs,
  };
}

export default async function PricingPage(): Promise<React.JSX.Element> {
  const data = await getPricingData();

  const residential = data.residentialPricing ?? [];
  const commercial = data.commercialPricing ?? [];
  const faqs = data.faqs ?? [];

  const addonRows: PricingRow[] = (data.addons ?? []).map((addon, index) => ({
    id: `${index}-${addon.service}`,
    service: addon.service,
    details: addon.category,
    price: addon.price,
  }));

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({ name: 'Pricing & free estimates', path: site.routes.pricing }),
          breadcrumbSchema(crumbs),
          ...(faqs.length > 0 ? [faqSchema(faqs)] : []),
        ]}
      />

      <PageHero
        eyebrow={data.heroTagline ?? 'Clear, honest estimates'}
        title={data.heroTitle ?? 'Simple, transparent pricing'}
        description={
          data.heroDescription ??
          'No hidden fees, ever. All prices are in Canadian dollars (CAD), and your exact quote is confirmed in writing before we book.'
        }
        crumbs={crumbs}
        imageUrl="/pricing-hero.jpg" 
      />

      {(residential.length > 0 || commercial.length > 0) && (
        <Section
          id="plans"
          eyebrow="Plans"
          title="Choose the service level that fits"
          description="Starting prices for the most common jobs. Tap a plan to request your exact quote."
        >
          <PricingTiers plans={residential} commercialPlans={commercial} />
        </Section>
      )}

      {addonRows.length > 0 && (
        <Section
          id="addons"
          tone="muted"
          eyebrow="Add-ons & specialty"
          title="Standalone and specialty services"
          description="Indoor cleaning, holiday lights and extras you can book on their own or add to any plan."
        >
          <PricingTable
            rows={addonRows}
            labels={{ service: 'Service', details: 'Type', price: 'Price' }}
            hint="Tap any row to get a free quote for that service."
          />
        </Section>
      )}

      <Section
        id="estimator"
        eyebrow="Instant estimator"
        title="Estimate your window cleaning price"
        description="Choose your property type, window count and any add-ons for a quick online estimate."
      >
        <ServiceCalculator />
      </Section>

      {/* Replaced the old Section + FaqList with your new component */}
      {faqs.length > 0 && (
        <FaqSection items={faqs} />
      )}

      <CtaSection
        title="Ready for year-round home care?"
        description="Book your indoor cleaning, seasonal wash or winter lights with Kamloops' trusted local team. We confirm your price in writing within one business day."
      />
    </>
  );
}