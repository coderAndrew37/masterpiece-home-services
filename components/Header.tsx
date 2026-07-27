"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiPhone, FiX, FiChevronRight } from "react-icons/fi";
import { Sparkles } from "lucide-react";
import { phoneTel } from "@/lib/constants";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Why Us", href: "/why-us" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Gallery", href: "/gallery" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export default function Header(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-100"
            : "bg-gradient-to-b from-slate-900/40 via-slate-900/10 to-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-blue-700 group-hover:bg-blue-800 text-white font-extrabold text-lg px-2.5 py-1.5 rounded-xl shadow-sm transition-colors flex items-center gap-1">
              <span>MHS</span>
            </div>
            <div className="flex flex-col">
              <span
                className={`text-xl font-black tracking-tight leading-none transition-colors ${
                  scrolled ? "text-slate-900" : "text-white md:text-slate-900 lg:text-white drop-shadow-sm"
                }`}
              >
                MASTERPIECE
              </span>
              <span
                className={`text-[10px] font-bold tracking-widest uppercase ${
                  scrolled ? "text-blue-700" : "text-blue-200 md:text-blue-700 lg:text-blue-200"
                }`}
              >
                Home Services
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-blue-700 bg-blue-50/80"
                      : scrolled
                      ? "text-slate-700 hover:text-blue-700 hover:bg-slate-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-blue-700/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            >
              <FiPhone className="w-4 h-4" />
              <span>Get Free Quote</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            onClick={() => setIsOpen(true)}
            className={`lg:hidden p-2.5 rounded-xl transition-colors ${
              scrolled
                ? "bg-slate-100 text-slate-900 hover:bg-slate-200"
                : "bg-white/20 text-white backdrop-blur-md hover:bg-white/30"
            }`}
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Backdrop & Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 lg:hidden"
            />

            {/* Sliding Sidebar */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 lg:hidden flex flex-col justify-between shadow-2xl border-l border-slate-100"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-700 text-white font-extrabold text-sm px-2 py-1 rounded-lg">
                    MHS
                  </div>
                  <span className="font-extrabold text-slate-900 tracking-tight">
                    Masterpiece
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Menu Links */}
              <div className="p-6 overflow-y-auto flex-1 space-y-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-bold transition-all ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span>{link.name}</span>
                      <FiChevronRight
                        className={`w-4 h-4 ${
                          isActive ? "text-blue-700" : "text-slate-400"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Drawer Footer CTA */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 bg-blue-100/70 px-3 py-2 rounded-lg">
                  <Sparkles className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Serving Kamloops & Okanagan Region</span>
                </div>

                <a
  href={phoneTel}
  onClick={() => setIsOpen(false)}
  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-700/20 flex items-center justify-center gap-2 transition-all"
>
  <FiPhone className="w-4 h-4" />
  <span>Request Free Quote</span>
</a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}