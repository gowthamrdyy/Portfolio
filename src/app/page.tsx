"use client";

import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { Header } from "@/components/ui/header";
import { ParticleTextEffect } from "@/components/ui/particle-text-effect";
import { GridBackground } from "@/components/ui/grid-background";
import { AnimatedHeroImage } from "@/components/ui/animated-hero-image";
import { AboutMe } from "@/components/about-me";
import { FloatingStickers } from "@/components/ui/floating-stickers";
import { useState } from "react";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import SkillsSection from "@/components/ui/skills-beam";
import { ProjectsSection } from "@/components/ui/projects-section";
import { HireMeSection } from "@/components/ui/hire-me-section";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  const [showRealImage, setShowRealImage] = useState(false);

  return (
    <GridBackground>
      <main className="relative w-full min-h-screen font-sans">
        <section className="relative w-full h-screen min-h-[600px]">
          <Header />
          <div className="relative z-0 h-full w-full">

            <div className="absolute inset-0 z-0">
              <ParticleTextEffect onIntroComplete={() => setShowRealImage(true)} />
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <AnimatedHeroImage visible={showRealImage} />
            </div>

            <div className="absolute inset-0 z-5">
              <FloatingStickers visible={showRealImage} />
            </div>
          </div>
        </section>

        <AboutMe />

        <SkillsSection />

        <ProjectsSection />

        <HireMeSection />

        <Footer />

        <div className="hidden md:block">
          <SmoothCursor />
        </div>

        <ProgressiveBlur position="top" height="50px" className="fixed top-0 z-50 pointer-events-none" />
        <ProgressiveBlur position="bottom" height="50px" className="fixed bottom-0 z-50 pointer-events-none" />
      </main>
    </GridBackground>
  );
}
