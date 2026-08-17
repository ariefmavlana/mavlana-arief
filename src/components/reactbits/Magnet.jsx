import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const Magnet = ({
    children,
    padding = 100,
    disabled = false,
    magnetStrength = 2,
    activeClassName = '',
    inactiveClassName = '',
    wrapperClassName = 'inline-block',
    ...props
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const ref = useRef(null)

    const handleMouseMove = (e) => {
        if (disabled || !ref.current) return

        const { left, top, width, height } = ref.current.getBoundingClientRect()
        const centerX = left + width / 2
        const centerY = top + height / 2

        const distX = Math.abs(centerX - e.clientX)
        const distY = Math.abs(centerY - e.clientY)

        if (distX < width / 2 + padding && distY < height / 2 + padding) {
            const x = (e.clientX - centerX) / magnetStrength
            const y = (e.clientY - centerY) / magnetStrength
            setPosition({ x, y })
        } else {
            setPosition({ x: 0, y: 0 })
        }
    }

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 })
    }

    return (
        <div
            ref={ref}
            className={wrapperClassName}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
        >
            <motion.div
                animate={{ x: position.x, y: position.y }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.5 }}
                className={position.x !== 0 || position.y !== 0 ? activeClassName : inactiveClassName}
            >
                {children}
            </motion.div>
        </div>
    )
}

export default Magnet
