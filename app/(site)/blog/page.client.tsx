'use client';

import PageTransition from '@/components/PageTransition';
import CtaBanner from '@/components/CtaBanner';
import BlogCard from '@/components/blog/BlogCard';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { FiEdit3 } from 'react-icons/fi';
import type { PostCard } from '@/types/blog';

interface BlogClientProps {
  posts: PostCard[];
}

export default function BlogClient({ posts }: BlogClientProps): React.JSX.Element {
  return (
    <PageTransition>
      {/* Hero Header */}
      <section className="relative py-20 lg:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/residential-1.jpg"
            alt="Masterpiece Home Services Blog"
            fill
            priority
            quality={85}
            className="object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-4 border border-blue-400/30">
            <FiEdit3 className="w-3.5 h-3.5" /> Home Care Guides
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4"
          >
            The Masterpiece <span className="text-blue-400">Blog</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Seasonal tips, maintenance guides, and behind-the-scenes advice from Kamloops’ trusted exterior care team.
          </motion.p>
        </div>
      </section>

      {/* Post Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {posts.map((post, idx) => (
                <BlogCard key={post._id} post={post} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500 font-semibold">
                No articles published yet — check back soon.
              </p>
            </div>
          )}

          <CtaBanner
            tagline="Kamloops & Surrounding Areas"
            title="Ready to Schedule Your Service?"
            description="Get your free online estimate within 24 hours or call our team directly."
            buttonText="Request Free Quote"
          />
        </div>
      </section>
    </PageTransition>
  );
}