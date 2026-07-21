"use client";
import React from "react";
import { motion } from "framer-motion";

interface ServiceBenefitsProps {
  title: string;
  benefits: string[];
}

const ServiceBenefits: React.FC<ServiceBenefitsProps> = ({
  title,
  benefits,
}) => {
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
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-700"
          >
            <div className="flex items-start">
              <div className="bg-blue-700 text-white p-2 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-lg text-blue-900 font-medium">{benefit}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServiceBenefits;
