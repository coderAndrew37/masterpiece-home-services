'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import CtaBanner from '@/components/CtaBanner';
import ReviewCard from '@/components/ReviewCard';
import VideoTestimonial from '@/components/VideoTestimonial';
import {
  FiStar,

  FiPhone,
  FiCheckCircle,
  FiExternalLink,
  FiHeart,
  FiShield,
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import ReviewGatingModal from '@/components/ReviewGatingModal';

export interface Testimonial {
  id: number;
  name: string;
  role?: string;
  rating: number;
  content: string;
  category: string;
  date: string;
  location?: string;
}

export interface VideoItem {
  id: number;
  title: string;
  description: string;
  videoUrl?: string;
  thumbnailUrl?: string;
}

interface TestimonialsClientProps {
  testimonials?: Testimonial[];
  videoTestimonials?: VideoItem[];
  googleReviewUrl?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Thompson',
    role: 'Homeowner',
    rating: 5,
    content:
      'Masterpiece Home Services cleared our eavestroughs right before the autumn rains hit Sahali. They were prompt, professional, and left zero mess on the driveway!',
    category: 'residential',
    date: '2 weeks ago',
    location: 'Sahali, Kamloops',
  },
  {
    id: 2,
    name: 'Marcus Vance',
    role: 'Property Manager',
    rating: 5,
    content:
      'We hire Masterpiece for twice-yearly pure-water window detailing across our commercial retail blocks in Kamloops. The glass stays streak-free twice as long.',
    category: 'commercial',
    date: '1 month ago',
    location: 'Downtown Kamloops',
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Strata Council Lead',
    rating: 5,
    content:
      'Soft washing our multi-story residential strata complex restored the exterior vinyl siding completely. Excellent communication and WorkSafeBC compliance.',
    category: 'highrise',
    date: '2 months ago',
    location: 'Aberdeen, Kamloops',
  },
  {
    id: 4,
    name: 'David & Karen Miller',
    role: 'Homeowners',
    rating: 5,
    content:
      'The pure-water window detailing rendered our 2-story glass completely crystal clear. Best exterior cleaning crew in the Thompson-Okanagan!',
    category: 'residential',
    date: '3 months ago',
    location: 'Sun Peaks, BC',
  },
  {
    id: 5,
    name: 'Robert Chen',
    role: 'Business Owner',
    rating: 5,
    content:
      'Pressure washed our restaurant patio concrete after winter. Removed years of grease stains easily. Highly recommended!',
    category: 'commercial',
    date: '4 months ago',
    location: 'Valleyview, Kamloops',
  },
  {
    id: 6,
    name: 'Jessica Wright',
    role: 'Homeowner',
    rating: 5,
    content:
      'Called for an urgent post-storm eavestrough overflow check. They arrived next-day and cleared pine needles blocking our downspout.',
    category: 'residential',
    date: '5 months ago',
    location: 'Westsyde, Kamloops',
  },
];

const defaultVideoTestimonials: VideoItem[] = [
  {
    id: 1,
    title: 'Sahali Residential Window Detailing',
    description: 'See how pure-water technology restores high-reach glass without ladder marks.',
    thumbnailUrl: '/images/residential-1.jpg',
  },
  {
    id: 2,
    title: 'Sun Peaks Strata Soft Wash',
    description: 'Full exterior soft wash transformation removing moss and grime safely.',
    thumbnailUrl: '/images/residential-1.jpg',
  },
  {
    id: 3,
    title: 'Valleyview Commercial Gutter Flush',
    description: 'Complete high-volume downspout and eavestrough clearing in action.',
    thumbnailUrl: '/images/residential-1.jpg',
  },
];

const categories = [
  { id: 'all', name: 'All Reviews' },
  { id: 'residential', name: 'Residential Homes' },
  { id: 'commercial', name: 'Commercial Properties' },
  { id: 'highrise', name: 'Strata & High-Rise' },
];

export default function TestimonialsClient({
  testimonials: rawTestimonials,
  videoTestimonials: rawVideos,
  googleReviewUrl = 'https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review', // Replace with your actual Google Review link
}: TestimonialsClientProps): React.JSX.Element {
  const testimonials =
    rawTestimonials && rawTestimonials.length > 0 ? rawTestimonials : defaultTestimonials;
  const videoTestimonials =
    rawVideos && rawVideos.length > 0 ? rawVideos : defaultVideoTestimonials;

  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredTestimonials =
    activeTab === 'all'
      ? testimonials
      : testimonials.filter((t) => t.category === activeTab);

  return (
    <PageTransition>
      {/* 1. Hero Header */}
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-6 border border-blue-400/30 shadow-lg">
            <div className="flex items-center text-amber-300 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              ))}
            </div>
            <span>5.0 Rated Across Kamloops & BC</span>
          </div>

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
            Real feedback from homeowners, business managers, and strata councils across Kamloops and the Thompson-Okanagan.
          </motion.p>
        </div>
      </section>

      {/* 2. Main Content */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-14">
            {categories.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all ${
                    isActive
                      ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/20'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {tab.name}
                </motion.button>
              );
            })}
          </div>

          {/* Review Cards Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <AnimatePresence>
              {filteredTestimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ReviewCard testimonial={testimonial} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

         {/* 3. Interactive Review Gating Widget & Modal */}
<ReviewGatingModal googleReviewUrl="https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review" />
          {/* 4. Video Testimonials */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-2">
                Video Proof
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Watch On-Site Transformations
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                See our pure-water window systems and soft-wash rigs operating on local Kamloops homes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {videoTestimonials.map((video) => (
                <VideoTestimonial key={video.id} video={video} />
              ))}
            </div>
          </div>

          {/* 5. Satisfaction Guarantee */}
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

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Our 100% Streak-Free Guarantee
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                We stand behind every single job. If you notice any spots or streaks within 48 hours of service, our team will return to re-clean affected areas free of charge—no questions asked.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold text-slate-300">
                <span className="flex items-center gap-2">
                  <FiCheckCircle className="text-blue-400" /> Fully Insured ($5M CGL)
                </span>
                <span className="flex items-center gap-2">
                  <FiCheckCircle className="text-blue-400" /> WorkSafeBC Covered
                </span>
                <span className="flex items-center gap-2">
                  <FiCheckCircle className="text-blue-400" /> Local Crew
                </span>
              </div>

              <div className="pt-6">
                <a
                  href="tel:2505550199"
                  className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-lg shadow-blue-700/30 active:scale-[0.98]"
                >
                  <FiPhone className="w-4 h-4" />
                  <span>Call Our Dispatch: (250) 555-0199</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* 6. CTA Banner */}
          <CtaBanner
            tagline="Kamloops & Surrounding Areas"
            title="Ready to Join Our Satisfied Homeowners?"
            description="Book your window wash or eavestrough cleaning today with Kamloops' highest-rated exterior team."
            buttonText="Request Free Quote"
          />
        </div>
      </section>
    </PageTransition>
  );
}