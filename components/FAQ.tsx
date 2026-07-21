"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title: string;
  faqs: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ title, faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="mb-4 border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              className="w-full text-left p-6 bg-white hover:bg-gray-50 transition-colors flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-medium text-blue-900">
                {faq.question}
              </h3>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                className="text-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </button>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: openIndex === index ? "auto" : 0,
                opacity: openIndex === index ? 1 : 0,
              }}
              className="overflow-hidden"
            >
              <div className="p-6 pt-0 text-gray-700 bg-blue-50">
                {faq.answer}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
