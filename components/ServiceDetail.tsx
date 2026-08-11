// src/components/ServiceDetail.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { urlFor } from '@/lib/sanity/client';
import { getServiceIcon } from '@/lib/ServiceIcons';
import type { ServiceItem } from '@/types/service';

interface ServiceDetailProps {
  service: ServiceItem;
}

export default function ServiceDetail({ service }: ServiceDetailProps): React.JSX.Element {
  // Helper to safely resolve image URL or fall back if cardImage is missing/null
  const getImageUrl = (): string => {
    if (!service.cardImage) return '/images/residential-1.jpg'; // Local fallback asset

    if (typeof service.cardImage === 'string') return service.cardImage;

    try {
      return urlFor(service.cardImage).width(700).height(500).auto('format').url();
    } catch {
      return '/images/residential-1.jpg';
    }
  };

  const imageUrl = getImageUrl();
  const imageAlt = service.cardImage?.alt || service.title || 'Service detail image';

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      id={service.slug || ''}
      className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
    >
      <div>
        <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-900">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {service.badge && (
            <span className="absolute top-4 right-4 bg-slate-950/90 backdrop-blur-md text-blue-300 text-[11px] font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-blue-400/30 shadow-lg z-10">
              {service.badge}
            </span>
          )}

          <div className="absolute -bottom-6 left-6 w-14 h-14 rounded-2xl bg-white border border-slate-200/80 shadow-md flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300 z-10">
            {getServiceIcon(service.icon, 'w-5 h-5 text-blue-600 group-hover:text-white transition-colors')}
          </div>
        </div>

        <div className="p-8 pt-10">
          <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors mb-3">
            {service.title}
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.shortDescription}</p>

          {service.features && service.features.length > 0 && (
            <ul className="space-y-2.5 mb-8 border-t border-slate-100 pt-6">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-700 font-semibold">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mr-2.5 mt-0.5">
                    <FiCheck className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="px-8 pb-8">
        <Link
          href={`/services/${service.slug || ''}`}
          className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-blue-700 hover:text-white text-slate-900 font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm transition-all duration-300 group/btn shadow-xs"
        >
          <span>View Full Service Details</span>
          <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}