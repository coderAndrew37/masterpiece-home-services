import { phoneNumber } from '@/lib/constants';
import { site } from '@/lib/site';
import type { FaqItem } from '@/types/faq';
import type { ServiceItem } from '@/types/service';

export type JsonLdNode = Record<string, unknown>;

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

const absolute = (path: string): string => new URL(path, site.url).toString();

type ServiceSummary = Pick<ServiceItem, 'title' | 'slug' | 'shortDescription'>;

/**
 * Other pages reference this node with { "@id": ORG_ID } instead of repeating
 * the whole business. The service catalogue is built from CMS data, so the schema
 * can't drift from the services you actually publish.
 */
export function organizationSchema(services: ServiceSummary[] = []): JsonLdNode {
  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': ORG_ID,
    name: site.name,
    url: site.url,
    logo: absolute(site.images.logo),
    image: absolute(site.images.og),
    telephone: phoneNumber,
    priceRange: site.priceRange,
    description: site.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: [
      { '@type': 'City', name: site.city },
      { '@type': 'AdministrativeArea', name: 'Thompson-Okanagan' },
      ...site.neighbourhoods.map((name) => ({ '@type': 'Place', name })),
    ],
    openingHoursSpecification: site.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    ...(site.socialLinks.length > 0 ? { sameAs: site.socialLinks } : {}),
    ...(services.length > 0
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Home services',
            itemListElement: services.map((service) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: service.title,
                ...(service.shortDescription ? { description: service.shortDescription } : {}),
                url: absolute(`${site.routes.services}/${service.slug}`),
              },
            })),
          },
        }
      : {}),
  };
}

/** Built from the same array that renders the on-page FAQ, so they can't disagree. */
export function faqSchema(faqs: FaqItem[]): JsonLdNode {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/** Pass the same array you give <Breadcrumbs>, so markup and schema match. */
export function breadcrumbSchema(items: { name: string; href: string }[]): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(item.href),
    })),
  };
}

interface ServiceSchemaInput {
  title: string;
  slug: string;
  description?: string;
  /** Display string such as "$169"; only the number is used. */
  startingPrice?: string;
}

export function serviceSchema({ title, slug, description, startingPrice }: ServiceSchemaInput): JsonLdNode {
  const url = absolute(`${site.routes.services}/${slug}`);
  const minPrice = startingPrice?.replace(/[^0-9.]/g, '');

  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    serviceType: title,
    name: title,
    ...(description ? { description } : {}),
    url,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'City', name: site.city },
    // A "starting at" price is a minimum, not a fixed price, so say so.
    ...(minPrice
      ? {
          offers: {
            '@type': 'Offer',
            url,
            priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'CAD', minPrice },
          },
        }
      : {}),
  };
}

export function websiteSchema(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    publisher: { '@id': ORG_ID },
  };
}