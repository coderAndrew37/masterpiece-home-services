import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity/client';
import {
  allPostSlugsQuery,
  postBySlugQuery,
  relatedPostsQuery,
  sidebarPostsQuery,
  relatedServicesBySlugsQuery,
} from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/client';
import type { PostCard, PostDetail } from '@/types/blog';
import type { RelatedServiceItem } from '@/types/service';
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
  const ogImageUrl = imageSource ? urlFor(imageSource).width(1200).height(630).url() : undefined;
  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${title} | Masterpiece Blog`,
    description,
    alternates: { canonical: postUrl },
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
      url: postUrl,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImageUrl ? [ogImageUrl] : undefined,
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
  const [relatedPosts, sidebarPosts, relatedServices] = await Promise.all([
    categorySlugs.length
      ? client.fetch<PostCard[]>(relatedPostsQuery, { slug, categorySlugs })
      : Promise.resolve([]),
    client.fetch<PostCard[]>(sidebarPostsQuery, { slug }),
    post.relatedServiceSlugs?.length
      ? client.fetch<RelatedServiceItem[]>(relatedServicesBySlugsQuery, { slugs: post.relatedServiceSlugs })
      : Promise.resolve([]),
  ]);

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const faqs = extractFaqs(post.body);

  // publisher references the homepage Organization node by @id rather than
  // redeclaring it — same pattern as Service/ServiceArea schema elsewhere.
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
    publisher: { '@id': `${SITE_URL}/#organization` },
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
      <BlogDetailClient
        post={post}
        relatedPosts={relatedPosts}
        sidebarPosts={sidebarPosts}
        relatedServices={relatedServices}
        siteUrl={SITE_URL}
      />
    </>
  );
}