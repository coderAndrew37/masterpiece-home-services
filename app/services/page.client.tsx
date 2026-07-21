'use client';

import PageTransition from '@/components/PageTransition';
import ServiceDetail from '@/components/ServiceDetail';
import ServiceBenefits from '@/components/ServiceBenefits';
import PricingTable from '@/components/PricingTable';
import CtaBanner from '@/components/CtaBanner';

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface PricingOption {
  service: string;
  details: string;
  price: string;
}

interface ServicesClientProps {
  services: ServiceItem[];
  benefits: string[];
  pricing: PricingOption[];
}

export default function ServicesClient({
  services,
  benefits,
  pricing,
}: ServicesClientProps) {
  return (
    <PageTransition>
      <div className="bg-blue-900 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Our Services
        </h1>
        <p className="text-xl text-blue-200 max-w-3xl mx-auto">
          Professional window cleaning and exterior maintenance services for
          residential and commercial properties
        </p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service) => (
            <ServiceDetail
              key={service.id}
              title={service.title}
              description={service.description}
              features={service.features}
              icon={service.icon}
            />
          ))}
        </div>

        <ServiceBenefits
          title="Why Professional Window Cleaning Matters"
          benefits={benefits}
        />

        <PricingTable
          title="Transparent Pricing"
          description="No hidden fees - all prices include labor, equipment, and eco-friendly cleaning solutions"
          pricingOptions={pricing}
        />

        <CtaBanner
          title="Custom Solutions for Your Property"
          description="Contact us for a personalized quote based on your specific needs"
          buttonText="Get Custom Quote"
        />
      </div>
    </PageTransition>
  );
}