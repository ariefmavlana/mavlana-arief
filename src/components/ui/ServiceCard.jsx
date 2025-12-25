import React from 'react'
import * as LucideIcons from 'lucide-react'

const ServiceCard = ({ service }) => {
    const IconComponent = LucideIcons[service.icon] || LucideIcons.Code

    return (
        <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

            <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                    {service.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                    {service.description}
                </p>
            </div>
        </div>
    )
}

export default ServiceCard
