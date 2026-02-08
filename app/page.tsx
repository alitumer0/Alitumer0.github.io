"use client";

import { FlowPortfolioContent } from "@/components/FlowPortfolioContent";
import { PortfolioProvider } from "@/components/providers/PortfolioProvider";
import { SectionTracker } from "@/components/providers/SectionTracker";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { GlobalBackdrop } from "@/components/three/GlobalBackdrop";
import { LanguageSwitchMinimal } from "@/components/ui/LanguageSwitchMinimal";
import { useBackdropController } from "@/hooks/useBackdropController";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

function PageBody() {
  const reducedMotion = useReducedMotionPreference();
  const backdrop = useBackdropController(reducedMotion);

  return (
    <div className="relative min-h-screen">
      <SectionTracker />

      <GlobalBackdrop
        scrollProgress={backdrop.scrollProgress}
        sectionMix={backdrop.sectionMix}
        intensity={backdrop.intensity}
        noise={backdrop.noise}
        reducedMotion={reducedMotion}
      />

      <div className="flow-language-toggle-wrap">
        <LanguageSwitchMinimal />
      </div>

      <FlowPortfolioContent reducedMotion={reducedMotion} />
    </div>
  );
}

export default function Home() {
  return (
    <PortfolioProvider>
      <SmoothScrollProvider>
        <PageBody />
      </SmoothScrollProvider>
    </PortfolioProvider>
  );
}
