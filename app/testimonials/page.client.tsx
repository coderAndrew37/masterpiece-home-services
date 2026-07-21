'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CtaBanner from '@/components/CtaBanner';
import PageTransition from '@/components/PageTransition';
import ReviewCard from '@/components/ReviewCard';
import VideoTestimonial from '@/components/VideoTestimonial';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  rating: number;
  content: string;
  category: string;
  date: string;
}

export interface VideoItem {
  id: number;
  title: string;
  description: string;
}

interface TestimonialsClientProps {
  testimonials: Testimonial[];
  videoTestimonials: VideoItem[];
}

export default function TestimonialsClient({
  testimonials,
  videoTestimonials,
}: TestimonialsClientProps) {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredTestimonials =
    activeTab === 'all'
      ? testimonials
      : testimonials.filter((t) => t.category === activeTab);

  return (
    <PageTransition>
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Customer Testimonials
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-blue-200 max-w-3xl mx-auto"
        >
          Hear what our satisfied customers have to say about our services
        </motion.p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'all', name: 'All Testimonials' },
            { id: 'residential', name: 'Residential' },
            { id: 'commercial', name: 'Commercial' },
            { id: 'highrise', name: 'High-Rise' },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-700 text-white'
                  : 'bg-gray-100 text-blue-900 hover:bg-gray-200'
              }`}
            >
              {tab.name}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredTestimonials.map((testimonial) => (
            <ReviewCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-blue-900 mb-12 text-center"
          >
            Video Testimonials
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videoTestimonials.map((video) => (
              <VideoTestimonial key={video.id} video={video} />
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-8 md:p-12 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-blue-900 mb-6"
            >
              Our Satisfaction Guarantee
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-gray-700 mb-8"
            >
              We stand behind our work with a 100% satisfaction guarantee. If
              you&apos;re not completely happy with our service, we&apos;ll return to make
              it right at no additional cost.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-900 text-white inline-block px-6 py-3 rounded-full font-bold">
                Your Satisfaction is Guaranteed
              </div>
            </motion.div>
          </div>
        </div>

        <CtaBanner
          title="Ready to Experience Our Service?"
          description="Join our satisfied customers and book your service today"
          buttonText="Book Now"
        />
      </div>
    </PageTransition>
  );
}