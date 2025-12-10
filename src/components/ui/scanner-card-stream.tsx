"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import * as THREE from "three";

// --- Default Images (used if no cardImages prop is provided) ---
const defaultCardImages = [
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
];

// --- Helper function to generate ASCII-like code ---
const ASCII_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";

const generateCode = (width: number, height: number): string => {
  let text = "";
  for (let i = 0; i < width * height; i++) {
    text += ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
  }
  let out = "";
  for (let i = 0; i < height; i++) {
    out += text.substring(i * width, (i + 1) * width) + "\n";
  }
  return out;
};

// --- Project Type ---
type Project = {
  image: string;
  title: string;
  github: string;
};

// --- Component Props Type Definition ---
type ScannerCardStreamProps = {
  showControls?: boolean;
  showSpeed?: boolean;
  initialSpeed?: number;
  direction?: -1 | 1;
  cardImages?: string[];
  projects?: Project[];
  repeat?: number;
  cardGap?: number;
  friction?: number;
  scanEffect?: "clip" | "scramble";
};

// --- The Main Component ---
const ScannerCardStream = ({
  showControls = false,
  showSpeed = false,
  initialSpeed = 150,
  direction = -1,
  cardImages,
  projects,
  repeat = 6,
  cardGap = 60,
  friction = 0.95,
  scanEffect = "scramble",
}: ScannerCardStreamProps) => {
  const [speed, setSpeed] = useState(initialSpeed);
  const [isScanning, setIsScanning] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isPausedDisplay, setIsPausedDisplay] = useState(false);
  const isPausedRef = useRef(false);

  // Use projects if provided, otherwise fall back to cardImages
  const sourceData = projects || cardImages?.map(img => ({ image: img, title: "", github: "" })) || defaultCardImages.map(img => ({ image: img, title: "", github: "" }));

  const cards = useMemo(() => {
    // Create multiple copies for seamless infinite scroll
    const copies = Math.max(3, repeat); // At least 3 copies for smooth looping
    const totalCards = sourceData.length * copies;
    return Array.from({ length: totalCards }, (_, i) => ({
      id: i,
      image: sourceData[i % sourceData.length].image,
      title: sourceData[i % sourceData.length].title,
      github: sourceData[i % sourceData.length].github,
      ascii: generateCode(Math.floor(600 / 6.5), Math.floor(400 / 13)),
    }));
  }, [sourceData, repeat]);

  const cardLineRef = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null);
  const originalAscii = useRef(new Map<number, string>());

  const cardStreamState = useRef({
    position: 0,
    velocity: initialSpeed,
    direction: direction,
    isDragging: false,
    lastMouseX: 0,
    lastTime: performance.now(),
    cardLineWidth: (600 + cardGap) * cards.length,
    friction: friction,
    minVelocity: 30,
  });

  const scannerState = useRef({ isScanning: false });

  const toggleAnimation = useCallback(() => {
    isPausedRef.current = !isPausedRef.current;
    setIsPausedDisplay(!isPausedRef.current);
  }, []);

  const resetPosition = useCallback(() => {
    if (cardLineRef.current) {
      cardStreamState.current.position =
        cardLineRef.current.parentElement?.offsetWidth || 0;
      cardStreamState.current.velocity = initialSpeed;
      cardStreamState.current.direction = direction;
      isPausedRef.current = false;
    }
  }, [initialSpeed, direction]);

  const changeDirection = useCallback(() => {
    cardStreamState.current.direction *= -1;
  }, []);

  useEffect(() => {
    const cardLine = cardLineRef.current;
    const particleCanvas = particleCanvasRef.current;
    const scannerCanvas = scannerCanvasRef.current;

    if (!cardLine || !particleCanvas || !scannerCanvas) return;

    cards.forEach((card) => originalAscii.current.set(card.id, card.ascii));

    let animationFrameId: number;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -window.innerWidth / 2,
      window.innerWidth / 2,
      125,
      -125,
      1,
      1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({
      canvas: particleCanvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, 250);
    renderer.setClearColor(0x000000, 0);

    const particleCount = 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);

    const texCanvas = document.createElement("canvas");
    texCanvas.width = 100;
    texCanvas.height = 100;
    const texCtx = texCanvas.getContext("2d")!;
    const half = 50;
    const gradient = texCtx.createRadialGradient(half, half, 0, half, half, half);
    gradient.addColorStop(0.025, "#fff");
    gradient.addColorStop(0.1, `hsl(217, 61%, 33%)`);
    gradient.addColorStop(0.25, `hsl(217, 64%, 6%)`);
    gradient.addColorStop(1, "transparent");
    texCtx.fillStyle = gradient;
    texCtx.arc(half, half, half, 0, Math.PI * 2);
    texCtx.fill();

    const texture = new THREE.CanvasTexture(texCanvas);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * window.innerWidth * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 250;
      velocities[i] = Math.random() * 60 + 30;
      alphas[i] = (Math.random() * 8 + 2) / 10;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: { pointTexture: { value: texture } },
      vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 15.0;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha) * texture2D(pointTexture, gl_PointCoord);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const ctx = scannerCanvas.getContext("2d")!;
    scannerCanvas.width = window.innerWidth;
    scannerCanvas.height = 300;

    let scannerParticles: any[] = [];
    const baseMaxParticles = 800;
    let currentMaxParticles = baseMaxParticles;
    const scanTargetMaxParticles = 2500;

    const createScannerParticle = () => ({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 3,
      y: Math.random() * 300,
      vx: Math.random() * 0.8 + 0.2,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 0.6 + 0.4,
      alpha: Math.random() * 0.4 + 0.6,
      life: 1.0,
      decay: Math.random() * 0.02 + 0.005,
    });

    for (let i = 0; i < baseMaxParticles; i++)
      scannerParticles.push(createScannerParticle());

    const runScrambleEffect = (element: HTMLElement, cardId: number) => {
      if (element.dataset.scrambling === "true") return;
      element.dataset.scrambling = "true";
      const originalText = originalAscii.current.get(cardId) || "";
      let scrambleCount = 0;
      const maxScrambles = 10;

      const interval = setInterval(() => {
        element.textContent = generateCode(
          Math.floor(400 / 6.5),
          Math.floor(250 / 13)
        );
        scrambleCount++;

        if (scrambleCount >= maxScrambles) {
          clearInterval(interval);
          element.textContent = originalText;
          delete element.dataset.scrambling;
        }
      }, 30);
    };

    const updateCardEffects = () => {
      const scannerX = window.innerWidth / 2;
      const scannerWidth = 8;
      const scannerLeft = scannerX - scannerWidth / 2;
      const scannerRight = scannerX + scannerWidth / 2;
      let anyCardIsScanning = false;

      cardLine.querySelectorAll<HTMLElement>(".card-wrapper").forEach((wrapper, index) => {
        const rect = wrapper.getBoundingClientRect();
        const normalCard = wrapper.querySelector<HTMLElement>(".card-normal")!;
        const asciiCard = wrapper.querySelector<HTMLElement>(".card-ascii")!;
        const asciiContent = asciiCard.querySelector<HTMLElement>("pre")!;

        if (rect.left < scannerRight && rect.right > scannerLeft) {
          anyCardIsScanning = true;

          if (scanEffect === "scramble" && wrapper.dataset.scanned !== "true") {
            runScrambleEffect(asciiContent, index);
          }

          wrapper.dataset.scanned = "true";
          const intersectLeft = Math.max(scannerLeft - rect.left, 0);
          const intersectRight = Math.min(scannerRight - rect.left, rect.width);

          normalCard.style.setProperty(
            "--clip-right",
            `${(intersectLeft / rect.width) * 100}%`
          );
          asciiCard.style.setProperty(
            "--clip-left",
            `${(intersectRight / rect.width) * 100}%`
          );
        } else {
          delete wrapper.dataset.scanned;

          if (rect.right < scannerLeft) {
            normalCard.style.setProperty("--clip-right", "100%");
            asciiCard.style.setProperty("--clip-left", "100%");
          } else {
            normalCard.style.setProperty("--clip-right", "0%");
            asciiCard.style.setProperty("--clip-left", "0%");
          }
        }
      });

      setIsScanning(anyCardIsScanning);
      scannerState.current.isScanning = anyCardIsScanning;
    };

    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      cardStreamState.current.isDragging = true;
      cardStreamState.current.lastMouseX =
        "touches" in e ? e.touches[0].clientX : e.clientX;
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!cardStreamState.current.isDragging) return;
      const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const deltaX = currentX - cardStreamState.current.lastMouseX;
      cardStreamState.current.position += deltaX;
      cardStreamState.current.lastMouseX = currentX;
    };

    const handleMouseUp = () => {
      cardStreamState.current.isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      cardStreamState.current.position -= e.deltaY * 0.5;
    };

    cardLine.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    cardLine.addEventListener("touchstart", handleMouseDown, { passive: true });
    window.addEventListener("touchmove", handleMouseMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);
    cardLine.addEventListener("wheel", handleWheel, { passive: false });

    const animate = (currentTime: number) => {
      const deltaTime =
        (currentTime - cardStreamState.current.lastTime) / 1000;
      cardStreamState.current.lastTime = currentTime;

      if (!isPausedRef.current && !cardStreamState.current.isDragging) {
        if (
          cardStreamState.current.velocity > cardStreamState.current.minVelocity
        ) {
          cardStreamState.current.velocity *= cardStreamState.current.friction;
        }

        cardStreamState.current.position +=
          cardStreamState.current.velocity *
          cardStreamState.current.direction *
          deltaTime;
        setSpeed(Math.round(cardStreamState.current.velocity));
      }

      const { position, cardLineWidth } = cardStreamState.current;
      const containerWidth = cardLine.parentElement?.offsetWidth || 0;
      
      // Calculate the width of one set of cards (4 projects)
      const singleSetWidth = (600 + cardGap) * sourceData.length;
      
      // Seamless infinite loop - reset when one full set has passed
      if (cardStreamState.current.direction === -1) {
        // Moving left
        if (position <= -singleSetWidth) {
          cardStreamState.current.position += singleSetWidth;
        }
      } else {
        // Moving right
        if (position >= 0) {
          cardStreamState.current.position -= singleSetWidth;
        }
      }

      cardLine.style.transform = `translateX(${cardStreamState.current.position}px)`;
      updateCardEffects();

      const time = currentTime * 0.001;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i] * 0.016;
        if (positions[i * 3] > window.innerWidth / 2 + 100)
          positions[i * 3] = -window.innerWidth / 2 - 100;
        positions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.5;
        alphas[i] = Math.max(
          0.1,
          Math.min(1, alphas[i] + (Math.random() - 0.5) * 0.05)
        );
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.alpha.needsUpdate = true;
      renderer.render(scene, camera);

      ctx.clearRect(0, 0, window.innerWidth, 300);

      const targetCount = scannerState.current.isScanning
        ? scanTargetMaxParticles
        : baseMaxParticles;
      currentMaxParticles += (targetCount - currentMaxParticles) * 0.05;

      while (scannerParticles.length < currentMaxParticles)
        scannerParticles.push(createScannerParticle());
      while (scannerParticles.length > currentMaxParticles)
        scannerParticles.pop();

      scannerParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0 || p.x > window.innerWidth)
          Object.assign(p, createScannerParticle());

        ctx.globalAlpha = p.alpha * p.life;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Set initial position to start from the right
    const containerWidth = cardLine.parentElement?.offsetWidth || 0;
    cardStreamState.current.position = containerWidth;

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      cardLine.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      cardLine.removeEventListener("touchstart", handleMouseDown);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      cardLine.removeEventListener("wheel", handleWheel);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [cards, cardGap, friction, scanEffect, sourceData]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <style jsx global>{`
        @keyframes glitch {
          0%,
          16%,
          50%,
          100% {
            opacity: 1;
          }
          15%,
          99% {
            opacity: 0.9;
          }
          49% {
            opacity: 0.8;
          }
        }
        .animate-glitch {
          animation: glitch 0.1s infinite linear alternate-reverse;
        }
        @keyframes scanPulse {
          0% {
            opacity: 0.75;
            transform: scaleY(1);
          }
          100% {
            opacity: 1;
            transform: scaleY(1.03);
          }
        }
        .animate-scan-pulse {
          animation: scanPulse 1.5s infinite alternate ease-in-out;
        }
      `}</style>

      {showControls && (
        <div className="absolute top-4 left-4 z-30 flex gap-2">
          <button
            onClick={toggleAnimation}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm text-white"
          >
            {isPausedDisplay ? "Resume" : "Pause"}
          </button>
          <button
            onClick={resetPosition}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm text-white"
          >
            Reset
          </button>
          <button
            onClick={changeDirection}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm text-white"
          >
            Reverse
          </button>
        </div>
      )}

      {showSpeed && (
        <div className="absolute top-4 right-4 z-30 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm text-white">
          Speed: {speed}
        </div>
      )}

      <canvas
        ref={particleCanvasRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-screen h-[250px] z-0 pointer-events-none"
      />

      <canvas
        ref={scannerCanvasRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-screen h-[300px] z-10 pointer-events-none"
      />

      <div
        className={`scanner-line absolute top-1/2 left-1/2 h-[280px] w-0.5 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-violet-500 to-transparent rounded-full transition-opacity duration-300 z-20 pointer-events-none animate-scan-pulse ${
          isScanning ? "opacity-100" : "opacity-0"
        }`}
        style={{
          boxShadow: `0 0 10px #a78bfa, 0 0 20px #a78bfa, 0 0 30px #8b5cf6, 0 0 50px #6366f1`,
        }}
      />

      <div className="absolute w-screen h-[250px] flex items-center">
        <div
          ref={cardLineRef}
          className="flex items-center whitespace-nowrap cursor-grab select-none will-change-transform"
          style={{ gap: `${cardGap}px` }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="card-wrapper relative w-[280px] h-[200px] sm:w-[400px] sm:h-[280px] md:w-[500px] md:h-[350px] lg:w-[600px] lg:h-[400px] shrink-0 group"
              onMouseEnter={() => {
                setHoveredCard(card.id);
                isPausedRef.current = true;
              }}
              onMouseLeave={() => {
                setHoveredCard(null);
                isPausedRef.current = false;
              }}
            >
              <div className="card-normal card absolute top-0 left-0 w-full h-full rounded-[20px] overflow-hidden bg-transparent shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-[2] [clip-path:inset(0_0_0_var(--clip-right,0%))]">
                <img
                  src={card.image}
                  alt={card.title || "Project Card"}
                  className="w-full h-full object-contain rounded-[20px] transition-all duration-300 ease-in-out brightness-110 contrast-110 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] group-hover:brightness-125 group-hover:contrast-125 group-hover:scale-105"
                />
                
                {/* GitHub Button - appears on hover */}
                {card.github && hoveredCard === card.id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-[20px] z-10 animate-in fade-in duration-200">
                    <a
                      href={card.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/20 text-white font-medium transition-all duration-200 hover:scale-110 shadow-lg pointer-events-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      View on GitHub
                    </a>
                  </div>
                )}
              </div>

              <div className="card-ascii card absolute top-0 left-0 w-full h-full rounded-[20px] overflow-hidden bg-transparent z-[1] [clip-path:inset(0_calc(100%-var(--clip-left,0%))_0_0)]">
                <pre className="ascii-content absolute top-0 left-0 w-full h-full text-[rgba(220,210,255,0.6)] font-mono text-[11px] leading-[13px] overflow-hidden whitespace-pre m-0 p-0 text-left align-top box-border [mask-image:linear-gradient(to_right,rgba(0,0,0,1)_0%,rgba(0,0,0,0.8)_30%,rgba(0,0,0,0.6)_50%,rgba(0,0,0,0.4)_80%,rgba(0,0,0,0.2)_100%)] animate-glitch">
                  {card.ascii}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ScannerCardStream };
