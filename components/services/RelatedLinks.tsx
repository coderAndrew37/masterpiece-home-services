import type { ServiceArea } from '@/components/home/AreasSection';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Section } from '@/components/ui/Section';
import type { ServiceItem } from '@/types/service';
import { AreaPills } from './AreaPills';

export function RelatedLinks({
  services,
  areas,
}: {
  services: ServiceItem[];
  areas: ServiceArea[];
}): React.JSX.Element | null {
  if (services.length === 0 && areas.length === 0) return null;

  return (
    <Section id="more" tone="muted" eyebrow="Keep exploring" title="More ways we can help">
      {services.length > 0 && (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service._id}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      )}

      {areas.length > 0 && (
        <div className="mt-12">
          <h3 className="mb-4 text-lg font-bold">Also serving</h3>
          <AreaPills areas={areas} />
        </div>
      )}
    </Section>
  );
}