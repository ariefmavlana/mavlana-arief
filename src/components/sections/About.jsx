import React, { useRef } from 'react'
import { Database, Brain, Activity, Globe } from 'lucide-react'
import { PERSONAL_INFO, ABOUT_STATS } from '../../utils/constants'
import FadeIn from '../animations/FadeIn'
import SpotlightCard from '../reactbits/SpotlightCard'
import Particles from '../reactbits/Particles'
import DecryptedText from '../reactbits/DecryptedText'
import VariableProximity from '../reactbits/VariableProximity'
import Magnet from '../reactbits/Magnet'
import TelemetryHeader from '../ui/TelemetryHeader'

const About = () => {
    const containerRef = useRef(null)

    return (
        <section id="about" ref={containerRef} className="relative py-20 md:py-32 overflow-hidden bg-black font-sans">
            {/* Space Background */}
            <div className="absolute inset-0 bg-black z-0" />
            <Particles
                speed={0.15}
                particleColors={['#f59e0b', '#fbbf24', '#38bdf8', '#ffffff']}
                moveParticlesOnHover={false}
                className="z-1 opacity-50"
            />
            <div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-amber-900/10 via-transparent to-transparent pointer-events-none z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <TelemetryHeader
                            tag="PERSONNEL DOSSIER"
                            title="ABOUT ARCHITECT"
                            subtitle="Technical background, core engineering competencies, and software discipline."
                        />
                    </FadeIn>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left Column - Bio & Profile */}
                        <FadeIn delay={100}>
                            <div className="space-y-6">
                                <SpotlightCard
                                    spotlightColor="rgba(245, 158, 11, 0.2)"
                                    borderColor="rgba(245, 158, 11, 0.3)"
                                    className="bg-black/60"
                                >
                                    <div className="p-6 sm:p-8">
                                        {/* Profile Header with Avatar */}
                                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                                            {/* Avatar Photo Frame */}
                                            <div className="relative group/avatar shrink-0">
                                                <div className="absolute -inset-1 rounded-full bg-linear-to-r from-amber-500 to-cyan-500 opacity-75 blur-md group-hover/avatar:opacity-100 transition-opacity duration-500" />
                                                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-amber-500/40 p-1 bg-black">
                                                    <img
                                                        src={PERSONAL_INFO.photo}
                                                        alt={PERSONAL_INFO.name}
                                                        className="w-full h-full object-cover rounded-full group-hover/avatar:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center" title="Available for Work">
                                                    <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                                                </div>
                                            </div>

                                            {/* Header Info */}
                                            <div className="text-center sm:text-left pt-2">
                                                <h3 className="text-2xl font-mono font-bold text-white mb-1">
                                                    <DecryptedText text={PERSONAL_INFO.name} speed={50} animateOn="hover" />
                                                </h3>
                                                <p className="text-amber-400 font-mono font-medium text-sm mb-3">
                                                    {PERSONAL_INFO.title}
                                                </p>
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-amber-500/30 text-xs font-mono text-gray-300">
                                                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                                                    <span>{PERSONAL_INFO.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 text-base text-gray-300 leading-relaxed font-light border-t border-amber-500/15 pt-6">
                                            {PERSONAL_INFO.bio.map((paragraph, index) => (
                                                <p key={index}>
                                                    <VariableProximity
                                                        label={paragraph}
                                                        className="text-gray-300 font-light leading-relaxed"
                                                        fromFontVariationSettings="'wght' 300, 'opsz' 9"
                                                        toFontVariationSettings="'wght' 600, 'opsz' 40"
                                                        containerRef={containerRef}
                                                        radius={100}
                                                        falloff="exponential"
                                                    />
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </SpotlightCard>

                                {/* Core Competencies */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <SpotlightCard
                                        spotlightColor="rgba(245, 158, 11, 0.2)"
                                        borderColor="rgba(245, 158, 11, 0.3)"
                                        className="group bg-black/60"
                                    >
                                        <div className="p-6">
                                            <Database className="w-8 h-8 text-amber-400 mb-3 group-hover:scale-105 transition-transform" />
                                            <h4 className="text-white font-mono font-bold text-lg mb-1">Fullstack Engineering</h4>
                                            <p className="text-gray-300 text-sm font-light">React, Next.js, Node.js & Database Systems</p>
                                        </div>
                                    </SpotlightCard>

                                    <SpotlightCard
                                        spotlightColor="rgba(56, 189, 248, 0.2)"
                                        borderColor="rgba(56, 189, 248, 0.3)"
                                        className="group bg-black/60"
                                    >
                                        <div className="p-6">
                                            <Brain className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-105 transition-transform" />
                                            <h4 className="text-white font-mono font-bold text-lg mb-1">AI & Data Pipelines</h4>
                                            <p className="text-gray-300 text-sm font-light">Python, Machine Learning & Model Integration</p>
                                        </div>
                                    </SpotlightCard>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Right Column - Stats & Summary */}
                        <FadeIn delay={200}>
                            <div className="space-y-6">
                                {/* Profile Metrics */}
                                <SpotlightCard
                                    spotlightColor="rgba(245, 158, 11, 0.2)"
                                    borderColor="rgba(245, 158, 11, 0.3)"
                                    className="bg-black/60"
                                >
                                    <div className="p-6 sm:p-8">
                                        <div className="flex justify-between items-center mb-6 border-b border-amber-500/15 pb-4">
                                            <div className="flex items-center gap-2">
                                                <Activity className="w-4 h-4 text-amber-400" />
                                                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">[ PERSONNEL METRICS ]</span>
                                            </div>
                                            <div className="flex gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                                            {ABOUT_STATS.map((stat, index) => (
                                                <div key={index} className="p-4 rounded-2xl bg-black/80 border border-amber-500/20">
                                                    <span className="text-gray-400 text-xs uppercase tracking-wider font-mono block mb-1">
                                                        {stat.label}
                                                    </span>
                                                    <span className="text-lg font-mono font-bold text-amber-400">
                                                        {stat.value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tech Highlights */}
                                        <div className="mt-8 pt-6 border-t border-amber-500/15">
                                            <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-semibold block mb-4">
                                                // CORE SYSTEM STACK
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {["JavaScript", "TypeScript", "Python", "React", "Next.js", "Node.js", "Express", "PostgreSQL", "MongoDB", "Tailwind CSS", "TensorFlow", "Docker", "Git"].map((tech, i) => (
                                                    <Magnet key={i} magnetStrength={3} padding={15}>
                                                        <span className="px-3 py-1 rounded-full bg-black/80 text-gray-300 text-xs font-mono border border-amber-500/20 hover:border-amber-400/50 hover:text-amber-300 transition-all inline-block">
                                                            {tech}
                                                        </span>
                                                    </Magnet>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </SpotlightCard>

                                {/* Contact Information Card */}
                                <SpotlightCard
                                    spotlightColor="rgba(56, 189, 248, 0.2)"
                                    borderColor="rgba(56, 189, 248, 0.3)"
                                    className="bg-black/60"
                                >
                                    <div className="p-8 group">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-mono font-bold text-white">
                                                [ DIRECT SIGNAL LINE ]
                                            </h3>
                                            <Globe className="w-5 h-5 text-cyan-400 group-hover:rotate-180 transition-transform duration-700" />
                                        </div>

                                        <div className="space-y-4 font-mono">
                                            <div>
                                                <span className="text-cyan-400 text-xs uppercase tracking-wider block mb-1">EMAIL ADDRESS</span>
                                                <p className="text-white font-light text-lg">{PERSONAL_INFO.email}</p>
                                            </div>
                                            <div>
                                                <span className="text-cyan-400 text-xs uppercase tracking-wider block mb-1">COORDINATES</span>
                                                <p className="text-white font-light text-lg">{PERSONAL_INFO.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
