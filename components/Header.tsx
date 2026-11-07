"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiPhone, FiX, FiChevronRight, FiStar } from "react-icons/fi";
import { Sparkles } from "lucide-react";
import { phoneTel, phoneNumber } from "@/lib/constants";
import Image from "next/image";
import QuoteModal from "./NavQuoteModal";
import ThemeToggle from "./ThemeToggle";

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Work & Reviews", href: "/gallery" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export default function Header(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen || isQuoteOpen ? "hidden" : "unset";
  }, [isOpen, isQuoteOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-surface/95 backdrop-blur-md shadow-sm border-b border-border py-3"
            : "bg-gradient-to-b from-black/50 via-black/20 to-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src="/logo.png"
                alt="Masterpiece Home Services Logo"
                fill
                priority
                className="object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-xl font-black tracking-tight leading-none transition-colors ${
                  scrolled ? "text-foreground" : "text-white drop-shadow-sm"
                }`}
              >
                MASTERPIECE
              </span>
              <span
                className={`text-[10px] font-bold tracking-widest uppercase ${
                  scrolled ? "text-brand" : "text-blue-200"
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
                      ? "text-brand bg-brand/10"
                      : scrolled
                      ? "text-foreground-muted hover:text-brand hover:bg-surface-hover"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop: Toggle + phone + rating + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Phone & Rating (Hidden when scrolled for a cleaner look) */}
            <div className={`flex flex-col items-end transition-all duration-300 ${scrolled ? "hidden xl:flex" : "flex"}`}>
              <a
                href={phoneTel}
                className={`flex items-center gap-1.5 text-sm font-extrabold transition-colors ${
                  scrolled ? "text-foreground hover:text-brand" : "text-white hover:text-blue-200"
                }`}
              >
                <FiPhone className="w-3.5 h-3.5" />
                {phoneNumber}
              </a>
              <span
                className={`flex items-center gap-1 text-[11px] font-semibold ${
                  scrolled ? "text-foreground-muted" : "text-white/70"
                }`}
              >
                <FiStar className="w-3 h-3 fill-current text-amber-400" />
                5.0 · 200+ reviews
              </span>
            </div>

            <div className="h-6 w-px bg-border hidden xl:block" />

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setIsQuoteOpen(true)}
              className="bg-brand hover:bg-brand/90 text-brand-foreground px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-brand/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            >
              <span>Get Free Quote</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            onClick={() => setIsOpen(true)}
            className={`lg:hidden p-2.5 rounded-xl transition-colors ${
              scrolled
                ? "bg-surface border border-border text-foreground hover:bg-surface-hover"
                : "bg-white/20 text-white backdrop-blur-md hover:bg-white/30"
            }`}
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-surface z-50 lg:hidden flex flex-col justify-between shadow-2xl border-l border-border"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-brand text-brand-foreground font-extrabold text-sm px-2 py-1 rounded-lg">
                    MHS
                  </div>
                  <span className="font-extrabold text-foreground tracking-tight">
                    Masterpiece
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-colors"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

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
                          ? "bg-brand/10 text-brand"
                          : "text-foreground-muted hover:bg-surface-hover hover:text-foreground"
                      }`}
                    >
                      <span>{link.name}</span>
                      <FiChevronRight
                        className={`w-4 h-4 ${isActive ? "text-brand" : "text-foreground-muted"}`}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-border bg-background space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand bg-brand/10 px-3 py-2 rounded-lg mb-4">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Serving Kamloops & Okanagan Region</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setIsQuoteOpen(true);
                  }}
                  className="w-full bg-brand hover:bg-brand/90 text-brand-foreground font-bold py-3.5 rounded-xl shadow-lg shadow-brand/20 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Get Free Quote</span>
                </button>

                <a
                  href={phoneTel}
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-surface border border-border text-foreground font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-surface-hover"
                >
                  <FiPhone className="w-4 h-4" />
                  <span>Call {phoneNumber}</span>
                </a>
                
                {/* Mobile Theme Toggle Row */}
                <div className="flex items-center justify-between pt-4 border-t border-border mt-2">
                  <span className="text-sm font-semibold text-foreground-muted">Appearance</span>
                  <ThemeToggle />
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Quote Form Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </>
  );
}