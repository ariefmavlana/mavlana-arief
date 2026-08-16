import React from 'react'
import * as LucideIcons from 'lucide-react'
import SpotlightCard from '../reactbits/SpotlightCard'

const SkillCard = ({ skill }) => {
    const IconComponent = skill.icon || LucideIcons.Code2

    return (
        <SpotlightCard
            spotlightColor="rgba(96, 165, 250, 0.15)"
            borderColor="rgba(96, 165, 250, 0.3)"
            className="group"
        >
            <div className="p-6 flex flex-col items-center text-center">
                {/* Icon container */}
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 transition-all duration-300">
                    <IconComponent className="w-7 h-7 text-gray-300 group-hover:text-blue-300 transition-colors" />
                </div>

                <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-blue-200 transition-colors">
                    {skill.name}
                </h3>

                <div className="mb-3">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 group-hover:text-white group-hover:border-blue-400/30 transition-all">
                        {skill.level}
                    </span>
                </div>

                <p className="text-xs text-gray-400 font-light group-hover:text-gray-300 transition-colors">
                    {skill.experience}
                </p>
            </div>
        </SpotlightCard>
    )
}

export default SkillCard
