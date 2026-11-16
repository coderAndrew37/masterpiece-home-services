import type { ReactNode } from 'react';
import { Clock, Mail, MapPin, Phone, ShieldCheck, type LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { contactEmail, phoneNumber, phoneTel } from '@/lib/constants';
import { hoursLines } from '@/lib/hours';
import { site } from '@/lib/site';

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}): React.JSX.Element {
  return (
    <div className="flex gap-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft">
        <Icon aria-hidden className="size-5 text-brand-ink" />
      </span>
      <div>
        <dt className="text-xs font-bold uppercase tracking-wider text-muted">{label}</dt>
        <dd className="mt-1 text-sm font-medium">{children}</dd>
      </div>
    </div>
  );
}

export function ContactDetails(): React.JSX.Element {
  const hours = hoursLines(site.hours);

  return (
    <div className="space-y-6">
      <div className="tone-inverse rounded-2xl p-6 shadow-lg sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-ink">Prefer to talk?</p>
        <a
          href={phoneTel}
          className="mt-2 flex items-center gap-3 text-3xl font-black tabular-nums transition-colors hover:text-brand-ink"
        >
          <Phone aria-hidden className="size-6 text-brand-ink" />
          {phoneNumber}
        </a>
        <p className="mt-3 text-sm text-muted">Need it sooner? Call us and we’ll do our best to fit you in.</p>
      </div>

      <Card className="p-6 sm:p-8">
        <dl className="space-y-6">
          <Detail icon={Mail} label="Email">
            <a href={`mailto:${contactEmail}`} className="break-all transition-colors hover:text-brand-ink">
              {contactEmail}
            </a>
          </Detail>

          <Detail icon={MapPin} label="Service area">
            {site.city} &amp; the Thompson-Okanagan, {site.address.region}
          </Detail>

          <Detail icon={Clock} label="Hours">
            <ul className="space-y-1">
              {hours.map((line) => (
                <li key={line.label} className="flex justify-between gap-6">
                  <span className="text-muted">{line.label}</span>
                  <span className="tabular-nums">{line.value}</span>
                </li>
              ))}
            </ul>
          </Detail>
        </dl>
      </Card>

      <p className="flex items-center gap-2 text-sm font-semibold text-muted">
        <ShieldCheck aria-hidden className="size-4 shrink-0 text-brand-ink" />
        Fully insured ($5M) &amp; WorkSafeBC covered
      </p>
    </div>
  );
}