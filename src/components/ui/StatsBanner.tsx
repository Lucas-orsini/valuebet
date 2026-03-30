"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Trophy, Target, TrendingUp, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { statsBanner } from "@/lib/data";
import type { StatBanner } from "@/lib/data";

const iconMap = [Trophy, Target, TrendingUp, Wallet];

function AnimatedCounter({
  value,
  suffix,
  format,
  started,
}: {
  value: number;
  suffix: string;
  format: string;
  started: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    const duration = 2000;
    const frames = 60;
    let frame = 0;

    const animate = () => {
      frame++;
      const progress = 1 - Math.pow(1 - frame / frames, 3);
      setCount(value * progress);

      if (frame < frames) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [started, value]);

  const displayValue =
    format === "number"
      ? Math.round(count).toLocaleString("fr-FR")
      : format === "currency"
      ? count.toFixed(0)
      : count.toFixed(1);

  return (
    <span className="text-3xl sm:text-4xl font-bold text-zinc-100 tracking-tight">
      {displayValue}
      {suffix}
    </span>
  );
}

export function StatsBanner() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-16 px-6 bg-[#111] border-y border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {statsBanner.map((stat: StatBanner, index: number) => {
            const Icon = iconMap[index];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                  <Icon size={20} className="text-orange-400" strokeWidth={1.5} />
                </div>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  format={stat.format}
                  started={started}
                />
                <span className="text-xs text-zinc-500 uppercase tracking-wider">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
