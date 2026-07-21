"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface CtaBannerProps {
  title: string;
  description: string;
  buttonText: string;
  tagline?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const CtaBanner: React.FC<CtaBannerProps> = ({
  title,
  description,
  buttonText,
  tagline = "Book Now",
  imageSrc = "/images/residential-1.jpg",
  imageAlt = "Shine Windows exterior cleaning team in Kamloops",
}) => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            {/* Tagline with Blue Vertical Accent Line */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 bg-blue-700 rounded-full inline-block" />
              <span className="text-gray-900 font-semibold text-lg">
                {tagline}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              {title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              {description}
            </p>

            {/* CTA Button */}
            <div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block"
              >
                <Link
                  href="/contact"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200 inline-flex items-center justify-center shadow-lg shadow-blue-700/20"
                >
                  {buttonText}
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative w-full h-[320px] sm:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl bg-gray-100"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              priority={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;