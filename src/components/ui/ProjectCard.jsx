import React from 'react'
import { ExternalLink, Github } from 'lucide-react'

const ProjectCard = ({ project }) => {
    return (
        <div className="group relative glass-card p-8 rounded-3xl overflow-hidden">
            {/* Hover Gradient Effect */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20 font-display">
                        {project.category}
                    </span>
                    <div className="flex gap-3">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 hover:border-white/20"
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
                                className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-white/5 hover:border-white/20"
                                aria-label="View live site"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold font-display text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                    {project.title}
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed font-sans text-base grow">
                    {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-xs font-medium border border-white/5 hover:border-white/20 transition-colors"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
