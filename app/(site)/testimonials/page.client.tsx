// src/app/testimonials/page.client.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import CtaBanner from '@/components/CtaBanner';
import ReviewGatingForm from '@/components/ReviewGatingForm';
import { FiStar, FiPhone, FiCheckCircle, FiExternalLink, FiShield } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { phoneNumber, phoneTel } from '@/lib/constants';

interface GoogleReview {
  authorName: string;
  authorPhotoUrl?: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
}

interface DirectTestimonial {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  location?: string;
  publishedAt: string;
}

interface TestimonialsClientProps {
  googleRating: number | null;
  googleReviewCount: number | null;
  googleReviews: GoogleReview[];
  googleMapsUrl: string | null;
  googleReviewUrl: string;
  directTestimonials: DirectTestimonial[];
}

function Stars({ rating }: { rating: number }): React.JSX.Element {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <FiStar key={i} className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
      ))}
    </div>
  );
}

export default function TestimonialsClient({
  googleRating,
  googleReviewCount,
  googleReviews,
  googleMapsUrl,
  googleReviewUrl,
  directTestimonials,
}: TestimonialsClientProps): React.JSX.Element {
  const hasAnyReviews = googleReviews.length > 0 || directTestimonials.length > 0;

  return (
    <PageTransition>
      <section className="relative py-20 lg:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/residential-1.jpg"
            alt="Happy Homeowner Background"
            fill
            priority
            quality={85}
            className="object-cover object-center opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          {googleRating !== null && googleReviewCount !== null && googleReviewCount > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-6 border border-blue-400/30 shadow-lg">
              <Stars rating={Math.round(googleRating)} />
              <span>
                {googleRating.toFixed(1)} Rated \u00b7 {googleReviewCount} Google Review{googleReviewCount === 1 ? '' : 's'}
              </span>
            </div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4"
          >
            What Our Neighbors <span className="text-blue-400">Say About Us</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Real feedback from homeowners across Kamloops.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <ReviewGatingForm googleReviewUrl={googleReviewUrl} />

          {!hasAnyReviews ? (
            <div className="text-center py-12 mb-16">
              <p className="text-slate-500 font-semibold">
                We&apos;re just getting started <span className="text-blue-700">be the first to share your experience above!</span>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {googleReviews.map((review, i) => (
                <div key={`google-${i}`} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <Stars rating={review.rating} />
                    <FcGoogle className="w-5 h-5" />
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-4 line-clamp-5">{review.text}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold">{review.authorName}</span>
                    <span>{review.relativeTimeDescription}</span>
                  </div>
                </div>
              ))}

              {directTestimonials.map((t) => (
                <div key={t._id} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <Stars rating={t.rating} />
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Direct</span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-4 line-clamp-5">{t.comment}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold">{t.name}</span>
                    {t.location && <span>{t.location}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {googleMapsUrl && (
            <div className="text-center mb-20">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:underline"
              >
                <span>See all reviews on Google</span>
                <FiExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl relative overflow-hidden mb-20"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto mb-2">
                <FiShield className="w-8 h-8" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Our 100% Streak-Free Guarantee</h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                We stand behind every single job. If you notice any spots or streaks within 48 hours of service, we&apos;ll return to re-clean affected areas free of charge \u2014 no questions asked.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold text-slate-300">
                <span className="flex items-center gap-2"><FiCheckCircle className="text-blue-400" /> Fully Insured ($5M CGL)</span>
                <span className="flex items-center gap-2"><FiCheckCircle className="text-blue-400" /> WorkSafeBC Covered</span>
                <span className="flex items-center gap-2"><FiCheckCircle className="text-blue-400" /> Local Crew</span>
              </div>
              <div className="pt-6">
 <a               
                  href={phoneTel}
                  className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-lg shadow-blue-700/30 active:scale-[0.98]"
                >
                  <FiPhone className="w-4 h-4" />
                  <span>Call Our Dispatch: {phoneNumber}</span>
                </a>
              </div>
            </div>
          </motion.div>

          <CtaBanner
            tagline="Kamloops & Surrounding Areas"
            title="Ready to Join Our Satisfied Homeowners?"
            description="Book your window wash or eavestrough cleaning today with Kamloops' local team."
            buttonText="Request Free Quote"
          />
        </div>
      </section>
    </PageTransition>
  );
}