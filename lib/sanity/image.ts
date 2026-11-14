import { urlFor } from '@/lib/sanity/client';
import { site } from '@/lib/site';

type ImageSource = Parameters<typeof urlFor>[0];

interface ImageSize {
  width: number;
  height?: number;
}

/**
 * One place that turns whatever the CMS returns (asset reference, expanded
 * URL string, null) into a usable image URL. Replaces three near-identical
 * helpers that lived inside Gallery, ServicePlatforms and BlogCard.
 */
export function imageUrl(image: unknown, size: ImageSize, fallback: string = site.images.placeholder): string {
  if (!image) return fallback;
  if (typeof image === 'string') return image;

  try {
    let builder = urlFor(image as ImageSource)?.width(size.width);
    if (!builder) return fallback;
    if (size.height) builder = builder.height(size.height);
    return builder.auto('format').url() || fallback;
  } catch {
    return fallback;
  }
}
