// src/types/service.ts
import type { PortableTextBlock } from '@portabletext/types';

export interface SanityImageRef {
  asset: { _ref: string; _type: 'reference' };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
}

export interface ServiceItem {
  _id: string;
  slug: string;
  title: string;
  cardImage: SanityImageRef;
  shortDescription: string;
  features: string[];
  icon: string;
  badge?: string;
  startingPrice: string;
  featuredOnHome: boolean;
  homeSubtitle?: string;
}

export interface DetailedService {
  _id: string;
  slug: string;
  title: string;
  subtitle: string;
  heroImage?: SanityImageRef;
  cardImage: SanityImageRef;
  icon: string;
  badge?: string;
  startingPrice: string;
  description: PortableTextBlock[];
  processSteps: { title: string; desc: string }[];
  whatsIncluded: string[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
}