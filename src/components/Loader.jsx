import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ onComplete }) => {
  const textRef = useRef();
  const hasPlayed = useRef(false); 

  useEffect(() => {
    if (!hasPlayed.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(onComplete, 300);
        },
      });
  
      tl.fromTo(
        textRef.current,
        { opacity: 0, scale: 2 },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: "power3.out",
        }
      ).to(
        textRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 1.5,
          delay: 0.5,
          ease: "power2.inOut",
        }
      );
  
      hasPlayed.current = true;
    }
  }, [onComplete]);  
  
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black z-[9999] flex items-center justify-center">
      <h1
        ref={textRef}
        className="text-6xl md:text-8xl font-extrabold bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent leading-none text-center"
      >
        Welcome!
      </h1>
    </div>
  );
};

export default Loader;