import React from 'react'

const EnduranceStation = ({ className = '', size = 180 }) => {
    const modules = Array.from({ length: 12 })

    return (
        <div className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}>
            <div className="relative animate-spin" style={{ animationDuration: '32s', width: size, height: size }}>
                {/* Central Docking Hub */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black border-2 border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.6)] flex items-center justify-center z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                </div>

                {/* Central Radial Spoke Struts */}
                {Array.from({ length: 4 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="absolute top-1/2 left-1/2 w-full h-[1.5px] bg-amber-500/30 -translate-x-1/2 -translate-y-1/2"
                        style={{ transform: `translate(-50%, -50%) rotate(${idx * 45}deg)` }}
                    />
                ))}

                {/* Outer Ring Support Beam */}
                <div className="absolute inset-2 rounded-full border border-amber-500/25 border-dashed" />

                {/* 12 Outer Habitat & Cargo Pod Modules */}
                {modules.map((_, i) => {
                    const angle = (i * 360) / 12
                    return (
                        <div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-5 h-7 -mt-3.5 -ml-2.5 bg-black border border-amber-400/70 rounded-xs shadow-[0_0_10px_rgba(245,158,11,0.4)] flex flex-col justify-between p-0.5"
                            style={{
                                transform: `rotate(${angle}deg) translate(0, -${size / 2 - 14}px)`
                            }}
                        >
                            <div className="w-full h-1 bg-amber-400/80 rounded-xs" />
                            <div className="w-full h-1 bg-cyan-400/80 rounded-xs" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default EnduranceStation
