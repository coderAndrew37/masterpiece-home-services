"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiCheckCircle, FiMail, FiStar, FiArrowRight } from "react-icons/fi";
import { toast } from "sonner";

export default function LeadCapture(): React.JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    // Simulate API submission
    setTimeout(() => {
      setLoading(false);
      setEmail("");

      toast.success("10% Off Voucher Sent!", {
        description: "Check your inbox shortly for your discount code and Kamloops seasonal guide.",
        duration: 5000,
      });
    }, 1000);
  };

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200/80 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-white overflow-hidden border border-slate-200/80 shadow-xl grid grid-cols-1 lg:grid-cols-12"
        >
         

          {/* Right Side: Clean Form & Value Proposition */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-xl">
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <span className="w-1 h-5 bg-blue-700 rounded-full inline-block" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Priority Access
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                Get <span className="text-blue-700">10% Off</span> Your First Service
              </h2>

              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Subscribe to receive your instant voucher code + seasonal maintenance alerts (like fall eavestrough care before heavy interior rain).
              </p>

              {/* Perks List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-xs sm:text-sm font-medium text-slate-700">
                <span className="flex items-center gap-2">
                  <FiCheckCircle className="text-blue-700 shrink-0 w-4 h-4" /> No spam ever
                </span>
                <span className="flex items-center gap-2">
                  <FiCheckCircle className="text-blue-700 shrink-0 w-4 h-4" /> Priority booking
                </span>
                <span className="flex items-center gap-2">
                  <FiCheckCircle className="text-blue-700 shrink-0 w-4 h-4" /> Unsubscribe anytime
                </span>
              </div>

              {/* Form Input */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="email"
                      id="lead-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address..."
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 px-7 rounded-xl text-sm transition-all shadow-lg shadow-blue-700/20 flex items-center justify-center gap-2 shrink-0 active:scale-[0.99] disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <span>Get 10% Voucher</span>
                        <FiArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>
          </div>
           {/* Left Side: High-Res Image Showcase */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[460px] bg-slate-900">
            <Image
              src="/images/residential-1.jpg" // Ensure image exists in /public/images/
              alt="Spotless exterior home service in Kamloops"
              fill
              quality={90}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
            {/* Dark gradient for high-contrast badge text */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-2">
                <FiStar className="w-3.5 h-3.5" /> Kamloops Local Offer
              </span>
              <p className="text-sm text-slate-200 font-medium leading-relaxed">
                Join 500+ local homeowners keeping their properties pristine all year round.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}