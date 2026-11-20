"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/** Neon crosshair cursor for fine-pointer devices. Expands over interactive elements. */
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 400, damping: 30 });
  const ry = useSpring(y, { stiffness: 400, damping: 30 });
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [role='button'], input"));
    };
    const d = () => setDown(true);
    const u = () => setDown(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", d);
    window.addEventListener("pointerup", u);
    return () => {
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", d);
      window.removeEventListener("pointerup", u);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-green"
        style={{ x, y }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-blue mix-blend-screen"
        style={{ x: rx, y: ry }}
        animate={{
          width: hover ? 48 : 28,
          height: hover ? 48 : 28,
          scale: down ? 0.8 : 1,
          backgroundColor: hover ? "rgba(0,255,255,0.08)" : "rgba(0,255,255,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </>
  );
}
