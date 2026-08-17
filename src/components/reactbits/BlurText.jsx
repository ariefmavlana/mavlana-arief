import React from 'react'
import { motion } from 'framer-motion'

const BlurText = ({
    text = '',
    delay = 150,
    className = '',
    animateBy = 'words', // 'words' or 'letters'
    direction = 'top', // 'top' or 'bottom'
    threshold = 0.2,
    rootMargin = '-50px',
    animationFrom,
    animationTo,
    easing = [0.25, 0.1, 0.25, 1],
    onAnimationComplete
}) => {
    const elements = animateBy === 'words' ? text.split(' ') : text.split('')

    const defaultFrom =
        direction === 'top'
            ? { filter: 'blur(12px)', opacity: 0, transform: 'translate3d(0,-20px,0)' }
            : { filter: 'blur(12px)', opacity: 0, transform: 'translate3d(0,20px,0)' }

    const defaultTo = [
        {
            filter: 'blur(5px)',
            opacity: 0.6,
            transform: direction === 'top' ? 'translate3d(0,5px,0)' : 'translate3d(0,-5px,0)'
        },
        {
            filter: 'blur(0px)',
            opacity: 1,
            transform: 'translate3d(0,0px,0)'
        }
    ]

    return (
        <span className={`inline-flex flex-wrap ${className}`}>
            {elements.map((item, index) => (
                <motion.span
                    key={index}
                    initial={animationFrom || defaultFrom}
                    whileInView={animationTo || defaultTo[1]}
                    viewport={{ once: true, amount: threshold, margin: rootMargin }}
                    transition={{
                        duration: 0.6,
                        ease: easing,
                        delay: (index * delay) / 1000
                    }}
                    onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
                    className="inline-block"
                    style={{
                        marginRight: animateBy === 'words' ? '0.3em' : '0em',
                        willChange: 'transform, filter, opacity'
                    }}
                >
                    {item === ' ' ? '\u00A0' : item}
                </motion.span>
            ))}
        </span>
    )
}

export default BlurText
