"use client";
import { useEffect, useRef, useCallback } from "react";

interface ParticleBackgroundProps {
  className?: string;
}

// Design token from globals.css
const PARTICLE_COLOR = "#F2CB38";
const PARTICLE_LINE_COLOR = "rgba(242, 203, 56, 0.4)";
const DESKTOP_PARTICLE_COUNT = 80;
const MOBILE_PARTICLE_COUNT = 30;
const MOBILE_BREAKPOINT = 768;
const CONNECTION_DISTANCE = 150;
const PARTICLE_SPEED = 0.5;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function ParticleBackground({ className }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);

  const getParticleCount = useCallback((): number => {
    if (typeof window === "undefined") return DESKTOP_PARTICLE_COUNT;
    return window.innerWidth < MOBILE_BREAKPOINT
      ? MOBILE_PARTICLE_COUNT
      : DESKTOP_PARTICLE_COUNT;
  }, []);

  const createParticle = useCallback(
    (canvas: HTMLCanvasElement): Particle => {
      const padding = 20;
      return {
        x: Math.random() * (canvas.width - padding * 2) + padding,
        y: Math.random() * (canvas.height - padding * 2) + padding,
        vx: (Math.random() - 0.5) * PARTICLE_SPEED,
        vy: (Math.random() - 0.5) * PARTICLE_SPEED,
        radius: Math.random() * 1.5 + 1,
      };
    },
    []
  );

  const initParticles = useCallback(
    (canvas: HTMLCanvasElement) => {
      const count = getParticleCount();
      particlesRef.current = Array.from({ length: count }, () =>
        createParticle(canvas)
      );
    },
    [createParticle, getParticleCount]
  );

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { r: 242, g: 203, b: 56 };
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  };

  const drawGlow = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number
  ) => {
    const rgb = hexToRgb(PARTICLE_COLOR);
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 4);
    gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`);
    gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius * 4, 0, Math.PI * 2);
    ctx.fill();
  };

  const draw = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particles = particlesRef.current;

    // Update and draw particles
    particles.forEach((particle) => {
      // Move
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -1;
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -1;
      }

      // Draw glow
      drawGlow(ctx, particle.x, particle.y, particle.radius);

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = PARTICLE_COLOR;
      ctx.fill();
    });

    // Draw connections
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach((p2) => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < CONNECTION_DISTANCE) {
          const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.4;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(242, 203, 56, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });
    });
  };

  const animate = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(() =>
          animate(ctx, canvas)
        );
        return;
      }

      draw(ctx, canvas);
      animationRef.current = requestAnimationFrame(() =>
        animate(ctx, canvas)
      );
    },
    [draw]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles(canvas);
    };

    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    // Initialize
    handleResize();
    animate(ctx, canvas);

    // Event listeners
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [animate, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block" }}
    />
  );
}
