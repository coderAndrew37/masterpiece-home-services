"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  title?: string;
  tagline?: string;
  faqs: FAQItem[];
  imageSrc?: string;
  imageAlt?: string;
}

export default function FAQ({
  title = "Frequently Asked Questions",
  tagline = "Help & Support",
  faqs,
  imageSrc = "/images/residential-1.jpg", // Ensure an image exists in public/images
  imageAlt = "Frequently Asked Questions",
}: FAQProps): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative w-full aspect-square sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-xl bg-slate-100"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
              priority={false}
            />
          </motion.div>

          {/* Right Column: Accordion List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Tagline with Blue Vertical Accent */}
            <div className="flex items-center gap-3 mb-3">
              <span className="w-1 h-6 bg-blue-700 rounded-full inline-block shrink-0" />
              <span className="text-slate-900 font-semibold text-base sm:text-lg">
                {tagline}
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight mb-8">
              {title}
            </h2>

            {/* FAQ List */}
            <div className="divide-y divide-slate-200/80 border-t border-b border-slate-200/80">
              {faqs.map((faq: FAQItem, index: number) => {
                const isOpen = openIndex === index;

                return (
                  <div key={index} className="py-5">
                    <button
                      type="button"
                      className="w-full text-left flex justify-between items-center gap-4 group transition-colors"
                      onClick={() => toggleFAQ(index)}
                    >
                      <h3
                        className={`text-lg font-bold transition-colors ${
                          isOpen ? "text-blue-700" : "text-blue-900 group-hover:text-blue-700"
                        }`}
                      >
                        {faq.question}
                      </h3>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={`shrink-0 ${
                          isOpen ? "text-blue-700" : "text-slate-400 group-hover:text-blue-700"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="pt-4 pb-1 text-slate-600 text-base leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}