import React from 'react'
import { Database, Brain, Activity, Globe } from 'lucide-react'
import { PERSONAL_INFO, ABOUT_STATS } from '../../utils/constants'
import FadeIn from '../animations/FadeIn'
import SpotlightCard from '../reactbits/SpotlightCard'
import Particles from '../reactbits/Particles'

const About = () => {
    return (
        <section id="about" className="relative py-20 md:py-32 overflow-hidden bg-black font-sans">
            {/* Space Background */}
            <div className="absolute inset-0 bg-black z-0" />
            <Particles
                speed={0.15}
                particleColors={['#60a5fa', '#c084fc', '#38bdf8', '#ffffff']}
                moveParticlesOnHover={false}
                className="z-1 opacity-50"
            />
            <div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-purple-900/10 via-transparent to-transparent pointer-events-none z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                <span className="text-sm text-gray-400 uppercase tracking-widest font-display font-medium">Background Matrix</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                                About <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">Me</span>
                            </h2>
                            <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                                Summary of technical background, core engineering competencies, and software discipline.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left Column - Bio & Profile */}
                        <FadeIn delay={100}>
                            <div className="space-y-6">
                                <SpotlightCard
                                    spotlightColor="rgba(59, 130, 246, 0.2)"
                                    borderColor="rgba(59, 130, 246, 0.3)"
                                >
                                    <div className="p-6 sm:p-8">
                                        {/* Profile Header with Avatar */}
                                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                                            {/* Avatar Photo Frame */}
                                            <div className="relative group/avatar shrink-0">
                                                <div className="absolute -inset-1 rounded-full bg-linear-to-r from-blue-500 to-purple-600 opacity-75 blur-md group-hover/avatar:opacity-100 transition-opacity duration-500" />
                                                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-white/20 p-1 bg-black">
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
                                                <h3 className="text-2xl font-display font-bold text-white mb-1">
                                                    {PERSONAL_INFO.name}
                                                </h3>
                                                <p className="text-blue-400 font-medium text-sm mb-3">
                                                    {PERSONAL_INFO.title}
                                                </p>
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                                                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                                                    <span>{PERSONAL_INFO.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 text-base text-gray-300 leading-relaxed font-light border-t border-white/10 pt-6">
                                            {PERSONAL_INFO.bio.map((paragraph, index) => (
                                                <p key={index}>
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </SpotlightCard>

                                {/* Core Competencies */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <SpotlightCard
                                        spotlightColor="rgba(59, 130, 246, 0.2)"
                                        borderColor="rgba(59, 130, 246, 0.3)"
                                        className="group"
                                    >
                                        <div className="p-6">
                                            <Database className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-105 transition-transform" />
                                            <h4 className="text-white font-display font-bold text-lg mb-1">Fullstack Engineering</h4>
                                            <p className="text-gray-400 text-sm font-light">React, Next.js, Node.js & Database Systems</p>
                                        </div>
                                    </SpotlightCard>

                                    <SpotlightCard
                                        spotlightColor="rgba(168, 85, 247, 0.2)"
                                        borderColor="rgba(168, 85, 247, 0.3)"
                                        className="group"
                                    >
                                        <div className="p-6">
                                            <Brain className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-105 transition-transform" />
                                            <h4 className="text-white font-display font-bold text-lg mb-1">AI & Data Pipelines</h4>
                                            <p className="text-gray-400 text-sm font-light">Python, Machine Learning & Model Integration</p>
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
                                    spotlightColor="rgba(59, 130, 246, 0.2)"
                                    borderColor="rgba(59, 130, 246, 0.3)"
                                >
                                    <div className="p-6 sm:p-8">
                                        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                                            <div className="flex items-center gap-2">
                                                <Activity className="w-4 h-4 text-emerald-400" />
                                                <span className="text-xs font-display uppercase tracking-widest text-gray-400 font-semibold">Profile Summary</span>
                                            </div>
                                            <div className="flex gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                                            {ABOUT_STATS.map((stat, index) => (
                                                <div key={index} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                                    <span className="text-gray-400 text-xs uppercase tracking-wider font-display block mb-1">
                                                        {stat.label}
                                                    </span>
                                                    <span className="text-lg font-display font-bold text-white">
                                                        {stat.value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tech Highlights */}
                                        <div className="mt-8 pt-6 border-t border-white/10">
                                            <span className="text-xs uppercase tracking-widest text-gray-400 font-display font-semibold block mb-4">
                                                Core Engineering Stack
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {["JavaScript", "TypeScript", "Python", "React", "Next.js", "Node.js", "Express", "PostgreSQL", "MongoDB", "Tailwind CSS", "TensorFlow", "Docker", "Git"].map((tech, i) => (
                                                    <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-xs font-medium border border-white/10">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </SpotlightCard>

                                {/* Contact Information Card */}
                                <SpotlightCard
                                    spotlightColor="rgba(168, 85, 247, 0.2)"
                                    borderColor="rgba(168, 85, 247, 0.3)"
                                >
                                    <div className="p-8 group">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-display font-bold text-white">
                                                Direct Contact
                                            </h3>
                                            <Globe className="w-5 h-5 text-purple-400 group-hover:rotate-180 transition-transform duration-700" />
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <span className="text-purple-400/80 text-xs uppercase tracking-wider block mb-1 font-mono">Email Address</span>
                                                <p className="text-white font-light text-lg">{PERSONAL_INFO.email}</p>
                                            </div>
                                            <div>
                                                <span className="text-purple-400/80 text-xs uppercase tracking-wider block mb-1 font-mono">Location</span>
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
