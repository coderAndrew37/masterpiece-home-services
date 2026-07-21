'use client';

import { motion } from 'framer-motion';
import ComparisonTable from '@/components/ComparisonTable';
import CtaBanner from '@/components/CtaBanner';
import PageTransition from '@/components/PageTransition';
import ProcessTimeline from '@/components/ProcessTimeline';

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface ComparisonItem {
  feature: string;
  shine: boolean;
  competitors: boolean | string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface WhyUsClientProps {
  benefits: Benefit[];
  comparisonData: ComparisonItem[];
  processSteps: ProcessStep[];
}

export default function WhyUsClient({
  benefits,
  comparisonData,
  processSteps,
}: WhyUsClientProps) {
  return (
    <PageTransition>
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Why Choose Shine Windows
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-blue-200 max-w-3xl mx-auto"
        >
          The professional choice for exceptional results and service
        </motion.p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-blue-900 mb-6"
          >
            Our Commitment to Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-700 text-lg"
          >
            At Shine Windows, we don&apos;t just clean windows - we transform
            properties and exceed expectations. Our commitment to quality,
            safety, and customer satisfaction sets us apart in the industry.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-700"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <div className="bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-700">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-blue-900 mb-12 text-center"
          >
            How We Compare
          </motion.h2>
          <ComparisonTable data={comparisonData} />
        </div>

        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-blue-900 mb-12 text-center"
          >
            Our Proven Process
          </motion.h2>
          <ProcessTimeline steps={processSteps} />
        </div>

        <CtaBanner
          title="Experience the Shine Windows Difference"
          description="Join thousands of satisfied customers who trust us with their properties"
          buttonText="Schedule Your Service"
        />
      </div>
    </PageTransition>
  );
}