import React from 'react'
import { motion } from 'framer-motion'

const SplitText = ({
    text = '',
    className = '',
    delay = 40,
    animationFrom = { opacity: 0, y: 16 },
    animationTo = { opacity: 1, y: 0 },
    easing = [0.16, 1, 0.3, 1],
    threshold = 0.1,
    rootMargin = '-30px',
    textAlign = 'center'
}) => {
    const words = text.split(' ')

    return (
        <span className={`inline-flex flex-wrap justify-center ${className}`} style={{ textAlign }}>
            {words.map((word, wIndex) => (
                <span key={wIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split('').map((char, cIndex) => (
                        <motion.span
                            key={cIndex}
                            initial={animationFrom}
                            whileInView={animationTo}
                            viewport={{ once: true, amount: threshold, margin: rootMargin }}
                            transition={{
                                duration: 0.5,
                                ease: easing,
                                delay: ((wIndex * 2) + cIndex) * (delay / 1000)
                            }}
                            className="inline-block"
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </span>
    )
}

export default SplitText
