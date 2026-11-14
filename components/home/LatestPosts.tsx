import { BlogCard } from '@/components/blog/BlogCard';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { site } from '@/lib/site';
import type { PostCard } from '@/types/blog';

export function LatestPosts({ posts }: { posts: PostCard[] }): React.JSX.Element | null {
  if (posts.length === 0) return null;

  return (
    <Section
      id="journal"
      tone="muted"
      eyebrow="Journal"
      title="Tips from our journal"
      description="Practical, seasonal advice for keeping a Kamloops home clean and protected."
      action={
        <ButtonLink href={site.routes.blog} variant="outline">
          View all articles
        </ButtonLink>
      }
    >
      <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post._id} className="reveal">
            <BlogCard post={post} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
