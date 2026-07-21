"use client";
import React from "react";
import { motion } from "framer-motion";

interface CtaBannerProps {
  title: string;
  description: string;
  buttonText: string;
}

const CtaBanner: React.FC<CtaBannerProps> = ({
  title,
  description,
  buttonText,
}) => {
  return (
    <div className="py-16">
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-8 md:p-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-4"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-blue-900 font-bold px-8 py-4 rounded-full inline-block"
        >
          {buttonText}
        </motion.a>
      </div>
    </div>
  );
};

export default CtaBanner;
