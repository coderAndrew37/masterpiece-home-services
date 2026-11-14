import { Award, ClipboardCheck } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { ChecklistCard } from './ChecklistCard';

interface ServiceIncludedProps {
  included?: string[];
  benefits?: string[];
}

export function ServiceIncluded({ included = [], benefits = [] }: ServiceIncludedProps): React.JSX.Element | null {
  if (included.length === 0 && benefits.length === 0) return null;
  const both = included.length > 0 && benefits.length > 0;

  return (
    <Section
      id="included"
      tone="muted"
      eyebrow="Scope"
      title="What's included, and why it matters"
      description="No vague packages: here is exactly what you get."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        {included.length > 0 && (
          <div className={both ? 'lg:col-span-3' : 'lg:col-span-5'}>
            <ChecklistCard
              title="What's included"
              icon={ClipboardCheck}
              items={included}
            />
          </div>
        )}
        {benefits.length > 0 && (
          <div className={both ? 'lg:col-span-2' : 'lg:col-span-5'}>
            <ChecklistCard
              title="Key benefits"
              icon={Award}
              items={benefits}
            />
          </div>
        )}
      </div>
    </Section>
  );
}