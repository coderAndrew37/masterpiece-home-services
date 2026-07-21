"use client";
import { motion } from "framer-motion";
import type { JSX } from "react";
import { FiBriefcase, FiCalendar, FiDroplet, FiHome } from "react-icons/fi";

export interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <FiHome className="text-3xl text-blue-700" />,
    title: "Residential Cleaning",
    description:
      "Professional window cleaning for homes, apartments, and condos. We ensure streak-free results and attention to detail.",
  },
  {
    icon: <FiBriefcase className="text-3xl text-blue-700" />,
    title: "Commercial Cleaning",
    description:
      "Office buildings, retail spaces, and commercial properties. We work around your schedule with minimal disruption.",
  },
  {
    icon: <FiDroplet className="text-3xl text-blue-700" />,
    title: "Pressure Washing",
    description:
      "Exterior cleaning for sidewalks, driveways, decks, and building exteriors to restore their original beauty.",
  },
  {
    icon: <FiCalendar className="text-3xl text-blue-700" />,
    title: "Regular Maintenance",
    description:
      "Scheduled cleaning plans to keep your property looking its best all year round at discounted rates.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Services = (): JSX.Element => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
          >
            Our Professional Services
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            className="h-1 bg-blue-700 mx-auto mb-6"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            We offer a comprehensive range of window cleaning and exterior
            maintenance services to keep your property looking its best.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -10 }}
              className="bg-gray-50 rounded-xl p-8 shadow-md hover:shadow-xl transition-all"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
