"use client";

import { useCallback, useRef } from "react";

/* Web Audio API based 8-bit sound generator — no external files needed */

type SoundType = "click" | "hover" | "success" | "open";

const SOUNDS: Record<SoundType, { freq: number; dur: number; type: OscillatorType; vol: number }> = {
    click: { freq: 800, dur: 0.06, type: "square", vol: 0.08 },
    hover: { freq: 1200, dur: 0.03, type: "sine", vol: 0.04 },
    success: { freq: 600, dur: 0.15, type: "square", vol: 0.06 },
    open: { freq: 400, dur: 0.1, type: "triangle", vol: 0.06 },
};

export function useRPGSound(enabled: boolean) {
    const ctxRef = useRef<AudioContext | null>(null);

    const play = useCallback((type: SoundType) => {
        if (!enabled) return;
        try {
            if (!ctxRef.current) ctxRef.current = new AudioContext();
            const ctx = ctxRef.current;
            const cfg = SOUNDS[type];

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = cfg.type;
            osc.frequency.value = cfg.freq;
            gain.gain.setValueAtTime(cfg.vol, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + cfg.dur);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + cfg.dur + 0.01);
        } catch (_e) {
            // silently ignore audio errors
        }
    }, [enabled]);

    const playClick = useCallback(() => play("click"), [play]);
    const playHover = useCallback(() => play("hover"), [play]);
    const playSuccess = useCallback(() => play("success"), [play]);
    const playOpen = useCallback(() => play("open"), [play]);

    return { play, playClick, playHover, playSuccess, playOpen };
}

/* 8-bit ambient music generator using Web Audio API */

export function useRPGMusic(enabled: boolean) {
    const ctxRef = useRef<AudioContext | null>(null);
    const nodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const playingRef = useRef(false);

    const start = useCallback(() => {
        if (!enabled || playingRef.current) return;
        try {
            if (!ctxRef.current) ctxRef.current = new AudioContext();
            const ctx = ctxRef.current;
            playingRef.current = true;

            // Simple ambient pad — layered sine waves
            const notes = [130.81, 196.0, 261.63, 329.63]; // C3, G3, C4, E4
            notes.forEach((freq) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sine";
                osc.frequency.value = freq;
                gain.gain.value = 0.015;
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                nodesRef.current.push({ osc, gain });
            });

            // Gentle arpeggio on top
            const arpNotes = [523.25, 659.25, 783.99, 659.25, 523.25, 392.0, 523.25, 783.99];
            let step = 0;
            intervalRef.current = setInterval(() => {
                if (!ctxRef.current || !playingRef.current) return;
                const ctx2 = ctxRef.current;
                const osc = ctx2.createOscillator();
                const gain = ctx2.createGain();
                osc.type = "triangle";
                osc.frequency.value = arpNotes[step % arpNotes.length];
                gain.gain.setValueAtTime(0.025, ctx2.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx2.currentTime + 0.6);
                osc.connect(gain);
                gain.connect(ctx2.destination);
                osc.start(ctx2.currentTime);
                osc.stop(ctx2.currentTime + 0.65);
                step++;
            }, 800);
        } catch (_e) {
            // silently ignore
        }
    }, [enabled]);

    const stop = useCallback(() => {
        playingRef.current = false;
        nodesRef.current.forEach(({ osc, gain }) => {
            try { gain.gain.exponentialRampToValueAtTime(0.001, (ctxRef.current?.currentTime ?? 0) + 0.5); } catch (_e) { /* ignore */ }
            try { osc.stop((ctxRef.current?.currentTime ?? 0) + 0.6); } catch (_e) { /* ignore */ }
        });
        nodesRef.current = [];
        if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    }, []);

    return { start, stop, isPlaying: playingRef };
}
