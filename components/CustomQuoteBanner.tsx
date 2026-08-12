"use client";

import { phoneNumber, phoneTel } from "@/lib/constants";
import React from "react";
import { FiArrowRight, FiHelpCircle, FiPhoneCall } from "react-icons/fi";
import { useBooking } from "@/context/BookingContext";

export default function CustomQuoteBanner(): React.JSX.Element {
  const { openBooking } = useBooking();

  return (
    <section className="relative my-20 overflow-hidden rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 p-8 sm:p-12 lg:p-16 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
          <FiHelpCircle className="w-4 h-4 text-blue-400 shrink-0" />
          <span>Custom Services & Special Projects</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
          Don&apos;t See Exactly What <span className="text-blue-400">You Need?</span>
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
          From high-reach post-construction cleans to custom holiday setups or multi-surface
          commercial properties—if it needs cleaning, we&apos;ve got you covered. Tell us what
          you need and we&apos;ll get back to you within 2 business hours.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => openBooking("Not sure yet")}
            className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-extrabold px-7 py-4 rounded-2xl text-base transition-all shadow-lg shadow-blue-700/30 active:scale-[0.98]"
          >
            <span>Request Custom Quote</span>
            <FiArrowRight className="w-4 h-4" />
          </button>

          <a
            href={phoneTel}
            className="inline-flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold px-6 py-4 rounded-2xl text-sm transition-all"
          >
            <FiPhoneCall className="w-4 h-4" />
            <span>Call Directly: {phoneNumber}</span>
          </a>
        </div>
      </div>
    </section>
  );
}