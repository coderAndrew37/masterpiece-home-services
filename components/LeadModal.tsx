"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMail, FiCheck, FiStar } from "react-icons/fi";
import { toast } from "sonner";

const POPUP_STORAGE_KEY = "masterpiece_lead_popup_dismissed";
const DISMISS_DAYS = 14; // Don't show again for 14 days after closing

export default function LeadModal(): React.JSX.Element | null {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // 1. Check if user already dismissed or converted
    const lastDismissed = localStorage.getItem(POPUP_STORAGE_KEY);
    if (lastDismissed) {
      const dismissedTime = parseInt(lastDismissed, 10);
      const daysSince = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
      if (daysSince < DISMISS_DAYS) {
        return; // Still in cooldown period
      }
    }

    let triggered = false;

    // Trigger A: Scroll Depth (40%)
    const handleScroll = () => {
      if (triggered) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (currentScroll / totalHeight > 0.4) {
        triggered = true;
        setIsOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    // Trigger B: Desktop Exit Intent (Mouse leaves top of viewport)
    const handleMouseLeave = (e: MouseEvent) => {
      if (triggered) return;
      if (e.clientY <= 0) {
        triggered = true;
        setIsOpen(true);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Save dismissal timestamp
    localStorage.setItem(POPUP_STORAGE_KEY, Date.now().toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    // Simulate API lead save (e.g., Supabase / Resend / ConvertKit)
    setTimeout(() => {
      setLoading(false);
      setIsOpen(false);
      setEmail("");
      localStorage.setItem(POPUP_STORAGE_KEY, Date.now().toString());

      toast.success("10% Off Voucher Sent!", {
        description: "Check your inbox for your discount code and Kamloops seasonal maintenance guide.",
        duration: 6000,
      });
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Dark Glassmorphism Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 z-10 grid grid-cols-1 md:grid-cols-12"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              aria-label="Close modal"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* Left Column: Image with Overlay Tag */}
            <div className="md:col-span-5 relative hidden md:block min-h-[420px]">
              <Image
                src="/images/residential-1.jpg" // Ensure this exists in /public/images
                alt="Spotless house in Kamloops"
                fill
                quality={90}
                sizes="33vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider mb-2">
                  <FiStar className="w-3.5 h-3.5" /> Special Offer
                </span>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  Join 500+ Kamloops homeowners enjoying streak-free views and clean gutters.
                </p>
              </div>
            </div>

            {/* Right Column: Clean Offer & Form */}
            <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1 h-5 bg-blue-700 rounded-full" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Kamloops Homeowners
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
                  Get <span className="text-blue-700">10% Off</span> Your Next Service
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  Claim your instant discount code + local seasonal alerts (e.g. pine needle gutter clearing before fall rains).
                </p>
              </div>

              {/* Value Bullet Points */}
              <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-700 font-medium">
                <li className="flex items-center gap-2.5">
                  <span className="p-1 rounded-full bg-blue-50 text-blue-700 shrink-0">
                    <FiCheck className="w-3.5 h-3.5" />
                  </span>
                  <span>10% off windows, gutters, or house washing</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="p-1 rounded-full bg-blue-50 text-blue-700 shrink-0">
                    <FiCheck className="w-3.5 h-3.5" />
                  </span>
                  <span>Priority seasonal & Christmas light scheduling</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="p-1 rounded-full bg-blue-50 text-blue-700 shrink-0">
                    <FiCheck className="w-3.5 h-3.5" />
                  </span>
                  <span>No spam. Unsubscribe with 1-click anytime</span>
                </li>
              </ul>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-lg shadow-blue-700/20 active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  {loading ? "Sending Voucher..." : "Claim My 10% Discount"}
                </button>
              </form>

              <button
                onClick={handleClose}
                className="mt-4 text-center text-xs text-slate-400 hover:text-slate-600 transition-colors font-medium"
              >
                No thanks, I prefer paying full price
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}