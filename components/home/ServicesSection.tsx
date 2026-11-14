import { ServiceCard } from '@/components/services/ServiceCard';
import { ButtonLink } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { site } from '@/lib/site';
import type { ServiceItem } from '@/types/service';

export function ServicesSection({ services }: { services: ServiceItem[] }): React.JSX.Element | null {
  if (services.length === 0) return null;

  return (
    <Section
      id="services"
      tone="muted"
      eyebrow="Our services"
      title="Exterior cleaning services in Kamloops"
      description="Windows, gutters, siding, driveways and holiday lights, all handled by one fully insured local crew."
      action={
        <ButtonLink href={site.routes.services} variant="outline">
          View all services
        </ButtonLink>
      }
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <li key={service._id} className="reveal">
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
