import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity/client';
import type { PostCard } from '@/types/blog';

interface SidebarPostListProps {
  posts: PostCard[];
  title?: string;
}

export default function SidebarPostList({
  posts,
  title = 'Latest Articles',
}: SidebarPostListProps): React.JSX.Element | null {
  if (!posts?.length) return null;

  return (
    <div className="bg-white rounded-2xl p-6">
      <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-5 pb-3 border-b-2 border-blue-600 inline-block">
        {title}
      </h3>
      <div className="space-y-5">
        {posts.map((post) => {
          const imageUrl = post.mainImage
            ? urlFor(post.mainImage)?.width(128).height(128).url()
            : null;

          return (
            <Link key={post._id} href={`/blog/${post.slug}`} className="flex gap-3 group">
              <span className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}
              </span>
              <div className="min-w-0">
                {post.categories?.[0] && (
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wide">
                    {post.categories[0].title}
                  </span>
                )}
                <p className="text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                  {post.title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}