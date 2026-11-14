import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { Stars } from '@/components/ui/Stars';
import { reviews } from '@/lib/data/reviews';

/**
 * Three static cards instead of an autoplaying fade carousel: all the
 * social proof is visible at once, crawlable, and there's nothing to wait for.
 */
export function ReviewsSection(): React.JSX.Element {
  return (
    <Section id="reviews" tone="muted" eyebrow="Reviews" title="What Kamloops homeowners say">
      <ul className="grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <li key={review.id} className="reveal">
            <Card className="h-full p-6">
              <figure className="flex h-full flex-col">
                <Stars rating={review.rating} />
                <blockquote className="mt-4 flex-1 leading-relaxed">&ldquo;{review.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-bold">{review.name}</span>
                  <span className="text-muted"> · {review.location}</span>
                </figcaption>
              </figure>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
