"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Homeowner",
      content:
        "The team at ShineWindows did an amazing job on our home. The windows are sparkling clean and they were very professional and efficient.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Thompson",
      role: "Business Owner",
      content:
        "We've been using ShineWindows for our office building for 3 years now. Consistent quality and reliable service. Highly recommend!",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Property Manager",
      content:
        "They handled our 20-story building with ease. The windows look incredible and the crew was very safety-conscious.",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
          >
            What Our Clients Say
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
            Don&apos;t just take our word for it. Here&apos;s what our satisfied customers
            have to say about our services.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className="bg-blue-50 rounded-xl p-8 md:p-12 shadow-md"
            >
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`text-xl ${
                      i < testimonials[currentIndex].rating
                        ? "text-yellow-500 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-700 text-lg md:text-xl italic mb-8">
                &quot;{testimonials[currentIndex].content}&quot;
              </p>

              <div>
                <h4 className="text-xl font-bold text-blue-900">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-600">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
