"use client";

import {
    BellIcon,
    CalendarIcon,
    FileTextIcon,
    GlobeIcon,
    InputIcon,
    PersonIcon,
} from "@radix-ui/react-icons";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { HyperText } from "@/components/ui/hyper-text";
import BlurTextAnimation from "@/components/ui/blur-text-animation";

const files = [
    {
        name: "react.js",
        body: "JavaScript library for building user interfaces.",
    },
    {
        name: "next.js",
        body: "Framework for production-grade React applications.",
    },
    {
        name: "typescript.ts",
        body: "Typed superset of JavaScript that compiles to plain JavaScript.",
    },
    {
        name: "tailwind.css",
        body: "Utility-first CSS framework for rapid UI development.",
    },
    {
        name: "node.js",
        body: "JavaScript runtime built on Chrome's V8 JavaScript engine.",
    },
];

const features = [
    {
        Icon: FileTextIcon,
        name: "My Gallery",
        description: "A glimpse into my life.",
        className: "col-span-3 lg:col-span-1",
        background: (
            <Marquee
                pauseOnHover
                className="absolute top-0 w-full h-full [--duration:20s] [--gap:1rem] [mask-image:linear-gradient(to_right,transparent_0%,#000_10%,#000_90%,transparent_100%)]"
            >
                {[
                    "/gallery1.jpg",
                    "/gallery2.jpg",
                    "/gallery3.jpg",
                    "/gallery4.jpg",
                    "/gallery5.jpg"
                ].map((img, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "relative w-32 h-32 cursor-pointer overflow-hidden rounded-xl border p-2 mr-2",
                            "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                            "dark:border-neutral-50/[.1] dark:bg-neutral-50/[.10] dark:hover:bg-neutral-50/[.15]",
                            "transform-gpu transition-all duration-300 ease-out hover:scale-105",
                        )}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={`gallery-${idx}`} className="w-full h-full object-cover rounded-lg" />
                    </div>
                ))}
            </Marquee>
        ),
    },
    {
        Icon: InputIcon,
        name: "Education",
        description: "Academic background.",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute right-2 top-4 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105">
                <div className="flex flex-col gap-2 p-4">
                    <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900 border dark:border-neutral-800">
                        <h4 className="font-bold text-neutral-800 dark:text-neutral-200">SRM Institute of Science and Technology</h4>
                        <p className="text-sm text-neutral-500">B.Tech (2024-Present)</p>
                    </div>
                    <div className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900 border dark:border-neutral-800 opacity-60">
                        <h4 className="font-bold text-neutral-800 dark:text-neutral-200">Sri Abhida</h4>
                        <p className="text-sm text-neutral-500">12th (2022-2024)</p>
                    </div>
                </div>
            </div>
        ),
    },
    {
        Icon: PersonIcon,
        name: "Who am I?",
        description: "Passionate & Adaptive Developer",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute right-2 top-4 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105 overflow-y-auto no-scrollbar p-6">
                <BlurTextAnimation
                    text={`I'm Gowtham Sree, a passionate and adaptive developer with a strong focus on Artificial Intelligence, Machine Learning, and full-stack web development. With over 1 year of hands-on experience, I enjoy building smart, efficient systems that blend logic with creativity.

I specialize in crafting seamless digital experiences — from designing responsive front-end interfaces using React, Tailwind CSS, and TypeScript, to developing scalable, intelligent back-end logic with Python, Node.js, and MongoDB.

I believe in writing clean, maintainable code and continuously exploring how technology can simplify lives. I'm also passionate about content creation, sharing insights on AI, coding, and productivity through engaging videos and posts that simplify complex topics for a wider audience.`}
                    fontSize="text-sm"
                    className="text-left"
                />

                {/* Spacer for bottom overlay visibility */}
                <div className="h-10"></div>
            </div>
        ),
    },
    {
        Icon: CalendarIcon,
        name: "Coding Streak",
        description: "Continuous learning & consistency.",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center p-4 transition-all duration-300 ease-out group-hover:scale-105">
                {/* GitHub Streak Stats for Gowthamssr */}
                <img
                    src="https://github-readme-streak-stats.herokuapp.com/?user=gowthamrdyy&theme=dark&hide_border=true&background=00000000&ring=e5e5e5&fire=e25822&currStreakNum=e5e5e5"
                    alt="GitHub Streak"
                    className="w-full h-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
            </div>
        ),
    },
];

export function AboutMe() {
    return (
        <section id="about" className="py-16 sm:py-20 md:py-24 px-4 w-full max-w-7xl mx-auto z-20 relative">
            <HyperText className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-white">About Me</HyperText>
            <BentoGrid>
                {features.map((feature, idx) => (
                    <BentoCard key={idx} {...feature} />
                ))}
            </BentoGrid>
        </section>
    );
}
