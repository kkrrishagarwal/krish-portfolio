"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, LayoutGrid, Satellite, ShieldAlert, Users } from "lucide-react";
import type { MouseEvent } from "react";
import { profile, projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import SectionHeading from "./SectionHeading";

const ICONS = { satellite: Satellite, grid: LayoutGrid, users: Users, shield: ShieldAlert };

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const green = project.accent === "green";
  const rgb = green ? "57,255,20" : "0,255,255";
  const Icon = ICONS[project.icon];

  // Pointer-tracked tilt + spotlight
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(400px circle at ${gx} ${gy}, rgba(${rgb},0.18), transparent 60%)`;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      }}
      className="[perspective:1200px]"
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -6 }}
        className={cn(
          "group relative h-full overflow-hidden rounded-xl border bg-zinc-900/60 p-6 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 sm:p-8",
          green
            ? "border-neon-green/20 hover:border-neon-green/70 hover:shadow-[0_0_30px_rgba(57,255,20,0.25),inset_0_0_30px_rgba(57,255,20,0.05)]"
            : "border-neon-blue/20 hover:border-neon-blue/70 hover:shadow-[0_0_30px_rgba(0,255,255,0.25),inset_0_0_30px_rgba(0,255,255,0.05)]",
        )}
      >
        {/* pointer spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glow }}
        />
        {/* corner brackets */}
        <span className={cn("absolute left-2 top-2 h-4 w-4 border-l border-t", green ? "border-neon-green" : "border-neon-blue")} />
        <span className={cn("absolute bottom-2 right-2 h-4 w-4 border-b border-r", green ? "border-neon-green" : "border-neon-blue")} />
        {/* index watermark */}
        <span className="pointer-events-none absolute -right-2 -top-6 select-none font-mono text-8xl font-black text-white/[0.03]">
          0{index + 1}
        </span>

        <div className="relative" style={{ transform: "translateZ(40px)" }}>
          <div className="flex items-start justify-between">
            <span
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-lg border",
                green ? "border-neon-green/40 bg-neon-green/10 text-neon-green" : "border-neon-blue/40 bg-neon-blue/10 text-neon-blue",
              )}
            >
              <Icon className="h-6 w-6" />
            </span>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub`}
              className="text-zinc-500 transition-all duration-300 hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>

          {project.badge && (
            <p className="mt-5 inline-block rounded border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 font-mono text-[11px] text-amber-300">
              ★ {project.badge}
            </p>
          )}

          <h3 className="mt-4 font-mono text-2xl font-bold text-white">
            {project.name}
            {project.alias && <span className="ml-2 text-sm font-normal text-zinc-500">({project.alias})</span>}
          </h3>
          <p className="mt-3 leading-relaxed text-zinc-400">{project.description}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li
                key={t}
                className={cn(
                  "rounded-full border px-3 py-1 font-mono text-xs",
                  green ? "border-neon-green/25 text-neon-green/90" : "border-neon-blue/25 text-neon-blue/90",
                )}
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading
        index="02"
        command="ls ./elite-projects"
        title="Elite Projects"
        subtitle="Hackathon-forged builds spanning space-tech analytics, optimisation engines, AI platforms and fraud defence."
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
        className="grid gap-6 md:grid-cols-2"
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
