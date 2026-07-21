"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiCheckCircle, FiUsers, FiAward, FiShield } from "react-icons/fi";

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <FiCheckCircle className="text-2xl text-blue-700" />,
      title: "100% Satisfaction Guarantee",
      description: "If any spot or window isn't spotless, we'll re-clean it for free.",
    },
    {
      icon: <FiShield className="text-2xl text-blue-700" />,
      title: "$5M Insured & WorkSafeBC",
      description: "Complete peace of mind knowing your home is fully protected.",
    },
    {
      icon: <FiUsers className="text-2xl text-blue-700" />,
      title: "Certified Local Crew",
      description: "Trained, background-checked professionals who treat your property with care.",
    },
    {
      icon: <FiAward className="text-2xl text-blue-700" />,
      title: "Pure-Water Technology",
      description: "Reverse osmosis water filtration leaves streak-free glass without chemicals.",
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-slate-50 border-y border-slate-200/80">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-1 h-6 bg-blue-700 rounded-full inline-block" />
            <span className="text-slate-900 font-semibold text-base">The Masterpiece Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight mb-4">
            Why Kamloops Homeowners Choose Us
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            We don&apos;t just clean—we elevate your home&apos;s curb appeal with safety-first equipment and unmatched attention to detail.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Feature Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/80 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Visual Image Container with Floating Stat Overlay */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-2xl h-[480px] lg:h-[540px] bg-slate-200"
          >
            {/* Background Image */}
            <Image
              src="/images/residential-1.jpg" // Place your high-res window/gutter cleaning photo here
              alt="Masterpiece team working on a residential property"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              quality={90}
            />

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

            {/* Floating Glassmorphic Stat Badge (Bottom Overlay) */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-3xl font-black text-blue-900 block">5,000+</span>
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Windows Detailed
                </span>
              </div>
              <div className="border-l border-slate-200 pl-4">
                <span className="text-3xl font-black text-blue-900 block">100%</span>
                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Satisfaction Rate
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;