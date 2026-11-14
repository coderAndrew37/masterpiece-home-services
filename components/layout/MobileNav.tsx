'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, MapPin, Menu, Phone, X } from 'lucide-react';
import { Button, ButtonLink, iconButtonClass } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useQuote } from '@/hooks/useQuote';
import { phoneNumber, phoneTel } from '@/lib/constants';
import { cn } from '@/lib/cn';
import { isActivePath } from '@/lib/nav';
import { site } from '@/lib/site';
import { Brand } from './Brand';

/** Slide-in menu on native <dialog>: focus trap, Esc to close, backdrop, no animation library. */
export function MobileNav(): React.JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const { open: openQuote } = useQuote();

  const close = (): void => dialogRef.current?.close();

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label="Open menu"
        className={cn(iconButtonClass, 'lg:hidden')}
      >
        <Menu aria-hidden className="size-5" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="drawer m-0 ml-auto h-dvh max-h-dvh w-[min(85vw,24rem)] max-w-none border-l border-border bg-background p-0 text-foreground backdrop:bg-black/60 backdrop:backdrop-blur-sm lg:hidden"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border p-5">
            <Brand onClick={close} />
            <button type="button" onClick={close} aria-label="Close menu" className={iconButtonClass}>
              <X aria-hidden className="size-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {site.nav.map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between rounded-xl px-4 py-3.5 font-bold transition-colors',
                        active ? 'bg-brand-soft text-brand-ink' : 'hover:bg-surface-muted',
                      )}
                    >
                      {link.name}
                      <ChevronRight aria-hidden className="size-4 text-muted" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-border bg-surface-muted p-5">
            <p className="flex items-center gap-2 rounded-lg bg-brand-soft px-3 py-2 text-xs font-semibold text-brand-ink">
              <MapPin aria-hidden className="size-4 shrink-0" />
              Serving {site.city} &amp; the Thompson-Okanagan
            </p>

            {/* Close first, or the quote modal opens underneath this dialog. */}
            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                close();
                openQuote();
              }}
            >
              Get a free quote
            </Button>
            <ButtonLink href={phoneTel} variant="secondary" size="lg" className="w-full" onClick={close}>
              <Phone aria-hidden className="size-4" />
              Call {phoneNumber}
            </ButtonLink>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm font-semibold text-muted">Appearance</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}