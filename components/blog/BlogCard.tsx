import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { CmsImage } from '@/components/ui/CmsImage';
import { formatDate } from '@/lib/format';
import { imageUrl } from '@/lib/sanity/image';
import type { PostCard } from '@/types/blog';

interface BlogCardProps {
  post: PostCard;
  /** Kept so existing callers compile; the stagger is now handled in CSS. */
  index?: number;
}

/** Server component: no client JS needed for a card. */
export function BlogCard({ post }: BlogCardProps): React.JSX.Element {
  const href = `/blog/${post.slug}`;
  const category = post.categories?.[0]?.title;
  const alt = typeof post.mainImage?.alt === 'string' && post.mainImage.alt ? post.mainImage.alt : post.title;

  return (
    <Card interactive className="group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[14/9] overflow-hidden bg-surface-muted">
        <CmsImage
          src={imageUrl(post.mainImage, { width: 700, height: 450 })}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
        {category && (
          <span className="absolute left-4 top-4 rounded-full bg-black/75 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            {category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-3 text-xs font-medium text-muted">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.readingTime && (
            <span className="flex items-center gap-1">
              <Clock aria-hidden className="size-3.5" /> {post.readingTime} min read
            </span>
          )}
        </div>

        <h3 className="mb-2 text-lg font-extrabold leading-snug">
          <Link href={href} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>

        <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-brand-ink">
          Read article
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
        </span>
      </div>
    </Card>
  );
}

export default BlogCard;
