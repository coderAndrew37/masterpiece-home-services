import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Section } from '@/components/ui/Section';
import type { TeamMember } from '@/lib/data/about';

const initials = (name: string): string =>
  name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();

export function TeamSection({ members }: { members: TeamMember[] }): React.JSX.Element | null {
  if (members.length === 0) return null;

  return (
    <Section
      id="team"
      eyebrow="The team"
      title="Who you’ll work with"
      description="You’ll deal with the same small crew from first quote to final walk-through."
    >
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <li key={member.name}>
            <Card className="flex h-full flex-col items-center p-6 text-center sm:p-8">
              {member.image ? (
                <span className="relative size-28 overflow-hidden rounded-full border border-border bg-surface-muted">
                  <Image src={member.image} alt={member.name} fill sizes="112px" className="object-cover" />
                </span>
              ) : (
                <span
                  aria-hidden
                  className="grid size-28 place-items-center rounded-full bg-brand-soft text-3xl font-black text-brand-ink"
                >
                  {initials(member.name)}
                </span>
              )}
              <h3 className="mt-5 text-lg font-extrabold">{member.name}</h3>
              <p className="text-sm font-semibold text-brand-ink">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}