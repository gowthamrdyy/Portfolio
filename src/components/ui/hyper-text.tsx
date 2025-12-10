"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface HyperTextProps {
    text?: string;
    duration?: number;
    framerProps?: Variants;
    className?: string;
    animateOnLoad?: boolean;
    children?: string; // Add children support
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Simple random character generator
const getRandomChar = () => alphabets[Math.floor(Math.random() * alphabets.length)];

export function HyperText({
    text,
    children,
    duration = 800,
    framerProps = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 3 },
    },
    className,
    animateOnLoad = false, // Default to false if using InView, or let InView handle it
}: HyperTextProps) {
    const displayTextStr = text || children || "";
    const [displayText, setDisplayText] = useState(displayTextStr.split(""));
    const [trigger, setTrigger] = useState(false);
    const interations = useRef(0);
    const isFirstRender = useRef(true);

    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const triggerAnimation = () => {
        interations.current = 0;
        setTrigger(true);
    };

    useEffect(() => {
        if (isInView) {
            triggerAnimation();
        }
    }, [isInView]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!animateOnLoad && isFirstRender.current && !trigger) {
                clearInterval(interval);
                isFirstRender.current = false;
                return;
            }
            if (interations.current < displayTextStr.length) {
                setDisplayText((t) =>
                    t.map((l, i) =>
                        l === " "
                            ? l
                            : i <= interations.current
                                ? displayTextStr[i]
                                : getRandomChar()
                    )
                );
                interations.current = interations.current + 0.1;
            } else {
                setTrigger(false);
                clearInterval(interval);
            }
        }, duration / (displayTextStr.length * 10));
        // Clean up interval on unmount
        return () => clearInterval(interval);
    }, [displayTextStr, duration, trigger, animateOnLoad]);

    return (
        <div
            ref={containerRef}
            className="overflow-hidden py-2 flex cursor-default scale-100 justify-center"
            onMouseEnter={triggerAnimation}
        >
            <AnimatePresence mode="wait">
                {displayText.map((letter, i) => (
                    <motion.h1
                        key={i}
                        className={cn("font-mono", letter === " " ? "w-3" : "", className)}
                        {...framerProps}
                    >
                        {letter.toUpperCase()}
                    </motion.h1>
                ))}
            </AnimatePresence>
        </div>
    );
}
