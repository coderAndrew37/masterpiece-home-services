'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import PricingCard from '@/components/PricingCard';
import ServiceCalculator from '@/components/ServiceCalculator';
import FAQ from '@/components/FAQ';
import CtaBanner from '@/components/CtaBanner';

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
}

export interface FAQItem {
  question: string;
  answer: string;
}

interface PricingClientProps {
  residentialPricing: PricingPlan[];
  commercialPricing: PricingPlan[];
  addons: Addon[];
  faqs: FAQItem[];
}

export default function PricingClient({
  residentialPricing,
  commercialPricing,
  addons,
  faqs,
}: PricingClientProps) {
  const [activeTab, setActiveTab] = useState('residential');

  return (
    <PageTransition>
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Transparent Pricing
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-blue-200 max-w-3xl mx-auto"
        >
          No hidden fees - quality service at fair prices
        </motion.p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'residential', name: 'Residential Pricing' },
            { id: 'commercial', name: 'Commercial Pricing' },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-700 text-white'
                  : 'bg-gray-100 text-blue-900 hover:bg-gray-200'
              }`}
            >
              {tab.name}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {(activeTab === 'residential'
            ? residentialPricing
            : commercialPricing
          ).map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              isCommercial={activeTab === 'commercial'}
            />
          ))}
        </div>

        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-blue-900 mb-8 text-center"
          >
            Additional Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addons.map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center border-l-4 border-blue-700"
              >
                <div>
                  <h3 className="font-bold text-blue-900">{addon.service}</h3>
                </div>
                <div className="text-blue-700 font-bold">{addon.price}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-blue-900 mb-8 text-center"
          >
            Estimate Your Cost
          </motion.h2>
          <ServiceCalculator />
        </div>

        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-blue-900 mb-8 text-center"
          >
            Frequently Asked Questions
          </motion.h2>
          <FAQ faqs={faqs} title="" />
        </div>

        <CtaBanner
          title="Ready for Crystal Clear Windows?"
          description="Get a free quote today with no obligation"
          buttonText="Request Free Quote"
        />
      </div>
    </PageTransition>
  );
}