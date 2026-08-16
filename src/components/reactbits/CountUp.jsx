import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const CountUp = ({
    to,
    from = 0,
    delay = 0,
    duration = 2,
    className = '',
    suffix = '',
    prefix = ''
}) => {
    const [count, setCount] = useState(from)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-40px' })

    useEffect(() => {
        if (!isInView) return

        let startTimestamp = null
        const numericTo = parseFloat(to)

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp
            const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
            const easedProgress = 1 - (1 - progress) * (1 - progress)
            const currentCount = Math.floor(easedProgress * (numericTo - from) + from)

            setCount(currentCount)

            if (progress < 1) {
                requestAnimationFrame(step)
            } else {
                setCount(numericTo)
            }
        }

        const timer = setTimeout(() => {
            requestAnimationFrame(step)
        }, delay * 1000)

        return () => clearTimeout(timer)
    }, [isInView, to, from, duration, delay])

    return (
        <span ref={ref} className={className}>
            {prefix}{count}{suffix}
        </span>
    )
}

export default CountUp
