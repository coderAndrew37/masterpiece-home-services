import { Star } from 'lucide-react';
import { cn } from '@/lib/cn';

export function Stars({ rating, className }: { rating: number; className?: string }): React.JSX.Element {
  return (
    <div role="img" aria-label={`${rating} out of 5 stars`} className={cn('flex gap-0.5', className)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={cn('size-4', i < rating ? 'fill-star text-star' : 'text-border')}
        />
      ))}
    </div>
  );
}
