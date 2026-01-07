import React from 'react'
import { skills } from '../../data/skills'
import SkillCard from '../ui/SkillCard'
import FadeIn from '../animations/FadeIn'
import Starfield from '../backgrounds/Starfield'

const Skills = () => {
    return (
        <section id="skills" className="relative py-20 md:py-32 overflow-hidden bg-black font-sans">
            {/* Space Background */}
            <div className="absolute inset-0 bg-black z-0" />
            <div className="absolute inset-0 z-0 opacity-40">
                <Starfield density={200} speed={0.25} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
                                My <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Skills</span>
                            </h2>
                            <p className="text-gray-400 text-lg md:text-xl font-light">
                                Technologies and tools I work with
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {skills.map((skill, index) => (
                            <FadeIn key={skill.id} delay={index * 50}>
                                <SkillCard skill={skill} index={index} />
                            </FadeIn>
                        ))}
                    </div>

                    {/* Additional info */}
                    <FadeIn delay={500}>
                        <div className="mt-20 text-center">
                            <p className="text-blue-300/80 text-lg font-light animate-pulse inline-flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                Always learning and exploring new technologies...
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    )
}

export default Skills
