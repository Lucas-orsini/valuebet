"use client";
import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type InputState = "idle" | "focus" | "error" | "success" | "disabled";

interface AuthInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  label: string;
  error?: string;
  success?: boolean;
  icon?: ReactNode;
  helperText?: string;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, success, icon, helperText, className, disabled, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

    const getState = (): InputState => {
      if (disabled) return "disabled";
      if (error) return "error";
      if (success) return "success";
      if (isFocused) return "focus";
      return "idle";
    };

    const state = getState();

    const borderColor = {
      idle: "border-white/[0.08]",
      focus: "border-[#F2CB38]",
      error: "border-red-500",
      success: "border-green-500",
      disabled: "border-white/[0.05]",
    }[state];

    const ringColor = {
      idle: "",
      focus: "ring-2 ring-[#F2CB38]/20",
      error: "ring-2 ring-red-500/20",
      success: "ring-2 ring-green-500/20",
      disabled: "",
    }[state];

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium transition-colors",
            state === "disabled" ? "text-zinc-600" : "text-zinc-300"
          )}
        >
          {label}
        </label>

        <div className="relative">
          {icon && (
            <div
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 transition-colors",
                state === "focus" ? "text-[#F2CB38]" : "text-zinc-500"
              )}
            >
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            aria-invalid={state === "error"}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={cn(
              "w-full h-11 px-3 rounded-lg",
              "text-sm text-zinc-100",
              "bg-zinc-800/50",
              "border transition-all duration-150",
              "placeholder:text-zinc-600",
              "disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-10",
              borderColor,
              ringColor,
              className
            )}
            {...props}
          />

          {/* Status icon */}
          <AnimatePresence>
            {(state === "success" || state === "error") && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {state === "success" ? (
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" d="M12 8v4M12 16h.01" />
                  </svg>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              id={`${inputId}-error`}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs text-red-400 flex items-center gap-1"
            >
              <svg
                className="w-3 h-3 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" d="M12 8v4M12 16h.01" />
              </svg>
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Helper text */}
        {!error && helperText && (
          <p className="text-xs text-zinc-500">{helperText}</p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
