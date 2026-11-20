const WORDS = [
  "Artificial Intelligence",
  "Cybersecurity",
  "Full-Stack",
  "Bug Hunting",
  "Geospatial Analytics",
  "Constraint Optimisation",
  "Fraud Detection",
  "Linux",
];

/** Infinite diagonal ticker strip between sections. */
export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div aria-hidden className="relative my-10 -rotate-2 overflow-hidden border-y border-neon-green/20 bg-neon-green/[0.04] py-4">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-mono text-sm uppercase tracking-[0.3em] sm:text-base">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 text-zinc-400">
            {w}
            <span className={i % 2 ? "text-neon-blue" : "text-neon-green"}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
