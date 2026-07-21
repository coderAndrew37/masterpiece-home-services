'use client';

import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import PageTransition from '@/components/PageTransition';
import CtaBanner from '@/components/CtaBanner';

export default function HomeClient() {
  return (
    <PageTransition>
      <Hero />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <Gallery />
      <Contact />
      <CtaBanner
        title="Ready for Crystal Clear Windows?"
        description="Get a free quote today and experience the Shine Windows difference."
        buttonText="Request Free Quote"
      />
    </PageTransition>
  );
}