"use client";
import React from "react";
import { motion } from "framer-motion";

interface ServiceAreasProps {
  title: string;
  areas: string[];
}

const ServiceAreas: React.FC<ServiceAreasProps> = ({ title, areas }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-blue-50 rounded-xl p-6 mt-12"
    >
      <h3 className="text-xl font-bold text-blue-900 mb-4">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {areas.map((area, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="bg-white text-blue-900 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
          >
            {area}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default ServiceAreas;
