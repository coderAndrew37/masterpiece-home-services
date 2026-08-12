'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { FiArrowRight, FiClock, FiCalendar } from 'react-icons/fi';
import PageTransition from '@/components/PageTransition';
import CtaBanner from '@/components/CtaBanner';
import AuthorCard from '@/components/blog/AuthorCard';
import ShareButtons from '@/components/blog/ShareButtons';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { portableTextComponents } from '@/components/blog/PortableTextComponents';
import { urlFor } from '@/lib/sanity/client';
import type { PostCard, PostDetail } from '@/types/blog';

interface BlogDetailClientProps {
  post: PostDetail;
  relatedPosts: PostCard[];
  siteUrl: string;
}

export default function BlogDetailClient({
  post,
  relatedPosts,
  siteUrl,
}: BlogDetailClientProps): React.JSX.Element {
  const date = new Date(post.publishedAt).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const updatedDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <PageTransition>
      {/* Hero Banner */}
      <section className="relative py-20 lg:py-28 bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={urlFor(post.mainImage).width(1600).height(900).url()}
            alt={typeof post.mainImage?.alt === 'string' ? post.mainImage.alt : post.title}
            fill
            priority
            quality={85}
            className="object-cover object-center opacity-30 scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Link
              href="/blog"
              className="text-xs font-bold text-blue-400 hover:underline uppercase tracking-wider"
            >
              ← All Articles
            </Link>
            {post.categories?.map((category) => (
              <span
                key={category.slug}
                className="bg-blue-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider"
              >
                {category.title}
              </span>
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6 leading-tight"
          >
            {post.title}
          </motion.h1>

          <div className="flex items-center gap-5 text-sm text-slate-300 font-medium flex-wrap">
            <span className="flex items-center gap-1.5">
              <FiCalendar className="w-4 h-4 text-blue-400" /> {date}
            </span>
            {post.readingTime && (
              <span className="flex items-center gap-1.5">
                <FiClock className="w-4 h-4 text-blue-400" /> {post.readingTime} min read
              </span>
            )}
            {updatedDate && updatedDate !== date && (
              <span className="text-slate-400 text-xs">Updated {updatedDate}</span>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm">
                <PortableText value={post.body} components={portableTextComponents} />
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <RelatedPosts posts={relatedPosts} />
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 space-y-6">
                <AuthorCard author={post.author} />
                <ShareButtons url={`${siteUrl}/blog/${post.slug}`} title={post.title} />

                <div className="bg-slate-950 text-white rounded-3xl p-7 border border-slate-800 shadow-xl space-y-4">
                  <h3 className="text-lg font-black text-white">Ready for a Free Quote?</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Get your property serviced by Kamloops&apos; highest-rated technicians.
                  </p>
                  <a
                    href="/pricing"
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-extrabold py-3.5 px-6 rounded-2xl text-sm transition-all"
                  >
                    <span>View Pricing</span>
                    <FiArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        tagline="Kamloops & Surrounding Areas"
        title="Ready to Book Your Service?"
        description="Our team provides streak-free window wash, soft washing, eavestrough care, and Christmas light setups across Kamloops."
        buttonText="Get Free Quote"
      />
    </PageTransition>
  );
}