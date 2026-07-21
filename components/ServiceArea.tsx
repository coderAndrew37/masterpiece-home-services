'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiStar, FiPhone } from 'react-icons/fi';

export default function ServiceArea(): React.JSX.Element {
  return (
    <section className="relative min-h-[520px] lg:min-h-[580px] py-20 bg-slate-950 text-white flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/residential-1.jpg" // Ensure this image exists in /public/images/
        alt="Kamloops service area backdrop"
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-center z-0"
      />

      {/* Dark Gradient Overlay for High Contrast Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40 z-10" />

      {/* Main Content Container */}
      <div className="container mx-auto px-4 max-w-7xl relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Left Side: Headline & Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 max-w-2xl"
          >
            {/* Tagline with Blue Vertical Bar Accent */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 bg-blue-600 rounded-full inline-block shrink-0" />
              <span className="text-slate-200 font-semibold text-base sm:text-lg">
                Local Service Coverage
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Proudly Serving Kamloops & Surrounding Areas.
            </h2>

            {/* Paragraph Body */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              We provide prompt, local exterior home services across <strong className="text-white">Kamloops (Sahali, Aberdeen, Westsyde, Valleyview)</strong>, <strong className="text-white">Sun Peaks</strong>, and surrounding <strong className="text-white">Thompson-Okanagan</strong> communities. Our certified crew is equipped for all residential and commercial needs.
            </p>

            {/* Action Buttons (Your Brand Colors: Solid Blue & Outline Blue) */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="px-7 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-blue-700/20 text-sm sm:text-base"
              >
                Get Started
              </Link>
              
              <a
                href="tel:2505550199"
                className="px-6 py-3.5 border-2 border-blue-600 hover:bg-blue-600/20 text-white font-bold rounded-xl transition-all duration-200 inline-flex items-center gap-2 text-sm sm:text-base"
              >
                <FiPhone className="w-4 h-4 text-blue-400" />
                <span>(250) 555-0199</span>
              </a>
            </div>
          </motion.div>

          {/* Right Side: Floating Glassmorphism Rating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 lg:justify-self-end w-full max-w-md mt-6 lg:mt-0"
          >
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl flex items-center gap-5">
              {/* Avatar Stack */}
              <div className="flex -space-x-3 shrink-0">
                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  JD
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                  MK
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                  ST
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  RC
                </div>
              </div>

              {/* Reviews Summary */}
              <div>
                <h4 className="text-white font-bold text-base leading-tight">
                  Clients Feedback
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-black text-white">4.9</span>
                  <div className="flex flex-col">
                    <div className="flex text-amber-400 text-xs gap-0.5">
                      <FiStar className="fill-amber-400" />
                      <FiStar className="fill-amber-400" />
                      <FiStar className="fill-amber-400" />
                      <FiStar className="fill-amber-400" />
                      <FiStar className="fill-amber-400" />
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Overall Reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}