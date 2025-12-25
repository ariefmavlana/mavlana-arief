import React from 'react'
import * as LucideIcons from 'lucide-react'

const SkillCard = ({ skill }) => {
    const IconComponent = LucideIcons[skill.icon] || LucideIcons.Code2

    return (
        <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
                    <IconComponent className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                    {skill.name}
                </h3>

                <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {skill.level}
                    </span>
                </div>

                <p className="text-sm text-gray-400">
                    {skill.experience}
                </p>
            </div>
        </div>
    )
}

export default SkillCard
