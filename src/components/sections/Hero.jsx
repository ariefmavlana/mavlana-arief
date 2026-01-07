
import React, { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiPostgresql, SiPython, SiAmazon, SiTypescript } from 'react-icons/si'
import { scrollToSection } from '../../hooks/useScrollSpy'
import FadeIn from '../animations/FadeIn'

const Hero = () => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    })

    // Parallax Transforms
    const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const planetY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const mountain3Y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
    const mountain2Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const mountain1Y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"])
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

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
        <section ref={ref} id="home" className="relative min-h-[120vh] flex items-center justify-center overflow-hidden bg-black pb-32">
            {/* --- PARALLAX LAYERS --- */}

            {/* 1. Sky Background (Fixed/Slow) */}
            <motion.div
                style={{ y: skyY }}
                className="absolute inset-0 z-0"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url("/sky.jpg")' }}
                />
                {/* Overlay gradient to darken sky for text readability */}
                <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black" />
            </motion.div>

            {/* 2. Starfield & Cosmic Elements */}
            <div className="absolute inset-0 z-1 pointer-events-none opacity-80">
                {/* Starfield removed per user request */}
            </div>

            {/* 3. Planets (Floating) */}
            <motion.div
                style={{ y: planetY }}
                className="absolute top-10 right-0 md:right-20 z-2 w-64 md:w-96 opacity-90"
            >
                <img src="/planets.png" alt="Planets" className="w-full h-auto drop-shadow-2xl animate-float" />
            </motion.div>

            {/* 4. Mountains (Back to Front) */}
            <motion.div
                style={{ y: mountain3Y }}
                className="absolute bottom-0 left-0 w-full z-3"
            >
                <img src="/mountain-3.png" alt="Mountains Far" className="w-full h-auto object-cover object-bottom min-h-[40vh]" />
            </motion.div>

            <motion.div
                style={{ y: mountain2Y }}
                className="absolute -bottom-10 left-0 w-full z-4"
            >
                <img src="/mountain-2.png" alt="Mountains Mid" className="w-full h-auto object-cover object-bottom min-h-[30vh]" />
            </motion.div>

            <motion.div
                style={{ y: mountain1Y }}
                className="absolute -bottom-20 left-0 w-full z-5"
            >
                <img src="/mountain-1.png" alt="Mountains Front" className="w-full h-auto object-cover object-bottom min-h-[20vh]" />
            </motion.div>

            {/* --- CONTENT --- */}
            <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center pt-20"
            >
                <FadeIn delay={200}>
                    <div className="mb-8 relative inline-block">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                        <div className="relative glass-panel rounded-full px-6 py-2 border-white/10 flex items-center gap-2 backdrop-blur-md bg-black/30">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-blue-200 tracking-wider text-sm font-medium uppercase font-display shadow-black drop-shadow-md">
                                Available for Freelance & Collab
                            </span>
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={400}>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white mb-6 tracking-tight leading-tight drop-shadow-2xl">
                        FULLSTACK
                        <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg">
                            DEVELOPER
                        </span>
                    </h1>
                </FadeIn>

                <FadeIn delay={600}>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 font-sans font-light leading-relaxed drop-shadow-lg">
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
                            className="group px-8 py-4 bg-black/40 border border-white/10 text-white rounded-full font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:-translate-y-1 backdrop-blur-md"
                        >
                            <span className="flex items-center gap-2">
                                Contact Me
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse group-hover:scale-125 transition-transform" />
                            </span>
                        </button>
                    </div>
                </FadeIn>

                {/* Tech Stack - Glass Style moved down slightly */}
                <FadeIn delay={1000}>
                    <div className="mt-24">
                        <p className="text-gray-400 text-sm uppercase tracking-widest mb-8 font-display drop-shadow-md">
                            Powering Next-Gen Apps With
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 md:gap-10 opacity-90">
                            {techIcons.map((tech) => (
                                <div
                                    key={tech.name}
                                    className="group relative flex flex-col items-center gap-2 transition-all duration-300 hover:opacity-100 hover:-translate-y-2"
                                >
                                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 backdrop-blur-md transition-all shadow-lg group-hover:shadow-blue-500/20">
                                        <tech.icon className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-xs text-gray-300 group-hover:text-blue-300 font-medium opacity-0 group-hover:opacity-100 absolute -bottom-8 transition-all font-sans">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </motion.div>

            {/* Bottom Gradient Fade to merge with next section */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-black to-transparent z-10" />
        </section>
    )
}

export default Hero
