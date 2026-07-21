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

export default function ProcessTimeline({ steps }: ProcessTimelineProps): React.JSX.Element {
  return (
    <div className="relative max-w-5xl mx-auto px-4">
      {/* Vertical Timeline Bar */}
      <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 bg-blue-200 transform md:-translate-x-1/2" />

      <div className="space-y-12 md:space-y-0">
        {steps.map((step: ProcessStep, index: number) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={`relative flex flex-col md:flex-row items-center ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Card Container */}
              <div className="w-full md:w-1/2 pl-14 md:pl-0 md:p-6">
                <div
                  className={`bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow ${
                    isEven ? "md:mr-8" : "md:ml-8"
                  }`}
                >
                  <span className="text-blue-700 font-extrabold text-xs tracking-wider uppercase mb-1 block">
                    Step 0{step.step}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Numbered Center Circle */}
              <div className="absolute left-6 md:left-1/2 top-6 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 z-10">
                <div className="w-12 h-12 bg-blue-700 ring-4 ring-white shadow-md rounded-full flex items-center justify-center text-white font-black text-base">
                  {step.step}
                </div>
              </div>

              {/* Spacer column for desktop alignment */}
              <div className="hidden md:block md:w-1/2 md:p-6" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}