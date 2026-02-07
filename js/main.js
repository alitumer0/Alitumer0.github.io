import React, { Suspense, useEffect, useRef, useState } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
import * as THREE from 'https://esm.sh/three@0.162.0';
import { Canvas, useFrame } from 'https://esm.sh/@react-three/fiber@8.15.19';
import { ContactShadows, Float, MeshDistortMaterial } from 'https://esm.sh/@react-three/drei@9.100.3';
import { AnimatePresence, motion } from 'https://esm.sh/framer-motion@11.0.3';

const titles = ['Full-Stack Developer', 'Game Dev Enthusiast', 'Software Architect'];

const experience = [
    {
        role: 'Senior Full-Stack Developer',
        company: 'Product Studio',
        period: '2022 — Present',
        summary: 'Led immersive web experiences and shipped scalable platforms with React, Node.js, and Three.js.'
    },
    {
        role: 'Creative Frontend Engineer',
        company: 'Digital Lab',
        period: '2020 — 2022',
        summary: 'Crafted cinematic interfaces, built design systems, and animated storytelling experiences.'
    },
    {
        role: 'Software Engineer',
        company: 'Innovation Hub',
        period: '2018 — 2020',
        summary: 'Built reliable APIs, optimized performance, and mentored junior engineers.'
    }
];

const skills = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Three.js', 'WebGL',
    'Python', 'PostgreSQL', 'GraphQL', 'Unity', 'Figma', 'Framer Motion'
];

const projects = [
    {
        name: 'Whats My Fridge',
        description: 'A smart pantry assistant with AI-powered ingredient insights and recipe automation.',
        tags: ['React', 'Three.js', 'AI'],
        highlight: true
    },
    {
        name: 'Neural UX Lab',
        description: 'An experimental design lab for multi-sensory interfaces and spatial web systems.',
        tags: ['WebGL', 'UX']
    },
    {
        name: 'Orbit Commerce',
        description: 'A headless commerce suite with real-time analytics dashboards.',
        tags: ['Next.js', 'Node.js']
    }
];

function useTypewriter(words, speed = 70, pause = 1200) {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);

    useEffect(() => {
        if (!words.length) return;

        if (subIndex === words[index].length + 1 && !reverse) {
            const timeout = setTimeout(() => setReverse(true), pause);
            return () => clearTimeout(timeout);
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return undefined;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? speed / 1.8 : speed);

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words, speed, pause]);

    useEffect(() => {
        if (!words.length) return;
        setText(words[index].substring(0, subIndex));
    }, [subIndex, index, words]);

    return text;
}

function MonolithSphere() {
    const groupRef = useRef(null);
    const glassRef = useRef(null);

    useFrame((state) => {
        const { x, y } = state.pointer;
        if (groupRef.current) {
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.6, 0.05);
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.4, 0.05);
            const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.03;
            groupRef.current.scale.setScalar(pulse);
        }
        if (glassRef.current) {
            glassRef.current.rotation.y += 0.002;
        }
    });

    return (
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
            <group ref={groupRef}>
                <mesh ref={glassRef}>
                    <sphereGeometry args={[1.45, 128, 128]} />
                    <meshPhysicalMaterial
                        transmission={0.95}
                        roughness={0.08}
                        thickness={1.2}
                        ior={1.4}
                        clearcoat={1}
                        iridescence={1}
                        iridescenceIOR={1.3}
                        iridescenceThicknessRange={[100, 400]}
                        color="#5b7cff"
                    />
                </mesh>
                <mesh>
                    <sphereGeometry args={[1.48, 128, 128]} />
                    <MeshDistortMaterial
                        distort={0.35}
                        speed={1.2}
                        color="#3b82f6"
                        transparent
                        opacity={0.2}
                    />
                </mesh>
            </group>
        </Float>
    );
}

function MonolithScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 4], fov: 45 }}
            dpr={[1, 2]}
            className="absolute inset-0"
        >
            <color attach="background" args={['#030303']} />
            <fog attach="fog" args={['#050505', 5, 14]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 5, 2]} intensity={1.4} color="#a5b4fc" />
            <Suspense fallback={null}>
                <MonolithSphere />
                <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={8} blur={2.5} far={8} />
            </Suspense>
        </Canvas>
    );
}

function SectionHeading({ eyebrow, title, subtitle }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
        >
            <p className="text-sm uppercase tracking-[0.4em] text-white/40">{eyebrow}</p>
            <h2 className="text-3xl md:text-4xl font-semibold mt-3">{title}</h2>
            <p className="text-white/60 mt-3 max-w-2xl">{subtitle}</p>
        </motion.div>
    );
}

function ExperienceTimeline() {
    return (
        <div className="relative border-l border-white/10 pl-6">
            {experience.map((item, index) => (
                <motion.div
                    key={item.role}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="mb-10 relative"
                >
                    <span className="absolute -left-[31px] top-2 h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                    <div className="glass-panel rounded-2xl p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-semibold">{item.role}</h3>
                                <p className="text-white/60">{item.company}</p>
                            </div>
                            <span className="text-sm text-white/40">{item.period}</span>
                        </div>
                        <p className="text-white/70 mt-4">{item.summary}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

function SkillsGrid() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
                <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="glass-panel rounded-2xl px-5 py-6"
                >
                    <p className="text-lg font-medium">{skill}</p>
                    <p className="text-white/50 text-sm mt-2">Crafted for premium digital experiences.</p>
                </motion.div>
            ))}
        </div>
    );
}

function ProjectsGrid() {
    return (
        <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
                <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`glass-panel rounded-2xl p-6 flex flex-col gap-4 ${project.highlight ? 'glow-card' : ''}`}
                >
                    <div>
                        <h3 className="text-xl font-semibold">{project.name}</h3>
                        <p className="text-white/60 mt-2">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span key={tag} className="text-xs uppercase tracking-[0.2em] text-white/60 border border-white/10 px-3 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

function Hero() {
    const typedText = useTypewriter(titles);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <MonolithScene />
            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <p className="text-xs uppercase tracking-[0.5em] text-white/50">The Abstract Monolith</p>
                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-semibold tracking-[0.3em] mt-4">ALI TÜMER</h1>
                    <p className="mt-6 text-lg md:text-2xl text-white/70">
                        <span className="typewriter">{typedText}</span>
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="glass-panel px-6 py-3 rounded-full text-sm uppercase tracking-[0.3em]">
                            Explore Work
                        </button>
                        <button className="px-6 py-3 rounded-full border border-white/20 text-sm uppercase tracking-[0.3em] hover:border-accent transition">
                            Download CV
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function App() {
    return (
        <AnimatePresence mode="wait">
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
            >
                <div className="scroll-indicator" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <Hero />
                <section className="px-6 py-20 max-w-6xl mx-auto">
                    <SectionHeading
                        eyebrow="Experience"
                        title="Vertical Timeline"
                        subtitle="A cinematic path through product leadership and immersive development work."
                    />
                    <ExperienceTimeline />
                </section>
                <section className="px-6 py-20 max-w-6xl mx-auto">
                    <SectionHeading
                        eyebrow="Skills"
                        title="Bento Skill Matrix"
                        subtitle="A curated stack of tools and mindsets for future-facing products."
                    />
                    <SkillsGrid />
                </section>
                <section className="px-6 py-20 max-w-6xl mx-auto">
                    <SectionHeading
                        eyebrow="Projects"
                        title="Selected Work"
                        subtitle="Highlighted case studies with a special glow for flagship products."
                    />
                    <ProjectsGrid />
                </section>
                <footer className="px-6 pb-16 text-center text-white/50">
                    <p>© 2025 Ali Tümer. Crafted in the Abstract Monolith universe.</p>
                </footer>
            </motion.main>
        </AnimatePresence>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
