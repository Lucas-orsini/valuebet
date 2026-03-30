"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, type Variants } from "framer-motion";
import { Brain, Zap, LayoutGrid, Send, Sliders, Eye, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { features } from "@/lib/data";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  zap: Zap,
  "layout-grid": LayoutGrid,
  send: Send,
  sliders: Sliders,
  eye: Eye,
};

// Counter animation component
function CounterFeature({
  target,
  suffix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const totalFrames = 60;
    let frame = 0;

    const animate = () => {
      frame++;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCount(Math.min(target * progress, target));

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [started, target]);

  const displayValue =
    target >= 1000 ? count.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") : count.toFixed(target % 1 !== 0 ? 1 : 0);

  return (
    <div ref={ref} className="mt-auto pt-3">
      <span className="text-3xl font-bold text-zinc-100 tracking-tight">
        {displayValue}
      </span>
      <span className="text-xl font-medium text-orange-400 ml-1">{suffix}</span>
    </div>
  );
}

// Metrics bars component
function MetricsFeature() {
  const metrics = [
    { label: "Précision", value: 61.8, suffix: "%" },
    { label: "Valeur détectée", value: 87, suffix: "%" },
    { label: "ROI mensuel", value: 31.3, suffix: "%" },
  ];

  return (
    <div className="mt-2 flex flex-col gap-3">
      {metrics.map(({ label, value, suffix }, i) => (
        <div key={label}>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-zinc-400">{label}</span>
            <span className="text-zinc-300 font-medium">
              {value}
              {suffix}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.min(100, value)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 * i }}
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// Bookmaker list component
function BookmakerList() {
  const bookmakers = [
    { name: "Betclic", status: "connected" },
    { name: "Unibet", status: "connected" },
    { name: "Winamax", status: "connected" },
    { name: "Betway", status: "connected" },
    { name: "Bwin", status: "connected" },
    { name: "+15 autres", status: "available" },
  ];

  return (
    <div className="mt-2 flex flex-col gap-2">
      {bookmakers.map((bookmaker, i) => (
        <motion.div
          key={bookmaker.name}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 * i }}
          className={cn(
            "flex items-center gap-2 p-2 rounded-md border transition-all",
            bookmaker.status === "connected"
              ? "border-green-500/20 bg-green-500/5"
              : "border-white/[0.05] bg-white/[0.02]"
          )}
        >
          <div
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              bookmaker.status === "connected" ? "bg-green-500" : "bg-zinc-500"
            )}
          />
          <span
            className={cn(
              "text-xs flex-1",
              bookmaker.status === "connected" ? "text-zinc-300" : "text-zinc-500"
            )}
          >
            {bookmaker.name}
          </span>
          {bookmaker.status === "connected" && (
            <CheckCircle2 size={12} className="text-green-500" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// Telegram notification preview
function TelegramPreview() {
  const messages = [
    { text: "🎾 Value Bet détecté", time: "Maintenant" },
    { text: "Sinner vs Medvedev", time: "Cote: 2.10", sub: "Edge: +8.2%" },
  ];
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((v) => (v < messages.length - 1 ? v + 1 : 0));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-2 rounded-lg bg-[#0088cc]/10 border border-[#0088cc]/20 p-3">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-4 h-4 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
        <span className="text-xs font-medium text-[#0088cc]">Bot Telegram</span>
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      </div>
      <div className="space-y-2">
        {messages.slice(0, visible + 1).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0088cc]/20 rounded-md p-2"
          >
            <p className="text-xs text-zinc-200">{msg.text}</p>
            <p className="text-[10px] text-zinc-400">{msg.sub || msg.time}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Units management preview
function UnitsPreview() {
  const units = [
    { level: "1u", amount: "10€", desc: "Confiance normale", color: "bg-zinc-500" },
    { level: "2u", amount: "20€", desc: "Confiance élevée", color: "bg-orange-500" },
    { level: "3u", amount: "30€", desc: "Confiance max", color: "bg-green-500" },
  ];

  return (
    <div className="mt-2 flex flex-col gap-2">
      {units.map((unit, i) => (
        <motion.div
          key={unit.level}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i }}
          className="flex items-center gap-3 p-2 rounded-md border border-white/[0.05] bg-white/[0.02]"
        >
          <div className={cn("w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-white", unit.color)}>
            {unit.level}
          </div>
          <div className="flex-1">
            <p className="text-xs text-zinc-300">{unit.desc}</p>
          </div>
          <span className="text-xs font-medium text-zinc-400">{unit.amount}</span>
        </motion.div>
      ))}
    </div>
  );
}

// Transparency checklist
function TransparencyChecklist() {
  const items = [
    "Historique de tous les paris",
    "Cotes avant/après match",
    "ROI vérifiable",
    "Logs du modèle XGBoost",
  ];

  return (
    <ul className="mt-2 flex flex-col gap-1.5">
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 * i }}
          className="flex items-center gap-2"
        >
          <CheckCircle2 size={14} className="text-green-500 shrink-0" />
          <span className="text-sm text-zinc-400">{item}</span>
        </motion.li>
      ))}
    </ul>
  );
}

// BentoCard with 3D tilt
function BentoCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 10);
        y.set((e.clientY - rect.top - rect.height / 2) * 10);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-xl border border-white/[0.07] bg-[#111] p-5 flex flex-col gap-3 overflow-hidden",
        className
      )}
    >
      <div
        style={{ transform: "translateZ(20px)" }}
        className="flex flex-col gap-2 flex-1"
      >
        {children}
      </div>
    </motion.div>
  );
}

// Main BentoGrid component
export function BentoGrid() {
  const getCardContent = (feature: (typeof features)[0]) => {
    switch (feature.id) {
      case "xgboost":
        return (
          <>
            <h3 className="text-base font-semibold text-zinc-100">
              {feature.title}
            </h3>
            <p className="text-sm text-zinc-500">{feature.description}</p>
            <div className="flex items-center gap-2 mt-auto">
              <div className="px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20">
                <span className="text-[11px] font-medium text-orange-400">
                  {feature.accent}
                </span>
              </div>
            </div>
            <CounterFeature target={276000} suffix="+" />
          </>
        );
      case "realtime":
        return (
          <>
            <h3 className="text-base font-semibold text-zinc-100">
              {feature.title}
            </h3>
            <p className="text-sm text-zinc-500">{feature.description}</p>
            <MetricsFeature />
          </>
        );
      case "bookmakers":
        return (
          <>
            <h3 className="text-base font-semibold text-zinc-100">
              {feature.title}
            </h3>
            <p className="text-sm text-zinc-500">{feature.description}</p>
            <BookmakerList />
          </>
        );
      case "telegram":
        return (
          <>
            <h3 className="text-base font-semibold text-zinc-100">
              {feature.title}
            </h3>
            <p className="text-sm text-zinc-500">{feature.description}</p>
            <TelegramPreview />
          </>
        );
      case "units":
        return (
          <>
            <h3 className="text-base font-semibold text-zinc-100">
              {feature.title}
            </h3>
            <p className="text-sm text-zinc-500">{feature.description}</p>
            <UnitsPreview />
          </>
        );
      case "transparency":
        return (
          <>
            <h3 className="text-base font-semibold text-zinc-100">
              {feature.title}
            </h3>
            <p className="text-sm text-zinc-500">{feature.description}</p>
            <TransparencyChecklist />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {/* Feature 1 - XGBoost - col-span-2 */}
      <BentoCard className="md:col-span-2">{getCardContent(features[0])}</BentoCard>

      {/* Feature 2 - Realtime */}
      <BentoCard>{getCardContent(features[1])}</BentoCard>

      {/* Feature 3 - Bookmakers */}
      <BentoCard>{getCardContent(features[2])}</BentoCard>

      {/* Feature 4 - Telegram */}
      <BentoCard>{getCardContent(features[3])}</BentoCard>

      {/* Feature 5 - Units */}
      <BentoCard>{getCardContent(features[4])}</BentoCard>

      {/* Feature 6 - Transparency - col-span-2 */}
      <BentoCard className="md:col-span-2">{getCardContent(features[5])}</BentoCard>
    </motion.div>
  );
}
