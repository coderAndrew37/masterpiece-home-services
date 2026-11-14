import { Phone } from 'lucide-react';
import { QuoteButton } from '@/components/forms/QuoteButton';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { phoneNumber, phoneTel } from '@/lib/constants';

interface CtaSectionProps {
  title: string;
  description: string;
  id?: string;
  buttonLabel?: string;
  /** Pre-selects a service in the booking modal (used on service pages). */
  service?: string;
}

/** The closing call to action for any page: homepage, service pages, area pages. */
export function CtaSection({
  title,
  description,
  id = 'get-quote',
  buttonLabel = 'Request a free quote',
  service,
}: CtaSectionProps): React.JSX.Element {
  return (
    <Section id={id} tone="inverse" align="center" title={title} description={description}>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <QuoteButton size="lg" service={service}>
          {buttonLabel}
        </QuoteButton>
        <ButtonLink href={phoneTel} variant="secondary" size="lg">
          <Phone aria-hidden className="size-4" />
          {phoneNumber}
        </ButtonLink>
      </div>
    </Section>
  );
}