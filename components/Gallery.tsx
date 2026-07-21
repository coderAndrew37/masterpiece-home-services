"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    { id: 1, category: "Residential" },
    { id: 2, category: "Commercial" },
    { id: 3, category: "High-Rise" },
    { id: 4, category: "Pressure Washing" },
    { id: 5, category: "Residential" },
    { id: 6, category: "Commercial" },
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
            whileInView={{ width: "100px" }}
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
              className="overflow-hidden rounded-xl shadow-md cursor-pointer"
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
              <div className="p-4 bg-white">
                <h3 className="font-bold text-blue-900">
                  {image.category} Cleaning
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
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
                <h3 className="text-xl font-bold text-white">
                  {images.find((img) => img.id === selectedImage)?.category}{" "}
                  Cleaning
                </h3>
                <button
                  className="text-white text-2xl"
                  onClick={() => setSelectedImage(null)}
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
