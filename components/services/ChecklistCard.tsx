import { Check, type LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface ChecklistCardProps {
  title: string;
  icon: LucideIcon;
  items: string[];
}

export function ChecklistCard({ title, icon: Icon, items }: ChecklistCardProps): React.JSX.Element {
  return (
    <Card className="p-6 sm:p-8">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold">
        <Icon aria-hidden className="size-5 text-brand-ink" />
        {title}
      </h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm font-medium">
            <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-ink" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}