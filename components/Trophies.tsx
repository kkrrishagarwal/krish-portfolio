"use client";

import { motion } from "framer-motion";
import { Bug, Trophy } from "lucide-react";
import { trophies } from "@/lib/data";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";

const ICONS = { trophy: Trophy, bug: Bug };

export default function Trophies() {
  return (
    <section id="trophies" className="relative mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading index="04" command="grep -r 'victory' ./hackathons" title="Hackathon Trophies" />

      <div className="grid gap-6 lg:grid-cols-2">
        {trophies.map((t, i) => {
          const green = t.accent === "green";
          const Icon = ICONS[t.icon];
          return (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-xl p-px"
            >
              {/* Rotating conic border */}
              <div
                className={cn(
                  "absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-border-spin",
                  green
                    ? "bg-[conic-gradient(from_0deg,transparent_0%,#39FF14_10%,transparent_25%)]"
                    : "bg-[conic-gradient(from_0deg,transparent_0%,#00FFFF_10%,transparent_25%)]",
                )}
              />
              <div className="relative flex h-full flex-col gap-6 rounded-[11px] bg-zinc-950/95 p-6 sm:flex-row sm:items-center sm:p-8">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                  transition={{ duration: 0.6 }}
                  className={cn(
                    "flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2",
                    green ? "border-neon-green text-neon-green shadow-neon-green" : "border-neon-blue text-neon-blue shadow-neon-blue",
                  )}
                >
                  <Icon className="h-8 w-8" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-mono text-lg font-semibold text-white">{t.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400">{t.detail}</p>
                </div>
                <div className="sm:text-right">
                  <p className={cn("font-mono text-3xl font-black", green ? "text-neon-green text-glow-green" : "text-neon-blue text-glow-blue")}>
                    {t.stat}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">{t.statLabel}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
