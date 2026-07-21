"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface BeforeAfterItem {
  id: string;
  title: string;
  service: string;
  beforeImg: string;
  afterImg: string;
}

const comparisons: BeforeAfterItem[] = [
  {
    id: "1",
    title: "Exterior Window Restoration",
    service: "Pure-Water Detailing",
    beforeImg: "/images/residential-1.jpg", // Replace with your real image paths
    afterImg: "/images/residential-1.jpg",
  },
  {
    id: "2",
    title: "Pine Needle & Debris Removal",
    service: "Eavestrough Clearing",
    beforeImg:"/images/residential-1.jpg",
    afterImg: "/images/residential-1.jpg",
  },
  {
    id: "3",
    title: "Siding Soft Wash & Mold Care",
    service: "Exterior House Washing",
    beforeImg: "/images/residential-1.jpg",
    afterImg: "/images/residential-1.jpg",
  },
];

export default function BeforeAfterSwiper(): React.JSX.Element {
  return (
    <section className="py-20 bg-white border-b border-slate-200/80 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-100">
            Real Kamloops Results
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            See the Masterpiece Transformation
          </h3>
          <p className="text-slate-600 text-base">
            Swipe through our recent projects to see how pure-water glass cleaning and eavestrough care restore curb appeal.
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="relative before-after-slider">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 2 },
            }}
            className="pb-14"
          >
            {comparisons.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-slate-50 border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow p-5">
                  {/* Before / After Images Split Container */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {/* Before Frame */}
                    <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden bg-slate-200">
                      <Image
                        src={item.beforeImg}
                        alt={`${item.title} Before`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover object-center"
                      />
                      <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider">
                        Before
                      </span>
                    </div>

                    {/* After Frame */}
                    <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden bg-slate-200">
                      <Image
                        src={item.afterImg}
                        alt={`${item.title} After`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover object-center"
                      />
                      <span className="absolute top-3 left-3 bg-blue-700 text-white text-xs font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                        After
                      </span>
                    </div>
                  </div>

                  {/* Card Label */}
                  <div className="flex items-center justify-between px-2">
                    <div>
                      <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">
                        {item.service}
                      </span>
                      <h4 className="text-lg font-bold text-slate-900">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom Swiper Pagination & Navigation Styling */}
      <style jsx global>{`
        .before-after-slider .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
        }
        .before-after-slider .swiper-pagination-bullet-active {
          background: #1d4ed8 !important;
          width: 24px;
          border-radius: 999px;
        }
        .before-after-slider .swiper-button-next,
        .before-after-slider .swiper-button-prev {
          color: #1d4ed8;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
        }
        .before-after-slider .swiper-button-next:after,
        .before-after-slider .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }
      `}</style>
    </section>
  );
}