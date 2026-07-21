"use client";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative pt-24 pb-20 md:pt-32 md:pb-28 flex items-center min-h-screen bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: "url(/images/home-hero.jpg)",
      }}
    >
      {/* Darker overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.1)] to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
          >
            Professional Window Cleaning Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white mb-8 drop-shadow"
          >
            Bringing clarity to your home and business with streak-free results
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-full text-center font-bold drop-shadow"
            >
              Get a Free Quote
            </motion.a>

            <motion.a
              href="/services"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-gray-100 text-blue-900 px-8 py-4 rounded-full text-center font-bold"
            >
              Our Services
            </motion.a>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white drop-shadow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
