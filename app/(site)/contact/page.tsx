import type { Metadata } from 'next';
import { ArrowRight, Phone } from 'lucide-react';

import { FaqList } from '@/components/faq/FaqList';
import type { ServiceArea } from '@/components/home/AreasSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { AreaPills } from '@/components/services/AreaPills';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { phoneNumber, phoneTel } from '@/lib/constants';
import { contactFaqs } from '@/lib/data/contactFaqs';
import { allServicesQuery, serviceAreasQuery } from '@/lib/sanity/queries';
import { safeFetch } from '@/lib/sanity/safeFetch';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/seo/schema';
import { site } from '@/lib/site';
import type { ServiceItem } from '@/types/service';
import { ContactForm } from '@/components/ContactForm';
import { ContactDetails } from '@/components/ContactInfo';
import { PageHero } from '@/components/PageHero';

export const revalidate = 60;

export const metadata: Metadata = createMetadata({
  title: 'Contact Us for a Free Quote in Kamloops, BC',
  description:
    'Request a free written quote for window, gutter, soft wash, pressure wash or Christmas light jobs in Kamloops and the Thompson-Okanagan. Call or message us.',
  path: site.routes.contact,
  image: site.images.og,
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: site.routes.contact },
];

export default async function ContactPage(): Promise<React.JSX.Element> {
  const [services, areas] = await Promise.all([
    safeFetch<ServiceItem[]>(allServicesQuery, []),
    safeFetch<ServiceArea[]>(serviceAreasQuery, []),
  ]);

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({ name: 'Contact Masterpiece Home Services', path: site.routes.contact, type: 'ContactPage' }),
          breadcrumbSchema(crumbs),
          faqSchema(contactFaqs),
        ]}
      />

      <PageHero
        eyebrow="Contact"
        title="Get a free quote in Kamloops"
        description="Tell us what you need and we’ll confirm your price in writing within one business day. Prefer to talk? Give us a call."
        crumbs={crumbs}
      >
        <ButtonLink href="#contact-form" size="lg">
          Send a message
          <ArrowRight aria-hidden className="size-4" />
        </ButtonLink>
        <ButtonLink href={phoneTel} variant="secondary" size="lg">
          <Phone aria-hidden className="size-4" />
          {phoneNumber}
        </ButtonLink>
      </PageHero>

      <Section
        id="contact-form"
        eyebrow="Get in touch"
        title="Tell us about your home"
        description="A few details are enough. We’ll follow up if we need anything else."
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <ContactForm services={services.map((service) => service.title)} />
          </div>
          <aside aria-label="Contact details" className="lg:sticky lg:top-28 lg:col-span-5">
            <ContactDetails />
          </aside>
        </div>
      </Section>

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

      <Section id="faq" eyebrow="FAQ" title="Questions before you book">
        <div className="mx-auto max-w-3xl">
          <FaqList items={contactFaqs} />
        </div>
      </Section>
    </>
  );
}