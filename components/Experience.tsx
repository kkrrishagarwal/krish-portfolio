"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading index="01" command="cat experience.log" title="Experience" />

      <div className="relative">
        {/* Timeline rail */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-neon-green via-neon-blue to-transparent sm:left-6"
        />

        <ul className="space-y-10">
          {experience.map((exp, i) => {
            const green = exp.accent === "green";
            const Icon = i === 0 ? Briefcase : MapPin;
            return (
              <motion.li
                key={exp.org}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative pl-12 sm:pl-16"
              >
                <span
                  className={cn(
                    "absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border bg-zinc-950 sm:left-2",
                    green ? "border-neon-green text-neon-green shadow-neon-green" : "border-neon-blue text-neon-blue shadow-neon-blue",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>

                <div
                  className={cn(
                    "group rounded-lg border border-white/5 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all duration-300",
                    green ? "hover:border-neon-green/40" : "hover:border-neon-blue/40",
                  )}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-mono text-lg font-semibold text-white sm:text-xl">{exp.role}</h3>
                  </div>
                  <p className={cn("mt-1 font-mono text-sm", green ? "text-neon-green" : "text-neon-blue")}>@ {exp.org}</p>
                  <p className="mt-3 text-zinc-400">{exp.summary}</p>
                  <ul className="mt-4 space-y-2">
                    {exp.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm text-zinc-400">
                        <span className={cn("mt-0.5 font-mono", green ? "text-neon-green" : "text-neon-blue")}>▹</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
