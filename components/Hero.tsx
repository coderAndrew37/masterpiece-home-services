"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FiArrowRight, FiUser, FiPhone } from "react-icons/fi";
import { phoneTel } from "@/lib/constants";

const SERVICE_OPTIONS = [
  "Window Cleaning",
  "Eavestrough & Gutter Care",
  "Full House Soft Wash",
  "Pressure Washing",
  "Christmas Light Installation",
  "Not sure yet",
];

const Hero = () => {
  const [form, setForm] = useState({ name: "", phone: "", service: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: "", phone: "", service: "" });
      toast.success("Request received!", {
        description: "We'll text you a quote within one business day.",
        duration: 5000,
      });
    }, 700);
  };

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 flex items-center bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: "url(/images/home-hero.jpg)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
            >
              Kamloops&apos; Trusted Exterior & Seasonal Home Care
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg md:text-xl text-white/90 mb-6 drop-shadow max-w-xl"
            >
              From streak-free windows and clear eavestroughs to full house
              washing and custom Christmas light displays—keeping your
              property immaculate all year long.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/90"
            >
              <span>$5M Insured</span>
              <span className="text-white/40">•</span>
              <span>5.0 Star Rated</span>
              <span className="text-white/40">•</span>
              <span>100% Satisfaction Guarantee</span>
            </motion.div>

            <motion.a
              href={phoneTel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="inline-block mt-6 text-sm font-bold text-white/80 hover:text-white underline underline-offset-4"
            >
              Prefer to talk? Call us directly →
            </motion.a>
          </div>

          {/* Right: quick-quote card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
              <h2 className="text-lg font-extrabold text-slate-900 mb-1">
                Get Your Free Quote
              </h2>
              <p className="text-sm text-slate-500 mb-5">
                Takes 30 seconds. No obligation.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="relative">
                  <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">What do you need? (optional)</option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? "Sending..." : (
                    <>
                      <span>Get My Free Quote</span>
                      <FiArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;