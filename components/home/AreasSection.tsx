import { Phone } from 'lucide-react';
import { QuoteButton } from '@/components/forms/QuoteButton';
import { AreaPills } from '@/components/services/AreaPills';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { phoneNumber, phoneTel } from '@/lib/constants';

export interface ServiceArea {
  _id: string;
  name: string;
  slug: string;
}

export function AreasSection({ areas }: { areas: ServiceArea[] }): React.JSX.Element {
  return (
    <Section
      id="areas"
      tone="inverse"
      eyebrow="Service area"
      title="Serving Kamloops and the Thompson-Okanagan"
      description="We work across Kamloops neighbourhoods, plus Sun Peaks and nearby Thompson-Okanagan communities. Tap your area for local details."
    >
      {areas.length > 0 && <AreaPills areas={areas} />}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <QuoteButton size="lg">Get a free quote</QuoteButton>
        <ButtonLink href={phoneTel} variant="secondary" size="lg">
          <Phone aria-hidden className="size-4" />
          {phoneNumber}
        </ButtonLink>
      </div>
    </Section>
  );
}