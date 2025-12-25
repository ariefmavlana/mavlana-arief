import React from 'react'
import { skills } from '../../data/skills'
import SkillCard from '../ui/SkillCard'
import FadeIn from '../animations/FadeIn'

const Skills = () => {
    return (
        <section id="skills" className="relative py-20 md:py-32 bg-white/[0.02]">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                My <span className="text-primary">Skills</span>
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Technologies and tools I work with
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {skills.map((skill, index) => (
                            <FadeIn key={skill.id} delay={index * 50}>
                                <SkillCard skill={skill} />
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Skills
