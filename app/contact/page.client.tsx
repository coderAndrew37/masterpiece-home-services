'use client';

import PageTransition from '@/components/PageTransition';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import ServiceAreas from '@/components/ServiceAreas';
import CtaBanner from '@/components/CtaBanner';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';

interface FAQItem {
  question: string;
  answer: string;
}

interface ContactClientProps {
  serviceAreas: string[];
  faqs: FAQItem[];
}

const contactFAQs:FAQItem[]=[
  {
    question: "How often should I get my windows and eavestroughs cleaned in Kamloops?",
    answer:
      "For most Kamloops homes, we recommend exterior window detailing twice a year (spring and autumn) and eavestrough clearing at least once in late autumn to prevent pine needle buildup and winter ice dams.",
  },
]
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

     <Contact/>
     <FAQ faqs={contactFAQs}/>
    </PageTransition>
  );
}