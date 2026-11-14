import { Section } from '@/components/ui/Section';
import { processSteps } from '@/lib/data/home';

export function HowItWorks(): React.JSX.Element {
  return (
    <Section
      id="process"
      eyebrow="How it works"
      title="From quote to spotless in four steps"
      description="No chasing, no guesswork. You know the price and the date before we arrive."
    >
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => (
          <li key={step.title} className="reveal">
            <span
              aria-hidden
              className="grid size-11 place-items-center rounded-full bg-brand text-lg font-extrabold text-brand-foreground"
            >
              {index + 1}
            </span>
            <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
