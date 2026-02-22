"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Typewriter hook — animates text character by character
 */
export function useTypewriter(text: string, speed = 30, trigger = true) {
    const [display, setDisplay] = useState("");
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!trigger) { setDisplay(""); setDone(false); return; }
        setDisplay("");
        setDone(false);
        let i = 0;
        const iv = setInterval(() => {
            i++;
            setDisplay(text.slice(0, i));
            if (i >= text.length) { clearInterval(iv); setDone(true); }
        }, speed);
        return () => clearInterval(iv);
    }, [text, speed, trigger]);

    return { display, done };
}

/**
 * Animated counter hook — counts from 0 to target value
 */
export function useCounter(target: number, duration = 1200, trigger = true) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!trigger) { setValue(0); return; }
        const start = performance.now();
        let raf: number;

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, duration, trigger]);

    return value;
}
