import React from 'react'
import { Code2, Database, Brain, Activity, Cpu, Globe } from 'lucide-react'
import { PERSONAL_INFO, ABOUT_STATS } from '../../utils/constants'
import FadeIn from '../animations/FadeIn'
import Starfield from '../backgrounds/Starfield'

const About = () => {
    return (
        <section id="about" className="relative py-20 md:py-32 overflow-hidden bg-black font-sans">
            {/* Space Background */}
            <div className="absolute inset-0 bg-black z-0" />
            <div className="absolute inset-0 z-0">
                <Starfield density={350} speed={0.2} />
                <div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-purple-900/20 to-transparent pointer-events-none" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                <span className="text-sm text-gray-400 uppercase tracking-widest font-display">Who I Am</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                                About <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Me</span>
                            </h2>
                            <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                                Bridging the gap between complex data and intuitive user experiences.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left Column - Bio */}
                        <FadeIn delay={100}>
                            <div className="space-y-6">
                                <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-32 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-600/20 transition-colors duration-500" />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                                                <Code2 className="w-6 h-6 text-blue-400" />
                                            </div>
                                            <h3 className="text-xl font-display font-bold text-white">
                                                The Developer
                                            </h3>
                                        </div>

                                        <div className="space-y-4 text-lg text-gray-300 leading-relaxed font-light">
                                            {PERSONAL_INFO.bio.map((paragraph, index) => (
                                                <p key={index}>
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Expertise Areas */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group">
                                        <Database className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                                        <h4 className="text-white font-display font-bold text-lg mb-1">Fullstack</h4>
                                        <p className="text-gray-500 text-sm">End-to-end architecture</p>
                                    </div>

                                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group">
                                        <Brain className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                                        <h4 className="text-white font-display font-bold text-lg mb-1">Data Science</h4>
                                        <p className="text-gray-500 text-sm">ML & Analytics</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Right Column - Stats & Contact */}
                        <FadeIn delay={200}>
                            <div className="space-y-6">
                                {/* Futuristic HUD Stats */}
                                <div className="glass-panel rounded-3xl p-1 relative overflow-hidden">
                                    {/* Decorative gradients */}
                                    <div className="absolute top-0 left-1/4 w-32 h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-50" />

                                    <div className="bg-black/40 rounded-[22px] p-6 backdrop-blur-sm">
                                        <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                                            <div className="flex items-center gap-2">
                                                <Activity className="w-4 h-4 text-green-400" />
                                                <span className="text-xs font-display uppercase tracking-widest text-gray-400">System_Metrics</span>
                                            </div>
                                            <div className="flex gap-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                                                <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            {ABOUT_STATS.map((stat, index) => (
                                                <div key={index} className="relative group">
                                                    <div className="absolute -inset-2 bg-linear-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-500" />
                                                    <div className="relative">
                                                        <span className="text-gray-500 text-xs uppercase tracking-widest font-display block mb-1">
                                                            {stat.label}
                                                        </span>
                                                        <span className="text-2xl font-display font-bold text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400">
                                                            {stat.value}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Dynamic Graph/Visual Element */}
                                        <div className="mt-8 pt-6 border-t border-white/5">
                                            <div className="flex justify-between text-xs text-gray-500 mb-2 font-mono">
                                                <span>CPU usage</span>
                                                <span className="text-green-400">Optimal</span>
                                            </div>
                                            <div className="flex items-end gap-1 h-8">
                                                {[40, 65, 30, 80, 55, 90, 45, 70, 35, 60, 20, 75].map((h, i) => (
                                                    <div
                                                        key={i}
                                                        style={{ height: `${h}%` }}
                                                        className="flex-1 bg-blue-500/20 rounded-t-sm hover:bg-blue-400/40 transition-colors"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Card */}
                                <div className="p-8 rounded-3xl bg-linear-to-br from-purple-900/20 to-black border border-white/10 hover:border-purple-500/30 transition-all duration-300 group">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-display font-bold text-white">
                                            Get in Touch
                                        </h3>
                                        <Globe className="w-5 h-5 text-purple-400 group-hover:rotate-180 transition-transform duration-700" />
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <span className="text-purple-400/60 text-xs uppercase tracking-wider block mb-1">Email</span>
                                            <p className="text-white font-light text-lg">{PERSONAL_INFO.email}</p>
                                        </div>
                                        <div>
                                            <span className="text-purple-400/60 text-xs uppercase tracking-wider block mb-1">Base</span>
                                            <p className="text-white font-light text-lg">{PERSONAL_INFO.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
