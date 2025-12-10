"use client";

import { ScannerCardStream } from "@/components/ui/scanner-card-stream";
import { HyperText } from "@/components/ui/hyper-text";

export function ProjectsSection() {
  const projects = [
    {
      image: "/projects/project4.png",
      title: "Project One",
      github: "https://github.com/gowthamrdyy/Bunkifyyy.git",
    },
    {
      image: "/projects/project3.png",
      title: "Project Two",
      github: "https://github.com/gowthamrdyy/Fairpay.git",
    },
    {
      image: "/projects/project1.png",
      title: "Project Three",
      github: "https://timetablex.vercel.app/",
    },
    {
      image: "/projects/project2.png",
      title: "Project Four",
      github: "https://github.com/gowthamrdyy/Messmate.git",
    },
  ];

  return (
    <section id="projects" className="relative w-full h-screen overflow-hidden">
      {/* Title */}
      <div className="absolute top-8 sm:top-12 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-4">
        <HyperText className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white">
          Featured Projects
        </HyperText>
        <p className="text-center text-neutral-400 mt-2 text-sm sm:text-base max-w-2xl mx-auto">
          Scan through my latest work and creations
        </p>
      </div>

      {/* Scanner Card Stream */}
      <div className="absolute inset-0">
        <ScannerCardStream
          projects={projects}
          direction={-1}
          initialSpeed={60}
          repeat={1}
          cardGap={80}
          friction={0.99}
          scanEffect="scramble"
          showControls={false}
          showSpeed={false}
        />
      </div>
    </section>
  );
}
