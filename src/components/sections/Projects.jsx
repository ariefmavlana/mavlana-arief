import React, { useState } from 'react'
import { projects, category } from '../../data/projects'
import ProjectCard from '../ui/ProjectCard'
import FadeIn from '../animations/FadeIn'
import Particles from '../reactbits/Particles'
import TiltedCard from '../reactbits/TiltedCard'
import Magnet from '../reactbits/Magnet'
import ClickSpark from '../reactbits/ClickSpark'
import TelemetryHeader from '../ui/TelemetryHeader'
import { Orbit } from 'lucide-react'

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
                particleColors={['#f59e0b', '#fbbf24', '#38bdf8', '#ffffff']}
                moveParticlesOnHover={true}
                enableMeteors={true}
                enableConstellations={true}
                className="z-1 opacity-60"
            />
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-12 sm:mb-16">
                            <TelemetryHeader
                                tag="MISSION LOGS"
                                title="SHIPPED MISSIONS"
                                subtitle="Production web applications, distributed APIs, and AI engineering platforms."
                            />

                            {/* Responsive Category Filter Pills with Magnet & ClickSpark */}
                            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-full px-2">
                                {category.map((cat) => (
                                    <Magnet key={cat} magnetStrength={4} padding={20}>
                                        <ClickSpark sparkColor="#f59e0b" sparkCount={8}>
                                            <button
                                                onClick={() => setActiveCategory(cat)}
                                                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${activeCategory === cat
                                                    ? 'bg-linear-to-r from-amber-500 to-cyan-500 text-black font-bold shadow-[0_0_20px_rgba(245,158,11,0.4)] border border-amber-400'
                                                    : 'bg-black/60 text-gray-400 hover:bg-amber-500/10 hover:text-white border border-amber-500/20'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        </ClickSpark>
                                    </Magnet>
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

