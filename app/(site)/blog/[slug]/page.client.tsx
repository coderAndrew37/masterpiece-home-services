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
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const updatedDate = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;
  const mainImageUrl = urlFor(post.mainImage)?.width(1600).height(900).url();

  const ctaDescription =
    relatedServices.length > 0
      ? `Ready for ${relatedServices[0].title.toLowerCase()}? Get a fast, no-obligation quote from Kamloops' insured, WorkSafeBC-covered crew.`
      : "Our team provides window washing, soft washing, gutter care, and more across Kamloops.";

  return (
    <PageTransition>
      <section className="bg-white pt-14 pb-8 border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Link
              href="/blog"
              className="text-xs font-bold text-blue-700 hover:underline uppercase tracking-wider"
            >
              ← All Articles
            </Link>
            {post.categories?.map((category) => (
              <span
                key={category.slug}
                className="bg-blue-50 text-blue-700 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider"
              >
                {category.title}
              </span>
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-slate-900 tracking-tight mb-5 leading-[1.1]"
          >
            {post.title}
          </motion.h1>

          <div className="flex items-center gap-5 text-sm text-slate-500 font-medium flex-wrap">
            <span className="flex items-center gap-1.5">
              <FiCalendar className="w-4 h-4 text-blue-600" /> {date}
            </span>
            {post.readingTime && (
              <span className="flex items-center gap-1.5">
                <FiClock className="w-4 h-4 text-blue-600" /> {post.readingTime} min read
              </span>
            )}
            {post.author?.name && <span>By {post.author.name}</span>}
            {updatedDate && updatedDate !== date && (
              <span className="text-slate-400 text-xs">Updated {updatedDate}</span>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white pb-4">
        <div className="container mx-auto px-4 max-w-4xl">
          <figure>
            {mainImageUrl && (
              <div className="relative w-full h-72 sm:h-[26rem] rounded-2xl overflow-hidden">
                <Image
                  src={mainImageUrl}
                  alt={typeof post.mainImage?.alt === 'string' ? post.mainImage.alt : post.title}
                  fill
                  priority
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            {post.mainImage?.caption && (
              <figcaption className="text-xs text-slate-500 mt-2 italic">{post.mainImage.caption}</figcaption>
            )}
          </figure>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-10">
              <div>
                <PortableText value={post.body} components={portableTextComponents} />
              </div>

              <RelatedServices services={relatedServices} />

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
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

              <AuthorCard author={post.author} />
              <ShareButtons url={`${siteUrl}/blog/${post.slug}`} title={post.title} />
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <SidebarPostList posts={sidebarPosts} title="Latest Articles" />

                <div className="bg-slate-950 text-white rounded-2xl p-7 space-y-4">
                  <h3 className="text-lg font-black text-white">Ready for a Free Quote?</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Get your property serviced by Kamloops&apos; highest-rated technicians.
                  </p>
                  <a
                    href={relatedServices[0] ? `/services/${relatedServices[0].slug}` : '/pricing'}
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-extrabold py-3.5 px-6 rounded-2xl text-sm transition-all"
                  >
                    <span>{relatedServices[0] ? `Book ${relatedServices[0].title}` : 'View Pricing'}</span>
                    <FiArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-slate-100">
            <RelatedPosts posts={relatedPosts} />
          </div>
        </div>
      </section>

      <CtaBanner
        tagline="Kamloops & Surrounding Areas"
        title="Ready to Book Your Service?"
        description={ctaDescription}
        buttonText="Get Free Quote"
      />
    </PageTransition>
  );
}