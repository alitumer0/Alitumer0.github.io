"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import RarityBadge, { type Rarity } from "@/components/rpg/RarityBadge";
import { SwordIcon, ShieldIcon, ChartIcon, MapIcon, TrophyIcon, ChestIcon, ScrollIcon } from "@/components/rpg/RPGIcons";
import SwordDivider from "@/components/rpg/SwordDivider";
import RPGFooter from "@/components/rpg/RPGFooter";
import { useTypewriter, useCounter } from "@/hooks/useRPGEffects";
import { useRPGSound, useRPGMusic } from "@/hooks/useRPGAudio";

const ParticleBackground = dynamic(() => import("@/components/rpg/ParticleBackground"), { ssr: false });

/* ─── Types ─── */

type SheetTab = "Character" | "Stats" | "Quests" | "Achievements" | "Inventory" | "Contact";

const tabs: { key: SheetTab; icon: React.ReactNode; label: string }[] = [
  { key: "Character", icon: <ShieldIcon size={16} />, label: "Character" },
  { key: "Stats", icon: <ChartIcon size={16} />, label: "Stats" },
  { key: "Quests", icon: <MapIcon size={16} />, label: "Quests" },
  { key: "Achievements", icon: <TrophyIcon size={16} />, label: "Achievements" },
  { key: "Inventory", icon: <ChestIcon size={16} />, label: "Inventory" },
  { key: "Contact", icon: <ScrollIcon size={16} />, label: "Contact" },
];

/* ─── Data ─── */

const characterBio = {
  bio: "Full-Stack Developer focused on shipping usable products end-to-end: from frontend experience to backend automation and deployment. I build with measurable outcomes, maintainable architecture, and clear delivery ownership.",
  playerClass: "Full-Stack Developer",
  abilities: [
    "Built and delivered 8+ real portfolio/client products",
    "Balanced web + mobile delivery with React/Next.js and Flutter",
    "Designed backend flows using ASP.NET Core, REST APIs and N8N automation",
    "Managed deployment workflow with Docker, Git and CI/CD practices",
    "Worked in Agile delivery loops with direct client communication",
  ],
  currentQuest: "Scaling from solo product delivery to larger cross-functional projects with stronger architecture and release discipline.",
};

const progressBars = [
  { name: "Coding", score: 90, color: "#3b82f6", icon: "💻" },
  { name: "Problem Solving", score: 92, color: "#a855f7", icon: "🧩" },
  { name: "Teamwork", score: 88, color: "#22c55e", icon: "🤝" },
  { name: "Communication", score: 87, color: "#facc15", icon: "💬" },
  { name: "Time Management", score: 85, color: "#ef4444", icon: "⏰" },
];

const proofStats = [
  { label: "Projects Shipped", value: "8+" },
  { label: "Active Build Tracks", value: "3" },
  { label: "Core Tech Skills", value: "18" },
  { label: "Certifications", value: "10" },
  { label: "Working Languages", value: "3" },
];

const characterHighlights = [
  "Delivered projects across web, mobile and automation domains",
  "Strong execution in full project lifecycle: design, build, test, deploy",
  "Practical focus on clean UX, maintainable code and business-ready features",
];

interface Skill {
  name: string;
  level: number;
  percent: number;
  rarity: Rarity;
  color: string;
  icon: string;
  xpNeeded: number;
}

const skills: Skill[] = [
  { name: "React.js", level: 9, percent: 90, rarity: "LEGENDARY", color: "#61dafb", icon: "⚛️", xpNeeded: 1200 },
  { name: "Next.js", level: 8, percent: 82, rarity: "EPIC", color: "#a855f7", icon: "🔺", xpNeeded: 2800 },
  { name: "JavaScript", level: 9, percent: 92, rarity: "LEGENDARY", color: "#f7df1e", icon: "⚡", xpNeeded: 900 },
  { name: "TypeScript", level: 8, percent: 80, rarity: "EPIC", color: "#3178c6", icon: "🔷", xpNeeded: 3100 },
  { name: "C#", level: 8, percent: 82, rarity: "EPIC", color: "#9b4dca", icon: "🎯", xpNeeded: 2700 },
  { name: "ASP.NET Core", level: 8, percent: 80, rarity: "EPIC", color: "#512bd4", icon: "🏗️", xpNeeded: 3200 },
  { name: "Flutter", level: 7, percent: 72, rarity: "RARE", color: "#02569B", icon: "📱", xpNeeded: 4200 },
  { name: "Dart", level: 7, percent: 70, rarity: "RARE", color: "#0175C2", icon: "🎯", xpNeeded: 4500 },
  { name: "Python", level: 7, percent: 70, rarity: "RARE", color: "#3572a5", icon: "🐍", xpNeeded: 4500 },
  { name: "HTML/CSS", level: 9, percent: 93, rarity: "LEGENDARY", color: "#e44d26", icon: "🎨", xpNeeded: 800 },
  { name: "SQL Server", level: 7, percent: 72, rarity: "RARE", color: "#cc2927", icon: "🗄️", xpNeeded: 4200 },
  { name: "MongoDB", level: 6, percent: 62, rarity: "RARE", color: "#47a248", icon: "🍃", xpNeeded: 5800 },
  { name: "Firebase", level: 7, percent: 68, rarity: "RARE", color: "#FFCA28", icon: "🔥", xpNeeded: 4800 },
  { name: "Docker", level: 6, percent: 60, rarity: "RARE", color: "#2496ed", icon: "📦", xpNeeded: 6000 },
  { name: "Git", level: 9, percent: 90, rarity: "LEGENDARY", color: "#f05032", icon: "🔀", xpNeeded: 1100 },
  { name: "Tailwind", level: 8, percent: 84, rarity: "EPIC", color: "#06b6d4", icon: "🌊", xpNeeded: 2400 },
  { name: "N8N", level: 7, percent: 74, rarity: "RARE", color: "#FF6D00", icon: "⚙️", xpNeeded: 4000 },
  { name: "REST APIs", level: 8, percent: 85, rarity: "EPIC", color: "#22c55e", icon: "🔌", xpNeeded: 2200 },
];

interface Quest {
  title: string;
  role: string;
  period: string;
  desc: string;
  xp: number;
  maxXp: number;
  status: "active" | "complete";
  milestones: string[];
}

const quests: Quest[] = [
  {
    title: "BilgeAdam Akademi",
    role: "Full-Stack Developer Intern",
    period: "Oct 2024 — Present",
    desc: "Challenge: enterprise workflows. Action: built modules with ASP.NET Core + React + SQL Server. Result: production-style full-stack delivery experience.",
    xp: 8500, maxXp: 10000, status: "active",
    milestones: ["Built modular UI flows", "Designed API contracts", "Implemented DB-backed features"],
  },
  {
    title: "SaaS Machine",
    role: "Full-Stack Developer & Automation Engineer",
    period: "2025 — Present",
    desc: "Challenge: repetitive backend ops. Action: built N8N-based automation pipelines. Result: faster integration workflows and cleaner orchestration.",
    xp: 8000, maxXp: 10000, status: "active",
    milestones: ["Automated workflow chains", "Connected API/webhook layers", "Containerized runtime setup"],
  },
  {
    title: "Freelance Development",
    role: "Full-Stack Developer",
    period: "2024 — Present",
    desc: "Challenge: diverse client needs. Action: delivered custom apps from landing pages to SaaS modules. Result: 8+ practical builds and reusable patterns.",
    xp: 6200, maxXp: 10000, status: "active",
    milestones: ["Scoped requirements", "Executed end-to-end delivery", "Applied repeatable release process"],
  },
  {
    title: "Flutter Mobile Apps",
    role: "Mobile Developer",
    period: "2024 — 2025",
    desc: "Challenge: cross-platform product quality. Action: shipped Flutter + Firebase apps. Result: stable mobile flows for real use-cases.",
    xp: 10000, maxXp: 10000, status: "complete",
    milestones: ["Implemented auth/data flows", "Handled stateful UI", "Published complete app journeys"],
  },
  {
    title: "Student Management System",
    role: "Full-Stack Developer",
    period: "2024",
    desc: "Challenge: academic operations management. Action: built auth, CRUD and reporting modules. Result: complete management workflow in one product.",
    xp: 10000, maxXp: 10000, status: "complete",
    milestones: ["Role-based authentication", "Reporting dashboard", "Responsive interface design"],
  },
  {
    title: "Asset & Inventory Systems",
    role: "Backend Developer",
    period: "2024",
    desc: "Challenge: traceability and control. Action: built asset assignment and inventory tracking systems. Result: clearer operational visibility.",
    xp: 10000, maxXp: 10000, status: "complete",
    milestones: ["Modeled inventory logic", "Implemented assignment tracking", "Automated repetitive admin flows"],
  },
];

interface Achievement {
  icon: string; title: string; place: string; period: string;
  desc: string; skills: string[]; stars: number;
}

const achievements: Achievement[] = [
  {
    icon: "🎓", title: "BilgeAdam Boost", place: "Full-Stack Development Program",
    period: "Sep 2024 — Jul 2025",
    desc: "Intensive full-stack bootcamp covering React, ASP.NET Core, Docker, and cloud deployment.",
    skills: ["React", "ASP.NET Core", "SQL", "Docker", "CI/CD"], stars: 5,
  },
  {
    icon: "🎓", title: "Anadolu University", place: "Web Design and Coding",
    period: "GPA: 3.00",
    desc: "Associate degree in web design emphasizing frontend technologies and responsive design.",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"], stars: 4,
  },
  {
    icon: "🎓", title: "Dokuz Eylul University", place: "Electrical Technology",
    period: "GPA: 3.11",
    desc: "Foundation in engineering thinking, systems analysis, and technical problem-solving.",
    skills: ["Systems Analysis", "Problem Solving", "Technical Foundation"], stars: 4,
  },
];

const certifications = [
  "Git/GitHub/GitLab", "Jira", "Web Scraping", "Python Programming", "Agile/Scrum",
  "Flutter & Dart", "Firebase & Cloud", "N8N Automation", "Docker", "RESTful API Design",
];

const languages = [
  { flag: "🇹🇷", name: "Türkçe", level: "Native", stars: 5 },
  { flag: "🇬🇧", name: "English", level: "B2 — Upper-Intermediate", stars: 4 },
  { flag: "🇩🇪", name: "Deutsch", level: "B1 — Intermediate", stars: 3 },
];

interface Project {
  icon: string; title: string; rarity: Rarity; desc: string;
  power: number; complexity: number; impact: number; stack: string[]; url?: string;
}

const projects: Project[] = [
  {
    icon: "⚙️", title: "SaaS Machine", rarity: "LEGENDARY",
    desc: "Challenge: repetitive backend operations. Action: built N8N automation engine with API/webhook chains. Result: simplified SaaS workflow orchestration.",
    power: 88, complexity: 85, impact: 90, stack: ["N8N", "Node.js", "REST API", "Webhooks", "Docker"]
  },
  {
    icon: "🍽️", title: "AllerCheck", rarity: "LEGENDARY",
    desc: "Challenge: safe food selection. Action: built allergen-aware platform with blacklist logic. Result: clearer and safer consumption decisions.",
    power: 90, complexity: 75, impact: 92, stack: ["React", "Node.js", "MongoDB", "REST API"]
  },
  {
    icon: "🏢", title: "Advance Management System", rarity: "EPIC",
    desc: "Challenge: manual advance-request flow. Action: implemented approval steps, notifications and reports. Result: traceable enterprise process flow.",
    power: 85, complexity: 80, impact: 88, stack: ["ASP.NET Core", "React", "SQL Server", "Identity"]
  },
  {
    icon: "🐾", title: "Pet-Adopt", rarity: "EPIC",
    desc: "Challenge: fragmented adoption journey. Action: developed cross-platform shelter/favorites workflow. Result: smoother adoption discovery experience.",
    power: 80, complexity: 78, impact: 85, stack: ["Flutter", "Dart", "Firebase", "REST API"]
  },
  {
    icon: "🧊", title: "Fridgly", rarity: "EPIC",
    desc: "Challenge: ingredient waste management. Action: built expiry-aware fridge tracking app. Result: better household inventory visibility.",
    power: 78, complexity: 72, impact: 82, stack: ["Flutter", "Dart", "Firebase", "Local Storage"]
  },
  {
    icon: "📈", title: "Stock Trading Bot", rarity: "EPIC",
    desc: "Challenge: manual trading analysis. Action: developing automated strategy bot + dashboard. Result: ongoing system for faster decision support.",
    power: 82, complexity: 90, impact: 78, stack: ["C#", "React", "WebSocket", "Market APIs"]
  },
  {
    icon: "🤖", title: "AI Note-Taking App", rarity: "RARE",
    desc: "Challenge: scattered meeting notes. Action: building AI-assisted note organization and retrieval. Result: faster knowledge recall (in progress).",
    power: 70, complexity: 68, impact: 72, stack: ["Python", "React", "AI/ML", "REST API"]
  },
  {
    icon: "🍳", title: "Recipe Suggestion App", rarity: "RARE",
    desc: "Challenge: limited ingredient usage. Action: building ingredient-based recommendation flow. Result: practical meal suggestions (in progress).",
    power: 68, complexity: 60, impact: 75, stack: ["React", "Python", "OpenAI API", "Mobile"]
  },
];

const contacts = [
  { icon: "📧", label: "EMAIL", value: "aetumer50@gmail.com", href: "mailto:aetumer50@gmail.com" },
  { icon: "🌐", label: "PORTFOLIO", value: "alitumer.help", href: "https://alitumer.help" },
  { icon: "💻", label: "GITHUB", value: "github.com/alitumer0", href: "https://github.com/alitumer0" },
  { icon: "💼", label: "LINKEDIN", value: "linkedin.com/in/alitumer", href: "https://linkedin.com/in/alitumer" },
];

const contactCta = [
  "Available for: Full-time and Freelance product development roles",
  "Preferred contact: LinkedIn DM or Email",
  "Typical response time: within 24 hours",
];

/* ─── Animation Variants ─── */

const tabContentVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" as const } },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.06 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

/* ─── Helpers ─── */

function rarityClass(r: Rarity) {
  if (r === "LEGENDARY") return "rpg-skill-card--legendary";
  if (r === "EPIC") return "rpg-skill-card--epic";
  if (r === "RARE") return "rpg-skill-card--rare";
  return "";
}

/* ─── Counter Sub-Component ─── */
function AnimatedValue({ target }: { target: number }) {
  const val = useCounter(target, 1200);
  return <>{val}</>;
}

/* ─── 3D Tilt Hook ─── */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
  }, []);

  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
  }, []);

  return { ref, handleMove, handleLeave };
}

/* ─── TiltCard Wrapper ─── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, handleMove, handleLeave } = useTilt();
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={`rpg-tilt-card ${className ?? ""}`}>
      {children}
    </div>
  );
}

/* ─── Loading Screen ─── */
function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  return (
    <motion.div className="rpg-skeleton" initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 1.4, duration: 0.4 }}>
      <div className="rpg-skeleton-sword"><SwordIcon size={48} /></div>
      <p className="rpg-skeleton-text">LOADING CHARACTER SHEET...</p>
      <div className="rpg-skeleton-bar"><div className="rpg-skeleton-bar-fill" /></div>
    </motion.div>
  );
}

/* ─── Main Component ─── */

export default function Home() {
  const [activeTab, setActiveTab] = useState<SheetTab>("Character");
  const [avatarMissing, setAvatarMissing] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [musicOn, setMusicOn] = useState(false);

  const { playClick, playOpen } = useRPGSound(soundOn);
  const { start: startMusic, stop: stopMusic } = useRPGMusic(musicOn);

  // Typewriter for bio
  const { display: bioText, done: bioDone } = useTypewriter(characterBio.bio, 18, activeTab === "Character");

  // Music toggle
  useEffect(() => { if (musicOn) { startMusic(); } else { stopMusic(); } }, [musicOn, startMusic, stopMusic]);

  const switchTab = (key: SheetTab) => {
    setActiveTab(key);
    playClick();
  };

  return (
    <>
      <LoadingScreen />
      <ParticleBackground />

      {/* Audio Controls */}
      <div className="rpg-audio-panel">
        <button
          type="button"
          className={`rpg-audio-btn ${soundOn ? "rpg-audio-btn--active" : ""}`}
          onClick={() => { setSoundOn((v) => !v); }}
          title={soundOn ? "Sound FX: ON" : "Sound FX: OFF"}
        >
          {soundOn ? "🔊" : "🔇"}
        </button>
        <button
          type="button"
          className={`rpg-audio-btn ${musicOn ? "rpg-audio-btn--active" : ""}`}
          onClick={() => setMusicOn((v) => !v)}
          title={musicOn ? "Music: ON" : "Music: OFF"}
        >
          {musicOn ? "🎵" : "🎶"}
        </button>
      </div>

      <main className="rpg-main">
        <motion.div
          className="rpg-sheet"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const, delay: 1.6 }}
        >
          {/* ── Header ── */}
          <header>
            <h1 className="rpg-title">
              <span className="rpg-title-sword"><SwordIcon size={24} /></span>{" "}
              <span className="rpg-title-gradient">Character Sheet</span>{" "}
              <span className="rpg-title-sword"><SwordIcon size={24} /></span>
            </h1>

            <SwordDivider />

            <nav className="rpg-tabs" role="tablist" aria-label="Character tabs">
              {tabs.map(({ key, icon, label }) => (
                <motion.button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === key}
                  onClick={() => switchTab(key)}
                  className={`rpg-tab ${activeTab === key ? "rpg-tab--active" : ""}`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="rpg-tab-icon">{icon}</span>
                  {label}
                </motion.button>
              ))}
            </nav>
          </header>

          {/* ── Body ── */}
          <section className="rpg-avatar-section">
            {/* Left: Avatar + Progress */}
            <motion.aside
              className="rpg-avatar-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.8, ease: "easeOut" as const }}
            >
              <div className="rpg-avatar-frame">
                <div className="rpg-avatar-inner">
                  <span className="rpg-level-badge">LVL 25</span>
                  {avatarMissing ? (
                    <div className="flex h-full items-center justify-center bg-[#162f67] text-center font-[family-name:var(--font-heading)] text-xs text-[#9dc1ff]">
                      PIXEL AVATAR
                    </div>
                  ) : (
                    <Image
                      src="/assets/images/pixel-avatar.png"
                      alt="Pixel character portrait"
                      fill
                      priority
                      unoptimized
                      className="object-cover"
                      onError={() => setAvatarMissing(true)}
                    />
                  )}
                </div>
              </div>

              <div>
                <h2 className="rpg-avatar-name">ALI EREN TUMER</h2>
                <p className="rpg-avatar-title">Full Stack Developer</p>
              </div>

              <div className="rpg-progress-panel">
                {progressBars.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.0 + i * 0.08, duration: 0.4 }}
                  >
                    <div className="rpg-progress-row">
                      <span className="rpg-progress-label">
                        <span>{skill.icon}</span> {skill.name}
                      </span>
                      <span className="rpg-progress-value"><AnimatedValue target={skill.score} />/100</span>
                    </div>
                    <div className="rpg-progress-track">
                      <div className="rpg-progress-fill" style={{ width: `${skill.score}%`, backgroundColor: skill.color }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.aside>

            {/* Right: Tab Content */}
            <div className="rpg-content-panel" style={{ overflow: "hidden" }}>
              <AnimatePresence mode="wait">
                <motion.div key={activeTab} variants={tabContentVariants} initial="hidden" animate="visible" exit="exit">

                  {/* ═══ CHARACTER ═══ */}
                  {activeTab === "Character" && (
                    <>
                      <h3 className="rpg-content-title"><ShieldIcon size={16} /> Character Bio</h3>
                      <hr className="rpg-content-divider" />
                      <p className="font-[family-name:var(--font-body)] text-[1.5rem] leading-[1.15] text-[#d4e6ff]">
                        {bioText}
                        {!bioDone && <span className="rpg-typewriter-cursor" />}
                      </p>

                      <SwordDivider />

                      <div>
                        <h4 className="font-[family-name:var(--font-heading)] text-xs text-[#ffd36d]">
                          <SwordIcon size={14} className="inline-block mr-1 align-middle" /> Class
                        </h4>
                        <p className="mt-1.5 font-[family-name:var(--font-body)] text-[1.6rem] leading-none text-[#e6f0ff]">
                          {characterBio.playerClass}
                        </p>
                      </div>

                      <div className="mt-5">
                        <h4 className="font-[family-name:var(--font-heading)] text-xs text-[#ffd36d]">✨ Special Abilities</h4>
                        <motion.ul className="mt-2.5 space-y-1.5" variants={staggerContainer} initial="hidden" animate="visible">
                          {characterBio.abilities.map((a) => (
                            <motion.li key={a} variants={staggerItem} className="font-[family-name:var(--font-body)] text-[1.4rem] leading-[1.15] text-[#b9d3ff]">
                              • {a}
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>

                      <div className="mt-5">
                        <h4 className="font-[family-name:var(--font-heading)] text-xs text-[#ffd36d]">
                          <MapIcon size={14} className="inline-block mr-1 align-middle" /> Current Quest
                        </h4>
                        <p className="mt-1.5 font-[family-name:var(--font-body)] text-[1.4rem] leading-[1.15] text-[#d4e6ff]">
                          {characterBio.currentQuest}
                        </p>
                      </div>

                      <SwordDivider />

                      <h4 className="font-[family-name:var(--font-heading)] text-[0.55rem] text-[#7ba4ff] tracking-widest">
                        📌 PROVEN HIGHLIGHTS
                      </h4>
                      <ul className="mt-2 space-y-1.5">
                        {characterHighlights.map((item) => (
                          <li key={item} className="font-[family-name:var(--font-body)] text-[1.25rem] leading-[1.1] text-[#9dc1ff]">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {/* ═══ STATS ═══ */}
                  {activeTab === "Stats" && (
                    <>
                      <h3 className="rpg-content-title"><ChartIcon size={16} /> Tech Skills</h3>
                      <hr className="rpg-content-divider" />
                      <motion.div className="rpg-skill-tags mb-3" variants={staggerContainer} initial="hidden" animate="visible">
                        {proofStats.map((item) => (
                          <motion.span key={item.label} variants={staggerItem} className="rpg-skill-tag">
                            {item.label}: {item.value}
                          </motion.span>
                        ))}
                      </motion.div>
                      <motion.div className="rpg-skill-grid" variants={staggerContainer} initial="hidden" animate="visible">
                        {skills.map((s) => (
                          <motion.div key={s.name} variants={staggerItem}>
                            <TiltCard className={`rpg-skill-card ${rarityClass(s.rarity)}`}>
                              <span className="rpg-tooltip">⚡ {s.xpNeeded.toLocaleString()} XP to next level</span>
                              <div className="flex items-start justify-between gap-1">
                                <span className="rpg-skill-name">{s.icon} {s.name}</span>
                                <RarityBadge rarity={s.rarity} />
                              </div>
                              <p className="rpg-skill-level">Lvl {s.level}</p>
                              <div className="rpg-skill-bar-track">
                                <div className="rpg-skill-bar-fill" style={{ width: `${s.percent}%`, backgroundColor: s.color }} />
                              </div>
                            </TiltCard>
                          </motion.div>
                        ))}
                      </motion.div>
                    </>
                  )}

                  {/* ═══ QUESTS ═══ */}
                  {activeTab === "Quests" && (
                    <>
                      <h3 className="rpg-content-title"><MapIcon size={16} /> Quest Board</h3>
                      <hr className="rpg-content-divider" />

                      <h4 className="font-[family-name:var(--font-heading)] text-[0.5rem] text-[#22c55e] tracking-widest mt-2">
                        ⚡ ACTIVE QUESTS
                      </h4>
                      <motion.div className="rpg-quest-list" variants={staggerContainer} initial="hidden" animate="visible">
                        {quests.filter((q) => q.status === "active").map((q) => (
                          <motion.div key={q.title} variants={staggerItem} className="rpg-quest-card">
                            <div className="rpg-quest-header">
                              <span className="rpg-quest-title"><SwordIcon size={12} className="inline-block mr-1 align-middle" /> {q.title}</span>
                              <span className="rpg-quest-status rpg-quest-status--active">ACTIVE</span>
                            </div>
                            <p className="rpg-quest-desc">{q.role} • {q.period}</p>
                            <p className="rpg-quest-desc mt-1">{q.desc}</p>
                            <div className="rpg-quest-xp">
                              <span className="rpg-quest-xp-label">XP: <AnimatedValue target={q.xp} />/{q.maxXp.toLocaleString()}</span>
                              <div className="rpg-stat-track" style={{ flex: 1 }}>
                                <div className="rpg-stat-fill" style={{ width: `${(q.xp / q.maxXp) * 100}%`, backgroundColor: "#22c55e" }} />
                              </div>
                            </div>
                            <div className="rpg-skill-tags mt-2">
                              {q.milestones.map((m) => (<span key={m} className="rpg-skill-tag">✅ {m}</span>))}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>

                      <SwordDivider />

                      <h4 className="font-[family-name:var(--font-heading)] text-[0.5rem] text-[#7ba4ff] tracking-widest">
                        ✅ COMPLETED QUESTS
                      </h4>
                      <motion.div className="rpg-quest-list" variants={staggerContainer} initial="hidden" animate="visible">
                        {quests.filter((q) => q.status === "complete").map((q) => (
                          <motion.div key={q.title} variants={staggerItem} className="rpg-quest-card" style={{ opacity: 0.85 }}>
                            <div className="rpg-quest-header">
                              <span className="rpg-quest-title">✅ {q.title}</span>
                              <span className="rpg-quest-status rpg-quest-status--complete">COMPLETE</span>
                            </div>
                            <p className="rpg-quest-desc">{q.role} • {q.period}</p>
                            <p className="rpg-quest-desc mt-1">{q.desc}</p>
                            <div className="rpg-quest-xp">
                              <span className="rpg-quest-xp-label">XP: MAX</span>
                              <div className="rpg-stat-track" style={{ flex: 1 }}>
                                <div className="rpg-stat-fill" style={{ width: "100%", backgroundColor: "#7ba4ff" }} />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </>
                  )}

                  {/* ═══ ACHIEVEMENTS ═══ */}
                  {activeTab === "Achievements" && (
                    <>
                      <h3 className="rpg-content-title"><TrophyIcon size={16} /> Achievement Wall</h3>
                      <hr className="rpg-content-divider" />
                      <motion.div className="rpg-achievement-grid" variants={staggerContainer} initial="hidden" animate="visible">
                        {achievements.map((a) => (
                          <motion.div key={a.title} variants={staggerItem}>
                            <TiltCard className="rpg-achievement-card">
                              <div className="rpg-achievement-icon">{a.icon}</div>
                              <h4 className="rpg-achievement-title">{a.title}</h4>
                              <p className="rpg-achievement-subtitle">{a.place}</p>
                              <p className="rpg-achievement-subtitle" style={{ color: "#ffe078" }}>{a.period}</p>
                              <p className="rpg-achievement-desc mt-2">{a.desc}</p>
                              <div className="rpg-skill-tags">
                                {a.skills.map((s) => (<span key={s} className="rpg-skill-tag">{s}</span>))}
                              </div>
                              <div className="rpg-stars">{"⭐".repeat(a.stars)}{"☆".repeat(5 - a.stars)}</div>
                            </TiltCard>
                          </motion.div>
                        ))}
                      </motion.div>

                      <SwordDivider />

                      <h4 className="font-[family-name:var(--font-heading)] text-[0.55rem] text-[#ffd36d] tracking-widest">
                        📜 CERTIFICATIONS
                      </h4>
                      <motion.div className="rpg-skill-tags mt-2" variants={staggerContainer} initial="hidden" animate="visible">
                        {certifications.map((c) => (
                          <motion.span key={c} variants={staggerItem} className="rpg-skill-tag">✅ {c}</motion.span>
                        ))}
                      </motion.div>

                      <SwordDivider />

                      <h4 className="font-[family-name:var(--font-heading)] text-[0.55rem] text-[#7ba4ff] tracking-widest mt-4">
                        🌍 LANGUAGES
                      </h4>
                      <motion.div className="mt-3 space-y-3" variants={staggerContainer} initial="hidden" animate="visible">
                        {languages.map((lang) => (
                          <motion.div key={lang.name} variants={staggerItem} className="flex items-center gap-3 p-3 rounded-md bg-[#0d1a3a]/60 border border-[rgba(93,134,246,0.2)]">
                            <span className="text-2xl">{lang.flag}</span>
                            <div className="flex-1">
                              <h5 className="font-[family-name:var(--font-body)] text-lg text-[#d4e6ff]">{lang.name}</h5>
                              <p className="font-[family-name:var(--font-heading)] text-[0.6rem] text-[#9dc1ff] tracking-wider uppercase">{lang.level}</p>
                            </div>
                            <div className="rpg-stars text-sm">{"⭐".repeat(lang.stars)}{"☆".repeat(5 - lang.stars)}</div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </>
                  )}

                  {/* ═══ INVENTORY ═══ */}
                  {activeTab === "Inventory" && (
                    <>
                      <h3 className="rpg-content-title"><ChestIcon size={16} /> Project Inventory</h3>
                      <hr className="rpg-content-divider" />
                      <motion.div className="rpg-inventory-grid" variants={staggerContainer} initial="hidden" animate="visible">
                        {projects.map((p) => (
                          <motion.div key={p.title} variants={staggerItem}>
                            <TiltCard className="rpg-inventory-card">
                              <div className="rpg-inventory-header">
                                <span className="rpg-inventory-title">{p.icon} {p.title}</span>
                                <RarityBadge rarity={p.rarity} />
                              </div>
                              <p className="rpg-inventory-desc">{p.desc}</p>
                              <div className="rpg-stat-bars">
                                {[
                                  { name: "Power", value: p.power, color: "#ef4444" },
                                  { name: "Complexity", value: p.complexity, color: "#facc15" },
                                  { name: "Impact", value: p.impact, color: "#22c55e" },
                                ].map((stat) => (
                                  <div key={stat.name} className="rpg-stat-row">
                                    <span className="rpg-stat-name">{stat.name}</span>
                                    <div className="rpg-stat-track">
                                      <div className="rpg-stat-fill" style={{ width: `${stat.value}%`, backgroundColor: stat.color }} />
                                    </div>
                                    <span className="rpg-stat-value"><AnimatedValue target={stat.value} /></span>
                                  </div>
                                ))}
                              </div>
                              <div className="rpg-skill-tags">
                                {p.stack.map((t) => (<span key={t} className="rpg-skill-tag">{t}</span>))}
                              </div>
                              {p.url && (
                                <a href={p.url} target="_blank" rel="noopener noreferrer" className="rpg-inventory-link">🔗 Visit</a>
                              )}
                            </TiltCard>
                          </motion.div>
                        ))}
                      </motion.div>
                    </>
                  )}

                  {/* ═══ CONTACT ═══ */}
                  {activeTab === "Contact" && (
                    <>
                      <h3 className="rpg-content-title"><ScrollIcon size={16} /> Guild Contact</h3>
                      <hr className="rpg-content-divider" />
                      <p className="font-[family-name:var(--font-body)] text-[1.4rem] leading-[1.15] text-[#b9d3ff] mb-4">
                        Open to freelance and team opportunities in modern full-stack product development.
                      </p>
                      <ul className="mb-4 space-y-1.5">
                        {contactCta.map((line) => (
                          <li key={line} className="font-[family-name:var(--font-body)] text-[1.2rem] leading-[1.1] text-[#9dc1ff]">
                            • {line}
                          </li>
                        ))}
                      </ul>
                      <motion.div className="rpg-contact-grid" variants={staggerContainer} initial="hidden" animate="visible">
                        {contacts.map((c) => (
                          <motion.a
                            key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                            className="rpg-contact-card" variants={staggerItem}
                            whileHover={{ scale: 1.02, y: -2 }}
                            onClick={() => playOpen()}
                          >
                            <span className="rpg-contact-icon">{c.icon}</span>
                            <div>
                              <p className="rpg-contact-label">{c.label}</p>
                              <p className="rpg-contact-value">{c.value}</p>
                            </div>
                          </motion.a>
                        ))}
                      </motion.div>
                    </>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>
          </section>

          <RPGFooter />
        </motion.div>
      </main>
    </>
  );
}
