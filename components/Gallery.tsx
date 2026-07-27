'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor } from '@/lib/sanity/client';
import type { HomeGalleryItem } from '@/types/gallery';

interface GalleryProps {
  items?: HomeGalleryItem[];
}

// Fallback used only if Sanity returns nothing (e.g. content not yet added)
const fallbackImages: HomeGalleryItem[] = [
  { _key: '1', category: 'Residential', image: null, alt: 'Residential window cleaning in progress' },
  { _key: '2', category: 'Commercial', image: null, alt: 'Commercial storefront window maintenance' },
  { _key: '3', category: 'High-Rise', image: null, alt: 'High-rise glass facade cleaning' },
];

const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const [selectedImage, setSelectedImage] = useState<HomeGalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const images = items && items.length > 0 ? items : fallbackImages;

  const categories = ['All', ...Array.from(new Set(images.map((img) => img.category)))];

  const filteredImages =
    activeCategory === 'All' ? images : images.filter((img) => img.category === activeCategory);

  const getImageUrl = (item: HomeGalleryItem, width: number) => {
    if (!item.image) return '/images/residential-1.jpg'; // fallback asset
    return urlFor(item.image).width(width).auto('format').url();
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
          >
            Our Work Gallery
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true }}
            className="h-1 bg-blue-700 mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Browse through our gallery to see the transformation we bring to our
            clients&apos; properties
          </motion.p>
        </div>

        {/* Category Filter Pills */}
        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-12">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all ${
                    isActive
                      ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/20'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image._key}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="overflow-hidden rounded-xl shadow-md cursor-pointer bg-white"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                  <Image
                    src={getImageUrl(image, 800)}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    priority={index < 3}
                  />
                </div>

                <div className="p-4 bg-white">
                  <h3 className="font-bold text-blue-900">{image.category} Cleaning</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[60vh] max-h-[600px]">
                <Image
                  src={getImageUrl(selectedImage, 1600)}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              <div className="mt-4 flex justify-between items-center px-2">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedImage.category} Cleaning
                  </h3>
                  <p className="text-sm text-gray-400">{selectedImage.alt}</p>
                </div>
                <button
                  className="text-white text-3xl font-light hover:text-blue-400 transition-colors px-3 py-1"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close image lightbox"
                >
                  &times;
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;