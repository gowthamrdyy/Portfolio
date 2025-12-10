"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AnimatedHeroImage({ visible }: { visible: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="relative w-auto h-[70vh] sm:h-[85vh] md:h-[95vh] lg:h-[105vh] aspect-[3/4]"
        >
            <Image
                src="/hero-image.png"
                alt="Gowtham Sree Charan Reddy"
                fill
                className="object-contain drop-shadow-2xl z-10 contrast-115 saturate-125 brightness-105"
                priority
                sizes="(max-width: 640px) 70vw, (max-width: 768px) 60vw, (max-width: 1024px) 50vw, 40vw"
            />
        </motion.div>
    );
}
