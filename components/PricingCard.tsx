"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

interface PricingPlan {
  title: string;
  description: string;
  price: string;
  features: string[];
  popular: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  isCommercial: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, isCommercial }) => {
  const isCustom = plan.price.toLowerCase().includes("custom");

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`relative rounded-xl overflow-hidden shadow-lg ${
        plan.popular ? "border-2 border-blue-600" : "border border-gray-200"
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-1 rounded-full text-sm font-bold">
          MOST POPULAR
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 text-center">
        <h3 className="text-xl font-bold text-white">{plan.title}</h3>
        <p className="text-blue-200">{plan.description}</p>
      </div>

      <div className="p-6 bg-white">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-blue-900 mb-1">
            {plan.price}
            {!isCustom && (
              <span className="text-base font-bold text-blue-700 ml-1.5 align-top">
                CAD
              </span>
            )}
          </div>
          {isCommercial && !isCustom && (
            <p className="text-gray-600 text-sm">per month (min. 3 months)</p>
          )}
          {!isCommercial && !isCustom && (
            <p className="text-gray-600 text-sm">one-time service</p>
          )}
        </div>

        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                <FiCheck className="text-blue-700" />
              </div>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`block text-center py-3 px-6 rounded-lg font-bold ${
            plan.popular
              ? "bg-blue-700 text-white hover:bg-blue-800"
              : "bg-blue-100 text-blue-900 hover:bg-blue-200"
          }`}
        >
          {isCustom ? "Get Custom Quote" : "Select Plan"}
        </motion.a>
      </div>
    </motion.div>
  );
};

export default PricingCard;