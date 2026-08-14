// src/app/about/page.client.tsx
'use client';

import PageTransition from '@/components/PageTransition';
import TeamSection from '@/components/TeamSection';
import HistoryTimeline from '@/components/HistoryTimeline';
import ValuesSection from '@/components/ValuesSection';
import CtaBanner from '@/components/CtaBanner';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  img: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

interface ValueItem {
  title: string;
  description: string;
}

interface AboutClientProps {
  teamMembers: TeamMember[];
  timelineEvents: TimelineEvent[];
  values: ValueItem[];
}

export default function AboutClient({
  teamMembers,
  timelineEvents,
  values,
}: AboutClientProps): React.JSX.Element {
  return (
    <PageTransition>
      <div className="bg-blue-900 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          About Masterpiece Home Services
        </h1>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
          A small, hands-on home care team, built in Kamloops.
        </p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Story</h2>
          <p className="text-gray-700 text-lg mb-6">
            Masterpiece Home Services started in 2025, right here in Kamloops, BC. It began small
            &mdash; and it&apos;s still small today: our founder and one dedicated technician handle
            every job personally. When the schedule fills up, we bring in trusted local partners
            to keep turnaround times fast without cutting corners.
          </p>
          <p className="text-gray-700 text-lg">
            We officially registered the business in August 2026 as we started building toward
            something bigger. As we grow, we&apos;re looking forward to hiring more Kamloops-based
            technicians and expanding what we can offer &mdash; but the goal that started this
            business hasn&apos;t changed: careful, honest work on every property we touch.
          </p>
        </div>

        <HistoryTimeline events={timelineEvents} />

        <ValuesSection title="What We Care About" values={values} />

        <TeamSection title="Who You'll Work With" teamMembers={teamMembers} />

        <CtaBanner
          tagline="Kamloops & Surrounding Areas"
          title="Ready to Work With a Team That Cares?"
          description="Book your free estimate and see the hands-on difference of working with a small, local team."
          buttonText="Get Your Free Quote"
        />
      </div>
    </PageTransition>
  );
}