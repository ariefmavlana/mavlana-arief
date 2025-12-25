import React from 'react'
import { ExternalLink, Github } from 'lucide-react'

const ProjectCard = ({ project }) => {
    return (
        <div className="group relative rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 overflow-hidden transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10 p-6">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {project.category}
                    </span>
                    <div className="flex gap-2">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                aria-label="View on GitHub"
                            >
                                <Github className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                            </a>
                        )}
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                aria-label="View live site"
                            >
                                <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-xs border border-white/10"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Metrics */}
                {project.metrics && (
                    <div className="pt-4 border-t border-white/10">
                        <p className="text-sm text-primary font-medium">
                            {project.metrics}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProjectCard