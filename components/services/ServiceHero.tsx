import { ArrowRight, Phone, ShieldCheck } from 'lucide-react';
import { QuoteButton } from '@/components/forms/QuoteButton';
import { Breadcrumbs, type Crumb } from '@/components/ui/BreadCrumbs';
import { ButtonLink } from '@/components/ui/Button';
import { CmsImage } from '@/components/ui/CmsImage';
import { Container } from '@/components/ui/Section';
import { phoneNumber, phoneTel } from '@/lib/constants';
import { imageUrl } from '@/lib/sanity/image';
import type { DetailedService } from '@/types/service';

interface ServiceHeroProps {
  service: DetailedService;
  crumbs: Crumb[];
}

export function ServiceHero({ service, crumbs }: ServiceHeroProps): React.JSX.Element {
  const image = service.heroImage ?? service.cardImage;
  const price = service.startingPrice?.replace(/^from\s+/i, '');

  const facts = [
    ...(price ? [{ value: price, label: 'Starting price (CAD)' }] : []),
    { value: '$5M', label: 'Liability insurance' },
    { value: '1 business day', label: 'Quote turnaround' },
    { value: 'Free', label: "Re-clean if it's not spotless" },
  ];

  return (
    <section aria-labelledby="service-heading" className="border-b border-border bg-surface-muted">
      <Container className="grid gap-10 py-12 lg:grid-cols-12 lg:items-center lg:gap-14 lg:py-20">
        <div className="lg:col-span-7">
          <Breadcrumbs items={crumbs} />

          {service.badge && (
            <span className="mt-5 inline-block rounded-full bg-brand px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-foreground">
              {service.badge}
            </span>
          )}

          <h1 id="service-heading" className="mt-4 text-balance text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {service.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{service.subtitle}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <QuoteButton service={service.title} size="lg">
              Get a free quote
              <ArrowRight aria-hidden className="size-4" />
            </QuoteButton>
            <ButtonLink href="#pricing" variant="secondary" size="lg">
              See pricing
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
              src={imageUrl(image, { width: 1200, height: 900 })}
              alt={image?.alt ?? `${service.title} in Kamloops`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <p className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-background/95 px-4 py-2 text-xs font-bold shadow-lg">
              <ShieldCheck aria-hidden className="size-4 text-brand-ink" />
              Fully insured &amp; WorkSafeBC covered
            </p>
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