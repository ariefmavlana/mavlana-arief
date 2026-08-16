import React, { useEffect, useState, useRef } from 'react'

const FadeIn = ({ children, delay = 0, threshold = 0.1 }) => {
    const [isVisible, setIsVisible] = useState(false)
    const elementRef = useRef(null)

    useEffect(() => {
        const element = elementRef.current
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true)
                }
            },
            {
                threshold: threshold,
                rootMargin: '0px 0px -50px 0px'
            }
        )

        if (element) {
            observer.observe(element)
        }

        return () => {
            if (element) {
                observer.unobserve(element)
            }
        }
    }, [threshold, isVisible])

    return (
        <div
            ref={elementRef}
            className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
            style={{
                transitionDelay: `${delay}ms`
            }}>
            {children}
        </div>
    )
}

export default FadeIn