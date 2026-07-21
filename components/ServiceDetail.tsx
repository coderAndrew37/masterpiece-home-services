import React from "react";
import { motion } from "framer-motion";
import { FiHome, FiBriefcase, FiDroplet, FiCalendar } from "react-icons/fi";

interface ServiceDetailProps {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({
  title,
  description,
  features,
  icon,
}) => {
  const getIcon = () => {
    switch (icon) {
      case "FiHome":
        return <FiHome className="text-4xl text-blue-700" />;
      case "FiBriefcase":
        return <FiBriefcase className="text-4xl text-blue-700" />;
      case "FiDroplet":
        return <FiDroplet className="text-4xl text-blue-700" />;
      case "FiCalendar":
        return <FiCalendar className="text-4xl text-blue-700" />;
      default:
        return <FiHome className="text-4xl text-blue-700" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-8">
        <div className="mb-6">{getIcon()}</div>
        <h3 className="text-2xl font-bold text-blue-900 mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">{description}</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
              </div>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ServiceDetail;
