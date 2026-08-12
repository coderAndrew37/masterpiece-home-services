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
import PricingTiers from '@/components/PricingTiers';
import ServiceArea from '@/components/ServiceArea';
import Services from '@/components/Services';
import StatsBar from '@/components/StatsBar';
import Testimonials from '@/components/Testimonials';
import WhyChooseUs from '@/components/WhyChooseUs';
import type { PostCard } from '@/types/blog';
import type { HomeGalleryItem } from '@/types/gallery';
import type { ServiceItem } from '@/types/service';
import type { PricingPlan } from '@/types/pricing';

interface HomeClientProps {
  latestPosts: PostCard[];
  galleryItems: HomeGalleryItem[];
  featuredServices: ServiceItem[];
  faqs: FAQItem[];
  serviceAreas: { _id: string; name: string; slug: string }[];
  pricingPlans: PricingPlan[];
}

export default function HomeClient({
  latestPosts,
  galleryItems,
  featuredServices,
  faqs,
  serviceAreas,
  pricingPlans,
}: HomeClientProps): React.JSX.Element {
  return (
    <PageTransition>
      <Hero />
      <StatsBar />

      <Services services={featuredServices} />
      <HomeProcess />
      <PricingTiers plans={pricingPlans} />

      <BeforeAfterSwiper />
      <Gallery items={galleryItems} />
      <Testimonials />

      <WhyChooseUs />
      <ServiceArea areas={serviceAreas} />

      <FAQ
        tagline="Got Questions?"
        title="Frequently Asked Questions"
        faqs={faqs}
        imageSrc="/images/residential-1.jpg"
        imageAlt="Masterpiece Home Services technician in Kamloops"
      />

      <LeadCapture />
      <CtaBanner
        tagline="Book Service in Kamloops"
        title="Ready for Spotless Windows & Eavestroughs?"
        description="Get your fast, no-obligation quote today and experience the Masterpiece difference across Kamloops."
        buttonText="Request Free Quote"
      />
      <Contact />

      <LatestBlogs posts={latestPosts} />
    </PageTransition>
  );
}