"use client";

import React from "react";
import { motion } from "framer-motion";

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

// ProcessTimeline.tsx
export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <>
      {/* Desktop: horizontal, all steps visible at once */}
      <div className="hidden md:grid md:grid-cols-4 gap-6 relative">
        <div className="absolute top-6 left-0 right-0 h-1 bg-blue-200 mx-[12.5%]" />
        {steps.map((step, index) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="relative flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 bg-blue-700 ring-4 ring-slate-50 shadow-md rounded-full flex items-center justify-center text-white font-black text-base z-10 mb-4">
              {step.step}
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              {step.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mobile: keep your existing vertical zigzag */}
      <div className="md:hidden relative max-w-lg mx-auto px-4">
        <div className="absolute left-6 top-4 bottom-4 w-1 bg-blue-200" />
        <div className="space-y-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="relative pl-14"
            >
              <div className="absolute left-0 top-0 w-12 h-12 bg-blue-700 ring-4 ring-slate-50 rounded-full flex items-center justify-center text-white font-black text-base z-10">
                {step.step}
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}