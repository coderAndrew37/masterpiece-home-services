import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/types/faq';

interface FaqListProps {
  items: FaqItem[];
  openFirst?: boolean;
}

/**
 * Accordion built on native <details>: zero JavaScript, keyboard accessible,
 * and every answer is in the HTML for crawlers and AI answer engines.
 * The shared `name` makes it exclusive (opening one closes the others) in
 * current browsers; older browsers just allow several open at once.
 */
export function FaqList({ items, openFirst = true }: FaqListProps): React.JSX.Element {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
      {items.map((item, index) => (
        <details key={item.question} name="faq" open={openFirst && index === 0} className="group px-5 py-4 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="text-base font-semibold group-open:text-brand-ink sm:text-lg">{item.question}</h3>
            <ChevronDown
              aria-hidden
              className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180 motion-reduce:transition-none"
            />
          </summary>
          <p className="mt-3 leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
