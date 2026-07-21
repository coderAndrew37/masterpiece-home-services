import PrivacyPolicyClient from './page.client';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Shine Windows & Gutters',
  description:
    'Read the Privacy Policy for Shine Windows. Learn how we collect, protect, and handle your personal data across our services.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <PrivacyPolicyClient>
      <div className="prose prose-blue max-w-none">
        <h2>Introduction</h2>
        <p>
          Shine Windows (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
          operates the shinewindows.ca website (the &quot;Service&quot;). This
          page informs you of our policies regarding the collection, use, and
          disclosure of personal data when you use our Service and the choices
          you have associated with that data.
        </p>

        <h2>Information Collection and Use</h2>
        <p>
          We collect several different types of information for various
          purposes to provide and improve our Service to you.
        </p>

        <h3>Types of Data Collected</h3>
        <p>
          <strong>Personal Data</strong>
        </p>
        <p>
          While using our Service, we may ask you to provide us with certain
          personally identifiable information that can be used to contact or
          identify you (&quot;Personal Data&quot;). Personally identifiable
          information may include, but is not limited to:
        </p>
        <ul>
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Address, State, Province, ZIP/Postal code, City</li>
          <li>Cookies and Usage Data</li>
        </ul>

        <h2>Use of Data</h2>
        <p>Shine Windows uses the collected data for various purposes:</p>
        <ul>
          <li>To provide and maintain our Service</li>
          <li>To notify you about changes to our Service</li>
          <li>
            To allow you to participate in interactive features of our Service
            when you choose to do so
          </li>
          <li>To provide customer support</li>
          <li>
            To gather analysis or valuable information so that we can improve
            our Service
          </li>
          <li>To monitor the usage of our Service</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          The security of your data is important to us, but remember that no
          method of transmission over the Internet, or method of electronic
          storage is 100% secure. While we strive to use commercially acceptable
          means to protect your Personal Data, we cannot guarantee its absolute
          security.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact
          us:
        </p>
        <ul>
          <li>By email: privacy@shinewindows.ca</li>
          <li>
            By visiting this page on our website:{' '}
            <Link
              href="/contact"
              className="text-blue-700 underline hover:text-blue-900"
            >
              shinewindows.ca/contact
            </Link>
          </li>
        </ul>
      </div>
    </PrivacyPolicyClient>
  );
}