"use client"

import { useEffect, useRef } from "react"

interface Vector2D {
    x: number
    y: number
}

class Particle {
    pos: Vector2D = { x: 0, y: 0 }
    vel: Vector2D = { x: 0, y: 0 }
    acc: Vector2D = { x: 0, y: 0 }
    target: Vector2D = { x: 0, y: 0 }

    closeEnoughTarget = 100
    maxSpeed = 1.0
    maxForce = 0.1
    particleSize = 10
    isKilled = false

    startColor = { r: 255, g: 255, b: 255 }
    targetColor = { r: 255, g: 255, b: 255 }
    colorWeight = 0
    colorBlendRate = 0.01

    move() {
        // Check if particle is close enough to its target to slow down
        let proximityMult = 1
        const distance = Math.sqrt(Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2))

        if (distance < this.closeEnoughTarget) {
            proximityMult = distance / this.closeEnoughTarget
        }

        // Add force towards target
        const towardsTarget = {
            x: this.target.x - this.pos.x,
            y: this.target.y - this.pos.y,
        }

        const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y)
        if (magnitude > 0) {
            towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult
            towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult
        }

        const steer = {
            x: towardsTarget.x - this.vel.x,
            y: towardsTarget.y - this.vel.y,
        }

        const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y)
        if (steerMagnitude > 0) {
            steer.x = (steer.x / steerMagnitude) * this.maxForce
            steer.y = (steer.y / steerMagnitude) * this.maxForce
        }

        this.acc.x += steer.x
        this.acc.y += steer.y

        // Move particle
        this.vel.x += this.acc.x
        this.vel.y += this.acc.y
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
        this.acc.x = 0
        this.acc.y = 0
    }

    draw(ctx: CanvasRenderingContext2D, drawAsPoints: boolean) {
        // Blend towards target color
        if (this.colorWeight < 1.0) {
            this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
        }

        // Calculate current color
        const currentColor = {
            r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
            g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
            b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
        }

        if (drawAsPoints) {
            ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
            ctx.fillRect(this.pos.x, this.pos.y, 2, 2)
        } else {
            ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
            ctx.beginPath()
            ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2)
            ctx.fill()
        }
    }

    kill(width: number, height: number) {
        if (!this.isKilled) {
            // Set target outside the scene
            const randomPos = this.generateRandomPos(width / 2, height / 2, (width + height) / 2)
            this.target.x = randomPos.x
            this.target.y = randomPos.y

            // Begin blending color to white
            this.startColor = {
                r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
                g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
                b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
            }
            this.targetColor = { r: 255, g: 255, b: 255 }
            this.colorWeight = 0

            this.isKilled = true
        }
    }

    private generateRandomPos(x: number, y: number, mag: number): Vector2D {
        const randomX = Math.random() * 1000
        const randomY = Math.random() * 500

        const direction = {
            x: randomX - x,
            y: randomY - y,
        }

        const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
        if (magnitude > 0) {
            direction.x = (direction.x / magnitude) * mag
            direction.y = (direction.y / magnitude) * mag
        }

        return {
            x: x + direction.x,
            y: y + direction.y,
        }
    }
}

interface ParticleTextEffectProps {
    words?: string[]
    onIntroComplete?: () => void
}

const DEFAULT_WORDS = ["Gowtham Sree Charan Reddy", "Developer and Designer", "Machine Learning"]

export function ParticleTextEffect({ words = DEFAULT_WORDS, onIntroComplete }: ParticleTextEffectProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>(0)
    const particlesRef = useRef<Particle[]>([])
    const frameCountRef = useRef(0)
    const wordIndexRef = useRef(-1) // Start at -1 for intro
    const isIntroRef = useRef(true)
    const mouseRef = useRef({ x: 0, y: 0, isPressed: false, isRightClick: false })

    // Helper to check if mobile
    const getIsMobile = () => typeof window !== 'undefined' && window.innerWidth < 768
    const drawAsPoints = true

    const generateRandomPos = (x: number, y: number, mag: number): Vector2D => {
        const randomX = Math.random() * 1000
        const randomY = Math.random() * 500

        const direction = {
            x: randomX - x,
            y: randomY - y,
        }

        const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
        if (magnitude > 0) {
            direction.x = (direction.x / magnitude) * mag
            direction.y = (direction.y / magnitude) * mag
        }

        return {
            x: x + direction.x,
            y: y + direction.y,
        }
    }

    const processContent = async (content: string, canvas: HTMLCanvasElement, isImage: boolean) => {
        const isMobile = getIsMobile()
        const offscreenCanvas = document.createElement("canvas")
        // Reduce resolution on mobile for better performance
        const scale = isMobile ? 0.5 : 1
        offscreenCanvas.width = canvas.width * scale
        offscreenCanvas.height = canvas.height * scale
        const offscreenCtx = offscreenCanvas.getContext("2d")!

        if (isImage) {
            const img = new Image()
            img.src = content
            await new Promise((resolve) => {
                img.onload = resolve
                img.onerror = resolve // Skip on error
            })

            // Calculate image scale - smaller on mobile
            const heightMultiplier = isMobile ? 0.7 : 1.05
            const imageScale = (canvas.height * heightMultiplier) / img.height

            const w = img.width * imageScale
            const h = img.height * imageScale
            const x = (offscreenCanvas.width - w * scale) / 2
            const y = (offscreenCanvas.height - h * scale) / 2

            offscreenCtx.drawImage(img, x, y, w * scale, h * scale)
        } else {
            // Responsive font size based on screen width
            const screenWidth = window.innerWidth
            let fontSize = 100
            if (screenWidth < 480) {
                fontSize = 28 // Very small screens
            } else if (screenWidth < 640) {
                fontSize = 36 // Small phones
            } else if (screenWidth < 768) {
                fontSize = 48 // Large phones
            } else if (screenWidth < 1024) {
                fontSize = 70 // Tablets
            }
            
            offscreenCtx.fillStyle = "white"
            offscreenCtx.font = `bold ${fontSize}px Arial`
            offscreenCtx.textAlign = "center"
            offscreenCtx.textBaseline = "middle"
            
            // Handle long text by wrapping on mobile
            if (isMobile && content.length > 15) {
                const words = content.split(' ')
                const midPoint = Math.ceil(words.length / 2)
                const line1 = words.slice(0, midPoint).join(' ')
                const line2 = words.slice(midPoint).join(' ')
                const lineHeight = fontSize * 1.2
                offscreenCtx.fillText(line1, offscreenCanvas.width / 2, offscreenCanvas.height / 2 - lineHeight / 2)
                offscreenCtx.fillText(line2, offscreenCanvas.width / 2, offscreenCanvas.height / 2 + lineHeight / 2)
            } else {
                offscreenCtx.fillText(content, offscreenCanvas.width / 2, offscreenCanvas.height / 2)
            }
        }

        const imageData = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height)
        const pixels = imageData.data

        const particles = particlesRef.current
        let particleIndex = 0

        // Collect coordinates - adjust sampling based on screen size
        const coordsIndexes: number[] = []
        // Higher pixelSteps = fewer particles (better performance on mobile)
        const pixelSteps = isMobile ? 10 : 4
        for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
            // Basic alpha check optimized
            if (pixels[i + 3] > 0) {
                coordsIndexes.push(i)
            }
        }

        // Shuffle coordinates for fluid motion
        for (let i = coordsIndexes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]]
        }
        
        for (const pixelIndex of coordsIndexes) {
            const x = ((pixelIndex / 4) % offscreenCanvas.width) / scale
            const y = Math.floor(pixelIndex / 4 / offscreenCanvas.width) / scale

            // For images, use pixel color. For text, use white.
            const r = isImage ? pixels[pixelIndex] : 255
            const g = isImage ? pixels[pixelIndex + 1] : 255
            const b = isImage ? pixels[pixelIndex + 2] : 255

            const targetColor = { r, g, b }

            let particle: Particle

            if (particleIndex < particles.length) {
                particle = particles[particleIndex]
                particle.isKilled = false
                particleIndex++
            } else {
                particle = new Particle()

                // Spawn outside
                const randomPos = generateRandomPos(canvas.width / 2, canvas.height / 2, (canvas.width + canvas.height) / 2)
                particle.pos.x = randomPos.x
                particle.pos.y = randomPos.y

                // Adjust speed and size for mobile (using isMobile from above)
                particle.maxSpeed = isMobile ? Math.random() * 4 + 3 : Math.random() * 6 + 4
                particle.maxForce = particle.maxSpeed * 0.05
                particle.particleSize = isMobile ? Math.random() * 3 + 2 : Math.random() * 4 + 3
                particle.colorBlendRate = Math.random() * 0.0275 + 0.0025

                particles.push(particle)
            }

            particle.startColor = { ...particle.targetColor } // Start from previous color or white/black
            particle.targetColor = targetColor
            particle.colorWeight = 0

            particle.target.x = x
            particle.target.y = y
        }

        // Kill remaining particles
        for (let i = particleIndex; i < particles.length; i++) {
            particles[i].kill(canvas.width, canvas.height)
        }
    }

    const animate = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")!
        const particles = particlesRef.current

        // Clear with transparency
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i]
            particle.move()
            particle.draw(ctx, drawAsPoints)

            // Remove dead particles that are out of bounds
            if (particle.isKilled) {
                if (
                    particle.pos.x < 0 ||
                    particle.pos.x > canvas.width ||
                    particle.pos.y < 0 ||
                    particle.pos.y > canvas.height
                ) {
                    particles.splice(i, 1)
                }
            }
        }

        // Handle mouse interaction
        if (mouseRef.current.isPressed && mouseRef.current.isRightClick) {
            particles.forEach((particle) => {
                const distance = Math.sqrt(
                    Math.pow(particle.pos.x - mouseRef.current.x, 2) + Math.pow(particle.pos.y - mouseRef.current.y, 2),
                )
                if (distance < 50) {
                    particle.kill(canvas.width, canvas.height)
                }
            })
        }

        // Auto-advance words
        frameCountRef.current++
        if (frameCountRef.current % 270 === 0) {
            if (isIntroRef.current) {
                isIntroRef.current = false
                if (onIntroComplete) onIntroComplete()
                wordIndexRef.current = 0
                processContent(words[wordIndexRef.current], canvas, false)
            } else {
                wordIndexRef.current = (wordIndexRef.current + 1) % words.length
                processContent(words[wordIndexRef.current], canvas, false)
            }
        }

        animationRef.current = requestAnimationFrame(animate)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const handleResize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            // Re-render current word to center it
            if (isIntroRef.current) {
                processContent("/hero-image.png", canvas, true)
            } else {
                processContent(words[wordIndexRef.current], canvas, false)
            }
        }

        // Initialize size
        handleResize()

        // Start animation
        animate()

        // Mouse event handlers
        const handleMouseDown = (e: MouseEvent) => {
            mouseRef.current.isPressed = true
            mouseRef.current.isRightClick = e.button === 2
            const rect = canvas.getBoundingClientRect()
            mouseRef.current.x = e.clientX - rect.left
            mouseRef.current.y = e.clientY - rect.top
        }

        const handleMouseUp = () => {
            mouseRef.current.isPressed = false
            mouseRef.current.isRightClick = false
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current.x = e.clientX - rect.left
            mouseRef.current.y = e.clientY - rect.top
        }

        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault()
        }

        window.addEventListener("resize", handleResize)
        canvas.addEventListener("mousedown", handleMouseDown)
        canvas.addEventListener("mouseup", handleMouseUp)
        canvas.addEventListener("mousemove", handleMouseMove)
        canvas.addEventListener("contextmenu", handleContextMenu)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            window.removeEventListener("resize", handleResize)
            canvas.removeEventListener("mousedown", handleMouseDown)
            canvas.removeEventListener("mouseup", handleMouseUp)
            canvas.removeEventListener("mousemove", handleMouseMove)
            canvas.removeEventListener("contextmenu", handleContextMenu)
        }
    }, [words, onIntroComplete])

    return (
        <div className="absolute inset-0 w-full h-full">
            <canvas
                ref={canvasRef}
                className="block w-full h-full pointer-events-auto"
            />
        </div>
    )
}
