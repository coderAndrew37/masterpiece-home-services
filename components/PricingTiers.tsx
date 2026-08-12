// src/components/PricingTiers.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PricingCard from "@/components/PricingCard";
import type { PricingPlan } from "@/types/pricing";

interface PricingTiersProps {
  plans: PricingPlan[];
}

export default function PricingTiers({ plans }: PricingTiersProps): React.JSX.Element {
  if (!plans || plans.length === 0) return <></>;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-2">
            Clear, Honest Estimates
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-600 text-base">
            No hidden fees, ever. All prices shown in Canadian dollars (CAD).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <PricingCard plan={plan} isCommercial={false} />
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/pricing" className="text-sm font-bold text-blue-700 hover:underline">
            View full pricing, commercial rates & bundles →
          </Link>
        </div>
      </div>
    </section>
  );
}