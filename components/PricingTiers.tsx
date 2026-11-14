'use client';

import { useId, useState } from 'react';
import PricingCard from '@/components/PricingCard';
import { cn } from '@/lib/cn';
import type { PricingPlan } from '@/types/pricing';

type Audience = 'residential' | 'commercial';

const TABS: { id: Audience; label: string }[] = [
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial & strata' },
];

interface PricingTiersProps {
  /** Residential plans. */
  plans: PricingPlan[];
  /** When provided, tabs let visitors switch to commercial pricing. */
  commercialPlans?: PricingPlan[];
}

export default function PricingTiers({ plans, commercialPlans = [] }: PricingTiersProps): React.JSX.Element | null {
  const uid = useId();
  const plansByAudience: Record<Audience, PricingPlan[]> = { residential: plans, commercial: commercialPlans };

  // Only offer tabs that have something to show.
  const tabs = TABS.filter((tab) => plansByAudience[tab.id].length > 0);
  const [active, setActive] = useState<Audience>(tabs[0]?.id ?? 'residential');

  if (tabs.length === 0) return null;

  const current = tabs.some((tab) => tab.id === active) ? active : tabs[0].id;

  const onKeyDown = (event: React.KeyboardEvent, index: number): void => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    const next = tabs[(index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
    setActive(next.id);
    document.getElementById(`${uid}-tab-${next.id}`)?.focus();
  };

  return (
    <div>
      {tabs.length > 1 && (
        <div
          role="tablist"
          aria-label="Pricing type"
          className="mx-auto mb-12 grid w-full max-w-md grid-cols-2 gap-1 rounded-xl bg-surface-muted p-1"
        >
          {tabs.map((tab, index) => {
            const selected = tab.id === current;
            return (
              <button
                key={tab.id}
                id={`${uid}-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={cn(
                  'rounded-lg px-4 py-2.5 text-sm font-bold transition-colors',
                  selected ? 'bg-brand text-brand-foreground shadow' : 'text-muted hover:text-foreground',
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      <div
        id={`${uid}-panel`}
        role={tabs.length > 1 ? 'tabpanel' : undefined}
        aria-labelledby={tabs.length > 1 ? `${uid}-tab-${current}` : undefined}
        className="grid gap-8 pt-3 md:grid-cols-2 lg:grid-cols-3"
      >
        {plansByAudience[current].map((plan) => (
          <PricingCard key={`${current}-${plan.title}`} plan={plan} isCommercial={current === 'commercial'} />
        ))}
      </div>
    </div>
  );
}