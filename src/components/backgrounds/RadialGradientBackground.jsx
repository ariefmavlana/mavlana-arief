import React from 'react'

const RadialGradientBackground = ({ variant = 'default' }) => {
    const variants = {
        hero: 'top-0 left-1/2 -translate-x-1/2',
        section: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        default: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
    }

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute ${variants[variant]} w-[800px] h-[800px] opacity-20`}>
                <div className="absolute inset-0 bg-gradient-radial from-primary/30 via-primary/10 to-transparent blur-3xl animate-pulse" />
            </div>
        </div>
    )
}

export default RadialGradientBackground