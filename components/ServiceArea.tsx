// src/components/ServiceArea.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiPhone, FiMapPin, FiStar } from 'react-icons/fi';
import { phoneNumber, phoneTel } from '@/lib/constants';
import { useQuoteModal } from '@/components/QuoteModalProvider';

interface ServiceAreaItem {
  _id: string;
  name: string;
  slug: string;
}

interface RatingSummary {
  score: number;
  reviewCount: number;
}

interface ServiceAreaProps {
  areas: ServiceAreaItem[];
  // Pass real data from your GBP/review source once wired up. Until then,
  // this section renders without a fabricated number — see roadmap notes
  // on AggregateRating schema risk.
  rating?: RatingSummary;
}

export default function ServiceArea({ areas, rating }: ServiceAreaProps): React.JSX.Element {
  const { openModal } = useQuoteModal();

  return (
    <section className="relative min-h-[520px] lg:min-h-[580px] py-20 bg-slate-950 text-white flex items-center overflow-hidden">
      <Image
        src="/images/residential-1.jpg"
        alt="Kamloops service area backdrop"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-center z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40 z-10" />

      <div className="container mx-auto px-4 max-w-7xl relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 bg-blue-600 rounded-full inline-block shrink-0" />
              <span className="text-slate-200 font-semibold text-base sm:text-lg">
                Local Service Coverage
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Proudly Serving Kamloops & Surrounding Areas.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Prompt, local exterior and interior home services across Kamloops, plus{' '}
              <strong className="text-white">Sun Peaks</strong> and surrounding{' '}
              <strong className="text-white">Thompson-Okanagan</strong> communities. Fully insured, WorkSafeBC-covered crews serving:
            </p>

            {/* Neighborhood pills — real <Link> tags, crawlable, more scannable than an inline sentence */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {areas.map((area) => (
                <Link
                  key={area._id || area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-blue-600 border border-white/10 hover:border-blue-500 text-white text-sm font-semibold transition-all duration-200"
                >
                  <FiMapPin className="w-3.5 h-3.5 text-blue-400" />
                  {area.name}
                </Link>
              ))}
              <Link
                href="/service-areas"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 hover:border-white/40 text-slate-300 hover:text-white text-sm font-semibold transition-all duration-200"
              >
                View all areas →
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => openModal()}
                className="px-7 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-blue-700/20 text-sm sm:text-base"
              >
                Get Started
              </button>
              <a
              
                href={phoneTel}
                className="px-6 py-3.5 border-2 border-blue-600 hover:bg-blue-600/20 text-white font-bold rounded-xl transition-all duration-200 inline-flex items-center gap-2 text-sm sm:text-base"
              >
                <FiPhone className="w-4 h-4 text-blue-400" />
                <span>{phoneNumber}</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 lg:justify-self-end w-full max-w-md mt-6 lg:mt-0"
          >
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl flex items-center gap-5">
              {rating ? (
                <>
                  <div className="flex flex-col items-center shrink-0">
                    <span className="text-3xl font-black text-white">{rating.score.toFixed(1)}</span>
                    <div className="flex text-amber-400 text-xs gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FiStar key={i} className="fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base leading-tight">Clients Feedback</h4>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Based on {rating.reviewCount} Google reviews
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-11 h-11 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0">
                    <FiStar className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base leading-tight">Trusted Across Kamloops</h4>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Fully insured &amp; WorkSafeBC covered
                    </span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}