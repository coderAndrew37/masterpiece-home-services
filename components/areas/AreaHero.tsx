import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { QuoteButton } from '@/components/forms/QuoteButton';
import { Breadcrumbs, type Crumb } from '@/components/ui/BreadCrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { CmsImage } from '@/components/ui/CmsImage';
import { Container } from '@/components/ui/Section';
import { phoneNumber, phoneTel } from '@/lib/constants';
import { imageUrl } from '@/lib/sanity/image';
import { site } from '@/lib/site';
import type { ServiceAreaDetail } from '@/types/serviceArea';

const facts = [
  { value: '$5M', label: 'Liability insurance' },
  { value: 'WorkSafeBC', label: 'Covered crew' },
  { value: '1 business day', label: 'Quote turnaround' },
  { value: 'Free', label: "Re-clean if it's not spotless" },
] as const;

export function AreaHero({ area, crumbs }: { area: ServiceAreaDetail; crumbs: Crumb[] }): React.JSX.Element {
  return (
    <section aria-labelledby="area-heading" className="border-b border-border bg-surface-muted">
      <Container className="grid gap-10 py-12 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-20">
        <div className="lg:col-span-7">
          <Breadcrumbs items={crumbs} />

          <p className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-ink">
            <MapPin aria-hidden className="size-3.5" />
            {area.region ?? site.city}
          </p>

          <h1 id="area-heading" className="mt-4 text-balance text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Home services in {area.name}, {site.city}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{area.intro}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <QuoteButton size="lg">
              Get a free quote
              <ArrowRight aria-hidden className="size-4" />
            </QuoteButton>
            <ButtonLink href="#services" variant="secondary" size="lg">
              See services
            </ButtonLink>
            <a
              href={phoneTel}
              className="inline-flex items-center gap-2 px-2 text-sm font-bold underline-offset-4 hover:underline"
            >
              <Phone aria-hidden className="size-4 text-brand-ink" />
              {phoneNumber}
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-surface shadow-xl">
            <CmsImage
              src={imageUrl(area.heroImage, { width: 1200, height: 900 })}
              alt={area.heroImage?.alt ?? `${area.name}, ${site.city}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>

      <Container className="pb-10">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {facts.map((fact) => (
            <li key={fact.label} className="rounded-xl border border-border bg-surface p-4">
              <p className="text-xl font-extrabold leading-tight">{fact.value}</p>
              <p className="mt-0.5 text-xs font-medium text-muted">{fact.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}