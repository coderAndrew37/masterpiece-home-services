import { QuoteButton } from '@/components/forms/QuoteButton';
import { FaqList } from '@/components/faq/FaqList';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import type { ServiceCopy } from '@/lib/data/serviceCopy';
import type { DetailedService } from '@/types/service';

const COST_QUESTION = /\b(cost|price|pricing|much)\b/i;

export function ServiceFaq({ service, copy }: { service: DetailedService; copy: ServiceCopy }): React.JSX.Element | null {
  const faqs = service.faqs ?? [];
  if (faqs.length === 0) return null;

  const costFaq = faqs.find((faq) => COST_QUESTION.test(faq.question));
  const price = service.startingPrice?.replace(/^from\s+/i, '');

  return (
    <Section id="faq" eyebrow="FAQ" title={`Questions about ${copy.keyword}`}>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <FaqList items={faqs} />
        </div>

        <aside className="lg:sticky lg:top-40 lg:col-span-5">
          <Card className="p-6 ring-1 ring-brand/30 sm:p-8">
            <h3 className="text-lg font-extrabold">{costFaq?.question ?? `How much does ${copy.keyword} cost?`}</h3>
            {price && (
              <p className="mt-2 text-sm text-muted">
                Starting at <strong className="text-xl font-black text-foreground">{price}</strong> CAD
              </p>
            )}
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {costFaq?.answer ??
                'Every property is different, so we confirm your exact price in writing before we book. No surprises on the day.'}
            </p>
            <QuoteButton service={service.title} className="mt-5 w-full">
              Get my exact price
            </QuoteButton>
          </Card>
        </aside>
      </div>
    </Section>
  );
}