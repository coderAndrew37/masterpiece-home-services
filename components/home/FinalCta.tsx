import { Phone } from 'lucide-react';
import { QuoteButton } from '@/components/forms/QuoteButton';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { phoneNumber, phoneTel } from '@/lib/constants';

/**
 * One closing call to action. Replaces LeadCapture, CtaBanner and Contact,
 * three stacked sections that all asked for the same thing. (The old
 * "10% off voucher" form also only pretended to send an email.)
 */
export function FinalCta(): React.JSX.Element {
  return (
    <Section
      id="get-quote"
      tone="inverse"
      align="center"
      title="Get a free quote for your Kamloops home"
      description="Tell us what you need and we'll confirm a price within one business day. Prefer to talk? Give us a call."
    >
      <div className="flex flex-wrap items-center justify-center gap-3">
        <QuoteButton size="lg">Request a free quote</QuoteButton>
        <ButtonLink href={phoneTel} variant="secondary" size="lg">
          <Phone aria-hidden className="size-4" />
          {phoneNumber}
        </ButtonLink>
      </div>
    </Section>
  );
}
