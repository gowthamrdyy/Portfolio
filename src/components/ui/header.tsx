"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { LocationTag } from "@/components/ui/location-tag";
import { Home, User, Zap, FolderOpen, FileText, Sparkles } from "lucide-react";

// Creative animated hamburger button
function AnimatedMenuButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="md:hidden relative w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/20 flex items-center justify-center group hover:scale-105 transition-transform"
        >
            <div className="relative w-6 h-5 flex flex-col justify-between">
                <motion.span
                    animate={isOpen ? { rotate: 45, y: 8, backgroundColor: "#ec4899" } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full h-0.5 bg-white rounded-full origin-left"
                />
                <motion.span
                    animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-4 h-0.5 bg-white rounded-full"
                />
                <motion.span
                    animate={isOpen ? { rotate: -45, y: -8, backgroundColor: "#a855f7" } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="w-full h-0.5 bg-white rounded-full origin-left"
                />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
        </button>
    );
}

const menuItems = [
    { href: "/", label: "Home", icon: Home, color: "from-blue-400 to-cyan-400" },
    { href: "/#about", label: "About", icon: User, color: "from-purple-400 to-pink-400" },
    { href: "/#skills", label: "Skills", icon: Zap, color: "from-yellow-400 to-orange-400" },
    { href: "/#projects", label: "Projects", icon: FolderOpen, color: "from-green-400 to-emerald-400" },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="absolute top-0 left-0 w-full p-3 sm:p-4 md:p-6 flex justify-between items-center z-40 pointer-events-none">
            {/* Logo */}
            <div className="pointer-events-auto">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 font-mono">
                    &lt;Gowtham/&gt;
                </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="absolute left-1/2 top-4 md:top-6 transform -translate-x-1/2 pointer-events-auto hidden md:block">
                <div className="flex items-center gap-1 rounded-full border border-black/5 bg-neutral-100/80 backdrop-blur-sm px-2 py-1 dark:border-white/5 dark:bg-neutral-900/80">
                    <a href="/" className="px-4 py-2 rounded-full text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-white/50 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800/50 transition-all">
                        Home
                    </a>
                    <a href="/#about" className="px-4 py-2 rounded-full text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-white/50 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800/50 transition-all">
                        About
                    </a>
                    <a href="/#skills" className="px-4 py-2 rounded-full text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-white/50 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800/50 transition-all">
                        Skills
                    </a>
                    <a href="/#projects" className="px-4 py-2 rounded-full text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-white/50 dark:text-neutral-400 dark:hover:text-neutral-100 dark:hover:bg-neutral-800/50 transition-all">
                        Projects
                    </a>
                </div>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 pointer-events-auto">
                {/* Location - hidden on very small screens */}
                <div className="hidden sm:block">
                    <LocationTag city="Ananthapur" country="India" timezone="IST" />
                </div>

                {/* Resume Button - hidden on mobile */}
                <a 
                    href="https://drive.google.com/file/d/1lmsky6pXd9W-Mqyaitc4i6TZhbD36P2u/view?usp=sharing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hidden sm:block"
                >
                    <ShimmerButton className="shadow-2xl h-8 sm:h-10 px-4 sm:px-6">
                        <span className="text-center text-xs sm:text-sm font-medium tracking-tight whitespace-pre-wrap text-white">
                            Resume
                        </span>
                    </ShimmerButton>
                </a>

                {/* Creative Mobile Menu Button */}
                <AnimatedMenuButton isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
            </div>

            {/* Creative Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 right-0 mt-3 mx-3 pointer-events-auto md:hidden"
                    >
                        <div className="relative overflow-hidden rounded-3xl bg-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl">
                            {/* Gradient background effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
                            
                            <nav className="relative p-5">
                                {/* Menu Items */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    {menuItems.map((item, index) => {
                                        const Icon = item.icon;
                                        return (
                                            <motion.a
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="group relative flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all"
                                            >
                                                <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
                                                    <Icon className="w-5 h-5 text-white" />
                                                </div>
                                                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                                                    {item.label}
                                                </span>
                                            </motion.a>
                                        );
                                    })}
                                </div>

                                {/* Divider with sparkle */}
                                <div className="flex items-center gap-3 my-4">
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                </div>

                                {/* Resume Button */}
                                <motion.a
                                    href="https://drive.google.com/file/d/1lmsky6pXd9W-Mqyaitc4i6TZhbD36P2u/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg shadow-purple-500/25"
                                >
                                    <FileText className="w-5 h-5 text-white" />
                                    <span className="text-sm font-semibold text-white">Download Resume</span>
                                </motion.a>

                                {/* Location info */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex items-center justify-center gap-2 mt-4 text-xs text-white/40"
                                >
                                    <span>📍</span>
                                    <span>Ananthapur, India</span>
                                </motion.div>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
