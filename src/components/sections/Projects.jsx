import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { projects, category } from '../../data/projects'
import ProjectCard from '../ui/ProjectCard'
import FadeIn from '../animations/FadeIn'

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState('All')

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(project => project.category === activeCategory)

    return (
        <section id="projects" className="relative py-20 md:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black" />

            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
                <motion.div
                    className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </div>

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
                                My <span className="text-primary">Projects</span>
                            </motion.h2>
                            <p className="text-gray-400 text-lg mb-8">
                                A showcase of my recent work and accomplishments
                            </p>

                            {/* Category Filter */}
                            <div className="flex flex-wrap justify-center gap-4">
                                {category.map((cat) => (
                                    <motion.button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCategory === cat
                                                ? 'bg-primary text-black shadow-lg shadow-primary/50'
                                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10 hover:border-primary/30'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {cat}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Projects Grid */}
                    <motion.div
                        className="grid md:grid-cols-2 gap-8"
                        layout
                    >
                        {filteredProjects.map((project, index) => (
                            <FadeIn key={project.id} delay={index * 100}>
                                <ProjectCard project={project} />
                            </FadeIn>
                        ))}
                    </motion.div>

                    {filteredProjects.length === 0 && (
                        <motion.div
                            className="text-center py-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <p className="text-gray-400 text-lg">
                                No projects found in this category.
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Projects
