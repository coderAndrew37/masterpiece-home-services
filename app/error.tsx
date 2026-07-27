'use client';

import { phoneNumber, phoneTel } from '@/lib/constants';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import { FiAlertTriangle, FiHome, FiRefreshCw } from 'react-icons/fi';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Runtime Error:', error);
  }, [error]);

  return (
    <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center py-20 px-4">
      <div className="container mx-auto max-w-xl text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl space-y-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
            <FiAlertTriangle className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Something Went Wrong
            </h1>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              We encountered an unexpected error loading this page section. Try refreshing or return to the main dashboard.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-extrabold px-6 py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-blue-700/20 active:scale-[0.98]"
            >
              <FiRefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3.5 rounded-2xl text-sm transition-all"
            >
              <FiHome className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
            Need urgent help? Call us directly at{' '}
            <a href={phoneTel} className="font-bold text-blue-700 hover:underline">
              {phoneNumber}
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}