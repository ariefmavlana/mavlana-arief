import React from 'react'

const CosmicOrbitGrid = ({ className = '' }) => {
    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
            {/* Center Orbital Compass Structure */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] lg:w-[1000px] lg:h-[1000px]">
                {/* Outer Celestial Ring with Degree Ticks */}
                <div className="absolute inset-0 rounded-full border border-blue-500/15 animate-[spin_120s_linear_infinite]">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 bg-black font-mono text-[10px] text-blue-400/60 tracking-widest uppercase">
                        N // 000°
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 bg-black font-mono text-[10px] text-blue-400/60 tracking-widest uppercase">
                        S // 180°
                    </div>
                    <div className="absolute top-1/2 -left-4 -translate-y-1/2 px-2 bg-black font-mono text-[10px] text-blue-400/60 tracking-widest uppercase">
                        W // 270°
                    </div>
                    <div className="absolute top-1/2 -right-4 -translate-y-1/2 px-2 bg-black font-mono text-[10px] text-blue-400/60 tracking-widest uppercase">
                        E // 090°
                    </div>
                </div>

                {/* Counter-rotating Inner Trajectory Ring */}
                <div className="absolute inset-16 sm:inset-24 rounded-full border border-dashed border-purple-500/20 animate-[spin_90s_linear_infinite_reverse]">
                    <div className="absolute top-0 left-1/2 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_12px_#38bdf8] -translate-x-1/2 -translate-y-1/2 animate-ping opacity-75" />
                    <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#c084fc] -translate-x-1/2 translate-y-1/2" />
                </div>

                {/* Inner Core Radar Grid Ring */}
                <div className="absolute inset-36 sm:inset-48 rounded-full border border-cyan-500/20 animate-[spin_60s_linear_infinite]">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-purple-500/20 to-transparent" />
                </div>

                {/* Glowing Core Beacon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-blue-600/5 blur-2xl animate-pulse" />
            </div>

            {/* Subdued Celestial Coordinates Text Overlay */}
            <div className="absolute top-8 left-8 font-mono text-[11px] text-blue-400/40 hidden md:block select-none leading-relaxed">
                <div>[SYS_STATUS]: ORBITAL_ONLINE</div>
                <div>[COORDINATES]: 06°55'S 107°36'E</div>
                <div>[SIGNAL]: STABLE_COMM</div>
            </div>

            <div className="absolute top-8 right-8 font-mono text-[11px] text-purple-400/40 hidden md:block select-none text-right leading-relaxed">
                <div>[SPECTRUM]: DEEP_SPACE_UV</div>
                <div>[GRAVITY]: ZERO_G_ACTIVE</div>
                <div>[BEACON]: MAVLANA_NODE_01</div>
            </div>
        </div>
    )
}

export default CosmicOrbitGrid
