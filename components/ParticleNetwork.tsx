"use client";

import { useEffect, useRef } from "react";

/** Canvas "neural network" of drifting nodes that link up and react to the cursor. */
export default function ParticleNetwork() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0,
      h = 0,
      raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    type P = { x: number; y: number; vx: number; vy: number; c: string };
    let pts: P[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 16000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        c: Math.random() > 0.5 ? "57,255,20" : "0,255,255",
      }));
    };

    const LINK = 130;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
          // gentle repulsion from cursor
          const dx = p.x - mouse.x,
            dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120 && d2 > 0) {
            const f = (1 - Math.sqrt(d2) / 120) * 0.8;
            p.x += (dx / Math.sqrt(d2)) * f;
            p.y += (dy / Math.sqrt(d2)) * f;
          }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},0.7)`;
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i],
            b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${a.c},${(1 - d / LINK) * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // link to cursor
        const a = pts[i];
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < 180) {
          ctx.strokeStyle = `rgba(0,255,255,${(1 - dm / 180) * 0.35})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) draw();
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0" />;
}
