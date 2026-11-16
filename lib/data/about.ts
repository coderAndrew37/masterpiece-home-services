import { BadgeCheck, CalendarCheck, FileText, MapPin, Sprout, type LucideIcon } from 'lucide-react';

export interface AboutFact {
  label: string;
  value: string;
}

export interface AboutValue {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  /** Path under /public, e.g. "/images/team/founder.jpg". Initials show if omitted. */
  image?: string;
}

export const aboutStory: string[] = [
  'Masterpiece Home Services started in 2025, right here in Kamloops, BC. It began small, and it’s still small today: our founder and one dedicated technician handle every job personally. When the schedule fills up, we bring in trusted local partners so turnaround stays fast without cutting corners.',
  'We officially registered the business in August 2026 as we began building toward something bigger. As we grow, we plan to hire more Kamloops-based technicians and widen what we offer, but the goal that started this business hasn’t changed: careful, honest work on every property we touch.',
];

export const aboutFacts: AboutFact[] = [
  { label: 'Founded', value: '2025' },
  { label: 'Officially registered', value: 'August 2026' },
  { label: 'Based in', value: 'Kamloops, BC' },
  { label: 'How we work', value: 'Owner-operated, with trusted local partners' },
];

export const aboutValues: AboutValue[] = [
  {
    title: 'Careful work',
    description: 'Every property gets the same close attention, whether it’s a single window or a full property service.',
    icon: BadgeCheck,
  },
  {
    title: 'Honest pricing',
    description: 'Clear written quotes with no hidden fees. What we quote is what you pay.',
    icon: FileText,
  },
  {
    title: 'Reliability',
    description: 'We show up when we say we will, and we stand behind the work we do.',
    icon: CalendarCheck,
  },
  {
    title: 'Local roots',
    description: 'Based in Kamloops and serving Kamloops. We know the neighbourhoods we work in.',
    icon: MapPin,
  },
  {
    title: 'Room to grow',
    description: 'We’re a small, growing business, building relationships with customers who’ll grow with us.',
    icon: Sprout,
  },
];

/**
 * Add the founder here. The team section stays hidden while this list is empty,
 * so a placeholder name can never go live. Example:
 *
 * { name: 'Jane Doe', role: 'Founder', bio: '...', image: '/images/team/jane.jpg' }
 */
export const team: TeamMember[] = [];