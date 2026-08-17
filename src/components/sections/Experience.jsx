import React from 'react'
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react'
import { experiences } from '../../data/experience'
import FadeIn from '../animations/FadeIn'
import SpotlightCard from '../reactbits/SpotlightCard'
import Particles from '../reactbits/Particles'
import TelemetryHeader from '../ui/TelemetryHeader'

const Experience = () => {
    return (
        <section id="experience" className="relative py-20 md:py-32 overflow-hidden bg-black font-sans">
            {/* Ambient Background Lights */}
            <div className="absolute inset-0 bg-black z-0" />
            <Particles
                speed={0.15}
                particleColors={['#f59e0b', '#fbbf24', '#38bdf8']}
                moveParticlesOnHover={false}
                className="z-1 opacity-50"
            />
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <FadeIn delay={0}>
                        <TelemetryHeader
                            tag="CAREER TRAJECTORY"
                            title="MISSION CHRONOLOGY"
                            subtitle="A track record of building production software, designing APIs, and delivering digital solutions."
                        />
                    </FadeIn>

                    {/* Timeline Container */}
                    <div className="relative pl-6 md:pl-10 border-l border-amber-500/30 space-y-12 md:space-y-16">
                        {experiences.map((exp, index) => (
                            <FadeIn key={exp.id} delay={index * 150}>
                                <div className="relative group">
                                    {/* Timeline Glow Node */}
                                    <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-black border-2 border-amber-500 group-hover:border-cyan-400 group-hover:scale-125 transition-all duration-300 flex items-center justify-center shadow-lg shadow-amber-500/50 z-20">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:bg-cyan-300" />
                                    </div>

                                    {/* React Bits Spotlight Card */}
                                    <SpotlightCard
                                        spotlightColor="rgba(245, 158, 11, 0.2)"
                                        borderColor="rgba(245, 158, 11, 0.3)"
                                        className="h-full bg-black/60"
                                    >
                                        <div className="p-6 md:p-8">
                                            {/* Card Header: Role & Period */}
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-amber-500/15">
                                                <div>
                                                    <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-widest border border-amber-500/30 mb-2 inline-block font-mono">
                                                        {exp.type}
                                                    </span>
                                                    <h3 className="text-2xl font-bold font-mono text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-amber-400 group-hover:to-cyan-400 transition-colors">
                                                        {exp.role}
                                                    </h3>
                                                    <p className="text-gray-300 font-medium text-base mt-1">
                                                        {exp.company}
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap md:flex-col items-start md:items-end gap-3 text-xs text-gray-300 font-mono">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 border border-amber-500/20">
                                                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                                                        {exp.period}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 border border-amber-500/20">
                                                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
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
                                                <h4 className="text-xs uppercase tracking-widest text-amber-400 font-mono font-semibold mb-3">
                                                    [ DELIVERABLES & OUTCOMES ]
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
                                            <div className="flex flex-wrap gap-2 pt-2 border-t border-amber-500/15">
                                                {exp.technologies.map((tech, tIdx) => (
                                                    <span
                                                        key={tIdx}
                                                        className="px-3 py-1 rounded-full bg-black/60 text-gray-300 text-xs font-mono border border-amber-500/20 group-hover:border-amber-400/40 group-hover:text-amber-300 transition-colors"
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
