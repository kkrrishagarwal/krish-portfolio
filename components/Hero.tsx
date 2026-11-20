"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, BadgeCheck, Cpu, ShieldCheck, Terminal } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./icons";
import ScrambleText from "./ScrambleText";
import { PaletteHint } from "./CommandPalette";

function useTypewriter(text: string, speed = 38, startDelay = 1600) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      setDone(true);
      return;
    }
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { out, done };
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } },
};

function MagneticLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 15 });
  const sy = useSpring(y, { stiffness: 250, damping: 15 });
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: sx, y: sy }}
      onMouseMove={(e: MouseEvent<HTMLAnchorElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

function HoloPortrait() {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [10, -10]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-12, 12]), { stiffness: 150, damping: 18 });
  const sheenX = useTransform(px, [0, 1], ["-30%", "130%"]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-[22rem] [perspective:1200px] sm:max-w-sm"
    >
      {/* Orbiting rings */}
      <div className="pointer-events-none absolute -inset-10 hidden sm:block">
        <div className="absolute inset-0 animate-[spin_30s_linear_infinite] rounded-full border border-dashed border-neon-green/20" />
        <div className="absolute inset-8 animate-[spin_20s_linear_infinite_reverse] rounded-full border border-neon-blue/15" />      </div>

      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-neon-green/40 via-transparent to-neon-blue/40 opacity-70 blur-2xl" />

      <motion.div
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onMouseLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative rounded-2xl p-px"
      >
        {/* Spinning conic border */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-border-spin bg-[conic-gradient(from_0deg,transparent_0%,#39FF14_8%,transparent_20%,transparent_50%,#00FFFF_58%,transparent_70%)]" />
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-zinc-950">
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            <span>ID // KA-2026</span>
            <span className="flex items-center gap-1.5 text-neon-green">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-green" /> live
            </span>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/krish.jpg"
              alt="Portrait of Krish Agarwal"
              fill
              priority
              sizes="(max-width: 640px) 90vw, 384px"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Duotone tint + vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/10 to-transparent" />
            <div className="absolute inset-0 bg-neon-blue/5 mix-blend-color" />
            <div className="scanlines absolute inset-0 opacity-60" />
            {/* Scanning beam */}
            <motion.div
              className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-neon-green/25 to-transparent"
              animate={{ top: ["-15%", "105%"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
            />
            {/* Sheen following cursor */}
            <motion.div
              className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
              style={{ left: sheenX }}
            />
            {/* HUD corner brackets */}
            {["left-3 top-3 border-l border-t", "right-3 top-3 border-r border-t", "left-3 bottom-3 border-l border-b", "right-3 bottom-3 border-r border-b"].map((c) => (
              <span key={c} className={`absolute h-5 w-5 border-neon-green ${c}`} />
            ))}
            {/* Face-lock reticle */}
            <motion.div
              initial={{ opacity: 0, scale: 1.4 }}
              animate={{ opacity: [0, 1, 1, 0.5], scale: [1.4, 1, 1, 1] }}
              transition={{ duration: 2, delay: 1.2 }}
              className="absolute left-1/2 top-[14%] h-[38%] w-[46%] -translate-x-1/2 rounded-md border border-neon-blue/70"
            >
              <span className="absolute -top-5 left-0 font-mono text-[9px] uppercase tracking-widest text-neon-blue">match 99.8%</span>
            </motion.div>

            <div className="absolute inset-x-0 bottom-0 p-4" style={{ transform: "translateZ(50px)" }}>
              <p className="font-mono text-lg font-bold text-white">{profile.name}</p>
              <p className="font-mono text-[11px] text-neon-green">AI · CyberSec · Full-Stack</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating chips (layered depth) */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
        transition={{ opacity: { delay: 1.6 }, x: { delay: 1.6 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute -right-3 top-16 flex items-center gap-2 rounded-lg border border-neon-green/40 bg-zinc-950/90 px-3 py-2 font-mono text-[11px] text-neon-green shadow-neon-green backdrop-blur sm:-right-10"
      >
        <BadgeCheck className="h-4 w-4" /> identity.verified
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.9 }, x: { delay: 1.9 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute -left-3 bottom-24 rounded-lg border border-neon-blue/40 bg-zinc-950/90 px-3 py-2 font-mono text-[11px] text-zinc-300 shadow-neon-blue backdrop-blur sm:-left-12"
      >
        <span className="text-neon-blue">$</span> whoami
        <br />
        <span className="text-neon-green">→ builder, breaker, learner</span>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const { out, done } = useTypewriter(profile.tagline);
  const [first, last] = profile.name.split(" ");

  return (
    <section id="top" className="relative flex min-h-screen items-center pb-16 pt-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr]">
        <motion.div variants={container} initial="hidden" animate="show" className="order-2 lg:order-1">
          <motion.div variants={item} className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/5 px-3 py-1 font-mono text-xs text-neon-green">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
              </span>
              open to internships &amp; collabs
            </span>
            <PaletteHint className="hidden sm:flex" />
          </motion.div>

          <motion.p variants={item} className="mb-3 font-mono text-sm text-neon-blue sm:text-base">
            &gt; hello_world, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="font-mono text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            <ScrambleText text={first} delay={400} trigger="mount" />
            <br />
            <span className="relative inline-block">
              <ScrambleText
                text={last}
                delay={700}
                className="bg-gradient-to-r from-neon-green via-emerald-300 to-neon-blue bg-clip-text text-transparent"
              />
              {/* glitch ghost layers */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 animate-glitch-1 text-neon-blue/40 mix-blend-screen"
              >
                {last}
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 animate-glitch-2 text-neon-green/40 mix-blend-screen"
              >
                {last}
              </span>
            </span>
          </motion.h1>

          <motion.div variants={item} className="mt-6 min-h-[4.5rem] max-w-xl font-mono text-base text-zinc-300 sm:text-lg">
            <span className="text-neon-green">$ </span>
            <span aria-label={profile.tagline}>{out}</span>
            <span
              aria-hidden
              className={`ml-0.5 inline-block h-5 w-2.5 translate-y-1 bg-neon-blue ${done ? "animate-blink" : ""}`}
            />
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <MagneticLink
              href={profile.github}
              className="flex items-center gap-2 rounded border border-neon-green bg-neon-green/10 px-6 py-3 font-mono text-neon-green transition-colors duration-300 hover:bg-neon-green hover:text-zinc-950 hover:shadow-neon-green"
            >
              <GithubIcon />
              View GitHub
            </MagneticLink>
            <MagneticLink
              href={profile.linkedin}
              className="flex items-center gap-2 rounded border border-[#00FFFF] px-6 py-3 font-mono text-[#00FFFF] transition-colors duration-300 hover:bg-[#00FFFF]/10 hover:shadow-[0_0_15px_rgba(0,255,255,0.6)]"
            >
              <LinkedinIcon />
              Connect on LinkedIn
            </MagneticLink>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-6 font-mono text-xs text-zinc-500">
            <span className="flex items-center gap-2"><Cpu className="h-4 w-4 text-neon-blue" /> AI Engineering</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-neon-green" /> Cybersecurity</span>
            <span className="flex items-center gap-2"><Terminal className="h-4 w-4 text-neon-blue" /> Full-Stack</span>
          </motion.div>
        </motion.div>

        <div className="order-1 lg:order-2">
          <HoloPortrait />
        </div>
      </div>

      <motion.a
        href="#experience"
        aria-label="Scroll to experience"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-neon-green sm:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        scroll
        <ArrowDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}
