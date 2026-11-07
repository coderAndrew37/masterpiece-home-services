'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PortableText } from '@portabletext/react';
import { FiArrowRight, FiClock, FiCalendar, FiChevronLeft } from 'react-icons/fi';
import PageTransition from '@/components/PageTransition';
import CtaBanner from '@/components/CtaBanner';
import AuthorCard from '@/components/blog/AuthorCard';
import ShareButtons from '@/components/blog/ShareButtons';
import RelatedPosts from '@/components/blog/RelatedPosts';
import RelatedServices from '@/components/RelatedServices';
import SidebarPostList from '@/components/blog/SidebarPostList';
import { portableTextComponents } from '@/components/blog/PortableTextComponents';
import { urlFor } from '@/lib/sanity/client';
import type { PostCard, PostDetail } from '@/types/blog';
import type { RelatedServiceItem } from '@/types/service';

interface BlogDetailClientProps {
  post: PostDetail;
  relatedPosts: PostCard[];
  sidebarPosts: PostCard[];
  relatedServices: RelatedServiceItem[];
  siteUrl: string;
}

export default function BlogDetailClient({
  post,
  relatedPosts,
  sidebarPosts,
  relatedServices,
  siteUrl,
}: BlogDetailClientProps): React.JSX.Element {
  const date = new Date(post.publishedAt).toLocaleDateString('en-CA', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const mainImageUrl = urlFor(post.mainImage)?.width(1600).height(900).url();

  return (
    <PageTransition>
      <div className="bg-white min-h-screen pb-20">
        
        <section className="pt-12 pb-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">
              
              {/* ─── LEFT COLUMN: HERO & ARTICLE ────────────────────────── */}
              <div className="lg:col-span-8">
                
                {/* Hero Section */}
                <div className="mb-12">
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <Link href="/blog" className="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-wider flex items-center gap-1">
                      <FiChevronLeft className="w-4 h-4" /> All Articles
                    </Link>
                    <span className="text-slate-300">•</span>
                    {post.categories?.map((category) => (
                      <span key={category.slug} className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                        {category.title}
                      </span>
                    ))}
                  </div>

                  <motion.h1
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-slate-900 tracking-tight mb-6 leading-[1.1]"
                  >
                    {post.title}
                  </motion.h1>

                  <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500 font-medium mb-10">
                    <span className="flex items-center gap-1.5">
                      <FiCalendar className="w-4 h-4 text-blue-600" /> {date}
                    </span>
                    {post.readingTime && (
                      <span className="flex items-center gap-1.5">
                        <FiClock className="w-4 h-4 text-blue-600" /> {post.readingTime} min read
                      </span>
                    )}
                    {post.author?.name && (
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" /> By {post.author.name}
                      </span>
                    )}
                  </div>

                  {mainImageUrl && (
                    <figure className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                      <Image
                        src={mainImageUrl}
                        alt={typeof post.mainImage?.alt === 'string' ? post.mainImage.alt : post.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 896px"
                        className="object-cover"
                        unoptimized
                      />
                    </figure>
                  )}
                </div>

                {/* Portable Text Content */}
                <div className="max-w-none">
                  <PortableText value={post.body} components={portableTextComponents} />
                </div>

                {/* Related Services */}
                {relatedServices.length > 0 && (
                  <div className="mt-12">
                    <RelatedServices services={relatedServices} />
                  </div>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-slate-100">
                    <span className="text-sm font-bold text-slate-900 mr-2 py-1.5">Tags:</span>
                    {post.tags.map((tag) => (
                      <span key={tag} className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg hover:border-blue-300 hover:text-blue-700 transition-colors cursor-default">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Author & Share */}
                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <AuthorCard author={post.author} />
                  <ShareButtons url={`${siteUrl}/blog/${post.slug}`} title={post.title} />
                </div>
              </div>

              {/* ─── RIGHT COLUMN: SIDEBAR (Matches Screenshot) ─────────── */}
              <div className="lg:col-span-4 mt-12 lg:mt-0">
                <div className="sticky top-28 space-y-8">
                  
                  {/* White Card Sidebar with Blue Header */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm p-6">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 pb-3 mb-4 border-b-2 border-blue-600 inline-block">
                      Latest Articles
                    </h3>
                    {/* Note: You might need to adjust SidebarPostList internally if it has hardcoded colors */}
                    <SidebarPostList posts={sidebarPosts} title="" /> 
                  </div>

                  {/* Blue CTA Widget */}
                  <div className="bg-blue-600 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    
                    <h3 className="text-xl font-black text-white mb-2 relative z-10">Ready for a Free Quote?</h3>
                    <p className="text-blue-100 text-sm leading-relaxed mb-6 relative z-10">
                      Get your property serviced by Kamloops&apos; highest-rated technicians.
                    </p>
                    <a
                      href={relatedServices[0] ? `/services/${relatedServices[0].slug}` : '/pricing'}
                      className="w-full inline-flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-50 font-extrabold py-3.5 px-6 rounded-xl text-sm transition-all hover:scale-105 active:scale-95 relative z-10 shadow-md"
                    >
                      <span>{relatedServices[0] ? `Book ${relatedServices[0].title}` : 'View Pricing'}</span>
                      <FiArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* ─── RELATED POSTS ───────────────────────────────────────── */}
            <div className="mt-20 pt-12 border-t border-slate-200">
              <RelatedPosts posts={relatedPosts} />
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}