// src/app/page.client.tsx
'use client';

import BeforeAfterSwiper from '@/components/BeforeAfterSwiper';
import Contact from '@/components/Contact';
import CtaBanner from '@/components/CtaBanner';
import FAQ, { FAQItem } from '@/components/FAQ';
import Gallery from '@/components/Gallery';
import Hero from '@/components/Hero';
import HomeProcess from '@/components/HomeProcess';
import LatestBlogs from '@/components/blog/LatestBlogs';
import LeadCapture from '@/components/LeadCapture';
import PageTransition from '@/components/PageTransition';
import ServiceArea from '@/components/ServiceArea';
import Services from '@/components/Services';
import StatsBar from '@/components/StatsBar';
import Testimonials from '@/components/Testimonials';
import WhyChooseUs from '@/components/WhyChooseUs';
import type { PostCard } from '@/types/blog';
import type { HomeGalleryItem } from '@/types/gallery';
import type { ServiceItem } from '@/types/service';

interface HomeClientProps {
  latestPosts: PostCard[];
  galleryItems: HomeGalleryItem[];
  featuredServices: ServiceItem[];
  faqs: FAQItem[];
   serviceAreas: { _id: string; name: string; slug: string }[];
}

export default function HomeClient({
  latestPosts,
  galleryItems,
  featuredServices,
  faqs,
  serviceAreas,
}: HomeClientProps): React.JSX.Element {
  return (
    <PageTransition>
      {/* 1. Hook + immediate conversion */}
      <Hero />
      <StatsBar />

      {/* 2. What we do, how it works */}
      <Services services={featuredServices} />
      <HomeProcess />

      {/* 3. Proof — kept together, back to back */}
      <BeforeAfterSwiper />
      <Gallery items={galleryItems} />
      <Testimonials />

      {/* 4. Differentiation + logistics (do you serve me?) */}
      <WhyChooseUs />
      <ServiceArea areas={serviceAreas} />

      {/* 5. Handle remaining objections */}
      <FAQ
        tagline="Got Questions?"
        title="Frequently Asked Questions"
        faqs={faqs}
        imageSrc="/images/residential-1.jpg"
        imageAlt="Masterpiece Home Services technician in Kamloops"
      />

      {/* 6. Convert — one continuous closing sequence, no detours */}
      <LeadCapture />
      <CtaBanner
        tagline="Book Service in Kamloops"
        title="Ready for Spotless Windows & Eavestroughs?"
        description="Get your fast, no-obligation quote today and experience the Masterpiece difference across Kamloops."
        buttonText="Request Free Quote"
      />
      <Contact />

      {/* 7. Low-intent content, for anyone who scrolled past everything */}
      <LatestBlogs posts={latestPosts} />
    </PageTransition>
  );
}