"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = "text", placeholder, error, helperText, disabled, className, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const isPassword = type === "password";

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-zinc-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={isPassword && showPassword ? "text" : type}
            placeholder={placeholder}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "w-full h-11 px-3 rounded-lg",
              "bg-[#111] border text-sm text-zinc-100 placeholder:text-zinc-500",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              !error && !disabled && isFocused && "border-accent/60 focus:ring-accent/20",
              !error && !disabled && !isFocused && "border-white/[0.08] hover:border-white/[0.12]",
              error && "border-red-500/60 focus:ring-red-500/20",
              disabled && "opacity-50 cursor-not-allowed",
              isPassword && "pr-10",
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
        {(error || helperText) && (
          <p
            className={cn(
              "text-xs",
              error ? "text-red-400" : "text-zinc-500"
            )}
          >
            {error ?? helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
