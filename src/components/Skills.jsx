import React, { useRef } from "react";
import { cn } from "../lib/utils";
import { CardSpotlight } from "./ui/card-spotlight";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaPython,
} from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

const Skills = () => {
  const colors = [
    [138, 43, 226],  // Purple
    [147, 112, 219], // Light Purple
    [186, 85, 211],  // Medium Purple
    [153, 50, 204],  // Dark Purple
    [218, 112, 214], // Orchid
    [221, 160, 221], // Plum
    [216, 191, 216], // Thistle
    [0, 105, 148],   // MySQL - Deep Blue
    [56, 189, 248],  // Tailwind-like Sky Blue
    [70, 130, 180],  // Postgresql
    [57, 255, 20],   // Three.js - Neon Green
    [30, 41, 59],    //Next.js - Slate Blue
    [255, 0, 128],   // Framer Motion - Vibrant Pink
    [0, 199, 255],   // Figma - Vivid Cyan/Blue
    [104, 160, 99],  // Node.js - Medium Green
    [51, 51, 51],    // Express.js - Dark Gray
    [255, 136, 0],   // Postman - Bright Orange
    [242, 101, 34],  // Java - Logo Orange
    [0, 201, 167],   //React Native - Bright Teal 
    [255, 166, 17], // Firebase - Dark Tangerine
    [240, 81, 51],  // Swift - Vivid Orange
  ];

  const icons = [
    <FaReact key="react" className="text-white text-xl" />,
    <FaHtml5 key="html" className="text-white text-xl" />,
    <FaCss3Alt key="css" className="text-white text-xl" />,
    <FaJs key="js" className="text-white text-xl" />,
    <SiTypescript key="ts" className="text-white text-xl" />,
    <img
      key="gsap"
      src="/Gsap.png"
      alt="Gsap"
      className="w-9 h-9 p-1 object-contain"
    />,
    <FaPython key="Mysql" className="text-white text-xl" />,
    <img
      key="MySQL"
      src="/mysql_logo.png"
      alt="Mysql"
      className="w-15 h-15 p-1 object-contain"
    />,
    <img
      key="tailwind"
      src="/tailwind.png"
      alt="Tailwind"
      className="w-9 h-9 p-1 object-contain"
    />,
    <img
      key="motion_logo"
      src="/motion_logo().png"
      alt="motion"
      className="w-15 h-15 p-1 object-contain"
    />,
    <img
      key="figma_logo"
      src="/figma_logo.png"
      alt="figma"
      className="w-13 h-12 p-1 object-contain"
    />,
    <img
      key="Java_Logo"
      src="/Java_Logo.png"
      alt="Java"
      className="w-13 h-14 px-1 pb-1 object-contain"
    />,
    <img
      key="React_Native_Logo"
      src="/react_native_logo.png"
      alt="React_Native"
      className="w-11 h-12 px-1 pb-1 object-contain"
    />,
    <img
      key="Firebase_Logo"
      src="/firebase_logo.png"
      alt="Firebase"
      className="w-11 h-12 px-1 pb-1 object-contain"
    />,
  ];

  const audioSources = [
    "/adento.mp3",
    "/akasam.mp3",
    "/darshana.mp3",
    "/dheema.mp3",
    "/minnalvala.mp3",
    "/paradise.mp3",
    "/sahiba.mp3",
    "/vellipomake.mp3",
    "/adento.mp3",
    "/akasam.mp3",
    "/darshana.mp3",
    "/dheema.mp3",
    "/minnalvala.mp3",
    "/paradise.mp3",
    "/sahiba.mp3",
    "/vellipomake.mp3",
    "/adento.mp3",
    "/akasam.mp3",
  ];

  const audioRefs = useRef([]);
  const currentPlayingRef = useRef(null);

  const handleMouseEnter = (index) => {
    // Stop any currently playing audio
    if (currentPlayingRef.current) {
      currentPlayingRef.current.pause();
      currentPlayingRef.current.currentTime = 0;
    }

    const audio = new Audio(audioSources[index]);
    audioRefs.current[index] = audio;
    currentPlayingRef.current = audio;
    audio.play();
  };

  const handleMouseLeave = (index) => {
    if (audioRefs.current[index]) {
      audioRefs.current[index].pause();
      audioRefs.current[index].currentTime = 0;
      audioRefs.current[index] = null;
      if (currentPlayingRef.current === audioRefs.current[index]) {
        currentPlayingRef.current = null;
      }
    }
  };

  return (
    <div id="skills" className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 py-12 sm:py-20 bg-black">

      {/* Background Grid */}
      <div
        className={cn(
          "absolute inset-0 z-0 pointer-events-none",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />

      {/* Radial Mask */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Heading */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-b from-neutral-300 to-neutral-500 bg-clip-text text-transparent z-20 mb-4 sm:mb-6">
        Tools in My Arsenal
      </h2>

      {/* Prompts */}
      <div className="z-20 mb-6 text-lg font-semibold text-center">
        {/* Mobile: Tap Prompt */}
        <p className="block sm:hidden bg-gradient-to-b from-neutral-300 to-neutral-500 bg-clip-text text-transparent">
          Try tapping on the icons 🎵
        </p>

        {/* Desktop/Tablet: Hover Prompt */}
        <p className="hidden sm:block bg-gradient-to-b from-neutral-300 to-neutral-500 bg-clip-text text-transparent">
          Hover over the icons to hear a sound 🎵
        </p>
      </div>

      {/* Icon Cards */}
      <div className="relative z-20 flex justify-center gap-3 flex-wrap max-w-5xl w-full">
        {icons.map((icon, index) => (
          <CardSpotlight
            key={index}
            className="h-18 w-18 rounded-full flex items-center justify-center bg-black"
            color={`rgb(${colors[index][0]}, ${colors[index][1]}, ${colors[index][2]})`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onClick={() => handleMouseEnter(index)}
          >
            <div className="relative z-20">
              {icon}
            </div>
          </CardSpotlight>
        ))}
      </div>
    </div>
  );
};

export default Skills;