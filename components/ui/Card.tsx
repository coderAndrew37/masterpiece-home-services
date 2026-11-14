import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  /** Adds a hover lift. Use when the whole card is a link. */
  interactive?: boolean;
}

export function Card({ interactive = false, className, ...props }: CardProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'relative rounded-2xl border border-border bg-surface shadow-sm',
        interactive &&
          'transition duration-300 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        className,
      )}
      {...props}
    />
  );
}
