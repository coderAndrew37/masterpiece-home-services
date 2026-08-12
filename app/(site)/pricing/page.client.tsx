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
import {
  defaultResidentialPricing,
  defaultCommercialPricing,
  defaultAddons,
  defaultFaqs,
} from '@/lib/fallback/pricingData';

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
            From indoor deep cleans and summer pressure washes to winter Christmas light hanging—no hidden fees, ever. All prices shown in Canadian dollars (CAD).
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