"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import ParticleNetwork from "./ParticleNetwork";

type Shape = {
  kind: "hex" | "tri" | "square" | "ring";
  size: number;
  x: string;
  y: string;
  color: string;
  duration: number;
  delay: number;
};

const SHAPES: Shape[] = [
  { kind: "hex", size: 140, x: "8%", y: "12%", color: "#39FF14", duration: 18, delay: 0 },
  { kind: "tri", size: 90, x: "82%", y: "18%", color: "#00FFFF", duration: 22, delay: 2 },
  { kind: "square", size: 70, x: "70%", y: "62%", color: "#39FF14", duration: 20, delay: 1 },
  { kind: "ring", size: 180, x: "15%", y: "70%", color: "#00FFFF", duration: 26, delay: 3 },
  { kind: "hex", size: 60, x: "48%", y: "35%", color: "#00FFFF", duration: 16, delay: 4 },
  { kind: "tri", size: 50, x: "90%", y: "85%", color: "#39FF14", duration: 19, delay: 0.5 },
  { kind: "square", size: 40, x: "30%", y: "90%", color: "#00FFFF", duration: 15, delay: 2.5 },
];

function ShapeSvg({ kind, size, color }: Pick<Shape, "kind" | "size" | "color">) {
  const common = { fill: "none", stroke: color, strokeWidth: 1, strokeOpacity: 0.5 };
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
      {kind === "hex" && <polygon points="50,3 93,27 93,73 50,97 7,73 7,27" {...common} />}
      {kind === "tri" && <polygon points="50,6 95,90 5,90" {...common} />}
      {kind === "square" && <rect x="12" y="12" width="76" height="76" {...common} />}
      {kind === "ring" && (
        <>
          <circle cx="50" cy="50" r="46" {...common} />
          <circle cx="50" cy="50" r="30" {...common} strokeDasharray="4 6" />
        </>
      )}
    </svg>
  );
}

export default function Background() {
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(500px circle at ${sx}px ${sy}px, rgba(0,255,255,0.07), transparent 70%)`;
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const move = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Layer 1: grid with radial fade */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

      {/* Layer 2: ambient colour blobs */}
      <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-neon-green/10 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-neon-blue/10 blur-[140px]" />

      {/* Layer 2.5: interactive neural-network particles */}
      <ParticleNetwork />

      {/* Layer 3: floating geometry */}
      {SHAPES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: s.x, top: s.y }}
          initial={{ opacity: 0 }}
          animate={
            reduced
              ? { opacity: 0.35 }
              : { opacity: [0.15, 0.45, 0.15], y: [0, -40, 0], x: [0, 20, 0], rotate: [0, 180, 360] }
          }
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <ShapeSvg kind={s.kind} size={s.size} color={s.color} />
        </motion.div>
      ))}

      {/* Layer 4: cursor spotlight */}
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />

      {/* Layer 5: scanlines + moving scan beam */}
      <div className="scanlines absolute inset-0" />
      <div className="absolute inset-x-0 h-32 animate-scan bg-gradient-to-b from-transparent via-neon-green/[0.03] to-transparent" />
    </div>
  );
}
