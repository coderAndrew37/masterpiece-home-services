import { PortableText } from '@portabletext/react';
import { QuoteButton } from '@/components/forms/QuoteButton';
import { portableTextComponents } from '@/components/blog/PortableTextComponents';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { capitalize, type ServiceCopy } from '@/lib/data/serviceCopy';
import type { DetailedService } from '@/types/service';

export function ServiceOverview({
  service,
  copy,
}: {
  service: DetailedService;
  copy: ServiceCopy;
}): React.JSX.Element | null {
  if (!service.description?.length) return null;

  return (
    <Section
      id="overview"
      eyebrow="Overview"
      title={`${capitalize(copy.keyword)}: what to expect`}
      description="What the service involves, why Kamloops conditions matter, and how pricing works."
    >
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          <PortableText value={service.description} components={portableTextComponents} />
        </div>

        <aside className="lg:col-span-4">
          <Card className="p-6 lg:sticky lg:top-40">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-ink">Pro tip</p>
            <p className="mt-2 leading-relaxed">{copy.proTip}</p>
            <div className="mt-5 border-t border-border pt-5">
              <QuoteButton service={service.title} className="w-full">
                Get a free quote
              </QuoteButton>
            </div>
          </Card>
        </aside>
      </div>
    </Section>
  );
}