import React from 'react'
import * as LucideIcons from 'lucide-react'
import SpotlightCard from '../reactbits/SpotlightCard'
import DecryptedText from '../reactbits/DecryptedText'

const ServiceCard = ({ service, index }) => {
    const IconComponent = service.icon || LucideIcons.Code2
    const formattedIndex = String(index + 1).padStart(2, '0')

    return (
        <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.25)"
            borderColor="rgba(245, 158, 11, 0.25)"
            className="h-full group bg-black/60"
        >
            <div className="p-6 sm:p-8 flex flex-col h-full">
                {/* Header: Icon + Step Counter */}
                <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black/80 border border-amber-500/20 flex items-center justify-center group-hover:scale-105 group-hover:bg-amber-500/10 group-hover:border-amber-400/50 transition-all duration-300 shadow-md">
                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400 group-hover:text-cyan-300 transition-colors" />
                    </div>
                    <span className="text-xs font-mono text-amber-400 group-hover:text-cyan-300 transition-colors border border-amber-500/30 px-3 py-1 rounded-full bg-black/80 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                        MOD-{formattedIndex}
                    </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-mono text-white mb-3 group-hover:text-amber-300 transition-colors">
                    <DecryptedText text={service.title} speed={40} animateOn="hover" />
                </h3>

                <p className="text-gray-300 leading-relaxed font-sans text-sm md:text-base mb-6 grow font-light group-hover:text-gray-200 transition-colors">
                    {service.description}
                </p>

                {/* Decorative Bottom Telemetry Bar */}
                <div className="h-0.5 w-10 bg-amber-500/30 rounded-full group-hover:w-full group-hover:bg-linear-to-r group-hover:from-amber-400 group-hover:to-cyan-400 transition-all duration-500" />
            </div>
        </SpotlightCard>
    )
}

export default ServiceCard

