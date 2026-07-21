"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube,
} from "react-icons/fi";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center mb-6"
            >
              <div className="bg-white text-blue-700 font-bold text-xl px-3 py-2 rounded mr-2">
                SW
              </div>
              <span className="text-xl font-bold">ShineWindows</span>
            </motion.div>
            <p className="text-gray-300 mb-6">
              Professional window cleaning services for residential and
              commercial properties. Bringing clarity to your world since 2010.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ y: -5 }}
                className="text-gray-300 hover:text-white text-xl"
              >
                <FiFacebook />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -5 }}
                className="text-gray-300 hover:text-white text-xl"
              >
                <FiTwitter />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -5 }}
                className="text-gray-300 hover:text-white text-xl"
              >
                <FiInstagram />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -5 }}
                className="text-gray-300 hover:text-white text-xl"
              >
                <FiLinkedin />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -5 }}
                className="text-gray-300 hover:text-white text-xl"
              >
                <FiYoutube />
              </motion.a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <motion.a
                  href="/services"
                  whileHover={{ x: 5 }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Residential Cleaning
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="/services"
                  whileHover={{ x: 5 }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Commercial Cleaning
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="/services"
                  whileHover={{ x: 5 }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Pressure Washing
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="/services"
                  whileHover={{ x: 5 }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Regular Maintenance
                </motion.a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <motion.a
                  href="/"
                  whileHover={{ x: 5 }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="/about"
                  whileHover={{ x: 5 }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="/contact"
                  whileHover={{ x: 5 }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="/testimonials"
                  whileHover={{ x: 5 }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Testimonials
                </motion.a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <motion.a
                  href="/privacy-policy"
                  whileHover={{ x: 5 }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="/terms-of-service"
                  whileHover={{ x: 5 }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="/sitemap"
                  whileHover={{ x: 5 }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sitemap
                </motion.a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} ShineWindows. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <motion.a
              href="/privacy-policy"
              whileHover={{ y: -2 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="/terms-of-service"
              whileHover={{ y: -2 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="/sitemap"
              whileHover={{ y: -2 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Sitemap
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
