import Image from 'next/image';
import { Check, Phone } from 'lucide-react';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { phoneNumber, phoneTel } from '@/lib/constants';
import { heroChecks } from '@/lib/data/home';
import { site } from '@/lib/site';

/**
 * Server component. Only the quote form is a client island.
 * The image is a real <Image priority> (not a CSS background) so it can be
 * preloaded and optimised: it is the page's LCP element.
 */
export function Hero(): React.JSX.Element {
  return (
    <section id="home" aria-labelledby="hero-heading" className="tone-inverse relative isolate overflow-hidden">
      <Image src={site.images.hero} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />

      <Container className="grid gap-10 pb-16 pt-28 md:pb-24 md:pt-36 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-ink">
            Kamloops &amp; Thompson-Okanagan
          </p>
          <h1 id="hero-heading" className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Window, Gutter &amp; Exterior Cleaning in Kamloops, BC
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Streak-free windows, clear eavestroughs, soft-washed siding and Christmas lights, handled by a fully insured
            local crew. Get a free quote within one business day.
          </p>

          <ul className="mt-6 space-y-2.5">
            {heroChecks.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-medium sm:text-base">
                <Check aria-hidden className="size-5 shrink-0 text-brand-ink" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <ButtonLink href={phoneTel} variant="secondary" size="lg">
              <Phone aria-hidden className="size-4" />
              Call {phoneNumber}
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-5">
          <QuoteForm source="home-hero" />
        </div>
      </Container>
    </section>
  );
}
