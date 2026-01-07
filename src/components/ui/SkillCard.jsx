import React from 'react'
import * as LucideIcons from 'lucide-react'

const SkillCard = ({ skill }) => {
    // Safety fallback if icon is missing
    const IconComponent = skill.icon || LucideIcons.Code2

    return (
        <div className="group relative p-6 rounded-3xl glass-card hover:bg-white/10 transition-all duration-500 text-center">
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-linear-to-b from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <div className="relative z-10 flex flex-col items-center">
                {/* Icon container */}
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300">
                    <IconComponent className="w-7 h-7 text-gray-400 group-hover:text-blue-300 transition-colors" />
                </div>

                <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-blue-200 transition-colors">
                    {skill.name}
                </h3>

                <div className="mb-3">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-gray-400 group-hover:text-white group-hover:border-white/20 transition-all">
                        {skill.level}
                    </span>
                </div>

                <p className="text-xs text-gray-500 tracking-wide font-light group-hover:text-gray-400 transition-colors">
                    {skill.experience}
                </p>
            </div>
        </div>
    )
}

export default SkillCard
