import React from 'react'

const ShinyText = ({ text, disabled = false, speed = 4, className = '' }) => {
    return (
        <span
            className={`inline-block bg-clip-text text-transparent bg-[linear-gradient(110deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,1)_50%,rgba(255,255,255,0.4)_100%)] bg-[length:200%_100%] ${disabled ? '' : 'animate-shiny'} ${className}`}
            style={{ animationDuration: `${speed}s` }}
        >
            {text}
        </span>
    )
}

export default ShinyText
