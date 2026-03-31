"use client";
import { cn } from "@/lib/utils";

interface AuthDividerProps {
  text?: string;
}

export function AuthDivider({ text = "ou continuer avec" }: AuthDividerProps) {
  return (
    <div className="relative flex items-center gap-3 my-5">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      <span className="text-xs text-zinc-500 font-medium">{text}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </div>
  );
}
