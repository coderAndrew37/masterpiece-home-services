import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { allPostsQuery } from '@/lib/sanity/queries';
import type { PostCard } from '@/types/blog';
import BlogClient from './page.client';

export const metadata: Metadata = {
  title: 'Blog | Masterpiece Home Services Kamloops',
  description:
    'Seasonal home care tips, window cleaning guides, and property maintenance advice from Masterpiece Home Services in Kamloops, BC.',
  openGraph: {
    title: 'Blog | Masterpiece Home Services',
    description:
      'Seasonal home care tips, window cleaning guides, and property maintenance advice from Kamloops’ trusted exterior care team.',
  },
};

// Revalidate periodically so new posts show up without a full redeploy.
export const revalidate = 60;

export default async function BlogPage() {
  const posts = await client.fetch<PostCard[]>(allPostsQuery);

  return <BlogClient posts={posts} />;
}