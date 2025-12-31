import React from 'react'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'

const SkillCard = ({ skill, index }) => {
    // Safety fallback if icon is missing
    const IconComponent = skill.icon || LucideIcons.Code2

    return (
        <motion.div
            className="group relative p-6 rounded-2xl bg-white/5 border border-purple-500/20 hover:border-cyan-400/50 backdrop-blur-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(168, 85, 247, 0.05)',
            }}
        >
            {/* Animated cosmic gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Cosmic glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon container with animation */}
                <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-4 border border-purple-400/30 group-hover:border-cyan-400/50 transition-all"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                >
                    <IconComponent className="w-8 h-8 text-purple-400 group-hover:text-cyan-400 transition-colors" />
                </motion.div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all">
                    {skill.name}
                </h3>

                <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-medium border border-purple-400/30 group-hover:border-cyan-400/50 group-hover:text-cyan-300 transition-all">
                        {skill.level}
                    </span>
                </div>

                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {skill.experience}
                </p>
            </div>
        </motion.div>
    )
}

export default SkillCard
