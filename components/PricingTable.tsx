"use client";
import React from "react";
import { motion } from "framer-motion";

interface PricingOption {
  service: string;
  details: string;
  price: string;
}

interface PricingTableProps {
  title: string;
  description: string;
  pricingOptions: PricingOption[];
}

const PricingTable: React.FC<PricingTableProps> = ({
  title,
  description,
  pricingOptions,
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gray-700 max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="text-left py-4 px-6">Service</th>
              <th className="text-left py-4 px-6">Details</th>
              <th className="text-right py-4 px-6">Price</th>
            </tr>
          </thead>
          <tbody>
            {pricingOptions.map((option, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${index % 2 === 0 ? "bg-white" : "bg-blue-50"}`}
              >
                <td className="py-4 px-6 border-b border-gray-200 font-medium">
                  {option.service}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 text-gray-700">
                  {option.details}
                </td>
                <td className="py-4 px-6 border-b border-gray-200 text-right font-bold text-blue-900">
                  {option.price}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingTable;
