"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01アイウエカキ";

/** "Decrypts" text from random glyphs into the final string. Re-runs on hover. */
export default function ScrambleText({
  text,
  delay = 0,
  duration = 1200,
  className,
  trigger = "mount",
}: {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  trigger?: "mount" | "hover";
}) {
  const [display, setDisplay] = useState(trigger === "mount" ? "" : text);
  const frame = useRef<number>();

  const run = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(text);
      return;
    }
    cancelAnimationFrame(frame.current!);
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const revealed = Math.floor(p * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") out += " ";
        else if (i < revealed) out += text[i];
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (trigger !== "mount") return;
    const t = setTimeout(run, delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(frame.current!);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span className={className} aria-label={text} onMouseEnter={trigger === "hover" ? run : undefined}>
      <span aria-hidden>{display || " "}</span>
    </span>
  );
}
