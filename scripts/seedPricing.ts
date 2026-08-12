// scripts/seedPricing.ts
import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import path from 'path';

config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN!,
  useCdn: false,
});

interface PricingPlanSeed {
  _key: string;
  title: string;
  description: string;
  price: string;
  popular: boolean;
  featuredOnHome: boolean;
  features: string[];
}

interface AddonSeed {
  _key: string;
  service: string;
  price: string;
  category?: string;
}

interface FaqSeed {
  _key: string;
  question: string;
  answer: string;
}

interface PricingPageSeed {
  _id: string;
  _type: 'pricingPage';
  heroTagline: string;
  heroTitle: string;
  heroDescription: string;
  residentialPricing: PricingPlanSeed[];
  commercialPricing: PricingPlanSeed[];
  addons: AddonSeed[];
  faqs: FaqSeed[];
}

function withKeys<T extends object>(items: T[]): (T & { _key: string })[] {
  return items.map((item) => ({ _key: crypto.randomUUID(), ...item }));
}

const residentialPricing = withKeys([
  {
    title: 'Essential Care',
    description: 'Perfect for routine maintenance, seasonal window washes & quick indoor tidy-ups.',
    price: '$199',
    popular: false,
    featuredOnHome: true,
    features: [
      'Exterior Window Detailing (Pure-Water)',
      'First-Floor Eavestrough Clearing',
      'Indoor House Cleaning (Kitchen & Bathrooms)',
      'Sill & Frame Wipe Down',
      '48-Hour Streak-Free Guarantee',
      'WorkSafeBC Covered & Insured',
    ],
  },
  {
    title: 'Complete Home Care',
    description: 'Our most popular year-round package covering full interior/exterior detailing.',
    price: '$349',
    popular: true,
    featuredOnHome: true,
    features: [
      'Interior & Exterior Window Detailing',
      'Full Eavestrough & Downspout Flush',
      'Deep Indoor Cleaning (Whole House Dust & Mop)',
      'Low-Pressure Soft Wash (Vinyl/Siding)',
      'Priority Winter Christmas Light Booking',
      '100% Satisfaction Guarantee',
    ],
  },
  {
    title: 'Seasonal All-Star',
    description: 'Full-property transformation: summer wash + winter custom Christmas lights setup.',
    price: '$549',
    popular: false,
    featuredOnHome: true,
    features: [
      'Complete Glass & Screen Deep Clean',
      'Custom Christmas Light Design & Installation',
      'Post-Holiday Light Removal & Storage',
      'High-Volume Driveway & Patio Wash',
      'Complete Interior Deep Clean Service',
      'Complimentary Property Inspection',
    ],
  },
]);

const commercialPricing = withKeys([
  {
    title: 'Storefront & Retail',
    description: 'Bi-weekly or monthly window & indoor janitorial upkeep for high-foot-traffic shops.',
    price: 'Custom',
    popular: false,
    featuredOnHome: false,
    features: [
      'Exterior & Interior Glass Pure-Water Wash',
      'Routine Indoor Commercial Janitorial Care',
      'Threshold & Entryway Deep Wash',
      'Flexible Early-Morning Hours',
      'Monthly Invoicing Available',
    ],
  },
  {
    title: 'Commercial Property',
    description: 'Scheduled maintenance for offices, medical centers & commercial facilities.',
    price: 'Custom',
    popular: true,
    featuredOnHome: false,
    features: [
      'Multi-Story Pure-Water Window Cleaning',
      'Indoor Office & Common Area Cleaning',
      'Commercial Holiday & Festival Light Install',
      'Patio & Sidewalk Pressure Washing',
      'Full Safety & WorkSafeBC Compliance',
    ],
  },
  {
    title: 'Strata & Multi-Unit',
    description: 'Comprehensive care plans for condominium developments and housing stratas.',
    price: 'Custom',
    popular: false,
    featuredOnHome: false,
    features: [
      'Full Complex Exterior Soft Washing',
      'Common Area Indoor Deep Cleaning',
      'Strata Holiday Light Hanging & Take Down',
      'High-Reach Eavestrough Flushing',
      'Dedicated On-Site Safety Lead',
    ],
  },
]);

const addons = withKeys([
  { service: 'Indoor House Cleaning (Deep Clean / Move-In)', price: 'from $149', category: 'Interior Care' },
  { service: 'Christmas / Holiday Light Installation', price: 'from $299', category: 'Winter Service' },
  { service: 'Solar Panel Pure-Water Cleaning', price: 'from $79', category: 'Eco Care' },
  { service: 'Pressure Washing (Driveways & Patios)', price: 'from $149', category: 'Surface Wash' },
  { service: 'House Soft Wash (Vinyl, Stucco, Siding)', price: 'from $229', category: 'Exterior Siding' },
  { service: 'Roof Moss & Debris Treatment', price: 'from $299', category: 'Roof Care' },
]);

const faqs = withKeys([
  {
    question: 'How does the Christmas Lights Installation service work?',
    answer:
      'We supply high-efficiency LED commercial lights custom-fit to your roofline, safely install them before winter hits, provide seasonal maintenance if any bulb goes out, and handle prompt removal/storage in January.',
  },
  {
    question: 'What is included in your Indoor House Cleaning service?',
    answer:
      'Our indoor team handles kitchen sanitization, bathroom scrubbing, floor vacuuming/mopping, dusting, and interior window glass polishing. We offer both routine maintenance visits and deep move-in/move-out cleans.',
  },
  {
    question: 'Can I bundle outdoor pressure washing with indoor cleaning?',
    answer:
      'Yes! Combining outdoor services (window wash, soft wash, gutters) with indoor cleaning or winter light hanging unlocks multi-service bundle discounts.',
  },
]);

const pricingPage: PricingPageSeed = {
  _id: 'pricingPage',
  _type: 'pricingPage',
  heroTagline: 'Clear, Honest Estimates',
  heroTitle: 'Simple, Transparent Pricing',
  heroDescription:
    'From indoor deep cleans and summer pressure washes to winter Christmas light hanging—no hidden fees, ever.',
  residentialPricing,
  commercialPricing,
  addons,
  faqs,
};

async function run() {
  const tx = client.transaction();
  tx.createOrReplace(pricingPage);
  const result = await tx.commit();
  console.log('Seeded pricingPage document.', result);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});