"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  index,
  command,
  title,
  subtitle,
}: {
  index: string;
  command: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12"
    >
      <p className="mb-2 font-mono text-xs text-zinc-500 sm:text-sm">
        <span className="text-neon-green">krish@portfolio</span>:<span className="text-neon-blue">~</span>$ {command}
      </p>
      <div className="flex items-center gap-4">
        <h2 className="font-mono text-2xl font-bold text-white sm:text-4xl">
          <span className="text-neon-green text-glow-green">{index}.</span> {title}
        </h2>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="h-px flex-1 origin-left bg-gradient-to-r from-neon-green/60 via-neon-blue/30 to-transparent"
        />
      </div>
      {subtitle && <p className="mt-3 max-w-2xl text-zinc-400">{subtitle}</p>}
    </motion.div>
  );
}
