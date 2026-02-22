"use client";

import { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    r: number;
    vx: number;
    vy: number;
    alpha: number;
    da: number;
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const cvs = canvasRef.current;
        if (!cvs) return;
        const ctx = cvs.getContext("2d");
        if (!ctx) return;

        let raf: number;
        let stars: Star[] = [];

        const resize = () => {
            cvs.width = window.innerWidth;
            cvs.height = window.innerHeight;
        };

        const createStars = () => {
            const count = Math.floor((cvs.width * cvs.height) / 12000);
            stars = Array.from({ length: count }, () => ({
                x: Math.random() * cvs.width,
                y: Math.random() * cvs.height,
                r: Math.random() * 1.6 + 0.3,
                vx: (Math.random() - 0.5) * 0.15,
                vy: (Math.random() - 0.5) * 0.15,
                alpha: Math.random() * 0.7 + 0.15,
                da: (Math.random() - 0.5) * 0.008,
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, cvs.width, cvs.height);
            for (const s of stars) {
                s.x += s.vx;
                s.y += s.vy;
                s.alpha += s.da;
                if (s.alpha <= 0.1 || s.alpha >= 0.85) s.da *= -1;
                if (s.x < -2) s.x = cvs.width + 2;
                if (s.x > cvs.width + 2) s.x = -2;
                if (s.y < -2) s.y = cvs.height + 2;
                if (s.y > cvs.height + 2) s.y = -2;

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(180,210,255,${s.alpha})`;
                ctx.fill();
            }
            raf = requestAnimationFrame(draw);
        };

        resize();
        createStars();
        draw();
        window.addEventListener("resize", () => {
            resize();
            createStars();
        });

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-0"
            aria-hidden="true"
        />
    );
}
