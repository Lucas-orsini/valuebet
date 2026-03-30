"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation } from "@/lib/data";
import type { Testimonial } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 h-14 flex items-center transition-all duration-200",
        scrolled
          ? "border-b border-white/[0.06] bg-[#09090b]/90 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-zinc-100 tracking-tight">
            Value Bet AI
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item: { name: string; href: string }) => (
            <a
              key={item.name}
              href={item.href}
              className="px-3 h-8 flex items-center text-sm text-zinc-400 hover:text-zinc-100 rounded-md hover:bg-white/[0.04] transition-colors duration-150"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="#"
            className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors px-3"
          >
            Connexion
          </a>
          <button className="h-8 px-4 rounded-md bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium transition-colors duration-150">
            Commencer
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-zinc-100"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-14 inset-x-0 bg-[#111] border-b border-white/[0.06] p-4 md:hidden"
        >
          <nav className="flex flex-col gap-1">
            {navigation.map((item: { name: string; href: string }) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm text-zinc-400 hover:text-zinc-100 rounded-md hover:bg-white/[0.04] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/[0.06]">
            <a href="#" className="text-sm text-zinc-400 hover:text-zinc-100 px-3 py-2">
              Connexion
            </a>
            <button className="h-9 px-4 rounded-md bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium transition-colors">
              Commencer
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
