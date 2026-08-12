import type { PortableTextBlock } from "@portabletext/types";
import type { Image as SanityImageType } from "sanity";

export interface PostCard {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage: SanityImageType;
  publishedAt: string;
  readingTime?: number;
  author: {
    name: string;
    slug: string;
    image?: SanityImageType;
  };
  categories: { title: string; slug: string }[];
}

export interface PostDetail extends Omit<PostCard, "author"> {
  body: PortableTextBlock[];
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImageType;
  relatedServiceSlugs?: string[];
  author: PostCard["author"] & {
    role?: string;
    bio?: string;
  };
  updatedAt?: string;
  noIndex?: boolean;
}