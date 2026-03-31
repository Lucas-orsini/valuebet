"use client";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface AuthButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loadingText?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#F2CB38] hover:bg-[#F7D55C] text-black shadow-lg shadow-[#F2CB38]/25 hover:shadow-[#F2CB38]/35",
  secondary:
    "border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-zinc-300 hover:text-zinc-100",
  ghost: "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-6 text-sm",
};

export const AuthButton = forwardRef<HTMLButtonElement, AuthButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loadingText,
      isLoading = false,
      disabled,
      className,
      type = "submit",
      ...motionProps
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: isDisabled ? 1 : 0.98 }}
        disabled={isDisabled}
        type={type}
        className={cn(
          "relative inline-flex items-center justify-center gap-2",
          "font-medium rounded-lg",
          "transition-all duration-150",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2CB38]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900",
          variants[variant],
          sizes[size],
          className
        )}
        {...motionProps}
      >
        {isLoading && (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{loadingText || children}</span>
          </>
        )}
        {!isLoading && children}
      </motion.button>
    );
  }
);

AuthButton.displayName = "AuthButton";
