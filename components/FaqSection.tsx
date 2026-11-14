'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

interface FaqItem {
  question: string;
  answer: string;
}

// Fallback FAQs based on Ubersuggest pricing intent
const fallbackPricingFaqs: FaqItem[] = [
  {
    question: 'What should I expect to pay for a full exterior and interior window cleaning service in Canada?',
    answer: 'For a standard two-storey home in Canada, full interior and exterior window cleaning typically ranges from $250 to $450 CAD, depending on the number of panes and accessibility. We provide a written, no-obligation quote before any work begins.',
  },
  {
    question: 'What is the average cost of eavestrough (gutter) cleaning for a detached home in Canada?',
    answer: 'Gutter cleaning for an average detached home in Canada usually costs between $150 and $300 CAD. Homes with heavy tree coverage or multiple storeys may fall on the higher end. We also offer gutter guard installation to reduce future cleaning costs.',
  },
  {
    question: 'What is the typical cost of soft washing a house in Canada compared to pressure washing?',
    answer: 'Soft washing a full house exterior typically ranges from $300 to $600 CAD, while pressure washing a driveway or deck usually costs between $150 and $350 CAD. Soft washing uses low pressure and specialized solutions, making it safer for vinyl and stucco siding.',
  },
  {
    question: 'Which window cleaning companies offer the best value for residential properties in Canada?',
    answer: 'The best value comes from companies that offer transparent flat-rate pricing, bundle discounts, and fully insured technicians. We combine professional-grade equipment with local expertise to ensure streak-free results that last longer, saving you money on repeat cleanings.',
  },
  {
    question: 'Where can I find an affordable pressure washing service for my home’s exterior in Canada?',
    answer: 'Look for local companies that offer bundled packages (e.g., combining driveway pressure washing with window cleaning) to unlock discounts. Our pricing is highly competitive, and we offer free, detailed estimates so you know exactly what you are paying for.',
  },
  {
    question: 'Which professional Christmas light installation service offers the best packages for residential homes in Canada?',
    answer: 'Our full-service Christmas light packages include custom-fit commercial LED lights, safe installation, mid-season maintenance, and January takedown/storage. Pricing depends on roofline length and design complexity, with most residential packages starting around $400 CAD.',
  },
  {
    question: 'Do you offer multi-service bundle discounts?',
    answer: 'Yes. Combining multiple outdoor services—such as window washing, gutter cleaning, and pressure washing—unlocks exclusive bundle discounts. This is the most cost-effective way to maintain your home’s exterior in one visit.',
  },
];

interface FaqSectionProps {
  items?: FaqItem[];
}

export default function FaqSection({ items }: FaqSectionProps): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  // Use passed items if they exist, otherwise use the fallback list
  const displayFaqs = items && items.length > 0 ? items : fallbackPricingFaqs;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-ink mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Questions about pricing
          </h2>
          <p className="text-slate-600 text-base">
            Clear answers about costs, bundles, and what you can expect to pay in Kamloops.
          </p>
        </div>

        <div className="space-y-4">
          {displayFaqs.map((faq: FaqItem, idx: number) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors bg-white shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50/80 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-900 text-base sm:text-lg pr-4">
                    {faq.question}
                  </span>
                  <FiChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-700' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-6 pt-0 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/80 bg-slate-50/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}