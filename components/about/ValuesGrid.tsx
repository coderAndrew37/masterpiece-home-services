import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import type { AboutValue } from '@/lib/data/about';

export function ValuesGrid({ values }: { values: AboutValue[] }): React.JSX.Element | null {
  if (values.length === 0) return null;

  return (
    <Section
      id="values"
      tone="muted"
      eyebrow="What we care about"
      title="How we work"
      description="The same standards on every job, big or small."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {values.map(({ title, description, icon: Icon }) => (
          <li key={title} className="reveal">
            <Card className="h-full p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-soft">
                <Icon aria-hidden className="size-5 text-brand-ink" />
              </span>
              <h3 className="mt-4 font-extrabold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}