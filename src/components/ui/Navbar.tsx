"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
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
          <div className="w-8 h-8 rounded-lg  from-accent to-accent-light flex items-center justify-center">
            <svg
      className="w-full h-full"
      viewBox="-14 -14 94.48 80.94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      >
      <path
      stroke="#E5B830"
      strokeWidth="2"
      fill="#E5B830"
      d="M65.49,24.02c-.98-2.02-2.41-3.72-4.19-5.11l-1.61-1.25c-.35-3.05-2.22-5.95-4.38-8.11C48.6,2.82,39.24-.49,29.77.06c-7.39.43-14.46,3.13-19.96,8.11l-2.55,2.58C3.12,15.42.61,21.23.08,27.45c-.07.86-.14,1.61.05,2.47,4.25-9.8,11.04-15.91,21.98-16.26,5.19-.17,10.27.71,15.22,2.42-.31,2.22,0,4.35,1.12,6.24,1.65,2.77,4.86,4.14,7.99,3.4,1.62-.41,2.95-1.29,3.82-2.72l-1.62-.47c-2.26,1.87-5.67,1.56-7.42-.81-.99-1.34-1.23-3-1.02-4.6l1.89.79.61.79c1.2,1.21,2.81,1.64,4.4,1.51,1.75.83,3.43,1.48,5.27,1.95l5.33,1.37c-4.39,2.49-7.89,5.99-9.97,10.6,2.78-2.54,5.56-4.68,9.33-5.1,2.74-.22,5.51.76,5.9,3.57.14.98.02,1.89-.16,3.03,3.65-2.67,4.69-7.56,2.71-11.62ZM56.39,19.01c-1,1.13-3.41.46-4.97-.29l-5.73-2.72c-3.16-1.5-6.29-2.79-9.68-3.74-7.53-2.12-15.34-2.58-23.02-.98l1.49-1.31c6.17-4.59,13.85-6.83,21.56-6.15,3.93.35,7.57,1.58,11,3.46,3.17,1.74,6.55,4.44,8.65,7.38,1,1.4,1.83,3.11.72,4.35Z"
      />
      <path
      stroke="#E5B830"
      strokeWidth="2"
      fill="#E5B830"
      d="M24.18,42.26c-.97-2.28-1.06-4.75-.21-7.07,1.83-4.61,5.95-6.7,10.74-7.71-3.12-1.31-6.15-2.11-9.36-2.45-6.47-.66-12.65.26-17.9,4.2-2.34,1.76-4.13,4.02-5.39,6.66-.15.31-.32.57-.34.93,2.6-2.96,5.66-5.31,9.29-6.88,4.45-1.86,9.29-2.43,14.19-1.7-4.06,3.26-5.92,8.48-4.23,13.44.94,2.69,2.6,4.87,4.74,6.68,2.73,2.16,5.84,3.83,9.37,4.58-4.5-2.59-8.89-5.87-10.9-10.68Z"
      />
      </svg>
            
          </div>
          <span className="text-sm font-semibold text-zinc-100 tracking-tight">
            Haurus
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
          <Link
            href="/login"
            className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors px-3"
          >
            Connexion
          </Link>
          <Link
            href="/signup"
            className="h-8 px-4 rounded-md bg-accent hover:bg-accent-light text-white text-sm font-medium transition-colors duration-150 flex items-center"
          >
            Commencer
          </Link>
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
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-zinc-400 hover:text-zinc-100 px-3 py-2"
            >
              Connexion
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="h-9 px-4 rounded-md bg-accent hover:bg-accent-light text-white text-sm font-medium transition-colors flex items-center justify-center"
            >
              Commencer
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
