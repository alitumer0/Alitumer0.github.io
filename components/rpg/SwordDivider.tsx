"use client";

export default function SwordDivider({ className }: { className?: string }) {
    return (
        <div className={`rpg-sword-divider ${className ?? ""}`} aria-hidden="true">
            <span className="rpg-sword-divider-line" />
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="rpg-sword-divider-icon">
                <path d="M19 2L10 11" stroke="#ffc24b" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M14 5L18 9" stroke="#ffc24b" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10.5 10.5L3 18L4 21L7 20L14.5 12.5" stroke="#ffc24b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 12L12 15" stroke="#ffc24b" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="17" y="2" width="5" height="5" rx="1" fill="rgba(255,194,75,0.2)" stroke="#ffc24b" strokeWidth="1" />
            </svg>
            <span className="rpg-sword-divider-line" />
        </div>
    );
}
