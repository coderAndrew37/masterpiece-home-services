import { cn } from '@/lib/cn';

export interface StepItem {
  title: string;
  description: string;
}

interface StepsProps {
  items: StepItem[];
  /** "grid" for a full-width row (homepage), "stack" for a narrow column (detail pages). */
  layout?: 'grid' | 'stack';
}

/** CMS titles are sometimes typed as "1. Do thing"; the badge already shows the number. */
const stripLeadingNumber = (title: string): string => title.replace(/^\s*\d+[.)]\s*/, '');

export function Steps({ items, layout = 'grid' }: StepsProps): React.JSX.Element {
const columns = items.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4';

  return (
    <ol className={cn(layout === 'stack' ? 'space-y-4' : cn('grid gap-8 sm:grid-cols-2', columns))}>
      {items.map((item, index) => (
        <li
          key={item.title}
          className={cn(layout === 'stack' ? 'flex items-start gap-4 rounded-2xl border border-border bg-surface-muted p-5' : 'reveal')}
        >
          <span
            aria-hidden
            className={cn(
              'grid shrink-0 place-items-center bg-brand font-extrabold text-brand-foreground',
              layout === 'stack' ? 'size-9 rounded-xl text-sm' : 'size-11 rounded-full text-lg',
            )}
          >
            {index + 1}
          </span>
          <div className={cn(layout !== 'stack' && 'mt-4')}>
            <h3 className={cn('font-bold', layout === 'stack' ? 'text-base' : 'text-lg')}>{stripLeadingNumber(item.title)}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}