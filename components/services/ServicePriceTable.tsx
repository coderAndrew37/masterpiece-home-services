import { ArrowRight } from 'lucide-react';
import PricingTable, { type PricingRow } from '@/components/PricingTable';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import type { ServiceItem } from '@/types/service';

const formatPrice = (price?: string): string => price?.replace(/^from\s+/i, '') || 'Custom quote';

export function ServicePriceTable({ services }: { services: ServiceItem[] }): React.JSX.Element | null {
  if (services.length === 0) return null;

  const rows: PricingRow[] = services.map((service) => ({
    id: service._id,
    service: service.title,
    details: service.shortDescription,
    price: formatPrice(service.startingPrice),
  }));

  return (
    <Section
      id="pricing"
      tone="muted"
      eyebrow="Pricing"
      title="Starting prices at a glance"
      description="All prices are in Canadian dollars. Your exact quote is confirmed in writing before we book."
    >
      <PricingTable rows={rows} labels={{ service: 'Service', details: 'What it covers', price: 'Starting at' }} />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">Bundles and commercial rates are on the pricing page.</p>
        <ButtonLink href="/pricing" variant="secondary">
          See full pricing
          <ArrowRight aria-hidden className="size-4" />
        </ButtonLink>
      </div>
    </Section>
  );
}