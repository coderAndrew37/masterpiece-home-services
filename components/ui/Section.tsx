import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type Tone = 'default' | 'muted' | 'inverse';

const tones: Record<Tone, string> = {
  default: 'bg-background text-foreground',
  muted: 'bg-surface-muted text-foreground',
  inverse: 'tone-inverse',
};

export function Container({ className, children }: { className?: string; children: ReactNode }): React.JSX.Element {
  return <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

interface SectionProps {
  id: string;
  title: string;
  tone?: Tone;
  eyebrow?: string;
  description?: ReactNode;
  align?: 'left' | 'center';
  /** Optional element aligned to the right of the heading (e.g. a "View all" link). */
  action?: ReactNode;
  className?: string;
  children?: ReactNode;
}

/**
 * Every homepage band is a Section: one consistent rhythm, one heading
 * pattern, one place to change spacing. `tone` swaps the background and,
 * for "inverse", remaps all colour tokens for the children.
 */
export function Section({
  id,
  title,
  tone = 'default',
  eyebrow,
  description,
  align = 'left',
  action,
  className,
  children,
}: SectionProps): React.JSX.Element {
  const headingId = `${id}-heading`;
  const centered = align === 'center';

  return (
    <section id={id} aria-labelledby={headingId} className={cn('scroll-mt-24 py-16 sm:py-20', tones[tone], className)}>
      <Container>
        <div
       className={cn('scroll-mt-32 border-t border-border py-16 sm:py-20', tones[tone], className)}
        >
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-ink">{eyebrow}</p>
            )}
            <h2 id={headingId} className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
              {title}
            </h2>
            {description && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
        {children}
      </Container>
    </section>
  );
}
