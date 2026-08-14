// src/app/privacy-policy/page.tsx
import PrivacyPolicyClient from './page.client';
import Link from 'next/link';
import type { Metadata } from 'next';
import LegalLayout from '@/components/legal/LegalLayout';
import LegalSection from '@/components/legal/LegalSection';
import { QuickFacts } from '@/components/legal/Callout';

const SITE_URL = 'https://www.masterpiecehomeservices.ca';

export const metadata: Metadata = {
  title: 'Privacy Policy | Masterpiece Home Services',
  description:
    'Read the Privacy Policy for Masterpiece Home Services. Learn how we collect, protect, and handle your personal data.',
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
  robots: { index: true, follow: true },
};

const TOC = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'collection', label: 'Information We Collect' },
  { id: 'use', label: 'How We Use Data' },
  { id: 'security', label: 'Data Security' },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact Us' },
];

export default function PrivacyPolicyPage() {
  return (
    <PrivacyPolicyClient>
      <LegalLayout title="Privacy Policy" lastUpdated="August 13, 2026" toc={TOC}>
        <QuickFacts
          facts={[
            { label: 'What we collect', value: 'Name, email, phone, city/neighborhood' },
            { label: 'Why', value: 'Quote requests, support, service improvement' },
            { label: 'Shared with third parties', value: 'No' },
            { label: 'Your data, secured', value: 'Industry-standard practices, no guarantee is absolute' },
          ]}
        />

        <LegalSection id="introduction" number={1} title="Introduction">
          <p>
            Masterpiece Home Services (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
            operates the masterpiecehomeservices.ca website (the &quot;Service&quot;). This page
            informs you of our policies regarding the collection, use, and disclosure of personal
            data when you use our Service and the choices you have associated with that data.
          </p>
        </LegalSection>

        <LegalSection id="collection" number={2} title="Information Collection and Use">
          <p>
            We collect several different types of information for various purposes to provide
            and improve our Service to you.
          </p>
          <p className="font-semibold text-slate-900">Personal Data</p>
          <p>
            While using our Service, we may ask you to provide us with certain personally
            identifiable information that can be used to contact or identify you
            (&quot;Personal Data&quot;). This may include:
          </p>
          <ul>
            <li>Email address</li>
            <li>Name</li>
            <li>Phone number</li>
            <li>City / neighborhood</li>
            <li>Cookies and Usage Data</li>
          </ul>
        </LegalSection>

        <LegalSection id="use" number={3} title="Use of Data">
          <p>Masterpiece Home Services uses the collected data for various purposes:</p>
          <ul>
            <li>To provide and maintain our Service</li>
            <li>To respond to quote requests and contact form submissions</li>
            <li>To provide customer support</li>
            <li>To gather analysis so we can improve our Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </LegalSection>

        <LegalSection id="security" number={4} title="Data Security">
          <p>
            The security of your data is important to us, but remember that no method of
            transmission over the Internet, or method of electronic storage, is 100% secure.
            While we strive to use commercially acceptable means to protect your Personal Data,
            we cannot guarantee its absolute security.
          </p>
        </LegalSection>

        <LegalSection id="changes" number={5} title="Changes to This Privacy Policy">
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page.
          </p>
        </LegalSection>

        <LegalSection id="contact" number={6} title="Contact Us">
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul>
            <li>By email: [privacy@masterpiecehomeservices.ca]</li>
            <li>
              By visiting:{' '}
              <Link href="/contact" className="text-blue-700 underline hover:text-blue-900">
                masterpiecehomeservices.ca/contact
              </Link>
            </li>
          </ul>
        </LegalSection>
      </LegalLayout>
    </PrivacyPolicyClient>
  );
}