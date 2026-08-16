import React, { useRef, useState } from 'react'

const SpotlightCard = ({
    children,
    className = '',
    spotlightColor = 'rgba(59, 130, 246, 0.15)',
    borderColor = 'rgba(255, 255, 255, 0.2)'
}) => {
    const divRef = useRef(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [opacity, setOpacity] = useState(0)

    const handleMouseMove = (e) => {
        if (!divRef.current) return
        const rect = divRef.current.getBoundingClientRect()
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    const handleMouseEnter = () => {
        setOpacity(1)
    }

    const handleMouseLeave = () => {
        setOpacity(0)
    }

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden transition-colors duration-300 ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 z-1"
                style={{
                    opacity,
                    background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 50%)`
                }}
            />
            <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 z-2"
                style={{
                    opacity,
                    background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, ${borderColor}, transparent 60%)`
                }}
            />
            <div className="relative z-10 h-full">{children}</div>
        </div>
    )
}

export default SpotlightCard
