import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { QuoteButton } from '@/components/forms/QuoteButton';
import { Breadcrumbs, type Crumb } from '@/components/ui/BreadCrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { phoneNumber, phoneTel } from '@/lib/constants';
import { site } from '@/lib/site';
import type { ServiceItem } from '@/types/service';

const facts = [
  { value: '$5M', label: 'Liability insurance' },
  { value: 'WorkSafeBC', label: 'Covered crew' },
  { value: '1 business day', label: 'Quote turnaround' },
  { value: 'Free', label: "Re-clean if it's not spotless" },
] as const;

export function ServicesHero({ services, crumbs }: { services: ServiceItem[]; crumbs: Crumb[] }): React.JSX.Element {
  return (
    <section aria-labelledby="services-heading" className="border-b border-border bg-surface-muted">
      <Container className="py-12 lg:py-20">
        <Breadcrumbs items={crumbs} />

        <h1
          id="services-heading"
          className="mt-5 max-w-3xl text-balance text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl"
        >
          Exterior cleaning services in Kamloops
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          Pure-water window cleaning, gutters, soft washing, pressure washing and holiday lights, from one insured local
          crew.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <QuoteButton size="lg">
            Get a free quote
            <ArrowRight aria-hidden className="size-4" />
          </QuoteButton>
          <ButtonLink href="#all-services" variant="secondary" size="lg">
            Browse services
          </ButtonLink>
          <a
            href={phoneTel}
            className="inline-flex items-center gap-2 px-2 text-sm font-bold underline-offset-4 hover:underline"
          >
            <Phone aria-hidden className="size-4 text-brand-ink" />
            {phoneNumber}
          </a>
        </div>

        {services.length > 0 && (
          <nav aria-label="Jump to a service" className="mt-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">Jump to a service</p>
            <ul className="flex flex-wrap gap-2.5">
              {services.map((service) => (
                <li key={service._id}>
                  <Link
                    href={`${site.routes.services}/${service.slug}`}
                    className="inline-flex rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold transition-colors hover:border-brand-ink hover:text-brand-ink"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
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