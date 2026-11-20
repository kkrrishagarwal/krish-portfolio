"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  "[ OK ] Initialising neural core...",
  "[ OK ] Loading threat-detection modules...",
  "[ OK ] Mounting /projects/elite",
  "[ OK ] Establishing secure handshake (TLS 1.3)",
  "[ OK ] Identity verified: KRISH AGARWAL",
  "> ACCESS GRANTED",
];

/** Short terminal boot sequence shown once per session. Click or any key skips it. */
export default function BootLoader() {
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("booted") === "1";
      sessionStorage.setItem("booted", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setVisible(true);
    const timers = LINES.map((_, i) => setTimeout(() => setShown(i + 1), 180 + i * 230));
    const done = setTimeout(() => setVisible(false), 180 + LINES.length * 230 + 500);
    const skip = () => setVisible(false);
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="boot"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-zinc-950 px-6"
        >
          <div className="scanlines pointer-events-none absolute inset-0" />
          <div className="w-full max-w-lg font-mono text-xs sm:text-sm">
            {LINES.slice(0, shown).map((l, i) => (
              <motion.p
                key={l}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className={i === LINES.length - 1 ? "mt-3 text-lg font-bold text-neon-green text-glow-green" : "text-zinc-400"}
              >
                {l.startsWith("[ OK ]") ? (
                  <>
                    <span className="text-neon-green">[ OK ]</span>
                    {l.slice(6)}
                  </>
                ) : (
                  l
                )}
              </motion.p>
            ))}
            <div className="mt-6 h-1 overflow-hidden rounded bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-green to-neon-blue"
                animate={{ width: `${(shown / LINES.length) * 100}%` }}
              />
            </div>
            <p className="mt-3 text-[10px] uppercase tracking-widest text-zinc-600">press any key to skip</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
