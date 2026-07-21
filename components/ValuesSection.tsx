"use client";
import React from "react";
import { motion } from "framer-motion";

interface Value {
  title: string;
  description: string;
}

interface ValuesSectionProps {
  title: string;
  values: Value[];
}

const ValuesSection: React.FC<ValuesSectionProps> = ({ title, values }) => {
  return (
    <div className="my-20">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-blue-900 mb-4"
        >
          {title}
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          className="h-1 bg-blue-700 mx-auto mb-6"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <div className="text-blue-900 text-5xl font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                {value.title}
              </h3>
              <p className="text-gray-700">{value.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ValuesSection;
