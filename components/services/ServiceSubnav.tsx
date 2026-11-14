'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Section';
import { cn } from '@/lib/cn';

export interface SubNavItem {
  id: string;
  label: string;
}

/** Sticky "on this page" tabs. Client-only because it tracks scroll position. */
export function ServiceSubNav({ items }: { items: SubNavItem[] }): React.JSX.Element | null {
  const [active, setActive] = useState(items[0]?.id ?? '');
  const key = items.map((item) => item.id).join(',');

  useEffect(() => {
    const sections = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  if (items.length < 2) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur-md lg:top-20"
    >
      <Container>
        <ul className="-mb-px flex gap-1 overflow-x-auto">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'location' : undefined}
                className={cn(
                  'block whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors',
                  active === item.id
                    ? 'border-brand text-brand-ink'
                    : 'border-transparent text-muted hover:text-foreground',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}