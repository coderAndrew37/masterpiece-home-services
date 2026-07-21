// src/components/Header.js
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiMenu, FiPhone, FiX } from "react-icons/fi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Why Us", href: "/why-us" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Gallery", href: "/gallery" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
          <div className="bg-blue-700 text-white font-bold text-xl px-3 py-2 rounded mr-2">
            SW
          </div>
          <span className="text-xl font-bold text-blue-900">ShineWindows</span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ y: -2 }}
              className="text-blue-900 font-medium hover:text-blue-700 transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-full flex items-center"
          >
            <FiPhone className="mr-2" /> Get Quote
          </motion.a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-blue-900 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-blue-900 font-medium hover:text-blue-700 py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full text-center"
            >
              <span className="flex items-center justify-center">
                <FiPhone className="mr-2" /> Get Quote
              </span>
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
