import React, { useRef } from 'react'
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    useAnimationFrame,
    useMotionValue
} from 'framer-motion'

const wrap = (min, max, v) => {
    const rangeSize = max - min
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

const VelocityText = ({ children, baseVelocity = 100, className = '' }) => {
    const baseX = useMotionValue(0)
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    })
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    })

    const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)

    const directionFactor = useRef(1)

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get()
        baseX.set(baseX.get() + moveBy)
    })

    return (
        <div className="overflow-hidden whitespace-nowrap flex flex-nowrap w-full select-none">
            <motion.div className={`flex flex-nowrap gap-6 sm:gap-8 items-center ${className}`} style={{ x }}>
                <div className="flex items-center gap-4 sm:gap-6 shrink-0">{children}</div>
                <div className="flex items-center gap-4 sm:gap-6 shrink-0">{children}</div>
                <div className="flex items-center gap-4 sm:gap-6 shrink-0">{children}</div>
                <div className="flex items-center gap-4 sm:gap-6 shrink-0">{children}</div>
            </motion.div>
        </div>
    )
}

const ScrollVelocity = ({
    texts = [],
    items = null,
    velocity = 5,
    className = '',
    textClassName = ''
}) => {
    const contentToRender = items || texts

    return (
        <div className={`relative w-full overflow-hidden ${className}`}>
            {contentToRender.map((content, i) => (
                <VelocityText
                    key={i}
                    baseVelocity={i % 2 === 0 ? velocity : -velocity}
                    className={textClassName}
                >
                    {content}
                </VelocityText>
            ))}
        </div>
    )
}

export default ScrollVelocity

