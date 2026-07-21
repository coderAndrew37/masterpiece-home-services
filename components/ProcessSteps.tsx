'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiCalendar, FiSmile } from 'react-icons/fi';
import { Sparkles } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Request a Free Quote',
    description: 'Fill out our 60-second form or call us directly. We provide fast, transparent pricing with no hidden fees.',
    icon: <FiFileText className="w-6 h-6 text-blue-700" />,
  },
  {
    number: '02',
    title: 'Pick Your Service Date',
    description: 'Choose a time that fits your schedule. We send appointment reminders and arrive fully equipped.',
    icon: <FiCalendar className="w-6 h-6 text-blue-700" />,
  },
  {
    number: '03',
    title: 'Enjoy Your Masterpiece Home',
    description: 'Our certified crew completes the job safely and inspects every detail with our 100% satisfaction guarantee.',
    icon: <FiSmile className="w-6 h-6 text-blue-700" />,
  },
];

export default function ProcessSteps(): React.JSX.Element {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/20">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Simple & Frictionless</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            How Our Service Works
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Getting your home cleaned or holiday lights installed is effortless from start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step: Step, idx: number) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-8 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-600 tracking-tighter">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}