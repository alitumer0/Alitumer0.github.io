"use client";

/* Inline SVG RPG icons — lightweight, no external deps */

interface IconProps {
    size?: number;
    className?: string;
}

export function SwordIcon({ size = 18, className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M19 2l-8.5 8.5M14.5 5.5L18.5 9.5" stroke="#ffc24b" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M10.5 10.5L3 18L4 21L7 20L14.5 12.5" stroke="#ffc24b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 12L12 15" stroke="#ffc24b" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="17" y="2" width="5" height="5" rx="1" fill="rgba(255,194,75,0.15)" stroke="#ffc24b" strokeWidth="1" />
        </svg>
    );
}

export function ShieldIcon({ size = 18, className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M12 3L4 7V12C4 16.42 7.33 20.5 12 21.5C16.67 20.5 20 16.42 20 12V7L12 3Z" stroke="#4a7dff" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(74,125,255,0.1)" />
            <path d="M12 8V14M9 11H15" stroke="#7ba4ff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export function ChartIcon({ size = 18, className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <rect x="3" y="12" width="4" height="8" rx="1" fill="rgba(74,125,255,0.3)" stroke="#7ba4ff" strokeWidth="1" />
            <rect x="10" y="6" width="4" height="14" rx="1" fill="rgba(168,85,247,0.3)" stroke="#c084fc" strokeWidth="1" />
            <rect x="17" y="3" width="4" height="17" rx="1" fill="rgba(255,194,75,0.3)" stroke="#ffc24b" strokeWidth="1" />
        </svg>
    );
}

export function MapIcon({ size = 18, className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M3 6L9 3L15 6L21 3V18L15 21L9 18L3 21V6Z" stroke="#22c55e" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(34,197,94,0.08)" />
            <path d="M9 3V18M15 6V21" stroke="#22c55e" strokeWidth="1.5" />
            <circle cx="12" cy="11" r="2" fill="rgba(255,194,75,0.4)" stroke="#ffc24b" strokeWidth="1" />
        </svg>
    );
}

export function TrophyIcon({ size = 18, className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M8 4H16V10C16 12.21 14.21 14 12 14C9.79 14 8 12.21 8 10V4Z" fill="rgba(255,194,75,0.15)" stroke="#ffc24b" strokeWidth="1.5" />
            <path d="M8 6H5C4.45 6 4 6.45 4 7V8C4 9.66 5.34 11 7 11H8" stroke="#ffc24b" strokeWidth="1.5" />
            <path d="M16 6H19C19.55 6 20 6.45 20 7V8C20 9.66 18.66 11 17 11H16" stroke="#ffc24b" strokeWidth="1.5" />
            <path d="M10 14V17H14V14" stroke="#ffc24b" strokeWidth="1.5" />
            <rect x="8" y="17" width="8" height="3" rx="1" fill="rgba(255,194,75,0.2)" stroke="#ffc24b" strokeWidth="1" />
        </svg>
    );
}

export function ChestIcon({ size = 18, className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <rect x="3" y="10" width="18" height="10" rx="2" fill="rgba(139,77,27,0.25)" stroke="#cb7928" strokeWidth="1.5" />
            <path d="M3 14H21" stroke="#cb7928" strokeWidth="1.5" />
            <path d="M3 12C3 9.79 3 8 3 8C3 5.79 5.69 4 9 4H15C18.31 4 21 5.79 21 8V12" stroke="#cb7928" strokeWidth="1.5" />
            <rect x="10" y="12" width="4" height="4" rx="1" fill="rgba(255,194,75,0.3)" stroke="#ffc24b" strokeWidth="1" />
            <circle cx="12" cy="14" r="0.8" fill="#ffc24b" />
        </svg>
    );
}

export function ScrollIcon({ size = 18, className }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
            <path d="M8 3C6.34 3 5 4.34 5 6V18C5 19.66 6.34 21 8 21H19V6C19 4.34 17.66 3 16 3H8Z" fill="rgba(74,125,255,0.08)" stroke="#7ba4ff" strokeWidth="1.5" />
            <path d="M5 18C5 19.66 6.34 21 8 21" stroke="#7ba4ff" strokeWidth="1.5" />
            <path d="M9 8H15M9 12H13" stroke="#9ac0ff" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
    );
}
