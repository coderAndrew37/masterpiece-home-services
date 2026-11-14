import { QuoteButton } from '@/components/forms/QuoteButton';
import { FaqList } from '@/components/faq/FaqList';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import { phoneNumber, phoneTel } from '@/lib/constants';
import type { FaqItem } from '@/types/faq';

export function FaqSection({ faqs }: { faqs: FaqItem[] }): React.JSX.Element | null {
  if (faqs.length === 0) return null;

  return (
    <Section id="faq" eyebrow="FAQ" title="Questions Kamloops homeowners ask us">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-8">
          <FaqList items={faqs} />
        </div>

        <aside className="lg:sticky lg:top-24 lg:col-span-4">
          <Card className="p-6">
            <h3 className="text-lg font-extrabold">Still have a question?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Call or send a quick request. A real person from our Kamloops team will get back to you.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <QuoteButton className="w-full">Get a free quote</QuoteButton>
              <ButtonLink href={phoneTel} variant="outline" className="w-full">
                Call {phoneNumber}
              </ButtonLink>
            </div>
          </Card>
        </aside>
      </div>
    </Section>
  );
}
