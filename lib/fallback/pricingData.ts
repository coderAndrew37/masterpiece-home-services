// src/lib/fallback/pricingData.ts
import type { PricingPlan, Addon, PricingFaqItem } from '@/types/pricing';

export const defaultResidentialPricing: PricingPlan[] = [
  {
    title: 'Essential Care',
    description: 'Perfect for routine maintenance, seasonal window washes & quick indoor tidy-ups.',
    price: '$199',
    popular: false,
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
    features: [
      'Complete Glass & Screen Deep Clean',
      'Custom Christmas Light Design & Installation',
      'Post-Holiday Light Removal & Storage',
      'High-Volume Driveway & Patio Wash',
      'Complete Interior Deep Clean Service',
      'Complimentary Property Inspection',
    ],
  },
];

export const defaultCommercialPricing: PricingPlan[] = [
  {
    title: 'Storefront & Retail',
    description: 'Bi-weekly or monthly window & indoor janitorial upkeep for high-foot-traffic shops.',
    price: 'Custom',
    popular: false,
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
    features: [
      'Full Complex Exterior Soft Washing',
      'Common Area Indoor Deep Cleaning',
      'Strata Holiday Light Hanging & Take Down',
      'High-Reach Eavestrough Flushing',
      'Dedicated On-Site Safety Lead',
    ],
  },
];

export const defaultAddons: Addon[] = [
  { service: 'Indoor House Cleaning (Deep Clean / Move-In)', price: 'from $149', category: 'Interior Care' },
  { service: 'Christmas / Holiday Light Installation', price: 'from $299', category: 'Winter Service' },
  { service: 'Solar Panel Pure-Water Cleaning', price: 'from $79', category: 'Eco Care' },
  { service: 'Pressure Washing (Driveways & Patios)', price: 'from $149', category: 'Surface Wash' },
  { service: 'House Soft Wash (Vinyl, Stucco, Siding)', price: 'from $229', category: 'Exterior Siding' },
  { service: 'Roof Moss & Debris Treatment', price: 'from $299', category: 'Roof Care' },
];

export const defaultFaqs: PricingFaqItem[] = [
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
];