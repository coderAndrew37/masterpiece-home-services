// src/app/gallery/page.tsx
import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { homeGalleryQuery } from '@/lib/sanity/queries';
import GalleryClient, { type GalleryImage } from './page.client';
import { site } from '@/lib/site';
import { createMetadata } from '@/lib/seo/metadata';

const SITE_URL = 'https://www.masterpiecehomeservices.ca';
const PAGE_URL = `${SITE_URL}/gallery`;

export const metadata: Metadata = createMetadata({
  title: 'Project Gallery: Cleaning Results in Kamloops',
  description:
    'See completed window cleaning, soft washing, gutter cleaning and pressure washing projects from Masterpiece Home Services in Kamloops, BC.',
  path: '/gallery',
  image: site.images.og,
});

interface SanityGalleryItem {
  _id: string;
  title: string;
  category: string;
  image: string;
  alt?: string;
}

const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'windows', name: 'Window Detailing' },
  { id: 'eavestroughs', name: 'Eavestroughs' },
  { id: 'soft-wash', name: 'Soft Washing' },
  { id: 'pressure-wash', name: 'Pressure Washing' },
  { id: 'indoor-cleaning', name: 'Indoor Cleaning' },
  { id: 'christmas-lights', name: 'Christmas Lights' },
];

export default async function GalleryPage(): Promise<React.JSX.Element> {
  const items = await client.fetch<SanityGalleryItem[]>(homeGalleryQuery);

  const images: GalleryImage[] = (items ?? []).map((item) => ({
    id: item._id,
    category: item.category,
    title: item.title,
    src: item.image,
    alt: item.alt,
  }));

  const galleryJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${PAGE_URL}#gallery`,
    url: PAGE_URL,
    name: 'Project Gallery | Masterpiece Home Services',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Gallery', item: PAGE_URL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <GalleryClient categories={categories} images={images} />
    </>
  );
}