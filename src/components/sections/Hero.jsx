import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Star, Download } from 'lucide-react'
import { SiReact, SiNextdotjs, SiLaravel, SiTailwindcss, SiNodedotjs, SiMongodb, SiExpress, SiTableau, SiTypescript, SiAwsamplify, SiPostgresql, SiPython, SiJupyter } from 'react-icons/si'
import { PERSONAL_INFO, STATS } from '../../utils/constants'
import { scrollToSection } from '../../hooks/useScrollSpy'
import FadeIn from '../animations/FadeIn'
import Scene3D from '../3d/Scene3D'
import ParallaxMountains from '../backgrounds/ParallaxMountains'
import ParticleField from '../effects/ParticleField'

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
            {/* 3D Background Scene */}
            <Scene3D scrollProgress={scrollProgress} showSpaceman={true} />

            {/* Parallax Mountains */}
            <ParallaxMountains scrollProgress={scrollProgress} />

            {/* Particle Effects */}
            <ParticleField count={30} />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10 pt-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Text Content */}
                        <div className="space-y-8 text-center lg:text-left">
                            <FadeIn delay={0}>
                                <motion.div
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
                                    whileHover={{ scale: 1.05, borderColor: 'rgba(141, 255, 105, 0.3)' }}
                                >
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-pulse" />
                                    <span className="text-sm text-gray-300">Available for new opportunities</span>
                                </motion.div>
                            </FadeIn>

                            <FadeIn delay={100}>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight">
                                    Hi, I'm{' '}
                                    <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-400">
                                        {PERSONAL_INFO.name}
                                    </span>
                                </h1>
                            </FadeIn>

                            <FadeIn delay={200}>
                                <p className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-medium mb-6">
                                    {PERSONAL_INFO.title}
                                </p>
                            </FadeIn>

                            <FadeIn delay={300}>
                                <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                                    {PERSONAL_INFO.description}
                                </p>
                            </FadeIn>

                            <FadeIn delay={400}>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-6">
                                    <motion.button
                                        onClick={() => scrollToSection('contact')}
                                        className="group inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-black font-semibold rounded-full transition-all duration-300 shadow-lg shadow-primary/50"
                                        whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(141, 255, 105, 0.3)' }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Let's Connect
                                        <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                                    </motion.button>

                                    <motion.a
                                        href={PERSONAL_INFO.resume}
                                        download
                                        className="group inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-full border border-white/10 hover:border-primary/50 transition-all duration-300"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Download className="w-5 h-5" />
                                        Download CV
                                    </motion.a>
                                </div>
                            </FadeIn>

                            <FadeIn delay={500}>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-8">
                                    {STATS.map((stat, index) => (
                                        <motion.div
                                            key={index}
                                            className="text-center lg:text-left"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                                                {stat.value}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {stat.label}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </FadeIn>
                        </div>

                        {/* Right Column - Profile Image */}
                        <FadeIn delay={600}>
                            <div className="relative flex justify-center lg:justify-end">
                                <motion.div
                                    className="relative group"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    {/* Glowing background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-green-500/20 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500" />

                                    {/* Image container */}
                                    <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/30 group-hover:border-primary/60 transition-all duration-300 shadow-2xl shadow-primary/20">
                                        <img
                                            src={PERSONAL_INFO.photo}
                                            alt={PERSONAL_INFO.name}
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                    </div>

                                    {/* Decorative rings */}
                                    <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping" style={{ animationDuration: '3s' }} />
                                    <div className="absolute -inset-4 rounded-full border border-primary/10" />
                                </motion.div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Tech Stack Icons */}
                    <FadeIn delay={700}>
                        <div className="mt-16 pt-8 border-t border-white/10">
                            <p className="text-center text-gray-400 mb-6 text-sm uppercase tracking-wider">
                                Tech Stack & Tools
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                {techIcons.map(({ Icon, label, color }) => (
                                    <motion.div
                                        key={label}
                                        className="group relative p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 backdrop-blur-sm transition-all duration-300"
                                        title={label}
                                        whileHover={{
                                            scale: 1.1,
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            borderColor: color
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Icon className="w-7 h-7 text-gray-400 group-hover:text-white transition-colors" />

                                        {/* Tooltip */}
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                            {label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ChevronDown className="w-8 h-8 text-primary/60" />
            </motion.div>
        </section>
    )
}

export default Hero