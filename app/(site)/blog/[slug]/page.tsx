import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity/client';
import { allPostSlugsQuery, postBySlugQuery, relatedPostsQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/client';
import type { PostCard, PostDetail } from '@/types/blog';
import BlogDetailClient from './page.client';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.masterpiecehomeservices.ca';

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allPostSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<PostDetail | null>(postBySlugQuery, { slug });

  if (!post) {
    return { title: 'Article Not Found | Masterpiece Kamloops' };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const imageSource = post.seoImage || post.mainImage;

  return {
    title: `${title} | Masterpiece Blog`,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      images: imageSource ? [{ url: urlFor(imageSource).width(1200).height(630).url() }] : undefined,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<PostDetail | null>(postBySlugQuery, { slug });

  if (!post) {
    notFound();
  }

  const categorySlugs = post.categories?.map((c) => c.slug) || [];
  const relatedPosts = categorySlugs.length
    ? await client.fetch<PostCard[]>(relatedPostsQuery, { slug, categorySlugs })
    : [];

  return <BlogDetailClient post={post} relatedPosts={relatedPosts} siteUrl={SITE_URL} />;
}