"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  FiX, FiCheck, FiArrowRight, FiArrowLeft, FiUser, FiPhone, FiMail, FiMapPin,
} from "react-icons/fi";
import { useBooking } from "@/context/BookingContext";
import { phoneTel, phoneNumber } from "@/lib/constants";

const SERVICES = [
  "Window Cleaning",
  "Eavestrough & Gutter Care",
  "Full House Soft Wash",
  "Pressure Washing",
  "Indoor House Cleaning",
  "Christmas Light Installation",
  "Not sure yet",
];

const URGENCY_OPTIONS = [
  "As soon as possible",
  "Within this week",
  "Within this month",
  "Just getting a quote",
];

const TOTAL_STEPS = 3;

export default function BookingModal(): React.JSX.Element | null {
  const { isOpen, presetService, presetNote, closeBooking } = useBooking();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    service: "",
    urgency: "",
    address: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setSubmitted(false);
      setForm((f) => ({
        ...f,
        service: presetService ?? "",
        notes: presetNote ?? "",
      }));
    }
  }, [isOpen, presetService, presetNote]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBooking();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeBooking]);

  if (!isOpen) return null;

  // If the preset service isn't one of our fixed options (e.g. a pricing
  // plan name like "Complete Home Care"), show it as a selected chip
  // instead of leaving the grid looking like nothing was chosen.
  const displayServices =
    form.service && !SERVICES.includes(form.service) ? [form.service, ...SERVICES] : SERVICES;

  const canProceed =
    (step === 0 && form.service !== "") ||
    (step === 1 && form.urgency !== "") ||
    step === 2;

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
  };
  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Request received!", {
        description: "We'll text you a quote within one business day.",
      });
    }, 700);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeBooking}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col"
        >
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">
                {submitted ? "You're all set!" : "Get Your Free Quote"}
              </h2>
              {!submitted && (
                <p className="text-xs text-slate-500 mt-0.5">Takes under a minute · No obligation</p>
              )}
            </div>
            <button
              onClick={closeBooking}
              aria-label="Close"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {!submitted && (
            <div className="px-6 pt-4">
              <div className="flex gap-1.5">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i <= step ? "bg-blue-600" : "bg-slate-100"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="px-6 py-6 overflow-y-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                  <FiCheck className="w-7 h-7" />
                </div>
                <p className="text-sm text-slate-600 mb-6">
                  Thanks, {form.name.split(" ")[0] || "friend"}! We&apos;ll text or call{" "}
                  <span className="font-semibold text-slate-900">{form.phone}</span> within one
                  business day with your quote for{" "}
                  <span className="font-semibold text-slate-900">{form.service}</span>.
                </p>
                <a href={phoneTel} className="text-sm font-bold text-blue-700 hover:underline">
                  Need it faster? Call us at {phoneNumber} →
                </a>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {form.notes && (
                      <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-semibold">
                        {form.notes}
                      </div>
                    )}
                    <p className="text-sm font-bold text-slate-900 mb-3">What do you need?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {displayServices.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setForm({ ...form, service: s })}
                          className={`text-left px-3.5 py-3 rounded-xl text-xs font-semibold border transition-all ${
                            form.service === s
                              ? "bg-blue-700 text-white border-blue-700"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-900 mb-3">When do you need it?</p>
                      <div className="space-y-2">
                        {URGENCY_OPTIONS.map((u) => (
                          <button
                            key={u}
                            type="button"
                            onClick={() => setForm({ ...form, urgency: u })}
                            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold border transition-all ${
                              form.urgency === u
                                ? "bg-blue-700 text-white border-blue-700"
                                : "bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-300"
                            }`}
                          >
                            {u}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="relative">
                      <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Property address (optional)"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.form
                    key="step2"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <p className="text-sm font-bold text-slate-900 mb-1">
                      Almost done — where should we send it?
                    </p>

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

                    <div className="relative">
                      <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input
                        type="email"
                        placeholder="Email (optional)"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <textarea
                      rows={2}
                      placeholder="Anything else we should know? (optional)"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />

                    <button type="submit" className="hidden" aria-hidden="true" />
                  </motion.form>
                )}
              </AnimatePresence>
            )}
          </div>

          {!submitted && (
            <div className="px-6 pb-6 pt-2 flex items-center gap-3 border-t border-slate-100 mt-auto">
              {step > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-900 px-4 py-3 transition-colors"
                >
                  <FiArrowLeft className="w-4 h-4" /> Back
                </button>
              )}

              {step < TOTAL_STEPS - 1 ? (
                <motion.button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed}
                  whileHover={{ scale: canProceed ? 1.02 : 1 }}
                  whileTap={{ scale: canProceed ? 0.98 : 1 }}
                  className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  Continue <FiArrowRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || !form.name || !form.phone}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  {loading ? "Sending..." : (
                    <>
                      Get My Free Quote <FiArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}