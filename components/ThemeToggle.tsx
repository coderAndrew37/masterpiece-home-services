'use client';

import { Moon, Sun } from 'lucide-react';
import { iconButtonClass } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { useTheme } from './theme/ThemeProvider';

export function ThemeToggle({ className }: { className?: string }): React.JSX.Element {
  const { toggleTheme } = useTheme();
  return (
    <button type="button" onClick={toggleTheme} aria-label="Toggle dark mode" className={cn(iconButtonClass, className)}>
      <Sun className="size-5 dark:hidden" aria-hidden />
      <Moon className="hidden size-5 dark:block" aria-hidden />
    </button>
  );
}