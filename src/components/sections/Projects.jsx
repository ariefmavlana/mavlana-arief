import React, { useState } from 'react'
import { projects, category } from '../../data/projects'
import ProjectCard from '../ui/ProjectCard'
import FadeIn from '../animations/FadeIn'
import Particles from '../reactbits/Particles'
import TiltedCard from '../reactbits/TiltedCard'
import { Rocket, Orbit } from 'lucide-react'

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState('All')

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(project => project.category === activeCategory)

    return (
        <section id="projects" className="relative py-20 md:py-32 overflow-hidden bg-black font-sans">
            {/* Ambient Background Particles */}
            <div className="absolute inset-0 bg-black z-0" />
            <Particles
                speed={0.2}
                particleColors={['#60a5fa', '#a855f7', '#38bdf8', '#ffffff']}
                moveParticlesOnHover={true}
                enableMeteors={true}
                enableConstellations={true}
                className="z-1 opacity-60"
            />
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-12 sm:mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                                <Rocket className="w-4 h-4 text-blue-400" />
                                <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-display font-medium">Stellar Fleet</span>
                            </div>
                            <h2 className="text-2xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-4 sm:mb-6">
                                Shipped <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">Projects</span>
                            </h2>
                            <p className="text-gray-300 text-sm sm:text-lg md:text-xl mb-6 sm:mb-8 font-light max-w-2xl mx-auto leading-relaxed">
                                Production web applications, distributed APIs, and AI engineering platforms.
                            </p>

                            {/* Responsive Category Filter Pills */}
                            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-full px-2">
                                {category.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${activeCategory === cat
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

                    {/* Projects Grid with React Bits TiltedCard wrapper */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                        {filteredProjects.map((project, index) => (
                            <FadeIn key={project.id} delay={index * 100}>
                                <TiltedCard maxTilt={6} scale={1.01} className="h-full">
                                    <ProjectCard project={project} />
                                </TiltedCard>
                            </FadeIn>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-lg">
                                No projects listed under this category.
                            </p>
                        </div>
                    )}

                    <FadeIn delay={200}>
                        <div className="mt-16 sm:mt-20 text-center">
                            <div className="inline-flex items-center gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                                <Orbit className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
                                <span className="text-gray-300 text-xs sm:text-sm font-light">
                                    More client & open-source projects launching regularly
                                </span>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    )
}

export default Projects
