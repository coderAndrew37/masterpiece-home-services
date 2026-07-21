"use client";

import React from "react";
import ProcessTimeline, { ProcessStep } from "@/components/ProcessTimeline";

const masterpieceSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Request Your Fast Estimate",
    description:
      "Fill out our simple contact form or call us directly. We assess your property and provide transparent, guaranteed pricing with zero hidden fees.",
  },
  {
    step: 2,
    title: "Schedule Your Service",
    description:
      "Pick a date that fits your calendar. We send automated reminders before arrival so you know exactly when our crew will be at your door.",
  },
  {
    step: 3,
    title: "The Masterpiece Transformation",
    description:
      "Our background-checked crew performs pure-water window detailing, eavestrough clearing, or seasonal lighting with $5M liability protection.",
  },
  {
    step: 4,
    title: "100% Satisfaction Walkthrough",
    description:
      "We inspect every glass pane and gutter flow line with you before leaving to ensure your home looks completely immaculate.",
  },
];

export default function HomeProcess(): React.JSX.Element {
  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200/60 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-2">
            Seamless & Reliable
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            How Working With Us Works
          </h2>
          <p className="text-slate-600 text-base">
            From your first estimate to the final inspection, we make exterior home care effortless.
          </p>
        </div>

        <ProcessTimeline steps={masterpieceSteps} />
      </div>
    </section>
  );
}