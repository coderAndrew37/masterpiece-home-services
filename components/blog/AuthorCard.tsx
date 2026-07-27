import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';
import type { PostDetail } from '@/types/blog';

interface AuthorCardProps {
  author: PostDetail['author'];
}

export default function AuthorCard({ author }: AuthorCardProps): React.JSX.Element {
  return (
    <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm">
      <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-4">
        Written By
      </span>
      <div className="flex items-center gap-4">
        {author.image ? (
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-slate-200">
            <Image
              src={urlFor(author.image).width(112).height(112).url()}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-2xl bg-blue-700 text-white font-extrabold text-lg flex items-center justify-center shrink-0">
            {author.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-extrabold text-slate-900 text-base">{author.name}</p>
          {author.role && <p className="text-xs text-slate-500 font-semibold">{author.role}</p>}
        </div>
      </div>
      {author.bio && (
        <p className="text-slate-600 text-sm leading-relaxed mt-4 pt-4 border-t border-slate-100">
          {author.bio}
        </p>
      )}
    </div>
  );
}