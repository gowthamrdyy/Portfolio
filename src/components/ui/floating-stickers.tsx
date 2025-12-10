"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface FloatingStickersProps {
    visible: boolean;
}

const stickerTypes = [
    { src: "/stickers/trophy.png", alt: "Trophy" },
    { src: "/stickers/bolt.png", alt: "Bolt" },
    // Removed Badge
    { src: "/stickers/camera.png", alt: "Camera" },
    // Removed Link
    { src: "/stickers/clock.png", alt: "Clock" },
    { src: "/stickers/screen.png", alt: "Screen" },
    { src: "/stickers/mug.png", alt: "Mug" },
    { src: "/stickers/fire.png", alt: "Fire" },
];

const stickers = [
    // Left Side (Randomized Scatter)
    { src: "/stickers/trophy.png", alt: "Trophy", left: "12%", top: "62%", rotate: -20, delay: 0 },
    { src: "/stickers/bolt.png", alt: "Bolt", left: "24%", top: "69%", rotate: 15, delay: 0.15 },
    { src: "/stickers/screen.png", alt: "Screen", left: "38%", top: "58%", rotate: -8, delay: 0.25 },

    // Right Side (Randomized Scatter)
    { src: "/stickers/fire.png", alt: "Fire", left: "62%", top: "68%", rotate: 18, delay: 0.1 },
    { src: "/stickers/clock.png", alt: "Clock", left: "79%", top: "60%", rotate: -12, delay: 0.2 },
    { src: "/stickers/camera.png", alt: "Camera", left: "89%", top: "66%", rotate: 8, delay: 0.3 },

    // Bottom (Randomized Below Text)
    { src: "/stickers/mug.png", alt: "Mug", left: "33%", top: "91%", rotate: -15, delay: 0.35 },
    { src: "/stickers/bolt.png", alt: "Bolt", left: "47%", top: "95%", rotate: 5, delay: 0.4 },
    { src: "/stickers/trophy.png", alt: "Trophy", left: "56%", top: "89%", rotate: 12, delay: 0.45 },
    { src: "/stickers/bolt.png", alt: "Bolt", left: "69%", top: "93%", rotate: -8, delay: 0.5 },
];

export function FloatingStickers({ visible }: FloatingStickersProps) {
    // Reduce stickers on mobile - use state to handle SSR
    const [isMobile, setIsMobile] = React.useState(false);
    
    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    const displayStickers = isMobile ? stickers.slice(0, 4) : stickers;
    
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {displayStickers.map((sticker, index) => (
                <motion.div
                    key={index}
                    initial={{
                        opacity: 0,
                        scale: 0,
                        left: "50%",
                        top: "50%",
                        x: "-50%",
                        y: "-50%",
                    }}
                    animate={
                        visible
                            ? {
                                opacity: 0.5,
                                scale: 1,
                                left: sticker.left,
                                top: sticker.top,
                                x: "-50%",
                                y: "-50%",
                                rotate: sticker.rotate,
                            }
                            : {
                                opacity: 0,
                                scale: 0,
                                left: "50%",
                                top: "50%",
                                x: "-50%",
                                y: "-50%",
                            }
                    }
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: sticker.delay,
                    }}
                    style={{
                        position: 'absolute',
                        width: isMobile ? '60px' : '120px',
                        height: isMobile ? '60px' : '120px',
                        transformOrigin: "center center",
                    }}
                    className="drop-shadow-lg"
                >
                    {/* Continuous floating motion wrapper */}
                    <motion.div
                        animate={visible ? {
                            y: [0, -15, 0],
                            rotate: [0, 5, -5, 0],
                        } : {}}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: sticker.delay + 1,
                        }}
                        className="w-full h-full relative"
                    >
                        <Image
                            src={sticker.src}
                            alt={sticker.alt}
                            fill
                            className="object-contain"
                        />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
}
