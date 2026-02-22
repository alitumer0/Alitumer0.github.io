"use client";

type Rarity = "LEGENDARY" | "EPIC" | "RARE" | "COMMON";

const rarityConfig: Record<Rarity, { bg: string; border: string; text: string; glow: string }> = {
    LEGENDARY: {
        bg: "rgba(255,194,75,0.15)",
        border: "rgba(255,194,75,0.6)",
        text: "#ffd700",
        glow: "0 0 10px rgba(255,194,75,0.5)",
    },
    EPIC: {
        bg: "rgba(168,85,247,0.15)",
        border: "rgba(168,85,247,0.6)",
        text: "#c084fc",
        glow: "0 0 10px rgba(168,85,247,0.4)",
    },
    RARE: {
        bg: "rgba(74,125,255,0.15)",
        border: "rgba(74,125,255,0.5)",
        text: "#7ba4ff",
        glow: "0 0 8px rgba(74,125,255,0.35)",
    },
    COMMON: {
        bg: "rgba(140,160,190,0.1)",
        border: "rgba(140,160,190,0.35)",
        text: "#8ca0be",
        glow: "none",
    },
};

export default function RarityBadge({ rarity }: { rarity: Rarity }) {
    const cfg = rarityConfig[rarity];
    return (
        <span
            className="inline-block rounded px-2 py-0.5 font-[family-name:var(--font-heading)] text-[8px] tracking-[0.14em] sm:text-[9px]"
            style={{
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                color: cfg.text,
                boxShadow: cfg.glow,
            }}
        >
            {rarity}
        </span>
    );
}

export type { Rarity };
