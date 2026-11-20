"use client";

import { motion } from "framer-motion";
import { techStack } from "@/lib/data";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";

export default function TechStack() {
  return (
    <section id="stack" className="relative mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading index="03" command="neofetch --stack" title="Tech Stack" />

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
      >
        {techStack.map((t) => {
          const green = t.accent === "green";
          return (
            <motion.li
              key={t.name}
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 20 },
                show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 20 } },
              }}
              whileHover={{ y: -4, scale: 1.04 }}
              className={cn(
                "group relative flex flex-col items-center gap-3 overflow-hidden rounded-lg border border-white/5 bg-zinc-900/50 px-4 py-6 text-center backdrop-blur-sm transition-[border-color,box-shadow] duration-300",
                green ? "hover:border-neon-green/60 hover:shadow-neon-green" : "hover:border-neon-blue/60 hover:shadow-neon-blue",
              )}
            >
              <span
                className={cn(
                  "absolute inset-x-0 top-0 h-px opacity-0 transition-opacity group-hover:opacity-100",
                  green ? "bg-neon-green" : "bg-neon-blue",
                )}
              />
              <span
                className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-md border font-mono text-lg font-bold transition-colors",
                  green
                    ? "border-neon-green/30 text-neon-green group-hover:bg-neon-green/10"
                    : "border-neon-blue/30 text-neon-blue group-hover:bg-neon-blue/10",
                )}
              >
                {t.glyph}
              </span>
              <span className="font-mono text-sm text-zinc-300 group-hover:text-white">{t.name}</span>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
