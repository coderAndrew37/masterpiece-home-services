'use client';

import BeforeAfterSwiper from '@/components/BeforeAfterSwiper';
import Contact from '@/components/Contact';
import CtaBanner from '@/components/CtaBanner';
import FAQ, { FAQItem } from '@/components/FAQ';
import Gallery from '@/components/Gallery';
import Hero from '@/components/Hero';
import HomeProcess from '@/components/HomeProcess'; // <-- Replaced old ProcessSteps
import PageTransition from '@/components/PageTransition';
import ServiceArea from '@/components/ServiceArea';
import Services from '@/components/Services';
import StatsBar from '@/components/StatsBar';
import Testimonials from '@/components/Testimonials';
import WhyChooseUs from '@/components/WhyChooseUs';


const homeFaqs: FAQItem[] = [
  {
    question: "How often should I get my windows and eavestroughs cleaned in Kamloops?",
    answer:
      "For most Kamloops homes, we recommend exterior window detailing twice a year (spring and autumn) and eavestrough clearing at least once in late autumn to prevent pine needle buildup and winter ice dams.",
  },
  {
    question: "Do I need to be home during the service?",
    answer:
      "Not at all! As long as outdoor water spigots are unlocked and pets are secured inside, our crew can complete all exterior detailing and leave your property immaculate.",
  },
  {
    question: "What water method do you use for exterior window cleaning?",
    answer:
      "We use a pure-water fed pole system with reverse osmosis and deionization filters. This removes all mineral deposits and leaves your glass completely streak-free without harsh chemicals.",
  },
  {
    question: "Are you fully insured and licensed in British Columbia?",
    answer:
      "Yes, Masterpiece carries $5,000,000 in commercial liability insurance and full WCB coverage for all crew members working on ladders and roofs.",
  },
  {
    question: "How do custom Christmas light installations work in the winter?",
    answer:
      "We handle everything: custom-fitting commercial-grade LED lights to your roofline, professional installation, season-long maintenance, and prompt removal in January.",
  },
];

export default function HomeClient(): React.JSX.Element {
  return (
    <PageTransition>
      <Hero />
      <StatsBar />
      <Services />
      <HomeProcess />
      <WhyChooseUs />
      <BeforeAfterSwiper />
      <ServiceArea />
      <Gallery />
      <Testimonials />
      <FAQ
  tagline="Got Questions?"
  title="Frequently Asked Questions"
  faqs={homeFaqs}
  imageSrc="/images/residential-1.jpg" // Make sure this image exists in /public/images/
  imageAlt="Masterpiece Home Services technician in Kamloops"
/>
      <CtaBanner
        tagline="Book Service in Kamloops"
        title="Ready for Spotless Windows & Eavestroughs?"
        description="Get your fast, no-obligation quote today and experience the Masterpiece difference across Kamloops and the Thompson-Okanagan."
        buttonText="Request Free Quote"
      />
      <Contact />
    </PageTransition>
  );
}