import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { latestPostsQuery } from '@/lib/sanity/queries';
import type { PostCard } from '@/types/blog';
import HomeClient from './page.client';

export const metadata: Metadata = {
  title: 'Shine Windows & Gutters | Window & Exterior Cleaning in Canada',
  description:
    'Professional window cleaning, gutter maintenance, and exterior home care services. Request a free quote today!',
  openGraph: {
    title: 'Shine Windows & Gutters | Professional Cleaning Services',
    description: 'Crystal clear windows and reliable home exterior maintenance.',
    type: 'website',
  },
};

// Revalidate periodically so new blog posts show up on the homepage without a full redeploy.
export const revalidate = 60;

export default async function HomePage() {
  const latestPosts = await client.fetch<PostCard[]>(latestPostsQuery);

  return <HomeClient latestPosts={latestPosts} />;
}