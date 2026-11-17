import type { Metadata } from 'next';
import { site } from '@/lib/site';

interface PageMetadataInput {
  title: string | { absolute: string };
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
}

/**
 * Per-page metadata: canonical, Open Graph, Twitter and robots in one call.
 * Next.js merges metadata shallowly, so a page that sets its own `openGraph`
 * drops the layout's image. Every page should go through this helper.
 * `metadataBase` and `title.template` still belong in the root layout.
 */
export function createMetadata({
  title,
  description,
  path = '/',
  image = site.images.og,
  imageAlt,
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  keywords,
}: PageMetadataInput): Metadata {
  const titleText = typeof title === 'string' ? title : title.absolute;
  const url = new URL(path, site.url).toString();
  // Always absolute, and never empty, so crawlers and audits can't end up with a broken tag.
  const imageUrl = new URL(image || site.images.og, site.url).toString();

  const openGraphBase = {
    title: titleText,
    description,
    url,
    siteName: site.name,
    locale: site.locale,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: imageAlt ?? `${site.name}: exterior cleaning in ${site.city}, ${site.region}`,
      },
    ],
  };

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph:
      type === 'article'
        ? { ...openGraphBase, type: 'article', publishedTime, modifiedTime, authors }
        : { ...openGraphBase, type: 'website' },
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}