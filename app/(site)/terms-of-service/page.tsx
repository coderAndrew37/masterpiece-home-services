// src/app/terms-of-service/page.tsx
import TermsOfServiceClient from './page.client';
import type { Metadata } from 'next';
import { phoneNumber } from '@/lib/constants';
import LegalLayout from '@/components/legal/LegalLayout';
import LegalSection from '@/components/legal/LegalSection';
import { Callout, QuickFacts } from '@/components/legal/Callout';

const SITE_URL = 'https://www.masterpiecehomeservices.ca';

export const metadata: Metadata = {
  title: 'Terms of Service | Masterpiece Home Services',
  description:
    'Read the Terms of Service for Masterpiece Home Services. Learn about our service guarantees, cancellation policies, and booking terms.',
  alternates: { canonical: `${SITE_URL}/terms-of-service` },
  robots: { index: true, follow: true },
};

const TOC = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'services', label: 'Services' },
  { id: 'bookings-payments', label: 'Bookings & Payments' },
  { id: 'cancellation', label: 'Cancellation Policy' },
  { id: 'guarantee', label: 'Service Guarantee' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'changes', label: 'Changes to Terms' },
  { id: 'contact', label: 'Contact Us' },
];

export default function TermsOfServicePage() {
  return (
    <TermsOfServiceClient>
      <LegalLayout title="Terms of Service" lastUpdated="August 13, 2026" toc={TOC}>
        <QuickFacts
          facts={[
            { label: 'Cancellation window', value: '24+ hours notice, no fee' },
            { label: 'Service guarantee', value: '7 days after completion' },
            { label: 'Accepted payment', value: 'Interac e-Transfer, credit card, cash' },
            { label: 'Payment due', value: 'At time of service' },
          ]}
        />

        <LegalSection id="introduction" number={1} title="Introduction">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your use of the website and
            services provided by Masterpiece Home Services (&quot;we&quot;, &quot;us&quot;, or
            &quot;our&quot;). By accessing or using our Service, you agree to be bound by these
            Terms.
          </p>
        </LegalSection>

        <LegalSection id="services" number={2} title="Services">
          <p>
            We provide professional window detailing, eavestrough clearing, house soft washing,
            pressure washing, indoor cleaning, and seasonal Christmas light installation. All
            services are subject to availability.
          </p>
        </LegalSection>

        <LegalSection id="bookings-payments" number={3} title="Bookings and Payments">
          <p>
            When you book a service with us, you agree to provide accurate and complete
            information. Payment is due at the time of service unless otherwise arranged. We
            accept Interac e-Transfer, major credit cards, and cash.
          </p>
        </LegalSection>

        {/* CONFIRM: real cancellation policy before publishing */}
        <LegalSection id="cancellation" number={4} title="Cancellation Policy">
          <Callout title="24-hour notice">
            Cancel or reschedule with at least 24 hours notice at no charge.
          </Callout>
          <p>
            You may cancel or reschedule your appointment with at least 24 hours notice without
            penalty. Cancellations with less than 24 hours notice may be subject to a
            cancellation fee.
          </p>
        </LegalSection>

        {/* CONFIRM: real guarantee window before publishing */}
        <LegalSection id="guarantee" number={5} title="Service Guarantee">
          <Callout title="7-day guarantee">
            Not satisfied? Contact us within 7 days and we&apos;ll return to fix it at no cost.
          </Callout>
          <p>
            We guarantee our work for 7 days following service completion. If you&apos;re not
            satisfied with any aspect of our service, contact us within 7 days and we&apos;ll
            return to address the issue at no additional cost.
          </p>
        </LegalSection>

        <LegalSection id="liability" number={6} title="Limitation of Liability">
          <p>
            In no event shall Masterpiece Home Services, nor its owner, employees, or affiliates,
            be liable for any indirect, incidental, special, consequential or punitive damages,
            including without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from your access to or use of or inability to access or
            use the Services.
          </p>
        </LegalSection>

        <LegalSection id="changes" number={7} title="Changes to Terms">
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any
            time. By continuing to use our Service after those revisions become effective, you
            agree to be bound by the revised terms.
          </p>
        </LegalSection>

        <LegalSection id="contact" number={8} title="Contact Us">
          <p>If you have any questions about these Terms, please contact us at:</p>
          <ul>
            <li>By email: [legal@masterpiecehomeservices.ca]</li>
            <li>By phone: {phoneNumber}</li>
          </ul>
        </LegalSection>
      </LegalLayout>
    </TermsOfServiceClient>
  );
}