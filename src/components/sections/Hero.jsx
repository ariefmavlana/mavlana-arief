import React, { useRef } from 'react'
import { ArrowRight, Orbit } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiPostgresql, SiPython, SiAmazon, SiTypescript } from 'react-icons/si'
import { scrollToSection } from '../../hooks/useScrollSpy'
import FadeIn from '../animations/FadeIn'
import Particles from '../reactbits/Particles'
import CosmicOrbitGrid from '../reactbits/CosmicOrbitGrid'
import TrueFocus from '../reactbits/TrueFocus'
import ShinyText from '../reactbits/ShinyText'
import RotatingText from '../reactbits/RotatingText'
import CountUp from '../reactbits/CountUp'

const Hero = () => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    })

    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
    const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

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

    const rotatingRoles = [
        "Fullstack Web Applications",
        "High Performance Backend APIs",
        "AI & Machine Learning Systems",
        "Distributed Cloud Architecture"
    ]

    const heroStats = [
        { value: 3, suffix: "+ YRS", label: "Engineering Experience" },
        { value: 15, suffix: "+", label: "Shipped Projects" },
        { value: 99, suffix: "%", label: "System Reliability" },
    ]

    return (
        <section ref={ref} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-24 sm:py-32 md:py-36">
            {/* --- COSMIC SPACE BACKDROP & ORBIT GRID --- */}
            <div className="absolute inset-0 bg-black z-0" />

            {/* Deep Cosmic Nebula Gas Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] md:w-[750px] h-[350px] sm:h-[600px] md:h-[750px] bg-blue-600/15 blur-[120px] sm:blur-[170px] rounded-full pointer-events-none z-0" />
            <div className="absolute top-1/3 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-600/15 blur-[120px] sm:blur-[150px] rounded-full pointer-events-none z-0" />

            {/* High-Tech Celestial Orbit Rings HUD */}
            <CosmicOrbitGrid />

            {/* React Bits Cosmic Starfield Particles System */}
            <Particles
                speed={0.25}
                particleColors={['#60a5fa', '#c084fc', '#38bdf8', '#e0e7ff', '#ffffff']}
                moveParticlesOnHover={true}
                enableMeteors={true}
                enableConstellations={true}
                className="z-1 opacity-85"
            />

            {/* --- HERO CONTENT --- */}
            <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center"
            >
                {/* Command Badge */}
                <FadeIn delay={100}>
                    <div className="mb-6 sm:mb-8 relative inline-block">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                        <div className="relative glass-panel rounded-full px-4 sm:px-6 py-2 sm:py-2.5 border-white/15 flex items-center gap-2 sm:gap-3 backdrop-blur-xl bg-black/60 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                            <Orbit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                            <span className="tracking-widest text-[10px] sm:text-xs md:text-sm font-mono uppercase text-gray-300">
                                FULLSTACK & AI ARCHITECT <span className="text-blue-400 mx-0.5 sm:mx-1">//</span> <ShinyText text="OPEN FOR PROJECTS" speed={3.5} />
                            </span>
                        </div>
                    </div>
                </FadeIn>

                {/* Main Headline with TrueFocus React Bits */}
                <FadeIn delay={300}>
                    <div className="mb-4 sm:mb-6 max-w-full px-2">
                        <h1 className="sr-only">Arief Maulana — Fullstack Developer &amp; AI Engineer in Bandung, Indonesia</h1>
                        <TrueFocus
                            sentence="EXPLORING DIGITAL FRONTIERS"
                            blurAmount={3}
                            borderColor="#38bdf8"
                            glowColor="rgba(56, 189, 248, 0.5)"
                            className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-tight sm:leading-none drop-shadow-2xl"
                        />
                    </div>
                </FadeIn>

                {/* Subtitle with RotatingText */}
                <FadeIn delay={500}>
                    <div className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 sm:mb-10 font-sans font-light leading-relaxed px-2">
                        Architecting{' '}
                        <RotatingText texts={rotatingRoles} interval={2800} />
                        <br />
                        <span className="text-gray-400 text-sm sm:text-base md:text-lg">
                            Building reliable software systems, clean APIs, and modern web experiences.
                        </span>
                    </div>
                </FadeIn>

                {/* Action Buttons */}
                <FadeIn delay={700}>
                    <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5 justify-center mb-12 sm:mb-16 w-full max-w-md sm:max-w-none">
                        <button
                            onClick={() => scrollToSection('projects')}
                            className="w-full sm:w-auto group relative px-7 sm:px-8 py-3.5 sm:py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium transition-all duration-300 hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] hover:scale-105 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                        >
                            <span>Explore Projects</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={() => scrollToSection('contact')}
                            className="w-full sm:w-auto group px-7 sm:px-8 py-3.5 sm:py-4 bg-white/5 border border-white/15 text-white rounded-full font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:scale-105 backdrop-blur-md flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
                        >
                            <span>Initiate Contact</span>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse group-hover:scale-125 transition-transform" />
                        </button>
                    </div>
                </FadeIn>

                {/* React Bits CountUp Live Metric Strip */}
                <FadeIn delay={850}>
                    <div className="w-full max-w-3xl glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-white/15 backdrop-blur-xl bg-black/50 mb-12 sm:mb-16 shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-12 bg-blue-500/20 blur-xl rounded-full" />
                        <div className="grid grid-cols-3 divide-x divide-white/10 text-center relative z-10">
                            {heroStats.map((stat, idx) => (
                                <div key={idx} className="px-1.5 sm:px-4">
                                    <div className="text-xl sm:text-3xl md:text-4xl font-bold font-display text-white mb-1">
                                        <CountUp to={stat.value} duration={2.5} suffix={stat.suffix} />
                                    </div>
                                    <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-gray-400 font-light">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>

                {/* Core Tech Stack Icons */}
                <FadeIn delay={1000}>
                    <div>
                        <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest mb-6 font-display font-medium">
                            Orbital Technology Matrix
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-8 opacity-90">
                            {techIcons.map((tech) => (
                                <div
                                    key={tech.name}
                                    className="group relative flex flex-col items-center gap-2 transition-all duration-300 hover:opacity-100 hover:-translate-y-1"
                                >
                                    <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-cyan-400/40 backdrop-blur-md transition-all shadow-lg group-hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                                        <tech.icon className="w-5 h-5 sm:w-7 sm:h-7 text-gray-300 group-hover:text-cyan-300 transition-colors" />
                                    </div>
                                    <span className="text-[10px] sm:text-[11px] text-gray-400 group-hover:text-cyan-300 font-medium opacity-0 group-hover:opacity-100 absolute -bottom-6 transition-all font-sans">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </motion.div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 inset-x-0 h-24 bg-linear-to-t from-black to-transparent z-10 pointer-events-none" />
        </section>
    )
}

export default Hero
