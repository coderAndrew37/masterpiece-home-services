// src/app/service-areas/page.client.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import { urlFor } from '@/lib/sanity/client';
import type { ServiceAreaCard } from '@/types/serviceArea';

interface ServiceAreasClientProps {
  areas: ServiceAreaCard[];
}

export default function ServiceAreasClient({ areas }: ServiceAreasClientProps): React.JSX.Element {
  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest flex items-center justify-center gap-2 mb-2">
            <FiMapPin className="w-3.5 h-3.5" /> Where We Work
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Serving Kamloops Neighborhoods
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Local crews, local knowledge. See what we offer in your part of Kamloops.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, index) => (
            <motion.div
              key={area._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={`/service-areas/${area.slug}`}
                className="group block relative h-56 rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all"
              >
                <Image
                  src={area.heroImage ? urlFor(area.heroImage).width(600).height(400).auto('format').url() : '/images/residential-1.jpg'}
                  alt={area.heroImage?.alt || `${area.name} service area`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between">
                  <h2 className="text-xl font-extrabold text-white">{area.name}</h2>
                  <FiArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}