"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Syne:wght@400;700;800&display=swap');

.preview-card {
  position: fixed;
  pointer-events: none;
  z-index: 1000;
  opacity: 0;
  transform: translateY(10px) scale(0.95);
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform, opacity;
}

.preview-card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.preview-card-inner {
  background: #1a1a1a;
  border-radius: 16px;
  padding: 8px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 0 60px rgba(255, 107, 107, 0.1);
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.preview-card img {
  width: 280px;
  height: auto;
  border-radius: 10px;
  display: block;
}

.preview-card-title {
  padding: 12px 8px 8px;
  font-size: 0.85rem;
  color: #fff;
  font-weight: 600;
  font-family: 'Syne', sans-serif;
}

.preview-card-subtitle {
  padding: 0 8px 8px;
  font-size: 0.75rem;
  color: #666;
}
`

interface PreviewData {
  image: string
  title: string
  subtitle: string
}

interface PreviewCardProps {
  data: PreviewData | null
  position: { x: number; y: number }
  isVisible: boolean
  cardRef: React.RefObject<HTMLDivElement | null>
}

const PreviewCard = ({ data, position, isVisible, cardRef }: PreviewCardProps) => {
  if (!data) return null

  return (
    <div
      ref={cardRef}
      className={`preview-card ${isVisible ? "visible" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="preview-card-inner">
        <img
          src={data.image || "/placeholder.svg"}
          alt={data.title || ""}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <div className="preview-card-title">{data.title}</div>
        <div className="preview-card-subtitle">{data.subtitle}</div>
      </div>
    </div>
  )
}

interface HoverPreviewWrapperProps {
  children: React.ReactNode | ((handlers: {
    onHoverStart: (key: string, e: React.MouseEvent) => void
    onHoverMove: (e: React.MouseEvent) => void
    onHoverEnd: () => void
  }) => React.ReactNode)
  previewData: Record<string, PreviewData>
  onHoverStart: (key: string, e: React.MouseEvent) => void
  onHoverMove: (e: React.MouseEvent) => void
  onHoverEnd: () => void
}

export function HoverPreviewWrapper({
  children,
  previewData,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
}: HoverPreviewWrapperProps) {
  const [activePreview, setActivePreview] = useState<PreviewData | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Preload all images on mount
  useEffect(() => {
    Object.entries(previewData).forEach(([, data]) => {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = data.image
    })
  }, [previewData])

  const updatePosition = useCallback((e: React.MouseEvent | MouseEvent) => {
    const cardWidth = 300
    const cardHeight = 250
    const offsetY = 20

    let x = e.clientX - cardWidth / 2
    let y = e.clientY - cardHeight - offsetY

    if (x + cardWidth > window.innerWidth - 20) {
      x = window.innerWidth - cardWidth - 20
    }
    if (x < 20) {
      x = 20
    }

    if (y < 20) {
      y = e.clientY + offsetY
    }

    setPosition({ x, y })
  }, [])

  const handleHoverStart = useCallback(
    (key: string, e: React.MouseEvent) => {
      setActivePreview(previewData[key])
      setIsVisible(true)
      updatePosition(e)
    },
    [previewData, updatePosition]
  )

  const handleHoverMove = useCallback(
    (e: React.MouseEvent) => {
      if (isVisible) {
        updatePosition(e)
      }
    },
    [isVisible, updatePosition]
  )

  const handleHoverEnd = useCallback(() => {
    setIsVisible(false)
  }, [])

  return (
    <>
      <style>{styles}</style>
      <div
        onMouseMove={handleHoverMove}
        onMouseLeave={handleHoverEnd}
      >
        {typeof children === 'function'
          ? children({ onHoverStart: handleHoverStart, onHoverMove: handleHoverMove, onHoverEnd: handleHoverEnd })
          : children}
      </div>
      <PreviewCard data={activePreview} position={position} isVisible={isVisible} cardRef={cardRef} />
    </>
  )
}

interface HoverLinkProps {
  previewKey: string
  children: React.ReactNode
  onHoverStart: (key: string, e: React.MouseEvent) => void
  onHoverMove: (e: React.MouseEvent) => void
  onHoverEnd: () => void
}

export const HoverLink = ({
  previewKey,
  children,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
}: HoverLinkProps) => {
  return (
    <span
      className="cursor-pointer relative inline-block transition-colors duration-300"
      onMouseEnter={(e) => onHoverStart(previewKey, e)}
      onMouseMove={onHoverMove}
      onMouseLeave={onHoverEnd}
    >
      {children}
    </span>
  )
}
