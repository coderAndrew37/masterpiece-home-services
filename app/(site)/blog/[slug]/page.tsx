import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity/client';
import { allPostSlugsQuery, postBySlugQuery, relatedPostsQuery } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/client';
import type { PostCard, PostDetail } from '@/types/blog';
import BlogDetailClient from './page.client';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.masterpiecehomeservices.ca';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqBlockNode {
  _type: string;
  items?: FaqItem[];
}

function extractFaqs(body: unknown[]): FaqItem[] {
  if (!Array.isArray(body)) return [];
  return (body as FaqBlockNode[])
    .filter((block) => block?._type === 'faqBlock')
    .flatMap((block) => block.items || []);
}

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
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    robots: post.noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
        },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
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

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const faqs = extractFaqs(post.body);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${postUrl}#article`,
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: post.author ? { '@type': 'Person', name: post.author.name } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Masterpiece Home Services',
      url: SITE_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
  };

  const faqJsonLd = faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <BlogDetailClient post={post} relatedPosts={relatedPosts} siteUrl={SITE_URL} />
    </>
  );
}