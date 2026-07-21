'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { FiSun, FiDroplet, FiHome } from 'react-icons/fi';

export interface PlatformCard {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  badgeIcon: React.ReactNode;
  badgeLabel: string;
  href: string;
}

const servicePlatforms: PlatformCard[] = [
  {
    id: 'window-cleaning',
    title: 'Window Detailing',
    subtitle: 'Streak-free pure water cleaning',
    imageSrc: '/images/residential-1.jpg',
    imageAlt: 'Residential window cleaning service',
    badgeIcon: <FiSun className="w-5 h-5 text-amber-500" />,
    badgeLabel: 'Windows',
    href: '/services#windows',
  },
  {
    id: 'eavestrough-care',
    title: 'Eavestrough & Gutters',
    subtitle: 'Debris clearing & flow testing',
    imageSrc: '/images/residential-1.jpg',
    imageAlt: 'Eavestrough and gutter maintenance',
    badgeIcon: <FiDroplet className="w-5 h-5 text-blue-500" />,
    badgeLabel: 'Gutters',
    href: '/services#gutters',
  },
  {
    id: 'house-wash',
    title: 'Full House Soft Wash',
    subtitle: 'Gentle siding & brick restoration',
    imageSrc: '/images/residential-1.jpg',
    imageAlt: 'Full house exterior soft wash',
    badgeIcon: <FiHome className="w-5 h-5 text-emerald-500" />,
    badgeLabel: 'Soft Wash',
    href: '/services#house-wash',
  },
  {
    id: 'christmas-lights',
    title: 'Holiday Lighting',
    subtitle: 'Custom LED setup & removal',
 imageSrc: '/images/residential-1.jpg',
    imageAlt: 'Custom Christmas light installation',
    badgeIcon: <Sparkles className="w-5 h-5 text-rose-500" />,
    badgeLabel: 'Seasonal',
    href: '/services#christmas-lights',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ServicePlatforms(): React.ReactElement {
  return (
    <section className="py-20 bg-slate-950 text-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Bar with Action Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 block">
              Services Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-2xl leading-tight">
              Access Essential Home Services Accurately And Efficiently.
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center justify-center px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-amber-500/20 shrink-0 text-sm"
          >
            <span>View All Services</span>
          </Link>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {servicePlatforms.map((platform: PlatformCard) => (
            <motion.div key={platform.id} variants={cardVariants}>
              <Link
                href={platform.href}
                className="group relative block h-96 sm:h-[420px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 transition-all duration-300 hover:border-slate-600 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Background Image */}
                <Image
                  src={platform.imageSrc}
                  alt={platform.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300" />

                {/* Top Right Circular Badge Overlay */}
                <div className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-110">
                  {platform.badgeIcon}
                </div>

                {/* Bottom Content Area */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex items-end justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                      {platform.badgeLabel}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">
                      {platform.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium line-clamp-1">
                      {platform.subtitle}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-amber-500 group-hover:text-slate-950 text-white flex items-center justify-center transition-all duration-300 shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}