import React from 'react'
import * as LucideIcons from 'lucide-react'

const ServiceCard = ({ service }) => {
    // Safety fallback
    const IconComponent = service.icon || LucideIcons.Code2

    return (
        <div className="group relative p-8 rounded-3xl glass-card hover:bg-white/10 transition-all duration-500 h-full flex flex-col">
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <div className="relative z-10 flex flex-col h-full">
                {/* Icon container */}
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600/20 group-hover:border-purple-500/30 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-gray-400 group-hover:text-purple-300 transition-colors" />
                </div>

                <h3 className="text-xl font-bold font-display text-white mb-4 group-hover:text-purple-200 transition-colors">
                    {service.title}
                </h3>

                <p className="text-gray-400 leading-relaxed font-sans text-base mb-6 grow font-light group-hover:text-gray-300 transition-colors">
                    {service.description}
                </p>

                {/* Decorative line */}
                <div className="h-1 w-12 bg-white/10 rounded-full group-hover:w-full group-hover:bg-linear-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-500" />
            </div>
        </div>
    )
}

export default ServiceCard
