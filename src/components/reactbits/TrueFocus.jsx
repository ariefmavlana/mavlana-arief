import React, { useState } from 'react'

const TrueFocus = ({
    sentence = "BUILDING DIGITAL SYSTEMS",
    manualMode = false,
    blurAmount = 3,
    borderColor = "#38bdf8",
    glowColor = "rgba(56, 189, 248, 0.4)",
    animationDuration = 0.4,
    pauseBetweenAnimations = 1,
    className = ""
}) => {
    const words = sentence.split(" ")
    const [currentIndex, setCurrentIndex] = useState(0)
    const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 })

    const handleMouseEnter = (index, event) => {
        const target = event.currentTarget
        if (target) {
            const rect = target.getBoundingClientRect()
            const parentRect = target.parentElement.getBoundingClientRect()
            setFocusRect({
                x: rect.left - parentRect.left,
                y: rect.top - parentRect.top,
                width: rect.width,
                height: rect.height
            })
            setCurrentIndex(index)
        }
    }

    return (
        <div className={`relative inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 ${className}`}>
            {words.map((word, idx) => (
                <span
                    key={idx}
                    onMouseEnter={(e) => handleMouseEnter(idx, e)}
                    onTouchStart={(e) => handleMouseEnter(idx, e)}
                    className="relative cursor-pointer transition-all duration-300 font-display select-none"
                    style={{
                        filter: idx === currentIndex ? 'none' : `blur(${blurAmount}px)`,
                        opacity: idx === currentIndex ? 1 : 0.5,
                        transitionDuration: `${animationDuration}s`
                    }}
                >
                    {word}
                </span>
            ))}

            {/* Glowing Space Reticle Highlight Box */}
            <div
                className="absolute pointer-events-none transition-all duration-300 rounded-lg border border-cyan-400/80 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                style={{
                    left: `${focusRect.x - 6}px`,
                    top: `${focusRect.y - 4}px`,
                    width: `${focusRect.width + 12}px`,
                    height: `${focusRect.height + 8}px`,
                    borderColor: borderColor,
                    boxShadow: `0 0 20px ${glowColor}`,
                    opacity: focusRect.width > 0 ? 1 : 0
                }}
            >
                {/* HUD Corner Accents */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400" />
            </div>
        </div>
    )
}

export default TrueFocus
