'use client';

import { ArrowRight } from 'lucide-react';
import { useQuote } from '@/hooks/useQuote';

export interface PricingRow {
  id: string;
  service: string;
  details?: string;
  /** Display string, e.g. "$199" or "Custom quote". */
  price: string;
}

interface PricingTableProps {
  rows: PricingRow[];
  /** Column headings, so the same table can show services, plans or add-ons. */
  labels?: { service: string; details: string; price: string };
  hint?: string;
}

const defaultLabels = { service: 'Service', details: 'Details', price: 'Price' };

const isCustomPrice = (price: string): boolean => /custom/i.test(price);

export default function PricingTable({
  rows,
  labels = defaultLabels,
  hint = 'Tap any row to get a free quote for that service.',
}: PricingTableProps): React.JSX.Element | null {
  const { open } = useQuote();

  if (rows.length === 0) return null;

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead className="tone-inverse text-xs font-bold uppercase tracking-wider">
            <tr>
              <th scope="col" className="px-5 py-4">
                {labels.service}
              </th>
              <th scope="col" className="hidden px-5 py-4 md:table-cell">
                {labels.details}
              </th>
              <th scope="col" className="px-5 py-4 text-right">
                {labels.price}
              </th>
              <th scope="col" className="w-10 px-3 py-4">
                <span className="sr-only">Get a quote</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="group relative border-t border-border transition-colors even:bg-surface-muted hover:bg-brand-soft focus-within:bg-brand-soft"
              >
                <th scope="row" className="px-5 py-4 align-top font-bold">
                  <button
                    type="button"
                    onClick={() =>
                      open({
                        service: row.service,
                        summary: isCustomPrice(row.price) ? row.service : `${row.service} — ${row.price} CAD`,
                      })
                    }
                    className="text-left after:absolute after:inset-0 focus-visible:outline-none"
                  >
                    {row.service}
                  </button>
                  {row.details && (
                    <span className="mt-1 block text-sm font-normal text-muted md:hidden">{row.details}</span>
                  )}
                </th>
                <td className="hidden max-w-md px-5 py-4 align-top text-sm text-muted md:table-cell">
                  {row.details}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-right align-top text-lg font-black tabular-nums text-brand-ink">
                  {row.price}
                </td>
                <td className="px-3 py-4 align-top text-brand-ink">
                  <ArrowRight
                    aria-hidden
                    className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hint && <p className="mt-4 text-center text-xs text-muted">{hint}</p>}
    </>
  );
}