// src/app/services/[slug]/page.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PortableText } from '@portabletext/react';
import PageTransition from '@/components/PageTransition';
import FAQ from '@/components/FAQ';
import CustomQuoteBanner from '@/components/CustomQuoteBanner';
import CtaBanner from '@/components/CtaBanner';
import ServiceCalculator from '@/components/ServiceCalculator';
import { client, urlFor } from '@/lib/sanity/client';
import { serviceBySlugQuery, serviceSlugsQuery } from '@/lib/sanity/queries';
import type { DetailedService } from '@/types/service';
import {
  FiCheckCircle,
  FiPhoneCall,
  FiArrowRight,
  FiShield,
  FiClock,
  FiAward,
} from 'react-icons/fi';
import { phoneNumber, phoneTel } from '@/lib/constants';

// Helper function to safely extract image URLs across SSR/metadata and page components
const getImageUrl = (imageSource: unknown, fallbackUrl = '/images/residential-1.jpg'): string => {
  if (!imageSource) return fallbackUrl;
  if (typeof imageSource === 'string') return imageSource;

  try {
    return urlFor(imageSource).auto('format').url();
  } catch {
    return fallbackUrl;
  }
};

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(serviceSlugsQuery);
  return (slugs || []).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await client.fetch<DetailedService | null>(serviceBySlugQuery, { slug });

  if (!service) return { title: 'Service Not Found | Masterpiece Kamloops' };

  const heroImg = service.heroImage ?? service.cardImage;
  const ogImageUrl = heroImg
    ? urlFor(heroImg).width(1200).height(630).auto('format').url()
    : '/images/residential-1.jpg';

  return {
    title: `${service.title} Kamloops | Masterpiece Home Services`,
    description: service.subtitle,
    openGraph: {
      title: `${service.title} | Masterpiece Kamloops`,
      description: service.subtitle,
      images: [{ url: ogImageUrl }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await client.fetch<DetailedService | null>(serviceBySlugQuery, { slug });

  if (!service) notFound();

  const heroImg = service.heroImage ?? service.cardImage;
  const heroImageUrl = getImageUrl(heroImg);
  const heroAltText = (heroImg as { alt?: string })?.alt || service.title || 'Service hero image';

  return (
    <PageTransition>
      <section className="relative py-20 lg:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImageUrl}
            alt={heroAltText}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Link href="/services" className="text-xs font-bold text-blue-400 hover:underline uppercase tracking-wider">
                ← All Services
              </Link>
              {service.badge && (
                <span className="bg-blue-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {service.badge}
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
              {service.title}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">{service.subtitle}</p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#estimate"
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-extrabold px-7 py-4 rounded-2xl text-sm transition-all shadow-lg shadow-blue-700/30"
              >
                <span>Get Instant Estimate</span>
                <FiArrowRight className="w-4 h-4" />
              </a>

              <a
                href={phoneTel}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 font-bold px-6 py-4 rounded-2xl text-sm transition-all"
              >
                <FiPhoneCall className="w-4 h-4 text-blue-400" />
                <span>{phoneNumber}</span>
              </a>

              {service.startingPrice && (
                <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 px-4 py-3 rounded-2xl text-xs font-bold text-slate-300">
                  Starting at <span className="text-blue-400 text-base font-black ml-1">{service.startingPrice}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-16">
              {service.description && (
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-4">
                  <h2 className="text-2xl font-extrabold text-slate-900">Service Overview</h2>
                  <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                    <PortableText value={service.description} />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {service.whatsIncluded && service.whatsIncluded.length > 0 && (
                  <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm">
                    <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                      <FiShield className="text-blue-600 w-5 h-5" /> What&apos;s Included
                    </h3>
                    <ul className="space-y-3">
                      {service.whatsIncluded.map((item, idx) => (
                        <li key={idx} className="flex items-start text-xs sm:text-sm font-semibold text-slate-700">
                          <FiCheckCircle className="w-4 h-4 text-blue-600 shrink-0 mr-2.5 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.benefits && service.benefits.length > 0 && (
                  <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm">
                    <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                      <FiAward className="text-blue-600 w-5 h-5" /> Key Benefits
                    </h3>
                    <ul className="space-y-3">
                      {service.benefits.map((item, idx) => (
                        <li key={idx} className="flex items-start text-xs sm:text-sm font-semibold text-slate-700">
                          <FiCheckCircle className="w-4 h-4 text-blue-600 shrink-0 mr-2.5 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {service.processSteps && service.processSteps.length > 0 && (
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
                  <div>
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
                      How It Works
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900">Our Step-by-Step Process</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {service.processSteps.map((step, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
                        <div className="w-9 h-9 rounded-xl bg-blue-700 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-base mb-1">{step.title}</h4>
                          <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div id="estimate" className="pt-4">
                <div className="mb-6">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
                    Instant Pricing
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900">Calculate Your Custom Estimate</h2>
                </div>
                <ServiceCalculator />
              </div>

              <CustomQuoteBanner />

              {service.faqs && service.faqs.length > 0 && (
                <FAQ faqs={service.faqs} title={`Questions About ${service.title}`} />
              )}
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="bg-slate-950 text-white rounded-3xl p-8 border border-slate-800 shadow-xl sticky top-28 space-y-6">
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-1">
                    Fast & Simple
                  </span>
                  <h3 className="text-2xl font-black text-white">Book This Service</h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    Get your property serviced by Kamloops&apos; highest-rated technicians.
                  </p>
                </div>

                <div className="space-y-3 border-y border-slate-800 py-6">
                  <div className="flex items-center gap-3 text-xs font-medium text-slate-300">
                    <FiShield className="text-blue-400 w-4 h-4 shrink-0" />
                    <span>$5,000,000 Commercial Liability Insured</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-slate-300">
                    <FiAward className="text-blue-400 w-4 h-4 shrink-0" />
                    <span>WorkSafeBC Covered Staff</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-slate-300">
                    <FiClock className="text-blue-400 w-4 h-4 shrink-0" />
                    <span>24-Hour Estimate Delivery</span>
                  </div>
                </div>

                <a
                  href="#estimate"
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-extrabold py-4 px-6 rounded-2xl text-sm transition-all shadow-lg shadow-blue-700/30"
                >
                  <span>Request Online Quote</span>
                  <FiArrowRight className="w-4 h-4" />
                </a>

                <div className="text-center pt-2">
                  <span className="text-xs text-slate-400 block mb-1">Or call our Kamloops dispatch:</span>
                  <a
                    href={phoneTel}
                    className="text-white font-black text-lg hover:text-blue-400 transition-colors inline-flex items-center gap-2"
                  >
                    <FiPhoneCall className="w-4 h-4 text-blue-400" />
                    <span>{phoneNumber}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        tagline="Kamloops & Surrounding Areas"
        title={`Ready to Book ${service.title}?`}
        description="Our team provides streak-free window wash, soft washing, eavestrough care, and Christmas light setups across Kamloops."
        buttonText="Get Free Quote"
      />
    </PageTransition>
  );
}