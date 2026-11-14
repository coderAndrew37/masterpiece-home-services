import { BadgeCheck, HardHat, ShieldCheck, Users, type LucideIcon } from 'lucide-react';

/**
 * Homepage copy that isn't CMS-driven. Keeping it here (not inside JSX)
 * means copy edits never touch layout code.
 */

export interface TrustPoint {
  icon: LucideIcon;
  title: string;
  detail: string;
}

/** Only claims the business can back up. Add counts or ratings here once they're verifiable. */
export const trustPoints: TrustPoint[] = [
  { icon: ShieldCheck, title: '$5M liability insurance', detail: 'Your home and property are covered' },
  { icon: HardHat, title: 'WorkSafeBC covered', detail: 'Safe, professional work at height' },
  { icon: BadgeCheck, title: 'Satisfaction guarantee', detail: "Not spotless? We'll re-clean it free" },
  { icon: Users, title: 'Local, vetted crew', detail: 'Trained and background-checked' },
];

export const heroChecks = [
  'Fully insured ($5M) and WorkSafeBC covered',
  'Free, no-obligation quotes',
  "Satisfaction guaranteed, or we'll re-clean it free",
] as const;

export interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Request a quote',
    description: 'Tell us what you need by form or phone. We confirm your price before we book anything.',
  },
  {
    title: 'Pick a date',
    description: 'Choose a day that suits you. We send a reminder before the crew arrives.',
  },
  {
    title: 'We do the work',
    description: 'A background-checked, fully insured crew handles your windows, eavestroughs, siding or lights.',
  },
  {
    title: 'Final walk-through',
    description: "We check the finished job with you, and re-clean anything that isn't right.",
  },
];
