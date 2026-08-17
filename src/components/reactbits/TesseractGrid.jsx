import React, { useEffect, useRef } from 'react'

const TesseractGrid = ({ className = '' }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animationFrameId
        let offset = 0

        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1
            const rect = canvas.getBoundingClientRect()
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            ctx.scale(dpr, dpr)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        const render = () => {
            const rect = canvas.getBoundingClientRect()
            const w = rect.width
            const h = rect.height
            const cx = w / 2
            const cy = h / 2

            ctx.clearRect(0, 0, w, h)
            offset += 0.45

            // Perspective Grid Lines (5D Tesseract Lattice Lines)
            const numLines = 24
            const horizon = cy

            ctx.lineWidth = 1
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.12)'

            // Vanishing Perspective Rays from center
            for (let i = 0; i < numLines; i++) {
                const angle = (i * Math.PI * 2) / numLines
                const x2 = cx + Math.cos(angle) * w
                const y2 = cy + Math.sin(angle) * h

                ctx.beginPath()
                ctx.moveTo(cx, cy)
                ctx.lineTo(x2, y2)
                ctx.stroke()
            }

            // Expanding Concentric 5D Temporal Hypercube Rung Squares
            const numRungs = 8
            for (let i = 0; i < numRungs; i++) {
                const size = ((i * 60 + offset) % (numRungs * 60))
                const alpha = Math.min(size / (numRungs * 60), 0.35)

                ctx.strokeStyle = `rgba(245, 158, 11, ${alpha * 0.5})`
                ctx.lineWidth = 1.5
                ctx.strokeRect(cx - size, cy - size, size * 2, size * 2)

                // Glowing Node Points at corners
                ctx.fillStyle = `rgba(251, 191, 36, ${alpha})`
                ctx.fillRect(cx - size - 2, cy - size - 2, 4, 4)
                ctx.fillRect(cx + size - 2, cy - size - 2, 4, 4)
                ctx.fillRect(cx - size - 2, cy + size - 2, 4, 4)
                ctx.fillRect(cx + size - 2, cy + size - 2, 4, 4)
            }

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            cancelAnimationFrame(animationFrameId)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className={`absolute inset-0 pointer-events-none opacity-40 ${className}`}>
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    )
}

export default TesseractGrid
