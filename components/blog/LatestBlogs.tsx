import React from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import BlogCard from '@/components/blog/BlogCard';
import type { PostCard } from '@/types/blog';

interface LatestBlogsProps {
  posts: PostCard[];
}

/**
 * Plain presentational component — no 'use client', no data fetching.
 * The Sanity fetch happens once in app/(site)/page.tsx (server), and the
 * result is threaded down through HomeClient as the `posts` prop.
 */
export default function LatestBlogs({ posts }: LatestBlogsProps): React.JSX.Element | null {
  if (!posts?.length) return null;

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-1 h-6 bg-blue-700 rounded-full inline-block" />
              <span className="text-slate-900 font-semibold text-sm sm:text-base uppercase tracking-wider">
                Expert Tips & Advice
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Latest From Our Journal
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors group self-start md:self-auto"
          >
            <span>View All Articles</span>
            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard key={post._id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}