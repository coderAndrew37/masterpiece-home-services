'use client';

import React from 'react';
import Image from 'next/image';
import PageTransition from '@/components/PageTransition';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import ServiceArea from '@/components/ServiceArea';
import CtaBanner from '@/components/CtaBanner';
import FAQ from '@/components/FAQ';
import { FiPhoneCall, FiClock, FiShield } from 'react-icons/fi';

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceAreaItem {
  _id: string;
  name: string;
  slug: string;
}

interface ContactClientProps {
  serviceAreas?: ServiceAreaItem[];
  faqs?: FAQItem[];
}

const defaultContactFAQs: FAQItem[] = [
  {
    question: 'How fast can I get a quote for my Kamloops home?',
    answer:
      'We provide rapid online quotes within 24 hours. Simply fill out our contact form or call us directly with your home address and the services required.',
  },
  {
    question: 'How often should I get my windows and eavestroughs cleaned?',
    answer:
      'For most Kamloops homes, we recommend exterior window detailing twice a year (spring and autumn) and eavestrough clearing at least once in late autumn to prevent pine needle buildup and winter ice dams.',
  },
  {
    question: 'Are you fully insured and WorkSafeBC covered?',
    answer:
      'Yes, Masterpiece Home Services carries $5M in commercial general liability insurance and full WorkSafeBC coverage for complete peace of mind.',
  },
];

export default function ContactClient({
  serviceAreas = [],
  faqs = defaultContactFAQs,
}: ContactClientProps): React.JSX.Element {
  return (
    <PageTransition>
      {/* 1. Hero Section with Background Photo */}
      <section className="relative py-20 lg:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/residential-1.jpg"
            alt="Masterpiece Home Services Kamloops"
            fill
            priority
            quality={90}
            className="object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-4 border border-blue-400/30">
            <FiPhoneCall className="w-3.5 h-3.5" /> Fast Response Guaranteed
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
            Let&apos;s Talk About Your <span className="text-blue-400">Home Care</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Get your fast, free estimate for window detailing, eavestrough clearing, or exterior house washing across Kamloops.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid (Contact Info + Contact Form) */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Direct Info & Trust Badges */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
                  Get In Touch
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  Reach Our Local Crew
                </h2>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Have questions or need an instant phone estimate? Connect with our team directly.
                </p>
              </div>

              {/* Reusable Contact Info Component */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
                <ContactInfo />
              </div>

              {/* Quick Trust Bar */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center gap-3">
                  <FiClock className="text-blue-700 w-6 h-6 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">24h Quote Time</span>
                    <span className="text-[11px] text-slate-500">Fast digital estimates</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center gap-3">
                  <FiShield className="text-blue-700 w-6 h-6 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">$5M Insured</span>
                    <span className="text-[11px] text-slate-500">WorkSafeBC Covered</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: High-Conversion Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Request Your Free Estimate
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                {/* Reusable Contact Form Component */}
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Service Areas Covered */}
      <ServiceArea areas={serviceAreas} />

      {/* 4. Frequently Asked Questions */}
      <FAQ faqs={faqs} />

      {/* 5. Final CTA Banner */}
      <CtaBanner
        tagline="Kamloops & Surrounding Areas"
        title="Ready to Restore Your Property's Curb Appeal?"
        description="Book your pure-water window wash or eavestrough cleaning today with Kamloops' trusted local crew."
        buttonText="Get Free Quote"
      />
    </PageTransition>
  );
}