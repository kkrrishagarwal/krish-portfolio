"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { experience, projects, techStack, trophies } from "@/lib/data";

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.4, ease: "easeOut", onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}</span>;
}

const STATS = [
  { n: projects.length, label: "Elite projects", suffix: "" },
  { n: trophies.length, label: "Hackathon honours", suffix: "" },
  { n: experience.length, label: "Industry roles", suffix: "" },
  { n: techStack.length, label: "Core technologies", suffix: "+" },
];

export default function Stats() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 divide-white/5 overflow-hidden rounded-xl border border-white/10 bg-zinc-900/40 backdrop-blur-md md:grid-cols-4 md:divide-x"
      >
        {STATS.map((s, i) => (
          <div key={s.label} className="group relative p-6 text-center sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-t from-neon-green/0 to-neon-green/0 transition-colors duration-500 group-hover:from-neon-green/5" />
            <p className={`font-mono text-4xl font-black sm:text-5xl ${i % 2 ? "text-neon-blue text-glow-blue" : "text-neon-green text-glow-green"}`}>
              <Counter to={s.n} />
              {s.suffix}
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
