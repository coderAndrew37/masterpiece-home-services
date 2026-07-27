"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { phoneNumber, phoneTel } from "@/lib/constants";

interface FooterLink {
  name: string;
  href: string;
}

const serviceLinks: FooterLink[] = [
  { name: "Window Cleaning", href: "/services#windows" },
  { name: "Eavestrough & Gutter Care", href: "/services#gutters" },
  { name: "Full House Soft Wash", href: "/services#full-house" },
  { name: "Pressure Washing", href: "/services#pressure-washing" },
  { name: "Christmas Light Installation", href: "/services#seasonal" },
];

const quickLinks: FooterLink[] = [
  { name: "Home", href: "/" },
  { name: "Why Us", href: "/why-us" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Gallery", href: "/gallery" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

const legalLinks: FooterLink[] = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms-of-service" },
  { name: "Sitemap", href: "/sitemap" },
];

export default function Footer(): React.JSX.Element {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Column 1: Brand Info & Socials */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
              <div className="bg-blue-700 group-hover:bg-blue-800 text-white font-black text-lg px-2.5 py-1.5 rounded-xl shadow-md transition-colors">
                MHS
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight leading-none text-white">
                  MASTERPIECE
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-blue-400">
                  Home Services
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Premium exterior home care and seasonal maintenance services across Kamloops and the Thompson-Okanagan. Delivering streak-free window detailing, eavestrough clearing, soft washing, and custom holiday light installations.
            </p>

            {/* Direct Contact Details */}
            <div className="space-y-2 mb-6 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <FiMapPin className="text-blue-400 shrink-0" />
                <span>Kamloops & Thompson-Okanagan, BC</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FiPhone className="text-blue-400 shrink-0" />
                <a href={phoneTel} className="hover:text-blue-400 transition-colors">
                {phoneNumber}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <FiMail className="text-blue-400 shrink-0" />
                <a href="mailto:info@masterpiecehomeservices.ca" className="hover:text-blue-400 transition-colors">
                  info@masterpiecehomeservices.ca
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3">
              {[
                { icon: <FiFacebook />, href: "https://facebook.com", label: "Facebook" },
                { icon: <FiInstagram />, href: "https://instagram.com", label: "Instagram" },
                { icon: <FiLinkedin />, href: "https://linkedin.com", label: "LinkedIn" },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-700 hover:border-blue-700 transition-all duration-200"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Our Services */}
          <div>
            <h3 className="text-base font-extrabold text-white uppercase tracking-wider mb-6">
              Services
            </h3>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <motion.span
                      whileHover={{ x: 4 }}
                      className="inline-block text-slate-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-base font-extrabold text-white uppercase tracking-wider mb-6">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <motion.span
                      whileHover={{ x: 4 }}
                      className="inline-block text-slate-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal Links */}
          <div>
            <h3 className="text-base font-extrabold text-white uppercase tracking-wider mb-6">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <motion.span
                      whileHover={{ x: 4 }}
                      className="inline-block text-slate-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>
            &copy; {currentYear} Masterpiece Home Services. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-slate-300 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}