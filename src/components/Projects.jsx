import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { cn } from "../lib/utils";
import { FaGithub } from 'react-icons/fa';
import Lenis from 'lenis';
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProjectImage from "./utils/ProjectImage";

const projects = [
  {
    title: "Lovese",
    description:
      "A modern, sleek web application that provides a better alternative to the traditional SRM Portal for managing academic information.",
    link: "https://lovese.vercel.app/",
    image: "/project1.png",
    blurhash: "L02$Hd9Z00~pneofp0WB00?a~V01"
  },
  {
    title: "Messmate",
    description:
      "MessMate is a mobile-optimized web application designed for SRM hostel students to track real-time mess menu items according to the current meal timings. Say goodbye to the daily question:",
    link: "https://messmatesrm.vercel.app/",
    image: "/project2.png",
    blurhash: "LACZ35PqnOi_T0X9a|WA00+FIpkW"
  },
  {
    title: "Bunkifyyy",
    description:
      "Bunkifyy is a sleek and intelligent attendance calculator designed to help students manage their classes while planning smart and safe bunks! Whether you're trying to hit the 75% attendance rule or just sneak in that one extra day off, Bunkifyy does the math for you.",
    link: "https://bunkifyyy.vercel.app/",
    image: "/project3.png",
    blurhash: "L13l5O9F4n%MD%t7t7Rj00t7_3IU"
  },
  {
    title: "Spotify",
    description:
      "a visual tribute to one of the world’s most iconic music platforms. This project is an attempt to replicate Spotify’s front-end UI using only HTML and CSS ",
    link: "https://gowthamspotify.vercel.app",
    image: "/project4.png",
    blurhash: "L2QT1Z3C~Xtm00%EV[R.00erD}fP"
  },
];

const Projects = () => {

  const scrollLineRef = useRef(null);

  useEffect(() => {
    // Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 3.2, // Scroll animation duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      smooth: true, // Enable smooth scrolling
    });

    // frame loop for Lenis boommm
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    gsap.registerPlugin(ScrollTrigger);
    gsap.to(scrollLineRef.current, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Cleanup on component unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (

    <div id="projects" className="relative flex flex-col items-center justify-center w-full py-20 px-4 bg-black">

      <div
        ref={scrollLineRef}
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-b from-neutral-200 to-neutral-500 w-0 z-50"
      ></div>

      {/* Dot Background Layer */}
      <div
        className={cn(
          "absolute inset-0 z-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />

      {/* Radial Mask Overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Section Title */}
      <div className="relative z-10 mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent">
          Things I've been building 🚀
        </h2>
        <p className="mt-4 text-neutral-400 text-sm md:text-base max-w-xl mx-auto">
          Exploring ideas, solving problems, and having fun with code — here’s what I’ve built so far.
        </p>
      </div>

      {/* Project Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 max-w-7xl w-full px-2 md:px-0">
        {projects.map((project, index) => (
          <CardContainer key={index} className="inter-var w-full">
            <CardBody className="bg-black relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] border-white/[0.2] w-full h-full rounded-lg p-3 md:p-4 border flex flex-col">
              <CardItem
                translateZ="50"
                className="text-base md:text-lg font-bold text-white"
              >
                {project.title}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-300 text-xs mt-1.5 md:mt-2 line-clamp-2"
              >
                {project.description}
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-2 md:mt-3 flex-grow">
                <ProjectImage
                  image={project.image}
                  blurhash={project.blurhash}
                  alt={project.title}
                />
              </CardItem>
              <div className="flex justify-end items-center mt-2 md:mt-4">
                <CardItem
                  translateZ={20}
                  as="a"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl bg-white text-black text-xs font-bold"
                >
                  Live →
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
      <div>
        <a
          href="https://github.com/gowthamrdyy"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-base font-semibold leading-6  text-white inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-7 ring-1 ring-white/10 ">
            <span>
              For More
            </span>
            <FaGithub className="h-6 w-6 text-white" />
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </a>
      </div>
    </div>
  );
};

export default Projects;