import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import type { AboutFact } from '@/lib/data/about';

interface AboutStoryProps {
  paragraphs: string[];
  facts: AboutFact[];
}

export function AboutStory({ paragraphs, facts }: AboutStoryProps): React.JSX.Element {
  return (
    <Section id="story" eyebrow="Our story" title="A small crew, built in Kamloops">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="space-y-5 text-[17px] leading-[1.8] lg:col-span-7">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <aside aria-label="At a glance" className="lg:col-span-5">
          <Card className="p-6 sm:p-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-ink">At a glance</h3>
            <dl className="mt-5 divide-y divide-border">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0 sm:flex-row sm:justify-between sm:gap-6">
                  <dt className="text-sm text-muted">{fact.label}</dt>
                  <dd className="text-sm font-bold sm:text-right">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </aside>
      </div>
    </Section>
  );
}