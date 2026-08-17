import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const DecryptedText = ({
    text = '',
    speed = 50,
    maxIterations = 10,
    sequential = true,
    revealDirection = 'start',
    useOriginalCharsOnly = false,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
    className = '',
    encryptedClassName = 'text-cyan-400 font-mono',
    parentClassName = 'inline-block',
    animateOn = 'hover', // 'hover', 'view', or 'both'
    ...props
}) => {
    const [displayText, setDisplayText] = useState(text)
    const [isHovered, setIsHovered] = useState(false)
    const [isScrambling, setIsScrambling] = useState(false)
    const [hasAnimatedInView, setHasAnimatedInView] = useState(false)
    const containerRef = useRef(null)
    const intervalRef = useRef(null)

    const getRandomChar = () => {
        if (useOriginalCharsOnly && text.length > 0) {
            return text[Math.floor(Math.random() * text.length)]
        }
        return characters[Math.floor(Math.random() * characters.length)]
    }

    const scramble = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        setIsScrambling(true)

        let iteration = 0
        const totalChars = text.length

        intervalRef.current = setInterval(() => {
            setDisplayText(() => {
                return text
                    .split('')
                    .map((char, index) => {
                        if (char === ' ') return ' '

                        let isRevealed = false
                        if (sequential) {
                            if (revealDirection === 'start') {
                                isRevealed = index < Math.floor((iteration / maxIterations) * totalChars)
                            } else if (revealDirection === 'end') {
                                isRevealed = index >= totalChars - Math.floor((iteration / maxIterations) * totalChars)
                            } else {
                                isRevealed = Math.abs(index - totalChars / 2) < (iteration / maxIterations) * (totalChars / 2)
                            }
                        } else {
                            isRevealed = iteration >= maxIterations
                        }

                        if (isRevealed) {
                            return text[index]
                        }
                        return getRandomChar()
                    })
                    .join('')
            })

            iteration += 1

            if (iteration > maxIterations) {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current)
                    intervalRef.current = null
                }
                setDisplayText(text)
                setIsScrambling(false)
            }
        }, speed)
    }

    useEffect(() => {
        if (animateOn === 'view' && hasAnimatedInView) {
            scramble()
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [hasAnimatedInView])

    return (
        <motion.span
            ref={containerRef}
            className={`${parentClassName} ${className}`}
            onMouseEnter={() => {
                setIsHovered(true)
                if (animateOn === 'hover' || animateOn === 'both') {
                    scramble()
                }
            }}
            onMouseLeave={() => setIsHovered(false)}
            onViewportEnter={() => {
                if (!hasAnimatedInView) {
                    setHasAnimatedInView(true)
                    if (animateOn === 'view' || animateOn === 'both') {
                        scramble()
                    }
                }
            }}
            viewport={{ once: true, amount: 0.5 }}
            {...props}
        >
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
                {displayText.split('').map((char, index) => {
                    const isOriginal = char === text[index]
                    return (
                        <span
                            key={index}
                            className={isOriginal ? '' : encryptedClassName}
                        >
                            {char}
                        </span>
                    )
                })}
            </span>
        </motion.span>
    )
}

export default DecryptedText

