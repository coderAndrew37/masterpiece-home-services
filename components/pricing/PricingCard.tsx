import { Check } from 'lucide-react';
import { QuoteButton } from '@/components/forms/QuoteButton';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/cn';
import type { PricingPlan } from '@/types/pricing';

interface PricingCardProps {
  plan: PricingPlan;
  isCommercial?: boolean;
}

/**
 * Same props as the old PricingCard, so the /pricing page can switch its
 * import to this one. Uses the shared PricingPlan type instead of redeclaring it.
 */
export function PricingCard({ plan, isCommercial = false }: PricingCardProps): React.JSX.Element {
  const isCustom = plan.price.toLowerCase().includes('custom');

  return (
    <Card className={cn('flex h-full flex-col', plan.popular && 'ring-2 ring-brand')}>
      {plan.popular && (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand px-4 py-1 text-xs font-bold uppercase tracking-wide text-brand-foreground">
          Most popular
        </span>
      )}

      <div className="rounded-t-2xl bg-brand-soft px-6 pb-5 pt-8 text-center">
        <h3 className="text-xl font-bold">{plan.title}</h3>
        <p className="mt-1 text-sm text-muted">{plan.description}</p>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-6 text-center">
          <p className="text-4xl font-extrabold">
            {plan.price}
            {!isCustom && <span className="ml-1.5 align-top text-base font-bold text-brand-ink">CAD</span>}
          </p>
          {!isCustom && (
            <p className="mt-1 text-sm text-muted">
              {isCommercial ? 'per month (min. 3 months)' : 'one-time service'}
            </p>
          )}
        </div>

        <ul className="mb-8 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-soft">
                <Check aria-hidden className="size-3.5 text-brand-ink" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <QuoteButton
          variant={plan.popular ? 'primary' : 'outline'}
          size="lg"
          className="mt-auto w-full"
          service={plan.title}
          summary={isCustom ? undefined : `${plan.title}: ${plan.price} CAD`}
        >
          {isCustom ? 'Get a custom quote' : 'Choose this plan'}
        </QuoteButton>
      </div>
    </Card>
  );
}
