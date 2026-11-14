'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useQuote } from '@/hooks/useQuote';
import { cn } from '@/lib/cn';
import type { PricingPlan } from '@/types/pricing';

interface PricingCardProps {
  plan: PricingPlan;
  /** Commercial plans bill monthly with a minimum term. */
  isCommercial?: boolean;
}

export default function PricingCard({ plan, isCommercial = false }: PricingCardProps): React.JSX.Element {
  const { open } = useQuote();
  const custom = /custom/i.test(plan.price);

  return (
    <article
      className={cn(
        'relative flex h-full flex-col rounded-2xl border bg-surface p-6 shadow-sm transition-shadow hover:shadow-lg sm:p-8',
        plan.popular ? 'border-brand ring-2 ring-brand' : 'border-border',
      )}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-4 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-foreground">
          Most popular
        </span>
      )}

      <h3 className="text-xl font-extrabold">{plan.title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-muted">{plan.description}</p>

      <p className="mt-6 text-5xl font-black tabular-nums">
        {plan.price}
        {!custom && <span className="ml-2 text-base font-bold text-brand-ink">CAD</span>}
      </p>
      {!custom && (
        <p className="mt-1 text-sm text-muted">{isCommercial ? 'per month, 3-month minimum' : 'one-time service'}</p>
      )}

      <ul className="my-6 flex-1 space-y-3 border-t border-border pt-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm font-medium">
            <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-ink" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant={plan.popular ? 'primary' : 'secondary'}
        size="lg"
        className="w-full"
        onClick={() =>
          open({
            service: plan.title,
            summary: custom ? undefined : `${plan.title} — ${plan.price} CAD`,
          })
        }
      >
        {custom ? 'Get a custom quote' : 'Select plan'}
      </Button>
    </article>
  );
}