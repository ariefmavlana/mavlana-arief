import React, { useEffect, useRef } from 'react'

const Particles = ({
    speed = 0.2,
    particleColors = ['#f59e0b', '#fbbf24', '#38bdf8', '#60a5fa', '#ffffff'],
    moveParticlesOnHover = true,
    enableMeteors = true,
    enableConstellations = true,
    className = ''
}) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animationFrameId
        let particles = []
        let meteors = []
        let mouse = { x: -1000, y: -1000, active: false }

        const resizeCanvas = () => {
            if (!canvas.parentElement) return
            canvas.width = canvas.parentElement.clientWidth
            canvas.height = canvas.parentElement.clientHeight
            initSpace()
        }

        const initSpace = () => {
            particles = []
            meteors = []
            // High-density cosmic depth starfield
            const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 9000))
            for (let i = 0; i < count; i++) {
                const z = Math.random() * 3 + 0.5 // Z-depth layer
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    z,
                    vx: (Math.random() - 0.5) * speed * (1 / z),
                    vy: (Math.random() - 0.5) * speed * (1 / z),
                    radius: (Math.random() * 1.8 + 0.6) * (1 / z),
                    color: particleColors[Math.floor(Math.random() * particleColors.length)],
                    alpha: Math.random() * 0.6 + 0.2,
                    twinkleSpeed: Math.random() * 0.03 + 0.008,
                    isPulsar: Math.random() > 0.88 // 12% are JWST-style pulsar stars with diffraction flares
                })
            }
        }

        const spawnMeteor = () => {
            if (!enableMeteors || Math.random() > 0.02) return
            if (meteors.length >= 2) return

            const startX = Math.random() * canvas.width
            const startY = Math.random() * (canvas.height * 0.4)
            const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3
            const velocity = Math.random() * 8 + 6

            meteors.push({
                x: startX,
                y: startY,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                length: Math.random() * 80 + 40,
                opacity: 1,
                decay: Math.random() * 0.02 + 0.01
            })
        }

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouse.x = e.clientX - rect.left
            mouse.y = e.clientY - rect.top
            mouse.active = true
        }

        const handleMouseLeave = () => {
            mouse.active = false
            mouse.x = -1000
            mouse.y = -1000
        }

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // 1. Draw Constellation Connection Vectors
            if (enableConstellations) {
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x
                        const dy = particles[i].y - particles[j].y
                        const dist = Math.sqrt(dx * dx + dy * dy)

                        if (dist < 110) {
                            const opacity = (1 - dist / 110) * 0.15 * (particles[i].alpha * particles[j].alpha)
                            ctx.beginPath()
                            ctx.moveTo(particles[i].x, particles[i].y)
                            ctx.lineTo(particles[j].x, particles[j].y)
                            ctx.strokeStyle = `rgba(245, 158, 11, ${opacity})`
                            ctx.lineWidth = 0.8
                            ctx.stroke()
                        }
                    }
                }
            }

            // 2. Draw Stars & Pulsars
            particles.forEach((p) => {
                p.x += p.vx
                p.y += p.vy

                // Twinkle effect
                p.alpha += Math.sin(Date.now() * p.twinkleSpeed) * 0.005
                p.alpha = Math.max(0.1, Math.min(0.9, p.alpha))

                if (p.x < 0) p.x = canvas.width
                if (p.x > canvas.width) p.x = 0
                if (p.y < 0) p.y = canvas.height
                if (p.y > canvas.height) p.y = 0

                // Mouse interaction - Cosmic Gravitational Pull
                if (moveParticlesOnHover && mouse.active) {
                    const dx = mouse.x - p.x
                    const dy = mouse.y - p.y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 140) {
                        const force = (140 - dist) / 140
                        p.x -= (dx / dist) * force * 0.8
                        p.y -= (dy / dist) * force * 0.8
                    }
                }

                // Core Star Dot
                ctx.beginPath()
                ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2)
                ctx.fillStyle = p.color
                ctx.globalAlpha = p.alpha
                ctx.fill()

                // Pulsar Cross Flares (Diffraction Spikes)
                if (p.isPulsar && p.alpha > 0.4) {
                    ctx.save()
                    ctx.translate(p.x, p.y)
                    ctx.strokeStyle = p.color
                    ctx.globalAlpha = p.alpha * 0.4
                    ctx.lineWidth = 0.6

                    // Cross flare lines
                    const flareLen = p.radius * 4.5
                    ctx.beginPath()
                    ctx.moveTo(-flareLen, 0)
                    ctx.lineTo(flareLen, 0)
                    ctx.moveTo(0, -flareLen)
                    ctx.lineTo(0, flareLen)
                    ctx.stroke()
                    ctx.restore()
                }
            })

            // 3. Draw Shooting Meteors
            spawnMeteor()
            for (let i = meteors.length - 1; i >= 0; i--) {
                const m = meteors[i]
                m.x += m.vx
                m.y += m.vy
                m.opacity -= m.decay

                if (m.opacity <= 0) {
                    meteors.splice(i, 1)
                    continue
                }

                const grad = ctx.createLinearGradient(
                    m.x, m.y,
                    m.x - m.vx * (m.length / 10), m.y - m.vy * (m.length / 10)
                )
                grad.addColorStop(0, `rgba(255, 255, 255, ${m.opacity})`)
                grad.addColorStop(0.3, `rgba(96, 165, 250, ${m.opacity * 0.6})`)
                grad.addColorStop(1, 'rgba(0, 0, 0, 0)')

                ctx.beginPath()
                ctx.moveTo(m.x, m.y)
                ctx.lineTo(m.x - m.vx * (m.length / 10), m.y - m.vy * (m.length / 10))
                ctx.strokeStyle = grad
                ctx.lineWidth = 1.8
                ctx.stroke()
            }

            ctx.globalAlpha = 1
            animationFrameId = requestAnimationFrame(render)
        }

        window.addEventListener('resize', resizeCanvas)
        const parent = canvas.parentElement
        if (parent && moveParticlesOnHover) {
            parent.addEventListener('mousemove', handleMouseMove)
            parent.addEventListener('mouseleave', handleMouseLeave)
        }

        resizeCanvas()
        render()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            if (parent && moveParticlesOnHover) {
                parent.removeEventListener('mousemove', handleMouseMove)
                parent.removeEventListener('mouseleave', handleMouseLeave)
            }
            cancelAnimationFrame(animationFrameId)
        }
    }, [speed, moveParticlesOnHover, enableMeteors, enableConstellations])

    return (
        <canvas
            ref={canvasRef}
            className={`pointer-events-none absolute inset-0 z-0 ${className}`}
        />
    )
}

export default Particles
