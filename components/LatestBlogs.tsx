"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiClock } from "react-icons/fi";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}

const posts: BlogPost[] = [
  {
    id: "1",
    title: "How Often Should You Clean Windows in Kamloops?",
    excerpt:
      "Dust, wildfire smoke, and seasonal weather can quickly coat exterior glass. Learn the optimal cleaning schedule for Thompson-Okanagan homes.",
    category: "Window Care",
    date: "Jul 12, 2026",
    readTime: "4 min read",
    image: "/images/residential-1.jpg", // Replace with your real image paths
    slug: "how-often-should-you-clean-windows-kamloops",
  },
  {
    id: "2",
    title: "5 Signs Your Eavestroughs Need Immediate Clearing",
    excerpt:
      "Clogged gutters can cause severe foundation damage and roof leaks. Here is what to look out for before the heavy fall rains hit.",
    category: "Gutter Maintenance",
    date: "Jun 28, 2026",
    readTime: "5 min read",
      image: "/images/residential-1.jpg",
    slug: "5-signs-your-eavestroughs-need-clearing",
  },
  {
    id: "3",
    title: "Soft Wash vs. Pressure Wash: What’s Safe for Your Siding?",
    excerpt:
      "High pressure can damage vinyl and stucco exterior walls. Discover why soft washing is the safer, more effective standard for home washing.",
    category: "Exterior Cleaning",
    date: "Jun 14, 2026",
    readTime: "6 min read",
    image: "/images/residential-1.jpg",
    slug: "soft-wash-vs-pressure-wash-siding-guide",
  },
];

export default function LatestBlogs(): React.JSX.Element {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header with Heading & Link to Full Blog */}
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

        {/* Blog Posts Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: BlogPost, index: number) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Featured Image */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-200">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
                <div>
                  {/* Metadata (Date & Read Time) */}
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-4">
                    <span className="flex items-center gap-1.5">
                      <FiCalendar className="text-blue-700" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiClock className="text-blue-700" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 mb-3">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read Article Link */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors pt-4 border-t border-slate-100"
                >
                  <span>Read Article</span>
                  <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}