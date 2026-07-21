import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";

const ContactInfo: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-blue-900 to-blue-800 text-white rounded-xl shadow-xl p-8"
    >
      <h3 className="text-2xl font-bold mb-8 border-b border-blue-700 pb-4">
        Get In Touch
      </h3>

      <div className="space-y-6">
        <div className="flex items-start">
          <div className="bg-blue-700 p-3 rounded-full mr-4">
            <FiPhone className="text-xl" />
          </div>
          <div>
            <h4 className="text-lg font-bold mb-1">Phone</h4>
            <p className="text-blue-200">+1 (555) 123-4567</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-blue-700 p-3 rounded-full mr-4">
            <FiMail className="text-xl" />
          </div>
          <div>
            <h4 className="text-lg font-bold mb-1">Email</h4>
            <p className="text-blue-200">info@shinewindows.ca</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-blue-700 p-3 rounded-full mr-4">
            <FiMapPin className="text-xl" />
          </div>
          <div>
            <h4 className="text-lg font-bold mb-1">Location</h4>
            <p className="text-blue-200">
              123 Clean Street, Toronto, ON M1A 1A1
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="bg-blue-700 p-3 rounded-full mr-4">
            <FiClock className="text-xl" />
          </div>
          <div>
            <h4 className="text-lg font-bold mb-1">Business Hours</h4>
            <ul className="space-y-1">
              <li className="text-blue-200">
                Monday-Friday: 8:00 AM - 6:00 PM
              </li>
              <li className="text-blue-200">Saturday: 9:00 AM - 4:00 PM</li>
              <li className="text-blue-200">Sunday: Closed</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-blue-700">
        <h4 className="text-lg font-bold mb-4">Emergency Service</h4>
        <p className="text-blue-200 mb-4">
          Need immediate assistance? Call our 24/7 emergency line:
        </p>
        <div className="flex items-center">
          <div className="bg-red-600 text-white px-4 py-2 rounded-full font-bold mr-4">
            +1 (555) 987-6543
          </div>
          <span className="text-blue-200 text-sm">Available 24/7</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfo;
