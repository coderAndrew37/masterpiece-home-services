import type { Metadata } from 'next';
import { site } from '@/lib/site';

interface PageMetadataInput {
  title: string | { absolute: string };
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

/**
 * Reusable per-page metadata: canonical, Open Graph, Twitter and robots in one call.
 * `metadataBase` and `title.template` belong in the root layout (see CHANGES.md).
 */
export function createMetadata({
  title,
  description,
  path = '/',
  image = site.images.og,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const titleText = typeof title === 'string' ? title : title.absolute;
  const url = new URL(path, site.url).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: titleText,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${site.name}: exterior cleaning in ${site.city}, ${site.region}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
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
