import React from 'react'
import * as LucideIcons from 'lucide-react'
import SpotlightCard from '../reactbits/SpotlightCard'

const ServiceCard = ({ service, index }) => {
    const IconComponent = service.icon || LucideIcons.Code2
    const formattedIndex = String(index + 1).padStart(2, '0')

    return (
        <SpotlightCard
            spotlightColor="rgba(168, 85, 247, 0.15)"
            borderColor="rgba(168, 85, 247, 0.3)"
            className="h-full group"
        >
            <div className="p-8 flex flex-col h-full">
                {/* Header: Icon + Step Counter */}
                <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 group-hover:bg-purple-600/20 group-hover:border-purple-500/40 transition-all duration-300 shadow-md">
                        <IconComponent className="w-7 h-7 text-purple-400 group-hover:text-purple-200 transition-colors" />
                    </div>
                    <span className="text-xs font-mono text-gray-400 group-hover:text-purple-300 transition-colors border border-white/10 px-2.5 py-1 rounded-full bg-black/40">
                        {formattedIndex}
                    </span>
                </div>

                <h3 className="text-xl font-bold font-display text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-purple-300 group-hover:to-blue-300 transition-colors">
                    {service.title}
                </h3>

                <p className="text-gray-300 leading-relaxed font-sans text-sm md:text-base mb-6 grow font-light group-hover:text-gray-200 transition-colors">
                    {service.description}
                </p>

                {/* Decorative Bottom Bar */}
                <div className="h-0.5 w-10 bg-white/10 rounded-full group-hover:w-full group-hover:bg-linear-to-r group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-500" />
            </div>
        </SpotlightCard>
    )
}

export default ServiceCard
