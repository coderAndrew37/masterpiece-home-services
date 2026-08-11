// src/app/services/page.client.tsx
'use client';

import CtaBanner from '@/components/CtaBanner';
import CustomQuoteBanner from '@/components/CustomQuoteBanner';
import PageTransition from '@/components/PageTransition';
import PricingTable from '@/components/PricingTable';
import ServiceBenefits from '@/components/ServiceBenefits';
import ServiceDetail from '@/components/ServiceDetail';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { FiGrid } from 'react-icons/fi';
import Link from 'next/link';
import type { ServiceItem } from '@/types/service';

interface ServicesClientProps {
  services: ServiceItem[];
  benefits: string[];
}

export default function ServicesClient({ services, benefits }: ServicesClientProps): React.JSX.Element {
  

  return (
    <PageTransition>
      <section className="relative py-20 lg:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/residential-1.jpg"
            alt="Masterpiece Services Kamloops"
            fill
            priority
            quality={85}
            className="object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-4 border border-blue-400/30">
            <FiGrid className="w-3.5 h-3.5" /> Full-Property Care
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4"
          >
            Our Property <span className="text-blue-400">Services</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            From pure-water window wash and soft washing to indoor housekeeping and winter light hanging across Kamloops.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-2">
              What We Do
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Complete Exterior & Interior Solutions
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Click any service below to explore full details, process explanations, and standalone pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <ServiceDetail key={service._id} service={service} />
            ))}
          </div>

          <CustomQuoteBanner />

          <ServiceBenefits title="Why Kamloops Homeowners Choose Masterpiece" benefits={benefits} />

          <PricingTable
            title="Standard Service Rates"
            description="Clear baseline pricing with zero hidden fees. See full plans and bundles on our Pricing page."
            pricingOptions={services.map((s) => ({
              service: s.title,
              details: s.shortDescription ?? 'Service details available upon request.',
              price: s.startingPrice ?? 'Custom quote',
            }))}
          />

          <div className="text-center -mt-8 mb-16">
            <Link href="/pricing" className="text-sm font-bold text-blue-700 hover:underline">
              View full pricing plans & bundles →
            </Link>
          </div>

          <CtaBanner
            tagline="Kamloops & Surrounding Areas"
            title="Ready to Schedule Your Service?"
            description="Get your free online estimate within 24 hours or call our team directly."
            buttonText="Request Free Quote"
          />
        </div>
      </section>
    </PageTransition>
  );
}