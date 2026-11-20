"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { PaletteHint } from "./CommandPalette";

const LINKS = [
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#stack", label: "stack" },
  { href: "#trophies", label: "trophies" },
  { href: "#contact", label: "contact" },
];

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open ? "border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-mono text-sm font-bold tracking-tight text-white">
          <span className="text-neon-green">~/</span>krish
          <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-neon-green" />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded px-3 py-2 font-mono text-xs text-zinc-400 transition-colors hover:text-neon-blue"
              >
                <span className="text-neon-green/60">0{i + 1}.</span>
                {l.label}
                <span className="absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 bg-neon-blue shadow-neon-blue transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <PaletteHint className="ml-2 hidden md:flex" />

        <button
          className="rounded p-2 text-zinc-300 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 px-4 md:hidden"
          >
            {LINKS.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-sm text-zinc-300 hover:text-neon-green"
                >
                  <span className="text-neon-green/60">0{i + 1}.</span> {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-neon-green to-neon-blue"
        style={{ scaleX: progress }}
      />
    </header>
  );
}
