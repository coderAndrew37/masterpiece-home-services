import { Star } from 'lucide-react';
import { cn } from '@/lib/cn';

export function ReviewStars({ rating, className }: { rating: number; className?: string }): React.JSX.Element {
  const filled = Math.round(Math.min(5, Math.max(0, rating)));

  return (
    <span role="img" aria-label={`${rating} out of 5 stars`} className={cn('inline-flex gap-0.5', className)}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden
          className={cn('size-4', index < filled ? 'fill-star text-star' : 'text-muted/40')}
        />
      ))}
    </span>
  );
}