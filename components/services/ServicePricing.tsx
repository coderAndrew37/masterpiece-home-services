import { Check } from 'lucide-react';
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

export function ServicePricing({ service, copy, showCalculator }: ServicePricingProps): React.JSX.Element {
  const price = service.startingPrice?.replace(/^from\s+/i, '');

  return (
    <Section
      id="pricing"
      tone="muted"
      eyebrow="Pricing"
      title={`${capitalize(copy.keyword)}: pricing`}
      description="Prices are in Canadian dollars. We confirm your exact quote in writing before we book, so there are no surprises on the day."
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        <Card className={cn('p-6 sm:p-8', showCalculator ? 'lg:col-span-5' : 'lg:col-span-12')}>
          {price && (
            <>
              <p className="text-sm font-semibold text-muted">Starting at</p>
              <p className="text-5xl font-black">
                {price}
                <span className="ml-2 text-base font-bold text-brand-ink">CAD</span>
              </p>
            </>
          )}

          <h3 className="mt-6 font-bold">What affects the price</h3>
          <ul className={cn('mt-3 gap-x-8 gap-y-2.5 text-sm', showCalculator ? 'space-y-2.5' : 'grid sm:grid-cols-2')}>
            {copy.priceFactors.map((factor) => (
              <li key={factor} className="flex items-start gap-2.5">
                <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-ink" />
                {factor}
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-border pt-6">
            <p className="font-semibold">Need something custom?</p>
            <p className="mt-1 text-sm text-muted">
              Post-construction cleanup, multi-surface properties or commercial work.
            </p>
            <QuoteButton variant="outline" service={service.title} className="mt-4 w-full sm:w-auto">
              Request a custom quote
            </QuoteButton>
          </div>
        </Card>

        {showCalculator && (
          <div className="lg:col-span-7">
            <ServiceCalculator />
          </div>
        )}
      </div>
    </Section>
  );
}