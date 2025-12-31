import React from 'react'
import { motion } from 'framer-motion'
import { skills } from '../../data/skills'
import SkillCard from '../ui/SkillCard'
import FadeIn from '../animations/FadeIn'

const Skills = () => {
    return (
        <section id="skills" className="relative py-20 md:py-32 overflow-hidden">
            {/* Background with grid */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: 'url(/grid.png)',
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Animated gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-16">
                            <motion.h2
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                My <span className="text-primary">Skills</span>
                            </motion.h2>
                            <p className="text-gray-400 text-lg">
                                Technologies and tools I work with
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {skills.map((skill, index) => (
                            <SkillCard key={skill.id} skill={skill} index={index} />
                        ))}
                    </div>

                    {/* Additional info */}
                    <FadeIn delay={500}>
                        <motion.div
                            className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-transparent border border-primary/20 backdrop-blur-sm text-center"
                            whileHover={{ scale: 1.02 }}
                        >
                            <p className="text-gray-300 text-lg">
                                Always learning and exploring new technologies to stay at the forefront of innovation
                            </p>
                        </motion.div>
                    </FadeIn>
                </div>
            </div>
        </section>
    )
}

export default Skills
