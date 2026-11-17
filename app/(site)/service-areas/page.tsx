// src/app/service-areas/page.tsx
import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { serviceAreasQuery } from '@/lib/sanity/queries';
import type { ServiceAreaCard } from '@/types/serviceArea';
import ServiceAreasClient from './page.client';
import { createMetadata } from '@/lib/seo/metadata';
import { site } from '@/lib/site';

const SITE_URL = 'https://www.masterpiecehomeservices.ca';
const PAGE_URL = `${SITE_URL}/service-areas`;

export const metadata: Metadata = createMetadata({
  title: 'Service Areas: Sahali, Aberdeen, Westsyde & More',
  description:
    'Masterpiece Home Services serves Sahali, Aberdeen, Westsyde, Brocklehurst and neighbourhoods throughout Kamloops, BC.',
  path: site.routes.serviceAreas,
  image: site.images.og,
});

export const revalidate = 3600;

export default async function ServiceAreasPage(): Promise<React.JSX.Element> {
  const areas = await client.fetch<ServiceAreaCard[]>(serviceAreasQuery);

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${PAGE_URL}#collection`,
    url: PAGE_URL,
    name: 'Service Areas | Masterpiece Home Services Kamloops',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: areas.map((area, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/service-areas/${area.slug}`,
        name: area.name,
      })),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: PAGE_URL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ServiceAreasClient areas={areas} />
    </>
  );
}