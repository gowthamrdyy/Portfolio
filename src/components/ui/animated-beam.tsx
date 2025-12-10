"use client";

import { RefObject, useEffect, useId, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface AnimatedBeamProps {
    className?: string;
    containerRef: RefObject<HTMLElement | null>; // Container ref
    fromRef: RefObject<HTMLElement | null>;
    toRef: RefObject<HTMLElement | null>;
    curvature?: number;
    reverse?: boolean;
    pathColor?: string;
    pathWidth?: number;
    pathOpacity?: number;
    gradientStartColor?: string;
    gradientStopColor?: string;
    delay?: number;
    duration?: number;
    startXOffset?: number;
    startYOffset?: number;
    endXOffset?: number;
    endYOffset?: number;
}

export const AnimatedBeam = ({
    className,
    containerRef,
    fromRef,
    toRef,
    curvature = 0,
    reverse = false, // Include the reverse prop
    duration = Math.random() * 2 + 3,
    delay = 0,
    pathColor = "gray",
    pathWidth = 3,
    pathOpacity = 0.3,
    gradientStartColor = "#ffaa40",
    gradientStopColor = "#9c40ff",
    startXOffset = 0,
    startYOffset = 0,
    endXOffset = 0,
    endYOffset = 0,
}: AnimatedBeamProps) => {
    const id = useId();
    const [pathD, setPathD] = useState("");
    const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

    // Calculate the gradient coordinates based on the reverse prop
    const gradientCoordinates = reverse
        ? {
            x1: ["90%", "-10%"],
            x2: ["100%", "0%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
        }
        : {
            x1: ["10%", "110%"],
            x2: ["0%", "100%"],
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
        };

    useEffect(() => {
        const updatePath = () => {
            if (containerRef.current && fromRef.current && toRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const rectA = fromRef.current.getBoundingClientRect();
                const rectB = toRef.current.getBoundingClientRect();

                const svgWidth = containerRect.width;
                const svgHeight = containerRect.height;
                setSvgDimensions({ width: svgWidth, height: svgHeight });

                const startX =
                    rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
                const startY =
                    rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
                const endX =
                    rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
                const endY =
                    rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

                const controlY = startY - curvature;
                const d = `M ${startX},${startY} Q ${(startX + endX) / 2
                    },${controlY} ${endX},${endY}`;
                setPathD(d);
            }
        };

        // Initialize ResizeObserver
        const resizeObserver = new ResizeObserver((entries) => {
            // For all entries, update the path
            for (const entry of entries) {
                updatePath();
            }
        });

        // Observe the container element
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        // Call the updatePath initially
        updatePath();

        // Clean up the observer on unmount
        return () => {
            resizeObserver.disconnect();
        };
    }, [
        containerRef,
        fromRef,
        toRef,
        curvature,
        startXOffset,
        startYOffset,
        endXOffset,
        endYOffset,
    ]);

    return (
        <svg
            fill="none"
            width={svgDimensions.width}
            height={svgDimensions.height}
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
                "pointer-events-none absolute left-0 top-0 transform-gpu stroke-2",
                className,
            )}
            viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
        >
            <path
                d={pathD}
                stroke={pathColor}
                strokeWidth={pathWidth}
                strokeOpacity={pathOpacity}
                strokeLinecap="round"
                fill="none"
            />
            <path
                d={pathD}
                stroke={`url(#${id})`}
                strokeWidth={pathWidth + 1}
                strokeLinecap="round"
                fill="none"
                strokeOpacity="0.8"
            />
            <defs>
                <motion.linearGradient
                    className="transform-gpu"
                    id={id}
                    gradientUnits="userSpaceOnUse"
                    initial={{
                        x1: "0%",
                        x2: "0%",
                        y1: "0%",
                        y2: "0%",
                    }}
                    animate={{
                        x1: gradientCoordinates.x1,
                        x2: gradientCoordinates.x2,
                        y1: gradientCoordinates.y1,
                        y2: gradientCoordinates.y2,
                    }}
                    transition={{
                        delay,
                        duration,
                        ease: "linear",
                        repeat: Infinity,
                        repeatDelay: 0,
                    }}
                >
                    <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
                    <stop offset="5%" stopColor={gradientStartColor} stopOpacity="1" />
                    <stop offset="95%" stopColor={gradientStopColor} stopOpacity="1" />
                    <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
                </motion.linearGradient>
            </defs>
        </svg>
    );
};
