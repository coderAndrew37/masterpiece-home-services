import { BadgeCheck, CalendarCheck, FileText, HardHat, MapPin, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';

const promises = [
  { icon: ShieldCheck, title: '$5M liability insurance', text: 'Every job is covered from start to finish.' },
  { icon: HardHat, title: 'WorkSafeBC covered crew', text: 'Trained, insured and background-checked.' },
  { icon: BadgeCheck, title: 'Free re-clean guarantee', text: "If it's not spotless, we come back and fix it." },
  { icon: FileText, title: 'Written quotes', text: 'Your exact price in writing before we book. No hidden fees.' },
  { icon: MapPin, title: 'Local to Kamloops', text: 'We know the pollen, dust and winter road grit your home deals with.' },
  { icon: CalendarCheck, title: 'Year-round care', text: 'Windows in spring, gutters in fall, lights in winter.' },
] as const;

export function ServicePromises(): React.JSX.Element {
  return (
    <Section
      id="why-us"
      eyebrow="Why Masterpiece"
      title="Why Kamloops homeowners choose us"
      description="The same standards on every job, whatever service you book."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {promises.map(({ icon: Icon, title, text }) => (
          <li key={title} className="reveal">
            <Card className="h-full p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-soft">
                <Icon aria-hidden className="size-5 text-brand-ink" />
              </span>
              <h3 className="mt-4 font-extrabold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}