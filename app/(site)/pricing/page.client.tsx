// src/app/pricing/page.client.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { FiDollarSign } from 'react-icons/fi';
import PageTransition from '@/components/PageTransition';
import CustomQuoteBanner from '@/components/CustomQuoteBanner';
import ServiceCalculator from '@/components/ServiceCalculator';
import FAQ from '@/components/FAQ';
import CtaBanner from '@/components/CtaBanner';
import PricingCard from '@/components/PricingCard';
import PricingTable from '@/components/PricingTable';
import type { PricingPlan, Addon, PricingFaqItem } from '@/types/pricing';

const defaultResidentialPricing: PricingPlan[] = [
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

const defaultCommercialPricing: PricingPlan[] = [
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

const defaultAddons: Addon[] = [
  { service: 'Indoor House Cleaning (Deep Clean / Move-In)', price: 'from $149', category: 'Interior Care' },
  { service: 'Christmas / Holiday Light Installation', price: 'from $299', category: 'Winter Service' },
  { service: 'Solar Panel Pure-Water Cleaning', price: 'from $79', category: 'Eco Care' },
  { service: 'Pressure Washing (Driveways & Patios)', price: 'from $149', category: 'Surface Wash' },
  { service: 'House Soft Wash (Vinyl, Stucco, Siding)', price: 'from $229', category: 'Exterior Siding' },
  { service: 'Roof Moss & Debris Treatment', price: 'from $299', category: 'Roof Care' },
];

const defaultFaqs: PricingFaqItem[] = [
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

interface PricingClientProps {
  residentialPricing?: PricingPlan[];
  commercialPricing?: PricingPlan[];
  addons?: Addon[];
  faqs?: PricingFaqItem[];
}

export default function PricingClient({
  residentialPricing = defaultResidentialPricing,
  commercialPricing = defaultCommercialPricing,
  addons = defaultAddons,
  faqs = defaultFaqs,
}: PricingClientProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<'residential' | 'commercial'>('residential');
  const currentPlans = activeTab === 'residential' ? residentialPricing : commercialPricing;

  return (
    <PageTransition>
      <section className="relative py-20 lg:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/residential-1.jpg"
            alt="Kamloops Property Care Pricing"
            fill
            priority
            quality={85}
            className="object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-4 border border-blue-400/30">
            <FiDollarSign className="w-3.5 h-3.5 text-blue-300" />
            <span>Clear, Honest Estimates</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4"
          >
            Simple, Transparent <span className="text-blue-400">Pricing</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            From indoor deep cleans and summer pressure washes to winter Christmas light hanging—no hidden fees, ever.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {[
              { id: 'residential', name: 'Residential Pricing' },
              { id: 'commercial', name: 'Commercial & Strata' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id as 'residential' | 'commercial')}
                  className={`px-7 py-3.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wide transition-all ${
                    isActive
                      ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/25'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {tab.name}
                </motion.button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <AnimatePresence mode="wait">
              {currentPlans.map((plan, index) => (
                <motion.div
                  key={`${activeTab}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <PricingCard plan={plan} isCommercial={activeTab === 'commercial'} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <CustomQuoteBanner />

          <div className="mb-24 mt-20">
            <PricingTable
              title="Standalone & Specialty Services"
              description="Need indoor cleaning or winter holiday light hanging? Add standalone options anytime."
              pricingOptions={addons.map((a) => ({
                service: a.service,
                details: a.category ?? '',
                price: a.price,
              }))}
            />
          </div>

          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-2">
                Instant Estimator
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Calculate Your Custom Estimate</h2>
              <p className="text-slate-600 text-sm mt-2">
                Select your service requirements for a quick online price estimate.
              </p>
            </div>
            <ServiceCalculator />
          </div>

          <div className="mb-20">
            <FAQ faqs={faqs} title="Frequently Asked Questions About Pricing" />
          </div>

          <CtaBanner
            tagline="Kamloops & Surrounding Areas"
            title="Ready for Year-Round Home Care?"
            description="Book your indoor cleaning, seasonal wash, or winter Christmas light setup with Kamloops' trusted local team."
            buttonText="Request Free Quote"
          />
        </div>
      </section>
    </PageTransition>
  );
}