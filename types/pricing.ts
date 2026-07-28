// src/types/pricing.ts
export interface PricingPlan {
  title: string;
  description: string;
  price: string;
  features: string[];
  popular: boolean;
}

export interface Addon {
  service: string;
  price: string;
  category?: string;
}

export interface PricingFaqItem {
  question: string;
  answer: string;
}

export interface PricingPageData {
  heroTagline?: string;
  heroTitle: string;
  heroDescription?: string;
  residentialPricing: PricingPlan[];
  commercialPricing: PricingPlan[];
  addons: Addon[];
  faqs: PricingFaqItem[];
}