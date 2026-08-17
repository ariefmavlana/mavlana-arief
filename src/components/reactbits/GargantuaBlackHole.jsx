import React, { useEffect, useRef } from 'react'

const GargantuaBlackHole = ({ className = '', size = 500 }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animationFrameId
        let angle = 0

        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1
            const rect = canvas.getBoundingClientRect()
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            ctx.scale(dpr, dpr)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        // Particle disk for accretion ring
        const numParticles = 250
        const particles = []
        for (let i = 0; i < numParticles; i++) {
            const radius = 90 + Math.random() * 110
            const theta = Math.random() * Math.PI * 2
            const speed = (0.005 + Math.random() * 0.015) * (180 / radius)
            const size = 1 + Math.random() * 2.5
            const color = Math.random() > 0.3 ? '#f59e0b' : Math.random() > 0.5 ? '#fbbf24' : '#38bdf8'
            particles.push({ radius, theta, speed, size, color, alpha: 0.3 + Math.random() * 0.7 })
        }

        const render = () => {
            const rect = canvas.getBoundingClientRect()
            const width = rect.width
            const height = rect.height
            const cx = width / 2
            const cy = height / 2
            const eventHorizonRadius = 60

            ctx.clearRect(0, 0, width, height)

            angle += 0.008

            // 1. Outer Gravitational Lensing Glow (Accretion Light Warp)
            const outerGlow = ctx.createRadialGradient(cx, cy, eventHorizonRadius, cx, cy, eventHorizonRadius * 3.5)
            outerGlow.addColorStop(0, 'rgba(245, 158, 11, 0.45)')
            outerGlow.addColorStop(0.3, 'rgba(251, 191, 36, 0.25)')
            outerGlow.addColorStop(0.6, 'rgba(56, 189, 248, 0.12)')
            outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')

            ctx.fillStyle = outerGlow
            ctx.beginPath()
            ctx.arc(cx, cy, eventHorizonRadius * 3.5, 0, Math.PI * 2)
            ctx.fill()

            // 2. Gravitational Warped Accretion Disk (Top Arc Lensing Effect)
            ctx.save()
            ctx.translate(cx, cy)
            ctx.scale(1, 0.35) // Flatten disk perspective

            // Draw Gravitational Lensing Upper Arc (Bent Light over Black Hole)
            ctx.restore()

            ctx.save()
            ctx.translate(cx, cy)

            // Gravitational Lensed Halo Ring (Interstellar Vertical Distortion)
            ctx.beginPath()
            ctx.ellipse(0, 0, eventHorizonRadius * 1.95, eventHorizonRadius * 2.3, 0, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)'
            ctx.lineWidth = 14
            ctx.shadowColor = '#f59e0b'
            ctx.shadowBlur = 25
            ctx.stroke()

            // Inner Photon Ring
            ctx.beginPath()
            ctx.arc(0, 0, eventHorizonRadius + 4, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(255, 230, 150, 0.9)'
            ctx.lineWidth = 3
            ctx.shadowColor = '#fbbf24'
            ctx.shadowBlur = 15
            ctx.stroke()

            // Accretion Disk Ellipse (Horizontal Disk)
            ctx.save()
            ctx.scale(1, 0.28) // Tilt angle
            ctx.rotate(angle * 0.2)

            const diskGrad = ctx.createRadialGradient(0, 0, eventHorizonRadius * 1.1, 0, 0, eventHorizonRadius * 3.2)
            diskGrad.addColorStop(0, 'rgba(255, 240, 180, 0.95)')
            diskGrad.addColorStop(0.25, 'rgba(245, 158, 11, 0.75)')
            diskGrad.addColorStop(0.65, 'rgba(217, 119, 6, 0.4)')
            diskGrad.addColorStop(1, 'rgba(56, 189, 248, 0)')

            ctx.beginPath()
            ctx.arc(0, 0, eventHorizonRadius * 3.2, 0, Math.PI * 2)
            ctx.fillStyle = diskGrad
            ctx.fill()

            // Render Orbiting Particles in Disk
            particles.forEach((p) => {
                p.theta += p.speed
                const px = Math.cos(p.theta) * p.radius
                const py = Math.sin(p.theta) * p.radius

                ctx.beginPath()
                ctx.arc(px, py, p.size, 0, Math.PI * 2)
                ctx.fillStyle = p.color
                ctx.globalAlpha = p.alpha
                ctx.fill()
            })
            ctx.globalAlpha = 1.0

            ctx.restore() // Restore disk perspective scale

            // 3. Central Event Horizon (Pure Black Hole Shadow)
            ctx.beginPath()
            ctx.arc(0, 0, eventHorizonRadius, 0, Math.PI * 2)
            ctx.fillStyle = '#000000'
            ctx.shadowColor = '#000000'
            ctx.shadowBlur = 10
            ctx.fill()

            // Event Horizon Sharp Boundary Edge Ring
            ctx.beginPath()
            ctx.arc(0, 0, eventHorizonRadius + 1, 0, Math.PI * 2)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
            ctx.lineWidth = 1
            ctx.stroke()

            ctx.restore() // Restore center translation

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <canvas
                ref={canvasRef}
                className="w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] md:w-[550px] md:h-[550px] pointer-events-none drop-shadow-[0_0_50px_rgba(245,158,11,0.4)]"
            />
        </div>
    )
}

export default GargantuaBlackHole
