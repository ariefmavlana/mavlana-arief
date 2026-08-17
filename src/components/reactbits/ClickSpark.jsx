import React, { useRef, useEffect } from 'react'

const ClickSpark = ({
    sparkColor = '#38bdf8',
    sparkSize = 10,
    sparkRadius = 25,
    sparkCount = 8,
    duration = 400,
    easing = 'ease-out',
    extraScale = 1.0,
    children,
    className = ''
}) => {
    const canvasRef = useRef(null)
    const containerRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let sparks = []
        let animationId

        const resizeCanvas = () => {
            if (containerRef.current) {
                canvas.width = containerRef.current.offsetWidth
                canvas.height = containerRef.current.offsetHeight
            }
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        class Spark {
            constructor(x, y) {
                this.x = x
                this.y = y
                this.angle = Math.random() * Math.PI * 2
                this.speed = Math.random() * 2 + 1.5
                this.radius = Math.random() * sparkRadius * extraScale + 10
                this.size = sparkSize
                this.alpha = 1
                this.startTime = performance.now()
            }

            draw(ctx, currentTime) {
                const elapsed = currentTime - this.startTime
                const progress = Math.min(elapsed / duration, 1)

                this.alpha = 1 - progress
                const distance = this.radius * progress

                const currentX = this.x + Math.cos(this.angle) * distance
                const currentY = this.y + Math.sin(this.angle) * distance

                ctx.save()
                ctx.beginPath()
                ctx.arc(currentX, currentY, this.size * (1 - progress * 0.5), 0, Math.PI * 2)
                ctx.fillStyle = sparkColor
                ctx.globalAlpha = this.alpha
                ctx.shadowColor = sparkColor
                ctx.shadowBlur = 10
                ctx.fill()
                ctx.restore()

                return progress < 1
            }
        }

        const handleClick = (e) => {
            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            for (let i = 0; i < sparkCount; i++) {
                sparks.push(new Spark(x, y))
            }

            if (!animationId) {
                animate()
            }
        }

        const animate = (currentTime = performance.now()) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            sparks = sparks.filter((spark) => spark.draw(ctx, currentTime))

            if (sparks.length > 0) {
                animationId = requestAnimationFrame(animate)
            } else {
                animationId = null
            }
        }

        const container = containerRef.current
        if (container) {
            container.addEventListener('click', handleClick)
        }

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            if (container) {
                container.removeEventListener('click', handleClick)
            }
            if (animationId) {
                cancelAnimationFrame(animationId)
            }
        }
    }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, extraScale])

    return (
        <div ref={containerRef} className={`relative inline-block ${className}`}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none z-50 w-full h-full"
            />
            {children}
        </div>
    )
}

export default ClickSpark
