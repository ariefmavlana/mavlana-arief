import React from 'react'
import { motion } from 'framer-motion'
import { skills } from '../../data/skills'
import SkillCard from '../ui/SkillCard'
import FadeIn from '../animations/FadeIn'
import Starfield from '../backgrounds/Starfield'

const Skills = () => {
    return (
        <section id="skills" className="relative py-20 md:py-32 overflow-hidden">
            {/* Space Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
            <Starfield density={200} speed={0.25} />

            {/* Animated cosmic orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1,
                }}
            />

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
                                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Skills</span>
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
                            className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 via-cyan-500/5 to-transparent border border-purple-500/30 backdrop-blur-sm text-center"
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
