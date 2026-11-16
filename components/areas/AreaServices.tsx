import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { QuoteButton } from '@/components/forms/QuoteButton';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { getServiceIcon } from '@/lib/ServiceIcons';
import { site } from '@/lib/site';
import type { AreaServiceLink } from '@/types/serviceArea';

interface AreaServicesProps {
  areaName: string;
  items: AreaServiceLink[];
}

export function AreaServices({ areaName, items }: AreaServicesProps): React.JSX.Element | null {
  if (items.length === 0) return null;

  return (
    <Section
      id="services"
      eyebrow="Services"
      title={`What we do in ${areaName}`}
      description="Same insured crew and written quotes as everywhere else we work."
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {items.map(({ blurb, service }) => (
          <li key={service.slug} className="reveal">
            <Card className="flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-soft">
                  {getServiceIcon(service.icon, 'size-5 text-brand-ink')}
                </span>
                <div>
                  <h3 className="text-xl font-extrabold">
                    {service.title} in {areaName}
                  </h3>
                  {service.startingPrice && (
                    <p className="mt-0.5 text-sm font-semibold text-muted">
                      Starting at{' '}
                      <span className="font-black text-foreground">{service.startingPrice.replace(/^from\s+/i, '')}</span>
                    </p>
                  )}
                </div>
              </div>

              {blurb && <p className="mt-4 flex-1 leading-relaxed text-muted">{blurb}</p>}

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-5">
                <QuoteButton service={service.title}>Get a quote</QuoteButton>
                <Link
                  href={`${site.routes.services}/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-ink underline-offset-4 hover:underline"
                >
                  About this service
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}