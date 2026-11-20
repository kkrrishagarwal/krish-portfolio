export const profile = {
  name: "Krish Agarwal",
  handle: "kkrrishagarwal",
  tagline: "BCA Sophomore at IMS Ghaziabad | AI, Cybersecurity & Full-Stack Developer",
  github: "https://github.com/kkrrishagarwal",
  linkedin: "https://www.linkedin.com/in/krish-agarwal-bca-student/",
};

export type Experience = {
  role: string;
  org: string;
  summary: string;
  points: string[];
  accent: "green" | "blue";
};

export const experience: Experience[] = [
  {
    role: "Software Engineering Intern",
    org: "Cognetix Global Technology LLP",
    summary: "Building CLI banking applications.",
    points: [
      "Engineered command-line banking workflows: accounts, deposits, withdrawals and transfers",
      "Focused on input validation, transaction integrity and clean modular code",
    ],
    accent: "green",
  },
  {
    role: "Campus Ambassador",
    org: "Mappls MapmyIndia",
    summary: "Representing India's home-grown maps & location platform on campus.",
    points: [
      "Drove student awareness and adoption of Mappls products and developer APIs",
      "Organised outreach and connected peers with geospatial tech opportunities",
    ],
    accent: "blue",
  },
];

export type Project = {
  name: string;
  alias?: string;
  description: string;
  tags: string[];
  badge?: string;
  icon: "satellite" | "grid" | "users" | "shield";
  accent: "green" | "blue";
};

export const projects: Project[] = [
  {
    name: "BhaskarOps",
    alias: "HeatOps",
    description:
      "Urban heat island and thermal stress analytics platform. Turns satellite land-surface-temperature data into actionable city-level heat insights.",
    tags: ["Geospatial", "Remote Sensing", "Analytics", "Python"],
    badge: "ISRO Bharatiya Antariksh Hackathon",
    icon: "satellite",
    accent: "green",
  },
  {
    name: "SEATWISEE",
    alias: "DO! u want",
    description:
      "Constraint-based seat allocation engine that models seating rules as a CP problem and solves them optimally with Google OR-Tools CP-SAT.",
    tags: ["Streamlit", "SQLite", "OR-Tools CP-SAT", "Python"],
    icon: "grid",
    accent: "blue",
  },
  {
    name: "MentoraHQ",
    description:
      "AI-powered 1:1 career mentoring platform connecting job seekers with industry experts through smart matching and guided sessions.",
    tags: ["AI Matching", "Full-Stack", "React"],
    icon: "users",
    accent: "green",
  },
  {
    name: "QR Guard",
    description:
      "Cybersecurity SaaS that detects QR scams, phishing URLs and UPI proxy frauds before a single rupee leaves your account.",
    tags: ["Cybersecurity", "Phishing Detection", "UPI", "SaaS"],
    icon: "shield",
    accent: "blue",
  },
];

export const techStack = [
  { name: "Python", glyph: "py", accent: "green" },
  { name: "JavaScript", glyph: "js", accent: "blue" },
  { name: "HTML", glyph: "</>", accent: "green" },
  { name: "React", glyph: "⚛", accent: "blue" },
  { name: "Tailwind", glyph: "tw", accent: "green" },
  { name: "Framer Motion", glyph: "fm", accent: "blue" },
  { name: "Streamlit", glyph: "st", accent: "green" },
  { name: "SQLite", glyph: "db", accent: "blue" },
  { name: "Linux / Ubuntu", glyph: "$_", accent: "green" },
] as const;

export const trophies = [
  {
    title: "2nd Place: Syntaxis 24-Hour Hackathon",
    detail: "Built and shipped a working product in 24 hours, finishing runner-up out of all competing teams.",
    stat: "₹5,000",
    statLabel: "prize",
    icon: "trophy" as const,
    accent: "green" as const,
  },
  {
    title: "Team Captain: Indian Army Terrier Cyber Quest",
    detail: "Led the team in Track 1 (Bug Hunting), coordinating vulnerability discovery and reporting.",
    stat: "Track 1",
    statLabel: "bug hunting",
    icon: "bug" as const,
    accent: "blue" as const,
  },
];
