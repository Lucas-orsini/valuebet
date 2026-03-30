"use client";
import { useEffect, useId, useRef } from "react";

interface UnicornBackgroundProps {
  jsonFilePath: string;
  className?: string;
  scale?: number;
  dpi?: number;
}

export function UnicornBackground({
  jsonFilePath,
  className,
  scale = 0.75,
  dpi = 1.5,
}: UnicornBackgroundProps) {
  const reactId = useId();
  const id = `unicorn-${reactId.replace(/:/g, "")}`;
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const win = window as unknown as {
      UnicornStudio?: {
        init: () => void;
        isInitialized?: boolean;
      };
    };

    const initScene = () => {
      const el = document.getElementById(id);
      if (!el || !win.UnicornStudio) return;

      el.setAttribute("data-us-project-src", jsonFilePath);
      el.setAttribute("data-us-scale", String(scale));
      el.setAttribute("data-us-dpi", String(dpi));
      el.setAttribute("data-us-lazyload", "false");

      if (!win.UnicornStudio.isInitialized) {
        win.UnicornStudio.init();
        win.UnicornStudio.isInitialized = true;
      } else {
        win.UnicornStudio.init();
      }
    };

    if (!win.UnicornStudio) {
      const unicornStudio = { init: () => {}, isInitialized: false };
      win.UnicornStudio = unicornStudio;
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.0-1/dist/unicornStudio.umd.js";
      script.onload = () => {
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", initScene);
        } else {
          initScene();
        }
      };
      document.head.appendChild(script);
    } else {
      initScene();
    }
  }, [id, jsonFilePath, scale, dpi]);

  return <div id={id} className={className} />;
}
