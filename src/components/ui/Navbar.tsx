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
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
                <svg
  className="w-full h-full"
  viewBox="0 0 2508 2508"
  fill="currentColor"
  stroke="none"
>
  <path d="M627 1254v627h1254V627H627zm661.8-234.5c67.7 7.6 136.2 41.5 177.5 88 17.7 19.9 28.7 41 32.1 61.6.6 3.2 2 4.7 11.4 12 24.3 18.9 38.5 38.3 45.9 62.6 2.3 7.8 2.6 10.5 2.6 22.8 0 12.6-.3 14.9-2.8 22.5-4.9 15.1-11.3 25.8-21.3 35.2-7 6.7-8.5 7.2-7.4 2.5.4-1.7.7-8.4.7-14.7 0-10.3-.3-12.1-2.6-17-1.4-3.1-4-7.2-5.7-9.1-3.8-4.4-12.9-9.3-20.7-11.4-7.5-1.9-23.2-1.9-32.2-.1-20.9 4.4-44.9 18-64.4 36.3-3.7 3.5-7 6.3-7.3 6.3-.4 0 1.5-4.3 4.3-9.6 15.2-28.8 42.2-57.7 70.6-75.4 5.5-3.5 10.2-6.5 10.5-6.7 1.1-1-3.4-2.5-18-5.9-28.6-6.7-46.3-12.3-65.5-20.4-7.3-3.1-10.2-3.8-15.6-3.8-12.2-.1-26.6-6.8-33.1-15.6-2.7-3.6-4.8-5.1-11.5-7.9-4.5-1.9-8.5-3.2-8.8-2.9-1.1 1.1-.4 14.9 1 21 4.1 17.4 14.8 29.4 30.6 34.3 12.2 3.8 27.8 1.7 38.3-5.2 4.6-3.1 4.9-3.2 10-2 3 .7 6.1 1.7 7 2.4 1.6 1.2 1.4 1.7-2.1 5.9-10.8 13.1-25.9 19.8-44.7 19.8-11.9 0-19.5-1.8-29.7-7.1-24.1-12.5-37.9-39.4-36.7-71.4l.3-7.9-10.5-3.3c-21-6.8-45.2-12.2-65.5-14.8-68.4-8.6-120.5.6-163.5 29-32.4 21.4-57.8 51.8-78.5 94-6.2 12.4-8.6 16.4-9.1 15.1-.4-1-.4-6.6 0-12.4 2.5-38.7 13-75.4 30.9-107.7 12.6-22.8 24.5-38.3 45.7-59.6 23.3-23.3 42.3-37 71.5-51.4 32.5-15.9 64.6-25 100.5-28.3 15.8-1.5 51.2-1.3 65.8.3m-89.3 218.5c13.9 1.6 29.8 4.7 43.5 8.6 15 4.2 35 11.3 35 12.4 0 .5-2.6 1.4-5.7 2-15.3 3-37.8 12.3-51.3 21.1-14.2 9.3-28.3 26.7-35.3 43.5-6.1 14.5-7.2 36.3-2.7 52.4 2.9 10.6 12.8 29.9 20.7 40.5 15.8 21.1 47.9 47.7 73.8 61.2 12.1 6.3-6.6 1.7-25.9-6.4-48-20.2-80.9-52.3-93.6-91.4-12-37.1-1.3-78 28.2-107.1 6.4-6.3 8.3-8.8 7.2-9.2-3.6-1.4-30.8-2.7-42.4-2.1-54.3 2.8-96.4 19.2-136.5 53-6 5.1-14.1 12.7-17.9 16.9-3.7 4.3-7.1 7.5-7.3 7.2-.9-.8 8.6-18.6 15.5-29.1 9.1-13.9 28-32.6 42.7-42.4 26.7-17.7 58.4-28.7 92-32 11.8-1.1 47.2-.6 60 .9"/>
  <path d="M1241 1051.1c-53.3 5.5-105.7 26.6-144.8 58.3-3.9 3.2-7.2 6.2-7.2 6.6s4.9-.3 10.9-1.6c25.3-5.2 64.4-7.4 95.6-5.5 48.4 3.1 94.6 13.5 142.5 32.4 12.1 4.7 32.3 14.1 65 30 31.3 15.2 46.3 19.9 57.5 18.3 9-1.4 15.6-11.1 14-20.7-1.7-10.1-12.5-26.7-27.4-42.2-32.6-33.9-80.8-60.8-127.1-71.1-23.2-5.1-55.2-6.9-79-4.5"/>
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
          <a
            href="#"
            className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors px-3"
          >
            Connexion
          </a>
          <button className="h-8 px-4 rounded-md bg-accent hover:bg-accent-light text-white text-sm font-medium transition-colors duration-150">
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
            <button className="h-9 px-4 rounded-md bg-accent hover:bg-accent-light text-white text-sm font-medium transition-colors">
              Commencer
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
}
