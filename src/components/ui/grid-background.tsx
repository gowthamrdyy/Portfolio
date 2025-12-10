"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import {
    motion,
    useMotionValue,
    useMotionTemplate,
    useAnimationFrame
} from "framer-motion";

export const GridBackground = ({ children }: { children?: React.ReactNode }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
    };

    const gridOffsetX = useMotionValue(0);
    const gridOffsetY = useMotionValue(0);

    // Speed of the automatic grid movement
    const speedX = 0.5;
    const speedY = 0.5;

    useAnimationFrame(() => {
        const currentX = gridOffsetX.get();
        const currentY = gridOffsetY.get();
        gridOffsetX.set((currentX + speedX) % 40);
        gridOffsetY.set((currentY + speedY) % 40);
    });

    const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className={cn(
                "relative min-h-screen w-full bg-background transition-colors duration-300"
            )}
        >
            {/* Fixed Background Layer */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Base Faint Grid */}
                <div className="absolute inset-0 opacity-[0.05]">
                    <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
                </div>

                {/* Mouse Reveal Grid (Stronger) */}
                <motion.div
                    className="absolute inset-0 opacity-40"
                    style={{ maskImage, WebkitMaskImage: maskImage }}
                >
                    <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
                </motion.div>

                {/* Background Blurs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute right-[-20%] top-[-20%] w-[40%] h-[40%] rounded-full bg-orange-500/40 dark:bg-orange-600/20 blur-[120px]" />
                    <div className="absolute right-[10%] top-[-10%] w-[20%] h-[20%] rounded-full bg-primary/30 blur-[100px]" />
                    <div className="absolute left-[-10%] bottom-[-20%] w-[40%] h-[40%] rounded-full bg-blue-500/40 dark:bg-blue-600/20 blur-[120px]" />
                </div>
            </div>

            {/* Content Content on Top */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GridPattern = ({ offsetX, offsetY }: { offsetX: any, offsetY: any }) => {
    return (
        <svg className="w-full h-full">
            <defs>
                <motion.pattern
                    id="grid-pattern"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                    x={offsetX}
                    y={offsetY}
                >
                    <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-muted-foreground"
                    />
                </motion.pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
    );
};
