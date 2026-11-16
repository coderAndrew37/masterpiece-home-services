import { FcGoogle } from 'react-icons/fc';
import { Card } from '@/components/ui/Card';
import { Review } from '@/types/reviews';
import { ReviewStars } from './ReviewsStars';


export function ReviewCard({ review }: { review: Review }): React.JSX.Element {
  return (
    <Card className="h-full p-6">
      <figure className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <ReviewStars rating={review.rating} />
          {review.source === 'google' ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted">
              <FcGoogle aria-hidden className="size-4" />
              Google
            </span>
          ) : (
            <span className="text-xs font-bold uppercase tracking-wider text-brand-ink">Direct</span>
          )}
        </div>

        <blockquote className="mt-4 flex-1 text-sm leading-relaxed">
          <p>{review.text}</p>
        </blockquote>

        <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
          <span
            aria-hidden
            className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-black text-brand-ink"
          >
            {review.author.charAt(0).toUpperCase()}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold">{review.author}</span>
            {review.meta && <span className="block truncate text-xs text-muted">{review.meta}</span>}
          </span>
        </figcaption>
      </figure>
    </Card>
  );
}