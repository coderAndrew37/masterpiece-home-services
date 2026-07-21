'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
  id: number;
  category: string;
  src: string;
  alt: string;
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const images: GalleryItem[] = [
    {
      id: 1,
      category: 'Residential',
      src: '/images/residential-1.jpg',
      alt: 'Residential window cleaning in progress',
    },
    {
      id: 2,
      category: 'Commercial',
       src: '/images/residential-1.jpg',
      alt: 'Commercial storefront window maintenance',
    },
    {
      id: 3,
      category: 'High-Rise',
  src: '/images/residential-1.jpg',
      alt: 'High-rise glass facade cleaning',
    },
    {
      id: 4,
      category: 'Pressure Washing',
  src: '/images/residential-1.jpg',
      alt: 'Driveway soft-wash pressure cleaning',
    },
    {
      id: 5,
      category: 'Residential',
    src: '/images/residential-1.jpg',
      alt: 'Clean interior residential windows',
    },
    {
      id: 6,
      category: 'Commercial',
    src: '/images/residential-1.jpg',
      alt: 'Exterior corporate building window cleaning',
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="overflow-hidden rounded-xl shadow-md cursor-pointer bg-white"
              onClick={() => setSelectedImage(image)}
            >
              {/* Image Container with aspect ratio */}
              <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  priority={image.id <= 3}
                />
              </div>

              <div className="p-4 bg-white">
                <h3 className="font-bold text-blue-900">
                  {image.category} Cleaning
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
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
                  src={selectedImage.src}
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