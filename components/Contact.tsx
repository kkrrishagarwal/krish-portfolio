"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-4xl scroll-mt-20 px-4 py-28 text-center sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-mono text-sm text-neon-green">05. ./connect.sh</p>
        <h2 className="mt-4 font-mono text-3xl font-bold text-white sm:text-5xl">
          Let&apos;s build something <span className="text-neon-blue text-glow-blue">secure</span> &amp;{" "}
          <span className="text-neon-green text-glow-green">intelligent</span>.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-zinc-400">
          Open to internships, hackathon teams and collaborations in AI, cybersecurity and full-stack engineering.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded border border-neon-green bg-neon-green/10 px-6 py-3 font-mono text-neon-green transition-all duration-300 hover:bg-neon-green hover:text-zinc-950 hover:shadow-neon-green"
          >
            <GithubIcon /> github.com/{profile.handle}
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded border border-[#00FFFF] px-6 py-3 font-mono text-[#00FFFF] transition-all duration-300 hover:bg-[#00FFFF]/10 hover:shadow-[0_0_15px_rgba(0,255,255,0.6)]"
          >
            <LinkedinIcon /> Connect on LinkedIn
          </a>
        </div>
      </motion.div>

      <footer className="mt-24 border-t border-white/5 pt-8 font-mono text-xs text-zinc-600">
        <p>
          <span className="text-neon-green">©</span> {new Date().getFullYear()} {profile.name}. Built with Next.js, Tailwind &amp; Framer Motion.
        </p>
      </footer>
    </section>
  );
}
