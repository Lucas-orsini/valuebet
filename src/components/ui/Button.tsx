"use client";

import React, { forwardRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent hover:bg-accent-light text-white shadow-[0_0_20px_rgba(242,203,56,0.25)] hover:shadow-[0_0_28px_rgba(242,203,56,0.35)]",
  secondary:
    "bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.10] text-zinc-300 hover:text-zinc-100",
  ghost: "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-6 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      className,
      children,
      type = "button",
      onClick,
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        type={type}
        onClick={onClick}
        whileTap={{ scale: isDisabled ? 1 : 0.98 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
          "transition-all duration-150 ease-out",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={isDisabled}
      >
        {loading && (
          <Loader2 size={size === "sm" ? 12 : 14} className="animate-spin shrink-0" />
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
