"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiX, FiSend, FiGift, FiCheckCircle, FiShield } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

interface ReviewGatingModalProps {
  googleReviewUrl?: string;
}

export default function ReviewGatingModal({
  googleReviewUrl = "https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review",
}: ReviewGatingModalProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [submittedFeedback, setSubmittedFeedback] = useState<boolean>(false);

  const handleSelectRating = (rating: number) => {
    setSelectedRating(rating);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSelectedRating(0);
      setFeedback("");
      setSubmittedFeedback(false);
    }, 300);
  };

  const handleInternalFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setTimeout(() => {
      setSubmittedFeedback(true);
      toast.success("Thank you for your feedback!", {
        description: "Our management team has received your note and will review it shortly.",
      });
    }, 600);
  };

  return (
    <>
      {/* 1. Eye-Catching On-Page Rating Card */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 sm:p-12 border border-slate-800 shadow-2xl my-12 text-white">
        {/* Glow Effects */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Messaging & Incentive Tag */}
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <FiGift className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Monthly Client Feedback Raffle</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
              How Was Your Recent <span className="text-blue-400">Cleaning Service?</span>
            </h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Rate your experience below. Every submission enters you into our monthly draw to win a <strong className="text-amber-300 font-semibold">$100 Service Credit</strong> toward your next window, gutter, or pressure washing service.
            </p>
          </div>

          {/* Right: Interactive Animated Star Bar */}
          <div className="lg:col-span-5 bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center shadow-inner">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              Tap a star to rate us
            </span>

            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isActive = star <= (hoveredRating || selectedRating);
                return (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.25, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSelectRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 focus:outline-none transition-transform"
                    aria-label={`Rate ${star} out of 5 stars`}
                  >
                    <FiStar
                      className={`w-9 h-9 sm:w-10 sm:h-10 transition-colors drop-shadow-md ${
                        isActive
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-700 hover:text-slate-500"
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>

            <span className="text-xs text-slate-400 mt-3 font-medium">
              {hoveredRating > 0
                ? `${hoveredRating} Star${hoveredRating > 1 ? "s" : ""}`
                : "Select 1 to 5 Stars"}
            </span>
          </div>

        </div>
      </div>

      {/* 2. Routing Pop-Up Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Dark Glass Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Dialog Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 z-10 p-6 sm:p-8 text-slate-900"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                aria-label="Close modal"
              >
                <FiX className="w-5 h-5" />
              </button>

              {/* ROUTE A: 4 or 5 STARS -> Direct to Google Review */}
              {selectedRating >= 4 && (
                <div className="text-center space-y-5 py-2">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-500 flex items-center justify-center mx-auto">
                    <FiStar className="w-9 h-9 fill-amber-400 text-amber-400" />
                  </div>

                  <div>
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-1">
                      {selectedRating}-Star Rating
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                      Thank You! We Appreciate You
                    </h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                      Would you mind sharing your review on Google? It takes under 60 seconds and helps local homeowners in Kamloops find trusted exterior specialists.
                    </p>
                  </div>

                  {/* Enticement Box */}
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-900 text-xs font-medium flex items-center gap-3 text-left">
                    <FiGift className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>
                      Posting on Google automatically enters your name into this month&apos;s <strong>$100 Cleaning Credit Draw</strong>!
                    </span>
                  </div>

                  <div className="pt-2">
                    <a
                      href={googleReviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleClose}
                      className="w-full inline-flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-2xl text-sm transition-all shadow-lg shadow-blue-700/20 active:scale-[0.98]"
                    >
                      <FcGoogle className="w-5 h-5 bg-white rounded-full p-0.5" />
                      <span>Post Review on Google</span>
                    </a>
                  </div>
                </div>
              )}

              {/* ROUTE B: LESS THAN 4 STARS -> Internal Improvement Form */}
              {selectedRating > 0 && selectedRating < 4 && (
                <div>
                  {!submittedFeedback ? (
                    <form onSubmit={handleInternalFeedbackSubmit} className="space-y-4">
                      <div className="text-center mb-4">
                        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
                          Manager Attention
                        </span>
                        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                          How Can We Improve?
                        </h3>
                        <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                          We aim for 100% satisfaction. Please let management know what fell short so we can make it right.
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                          Your Feedback / Issue *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder="Tell us about your service experience..."
                          className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                          Your Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:bg-white transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
                      >
                        <FiSend className="w-4 h-4" />
                        <span>Send Confidential Feedback</span>
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-6 space-y-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <FiCheckCircle className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900">
                        Feedback Received
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                        Thank you for helping us maintain top service standards. A manager will review your notes within 24 hours.
                      </p>
                      <button
                        onClick={handleClose}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-6 rounded-xl text-xs transition-colors"
                      >
                        Close Window
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}