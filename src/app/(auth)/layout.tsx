"use client";
import { motion } from "framer-motion";
import { ParticleBackground } from "@/components/ui/ParticleBackground";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-[#09090b] overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground className="absolute inset-0 z-0 w-full h-full" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#09090b]/40 via-transparent to-[#09090b]" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#09090b]/20 via-transparent to-[#09090b]/20" />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#F2CB38]/5 blur-[120px] pointer-events-none" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full flex items-center justify-center"
      >
        {children}
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 py-6 text-center"
      >
        <p className="text-xs text-zinc-600">
          © 2025 Haurus.{" "}
          <a href="#" className="hover:text-zinc-400 transition-colors">
            Conditions
          </a>{" "}
          ·{" "}
          <a href="#" className="hover:text-zinc-400 transition-colors">
            Confidentialité
          </a>
        </p>
      </motion.footer>
    </main>
  );
}
