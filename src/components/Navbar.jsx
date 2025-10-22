import React, { useRef, useState, useEffect } from 'react';
import { FaMusic } from "react-icons/fa";
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

const Navbar = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 64; // navbar height
      const elementPosition = element.offsetTop - navHeight;

      gsap.to(window, {
        duration: 0.6,
        scrollTo: elementPosition,
        ease: "power3.out"
      });
    }
  };

  const links = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav id="nav-overall">
      <div id="nav-div">
        {links.map(link => (
          <a
            key={link.id}
            onClick={() => scrollToSection(link.id)}
            className="nav-a md:inline cursor-pointer"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Music toggle button */}
      <div
        style={{ marginLeft: 'auto' }}
        onClick={toggleMusic}
        className="relative hidden md:flex items-center justify-center"
      >
        <div
          className={`w-10 h-10 rounded-full bg-black flex items-center justify-center cursor-pointer transition-all duration-300
            ${isPlaying
              ? 'animate-spin-slow'
              : 'shadow-[0_0_10px_rgba(210,181,181,0.7)]'}`}
        >
          <FaMusic
            className={`text-white text-xl ${isPlaying ? 'animate-spin-slow' : ''} hover:text-indigo-300 transition duration-300 z-10`}
          />
          {isPlaying && (
            <div
              className="absolute inset-0 rounded-full border-t border-[rgba(210,181,181,0.7)] animate-[spin_4.5s_linear_infinite]"
              style={{ top: '-3px', left: '-3px', right: '-3px', bottom: '-3px' }}
            />
          )}
        </div>
      </div>

      <audio ref={audioRef} loop preload="auto">
        <source src="/boom.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </nav>
  );
};

export default Navbar;
