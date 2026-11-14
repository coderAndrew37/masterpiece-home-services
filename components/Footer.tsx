import Link from 'next/link';
import type { IconType } from 'react-icons';
import { FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import type { ServiceArea } from '@/components/home/AreasSection';
import { Container } from '@/components/ui/Section';
import { contactEmail, phoneNumber, phoneTel } from '@/lib/constants';
import { allServicesQuery, serviceAreasQuery } from '@/lib/sanity/queries';
import { safeFetch } from '@/lib/sanity/safeFetch';
import { site } from '@/lib/site';
import type { ServiceItem } from '@/types/service';
import { Brand } from './layout/Brand';

interface FooterLink {
  name: string;
  href: string;
}

const legalLinks: FooterLink[] = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
  { name: 'Sitemap', href: '/sitemap' },
];

const socialNetworks: { match: string; label: string; icon: IconType }[] = [
  { match: 'facebook.', label: 'Facebook', icon: FiFacebook },
  { match: 'instagram.', label: 'Instagram', icon: FiInstagram },
  { match: 'linkedin.', label: 'LinkedIn', icon: FiLinkedin },
];

const linkClass = 'text-sm text-muted transition-colors hover:text-foreground';

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }): React.JSX.Element | null {
  if (links.length === 0) return null;

  return (
    <nav aria-label={title}>
      <h3 className="mb-4 text-xs font-extrabold uppercase tracking-widest">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClass}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SocialLinks(): React.JSX.Element | null {
  const links = site.socialLinks.flatMap((url) => {
    const network = socialNetworks.find((item) => url.includes(item.match));
    return network ? [{ url, ...network }] : [];
  });
  if (links.length === 0) return null;

  return (
    <ul className="flex gap-2.5">
      {links.map(({ url, label, icon: Icon }) => (
        <li key={url}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="grid size-10 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
          >
            <Icon aria-hidden className="size-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Server component: links come from the CMS, so they can't drift from the pages that exist. */
export async function Footer(): Promise<React.JSX.Element> {
  const [services, areas] = await Promise.all([
    safeFetch<ServiceItem[]>(allServicesQuery, []),
    safeFetch<ServiceArea[]>(serviceAreasQuery, []),
  ]);

  const serviceLinks: FooterLink[] = [
    ...services.map((service) => ({ name: service.title, href: `${site.routes.services}/${service.slug}` })),
    { name: 'All services', href: site.routes.services },
  ];

  const companyLinks: FooterLink[] = [
    ...site.nav.filter((link) => link.href !== '/' && link.href !== site.routes.services),
    { name: 'Blog', href: '/blog' },
  ];

  const areaLinks: FooterLink[] = [
    ...areas.slice(0, 6).map((area) => ({ name: area.name, href: `${site.routes.serviceAreas}/${area.slug}` })),
    { name: 'All service areas', href: site.routes.serviceAreas },
  ];

  return (
    <footer className="border-t border-border bg-surface-muted">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Brand />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Window cleaning, gutters, soft washing, pressure washing and holiday lights for homes across {site.city}{' '}
              and the Thompson-Okanagan.
            </p>

            <address className="mt-6 space-y-3 text-sm not-italic">
              <p className="flex items-center gap-2.5">
                <MapPin aria-hidden className="size-4 shrink-0 text-brand-ink" />
                <span className="text-muted">
                  {site.city} &amp; the Thompson-Okanagan, {site.address.region}
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone aria-hidden className="size-4 shrink-0 text-brand-ink" />
                <a href={phoneTel} className="font-bold transition-colors hover:text-brand-ink">
                  {phoneNumber}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail aria-hidden className="size-4 shrink-0 text-brand-ink" />
                <a href={`mailto:${contactEmail}`} className="font-medium transition-colors hover:text-brand-ink">
                  {contactEmail}
                </a>
              </p>
            </address>

            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <FooterColumn title="Services" links={serviceLinks} />
            <FooterColumn title="Company" links={companyLinks} />
            <FooterColumn title="Serving" links={areaLinks} />
          </div>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 font-semibold">
            <ShieldCheck aria-hidden className="size-4 text-brand-ink" />
            Fully insured &amp; WorkSafeBC covered
          </p>

          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-foreground">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}