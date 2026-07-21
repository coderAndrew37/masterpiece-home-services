"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiUsers, FiAward, FiThumbsUp } from "react-icons/fi";

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <FiCheckCircle className="text-3xl text-blue-700" />,
      title: "Quality Guaranteed",
      description:
        "We stand behind our work with a 100% satisfaction guarantee.",
    },
    {
      icon: <FiUsers className="text-3xl text-blue-700" />,
      title: "Experienced Team",
      description: "Our professionals have years of experience and training.",
    },
    {
      icon: <FiAward className="text-3xl text-blue-700" />,
      title: "Award Winning Service",
      description: "Recognized for excellence in customer service and results.",
    },
    {
      icon: <FiThumbsUp className="text-3xl text-blue-700" />,
      title: "Eco-Friendly Products",
      description: "We use environmentally safe cleaning solutions.",
    },
  ];

  const stats = [
    { value: 15, label: "Years Experience", suffix: "+" },
    { value: 5000, label: "Happy Customers", suffix: "+" },
    { value: 99, label: "Satisfaction Rate", suffix: "%" },
    { value: 24, label: "Hour Response", suffix: "h" },
  ];

  return (
    <section id="why-us" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-blue-900 mb-4"
          >
            Why Choose Us
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            viewport={{ once: true }}
            className="h-1 bg-blue-700 mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            We go above and beyond to ensure your complete satisfaction with
            every service we provide.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-blue-900 text-white p-8 rounded-xl"
            >
              <h3 className="text-2xl font-bold mb-6">Our Achievements</h3>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-4xl md:text-5xl font-bold mb-2"
                    >
                      {stat.value}
                      <span className="text-blue-500">{stat.suffix}</span>
                    </motion.div>
                    <div className="text-lg">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
