'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import {
    FiArrowRight,
    FiDroplet,
    FiGrid,
    FiHome,
    FiPhoneCall
} from 'react-icons/fi';

export default function NotFound(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center relative overflow-hidden py-16 px-4">
      {/* Dynamic Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="container mx-auto max-w-2xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-blue-950/40 text-center relative overflow-hidden"
        >
          {/* Top Decorative Droplet Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <FiDroplet className="w-3.5 h-3.5 animate-bounce" />
            <span>Squeegeed Clean</span>
          </div>

          {/* 404 Headline with Gradient Text */}
          <h1 className="text-7xl sm:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-600 select-none mb-2">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
            Looks Like This Glass Is Missing
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8">
            The page you are looking for has been wiped clean or doesn&apos;t exist. Let&apos;s get you back on track.
          </p>

          {/* Action Grid Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-10">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-extrabold px-6 py-4 rounded-2xl text-sm transition-all duration-200 shadow-lg shadow-blue-700/30 group active:scale-[0.98]"
            >
              <FiHome className="w-4 h-4" />
              <span>Back to Homepage</span>
              <FiArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold px-6 py-4 rounded-2xl text-sm transition-all duration-200 active:scale-[0.98]"
            >
              <FiGrid className="w-4 h-4 text-blue-400" />
              <span>Explore Services</span>
            </Link>
          </div>

          {/* Quick Links Pills */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 font-semibold">
            <span className="text-slate-500">Popular Destinations:</span>
            <Link href="/gallery" className="hover:text-blue-400 transition-colors">
              Gallery
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/testimonials" className="hover:text-blue-400 transition-colors">
              Reviews
            </Link>
            <span className="text-slate-700">•</span>
            <Link href="/contact" className="hover:text-blue-400 transition-colors">
              Get Quote
            </Link>
          </div>

          {/* Emergency Phone Bar */}
          <div className="mt-8 pt-6 border-t border-slate-800/60 bg-slate-950/50 -mx-8 sm:-mx-12 -mb-8 sm:-mb-12 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">Prefer talking to a real human?</span>
            <a
              href="tel:2505550199"
              className="inline-flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 font-extrabold px-4 py-2 rounded-xl text-xs transition-colors"
            >
              <FiPhoneCall className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Call Dispatch: (250) 555-0199</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}