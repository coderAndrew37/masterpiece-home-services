// src/components/blog/RelatedServices.tsx
import React from 'react';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { getServiceIcon } from '@/lib/ServiceIcons';
import type { RelatedServiceItem } from '@/types/service';

interface RelatedServicesProps {
  services: RelatedServiceItem[];
}

export default function RelatedServices({ services }: RelatedServicesProps): React.JSX.Element | null {
  if (!services || services.length === 0) return null;

  return (
    <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 space-y-4">
      <h2 className="text-lg font-extrabold text-slate-900">Related Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service) => (
          <Link
            key={service._id}
            href={`/services/${service.slug}`}
            className="group flex items-center justify-between gap-3 bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                {getServiceIcon(service.icon, 'w-4 h-4 text-blue-600')}
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm block group-hover:text-blue-700 transition-colors">
                  Book {service.title}
                </span>
                {service.startingPrice && (
                  <span className="text-xs text-slate-500">Starting at {service.startingPrice}</span>
                )}
              </div>
            </div>
            <FiArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}