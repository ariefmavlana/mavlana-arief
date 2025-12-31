import React from 'react'

// Optimized: Uses CSS animations defined in index.css instead of Framer Motion JS loop
const CosmicClouds = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none transform translate-z-0"> {/* Hardware acceleration hack */}
            {/* Nebula Cloud 1 - Purple/Blue */}
            <div
                className="absolute w-[600px] h-[600px] rounded-full opacity-20 animate-blob mix-blend-screen"
                style={{
                    background: 'radial-gradient(circle, rgba(138, 43, 226, 0.4) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    top: '-10%',
                    left: '-10%',
                }}
            />

            {/* Nebula Cloud 2 - Cyan/Green */}
            <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-20 animate-blob animation-delay-2000 mix-blend-screen"
                style={{
                    background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                    right: '-10%',
                    top: '20%',
                }}
            />

            {/* Nebula Cloud 3 - Pink/Purple */}
            <div
                className="absolute w-[550px] h-[550px] rounded-full opacity-15 animate-blob animation-delay-4000 mix-blend-screen"
                style={{
                    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    left: '20%',
                    bottom: '-10%',
                }}
            />
        </div>
    )
}

export default CosmicClouds
