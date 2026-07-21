"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { FiStar } from "react-icons/fi";
import { ImQuotesRight } from "react-icons/im";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export interface TestimonialItem {
  id: number;
  name: string;
  location: string;
  content: string;
  rating: number;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Kamloops, BC",
    content:
      "The Masterpiece team did an amazing job on our home. The windows are sparkling clean and they were very professional and efficient. Highly recommend their pure-water system!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Thompson",
    location: "Sun Peaks",
    content:
      "We've been using them for our property for 3 years now. Consistent quality, reliable service, and they handle the high ladder work safely. Total peace of mind.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Valleyview",
    content:
      "They cleared out years of pine needles from our eavestroughs in just a few hours. The crew was safety-conscious, polite, and cleaned up everything before leaving.",
    rating: 5,
  },
];

export default function Testimonials(): React.JSX.Element {
  return (
    <section className="relative py-20 lg:py-32 bg-slate-950 overflow-hidden text-white">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Image with Floating Feedback Badge */}
          <div className="relative w-full aspect-square sm:aspect-[4/5] lg:aspect-square max-w-md mx-auto lg:mx-0 rounded-b-full bg-slate-900 border-b-8 border-blue-700 pt-10 px-8 flex items-end justify-center">
            {/* Main Portrait / Subject Image */}
            <div className="relative w-full h-full">
              <Image
                src="/images/residential-1.jpg" // Ensure you have a transparent PNG or well-cropped image here
                alt="Happy Customer"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>

            {/* Floating "Clients Feedback" Badge (Overlapping bottom right) */}
            <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-blue-700 rounded-2xl p-6 shadow-2xl shadow-slate-950/50 w-[280px] sm:w-[320px] z-20">
              <p className="text-white font-bold text-sm sm:text-base mb-4 text-center">
                500+ Clients Feedback
              </p>
              
              {/* Overlapping Avatar Circles */}
              <div className="flex justify-center -space-x-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-blue-700 bg-slate-200 overflow-hidden"
                  >
                    <Image
                      src={`/images/residential-1-${i + 1}.jpg`} // Replace with tiny face thumbnails if you have them, or use initials
                      alt="Client avatar"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {/* Plus Icon Circle */}
                <div className="w-10 h-10 rounded-full border-2 border-blue-700 bg-white flex items-center justify-center text-slate-900 font-bold text-lg">
                  +
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text & Swiper */}
          <div className="flex flex-col justify-center mt-12 lg:mt-0">
            
            {/* Header / Accent Bar */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 bg-blue-600 rounded-full inline-block" />
              <span className="text-slate-300 font-semibold text-sm sm:text-base uppercase tracking-wider">
                Testimonial
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-10">
              What Our Clients Say
            </h2>

            {/* Testimonials Swiper */}
            <div className="relative w-full max-w-xl">
              <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{
                  clickable: true,
                  el: ".custom-testimonial-pagination",
                }}
                className="w-full"
              >
                {testimonialsData.map((testimonial) => (
                  <SwiperSlide key={testimonial.id}>
                    <div className="relative pb-12">
                      {/* Star Rating */}
                      <div className="flex gap-1 text-amber-400 text-lg mb-6">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={i < testimonial.rating ? "fill-amber-400" : "text-slate-600"}
                          />
                        ))}
                      </div>

                      {/* Quote Content */}
                      <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-8 relative z-10">
                        {testimonial.content}
                      </p>

                      {/* Large Background Quote Icon */}
                      <ImQuotesRight className="absolute right-0 bottom-16 text-8xl text-blue-700/20 z-0" />

                      {/* Author Info */}
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">
                          {testimonial.name}
                        </h4>
                        <p className="text-slate-400 text-sm">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Pagination Container (Below content) */}
              <div className="custom-testimonial-pagination flex gap-2 mt-4" />
            </div>
          </div>

        </div>
      </div>

      {/* Global Swiper Pagination Overrides for this section */}
      <style jsx global>{`
        .custom-testimonial-pagination .swiper-pagination-bullet {
          background: #475569; /* slate-600 */
          opacity: 1;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        .custom-testimonial-pagination .swiper-pagination-bullet-active {
          background: #1d4ed8 !important; /* blue-700 */
          width: 30px;
          border-radius: 999px;
        }
      `}</style>
    </section>
  );
}