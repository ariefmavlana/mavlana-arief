import React, { useState } from 'react'
import { skills } from '../../data/skills'
import FadeIn from '../animations/FadeIn'
import Particles from '../reactbits/Particles'
import SpotlightCard from '../reactbits/SpotlightCard'
import SplitText from '../reactbits/SplitText'
import { Cpu } from 'lucide-react'

const Skills = () => {
    const [selectedCategory, setSelectedCategory] = useState('All')

    const categories = ['All', 'Frontend', 'Backend', 'AI & Data', 'Cloud & Tools']

    const getSkillCategory = (name) => {
        const lower = name.toLowerCase()
        if (['react.js', 'next.js', 'typescript', 'tailwind css', 'three.js', 'gsap'].includes(lower)) return 'Frontend'
        if (['node.js', 'laravel', 'postgresql', 'mongodb', 'express.js', 'rest api'].includes(lower)) return 'Backend'
        if (['python', 'r', 'tableau'].includes(lower)) return 'AI & Data'
        return 'Cloud & Tools'
    }

    const filteredSkills = selectedCategory === 'All'
        ? skills
        : skills.filter(s => getSkillCategory(s.name) === selectedCategory)

    return (
        <section id="skills" className="relative py-20 md:py-32 overflow-hidden bg-black font-sans">
            {/* Ambient Background Particles */}
            <div className="absolute inset-0 bg-black z-0" />
            <Particles
                speed={0.18}
                particleColors={['#38bdf8', '#818cf8', '#c084fc']}
                moveParticlesOnHover={true}
                enableConstellations={true}
                className="z-1 opacity-60"
            />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-12 sm:mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                                <Cpu className="w-4 h-4 text-cyan-400" />
                                <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-display font-medium">Orbital Matrix</span>
                            </div>

                            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-4 sm:mb-6">
                                <SplitText text="TECHNICAL CAPABILITIES" delay={30} className="text-white" />
                            </h2>

                            <p className="text-gray-300 text-sm sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                                Production frameworks, backend microservices, data analytics pipelines, and cloud platforms.
                            </p>

                            {/* Responsive Category Filter Pills */}
                            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 max-w-full px-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${selectedCategory === cat
                                            ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] border border-blue-400/40'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
                        {filteredSkills.map((skill, index) => {
                            const IconComponent = skill.icon
                            return (
                                <FadeIn key={skill.id} delay={index * 40}>
                                    <SpotlightCard
                                        spotlightColor="rgba(56, 189, 248, 0.2)"
                                        borderColor="rgba(255, 255, 255, 0.12)"
                                        className="h-full group hover:-translate-y-1 transition-transform duration-300"
                                    >
                                        <div className="p-4 sm:p-6 flex flex-col justify-between h-full">
                                            <div>
                                                <div className="flex items-center justify-between mb-3 sm:mb-4">
                                                    <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 group-hover:border-cyan-400/40 group-hover:bg-cyan-500/10 transition-all">
                                                        <IconComponent className="w-5 h-5 sm:w-7 sm:h-7 text-gray-300 group-hover:text-cyan-300 transition-colors" />
                                                    </div>
                                                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-cyan-400/80 px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20">
                                                        {skill.experience}
                                                    </span>
                                                </div>

                                                <h3 className="text-sm sm:text-lg font-bold font-display text-white mb-1 group-hover:text-cyan-300 transition-colors">
                                                    {skill.name}
                                                </h3>
                                                <p className="text-[10px] sm:text-xs text-gray-400 font-mono font-light">
                                                    Level: <span className="text-gray-200">{skill.level}</span>
                                                </p>
                                            </div>

                                            {/* Cosmic Radar Skill Level Bar */}
                                            <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/5">
                                                <div className="w-full h-1 sm:h-1.5 rounded-full bg-white/10 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full bg-linear-to-r from-blue-500 via-cyan-400 to-purple-500 group-hover:brightness-125 transition-all duration-500"
                                                        style={{ width: skill.level === 'Expert' ? '92%' : '80%' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </FadeIn>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills
