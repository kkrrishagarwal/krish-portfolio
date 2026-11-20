"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Command, Cpu, FolderGit2, Home, Mail, Search, Trophy } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "./icons";

type Item = { label: string; hint: string; icon: React.ReactNode; run: () => void };

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
const open = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

export function openPalette() {
  window.dispatchEvent(new Event("open-palette"));
}

/** Ctrl/⌘+K command palette for keyboard-first navigation. */
export default function CommandPalette() {
  const [isOpen, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(
    () => [
      { label: "Home", hint: "cd ~", icon: <Home className="h-4 w-4" />, run: () => go("top") },
      { label: "Experience", hint: "cat experience.log", icon: <Briefcase className="h-4 w-4" />, run: () => go("experience") },
      { label: "Projects", hint: "ls ./elite-projects", icon: <FolderGit2 className="h-4 w-4" />, run: () => go("projects") },
      { label: "Tech Stack", hint: "neofetch", icon: <Cpu className="h-4 w-4" />, run: () => go("stack") },
      { label: "Hackathon Trophies", hint: "grep victory", icon: <Trophy className="h-4 w-4" />, run: () => go("trophies") },
      { label: "Contact", hint: "./connect.sh", icon: <Mail className="h-4 w-4" />, run: () => go("contact") },
      { label: "Open GitHub", hint: "github.com", icon: <GithubIcon className="h-4 w-4" />, run: () => open(profile.github) },
      { label: "Open LinkedIn", hint: "linkedin.com", icon: <LinkedinIcon className="h-4 w-4" />, run: () => open(profile.linkedin) },
    ],
    [],
  );

  const filtered = items.filter((i) => (i.label + i.hint).toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [isOpen]);

  const select = (i: Item) => {
    setOpen(false);
    setTimeout(i.run, 120);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-start justify-center bg-zinc-950/70 px-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-label="Command palette"
            initial={{ y: -20, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -10, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-xl border border-neon-blue/30 bg-zinc-900/95 shadow-[0_0_60px_rgba(0,255,255,0.15)]"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4">
              <Search className="h-4 w-4 text-neon-blue" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setActive(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((a) => Math.min(a + 1, filtered.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((a) => Math.max(a - 1, 0));
                  } else if (e.key === "Enter" && filtered[active]) select(filtered[active]);
                }}
                placeholder="Type a command or search..."
                className="h-12 flex-1 bg-transparent font-mono text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
              <kbd className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">ESC</kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && <li className="px-3 py-6 text-center font-mono text-sm text-zinc-500">command not found</li>}
              {filtered.map((i, idx) => (
                <li key={i.label}>
                  <button
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => select(i)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left font-mono text-sm transition-colors",
                      idx === active ? "bg-neon-green/10 text-neon-green" : "text-zinc-300",
                    )}
                  >
                    {i.icon}
                    <span className="flex-1">{i.label}</span>
                    <span className="text-xs text-zinc-500">{i.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PaletteHint({ className }: { className?: string }) {
  return (
    <button
      onClick={openPalette}
      className={cn(
        "flex items-center gap-1.5 rounded border border-white/10 px-2 py-1 font-mono text-[11px] text-zinc-400 transition-colors hover:border-neon-blue/50 hover:text-neon-blue",
        className,
      )}
      aria-label="Open command palette"
    >
      <Command className="h-3 w-3" />K
    </button>
  );
}
