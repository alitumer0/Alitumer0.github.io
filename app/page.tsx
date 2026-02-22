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
    bio: "Modern web teknolojileriyle performanslı ve ölçeklenebilir ürünler geliştiriyorum. Frontend deneyimini retro estetikle birleştirip kullanıcıya akıcı ve karakter sahibi arayüzler sunmayı seviyorum.",
    playerClass: "Full Stack Developer",
    abilities: [
      "Next.js + Tailwind ile yüksek hızlı UI geliştirme",
      "TypeScript ile sürdürülebilir kod mimarisi",
      "API entegrasyonu ve backend iş akışları",
      "Tasarım sistemlerini ürüne dönüştürme"
    ],
    currentQuest: "RPG Character Sheet temalı, mobil uyumlu ve üretime hazır bir portfolio deneyimi inşa etmek."
  },
  Stats: {
    bio: "Kod kalitesi, performans ve geliştirici deneyimini aynı anda optimize eden bir çalışma biçimi benimsiyorum.",
    playerClass: "System Optimizer",
    abilities: [
      "Yüksek Lighthouse skorları",
      "Erişilebilirlik odaklı bileşen geliştirme",
      "Refactor ve teknik borç azaltma",
      "CI/CD ve release disiplini"
    ],
    currentQuest: "Uygulamayı 60fps animasyonlar ve daha iyi Core Web Vitals skorları ile güçlendirmek."
  },
  Quests: {
    bio: "Her proje bir görev zinciri: keşif, planlama, geliştirme, test ve yayın. Süreç boyunca görünür ilerleme üretmeye odaklanıyorum.",
    playerClass: "Quest Architect",
    abilities: [
      "Sprint planlama",
      "Risk ve kapsam yönetimi",
      "Teknik dökümantasyon",
      "Takım içi bilgi paylaşımı"
    ],
    currentQuest: "Yeni bir ürün modülünü uçtan uca geliştirip canlıya almak."
  },
  Achievements: {
    bio: "Gerçek ürün problemlerine çözüm üreten ve kullanıcı davranışında ölçülebilir etki yaratan projeler geliştirdim.",
    playerClass: "Achievement Hunter",
    abilities: [
      "0'dan üretime proje teslimi",
      "Çoklu dil ve çoklu tema desteği",
      "Dashboard ve veri görselleştirme",
      "Performans odaklı yeniden yapılandırmalar"
    ],
    currentQuest: "Portfolyoya yeni vaka analizleri ve etki metrikleri eklemek."
  },
  Inventory: {
    bio: "Teknoloji envanterimi doğru probleme doğru araç prensibiyle kullanırım. Basit, test edilebilir ve sürdürülebilir çözüm önceliklidir.",
    playerClass: "Stack Keeper",
    abilities: ["Next.js", "Tailwind CSS", "TypeScript", "Node.js", "PostgreSQL", "Git/GitHub"],
    currentQuest: "Modüler component kütüphanesi oluşturarak geliştirme hızını artırmak."
  },
  Contact: {
    bio: "Yeni bir görev, freelance proje veya ekip fırsatı için iletişime geçebilirsin.",
    playerClass: "Guild Communicator",
    abilities: ["E-posta: hello@example.com", "LinkedIn: /in/username", "GitHub: /username", "Konum: Türkiye (Remote)"],
    currentQuest: "Bir sonraki güçlü ürünü birlikte geliştirecek doğru takımı bulmak."
  }
};

const progressBars = [
  { name: "Coding", score: 92, color: "#3b82f6" },
  { name: "Problem Solving", score: 88, color: "#a855f7" },
  { name: "Teamwork", score: 90, color: "#22c55e" },
  { name: "Communication", score: 84, color: "#facc15" },
  { name: "Time Management", score: 78, color: "#ef4444" }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<SheetTab>("Character");
  const [username, setUsername] = useState("KULLANICI_ADI");
  const [avatarMissing, setAvatarMissing] = useState(false);

  const content = useMemo(() => tabContent[activeTab], [activeTab]);

  return (
    <main className="min-h-screen bg-[#202127] px-4 py-8 text-[#d4e7ff] sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl border-2 border-[#cb7928] bg-[#041646] p-4 shadow-[0_0_0_2px_#8b4d1b] sm:p-7">
        <header className="text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-xl tracking-[0.12em] text-[#ffc24b] sm:text-3xl">
            Character Sheet
          </h1>
          <div className="mt-5 border-t-2 border-[#ba6a25]" />

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3" role="tablist" aria-label="Character tabs">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab)}
                  className={`border-2 px-4 py-2 font-[family-name:var(--font-heading)] text-[10px] tracking-[0.09em] transition sm:text-sm ${
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
              className={`border-2 px-6 py-2 font-[family-name:var(--font-heading)] text-[10px] tracking-[0.09em] transition sm:text-sm ${
                activeTab === "Contact"
                  ? "border-[#90b8ff] bg-[#5d86f6] text-white shadow-[inset_0_0_0_1px_#b3ccff]"
                  : "border-[#4a73d8] bg-[#2e437f] text-[#9ac0ff] hover:bg-[#3a549f]"
              }`}
            >
              Contact
            </button>
          </div>
        </header>

        <section className="mt-8 grid gap-6 md:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-5">
            <div className="mx-auto w-full max-w-[260px] border-4 border-[#cb7928] bg-[#0d224f] p-2">
              <div className="relative h-[260px] border-2 border-[#4067bf] bg-[#0e244f] p-1">
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
              <h2 className="font-[family-name:var(--font-heading)] text-lg text-[#ffc24b]">{username}</h2>
              <p className="mt-2 font-[family-name:var(--font-body)] text-3xl leading-none text-[#9dc1ff]">
                Full Stack Developer
              </p>
            </div>

            <label className="block">
              <span className="font-[family-name:var(--font-heading)] text-[10px] text-[#89b4ff] sm:text-xs">
                Kullanıcı Adı
              </span>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value.toUpperCase())}
                className="mt-2 w-full border-2 border-[#4a73d8] bg-[#132b61] px-3 py-2 font-[family-name:var(--font-body)] text-2xl text-[#dbe9ff] outline-none placeholder:text-[#7aa4ec] focus:border-[#8db5ff]"
                placeholder="KULLANICI_ADI"
                maxLength={24}
              />
            </label>

            <div className="space-y-4 rounded-none border-2 border-[#3f67be] bg-[#102a5f] p-4">
              {progressBars.map((skill) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-[family-name:var(--font-body)] text-[30px] leading-none text-[#d3e5ff]">
                      {skill.name}
                    </span>
                    <span className="font-[family-name:var(--font-heading)] text-[10px] text-[#ffe078]">{skill.score}/100</span>
                  </div>
                  <div className="h-5 border-2 border-[#4c76db] bg-[#1a376f] p-[2px]">
                    <div className="h-full" style={{ width: `${skill.score}%`, backgroundColor: skill.color }} />
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <article className="border-2 border-[#4a73d8] bg-[#1b2f66] p-5 sm:p-6">
            <h3 className="font-[family-name:var(--font-heading)] text-lg text-[#ffcc5a] sm:text-xl">Character Bio</h3>
            <div className="mt-4 border-t-2 border-[#4a73d8]" />

            <p className="mt-5 font-[family-name:var(--font-body)] text-[34px] leading-[1.15] text-[#d4e6ff]">{content.bio}</p>

            <section className="mt-6">
              <h4 className="font-[family-name:var(--font-heading)] text-sm text-[#ffd36d] sm:text-base">Class</h4>
              <p className="mt-2 font-[family-name:var(--font-body)] text-[34px] leading-none text-[#e6f0ff]">{content.playerClass}</p>
            </section>

            <section className="mt-6">
              <h4 className="font-[family-name:var(--font-heading)] text-sm text-[#ffd36d] sm:text-base">
                Special Abilities
              </h4>
              <ul className="mt-3 space-y-1.5">
                {content.abilities.map((ability) => (
                  <li key={ability} className="font-[family-name:var(--font-body)] text-[32px] leading-[1.1] text-[#b9d3ff]">
                    • {ability}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-6">
              <h4 className="font-[family-name:var(--font-heading)] text-sm text-[#ffd36d] sm:text-base">Current Quest</h4>
              <p className="mt-2 font-[family-name:var(--font-body)] text-[34px] leading-[1.15] text-[#d4e6ff]">
                {content.currentQuest}
              </p>
            </section>
          </article>
        </section>
      </div>
    </main>
  );
}
