// app/(site)/gallery/page.client.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PageTransition from '@/components/PageTransition';
import CtaBanner from '@/components/CtaBanner';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiCamera,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiPhone,
  FiPlus,
} from 'react-icons/fi';
import { phoneNumber, phoneTel } from '@/lib/constants';
import Link from 'next/link';

export interface Category {
  id: string;
  name: string;
}

export interface GalleryImage {
  id: string;
  category: string;
  title: string;
  src: string;
  alt?: string;
  location?: string;
}

interface GalleryClientProps {
  categories?: Category[];
  images?: GalleryImage[];
}

const INITIAL_VISIBLE_COUNT = 6;
const BATCH_LOAD_COUNT = 3;

export default function GalleryClient({
  categories = [],
  images = [],
}: GalleryClientProps): React.JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Filter out any items with empty or missing src strings
  const validImages = images.filter((image) => Boolean(image.src && image.src.trim() !== ''));

  const filteredImages =
    selectedCategory === 'all'
      ? validImages
      : validImages.filter((image) => image.category === selectedCategory);

  const total = filteredImages.length;
  const displayedImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < total;
  const activeImage = activeImageIndex !== null ? filteredImages[activeImageIndex] : null;

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
    setActiveImageIndex(null);
  };

  const handleLoadMore = () => setVisibleCount((prev) => prev + BATCH_LOAD_COUNT);

  // No useCallback: React Compiler memoizes these automatically.
  const handlePrev = () => {
    setActiveImageIndex((prev) => {
      if (prev === null || total === 0) return prev;
      return prev === 0 ? total - 1 : prev - 1;
    });
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => {
      if (prev === null || total === 0) return prev;
      return prev === total - 1 ? 0 : prev + 1;
    });
  };

  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, handlePrev, handleNext]);

  return (
    <PageTransition>
      <section className="relative py-20 lg:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/residential-1.jpg"
            alt="Masterpiece Portfolio Background"
            fill
            priority
            quality={85}
            className="object-cover object-center opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-4 border border-blue-400/30">
            <FiCamera className="w-3.5 h-3.5" /> Real Kamloops Projects
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4"
          >
            Our Work <span className="text-blue-400">Gallery</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Real window detailing, eavestrough clearing, and exterior wash projects across Kamloops.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-slate-50 min-h-[600px]">
        <div className="container mx-auto px-4 max-w-7xl">
          {validImages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 font-semibold">
                We&apos;re just getting started — project photos coming soon. Check back shortly, or see our{' '}
                <Link href="/services" className="text-blue-700 underline">
                  services
                </Link>{' '}
                in the meantime.
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-14">
                {categories.map((category) => {
                  const isActive = selectedCategory === category.id;
                  return (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategorySelect(category.id)}
                      className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all ${
                        isActive
                          ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/20'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {category.name}
                    </motion.button>
                  );
                })}
              </div>

              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {displayedImages.map((image, index) => {
                    const categoryLabel =
                      categories.find((c) => c.id === image.category)?.name || 'Service';

                    return (
                      <motion.div
                        key={image.id || `gallery-item-${index}`}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setActiveImageIndex(index)}
                        className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
                      >
                        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-200">
                          <Image
                            src={image.src}
                            alt={image.alt || image.title || 'Gallery Project'}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md text-slate-900 flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                              <FiMaximize2 className="w-5 h-5 text-blue-700" />
                            </div>
                          </div>
                          <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {categoryLabel}
                          </span>
                        </div>

                        <div className="p-6 flex flex-col justify-between flex-grow">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-1">
                              {image.title}
                            </h3>
                            {image.location && (
                              <p className="text-xs font-semibold text-slate-500">{image.location}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

              {hasMore && (
                <div className="mt-14 text-center">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleLoadMore}
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-full text-sm shadow-xl transition-all"
                  >
                    <FiPlus className="w-4 h-4 text-blue-400" />
                    <span>Load More Projects ({total - visibleCount} remaining)</span>
                  </motion.button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <AnimatePresence>
        {activeImage && activeImage.src && activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveImageIndex(null)}
          >
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 p-3 rounded-full backdrop-blur-md transition-colors z-50"
              aria-label="Close Lightbox"
            >
              <FiX className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 p-3 sm:p-4 rounded-full backdrop-blur-md transition-colors z-50"
              aria-label="Previous Image"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 p-3 sm:p-4 rounded-full backdrop-blur-md transition-colors z-50"
              aria-label="Next Image"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl w-full max-h-[90vh] flex flex-col bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[50vh] sm:h-[60vh] bg-slate-950">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt || activeImage.title || 'Gallery Preview'}
                  fill
                  quality={95}
                  priority
                  className="object-contain object-center"
                  unoptimized
                />
              </div>

              <div className="p-6 bg-slate-900 border-t border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
                    {categories.find((c) => c.id === activeImage.category)?.name ?? 'Service'}
                  </span>
                  <h3 className="text-xl font-bold text-white">{activeImage.title}</h3>
                  {activeImage.location && (
                    <p className="text-xs text-slate-400 mt-0.5">{activeImage.location}</p>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={phoneTel}
                    className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all shadow-lg shadow-blue-700/30"
                  >
                    <FiPhone className="w-4 h-4 animate-pulse" />
                    <span>Book Service: {phoneNumber}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CtaBanner
        tagline="Kamloops & Surrounding Areas"
        title="Ready to Restore Your Property's Curb Appeal?"
        description="Contact us today for a free estimate and see what pure-water detailing can do for your home."
        buttonText="Get Free Estimate"
      />
    </PageTransition>
  );
}