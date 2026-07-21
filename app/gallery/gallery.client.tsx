'use client';

import CtaBanner from '@/components/CtaBanner';
import PageTransition from '@/components/PageTransition';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export interface Category {
  id: string;
  name: string;
}

export interface GalleryImage {
  id: number;
  category: string;
  title: string;
}

interface GalleryClientProps {
  categories: Category[];
  images: GalleryImage[];
}

export default function GalleryClient({
  categories,
  images,
}: GalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === 'all'
      ? images
      : images.filter((image) => image.category === selectedCategory);

  const activeImage = images.find((img) => img.id === selectedImage);

  return (
    <PageTransition>
      <div className="bg-linear-to-r from-blue-900 to-blue-700 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Our Work Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-blue-200 max-w-3xl mx-auto"
        >
          Browse our portfolio of completed projects
        </motion.p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-700 text-white'
                  : 'bg-gray-100 text-blue-900 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="overflow-hidden rounded-xl shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="bg-gray-200 border-2 border-dashed rounded-t-xl w-full h-64" />
              <div className="p-6 bg-white">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-blue-900">
                    {image.title}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {categories.find((c) => c.id === image.category)?.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {activeImage?.title}
                  </h3>
                  <p className="text-blue-200">
                    {
                      categories.find((c) => c.id === activeImage?.category)
                        ?.name
                    }
                  </p>
                </div>
                <button
                  className="text-white text-4xl leading-none"
                  onClick={() => setSelectedImage(null)}
                >
                  &times;
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CtaBanner
        title="Ready to Transform Your Property?"
        description="Contact us today for a free estimate and see what we can do for you"
        buttonText="Get Free Estimate"
      />
    </PageTransition>
  );
}