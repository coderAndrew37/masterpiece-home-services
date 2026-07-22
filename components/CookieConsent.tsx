"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShield, FiX, FiCheck } from "react-icons/fi";
import { toast } from "sonner";

const COOKIE_KEY = "masterpiece_cookie_consent";

export default function CookieConsent(): React.JSX.Element | null {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already set cookie preferences
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500); // Small delay so it doesn't slam the user immediately on load
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setIsVisible(false);
    toast.success("Cookie preferences saved", {
      description: "We use essential cookies to keep your browsing experience smooth.",
    });
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setIsVisible(false);
    toast.info("Essential cookies only enabled", {
      description: "Optional analytics cookies have been disabled.",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-50"
        >
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 text-white p-5 sm:p-6 rounded-2xl shadow-2xl relative">
            
            {/* Header / Icon */}
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 shrink-0">
                <FiShield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white leading-tight">
                  We Respect Your Privacy
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  We use cookies to improve your browsing experience, deliver personalized quote estimates, and analyze site traffic across Kamloops and BC.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={handleAccept}
                className="flex-1 bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                <FiCheck className="w-4 h-4" /> Accept All
              </button>
              
              <button
                onClick={handleDecline}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all"
              >
                Essential Only
              </button>

              <button
                onClick={handleDecline}
                className="p-2.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                aria-label="Close consent banner"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}