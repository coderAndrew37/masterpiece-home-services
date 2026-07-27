import type { SanityImageSource } from '@sanity/image-url';

export interface HomeGalleryItem {
  _key: string;
  image: SanityImageSource | null;
  alt: string;
  category: string;
}