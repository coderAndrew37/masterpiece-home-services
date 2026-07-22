"use client";

import React from "react";
import Image from "next/image";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function Contact(): React.JSX.Element {
  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Optional Subtle Background Watermark / Image */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <Image
          src="/images/residential-1.jpg"
          alt="Background Texture"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-2">
            Fast Response Guaranteed
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Request Your Free Quote
          </h2>
          <p className="text-slate-600 text-base">
            Have questions about window cleaning, eavestroughs, or soft washing? Reach out directly or send us a quick message below.
          </p>
        </div>

        {/* 2-Column Modular Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <div className="lg:col-span-5">
            <ContactInfo />
          </div>
          
        </div>
      </div>
    </section>
  );
}