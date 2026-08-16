import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RotatingText = ({ texts = [], interval = 3000, className = '' }) => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (!texts.length) return
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % texts.length)
        }, interval)
        return () => clearInterval(timer)
    }, [texts, interval])

    if (!texts.length) return null

    return (
        <span className={`inline-block relative overflow-hidden align-bottom ${className}`}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: 24, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -24, opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 font-bold"
                >
                    {texts[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    )
}

export default RotatingText
