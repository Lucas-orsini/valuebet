"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showLogo?: boolean;
  backLink?: {
    href: string;
    label: string;
  };
}

export function AuthCard({
  children,
  title,
  subtitle,
  showLogo = true,
  backLink,
}: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-[420px]"
    >
      <div
        className={cn(
          "relative rounded-xl p-8",
          "bg-zinc-900/80",
          "backdrop-blur-xl",
          "border border-white/[0.10]",
          "shadow-2xl shadow-black/50",
          "[&::before]:absolute [&::before]:inset-0 [&::before]:rounded-xl [&::before]:bg-gradient-to-br [&::before]:from-white/[0.03] [&::before]:to-transparent [&::before]:pointer-events-none"
        )}
      >
        {/* Glow effect */}
        <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-[#F2CB38]/5 via-transparent to-transparent opacity-50" />

        <div className="relative">
          {/* Logo */}
          {showLogo && (
            <div className="flex items-center justify-center gap-2.5 mb-8">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#F2CB38] to-[#E5B830] flex items-center justify-center shadow-lg shadow-[#F2CB38]/20">
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
              <span className="text-base font-semibold text-zinc-100 tracking-tight">
                Haurus
              </span>
            </div>
          )}

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-zinc-50 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-zinc-400 mt-1.5">{subtitle}</p>
            )}
          </div>

          {/* Content */}
          {children}
        </div>
      </div>

      {/* Back link */}
      {backLink && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center"
        >
          <Link
            href={backLink.href}
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {backLink.label}
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
