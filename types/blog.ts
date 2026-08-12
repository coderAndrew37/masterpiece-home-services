import type { PortableTextBlock } from "@portabletext/types";
import type { Image as SanityImageType } from "sanity";

/**
 * Sanity's base `Image` type only knows about `asset`, `hotspot`, and `crop`.
 * Our schema adds custom `alt` and `caption` fields inside the image's
 * `fields: [...]` array, so we extend the base type to describe them.
 * Without this, `mainImage.alt` / `mainImage.caption` resolve to `unknown`
 * and React refuses to render them (TS2322).
 */
export interface SanityImageWithMeta extends SanityImageType {
  alt?: string;
  caption?: string;
}

export interface PostCard {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage: SanityImageWithMeta;
  publishedAt: string;
  readingTime?: number;
  author: {
    name: string;
    slug: string;
    image?: SanityImageWithMeta;
  };
  categories: { title: string; slug: string }[];
}

export interface PostDetail extends Omit<PostCard, "author"> {
  body: PortableTextBlock[];
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImageWithMeta;
  relatedServiceSlugs?: string[];
  author: PostCard["author"] & {
    role?: string;
    bio?: string;
  };
  updatedAt?: string;
  noIndex?: boolean;
}