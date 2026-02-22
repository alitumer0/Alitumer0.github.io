"use client";

import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import RarityBadge, { type Rarity } from "@/components/rpg/RarityBadge";
import { SwordIcon, ShieldIcon, ChartIcon, MapIcon, TrophyIcon, ChestIcon, ScrollIcon } from "@/components/rpg/RPGIcons";
import SwordDivider from "@/components/rpg/SwordDivider";

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
  bio: "I am a passionate Full-Stack Developer with strong problem-solving skills and a focus on creating user-friendly applications. I continuously improve my skills and stay current with modern technology trends.",
  playerClass: "Full-Stack Developer",
  abilities: [
    "Problem-Solving & Analytical Thinking",
    "Teamwork, Leadership and Communication",
    "React.js / Next.js Frontend Development",
    "ASP.NET Core and RESTful API Development",
  ],
  currentQuest: "Building AI-powered products while delivering production-ready full-stack web applications.",
};

const progressBars = [
  { name: "Coding", score: 90, color: "#3b82f6", icon: "💻" },
  { name: "Problem Solving", score: 92, color: "#a855f7", icon: "🧩" },
  { name: "Teamwork", score: 88, color: "#22c55e", icon: "🤝" },
  { name: "Communication", score: 87, color: "#facc15", icon: "💬" },
  { name: "Time Management", score: 85, color: "#ef4444", icon: "⏰" },
];

interface Skill {
  name: string;
  level: number;
  percent: number;
  rarity: Rarity;
  color: string;
  icon: string;
}

const skills: Skill[] = [
  { name: "React.js", level: 9, percent: 90, rarity: "LEGENDARY", color: "#61dafb", icon: "⚛️" },
  { name: "Next.js", level: 8, percent: 82, rarity: "EPIC", color: "#a855f7", icon: "🔺" },
  { name: "JavaScript", level: 9, percent: 92, rarity: "LEGENDARY", color: "#f7df1e", icon: "⚡" },
  { name: "TypeScript", level: 8, percent: 80, rarity: "EPIC", color: "#3178c6", icon: "🔷" },
  { name: "C#", level: 8, percent: 82, rarity: "EPIC", color: "#9b4dca", icon: "🎯" },
  { name: "ASP.NET Core", level: 8, percent: 80, rarity: "EPIC", color: "#512bd4", icon: "🏗️" },
  { name: "Python", level: 7, percent: 70, rarity: "RARE", color: "#3572a5", icon: "🐍" },
  { name: "HTML/CSS", level: 9, percent: 93, rarity: "LEGENDARY", color: "#e44d26", icon: "🎨" },
  { name: "SQL Server", level: 7, percent: 72, rarity: "RARE", color: "#cc2927", icon: "🗄️" },
  { name: "MongoDB", level: 6, percent: 62, rarity: "RARE", color: "#47a248", icon: "🍃" },
  { name: "Docker", level: 6, percent: 60, rarity: "RARE", color: "#2496ed", icon: "📦" },
  { name: "Git", level: 9, percent: 90, rarity: "LEGENDARY", color: "#f05032", icon: "🔀" },
  { name: "Tailwind", level: 8, percent: 84, rarity: "EPIC", color: "#06b6d4", icon: "🌊" },
  { name: "Bootstrap", level: 7, percent: 75, rarity: "RARE", color: "#7952b3", icon: "🅱️" },
  { name: "REST APIs", level: 8, percent: 85, rarity: "EPIC", color: "#22c55e", icon: "🔌" },
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
    desc: "Building enterprise-grade applications with ASP.NET Core, React, and SQL Server.",
    xp: 8500,
    maxXp: 10000,
    status: "active",
    milestones: ["React Mastery", "API Design", "Database Modeling"],
  },
  {
    title: "Freelance Development",
    role: "Full-Stack Developer",
    period: "2024 — Present",
    desc: "Delivering custom web solutions for clients, from landing pages to full SaaS platforms.",
    xp: 6200,
    maxXp: 10000,
    status: "active",
    milestones: ["Client Management", "E2E Delivery", "CI/CD Pipelines"],
  },
  {
    title: "Student Management System",
    role: "Full-Stack Developer",
    period: "2024",
    desc: "Complete student management system with authentication, reporting and clean UX.",
    xp: 10000,
    maxXp: 10000,
    status: "complete",
    milestones: ["Auth System", "Reporting Dashboard", "UX Design"],
  },
  {
    title: "Asset & Inventory Systems",
    role: "Backend Developer",
    period: "2024",
    desc: "Asset assignment, inventory tracking, and library automation systems.",
    xp: 10000,
    maxXp: 10000,
    status: "complete",
    milestones: ["Asset Tracking", "Automation", "Inventory Logic"],
  },
];

interface Achievement {
  icon: string;
  title: string;
  place: string;
  period: string;
  desc: string;
  skills: string[];
  stars: number;
}

const achievements: Achievement[] = [
  {
    icon: "🎓",
    title: "BilgeAdam Boost",
    place: "Full-Stack Development Program",
    period: "Sep 2024 — Jul 2025",
    desc: "Intensive full-stack bootcamp covering React, ASP.NET Core, Docker, and cloud deployment.",
    skills: ["React", "ASP.NET Core", "SQL", "Docker", "CI/CD"],
    stars: 5,
  },
  {
    icon: "🎓",
    title: "Anadolu University",
    place: "Web Design and Coding",
    period: "GPA: 3.00",
    desc: "Associate degree in web design emphasizing frontend technologies and responsive design.",
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    stars: 4,
  },
  {
    icon: "🎓",
    title: "Dokuz Eylul University",
    place: "Electrical Technology",
    period: "GPA: 3.11",
    desc: "Foundation in engineering thinking, systems analysis, and technical problem-solving.",
    skills: ["Systems Analysis", "Problem Solving", "Technical Foundation"],
    stars: 4,
  },
];

const certifications = [
  "Git/GitHub/GitLab",
  "Jira",
  "Web Scraping",
  "Python Programming",
  "Agile/Scrum",
];

interface Project {
  icon: string;
  title: string;
  rarity: Rarity;
  desc: string;
  power: number;
  complexity: number;
  impact: number;
  stack: string[];
  url?: string;
}

const projects: Project[] = [
  {
    icon: "🏢",
    title: "Advance Management System",
    rarity: "EPIC",
    desc: "Enterprise approval workflows, notifications, and reporting dashboard for advance management.",
    power: 85,
    complexity: 80,
    impact: 88,
    stack: ["ASP.NET Core", "React", "SQL Server", "Identity"],
  },
  {
    icon: "🍽️",
    title: "AllerCheck",
    rarity: "LEGENDARY",
    desc: "Food allergy-safe consumption platform helping users identify allergens and safe alternatives.",
    power: 90,
    complexity: 75,
    impact: 92,
    stack: ["React", "Node.js", "MongoDB", "REST API"],
  },
  {
    icon: "📈",
    title: "Stock Trading Bot",
    rarity: "EPIC",
    desc: "Automated trading bot with real-time market analysis and React frontend dashboard.",
    power: 82,
    complexity: 90,
    impact: 78,
    stack: ["C#", "React", "WebSocket", "Market APIs"],
  },
  {
    icon: "🤖",
    title: "AI Note-Taking App",
    rarity: "RARE",
    desc: "AI-powered note-taking application with smart categorization and search.",
    power: 70,
    complexity: 68,
    impact: 72,
    stack: ["Python", "React", "AI/ML", "REST API"],
  },
  {
    icon: "🍳",
    title: "Recipe Suggestion App",
    rarity: "RARE",
    desc: "Ingredient-based recipe suggestion app with AI-powered recommendations.",
    power: 68,
    complexity: 60,
    impact: 75,
    stack: ["React", "Python", "OpenAI API", "Mobile"],
  },
];

const contacts = [
  { icon: "📧", label: "EMAIL", value: "aetumer50@gmail.com", href: "mailto:aetumer50@gmail.com" },
  { icon: "📱", label: "MOBILE", value: "+90 541 271 8051", href: "tel:+905412718051" },
  { icon: "🌐", label: "PORTFOLIO", value: "alitumer0.github.io", href: "https://alitumer0.github.io" },
  { icon: "💻", label: "GITHUB", value: "github.com/alitumer0", href: "https://github.com/alitumer0" },
  { icon: "💼", label: "LINKEDIN", value: "linkedin.com/in/alitumer", href: "https://linkedin.com/in/alitumer" },
];

/* ─── Animation Variants ─── */

const tabContentVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.06 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

/* ─── Rarity CSS helper ─── */

function rarityClass(r: Rarity) {
  if (r === "LEGENDARY") return "rpg-skill-card--legendary";
  if (r === "EPIC") return "rpg-skill-card--epic";
  if (r === "RARE") return "rpg-skill-card--rare";
  return "";
}

/* ─── Component ─── */

export default function Home() {
  const [activeTab, setActiveTab] = useState<SheetTab>("Character");
  const [avatarMissing, setAvatarMissing] = useState(false);

  return (
    <>
      <ParticleBackground />

      <main className="rpg-main">
        <motion.div
          className="rpg-sheet"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* ── Header ── */}
          <header>
            <h1 className="rpg-title">
              <span className="rpg-title-sword"><SwordIcon size={24} /></span>{" "}
              Character Sheet{" "}
              <span className="rpg-title-sword"><SwordIcon size={24} /></span>
            </h1>

            <SwordDivider />

            {/* Tab Navigation */}
            <nav className="rpg-tabs" role="tablist" aria-label="Character tabs">
              {tabs.map(({ key, icon, label }) => (
                <motion.button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === key}
                  onClick={() => setActiveTab(key)}
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
            {/* Left Column: Avatar + Progress */}
            <motion.aside
              className="rpg-avatar-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Avatar Frame */}
              <div className="rpg-avatar-frame">
                <div className="rpg-avatar-inner">
                  <span className="rpg-level-badge">LVL 29</span>
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

              {/* Name */}
              <div>
                <h2 className="rpg-avatar-name">ALI EREN TUMER</h2>
                <p className="rpg-avatar-title">Full Stack Developer</p>
              </div>

              {/* Progress Bars */}
              <div className="rpg-progress-panel">
                {progressBars.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  >
                    <div className="rpg-progress-row">
                      <span className="rpg-progress-label">
                        <span>{skill.icon}</span> {skill.name}
                      </span>
                      <span className="rpg-progress-value">{skill.score}/100</span>
                    </div>
                    <div className="rpg-progress-track">
                      <div
                        className="rpg-progress-fill"
                        style={{ width: `${skill.score}%`, backgroundColor: skill.color }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.aside>

            {/* Right Column: Tab Content */}
            <div className="rpg-content-panel" style={{ overflow: "hidden" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* ═══ CHARACTER TAB ═══ */}
                  {activeTab === "Character" && (
                    <>
                      <h3 className="rpg-content-title"><ShieldIcon size={16} /> Character Bio</h3>
                      <hr className="rpg-content-divider" />
                      <p className="font-[family-name:var(--font-body)] text-[1.5rem] leading-[1.15] text-[#d4e6ff]">
                        {characterBio.bio}
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
                    </>
                  )}

                  {/* ═══ STATS TAB ═══ */}
                  {activeTab === "Stats" && (
                    <>
                      <h3 className="rpg-content-title"><ChartIcon size={16} /> Tech Skills</h3>
                      <hr className="rpg-content-divider" />
                      <motion.div className="rpg-skill-grid" variants={staggerContainer} initial="hidden" animate="visible">
                        {skills.map((s) => (
                          <motion.div key={s.name} variants={staggerItem} className={`rpg-skill-card ${rarityClass(s.rarity)}`}>
                            <div className="flex items-start justify-between gap-1">
                              <span className="rpg-skill-name">{s.icon} {s.name}</span>
                              <RarityBadge rarity={s.rarity} />
                            </div>
                            <p className="rpg-skill-level">Lvl {s.level}</p>
                            <div className="rpg-skill-bar-track">
                              <div
                                className="rpg-skill-bar-fill"
                                style={{ width: `${s.percent}%`, backgroundColor: s.color }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </>
                  )}

                  {/* ═══ QUESTS TAB ═══ */}
                  {activeTab === "Quests" && (
                    <>
                      <h3 className="rpg-content-title"><MapIcon size={16} /> Quest Board</h3>
                      <hr className="rpg-content-divider" />

                      {/* Active Quests */}
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
                              <span className="rpg-quest-xp-label">XP: {q.xp.toLocaleString()}/{q.maxXp.toLocaleString()}</span>
                              <div className="rpg-stat-track" style={{ flex: 1 }}>
                                <div
                                  className="rpg-stat-fill"
                                  style={{ width: `${(q.xp / q.maxXp) * 100}%`, backgroundColor: "#22c55e" }}
                                />
                              </div>
                            </div>
                            <div className="rpg-skill-tags mt-2">
                              {q.milestones.map((m) => (
                                <span key={m} className="rpg-skill-tag">✅ {m}</span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>

                      <SwordDivider />

                      {/* Completed Quests */}
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
                                <div
                                  className="rpg-stat-fill"
                                  style={{ width: "100%", backgroundColor: "#7ba4ff" }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </>
                  )}

                  {/* ═══ ACHIEVEMENTS TAB ═══ */}
                  {activeTab === "Achievements" && (
                    <>
                      <h3 className="rpg-content-title"><TrophyIcon size={16} /> Achievement Wall</h3>
                      <hr className="rpg-content-divider" />

                      <motion.div className="rpg-achievement-grid" variants={staggerContainer} initial="hidden" animate="visible">
                        {achievements.map((a) => (
                          <motion.div key={a.title} variants={staggerItem} className="rpg-achievement-card">
                            <div className="rpg-achievement-icon">{a.icon}</div>
                            <h4 className="rpg-achievement-title">{a.title}</h4>
                            <p className="rpg-achievement-subtitle">{a.place}</p>
                            <p className="rpg-achievement-subtitle" style={{ color: "#ffe078" }}>{a.period}</p>
                            <p className="rpg-achievement-desc mt-2">{a.desc}</p>
                            <div className="rpg-skill-tags">
                              {a.skills.map((s) => (
                                <span key={s} className="rpg-skill-tag">{s}</span>
                              ))}
                            </div>
                            <div className="rpg-stars">
                              {"⭐".repeat(a.stars)}{"☆".repeat(5 - a.stars)}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>

                      <SwordDivider />

                      {/* Certifications */}
                      <h4 className="font-[family-name:var(--font-heading)] text-[0.55rem] text-[#ffd36d] tracking-widest">
                        📜 CERTIFICATIONS
                      </h4>
                      <motion.div className="rpg-skill-tags mt-2" variants={staggerContainer} initial="hidden" animate="visible">
                        {certifications.map((c) => (
                          <motion.span key={c} variants={staggerItem} className="rpg-skill-tag">✅ {c}</motion.span>
                        ))}
                      </motion.div>
                    </>
                  )}

                  {/* ═══ INVENTORY TAB ═══ */}
                  {activeTab === "Inventory" && (
                    <>
                      <h3 className="rpg-content-title"><ChestIcon size={16} /> Project Inventory</h3>
                      <hr className="rpg-content-divider" />

                      <motion.div className="rpg-inventory-grid" variants={staggerContainer} initial="hidden" animate="visible">
                        {projects.map((p) => (
                          <motion.div key={p.title} variants={staggerItem} className="rpg-inventory-card">
                            <div className="rpg-inventory-header">
                              <span className="rpg-inventory-title">{p.icon} {p.title}</span>
                              <RarityBadge rarity={p.rarity} />
                            </div>
                            <p className="rpg-inventory-desc">{p.desc}</p>

                            {/* Stat Bars */}
                            <div className="rpg-stat-bars">
                              {[
                                { name: "Power", value: p.power, color: "#ef4444" },
                                { name: "Complexity", value: p.complexity, color: "#facc15" },
                                { name: "Impact", value: p.impact, color: "#22c55e" },
                              ].map((stat) => (
                                <div key={stat.name} className="rpg-stat-row">
                                  <span className="rpg-stat-name">{stat.name}</span>
                                  <div className="rpg-stat-track">
                                    <div
                                      className="rpg-stat-fill"
                                      style={{ width: `${stat.value}%`, backgroundColor: stat.color }}
                                    />
                                  </div>
                                  <span className="rpg-stat-value">{stat.value}</span>
                                </div>
                              ))}
                            </div>

                            {/* Tech Stack Tags */}
                            <div className="rpg-skill-tags">
                              {p.stack.map((t) => (
                                <span key={t} className="rpg-skill-tag">{t}</span>
                              ))}
                            </div>

                            {p.url && (
                              <a href={p.url} target="_blank" rel="noopener noreferrer" className="rpg-inventory-link">
                                🔗 Visit Project
                              </a>
                            )}
                          </motion.div>
                        ))}
                      </motion.div>
                    </>
                  )}

                  {/* ═══ CONTACT TAB ═══ */}
                  {activeTab === "Contact" && (
                    <>
                      <h3 className="rpg-content-title"><ScrollIcon size={16} /> Guild Contact</h3>
                      <hr className="rpg-content-divider" />
                      <p className="font-[family-name:var(--font-body)] text-[1.4rem] leading-[1.15] text-[#b9d3ff] mb-4">
                        Open to freelance and team opportunities in modern full-stack product development.
                      </p>

                      <motion.div className="rpg-contact-grid" variants={staggerContainer} initial="hidden" animate="visible">
                        {contacts.map((c) => (
                          <motion.a
                            key={c.label}
                            href={c.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rpg-contact-card"
                            variants={staggerItem}
                            whileHover={{ scale: 1.02, y: -2 }}
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
        </motion.div>
      </main>
    </>
  );
}
