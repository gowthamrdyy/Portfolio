"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface WordData {
    text: string;
    duration: number;
    delay: number;
    blur: number;
    scale?: number;
}

interface BlurTextAnimationProps {
    text?: string;
    words?: WordData[];
    className?: string;
    fontSize?: string;
    fontFamily?: string;
    textColor?: string;
    animationDelay?: number;
}

export default function BlurTextAnimation({
    text = "Elegant blur animation that brings your words to life with cinematic transitions.",
    words,
    className = "",
    fontSize = "text-xl", // Default adjusted for bio text
    fontFamily = "font-sans",
    textColor = "text-neutral-500 dark:text-neutral-400",
}: BlurTextAnimationProps) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    // Generate random values only on client side after mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const textWords = useMemo(() => {
        if (words) return words;

        // Preserve basic spacing/newlines if feasible, but here specifically handling words
        const splitWords = text.replace(/\n/g, " ").split(" ").filter(w => w.length > 0);
        const totalWords = splitWords.length;

        return splitWords.map((word, index) => {
            const progress = index / totalWords;

            const exponentialDelay = Math.pow(progress, 0.8) * 0.5;

            const baseDelay = index * 0.06;

            // Use deterministic value during SSR, random only after mount
            const microVariation = isMounted ? (Math.random() - 0.5) * 0.05 : 0;

            return {
                text: word,
                duration: 2.2 + Math.cos(index * 0.3) * 0.3,
                delay: baseDelay + exponentialDelay + microVariation,
                blur: isMounted ? 12 + Math.floor(Math.random() * 8) : 12,
                scale: 0.9 + Math.sin(index * 0.2) * 0.05
            };
        });
    }, [text, words, isMounted]);

    useEffect(() => {
        if (isInView && !hasAnimated) {
            setIsAnimating(true);
            setHasAnimated(true);
        }
    }, [isInView, hasAnimated]);

    return (
        <div ref={containerRef} className={cn("flex flex-wrap", className)}>
            <p className={cn("font-light leading-relaxed tracking-wide", textColor, fontSize, fontFamily)}>
                {textWords.map((word, index) => (
                    <span
                        key={index}
                        className={`inline-block transition-all ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            transitionDuration: `${word.duration}s`,
                            transitionDelay: `${word.delay}s`,
                            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            filter: isAnimating
                                ? 'blur(0px) brightness(1)'
                                : `blur(${word.blur}px) brightness(0.6)`,
                            transform: isAnimating
                                ? 'translateY(0) scale(1) rotateX(0deg)'
                                : `translateY(20px) scale(${word.scale || 1}) rotateX(-15deg)`,
                            marginRight: '0.35em',
                            willChange: 'filter, transform, opacity',
                            transformStyle: 'preserve-3d',
                            backfaceVisibility: 'hidden',
                            textShadow: isAnimating
                                ? 'none'
                                : '0 0 10px rgba(255,255,255,0.1)' // Adjusted shadow for clean look
                        }}
                    >
                        {word.text}
                    </span>
                ))}
            </p>
        </div>
    );
}
