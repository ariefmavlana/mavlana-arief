import React from 'react'
import { ExternalLink, Github, TrendingUp } from 'lucide-react'
import SpotlightCard from '../reactbits/SpotlightCard'

const ProjectCard = ({ project }) => {
    return (
        <SpotlightCard
            spotlightColor="rgba(59, 130, 246, 0.15)"
            borderColor="rgba(59, 130, 246, 0.3)"
            className="flex flex-col h-full group"
        >
            {/* Image Container with Zoom & Gradient */}
            {project.image && (
                <div className="relative w-full h-56 md:h-64 overflow-hidden bg-gray-900">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                    
                    {/* Category Badge Over Image */}
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-blue-400 text-xs font-semibold uppercase tracking-wider border border-blue-500/30 font-display shadow-lg">
                            {project.category}
                        </span>
                    </div>

                    {/* Metric Highlight Badge Over Image */}
                    {project.metrics && (
                        <div className="absolute bottom-4 left-4 z-10">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-semibold border border-emerald-500/30 shadow-lg">
                                <TrendingUp className="w-3.5 h-3.5" />
                                {project.metrics}
                            </span>
                        </div>
                    )}
                </div>
            )}

            {/* Card Content Body */}
            <div className="p-6 md:p-8 flex flex-col grow relative z-10">
                {/* Header Title + Action Buttons */}
                <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl md:text-2xl font-bold font-display text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                        {project.title}
                    </h3>
                    <div className="flex gap-2 shrink-0 z-20">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-blue-600/30 transition-all border border-white/10 hover:border-blue-500/40"
                                title="View Repository"
                                aria-label="View on GitHub"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                        )}
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 hover:text-white hover:bg-blue-600 transition-all border border-blue-500/30"
                                title="Live Demo"
                                aria-label="View Live Demo"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed font-sans text-sm md:text-base grow font-light">
                    {project.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {project.technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-xs font-medium border border-white/10 group-hover:border-blue-400/30 group-hover:text-white transition-colors"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </SpotlightCard>
    )
}

export default ProjectCard
