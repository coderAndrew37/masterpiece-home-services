import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'outline';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary: 'bg-brand text-brand-foreground hover:bg-brand-hover',
  secondary: 'border border-border bg-surface text-foreground hover:bg-surface-muted',
  outline: 'border-2 border-brand text-brand-ink hover:bg-brand-soft',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-3 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function buttonStyles({ variant = 'primary', size = 'md', className }: StyleProps = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

export type ButtonProps = StyleProps & Omit<ComponentPropsWithoutRef<'button'>, 'className'>;

export function Button({ variant, size, className, type = 'button', ...props }: ButtonProps): React.JSX.Element {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}

export type ButtonLinkProps = StyleProps & Omit<ComponentPropsWithoutRef<'a'>, 'className' | 'href'> & { href: string };

const EXTERNAL = /^(https?:|tel:|mailto:)/;

/** Internal paths use next/link; tel:, mailto: and http(s) use a plain anchor. */
export function ButtonLink({ variant, size, className, href, ...props }: ButtonLinkProps): React.JSX.Element {
  const classes = buttonStyles({ variant, size, className });

  if (EXTERNAL.test(href)) {
    return <a href={href} className={classes} {...props} />;
  }
  return <Link href={href} className={classes} {...props} />;
}


/** Round 40px icon button (theme toggle, call, menu, close). */
export const iconButtonClass =
  'grid size-10 shrink-0 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-surface-muted';