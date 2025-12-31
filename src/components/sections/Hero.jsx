import React, { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import { ChevronDown, Rocket, Download } from 'lucide-react'
import { SiReact, SiNextdotjs, SiLaravel, SiTailwindcss, SiNodedotjs, SiMongodb, SiExpress, SiTableau, SiTypescript, SiAwsamplify, SiPostgresql, SiPython, SiJupyter } from 'react-icons/si'
import { PERSONAL_INFO, STATS } from '../../utils/constants'
import { scrollToSection } from '../../hooks/useScrollSpy'
import FadeIn from '../animations/FadeIn'
import Scene3D from '../3d/Scene3D'
import ParallaxMountains from '../backgrounds/ParallaxMountains'
import Starfield from '../backgrounds/Starfield'
import CosmicClouds from '../backgrounds/CosmicClouds'
import ShootingStars from '../effects/ShootingStars'

const Hero = () => {
    const [scrollProgress, setScrollProgress] = useState(0)
    const { scrollY } = useScroll()

    useEffect(() => {
        const unsubscribe = scrollY.on('change', (latest) => {
            const progress = Math.min(latest / 1000, 1)
            setScrollProgress(progress)
        })
        return () => unsubscribe()
    }, [scrollY])

    const techIcons = [
        { Icon: SiReact, label: 'React', color: '#61DAFB' },
        { Icon: SiNextdotjs, label: 'Next.js', color: '#000000' },
        { Icon: SiLaravel, label: 'Laravel', color: '#FF2D20' },
        { Icon: SiTailwindcss, label: 'Tailwind', color: '#06B6D4' },
        { Icon: SiNodedotjs, label: 'Node.js', color: '#339933' },
        { Icon: SiMongodb, label: 'MongoDB', color: '#47A248' },
        { Icon: SiExpress, label: 'Express', color: '#000000' },
        { Icon: SiTableau, label: 'Tableau', color: '#E97627' },
        { Icon: SiTypescript, label: 'TypeScript', color: '#3178C6' },
        { Icon: SiAwsamplify, label: 'AWS', color: '#FF9900' },
        { Icon: SiPostgresql, label: 'PostgreSQL', color: '#4169E1' },
        { Icon: SiPython, label: 'Python', color: '#3776AB' },
        { Icon: SiJupyter, label: 'Jupyter', color: '#F37626' },
    ]

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Space Background Layers */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
            <Starfield density={350} speed={0.4} />
            <CosmicClouds />
            <ShootingStars count={8} />

            {/* 3D Scene - Spaceman takes the stage */}
            <Scene3D scrollProgress={scrollProgress} showSpaceman={true} />

            {/* Parallax Mountains (No Grid) */}
            <ParallaxMountains scrollProgress={scrollProgress} />

            {/* Cosmic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-cyan-900/10 pointer-events-none" />

            {/* Content - Centered */}
            <div className="container mx-auto px-6 relative z-10 pt-20">
                <div className="max-w-4xl mx-auto text-center">
                    <FadeIn delay={0}>
                        <motion.div
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black/40 border border-purple-500/30 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                            whileHover={{ scale: 1.05, borderColor: 'rgba(6, 182, 212, 0.5)' }}
                        >
                            <Rocket className="w-4 h-4 text-cyan-400 animate-pulse" />
                            <span className="text-sm text-gray-200 font-medium tracking-wide">Ready for lift off</span>
                        </motion.div>
                    </FadeIn>

                    <FadeIn delay={100}>
                        <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                                {PERSONAL_INFO.name.split(' ')[0]}
                            </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 animate-gradient">
                                {PERSONAL_INFO.name.split(' ').slice(1).join(' ')}
                            </span>
                        </h1>
                    </FadeIn>

                    <FadeIn delay={200}>
                        <p className="text-2xl md:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 font-medium mb-8 tracking-wide">
                            {PERSONAL_INFO.title}
                        </p>
                    </FadeIn>

                    <FadeIn delay={300}>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-10 text-shadow-sm">
                            {PERSONAL_INFO.description}
                        </p>
                    </FadeIn>

                    <FadeIn delay={400}>
                        <div className="flex flex-wrap justify-center gap-6 mb-12">
                            <motion.button
                                onClick={() => scrollToSection('contact')}
                                className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-90 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                                <div className="relative flex items-center gap-2 text-white font-bold">
                                    Initiate Contact
                                    <Rocket className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.button>

                            <motion.a
                                href={PERSONAL_INFO.resume}
                                download
                                className="group inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/10 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Download className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
                                Flight Log (CV)
                            </motion.a>
                        </div>
                    </FadeIn>

                    {/* Stats Row */}
                    <FadeIn delay={500}>
                        <div className="flex flex-wrap justify-center gap-8 md:gap-16 py-8 border-t border-white/5 bg-gradient-to-r from-transparent via-purple-900/10 to-transparent">
                            {STATS.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <div className="text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-md">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-cyan-300/80 font-medium tracking-wider uppercase">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Tech Stack Icons - Floating at bottom */}
                    <FadeIn delay={600}>
                        <div className="mt-12 flex flex-wrap justify-center gap-4 opacity-70 hover:opacity-100 transition-opacity duration-500">
                            {techIcons.map(({ Icon, label, color }, index) => (
                                <motion.div
                                    key={label}
                                    className="p-3 rounded-full bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                                    title={label}
                                    initial={{ y: 0 }}
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: index * 0.1,
                                        ease: "easeInOut"
                                    }}
                                    whileHover={{
                                        scale: 1.2,
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        borderColor: color
                                    }}
                                >
                                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                                </motion.div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Simple Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60"
                animate={{ y: [0, 10, 0], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
            </motion.div>
        </section>
    )
}

export default Hero