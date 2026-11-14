'use client';

import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Stateless on purpose: the icon swap is pure CSS (dark: variants), so there is
 * no hydration mismatch and no provider. The DOM class is the source of truth.
 */
export function ThemeToggle({ className }: { className?: string }): React.JSX.Element {
  const toggle = (): void => {
    const isDark = document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {
      // Storage can be blocked (private mode); the toggle still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={cn(
        'grid size-10 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-surface-muted',
        className,
      )}
    >
      <Sun className="size-5 dark:hidden" aria-hidden />
      <Moon className="hidden size-5 dark:block" aria-hidden />
    </button>
  );
}
