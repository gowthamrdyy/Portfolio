import { cn } from "@/lib/utils";

interface ProgressiveBlurProps {
    position?: "top" | "bottom";
    height?: string;
    className?: string;
    blur?: string;
}

export function ProgressiveBlur({
    position = "bottom",
    height = "20%",
    className,
    blur = "8px",
}: ProgressiveBlurProps) {
    return (
        <div
            className={cn(
                "absolute left-0 right-0 z-10 pointer-events-none",
                position === "top" ? "top-0" : "bottom-0",
                className
            )}
            style={{
                height,
                backdropFilter: `blur(${blur})`,
                WebkitBackdropFilter: `blur(${blur})`,
                maskImage:
                    position === "top"
                        ? "linear-gradient(to bottom, black, transparent)"
                        : "linear-gradient(to top, black, transparent)",
                WebkitMaskImage:
                    position === "top"
                        ? "linear-gradient(to bottom, black, transparent)"
                        : "linear-gradient(to top, black, transparent)",
            }}
        />
    );
}
