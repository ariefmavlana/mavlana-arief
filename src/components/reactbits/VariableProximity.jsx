import React, { useRef, useState, useEffect } from 'react'

const VariableProximity = ({
    label = '',
    radius = 120,
    minWeight = 300,
    maxWeight = 800,
    className = '',
    onClick,
    style,
    ...props
}) => {
    const containerRef = useRef(null)
    const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 })
    const letterRefs = useRef([])

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return
            const rect = containerRef.current.getBoundingClientRect()
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            })
        }

        const handleMouseLeave = () => {
            setMousePosition({ x: -1000, y: -1000 })
        }

        const container = containerRef.current
        if (container) {
            container.addEventListener('mousemove', handleMouseMove)
            container.addEventListener('mouseleave', handleMouseLeave)
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove)
                container.removeEventListener('mouseleave', handleMouseLeave)
            }
        }
    }, [])

    const words = label.split(' ')
    let charCounter = 0

    return (
        <span
            ref={containerRef}
            onClick={onClick}
            className={`inline-flex flex-wrap cursor-default ${className}`}
            style={{ ...style }}
            {...props}
        >
            {words.map((word, wIdx) => (
                <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split('').map((char, cIdx) => {
                        const currentCharIdx = charCounter++
                        let fontWeight = minWeight
                        let scale = 1

                        if (letterRefs.current[currentCharIdx] && containerRef.current) {
                            const rect = letterRefs.current[currentCharIdx].getBoundingClientRect()
                            const parentRect = containerRef.current.getBoundingClientRect()
                            const charX = rect.left - parentRect.left + rect.width / 2
                            const charY = rect.top - parentRect.top + rect.height / 2

                            const dx = mousePosition.x - charX
                            const dy = mousePosition.y - charY
                            const dist = Math.sqrt(dx * dx + dy * dy)

                            if (dist < radius) {
                                const factor = 1 - dist / radius
                                fontWeight = Math.round(minWeight + factor * (maxWeight - minWeight))
                                scale = 1 + factor * 0.08
                            }
                        }

                        return (
                            <span
                                key={cIdx}
                                ref={(el) => (letterRefs.current[currentCharIdx] = el)}
                                className="inline-block transition-all duration-150 ease-out"
                                style={{
                                    fontWeight,
                                    transform: `scale(${scale})`,
                                    willChange: 'font-weight, transform'
                                }}
                            >
                                {char}
                            </span>
                        )
                    })}
                </span>
            ))}
        </span>
    )
}

export default VariableProximity

