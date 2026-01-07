import React, { useState } from 'react'
import { projects, category } from '../../data/projects'
import ProjectCard from '../ui/ProjectCard'
import FadeIn from '../animations/FadeIn'
import Starfield from '../backgrounds/Starfield'

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState('All')

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(project => project.category === activeCategory)

    return (
        <section id="projects" className="relative py-12 md:py-32 overflow-hidden bg-black font-sans">
            {/* Space Background */}
            <div className="absolute inset-0 bg-black z-0" />
            <div className="absolute inset-0 z-0">
                <Starfield density={170} speed={0.22} />
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-blue-900/10 to-transparent pointer-events-none" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-10 md:mb-16">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
                                My <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Projects</span>
                            </h2>
                            <p className="text-gray-400 text-lg md:text-xl mb-8 font-light max-w-2xl mx-auto">
                                A curated selection of my recent work and experiments.
                            </p>

                            {/* Category Filter - Modern Pills */}
                            <div className="flex flex-wrap justify-center gap-3">
                                {category.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5 hover:border-white/10'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                        {filteredProjects.map((project, index) => (
                            <FadeIn key={project.id} delay={index * 100}>
                                <ProjectCard project={project} />
                            </FadeIn>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-lg">
                                No projects found in this category.
                            </p>
                        </div>
                    )}

                    <FadeIn delay={200}>
                        <div className="mt-20 text-center">
                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full bg-green-400 opacity-75 rounded-full"></span>
                                    <span className="relative inline-flex h-3 w-3 bg-green-500 rounded-full"></span>
                                </span>
                                <span className="text-gray-300 text-sm font-medium">More projects coming soon!</span>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    )
}

export default Projects
