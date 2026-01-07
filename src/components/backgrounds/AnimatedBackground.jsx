import React, { useEffect, useRef } from 'react'

// Particle class defined outside to resolve lint warning
class Particle {
    constructor(canvas) {
        this.canvas = canvas
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.8
        this.speedY = (Math.random() - 0.5) * 0.8
        this.opacity = Math.random() * 0.6 + 0.4
    }

    update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > this.canvas.width) this.x = 0
        if (this.x < 0) this.x = this.canvas.width
        if (this.y > this.canvas.height) this.y = 0
        if (this.y < 0) this.y = this.canvas.height
    }

    draw(ctx) {
        // Pixel Art Square (Cyan with opacity)
        ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`
        // Use fillRect for square pixels
        ctx.fillRect(Math.floor(this.x), Math.floor(this.y), Math.max(2, this.size), Math.max(2, this.size))
    }
}

const AnimatedBackground = () => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        let animationFrameId
        let particles = []

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Create particles
        const createParticles = () => {
            // Reduced density for cleaner retro look
            const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
            particles = []
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvas))
            }
        }
        createParticles()

        // Connect particles (with retro style lines)
        const connectParticles = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 150) {
                        // Cyan connection lines, fading out
                        ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - distance / 150)})`
                        ctx.lineWidth = 1 // integer line width for crunchier look
                        ctx.beginPath()
                        // Floor coordinates for cleaner lines
                        ctx.moveTo(Math.floor(particles[i].x), Math.floor(particles[i].y))
                        ctx.lineTo(Math.floor(particles[j].x), Math.floor(particles[j].y))
                        ctx.stroke()
                    }
                }
            }
        }

        // Animation loop
        const animate = () => {
            // Dark gradient background (Deep Space)
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
            gradient.addColorStop(0, '#000000')
            gradient.addColorStop(0.5, '#050505')
            gradient.addColorStop(1, '#000000')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Update and draw particles
            particles.forEach(particle => {
                particle.update()
                particle.draw(ctx)
            })

            connectParticles()
            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full"
            style={{ zIndex: 0, background: '#000000' }}
        />
    )
}

export default AnimatedBackground
