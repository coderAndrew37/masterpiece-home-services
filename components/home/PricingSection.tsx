import { PricingCard } from '@/components/pricing/PricingCard';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { site } from '@/lib/site';
import type { PricingPlan } from '@/types/pricing';

export function PricingSection({ plans }: { plans: PricingPlan[] }): React.JSX.Element | null {
  if (plans.length === 0) return null;

  return (
    <Section
      id="pricing"
      tone="muted"
      eyebrow="Pricing"
      title="Straightforward pricing"
      description="Prices are in Canadian dollars. We confirm your exact quote before we book, so there are no surprise charges."
      action={
        <ButtonLink href={site.routes.pricing} variant="outline">
          Full pricing &amp; bundles
        </ButtonLink>
      }
    >
      <ul className="grid gap-8 pt-3 md:grid-cols-3">
        {plans.map((plan) => (
          <li key={plan.title} className="reveal">
            <PricingCard plan={plan} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
