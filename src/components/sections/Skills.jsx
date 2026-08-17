import React, { useState } from 'react'
import { skills } from '../../data/skills'
import FadeIn from '../animations/FadeIn'
import Particles from '../reactbits/Particles'
import SpotlightCard from '../reactbits/SpotlightCard'
import SplitText from '../reactbits/SplitText'
import BlurText from '../reactbits/BlurText'
import DecryptedText from '../reactbits/DecryptedText'
import Magnet from '../reactbits/Magnet'
import ScrollVelocity from '../reactbits/ScrollVelocity'
import TelemetryHeader from '../ui/TelemetryHeader'

const Skills = () => {
    const [selectedCategory, setSelectedCategory] = useState('All')

    const categories = ['All', 'Frontend', 'Backend', 'AI & Data', 'Cloud & Tools']

    const iconMarqueeItems = [
        skills.map((skill) => {
            const Icon = skill.icon
            return (
                <div
                    key={skill.id}
                    className="inline-flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-black/60 border border-amber-500/20 backdrop-blur-md hover:bg-amber-500/10 hover:border-amber-400/60 transition-all duration-300 group shadow-lg"
                >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:text-cyan-300 group-hover:scale-110 transition-all" />
                    <span className="text-xs sm:text-sm font-mono font-medium text-gray-200 group-hover:text-white tracking-wide">
                        {skill.name}
                    </span>
                </div>
            )
        })
    ]

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
                particleColors={['#f59e0b', '#fbbf24', '#38bdf8', '#60a5fa']}
                moveParticlesOnHover={true}
                enableConstellations={true}
                className="z-1 opacity-60"
            />

            {/* ReactBits ScrollVelocity Infinite Icon & Badge Marquee */}
            <div className="mb-12 opacity-75 hover:opacity-100 transition-opacity duration-500">
                <ScrollVelocity
                    items={iconMarqueeItems}
                    velocity={3}
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-12 sm:mb-16">
                            <TelemetryHeader
                                tag="ORBITAL MATRIX"
                                title="TECHNICAL CAPABILITIES"
                                subtitle="Production frameworks, backend microservices, data analytics pipelines, and cloud platforms."
                            />

                            {/* Responsive Category Filter Pills with Magnet */}
                            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 max-w-full px-2">
                                {categories.map((cat) => (
                                    <Magnet key={cat} magnetStrength={4} padding={20}>
                                        <button
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${selectedCategory === cat
                                                ? 'bg-linear-to-r from-amber-500 to-cyan-500 text-black font-bold shadow-[0_0_20px_rgba(245,158,11,0.4)] border border-amber-400'
                                                : 'bg-black/60 text-gray-400 hover:bg-amber-500/10 hover:text-white border border-amber-500/20'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    </Magnet>
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
                                        spotlightColor="rgba(245, 158, 11, 0.25)"
                                        borderColor="rgba(245, 158, 11, 0.2)"
                                        className="h-full group hover:-translate-y-1 transition-transform duration-300 bg-black/60"
                                    >
                                        <div className="p-4 sm:p-6 flex flex-col justify-between h-full">
                                            <div>
                                                <div className="flex items-center justify-between mb-3 sm:mb-4">
                                                    <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-black/60 border border-amber-500/20 group-hover:border-amber-400/50 group-hover:bg-amber-500/10 transition-all">
                                                        <IconComponent className="w-5 h-5 sm:w-7 sm:h-7 text-gray-300 group-hover:text-amber-300 transition-colors" />
                                                    </div>
                                                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30">
                                                        <DecryptedText text={skill.experience} speed={30} animateOn="hover" />
                                                    </span>
                                                </div>

                                                <h3 className="text-sm sm:text-lg font-bold font-mono text-white mb-1 group-hover:text-amber-300 transition-colors">
                                                    {skill.name}
                                                </h3>
                                                <p className="text-[10px] sm:text-xs text-gray-400 font-mono font-light">
                                                    LEVEL: <span className="text-amber-400 font-semibold">{skill.level}</span>
                                                </p>
                                            </div>

                                            {/* Cosmic Radar Skill Level Bar */}
                                            <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-amber-500/10">
                                                <div className="w-full h-1 sm:h-1.5 rounded-full bg-black/80 overflow-hidden border border-amber-500/20">
                                                    <div
                                                        className="h-full rounded-full bg-linear-to-r from-amber-500 via-orange-400 to-cyan-400 group-hover:brightness-125 transition-all duration-500"
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

