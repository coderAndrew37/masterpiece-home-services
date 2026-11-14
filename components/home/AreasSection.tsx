import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { QuoteButton } from '@/components/forms/QuoteButton';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { phoneNumber, phoneTel } from '@/lib/constants';
import { site } from '@/lib/site';

export interface ServiceArea {
  _id: string;
  name: string;
  slug: string;
}

const pill =
  'inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold transition-colors hover:border-brand-ink hover:text-brand-ink';

export function AreasSection({ areas }: { areas: ServiceArea[] }): React.JSX.Element {
  return (
    <Section
      id="areas"
      tone="inverse"
      eyebrow="Service area"
      title="Serving Kamloops and the Thompson-Okanagan"
      description="We work across Kamloops neighbourhoods, plus Sun Peaks and nearby Thompson-Okanagan communities. Tap your area for local details."
    >
      {areas.length > 0 && (
        <ul className="flex flex-wrap gap-2.5">
          {areas.map((area) => (
            <li key={area._id || area.slug}>
              <Link href={`${site.routes.serviceAreas}/${area.slug}`} className={pill}>
                <MapPin aria-hidden className="size-3.5 text-brand-ink" />
                {area.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href={site.routes.serviceAreas} className={pill}>
              View all areas
            </Link>
          </li>
        </ul>
      )}

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
