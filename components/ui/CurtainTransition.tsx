"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

interface CurtainTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
  children: React.ReactNode;
}

export function CurtainTransition({ isActive, onComplete, children }: CurtainTransitionProps) {
  const [showContent, setShowContent] = useState(false);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      // Close curtains
      setShowContent(false);
      
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.();
          // Open curtains after a brief moment
          gsap.to([topCurtainRef.current, bottomCurtainRef.current], {
            height: "50%",
            duration: 0.6,
            ease: "power4.inOut",
            delay: 0.1,
            onComplete: () => {
              setShowContent(true);
            },
          });
        },
      });

      tl.to(topCurtainRef.current, {
        height: "100%",
        duration: 0.5,
        ease: "power4.inOut",
      }).to(
        bottomCurtainRef.current,
        {
          height: "100%",
          duration: 0.5,
          ease: "power4.inOut",
        },
        "<"
      );
    } else {
      setShowContent(true);
    }
  }, [isActive, onComplete]);

  return (
    <>
      {/* Curtain overlays */}
      <div
        ref={topCurtainRef}
        className="curtain-top fixed top-0 left-0 right-0 z-[100] bg-[#0a0f18]"
        style={{ height: "0%" }}
      />
      <div
        ref={bottomCurtainRef}
        className="curtain-bottom fixed bottom-0 left-0 right-0 z-[100] bg-[#0a0f18]"
        style={{ height: "0%" }}
      />

      {/* Content */}
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Page transition hook for navigation
export function usePageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const transition = (callback: () => void) => {
    setIsTransitioning(true);
    // Short delay to allow curtain animation
    setTimeout(() => {
      callback();
      setIsTransitioning(false);
    }, 800);
  };

  return { isTransitioning, transition };
}

// Curtain effect for individual sections (reveal on scroll)
export function SectionCurtain({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate curtain reveal
            gsap.fromTo(
              element,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay,
                ease: "power3.out",
              }
            );
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}
