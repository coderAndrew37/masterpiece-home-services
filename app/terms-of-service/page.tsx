import TermsOfServiceClient from './page.client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Shine Windows & Gutters',
  description:
    'Read the Terms of Service for Shine Windows. Learn about our service guarantees, cancellation policies, and booking terms.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  return (
    <TermsOfServiceClient>
      <div className="prose prose-blue max-w-none">
        <h2>Introduction</h2>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your use of the website
          and services provided by Shine Windows (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
          By accessing or using our Service, you agree to be bound by these
          Terms.
        </p>

        <h2>Services</h2>
        <p>
          We provide professional window cleaning and related exterior maintenance
          services. All services are subject to availability and we reserve the
          right to refuse service to anyone for any reason at any time.
        </p>

        <h2>Bookings and Payments</h2>
        <p>
          When you book a service with us, you agree to provide accurate and
          complete information. Payment is due at the time of service unless
          otherwise arranged. We accept major credit cards, debit cards, and cash.
        </p>

        <h2>Cancellation Policy</h2>
        <p>
          You may cancel or reschedule your appointment with at least 24 hours
          notice without penalty. Cancellations with less than 24 hours notice may
          be subject to a cancellation fee of 50% of the service price.
        </p>

        <h2>Service Guarantee</h2>
        <p>
          We guarantee our work for 7 days following service completion. If
          you&apos;re not satisfied with any aspect of our service, contact us
          within 7 days and we&apos;ll return to address the issue at no
          additional cost.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          In no event shall Shine Windows, nor its directors, employees,
          partners, agents, suppliers, or affiliates, be liable for any indirect,
          incidental, special, consequential or punitive damages, including
          without limitation, loss of profits, data, use, goodwill, or other
          intangible losses, resulting from your access to or use of or inability
          to access or use the Services.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these
          Terms at any time. By continuing to access or use our Service after
          those revisions become effective, you agree to be bound by the revised
          terms.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <ul>
          <li>By email: legal@shinewindows.ca</li>
          <li>By phone: +1 (555) 123-4567</li>
          <li>By mail: 123 Clean Street, Toronto, ON M1A 1A1</li>
        </ul>
      </div>
    </TermsOfServiceClient>
  );
}