import { Container } from '@/components/ui/Section';
import { trustPoints } from '@/lib/data/home';
import { site } from '@/lib/site';
import { Stars } from '@/components/ui/Stars';

/**
 * One compact trust strip. It replaces StatsBar plus WhyChooseUs, which
 * repeated the same claims (insured, guarantee, rating) three times on the page.
 */
export function TrustBar(): React.JSX.Element {
  const { rating } = site;

  return (
    <section aria-label="Why homeowners trust us" className="border-b border-border bg-background py-8">
      <Container>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map(({ icon: Icon, title, detail }) => (
            <li key={title} className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-soft">
                <Icon aria-hidden className="size-6 text-brand-ink" />
              </span>
              <div>
                <p className="font-extrabold leading-tight">{title}</p>
                <p className="text-sm text-muted">{detail}</p>
              </div>
            </li>
          ))}
        </ul>

        {rating && (
          <div className="mt-6 flex items-center justify-center gap-3 border-t border-border pt-6 text-sm">
            <Stars rating={Math.round(rating.score)} />
            <p className="text-muted">
              <strong className="text-foreground">{rating.score.toFixed(1)}</strong> from {rating.count} {rating.source}{' '}
              reviews
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}
