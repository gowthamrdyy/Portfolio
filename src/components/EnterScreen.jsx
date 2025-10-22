import React from "react";
import { SpiralAnimation } from "./ui/spiralanimation";

const EnterScreen = ({ onEnter }) => {
  const handleEnter = () => {
    const audio = new Audio("./intro_sound.mp3");
    audio.volume = 1;
    audio
      .play()
      .catch((err) => console.warn("Autoplay blocked or error:", err.message));

    onEnter();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center z-[9999] cursor-pointer"
      onClick={handleEnter}
    >
      <div className="absolute inset-0 z-0">
        <SpiralAnimation />
      </div>
      <div className="text-center z-10">
        <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent">
          Enter?
        </h1>
        <p className="text-md md:text-lg mt-4 font-semibold bg-gradient-to-r from-[#1f1f1f] via-[#4b4b4b] to-[#1f1f1f] bg-[length:250%_100%] bg-clip-text text-transparent animate-[shine_4s_ease-in-out_infinite]">
          Tap anywhere on the screen to continue
        </p>
      </div>
    </div>
  );
};

export default EnterScreen;
