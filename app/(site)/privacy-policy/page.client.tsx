'use client';

import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';

interface PrivacyPolicyClientProps {
  children: React.ReactNode;
}

export default function PrivacyPolicyClient({
  children,
}: PrivacyPolicyClientProps) {
  return (
    <PageTransition>
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-blue-200 max-w-3xl mx-auto"
        >
          Last Updated: January 1, 2023
        </motion.p>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8 md:p-12">{children}</div>
        </motion.div>
      </div>
    </PageTransition>
  );
}