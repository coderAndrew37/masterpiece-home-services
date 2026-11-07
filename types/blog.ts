import type { PortableTextBlock } from "@portabletext/types";
import type { Image as SanityImageType } from "sanity";

/**
 * Sanity's base `Image` type only knows about `asset`, `hotspot`, and `crop`.
 * Our schema adds custom `alt` and `caption` fields inside the image's
 * `fields: [...]` array, so we extend the base type to describe them.
 */
export interface SanityImageWithMeta extends SanityImageType {
  alt?: string;
  caption?: string;
}

// --- Shared Author Type ---
export interface PostAuthor {
  name: string;
  slug: string;
  image?: SanityImageWithMeta;
}

// --- Shared SEO / AEO Fields ---
interface PostSeoFields {
  noIndex?: boolean;
  primaryKeyword?: string;
  semanticKeywords?: string[];
  aeoQuickAnswer?: string;
}

// --- Card Data (List Views) ---
export interface PostCard extends PostSeoFields {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage: SanityImageWithMeta;
  publishedAt: string;
  readingTime?: number;
  author: PostAuthor;
  categories: { title: string; slug: string }[];
}

// --- Detail Data (Single Post View) ---
export interface PostDetail extends PostCard {
  body: PortableTextBlock[];
  tags?: string[];
  updatedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImageWithMeta;
  relatedServiceSlugs?: string[];
  relatedServiceAreaSlugs?: string[];
  author: PostAuthor & {
    role?: string;
    bio?: string;
  };
}