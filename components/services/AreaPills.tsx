// src/components/services/AreaPills.tsx
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import type { ServiceArea } from '@/components/home/AreasSection';
import { site } from '@/lib/site';

const pill =
  'inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold transition-colors hover:border-brand-ink hover:text-brand-ink';

export function AreaPills({ areas }: { areas: ServiceArea[] }): React.JSX.Element {
  return (
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
  );
}