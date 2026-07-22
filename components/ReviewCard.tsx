"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiStar, FiMapPin, FiCheckCircle } from "react-icons/fi";

export interface Testimonial {
  id: number;
  name: string;
  role?: string;
  rating: number;
  content: string;
  category: string;
  date: string;
  location?: string;
}

interface ReviewCardProps {
  testimonial: Testimonial;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ testimonial }) => {
  // Extract initial for clean user avatar badge
  const initial = testimonial.name ? testimonial.name.charAt(0).toUpperCase() : "M";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between h-full relative overflow-hidden group"
    >
      <div>
        {/* Header: Stars & Verified Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-4 h-4 ${
                  i < (testimonial.rating || 5)
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-200"
                }`}
              />
            ))}
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            <FiCheckCircle className="w-3 h-3 text-blue-600" /> Verified
          </span>
        </div>

        {/* Review Body Content */}
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </div>

      {/* Footer: User Details */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar Initial Badge */}
          <div className="w-11 h-11 rounded-full bg-blue-700 text-white font-bold text-base flex items-center justify-center shrink-0 shadow-md shadow-blue-700/20">
            {initial}
          </div>

          <div>
            <h4 className="font-extrabold text-slate-900 text-sm leading-tight">
              {testimonial.name}
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 font-medium">
              {testimonial.role && <span>{testimonial.role}</span>}
              {testimonial.location && (
                <span className="flex items-center gap-0.5 text-blue-700 font-semibold">
                  <FiMapPin className="w-3 h-3 shrink-0" />
                  {testimonial.location}
                </span>
              )}
            </div>
          </div>
        </div>

        <span className="text-[11px] font-medium text-slate-400 shrink-0">
          {testimonial.date}
        </span>
      </div>
    </motion.div>
  );
};

export default ReviewCard;