import React from 'react'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'

const ServiceCard = ({ service, index }) => {
    // Safety fallback
    const IconComponent = service.icon || LucideIcons.Code2

    return (
        <motion.div
            className="group relative p-8 rounded-3xl bg-white/5 border border-purple-500/20 hover:border-cyan-400/50 backdrop-blur-sm overflow-hidden h-full flex flex-col"
            whileHover={{
                scale: 1.02,
                backgroundColor: 'rgba(168, 85, 247, 0.05)',
            }}
        >
            {/* Animated cosmic gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Cosmic glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex flex-col h-full">
                {/* Icon container with animation */}
                <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-6 border border-purple-400/30 group-hover:border-cyan-400/50 transition-all"
                    whileHover={{
                        rotate: [0, -10, 10, -10, 0],
                        scale: 1.1
                    }}
                >
                    <IconComponent className="w-8 h-8 text-purple-400 group-hover:text-cyan-400 transition-colors" />
                </motion.div>

                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all">
                    {service.title}
                </h3>

                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors mb-6 flex-grow">
                    {service.description}
                </p>

                {/* Optional decorative line */}
                <div className="h-px w-12 bg-purple-500/30 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-purple-500/50 group-hover:to-cyan-500/50 transition-all duration-300" />
            </div>
        </motion.div>
    )
}

export default ServiceCard
