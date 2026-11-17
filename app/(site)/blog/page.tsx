import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { allPostsQuery } from '@/lib/sanity/queries';
import type { PostCard } from '@/types/blog';
import BlogClient from './page.client';
import { createMetadata } from '@/lib/seo/metadata';
import { site } from '@/lib/site';

const SITE_URL = 'https://www.masterpiecehomeservices.ca';
const PAGE_URL = `${SITE_URL}/blog`;

export const metadata: Metadata = createMetadata({
  title: 'Home Care Tips & Guides for Kamloops Homeowners',
  description:
    'Seasonal home care tips, window cleaning guides and property maintenance advice from Masterpiece Home Services in Kamloops, BC.',
  path: '/blog',
  image: site.images.og,
});

export const revalidate = 60;

export default async function BlogPage(): Promise<React.JSX.Element> {
  const posts = await client.fetch<PostCard[]>(allPostsQuery);

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${PAGE_URL}#blog`,
    url: PAGE_URL,
    name: 'Masterpiece Home Services Blog',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.publishedAt,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: PAGE_URL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <BlogClient posts={posts} />
    </>
  );
}