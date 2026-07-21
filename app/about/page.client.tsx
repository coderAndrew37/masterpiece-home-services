'use client';

import PageTransition from '@/components/PageTransition';
import TeamSection from '@/components/TeamSection';
import HistoryTimeline from '@/components/HistoryTimeline';
import ValuesSection from '@/components/ValuesSection';
import CtaBanner from '@/components/CtaBanner';

// TypeScript interfaces for props
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
}: AboutClientProps) {
  return (
    <PageTransition>
      <div className="bg-blue-900 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          About Shine Windows
        </h1>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
          Professional window cleaning services you can trust since 2010
        </p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Story</h2>
          <p className="text-gray-700 text-lg mb-6">
            Founded in 2010 by Michael Johnson, Shine Windows began with a
            simple mission: to provide exceptional window cleaning services with
            unmatched attention to detail. What started as a one-man operation
            has grown into a team of 25 dedicated professionals serving
            residential and commercial clients across Ontario.
          </p>
          <p className="text-gray-700 text-lg">
            Today, we&apos;re proud to be one of the most trusted window cleaning
            companies in the region, known for our reliability, professionalism,
            and commitment to customer satisfaction. We continue to innovate
            while staying true to our core values of excellence, integrity, and
            environmental responsibility.
          </p>
        </div>

        <HistoryTimeline events={timelineEvents} />

        <ValuesSection title="Our Core Values" values={values} />

        <TeamSection
          title="Meet Our Leadership Team"
          teamMembers={teamMembers}
        />

        <CtaBanner
          title="Experience the Shine Windows Difference"
          description="Join thousands of satisfied customers who trust us with their properties"
          buttonText="Schedule Service"
        />
      </div>
    </PageTransition>
  );
}