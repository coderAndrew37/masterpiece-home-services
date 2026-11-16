import { ExternalLink } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { ReviewStars } from './ReviewsStars';

interface RatingSummaryProps {
  rating: number;
  count: number;
  href?: string | null;
}

export function RatingSummary({ rating, count, href }: RatingSummaryProps): React.JSX.Element {
  const content = (
    <>
      <FcGoogle aria-hidden className="size-5" />
      <ReviewStars rating={rating} />
      <span className="text-sm font-bold tabular-nums">{rating.toFixed(1)}</span>
      <span className="text-sm text-muted">
        &middot; {count} Google review{count === 1 ? '' : 's'}
      </span>
    </>
  );

  const className = 'inline-flex flex-wrap items-center gap-2 rounded-full border border-border bg-surface px-4 py-2';

  if (!href) return <p className={className}>{content}</p>;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${className} transition-colors hover:border-brand-ink`}>
      {content}
      <ExternalLink aria-hidden className="size-3.5 text-muted" />
    </a>
  );
}