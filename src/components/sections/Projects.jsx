import React, { useState } from 'react'
import { projects, category } from '../../data/projects'
import ProjectCard from '../ui/ProjectCard'
import FadeIn from '../animations/FadeIn'

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState('All')

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(project => project.category === activeCategory)

    return (
        <section id="projects" className="relative py-20 md:py-32 bg-white/[0.02]">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                My <span className="text-primary">Projects</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-8">
                                A showcase of my recent work and accomplishments
                            </p>

                            {/* Category Filter */}
                            <div className="flex flex-wrap justify-center gap-4">
                                {category.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === cat
                                                ? 'bg-primary text-black'
                                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
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
                </div>
            </div>
        </section>
    )
}

export default Projects
