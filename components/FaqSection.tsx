'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'Do I need to be home during the exterior service?',
    answer: 'No! As long as exterior water spigots are accessible and gates are unlocked, our team can complete window cleaning, soft washing, or eavestrough care while you are away.',
  },
  {
    question: 'Are you insured and safety certified?',
    answer: 'Yes, Masterpiece Home Services carries $5M in commercial general liability insurance and is fully covered under WorkSafeBC.',
  },
  {
    question: 'What happens if it rains on my scheduled cleaning day?',
    answer: 'Light rain does not affect pure-water window cleaning results. However, in cases of severe storms or high winds, we will contact you to reschedule at no additional cost.',
  },
  {
    question: 'How does Christmas Light Installation work in the winter?',
    answer: 'We supply custom-cut LED lighting, install them safely with property-friendly clips, maintain any burnt-out bulbs during the season, and return in January for complete removal and organized packing.',
  },
];

export default function FaqSection(): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base">
            Everything you need to know about our cleaning standards and policies.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq: FaqItem, idx: number) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50/80 transition-colors"
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