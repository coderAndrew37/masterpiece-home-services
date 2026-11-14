import { Phone } from 'lucide-react';
import { QuoteButton } from '@/components/forms/QuoteButton';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { iconButtonClass } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { phoneNumber, phoneTel } from '@/lib/constants';
import { Brand } from './Brand';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

/** Server component, always solid and sticky: readable on every page in both themes. */
export function Header(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Brand />
        <DesktopNav />

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={phoneTel}
            className="hidden items-center gap-2 text-sm font-extrabold transition-colors hover:text-brand-ink xl:flex"
          >
            <Phone aria-hidden className="size-4" />
            {phoneNumber}
          </a>
          <ThemeToggle />
          <QuoteButton>Get a free quote</QuoteButton>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a href={phoneTel} aria-label={`Call ${phoneNumber}`} className={iconButtonClass}>
            <Phone aria-hidden className="size-5" />
          </a>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}