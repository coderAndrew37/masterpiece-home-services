import { Check, ShieldCheck } from 'lucide-react';
import ServiceCalculator from '@/components/ServiceCalculator';
import { QuoteButton } from '@/components/forms/QuoteButton';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { capitalize, type ServiceCopy } from '@/lib/data/serviceCopy';
import { cn } from '@/lib/cn';
import type { DetailedService } from '@/types/service';

interface ServicePricingProps {
  service: DetailedService;
  copy: ServiceCopy;
  showCalculator: boolean;
}

const promises = ['Free, no-obligation quote', 'Price confirmed in writing', "Free re-clean if it's not spotless"] as const;

function StartingPriceCard({ price, service }: { price: string; service: string }): React.JSX.Element {
  return (
    <div className="tone-inverse flex flex-col rounded-2xl p-6 shadow-lg sm:p-8">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-ink">Starting at</p>
      <p className="mt-2 text-6xl font-black tabular-nums">
        {price}
        <span className="ml-2 text-base font-bold text-brand-ink">CAD</span>
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Your final price depends on your property and is confirmed before we book.
      </p>

      <ul className="my-6 space-y-2.5 border-y border-border py-6 text-sm font-medium">
        {promises.map((item) => (
          <li key={item} className="flex items-center gap-2.5">
            <ShieldCheck aria-hidden className="size-4 shrink-0 text-brand-ink" />
            {item}
          </li>
        ))}
      </ul>

      <QuoteButton service={service} size="lg" className="mt-auto w-full">
        Get my exact price
      </QuoteButton>
    </div>
  );
}

function FactorsCard({ factors, className }: { factors: string[]; className?: string }): React.JSX.Element {
  return (
    <Card className={cn('p-6 sm:p-8', className)}>
      <h3 className="text-lg font-extrabold">What affects the price</h3>
      <p className="mt-1 text-sm text-muted">No surprises: these are the things that move your quote.</p>
      <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {factors.map((factor) => (
          <li key={factor} className="flex items-start gap-2.5 text-sm font-medium">
            <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-ink" />
            {factor}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function CustomQuoteBanner({ service }: { service: string }): React.JSX.Element {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-brand-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div>
        <h3 className="font-extrabold">Need something custom?</h3>
        <p className="mt-1 text-sm text-muted">Post-construction cleanup, multi-surface properties or commercial work.</p>
      </div>
      <QuoteButton variant="secondary" service={service} className="shrink-0">
        Request a custom quote
      </QuoteButton>
    </div>
  );
}

export function ServicePricing({ service, copy, showCalculator }: ServicePricingProps): React.JSX.Element {
  const price = service.startingPrice?.replace(/^from\s+/i, '');
  const showPriceCard = !showCalculator && Boolean(price);

  return (
    <Section
      id="pricing"
      tone="muted"
      eyebrow="Pricing"
      title={`${capitalize(copy.keyword)}: pricing`}
      description="Prices are in Canadian dollars. We confirm your exact quote in writing before we book, so there are no surprises on the day."
    >
      <div className="space-y-6">
        {showCalculator && <ServiceCalculator />}

        <div className={cn('grid gap-6', showPriceCard && 'lg:grid-cols-3')}>
          {showPriceCard && price && <StartingPriceCard price={price} service={service.title} />}
          <FactorsCard factors={copy.priceFactors} className={cn(showPriceCard && 'lg:col-span-2')} />
        </div>

        <CustomQuoteBanner service={service.title} />
      </div>
    </Section>
  );
}