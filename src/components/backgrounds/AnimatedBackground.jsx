import React, { useEffect, useRef } from 'react'

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

        // Particle class
        class Particle {
            constructor() {
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

                if (this.x > canvas.width) this.x = 0
                if (this.x < 0) this.x = canvas.width
                if (this.y > canvas.height) this.y = 0
                if (this.y < 0) this.y = canvas.height
            }

            draw() {
                ctx.fillStyle = `rgba(141, 255, 105, ${this.opacity})`
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        // Create particles
        const createParticles = () => {
            const particleCount = Math.floor((canvas.width * canvas.height) / 8000)
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle())
            }
        }
        createParticles()

        // Draw grid
        const drawGrid = () => {
            const gridSize = 50
            ctx.strokeStyle = 'rgba(141, 255, 105, 0.08)'
            ctx.lineWidth = 1

            // Vertical lines
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, canvas.height)
                ctx.stroke()
            }

            // Horizontal lines
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(canvas.width, y)
                ctx.stroke()
            }
        }

        // Connect particles
        const connectParticles = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(141, 255, 105, ${0.2 * (1 - distance / 150)})`
                        ctx.lineWidth = 1
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }
        }

        // Animation loop
        const animate = () => {
            // Create dark gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
            gradient.addColorStop(0, '#000000')
            gradient.addColorStop(0.5, '#0a0a0a')
            gradient.addColorStop(1, '#000000')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw grid
            drawGrid()

            // Update and draw particles
            particles.forEach(particle => {
                particle.update()
                particle.draw()
            })

            // Connect particles
            connectParticles()

            animationFrameId = requestAnimationFrame(animate)
        }

        animate()

        // Cleanup
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
