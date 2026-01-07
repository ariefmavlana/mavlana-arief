import React from 'react'
import { ArrowRight } from 'lucide-react'
import { SiReact, SiNextdotjs, SiLaravel, SiTailwindcss, SiNodedotjs, SiMongodb, SiExpress, SiTableau, SiTypescript, SiPostgresql, SiPython, SiJupyter, SiAmazon, SiThreedotjs, SiGhost, SiR } from 'react-icons/si'
import { scrollToSection } from '../../hooks/useScrollSpy'
import FadeIn from '../animations/FadeIn'
import Starfield from '../backgrounds/Starfield'
import CosmicClouds from '../backgrounds/CosmicClouds'

const Hero = () => {
    const techIcons = [
        { icon: SiReact, name: 'React' },
        { icon: SiNextdotjs, name: 'Next.js' },
        { icon: SiTypescript, name: 'TypeScript' },
        { icon: SiTailwindcss, name: 'Tailwind' },
        { icon: SiNodedotjs, name: 'Node.js' },
        { icon: SiPostgresql, name: 'PostgreSQL' },
        { icon: SiPython, name: 'Python' },
        { icon: SiAmazon, name: 'AWS' },
    ]

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <Starfield density={1200} speed={0.4} />
                <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black/80 z-10" />
                <CosmicClouds opacity={0.3} />

                {/* Modern Gradient Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow delay-1000 mix-blend-screen" />
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                <FadeIn delay={200}>
                    <div className="mb-8 relative inline-block">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                        <div className="relative glass-panel rounded-full px-6 py-2 border-white/10 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-blue-300 tracking-wider text-sm font-medium uppercase font-display">
                                Available for Freelance & Collab
                            </span>
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={400}>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white mb-6 tracking-tight leading-tight">
                        FULLSTACK
                        <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">
                            DEVELOPER
                        </span>
                    </h1>
                </FadeIn>

                <FadeIn delay={600}>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 font-sans font-light leading-relaxed">
                        Crafting digital experiences with modern tech and cosmic aesthetics.
                        Turning complex problems into elegant solutions.
                    </p>
                </FadeIn>

                <FadeIn delay={800}>
                    <div className="flex flex-col md:flex-row items-center gap-6 justify-center">
                        <button
                            onClick={() => scrollToSection('projects')}
                            className="group relative px-8 py-4 bg-blue-600 text-white rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:bg-blue-500 hover:-translate-y-1 overflow-hidden"
                        >
                            <span className="relative flex items-center gap-2">
                                View My Work
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>

                        <button
                            onClick={() => scrollToSection('contact')}
                            className="group px-8 py-4 bg-transparent border border-white/10 text-white rounded-full font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/30 hover:-translate-y-1 backdrop-blur-sm"
                        >
                            <span className="flex items-center gap-2">
                                Contact Me
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse group-hover:scale-125 transition-transform" />
                            </span>
                        </button>
                    </div>
                </FadeIn>

                {/* Tech Stack - Glass Style */}
                <FadeIn delay={1000}>
                    <div className="mt-20">
                        <p className="text-gray-500 text-sm uppercase tracking-widest mb-8 font-display">
                            Powering Next-Gen Apps With
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 md:gap-10 opacity-70">
                            {techIcons.map((tech) => (
                                <div
                                    key={tech.name}
                                    className="group relative flex flex-col items-center gap-2 transition-all duration-300 hover:opacity-100 hover:-translate-y-2"
                                >
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/20 backdrop-blur-sm transition-all shadow-lg group-hover:shadow-blue-500/20">
                                        <tech.icon className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-xs text-gray-400 group-hover:text-blue-300 font-medium opacity-0 group-hover:opacity-100 absolute -bottom-8 transition-all font-sans">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    )
}

export default Hero
