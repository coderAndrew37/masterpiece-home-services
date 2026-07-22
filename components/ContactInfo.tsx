"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiClock, FiAlertCircle } from "react-icons/fi";

export default function ContactInfo(): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white rounded-3xl shadow-xl p-8 sm:p-10 border border-slate-800 flex flex-col justify-between h-full"
    >
      <div>
        <h3 className="text-2xl font-extrabold mb-8 border-b border-slate-800 pb-4 text-white">
          Get In Touch
        </h3>

        <div className="space-y-6">
          {/* Phone */}
          <div className="flex items-start">
            <div className="bg-blue-700/80 p-3 rounded-2xl mr-4 shrink-0 text-white shadow-sm">
              <FiPhone className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                Phone & Direct Line
              </h4>
              <a
                href="tel:2505550199"
                className="text-lg font-bold text-white hover:text-blue-400 transition-colors"
              >
                (250) 555-0199
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start">
            <div className="bg-blue-700/80 p-3 rounded-2xl mr-4 shrink-0 text-white shadow-sm">
              <FiMail className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                Email Inquiries
              </h4>
              <a
                href="mailto:info@masterpiecehomeservices.ca"
                className="text-base font-semibold text-white hover:text-blue-400 transition-colors break-all"
              >
                info@masterpiecehomeservices.ca
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start">
            <div className="bg-blue-700/80 p-3 rounded-2xl mr-4 shrink-0 text-white shadow-sm">
              <FiMapPin className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                Primary Service Region
              </h4>
              <p className="text-base font-medium text-slate-200">
                Kamloops & The Thompson-Okanagan, BC
              </p>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="flex items-start">
            <div className="bg-blue-700/80 p-3 rounded-2xl mr-4 shrink-0 text-white shadow-sm">
              <FiClock className="text-xl" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                Business Hours
              </h4>
              <ul className="space-y-1 text-sm font-medium text-slate-300">
                <li>Monday – Friday: 7:30 AM – 6:00 PM</li>
                <li>Saturday: 8:30 AM – 4:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency / Rush Dispatch Box */}
      <div className="mt-10 pt-6 border-t border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <FiAlertCircle className="text-amber-400 text-lg" />
          <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Urgent Eavestrough or Storm Cleaning?
          </h4>
        </div>
        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          Need immediate post-storm clearance or same-week listing prep? Give our team a direct call.
        </p>
        <a
          href="tel:2505550199"
          className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md"
        >
          Call Dispatch: (250) 555-0199
        </a>
      </div>
    </motion.div>
  );
}