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
    question: 'What should I expect to pay for a full exterior and interior window cleaning service in Canada?',
    answer:
      'For a standard two-storey home in Canada, full interior and exterior window cleaning typically ranges from $250 to $450 CAD, depending on the number of panes and accessibility. At Masterpiece, we provide a written, no-obligation quote before any work begins.',
  },
  {
    question: 'What is the average cost of eavestrough (gutter) cleaning for a detached home in Canada?',
    answer:
      'Gutter cleaning for an average detached home in Canada usually costs between $150 and $300 CAD. Homes with heavy tree coverage or multiple storeys may fall on the higher end. We also offer gutter guard installation to reduce future cleaning costs.',
  },
  {
    question: 'What is the typical cost of soft washing a house in Canada compared to pressure washing?',
    answer:
      'Soft washing a full house exterior typically ranges from $300 to $600 CAD, while pressure washing a driveway or deck usually costs between $150 and $350 CAD. Soft washing uses low pressure and specialized solutions, making it safer for vinyl and stucco siding.',
  },
  {
    question: 'Which window cleaning companies offer the best value for residential properties in Canada?',
    answer:
      'The best value comes from companies that offer transparent flat-rate pricing, bundle discounts, and fully insured technicians. We combine professional-grade equipment with local expertise to ensure streak-free results that last longer, saving you money on repeat cleanings.',
  },
  {
    question: 'Where can I find an affordable pressure washing service for my home’s exterior in Canada?',
    answer:
      'Look for local companies that offer bundled packages (e.g., combining driveway pressure washing with window cleaning) to unlock discounts. Our pricing is highly competitive, and we offer free, detailed estimates so you know exactly what you are paying for.',
  },
  {
    question: 'Which professional Christmas light installation service offers the best packages for residential homes in Canada?',
    answer:
      'Our full-service Christmas light packages include custom-fit commercial LED lights, safe installation, mid-season maintenance, and January takedown/storage. Pricing depends on roofline length and design complexity, with most residential packages starting around $400 CAD.',
  },
  {
    question: 'Do you offer multi-service bundle discounts?',
    answer:
      'Yes. Combining multiple outdoor services—such as window washing, gutter cleaning, and pressure washing—unlocks exclusive bundle discounts. This is the most cost-effective way to maintain your home’s exterior in one visit.',
  },
];