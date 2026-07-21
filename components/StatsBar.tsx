'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiCheckCircle, FiStar, FiAward } from 'react-icons/fi';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const stats: StatItem[] = [
  {
    icon: <FiShield className="w-6 h-6 text-blue-700" />,
    value: '$5M Covered',
    label: 'Fully Insured & WCB Certified',
  },
  {
    icon: <FiStar className="w-6 h-6 text-amber-500" />,
    value: '5.0 Stars',
    label: 'Top-Rated Local Service',
  },
  {
    icon: <FiCheckCircle className="w-6 h-6 text-emerald-600" />,
    value: '100% Guarantee',
    label: 'Spotless Satisfaction Promise',
  },
  {
    icon: <FiAward className="w-6 h-6 text-blue-700" />,
    value: 'Year-Round',
    label: 'Full Exterior & Seasonal Care',
  },
];

export default function StatsBar(): React.JSX.Element {
  return (
    <section className="bg-white border-y border-slate-200/80 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat: StatItem, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <div className="p-3 bg-slate-100 rounded-2xl shrink-0">
                {stat.icon}
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                  {stat.value}
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}