import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { CmsImage } from '@/components/ui/CmsImage';
import { getServiceIcon } from '@/lib/ServiceIcons';
import { imageUrl } from '@/lib/sanity/image';
import { site } from '@/lib/site';
import type { ServiceItem } from '@/types/service';

/**
 * Reusable on the homepage, /services and service-area pages.
 * The card links to the service's own page (/services/[slug]) rather than a
 * #hash, because separate URLs are what rank for separate searches.
 */
export function ServiceCard({ service }: { service: ServiceItem }): React.JSX.Element {
  const href = `${site.routes.services}/${service.slug}`;
  const blurb = service.homeSubtitle ?? service.shortDescription;

  return (
    <Card interactive className="group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
        <CmsImage
          src={imageUrl(service.cardImage, { width: 800, height: 600 })}
          alt={service.cardImage?.alt ?? service.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
        <span className="absolute left-3 top-3 grid size-10 place-items-center rounded-full bg-background/95 shadow">
          {getServiceIcon(service.icon, 'size-5 text-brand-ink')}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold">
          {/* Stretched link: the whole card is clickable, one link for screen readers. */}
          <Link href={href} className="after:absolute after:inset-0">
            {service.title}
          </Link>
        </h3>
        {blurb && <p className="mt-1 text-sm leading-relaxed text-muted">{blurb}</p>}

        <div className="mt-auto flex items-center justify-between pt-4 text-sm">
          {service.startingPrice ? (
            <span className="text-muted">
              Starting at <strong className="text-foreground">{service.startingPrice}</strong>
            </span>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-1 font-semibold text-brand-ink">
            Details
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
          </span>
        </div>
      </div>
    </Card>
  );
}
