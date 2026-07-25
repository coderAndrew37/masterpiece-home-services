'use client';

import ComparisonTable from '@/components/ComparisonTable';
import CtaBanner from '@/components/CtaBanner';
import PageTransition from '@/components/PageTransition';
import ProcessTimeline from '@/components/ProcessTimeline';
import { motion } from 'framer-motion';
import React from 'react';
import { FiShield } from 'react-icons/fi';
import Image from 'next/image';

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface ComparisonItem {
  feature: string;
  shine: boolean; // Retained prop compatibility for underlying table
  competitors: boolean | string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface WhyUsClientProps {
  benefits: Benefit[];
  comparisonData: ComparisonItem[];
  processSteps: ProcessStep[];
}

export default function WhyUsClient({
  benefits,
  comparisonData,
  processSteps,
}: WhyUsClientProps): React.JSX.Element {
  return (
    <PageTransition>
    {/* 1. Masterpiece Hero Header */}
<section className="relative bg-slate-950 text-white py-24 sm:py-32 overflow-hidden">
  {/* Background Image Container */}
  <div className="absolute inset-0 z-0">
    <Image
      src="/images/residential-1.jpg"
      alt="Masterpiece Home Services Exterior Care"
      fill
      priority
      quality={85}
      className="object-cover object-center opacity-30 scale-105"
    />
    {/* Dark Overlay Gradients for Depth & Legibility */}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
    <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]" />
  </div>

  {/* Dynamic Ambient Radial Glows */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none z-10" />
  <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-sky-500/10 rounded-full blur-[90px] pointer-events-none z-10" />

  <div className="container mx-auto px-4 max-w-5xl relative z-20 text-center">
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md"
    >
      <FiShield className="w-4 h-4 text-blue-400" />
      <span>The Masterpiece Standard</span>
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight drop-shadow-md"
    >
      Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500">Masterpiece</span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-sm"
    >
      Kamloops’ premier choice for precision window detailing, soft washing, eavestrough protection, and custom exterior care.
    </motion.p>
  </div>
</section>

      {/* 2. Main Content Container */}
      <div className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Section: Commitment to Excellence */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block">
                Unmatched Quality & Service
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Our Commitment to Perfection
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                At Masterpiece Home Services, we don&apos;t just clean properties—we restore curb appeal, protect your structural investments, and deliver a frictionless service experience from first estimate to final squeegee pass.
              </p>
            </motion.div>
          </div>

          {/* Section: Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
              >
                {/* Number Badge */}
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 font-black text-lg flex items-center justify-center mb-6 group-hover:bg-blue-700 group-hover:text-white transition-colors duration-300">
                  {index + 1}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Section: How We Compare Table */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-2">
                Transparent Comparison
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                How Masterpiece Compares
              </h2>
            </div>
            <ComparisonTable data={comparisonData} />
          </div>

          {/* Section: Process Timeline */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-2">
                Hassle-Free Care
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Our Proven Process
              </h2>
            </div>
            <ProcessTimeline steps={processSteps} />
          </div>

          {/* Section: Bottom CTA Banner */}
          <CtaBanner
            tagline="Kamloops & Surrounding Region"
            title="Experience the Masterpiece Difference"
            description="Join hundreds of satisfied homeowners across Kamloops who trust our certified, fully insured technicians with their properties."
            buttonText="Schedule Your Free Estimate"
          />

        </div>
      </div>
    </PageTransition>
  );
}