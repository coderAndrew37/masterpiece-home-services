"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiCheck, FiX } from "react-icons/fi";

interface ComparisonItem {
  feature: string;
  shine: boolean | string;
  competitors: boolean | string;
}

interface ComparisonTableProps {
  data: ComparisonItem[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="text-left py-4 px-6">Feature</th>
            <th className="text-center py-4 px-6">Masterpiece</th>
            <th className="text-center py-4 px-6">Competitors</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${index % 2 === 0 ? "bg-white" : "bg-blue-50"}`}
            >
              <td className="py-4 px-6 border-b border-gray-200 font-medium">
                {item.feature}
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-center">
                {item.shine === true ? (
                  <div className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center mx-auto">
                    <FiCheck className="text-xl" />
                  </div>
                ) : item.shine === false ? (
                  <div className="bg-red-100 text-red-800 w-8 h-8 rounded-full flex items-center justify-center mx-auto">
                    <FiX className="text-xl" />
                  </div>
                ) : (
                  <span className="text-blue-900 font-bold">{item.shine}</span>
                )}
              </td>
              <td className="py-4 px-6 border-b border-gray-200 text-center">
                {item.competitors === true ? (
                  <div className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center mx-auto">
                    <FiCheck className="text-xl" />
                  </div>
                ) : item.competitors === false ? (
                  <div className="bg-red-100 text-red-800 w-8 h-8 rounded-full flex items-center justify-center mx-auto">
                    <FiX className="text-xl" />
                  </div>
                ) : (
                  <span className="text-gray-700">{item.competitors}</span>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
