"use client";

import React, { useState } from "react";
import { FiArrowRight, FiHelpCircle, FiPhoneCall, FiSend } from "react-icons/fi";
import { toast } from "sonner";

export default function CustomQuoteBanner(): React.JSX.Element {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowForm(false);
      setFormData({ name: "", phone: "", description: "" });

      toast.success("Custom Request Received!", {
        description: "Our estimator will call you back within 2 business hours.",
        duration: 5000,
      });
    }, 800);
  };

  return (
    <section className="relative my-20 overflow-hidden rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 p-8 sm:p-12 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Direct Call & Messaging */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <FiHelpCircle className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Custom Services & Special Projects</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Don&apos;t See Exactly What <span className="text-blue-400">You Need?</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              From high-reach post-construction cleans to custom holiday setups or multi-surface commercial properties—if it needs cleaning, we&apos;ve got you covered.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Direct Call Button */}
              <a
                href="tel:2505550199"
                className="inline-flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-600 text-white font-extrabold px-7 py-4 rounded-2xl text-base transition-all shadow-lg shadow-blue-700/30 active:scale-[0.98]"
              >
                <FiPhoneCall className="w-5 h-5 animate-bounce" />
                <span>Call Directly: (250) 555-0199</span>
              </a>

              {/* Request Custom Call Back Toggle */}
              <button
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold px-6 py-4 rounded-2xl text-sm transition-all"
              >
                <span>{showForm ? "Hide Request Form" : "Request Custom Call Back"}</span>
                <FiArrowRight className={`w-4 h-4 transition-transform ${showForm ? "rotate-90" : ""}`} />
              </button>
            </div>
          </div>

          {/* Right Column: Quick Call Back Form (Collapsible/Interactive) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="mb-4">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-1">
                  Fast 2-Hour Response
                </span>
                <h3 className="text-xl font-bold text-white">
                  Describe Your Job
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Full Name *"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Phone Number *"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Briefly describe what you need cleaned or installed..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70"
                >
                  {loading ? (
                    "Sending Request..."
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      <span>Request Instant Callback</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}