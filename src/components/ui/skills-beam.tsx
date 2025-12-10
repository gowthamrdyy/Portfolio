"use client"

import React, { forwardRef, useRef } from "react"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { HyperText } from "@/components/ui/hyper-text"
import { HoverPreviewWrapper, HoverLink } from "@/components/ui/hover-preview"
import {
    Code2,
    Globe,
    Database,
    Wrench,
    Cpu,
    Terminal,
    Server,
    Layout
} from "lucide-react"

// Preview data for each skill
const skillPreviewData = {
    git: {
        image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=560&h=320&fit=crop",
        title: "Git",
        subtitle: "Version control system for tracking changes"
    },
    linux: {
        image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=560&h=320&fit=crop",
        title: "Linux",
        subtitle: "Open-source operating system"
    },
    adobe: {
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=560&h=320&fit=crop",
        title: "Adobe Suite",
        subtitle: "Creative design and editing tools"
    },
    mongodb: {
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=560&h=320&fit=crop",
        title: "MongoDB",
        subtitle: "NoSQL database for modern applications"
    },
    sql: {
        image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=560&h=320&fit=crop",
        title: "SQL",
        subtitle: "Relational database management"
    },
    ai: {
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=560&h=320&fit=crop",
        title: "AI & ML",
        subtitle: "Artificial Intelligence and Machine Learning"
    },
    dsa: {
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=560&h=320&fit=crop",
        title: "DSA",
        subtitle: "Data Structures & Algorithms"
    },
    java: {
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=560&h=320&fit=crop",
        title: "Java",
        subtitle: "Enterprise-grade programming language"
    },
    python: {
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=560&h=320&fit=crop",
        title: "Python",
        subtitle: "Versatile programming for AI & web"
    },
    react: {
        image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=560&h=320&fit=crop",
        title: "React",
        subtitle: "JavaScript library for building UIs"
    },
    nextjs: {
        image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=560&h=320&fit=crop",
        title: "Next.js",
        subtitle: "React framework for production"
    },
    tailwind: {
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=560&h=320&fit=crop",
        title: "Tailwind CSS",
        subtitle: "Utility-first CSS framework"
    }
}

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode; skillKey?: string; onHoverStart?: (key: string, e: React.MouseEvent) => void; onHoverMove?: (e: React.MouseEvent) => void; onHoverEnd?: () => void }
>(({ className, children, skillKey, onHoverStart, onHoverMove, onHoverEnd }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-[0_0_20px_-12px_rgba(255,255,255,0.3)] transition-transform hover:scale-110 cursor-pointer",
                className
            )}
            onMouseEnter={skillKey && onHoverStart ? (e) => onHoverStart(skillKey, e) : undefined}
            onMouseMove={onHoverMove}
            onMouseLeave={onHoverEnd}
        >
            {children}
        </div>
    )
})

Circle.displayName = "Circle"

function SkillsTreeDemo() {
    const containerRef = useRef<HTMLDivElement>(null)
    const centerRef = useRef<HTMLDivElement>(null) // Me

    // Branch Refs
    const branchWebRef = useRef<HTMLDivElement>(null)
    const branchLangRef = useRef<HTMLDivElement>(null)
    const branchDataRef = useRef<HTMLDivElement>(null)
    const branchToolsRef = useRef<HTMLDivElement>(null)

    // Leaf Refs (Skills)
    // Web
    const skillReactRef = useRef<HTMLDivElement>(null)
    const skillNextRef = useRef<HTMLDivElement>(null)
    const skillTailwindRef = useRef<HTMLDivElement>(null)

    // Lang
    const skillCppRef = useRef<HTMLDivElement>(null)
    const skillJavaRef = useRef<HTMLDivElement>(null)
    const skillPythonRef = useRef<HTMLDivElement>(null)

    // Data
    const skillMongoRef = useRef<HTMLDivElement>(null)
    const skillSqlRef = useRef<HTMLDivElement>(null)
    const skillAiRef = useRef<HTMLDivElement>(null)

    // Tools
    const skillGitRef = useRef<HTMLDivElement>(null)
    const skillLinuxRef = useRef<HTMLDivElement>(null)
    const skillDockerRef = useRef<HTMLDivElement>(null)

    return (
        <HoverPreviewWrapper previewData={skillPreviewData} onHoverStart={() => {}} onHoverMove={() => {}} onHoverEnd={() => {}}>
            {({ onHoverStart, onHoverMove, onHoverEnd }) => (
        <div
            className="relative flex h-[900px] sm:h-[800px] md:h-[700px] lg:h-[600px] w-full items-center justify-center overflow-hidden p-4 sm:p-6 md:p-10"
            ref={containerRef}
        >
            <div className="flex size-full max-w-7xl flex-col items-stretch justify-between gap-6 sm:gap-8 md:gap-10">
                {/* Top Row - Tools & Data Skills */}
                <div className="flex flex-row justify-between px-2 sm:px-8 md:px-16 lg:px-32">
                    <div className="flex gap-4 sm:gap-8 md:gap-12 lg:gap-16">
                        <Circle ref={skillGitRef} skillKey="git" onHoverStart={onHoverStart} onHoverMove={onHoverMove} onHoverEnd={onHoverEnd}><Icons.git /></Circle>
                        <Circle ref={skillLinuxRef} skillKey="linux" onHoverStart={onHoverStart} onHoverMove={onHoverMove} onHoverEnd={onHoverEnd}><Icons.linux /></Circle>
                        <Circle ref={skillDockerRef} skillKey="adobe" onHoverStart={onHoverStart} onHoverMove={onHoverMove} onHoverEnd={onHoverEnd}><Icons.adobe /></Circle>
                    </div>
                    <div className="flex gap-4 sm:gap-8 md:gap-12 lg:gap-16">
                        <Circle ref={skillMongoRef} skillKey="mongodb" onHoverStart={onHoverStart} onHoverMove={onHoverMove} onHoverEnd={onHoverEnd}><Icons.mongo /></Circle>
                        <Circle ref={skillSqlRef} skillKey="sql" onHoverStart={onHoverStart} onHoverMove={onHoverMove} onHoverEnd={onHoverEnd}><Icons.sql /></Circle>
                        <Circle ref={skillAiRef} skillKey="ai" onHoverStart={onHoverStart} onHoverMove={onHoverMove} onHoverEnd={onHoverEnd}><Icons.brain /></Circle>
                    </div>
                </div>

                {/* Middle Row - Branches & Center */}
                <div className="flex flex-row items-center justify-between px-1 sm:px-2 md:px-4">
                    {/* Left Branch Group */}
                    <div className="flex flex-col items-center gap-8">
                        <Circle ref={branchToolsRef} className="size-16 border-blue-500/50 bg-blue-500/10">
                            <Wrench className="size-8 text-blue-500" />
                            <span className="absolute -bottom-6 text-xs font-medium text-blue-500">Tools</span>
                        </Circle>

                        {/* Spacer for vertical centering relative to main Image */}
                        <div className="h-0 md:h-12" />

                        <Circle ref={branchLangRef} className="size-16 border-green-500/50 bg-green-500/10">
                            <Code2 className="size-8 text-green-500" />
                            <span className="absolute -bottom-6 text-xs font-medium text-green-500">Languages</span>
                        </Circle>
                    </div>

                    {/* Center Image */}
                    <div ref={centerRef} className="relative z-20 size-24 sm:size-28 md:size-32 overflow-hidden rounded-full border-4 border-white shadow-xl dark:border-neutral-800">
                        <img
                            src="https://avatars.githubusercontent.com/u/115145278?s=400&u=b4495c153f62a4f0fd469c2a8334f7e474bd02dc&v=4"
                            alt="Gowtham"
                            className="h-full w-full object-cover bg-neutral-100 dark:bg-neutral-900"
                        />
                    </div>

                    {/* Right Branch Group */}
                    <div className="flex flex-col items-center gap-8">
                        <Circle ref={branchDataRef} className="size-16 border-purple-500/50 bg-purple-500/10">
                            <Database className="size-8 text-purple-500" />
                            <span className="absolute -bottom-6 text-xs font-medium text-purple-500">Data & AI</span>
                        </Circle>

                        {/* Spacer for vertical centering relative to main Image */}
                        <div className="h-0 md:h-12" />

                        <Circle ref={branchWebRef} className="size-16 border-orange-500/50 bg-orange-500/10">
                            <Globe className="size-8 text-orange-500" />
                            <span className="absolute -bottom-6 text-xs font-medium text-orange-500">Web Dev</span>
                        </Circle>
                    </div>
                </div>

                {/* Bottom Row - Lang & Web Skills */}
                <div className="flex flex-row justify-between px-2 sm:px-8 md:px-16 lg:px-32">
                    <div className="flex gap-4 sm:gap-8 md:gap-12 lg:gap-16">
                        <Circle ref={skillCppRef} skillKey="dsa" onHoverStart={onHoverStart} onHoverMove={onHoverMove} onHoverEnd={onHoverEnd}><Icons.dsa /></Circle>
                        <Circle ref={skillJavaRef} skillKey="java" onHoverStart={onHoverStart} onHoverMove={onHoverMove} onHoverEnd={onHoverEnd}><Icons.java /></Circle>
                        <Circle ref={skillPythonRef} skillKey="python" onHoverStart={onHoverStart} onHoverMove={onHoverMove} onHoverEnd={onHoverEnd}><Icons.python /></Circle>
                    </div>
                    <div className="flex gap-4 sm:gap-8 md:gap-12 lg:gap-16">
                        <Circle ref={skillReactRef} skillKey="react" onHoverStart={onHoverStart} onHoverMove={onHoverMove} onHoverEnd={onHoverEnd}><Icons.react /></Circle>
                        <Circle ref={skillNextRef} skillKey="nextjs" onHoverStart={onHoverStart} onHoverMove={onHoverMove} onHoverEnd={onHoverEnd}><Icons.nextjs /></Circle>
                        <Circle ref={skillTailwindRef} skillKey="tailwind" onHoverStart={onHoverStart} onHoverMove={onHoverMove} onHoverEnd={onHoverEnd}><Icons.tailwind /></Circle>
                    </div>
                </div>
            </div>

            {/* Beams: Center to Branches */}
            <AnimatedBeam 
                containerRef={containerRef} 
                fromRef={centerRef} 
                toRef={branchToolsRef} 
                curvature={-20}
                gradientStartColor="#3b82f6"
                gradientStopColor="#06b6d4"
                delay={0}
            />
            <AnimatedBeam 
                containerRef={containerRef} 
                fromRef={centerRef} 
                toRef={branchLangRef} 
                curvature={20}
                gradientStartColor="#10b981"
                gradientStopColor="#84cc16"
                delay={0.5}
            />
            <AnimatedBeam 
                containerRef={containerRef} 
                fromRef={centerRef} 
                toRef={branchDataRef} 
                curvature={-20} 
                reverse
                gradientStartColor="#a855f7"
                gradientStopColor="#ec4899"
                delay={1}
            />
            <AnimatedBeam 
                containerRef={containerRef} 
                fromRef={centerRef} 
                toRef={branchWebRef} 
                curvature={20} 
                reverse
                gradientStartColor="#f97316"
                gradientStopColor="#eab308"
                delay={1.5}
            />

            {/* Beams: Branches to Skills */}

            {/* Tools Branch */}
            <AnimatedBeam 
                containerRef={containerRef} 
                fromRef={branchToolsRef} 
                toRef={skillGitRef} 
                curvature={-20}
                gradientStartColor="#3b82f6"
                gradientStopColor="#06b6d4"
                delay={0.2}
            />
            <AnimatedBeam 
                containerRef={containerRef} 
                fromRef={branchToolsRef} 
                toRef={skillLinuxRef}
                gradientStartColor="#3b82f6"
                gradientStopColor="#06b6d4"
                delay={0.4}
            />
            <AnimatedBeam 
                containerRef={containerRef} 
                fromRef={branchToolsRef} 
                toRef={skillDockerRef} 
                curvature={20}
                gradientStartColor="#3b82f6"
                gradientStopColor="#06b6d4"
                delay={0.6}
            />

            {/* Data Branch */}
            <AnimatedBeam 
                containerRef={containerRef} 
                fromRef={branchDataRef} 
                toRef={skillMongoRef} 
                curvature={-20}
                gradientStartColor="#a855f7"
                gradientStopColor="#ec4899"
                delay={1.2}
            />
            <AnimatedBeam 
                containerRef={containerRef} 
                fromRef={branchDataRef} 
                toRef={skillSqlRef}
                gradientStartColor="#a855f7"
                gradientStopColor="#ec4899"
                delay={1.4}
            />
            <AnimatedBeam 
                containerRef={containerRef} 
                fromRef={branchDataRef} 
                toRef={skillAiRef} 
                curvature={20}
                gradientStartColor="#a855f7"
                gradientStopColor="#ec4899"
                delay={1.6}
            />

            {/* Lang Branch */}
            <AnimatedBeam 
                containerRef={containerRef} 
                fromRef={branchLangRef} 
                toRef={skillCppRef} 
                curvature={-20}
                gradientStartColor="#10b981"
                gradientStopColor="#84cc16"
                delay={0.7}
            />
            <AnimatedBeam 
                containerRef={containerRef} 
                fromRef={branchLangRef} 
                toRef={skillJavaRef}
                gradientStartColor="#10b981"
                gradientStopColor="#84cc16"
                delay={0.9}
            />
            <AnimatedBeam 
                containerRef={containerRef} 
                fromRef={branchLangRef} 
                toRef={skillPythonRef} 
                curvature={20}
                gradientStartColor="#10b981"
                gradientStopColor="#84cc16"
                delay={1.1}
            />

            {/* Web Branch */}
            <AnimatedBeam 
                containerRef={containerRef} 
                fromRef={branchWebRef} 
                toRef={skillReactRef} 
                curvature={-20}
                gradientStartColor="#f97316"
                gradientStopColor="#eab308"
                delay={1.7}
            />
            <AnimatedBeam 
                containerRef={containerRef} 
                fromRef={branchWebRef} 
                toRef={skillNextRef}
                gradientStartColor="#f97316"
                gradientStopColor="#eab308"
                delay={1.9}
            />
            <AnimatedBeam 
                containerRef={containerRef} 
                fromRef={branchWebRef} 
                toRef={skillTailwindRef} 
                curvature={20}
                gradientStartColor="#f97316"
                gradientStopColor="#eab308"
                delay={2.1}
            />

        </div>
            )}
        </HoverPreviewWrapper>
    )
}

export function SkillsSection() {
    return (
        <section id="skills" className="py-16 sm:py-20 md:py-24 px-4 w-full max-w-7xl mx-auto z-20 relative">
            <HyperText className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                Technical Expertise
            </HyperText>
            <p className="text-center text-neutral-400 mb-8 sm:mb-10 md:mb-12 text-sm sm:text-base max-w-2xl mx-auto px-4">
                Comprehensive skill set across various domains of software engineering
            </p>
            <div className="flex justify-center -mt-10 md:mt-0">
                <SkillsTreeDemo />
            </div>
        </section>
    )
}

// Tech Stack Icons
const Icons = {
    git: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#F05032]">
            <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
        </svg>
    ),
    linux: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-neutral-800 dark:text-neutral-200">
            <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.84-.41 1.684-.287 2.489.123.805.487 1.527 1.052 2.03.565.503 1.293.756 2.049.756.756 0 1.484-.253 2.049-.756.565-.503.929-1.225 1.052-2.03.123-.805-.009-1.649-.287-2.489-.589-1.771-1.831-3.47-2.716-4.521-.75-1.067-.974-1.928-1.05-3.02-.065-1.491 1.056-5.965-3.17-6.298-.165-.013-.325-.021-.48-.021zm-.005 2.024c.234 0 .734.008 1.03.021 2.196.098 2.767 1.376 2.84 2.488.073 1.112.232 2.21 1.17 3.544.938 1.334 2.265 3.15 2.913 5.111.324.98.445 2.013.287 2.971-.158.958-.639 1.8-1.352 2.362-.713.562-1.615.844-2.539.844s-1.826-.282-2.539-.844c-.713-.562-1.194-1.404-1.352-2.362-.158-.958-.037-1.991.287-2.971.648-1.961 1.975-3.777 2.913-5.111.938-1.334 1.097-2.432 1.17-3.544.073-1.112.644-2.39 2.84-2.488.296-.013.796-.021 1.03-.021z"/>
        </svg>
    ),
    adobe: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#FF0000]">
            <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624Z"/>
        </svg>
    ),
    mongo: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#47A248]">
            <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296 4.604-3.254 4.29-11.375zm-5.336 10.896c0-.896-.045-1.792-.135-2.685.09.002.18.003.27.003.09 0 .18-.001.27-.003-.09.893-.135 1.789-.135 2.685h-.27z"/>
        </svg>
    ),
    sql: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#CC2927]">
            <path d="M5.625 0C2.52 0 0 2.52 0 5.625v12.75C0 21.48 2.52 24 5.625 24h12.75C21.48 24 24 21.48 24 18.375V5.625C24 2.52 21.48 0 18.375 0H5.625zm.562 2.812h11.626c1.55 0 2.812 1.262 2.812 2.813v12.75c0 1.55-1.262 2.812-2.813 2.812H6.188c-1.55 0-2.813-1.262-2.813-2.813V5.626c0-1.55 1.262-2.813 2.813-2.813zM12 6.188c-3.206 0-5.813 2.606-5.813 5.812S8.794 17.812 12 17.812s5.813-2.606 5.813-5.813S15.206 6.188 12 6.188zm0 1.687c2.28 0 4.125 1.845 4.125 4.125S14.28 16.125 12 16.125 7.875 14.28 7.875 12 9.72 7.875 12 7.875z"/>
        </svg>
    ),
    brain: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-pink-500">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
        </svg>
    ),
    dsa: () => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-indigo-500">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
            <polyline points="7.5 19.79 7.5 14.6 3 12"/>
            <polyline points="21 12 16.5 14.6 16.5 19.79"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
        </svg>
    ),
    java: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#ED8B00]">
            <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639"/>
        </svg>
    ),
    react: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#61DAFB]">
            <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
        </svg>
    ),
    nextjs: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-neutral-900 dark:text-neutral-100">
            <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595-.058.115-.08.138-.19.183-.096.04-.142.048-.44.048H7.3l-.137-.088a.379.379 0 0 1-.14-.183l-.05-.125.005-4.703.009-4.706.072-.092a.645.645 0 0 1 .184-.152c.117-.065.164-.073.564-.073.516 0 .617.032.785.235.05.06 1.03 1.538 2.177 3.284l4.134 6.31 2.095 3.197.106-.07a12.857 12.857 0 0 0 2.55-2.083c1.742-1.74 2.93-3.85 3.528-6.27a12.13 12.13 0 0 0 .108-1.748c0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.552 12.552 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-1.511-2.3-1.515-2.297V7.223l.072-.092a.645.645 0 0 1 .184-.152c.117-.065.164-.073.564-.073.23 0 .455.007.471.011z"/>
        </svg>
    ),
    python: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fill="#3776AB" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.09.83v5.1h4.5c.32 0 .64.03.96.07l1.66.33c1.53.3 2.88 1.48 2.88 3.07v3.92c0 1.47-1.24 2.34-2.88 2.88-1.02.34-2.11.5-3.2.5s-2.18-.16-3.2-.5c-1.64-.54-2.88-1.41-2.88-2.88v-3.92c0-1.59 1.35-2.77 2.88-3.07l1.66-.33c.32-.04.64-.07.96-.07h4.5v-5.1l-.09-.83H8.77c-1.64 0-2.88-1.24-2.88-2.88V4.18c0-1.47 1.24-2.34 2.88-2.88C9.79.96 10.88.8 11.97.8s2.18.16 3.2.5l.08.02z"/>
            <path fill="#FFD43B" d="M9.75.18l-.9.2-.73.26-.59.3-.45.32-.34.34-.25.34-.16.33-.1.3-.04.26-.02.2.01.13V8.5l.05.63.13.55.21.46.26.38.3.31.33.25.35.19.35.14.33.1.3.07.26.04.21.02h6.48l.09.83v5.1h-4.5c-.32 0-.64.03-.96.07l-1.66.33c-1.53.3-2.88 1.48-2.88 3.07v3.92c0 1.47 1.24 2.34 2.88 2.88 1.02.34 2.11.5 3.2.5s2.18-.16 3.2-.5c1.64-.54 2.88-1.41 2.88-2.88v-3.92c0-1.59-1.35-2.77-2.88-3.07l-1.66-.33c-.32-.04-.64-.07-.96-.07h-4.5v-5.1l.09-.83h6.48c1.64 0 2.88-1.24 2.88-2.88V4.18c0-1.47-1.24-2.34-2.88-2.88C14.21.96 13.12.8 12.03.8s-2.18.16-3.2.5l-.08.02z"/>
            <circle cx="8.5" cy="5.5" r="1" fill="#3776AB"/>
            <circle cx="15.5" cy="18.5" r="1" fill="#FFD43B"/>
        </svg>
    ),
    tailwind: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#06B6D4]">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
        </svg>
    ),
}

export default SkillsSection
