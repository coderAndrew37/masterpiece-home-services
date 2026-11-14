'use client';

import { useId, useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useQuote } from '@/hooks/useQuote';
import { cn } from '@/lib/cn';

type Property = 'residential' | 'commercial';

/** Edit prices here only. Whole dollars, CAD. */
const RATES: Record<Property, { label: string; base: number; perWindow: number }> = {
  residential: { label: 'Residential', base: 100, perWindow: 5 },
  commercial: { label: 'Commercial', base: 200, perWindow: 4 },
};

const ADDONS = [
  { id: 'gutter', name: 'Gutter cleaning', price: 99 },
  { id: 'pressure', name: 'Pressure washing', price: 149 },
  { id: 'hardwater', name: 'Hard-water stain removal', price: 75 },
] as const;

type AddonId = (typeof ADDONS)[number]['id'];

const money = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });

function Row({ label, value }: { label: string; value: number }): React.JSX.Element {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="font-semibold tabular-nums">{money.format(value)}</dd>
    </div>
  );
}

export default function ServiceCalculator(): React.JSX.Element {
  const uid = useId();
  const { open } = useQuote();

  const [property, setProperty] = useState<Property>('residential');
  const [windows, setWindows] = useState(15);
  const [selected, setSelected] = useState<AddonId[]>([]);

  const rate = RATES[property];
  const windowsCost = windows * rate.perWindow;
  const chosen = ADDONS.filter((addon) => selected.includes(addon.id));
  const total = rate.base + windowsCost + chosen.reduce((sum, addon) => sum + addon.price, 0);

  const toggleAddon = (id: AddonId): void =>
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

 const requestQuote = (): void => {
  const extras = chosen.length > 0 ? ` + ${chosen.map((addon) => addon.name).join(', ')}` : '';

  open({
    service: `${rate.label} window cleaning`,
    summary: `Estimate: ${money.format(total)} CAD · ${windows} windows${extras}`,
  });
};

  return (
    <div className="grid overflow-hidden rounded-2xl border border-border bg-surface shadow-lg lg:grid-cols-5">
      {/* Controls */}
      <div className="space-y-8 p-6 sm:p-8 lg:col-span-3">
        <header>
          <h3 className="text-xl font-extrabold">Estimate your price</h3>
          <p className="mt-1 text-sm text-muted">Three quick choices. No sign-up needed.</p>
        </header>

        <fieldset>
          <legend className="mb-3 text-sm font-bold">Property type</legend>
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-surface-muted p-1">
            {(Object.keys(RATES) as Property[]).map((key) => (
              <label key={key} className="relative">
                <input
                  type="radio"
                  name={`${uid}-property`}
                  value={key}
                  checked={property === key}
                  onChange={() => setProperty(key)}
                  className="peer sr-only"
                />
                <span className="block cursor-pointer rounded-lg px-4 py-2.5 text-center text-sm font-bold text-muted transition-colors hover:text-foreground peer-checked:bg-brand peer-checked:text-brand-foreground peer-checked:shadow peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
                  {RATES[key].label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <div className="mb-3 flex items-baseline justify-between gap-4">
            <label htmlFor={`${uid}-windows`} className="text-sm font-bold">
              Number of windows
            </label>
            <output htmlFor={`${uid}-windows`} className="text-2xl font-black tabular-nums">
              {windows}
            </output>
          </div>
          <input
            id={`${uid}-windows`}
            type="range"
            min={1}
            max={100}
            value={windows}
            onChange={(event) => setWindows(Number(event.target.value))}
            className="h-2 w-full cursor-pointer accent-brand"
          />
          <div aria-hidden className="mt-2 flex justify-between text-xs font-medium text-muted">
            <span>1</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
          <p className="mt-3 text-xs text-muted">
            A rough count is fine. We confirm the exact number in your written quote.
          </p>
        </div>

        <fieldset>
          <legend className="mb-3 text-sm font-bold">
            Add-ons <span className="font-medium text-muted">(optional)</span>
          </legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {ADDONS.map((addon) => {
              const checked = selected.includes(addon.id);
              return (
                <label key={addon.id} className="relative block">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleAddon(addon.id)}
                    className="peer sr-only"
                  />
                  <span className="flex h-full cursor-pointer items-start justify-between gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-brand-ink peer-checked:border-brand peer-checked:bg-brand-soft peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
                    <span>
                      <span className="block text-sm font-bold">{addon.name}</span>
                      <span className="mt-0.5 block text-sm font-semibold text-brand-ink">
                        +{money.format(addon.price)}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        'mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2',
                        checked ? 'border-brand bg-brand text-brand-foreground' : 'border-muted',
                      )}
                    >
                      {checked && <Check className="size-3" strokeWidth={3} />}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* Result: always a dark band, in both themes */}
      <div className="tone-inverse flex flex-col justify-between gap-8 p-6 sm:p-8 lg:col-span-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-ink">Your estimate</p>
          <p aria-live="polite" className="mt-2 text-5xl font-black tabular-nums sm:text-6xl">
            {money.format(total)}
            <span className="ml-2 text-base font-bold text-brand-ink">CAD</span>
          </p>

          <dl className="mt-6 space-y-2.5 border-t border-border pt-5 text-sm">
            <Row label="Base price" value={rate.base} />
            <Row label={`${windows} windows × ${money.format(rate.perWindow)}`} value={windowsCost} />
            {chosen.map((addon) => (
              <Row key={addon.id} label={addon.name} value={addon.price} />
            ))}
          </dl>
        </div>

        <div>
          <Button size="lg" className="w-full" onClick={requestQuote}>
            Get my exact quote
          </Button>
          <p className="mt-3 text-center text-xs text-muted">
            Estimate only. We confirm your exact price in writing before booking.
          </p>
        </div>
      </div>
    </div>
  );
}