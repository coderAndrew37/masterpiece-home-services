"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiMail, FiCheckCircle, FiArrowRight, FiStar } from "react-icons/fi";
import { toast } from "sonner";

export default function Newsletter(): React.JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setEmail("");

      toast.success("Welcome to Masterpiece Club!", {
        description: "Check your inbox for your 10% off voucher and seasonal care guide.",
        duration: 5000,
      });
    }, 800);
  };

  return (
    <section className="relative py-24 border-t border-slate-800 overflow-hidden bg-slate-950">
      {/* 1. Full-Bleed Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/residential-1.jpg" // Replace with your high-res hero/clean house background photo
          alt="Clean residential property in Kamloops"
          fill
          quality={90}
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        {/* Dark Gradient Overlay for flawless text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/70" />
      </div>

      {/* 2. Overlay Content Container */}
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider border border-blue-400/30">
              <FiStar className="w-3.5 h-3.5 text-blue-200" />
              <span>Kamloops Home Care Club</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Get <span className="text-blue-400">10% Off</span> & Seasonal Care Reminders
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Never miss a spring window wash or fall gutter clearing. Join 500+ local homeowners getting seasonal weather alerts, property care tips, and exclusive flash discounts.
            </p>

            <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs sm:text-sm font-medium text-slate-200 pt-2">
              <span className="flex items-center gap-2">
                <FiCheckCircle className="text-blue-400 shrink-0" /> No spam, ever
              </span>
              <span className="flex items-center gap-2">
                <FiCheckCircle className="text-blue-400 shrink-0" /> Priority seasonal booking
              </span>
              <span className="flex items-center gap-2">
                <FiCheckCircle className="text-blue-400 shrink-0" /> Unsubscribe anytime
              </span>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950/80 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="newsletter-email"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2"
                  >
                    Your Preferred Email *
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="email"
                      id="newsletter-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address..."
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70"
                >
                  {loading ? (
                    "Sending Voucher..."
                  ) : (
                    <>
                      <span>Claim My 10% Discount</span>
                      <FiArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}