import React from 'react';
import BlogCard from './BlogCard';
import type { PostCard } from '@/types/blog';

interface RelatedPostsProps {
  posts: PostCard[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps): React.JSX.Element | null {
  if (!posts?.length) return null;

  return (
    <div className="pt-4">
      <div className="mb-8">
        <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
          Keep Reading
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900">Related Articles</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <BlogCard key={post._id} post={post} index={idx} />
        ))}
      </div>
    </div>
  );
}