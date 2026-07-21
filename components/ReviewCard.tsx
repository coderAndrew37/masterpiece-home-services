"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  content: string;
  category: string;
  date: string;
}

interface ReviewCardProps {
  testimonial: Testimonial;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ testimonial }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
    >
      <div className="p-6">
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={`text-xl ${
                i < testimonial.rating
                  ? "text-yellow-500 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <p className="text-gray-700 mb-6 italic">&quot;{testimonial.content}&quot;</p>

        <div className="flex items-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          <div className="ml-4">
            <h4 className="font-bold text-blue-900">{testimonial.name}</h4>
            <p className="text-gray-600">{testimonial.role}</p>
            <div className="text-sm text-gray-500 mt-1">{testimonial.date}</div>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 px-6 py-3 text-sm text-blue-800">
        {testimonial.category === "residential" && "Residential Cleaning"}
        {testimonial.category === "commercial" && "Commercial Cleaning"}
        {testimonial.category === "highrise" && "High-Rise Cleaning"}
      </div>
    </motion.div>
  );
};

export default ReviewCard;
