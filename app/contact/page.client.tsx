'use client';

import PageTransition from '@/components/PageTransition';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import ServiceAreas from '@/components/ServiceAreas';
import CtaBanner from '@/components/CtaBanner';
import FAQ from '@/components/FAQ';

interface FAQItem {
  question: string;
  answer: string;
}

interface ContactClientProps {
  serviceAreas: string[];
  faqs: FAQItem[];
}

export default function ContactClient({
  serviceAreas,
  faqs,
}: ContactClientProps) {
  return (
    <PageTransition>
      <div className="bg-linear-to-r from-blue-900 to-blue-700 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
          Get in touch for a free quote or to schedule your service
        </p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-8">
              Send Us a Message
            </h2>
            <ContactForm />
          </div>

          <div>
            <ContactInfo />
            <ServiceAreas title="Service Areas" areas={serviceAreas} />
          </div>
        </div>

        <FAQ title="Frequently Asked Questions" faqs={faqs} />

        <CtaBanner
          title="Ready to Experience Crystal Clear Windows?"
          description="Contact us today for a free, no-obligation quote"
          buttonText="Get Free Quote"
        />
      </div>
    </PageTransition>
  );
}