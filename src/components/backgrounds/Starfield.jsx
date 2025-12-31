import { useEffect, useRef } from 'react'

const Starfield = ({ density = 100, speed = 0.5 }) => { // Reduced density default
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d', { alpha: false }) // Optimization: No alpha channel for background
        let animationFrameId
        let stars = []

        // Set canvas size
        const resizeCanvas = () => {
            // Optimization: Debounce or throttle could be added, but handled by React re-render usually.
            // For now, raw resize is okay but let's ensure we don't spam.
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Create stars
        const createStars = () => {
            stars = []
            // Limit max stars for performance on low-end devices
            const count = Math.min(density, 150)

            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1.5,
                    speed: (Math.random() * 0.5 + 0.1) * speed,
                    opacity: Math.random(),
                    fade: Math.random() * 0.02 + 0.005
                })
            }
        }
        createStars()

        // Animation loop - OPTIMIZED
        const animate = () => {
            // Optimization: Fill with opaque black instead of clearRect since we used alpha: false
            ctx.fillStyle = '#000000'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.fillStyle = "white"

            for (let i = 0; i < stars.length; i++) {
                const star = stars[i]

                star.y += star.speed
                star.opacity += star.fade

                if (star.opacity > 1 || star.opacity < 0.2) {
                    star.fade = -star.fade
                }

                // Reset if out of bounds
                if (star.y > canvas.height) {
                    star.y = 0
                    star.x = Math.random() * canvas.width
                }

                // Draw star
                ctx.globalAlpha = star.opacity
                ctx.fillRect(star.x, star.y, star.size, star.size) // fillRect is faster than arc
            }

            animationFrameId = requestAnimationFrame(animate)
        }
        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [density, speed])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1, opacity: 0.6 }} // Lower opacity via CSS for blending
        />
    )
}

export default Starfield
