"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useSpring } from "framer-motion";

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const rotation = useSpring(0, {
    damping: 20,
    stiffness: 100,
  });

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current && canvasRef.current.offsetWidth) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    
    // Wait for the canvas to be mounted and sized
    setTimeout(() => {
      onResize();
    }, 100);

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 1],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [1, 1, 1],
      markers: [
        { location: [14.5995, 120.9842], size: 0.03 }, // Manila
        { location: [19.076, 72.8777], size: 0.1 }, // Mumbai
        { location: [23.8103, 90.4125], size: 0.05 }, // Dhaka
        { location: [30.0444, 31.2357], size: 0.07 }, // Cairo
        { location: [39.9042, 116.4074], size: 0.08 }, // Beijing
        { location: [-23.5505, -46.6333], size: 0.1 }, // São Paulo
        { location: [19.4326, -99.1332], size: 0.1 }, // Mexico City
        { location: [40.7128, -74.006], size: 0.1 }, // New York
        { location: [34.6937, 135.5022], size: 0.05 }, // Osaka
        { location: [41.0082, 28.9784], size: 0.06 }, // Istanbul
      ],
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phi += 0.005;
        }
        state.phi = phi + rotation.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 0);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rotation]);

  return (
    <div className={className} style={{ width: "100%", height: "100%", aspectRatio: "1" }}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grabbing";
          }
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            rotation.set(delta / 200);
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.targetTouches[0]) {
            const delta = e.targetTouches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            rotation.set(delta / 100);
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
      />
    </div>
  );
}
