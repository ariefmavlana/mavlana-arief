import React from 'react'
import { ChevronDown, Star } from 'lucide-react'
import { SiReact, SiNextdotjs, SiLaravel, SiTailwindcss, SiNodedotjs, SiMongodb, SiExpress, SiTableau, SiTypescript, SiAwsamplify, SiPostgresql, SiPython, SiJupyter } from 'react-icons/si'
import { PERSONAL_INFO, STATS } from '../../utils/constants'
import { scrollToSection } from '../../hooks/useScrollSpy'
import FadeIn from '../animations/FadeIn'
import RadialGradientBackground from '../backgrounds/RadialGradientBackground'

const Hero = () => {
    const techIcons = [
        { Icon: SiReact, label: 'React' },
        { Icon: SiNextdotjs, label: 'Next.js' },
        { Icon: SiLaravel, label: 'Laravel' },
        { Icon: SiTailwindcss, label: 'Tailwind' },
        { Icon: SiNodedotjs, label: 'Node.js' },
        { Icon: SiMongodb, label: 'MongoDB' },
        { Icon: SiExpress, label: 'Express' },
        { Icon: SiTableau, label: 'Tableau' },
        { Icon: SiTypescript, label: 'TypeScript' },
        { Icon: SiAwsamplify, label: 'AWS' },
        { Icon: SiPostgresql, label: 'PostgreSQL' },
        { Icon: SiPython, label: 'Python' },
        { Icon: SiJupyter, label: 'Jupyter' },
    ]

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            <RadialGradientBackground variant='hero' />
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="space-y-8">
                        <FadeIn delay={0}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm text-gray-300">Available for new opportunities</span>
                            </div>
                        </FadeIn>

                        <FadeIn delay={100}>
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                                Hi, I'm <span className="text-primary">{PERSONAL_INFO.name}</span>
                            </h1>
                        </FadeIn>

                        <FadeIn delay={200}>
                            <p className="text-2xl md:text-3xl text-gray-300 font-medium mb-6">
                                {PERSONAL_INFO.title}
                            </p>
                        </FadeIn>

                        <FadeIn delay={300}>
                            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                                {PERSONAL_INFO.description}
                            </p>
                        </FadeIn>

                        <FadeIn delay={400}>
                            <div className="flex flex-wrap justify-center gap-4 py-8">
                                {techIcons.map(({ Icon, label }) => (
                                    <div
                                        key={label}
                                        className="group relative p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-110"
                                        title={label}
                                    >
                                        <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </FadeIn>

                        <FadeIn delay={500}>
                            <div className="flex flex-wrap justify-center gap-8 py-6">
                                {STATS.map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>

                        <FadeIn delay={600}>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-black font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
                            >
                                Let's Connect
                                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                            </button>
                        </FadeIn>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <ChevronDown className="w-6 h-6 text-gray-400" />
            </div>
        </section>
    )
}

export default Hero