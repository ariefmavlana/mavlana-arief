import React, { useRef, useState } from 'react'

const TiltedCard = ({
    children,
    className = '',
    maxTilt = 8,
    scale = 1.02
}) => {
    const cardRef = useRef(null)
    const [tilt, setTilt] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = (e) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = ((y - centerY) / centerY) * -maxTilt
        const rotateY = ((x - centerX) / centerX) * maxTilt

        setTilt({ x: rotateX, y: rotateY })
    }

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        setTilt({ x: 0, y: 0 })
    }

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: isHovered
                    ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${scale})`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
            }}
            className={`will-change-transform ${className}`}
        >
            {children}
        </div>
    )
}

export default TiltedCard
