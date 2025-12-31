import React from 'react'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'

const SkillCard = ({ skill, index }) => {
    const IconComponent = LucideIcons[skill.icon] || LucideIcons.Code2

    return (
        <motion.div
            className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 backdrop-blur-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(141, 255, 105, 0.05)',
                borderColor: 'rgba(141, 255, 105, 0.5)'
            }}
        >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-green-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon container with animation */}
                <motion.div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/10 transition-all"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                >
                    <IconComponent className="w-8 h-8 text-primary" />
                </motion.div>

                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {skill.name}
                </h3>

                <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
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
