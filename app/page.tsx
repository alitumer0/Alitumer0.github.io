"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type SheetTab = "Character" | "Stats" | "Quests" | "Achievements" | "Inventory" | "Contact";

const tabs: SheetTab[] = ["Character", "Stats", "Quests", "Achievements", "Inventory"];

const tabContent: Record<
  SheetTab,
  {
    bio: string;
    playerClass: string;
    abilities: string[];
    currentQuest: string;
  }
> = {
  Character: {
    bio: "I am a passionate Full-Stack Developer with strong problem-solving skills and a focus on creating user-friendly applications. I continuously improve my skills and stay current with modern technology trends.",
    playerClass: "Full-Stack Developer",
    abilities: [
      "Problem-Solving & Analytical Thinking",
      "Teamwork, Leadership and Communication",
      "React.js / Next.js Frontend Development",
      "ASP.NET Core and RESTful API Development"
    ],
    currentQuest: "Building AI-powered products while delivering production-ready full-stack web applications."
  },
  Stats: {
    bio: "My technical profile covers frontend, backend, database, and delivery practices in one complete workflow.",
    playerClass: "Tech Specialist",
    abilities: [
      "Frontend: React.js, Next.js, HTML5, CSS3, JavaScript, Bootstrap, Tailwind",
      "Backend: ASP.NET Core, RESTful APIs, C#, Python",
      "Data & Tools: SQL Server, MongoDB, Git, GitHub, Docker",
      "Practices: CI/CD, Agile, Database Design, Performance Optimization"
    ],
    currentQuest: "Developing a Stock Trading Bot in C with React frontend integration."
  },
  Quests: {
    bio: "Current mission line combines internship and freelance tracks with end-to-end product delivery.",
    playerClass: "Quest Runner",
    abilities: [
      "BilgeAdam Akademi - Full-Stack Developer Intern (Oct 2024 - Present)",
      "Freelance - Full-Stack Developer (2024 - Present)",
      "Student Management System (ASP.NET Core, SQL, React)",
      "Asset-Inventory, Asset Assignment and Library Automation Systems"
    ],
    currentQuest: "Expanding workflow-driven business systems with authentication, reporting and clean UX."
  },
  Achievements: {
    bio: "Education and certifications represent consistent growth in software engineering and professional practice.",
    playerClass: "Achievement Hunter",
    abilities: [
      "BilgeAdam Boost - Full-Stack Development Program (Sep 2024 - Jul 2025)",
      "Anadolu University - Web Design and Coding (GPA 3.00)",
      "Dokuz Eylul University - Electrical Technology (GPA 3.11)",
      "Certifications: Git/GitHub/GitLab/Jira, Web Scraping, Python Programming"
    ],
    currentQuest: "Turning hands-on learning and certifications into stronger production outcomes."
  },
  Inventory: {
    bio: "My project inventory includes business systems and product-focused applications across web and mobile domains.",
    playerClass: "System Builder",
    abilities: [
      "Advance Management System (approval workflows, notifications, reporting)",
      "AllerCheck (food allergy-safe consumption platform)",
      "Stock Trading Bot (ongoing)",
      "AI Note-Taking App and Recipe Suggestion App (ongoing)"
    ],
    currentQuest: "Converting ongoing prototypes into polished and deployable products."
  },
  Contact: {
    bio: "Open to freelance and team opportunities in modern full-stack product development.",
    playerClass: "Guild Contact",
    abilities: [
      "Email: aetumer50@gmail.com",
      "Mobile: +90 541 271 8051",
      "Portfolio: alitumer0.github.io",
      "GitHub: github.com/alitumer0 | LinkedIn: linkedin.com/in/alitumer"
    ],
    currentQuest: "Collaborating on scalable products with strong UX and maintainable architecture."
  }
};

const progressBars = [
  { name: "Coding", score: 90, color: "#3b82f6" },
  { name: "Problem Solving", score: 92, color: "#a855f7" },
  { name: "Teamwork", score: 88, color: "#22c55e" },
  { name: "Communication", score: 87, color: "#facc15" },
  { name: "Time Management", score: 85, color: "#ef4444" }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<SheetTab>("Character");
  const [avatarMissing, setAvatarMissing] = useState(false);

  const content = useMemo(() => tabContent[activeTab], [activeTab]);

  return (
    <main className="flex min-h-screen items-start bg-[#202127] px-4 py-10 text-[#d4e7ff] sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-[940px] border-2 border-[#cb7928] bg-[#041646] p-4 shadow-[0_0_0_2px_#8b4d1b] sm:p-6">
        <header className="text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-lg tracking-[0.12em] text-[#ffc24b] sm:text-4xl">
            Character Sheet
          </h1>
          <div className="mt-4 border-t-2 border-[#ba6a25]" />

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3" role="tablist" aria-label="Character tabs">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab)}
                  className={`border-2 px-3 py-1.5 font-[family-name:var(--font-heading)] text-[9px] tracking-[0.09em] transition sm:px-4 sm:py-2 sm:text-xs ${
                    isActive
                      ? "border-[#90b8ff] bg-[#5d86f6] text-white shadow-[inset_0_0_0_1px_#b3ccff]"
                      : "border-[#4a73d8] bg-[#2e437f] text-[#9ac0ff] hover:bg-[#3a549f]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={() => setActiveTab("Contact")}
              className={`border-2 px-5 py-1.5 font-[family-name:var(--font-heading)] text-[9px] tracking-[0.09em] transition sm:px-6 sm:py-2 sm:text-xs ${
                activeTab === "Contact"
                  ? "border-[#90b8ff] bg-[#5d86f6] text-white shadow-[inset_0_0_0_1px_#b3ccff]"
                  : "border-[#4a73d8] bg-[#2e437f] text-[#9ac0ff] hover:bg-[#3a549f]"
              }`}
            >
              Contact
            </button>
          </div>
        </header>

        <section className="mt-6 grid gap-5 md:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="mx-auto w-full max-w-[230px] border-4 border-[#cb7928] bg-[#0d224f] p-1.5">
              <div className="relative h-[230px] border-2 border-[#4067bf] bg-[#0e244f] p-1">
                <span className="absolute left-2 top-2 z-10 font-[family-name:var(--font-heading)] text-sm text-[#ffd36d]">
                  LVL 29
                </span>

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

            <div className="text-center">
              <h2 className="font-[family-name:var(--font-heading)] text-sm text-[#ffc24b] sm:text-base">ALI EREN TUMER</h2>
              <p className="mt-2 font-[family-name:var(--font-body)] text-[1.8rem] leading-none text-[#9dc1ff]">
                Full Stack Developer
              </p>
            </div>

            <div className="space-y-3 rounded-none border-2 border-[#3f67be] bg-[#102a5f] p-3.5">
              {progressBars.map((skill) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-[family-name:var(--font-body)] text-[1.55rem] leading-none text-[#d3e5ff]">
                      {skill.name}
                    </span>
                    <span className="font-[family-name:var(--font-heading)] text-[10px] text-[#ffe078]">{skill.score}/100</span>
                  </div>
                  <div className="h-4 border-2 border-[#4c76db] bg-[#1a376f] p-[2px]">
                    <div className="h-full" style={{ width: `${skill.score}%`, backgroundColor: skill.color }} />
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <article className="border-2 border-[#4a73d8] bg-[#1b2f66] p-4 sm:p-5">
            <h3 className="font-[family-name:var(--font-heading)] text-base text-[#ffcc5a] sm:text-lg">Character Bio</h3>
            <div className="mt-3 border-t-2 border-[#4a73d8]" />

            <p className="mt-4 font-[family-name:var(--font-body)] text-[1.6rem] leading-[1.1] text-[#d4e6ff]">{content.bio}</p>

            <section className="mt-5">
              <h4 className="font-[family-name:var(--font-heading)] text-xs text-[#ffd36d] sm:text-sm">Class</h4>
              <p className="mt-1.5 font-[family-name:var(--font-body)] text-[1.7rem] leading-none text-[#e6f0ff]">{content.playerClass}</p>
            </section>

            <section className="mt-5">
              <h4 className="font-[family-name:var(--font-heading)] text-xs text-[#ffd36d] sm:text-sm">
                Special Abilities
              </h4>
              <ul className="mt-2.5 space-y-1">
                {content.abilities.map((ability) => (
                  <li key={ability} className="font-[family-name:var(--font-body)] text-[1.45rem] leading-[1.1] text-[#b9d3ff]">
                    • {ability}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-5">
              <h4 className="font-[family-name:var(--font-heading)] text-xs text-[#ffd36d] sm:text-sm">Current Quest</h4>
              <p className="mt-1.5 font-[family-name:var(--font-body)] text-[1.5rem] leading-[1.1] text-[#d4e6ff]">
                {content.currentQuest}
              </p>
            </section>
          </article>
        </section>
      </div>
    </main>
  );
}
