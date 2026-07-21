"use client";
import React from "react";
import { motion } from "framer-motion";

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ steps }) => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform md:-translate-x-1/2"></div>

      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
          className={`relative mb-16 flex flex-col md:flex-row items-center ${
            index % 2 === 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="md:w-1/2 p-4">
            <div
              className={`bg-white p-6 rounded-lg shadow-lg ${
                index % 2 === 0 ? "md:mr-8" : "md:ml-8"
              }`}
            >
              <div className="text-blue-700 font-bold text-lg mb-2">
                Step {step.step}
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          </div>

          <div className="absolute left-0 md:left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 md:-translate-x-1/2">
            <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {step.step}
            </div>
          </div>

          <div className="md:w-1/2 p-4">
            <div className="h-32 md:hidden"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProcessTimeline;
