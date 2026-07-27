'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiClock } from 'react-icons/fi';
import { urlFor } from '@/lib/sanity/client';
import type { PostCard } from '@/types/blog';

interface BlogCardProps {
  post: PostCard;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps): React.JSX.Element {
  const date = new Date(post.publishedAt).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Safely construct the image URL or fallback to a default local asset
  const imageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(700).height(450).url()
    : '/images/residential-1.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
    >
      <Link href={`/blog/${post.slug}`} className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900 block">
        <Image
          src={imageUrl}
          alt={typeof post.mainImage?.alt === 'string' ? post.mainImage.alt : post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
        {post.categories?.[0] && (
          <span className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md text-blue-300 text-[11px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider border border-blue-400/30">
            {post.categories[0].title}
          </span>
        )}
      </Link>

      <div className="p-7 flex flex-col grow">
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-3">
          <span>{date}</span>
          {post.readingTime && (
            <span className="flex items-center gap-1">
              <FiClock className="w-3.5 h-3.5" /> {post.readingTime} min read
            </span>
          )}
        </div>

        <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto inline-flex items-center gap-2 text-blue-700 font-bold text-sm group/link"
        >
          Read Article
          <FiArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}