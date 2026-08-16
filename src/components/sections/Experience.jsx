import React from 'react'
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react'
import { experiences } from '../../data/experience'
import FadeIn from '../animations/FadeIn'
import SpotlightCard from '../reactbits/SpotlightCard'
import Particles from '../reactbits/Particles'

const Experience = () => {
    return (
        <section id="experience" className="relative py-20 md:py-32 overflow-hidden bg-black font-sans">
            {/* Ambient Background Lights */}
            <div className="absolute inset-0 bg-black z-0" />
            <Particles
                speed={0.15}
                particleColors={['#60a5fa', '#a855f7', '#38bdf8']}
                moveParticlesOnHover={false}
                className="z-1 opacity-50"
            />
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-16 md:mb-24">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                                <Briefcase className="w-4 h-4 text-blue-400" />
                                <span className="text-sm text-gray-400 uppercase tracking-widest font-display font-medium">Career Trajectory</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                                Work <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">Experience</span>
                            </h2>
                            <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                                A track record of building production software, designing APIs, and delivering digital solutions.
                            </p>
                        </div>
                    </FadeIn>

                    {/* Timeline Container */}
                    <div className="relative pl-6 md:pl-10 border-l border-white/10 space-y-12 md:space-y-16">
                        {experiences.map((exp, index) => (
                            <FadeIn key={exp.id} delay={index * 150}>
                                <div className="relative group">
                                    {/* Timeline Glow Node */}
                                    <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-black border-2 border-blue-500 group-hover:border-purple-400 group-hover:scale-125 transition-all duration-300 flex items-center justify-center shadow-lg shadow-blue-500/50 z-20">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:bg-purple-300" />
                                    </div>

                                    {/* React Bits Spotlight Card */}
                                    <SpotlightCard
                                        spotlightColor="rgba(59, 130, 246, 0.2)"
                                        borderColor="rgba(59, 130, 246, 0.3)"
                                        className="h-full"
                                    >
                                        <div className="p-6 md:p-8">
                                            {/* Card Header: Role & Period */}
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                                                <div>
                                                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider border border-blue-500/20 mb-2 inline-block font-mono">
                                                        {exp.type}
                                                    </span>
                                                    <h3 className="text-2xl font-bold font-display text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-300 group-hover:to-purple-300 transition-colors">
                                                        {exp.role}
                                                    </h3>
                                                    <p className="text-gray-300 font-medium text-base mt-1">
                                                        {exp.company}
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap md:flex-col items-start md:items-end gap-3 text-xs text-gray-400 font-mono">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                                                        <Calendar className="w-3.5 h-3.5 text-blue-400" />
                                                        {exp.period}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                                                        <MapPin className="w-3.5 h-3.5 text-purple-400" />
                                                        {exp.location}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-300 font-light text-base leading-relaxed mb-6">
                                                {exp.description}
                                            </p>

                                            {/* Key Achievements */}
                                            <div className="space-y-2.5 mb-6">
                                                <h4 className="text-xs uppercase tracking-widest text-gray-400 font-display font-semibold mb-3">
                                                    Key Responsibilities & Deliverables
                                                </h4>
                                                {exp.achievements.map((item, idx) => (
                                                    <div key={idx} className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                                                        <span className="text-sm text-gray-300 font-light">
                                                            {item}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Tech Stack Pills */}
                                            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                                                {exp.technologies.map((tech, tIdx) => (
                                                    <span
                                                        key={tIdx}
                                                        className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-xs font-medium border border-white/10 group-hover:border-blue-500/20 transition-colors"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Experience
