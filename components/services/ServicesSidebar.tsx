import { BadgeCheck, Clock, HardHat, Phone, ShieldCheck } from 'lucide-react';
import { QuoteButton } from '@/components/forms/QuoteButton';
import { Card } from '@/components/ui/Card';
import { phoneNumber, phoneTel } from '@/lib/constants';

const assurances = [
  { icon: ShieldCheck, text: '$5M liability insurance' },
  { icon: HardHat, text: 'WorkSafeBC covered crew' },
  { icon: BadgeCheck, text: "Free re-clean if it's not spotless" },
  { icon: Clock, text: 'Quote within one business day' },
] as const;

export function ServiceSidebar({ title }: { title: string }): React.JSX.Element {
  return (
    <Card className="tone-inverse sticky top-28 p-6 shadow-xl sm:p-8">
      <p className="text-xs font-bold uppercase tracking-widest text-brand-ink">Fast &amp; simple</p>
      <h2 className="mt-1 text-2xl font-black">Book this service</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Get {title.toLowerCase()} from an insured, local Kamloops crew.
      </p>

      <ul className="my-6 space-y-3 border-y border-border py-6">
        {assurances.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 text-sm font-medium">
            <Icon aria-hidden className="size-4 shrink-0 text-brand-ink" />
            {text}
          </li>
        ))}
      </ul>

      <QuoteButton service={title} size="lg" className="w-full">
        Request a quote
      </QuoteButton>

      <div className="mt-5 text-center">
        <p className="mb-1 text-xs text-muted">Or call us directly</p>
        <a
          href={phoneTel}
          className="inline-flex items-center gap-2 text-lg font-black transition-colors hover:text-brand-ink"
        >
          <Phone aria-hidden className="size-4 text-brand-ink" />
          {phoneNumber}
        </a>
      </div>
    </Card>
  );
}