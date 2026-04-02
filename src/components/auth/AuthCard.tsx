"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface AuthCardProps {
  title: string;
  description?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export function AuthCard({ title, description, footer, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-[400px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-[#111] border border-white/[0.08] rounded-xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center shadow-[0_0_24px_rgba(242,203,56,0.2)]">
            <svg
              className="w-7 h-7 text-white"
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
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-zinc-100 tracking-tight mb-2">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-zinc-500 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Form */}
        {children}

        {/* Footer */}
        {footer && (
          <div className="mt-6 pt-5 border-t border-white/[0.06]">
            {footer}
          </div>
        )}
      </motion.div>

      {/* Copyright */}
      <p className="text-center text-xs text-zinc-600 mt-6">
        © 2025 Haurus. Tous droits réservés.
      </p>
    </div>
  );
}
