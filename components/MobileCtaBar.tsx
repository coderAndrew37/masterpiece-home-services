'use client';

import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { QuoteButton } from '@/components/forms/QuoteButton';
import { ButtonLink } from '@/components/ui/Button';
import { phoneNumber, phoneTel } from '@/lib/constants';

/**
 * Phones only. Appears after the hero scrolls away, and hides again near the
 * bottom of the page where the closing call to action already is.
 */
export function MobileCtaBar({ service }: { service: string }): React.JSX.Element | null {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = (): void => {
      const pastHero = window.scrollY > 480;
      const nearBottom = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 700;
      setVisible(pastHero && !nearBottom);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <ButtonLink href={phoneTel} variant="secondary" className="flex-1" aria-label={`Call ${phoneNumber}`}>
          <Phone aria-hidden className="size-4" />
          Call
        </ButtonLink>
        <QuoteButton service={service} className="flex-[2]">
          Get a free quote
        </QuoteButton>
      </div>
    </div>
  );
}