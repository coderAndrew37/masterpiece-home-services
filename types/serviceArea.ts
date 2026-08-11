// src/types/serviceArea.ts
import type { SanityImageRef } from './service';

export interface ServiceAreaCard {
  _id: string;
  name: string;
  slug: string;
  intro?: string;
  heroImage?: SanityImageRef;
}

export interface ServiceAreaRelatedService {
  blurb: string;
  service: {
    title: string;
    slug: string;
    icon: string;
  };
}

export interface ServiceAreaDetail {
  _id: string;
  name: string;
  slug: string;
  region?: string;
  intro: string;
  localHook?: string;
  heroImage?: SanityImageRef;
  seoTitle?: string;
  seoDescription?: string;
  relatedServices?: ServiceAreaRelatedService[];
}