import React from 'react'
import { Disc, Activity } from 'lucide-react'

const TelemetryHeader = ({
    tag = 'ENDURANCE TELEMETRY',
    title = 'SYSTEM MATRIX',
    subtitle = '',
    className = ''
}) => {
    return (
        <div className={`text-center mb-12 sm:mb-16 relative ${className}`}>
            {/* Top Orbit Reticle Telemetry Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/60 border border-amber-500/30 backdrop-blur-xl shadow-[0_0_20px_rgba(245,158,11,0.15)] mb-6">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-xs font-mono tracking-widest text-amber-300 uppercase font-semibold">
                    [ {tag} ]
                </span>
                <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            </div>

            {/* Title with Gargantua Glow */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-4 tracking-tight">
                {title}
            </h2>

            {subtitle && (
                <p className="text-gray-400 text-sm sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
                    {subtitle}
                </p>
            )}
        </div>
    )
}

export default TelemetryHeader
