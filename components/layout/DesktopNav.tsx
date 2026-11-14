'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { isActivePath } from '@/lib/nav';
import { site } from '@/lib/site';

export function DesktopNav(): React.JSX.Element {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
      {site.nav.map((link) => {
        const active = isActivePath(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
              active ? 'bg-brand-soft text-brand-ink' : 'text-muted hover:bg-surface-muted hover:text-foreground',
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}