import type { Metadata } from 'next';
import { AboutStory } from '@/components/about/AboutStory';
import { TeamSection } from '@/components/about/TeamSection';
import { ValuesGrid } from '@/components/about/ValuesGrid';
import { QuoteButton } from '@/components/forms/QuoteButton';
import { CtaSection } from '@/components/sections/CtaSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { ButtonLink } from '@/components/ui/Button';
import { aboutFacts, aboutStory, aboutValues, team } from '@/lib/data/about';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, webPageSchema } from '@/lib/seo/schema';
import { site } from '@/lib/site';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = createMetadata({
  title: 'About Our Local Kamloops Exterior Cleaning Crew',
  description:
    'Masterpiece Home Services is a small, owner-operated home care business founded in Kamloops, BC in 2025, built on honest pricing and careful work on every property.',
  path: site.routes.about,
  image: site.images.og,
});

const crumbs = [
  { name: 'Home', href: '/' },
  { name: 'About', href: site.routes.about },
];

export default function AboutPage(): React.JSX.Element {
  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({ name: 'About Masterpiece Home Services', path: site.routes.about, type: 'AboutPage' }),
          breadcrumbSchema(crumbs),
        ]}
      />

      <PageHero
        eyebrow="About us"
        title="A small, hands-on home care team, built in Kamloops"
        description="Careful, honest work on every property we touch, from one window to a full exterior clean."
        crumbs={crumbs}
      >
        <QuoteButton size="lg">Get a free quote</QuoteButton>
        <ButtonLink href={site.routes.services} variant="secondary" size="lg">
          Our services
        </ButtonLink>
      </PageHero>

      <AboutStory paragraphs={aboutStory} facts={aboutFacts} />
      <ValuesGrid values={aboutValues} />
      <TeamSection members={team} />

      <CtaSection
        title="Work with a small team that cares"
        description="Tell us what you need and we’ll confirm your price in writing within one business day. You’ll deal with the same local crew from quote to final walk-through."
      />
    </>
  );
}