import React from 'react'
import { motion } from 'framer-motion'
import { Download, Code2, Database, Brain } from 'lucide-react'
import { PERSONAL_INFO, ABOUT_STATS } from '../../utils/constants'
import FadeIn from '../animations/FadeIn'
import Starfield from '../backgrounds/Starfield'

const About = () => {
    return (
        <section id="about" className="relative py-20 md:py-32 overflow-hidden">
            {/* Space Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
            <Starfield density={150} speed={0.2} />

            {/* Coding POV Background with cosmic overlay */}
            <div className="absolute inset-0 opacity-5">
                <img
                    src="/coding-pov.png"
                    alt="Coding Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-black/80 to-black" />
            </div>

            {/* Cosmic accent glow */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-16">
                            <motion.h2
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Me</span>
                            </motion.h2>
                            <p className="text-gray-400 text-lg">
                                Get to know more about who I am and what I do
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left Column - Bio */}
                        <FadeIn delay={100}>
                            <div className="space-y-6">
                                <motion.div
                                    className="relative group"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {/* Cosmic glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-cyan-500/10 to-transparent rounded-3xl blur-xl" />

                                    <div className="relative p-8 rounded-3xl bg-white/5 border border-purple-500/20 backdrop-blur-sm">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-400/30">
                                                <Code2 className="w-6 h-6 text-purple-400" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white">
                                                Who I Am
                                            </h3>
                                        </div>

                                        <div className="space-y-4">
                                            {PERSONAL_INFO.bio.map((paragraph, index) => (
                                                <p key={index} className="text-gray-400 leading-relaxed">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Expertise Areas */}
                                <div className="grid grid-cols-2 gap-4">
                                    <motion.div
                                        className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/30 backdrop-blur-sm"
                                        whileHover={{ scale: 1.05, borderColor: 'rgba(6, 182, 212, 0.5)' }}
                                    >
                                        <Database className="w-8 h-8 text-cyan-400 mb-3" />
                                        <h4 className="text-white font-semibold mb-1">Fullstack</h4>
                                        <p className="text-gray-400 text-sm">End-to-end development</p>
                                    </motion.div>

                                    <motion.div
                                        className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 backdrop-blur-sm"
                                        whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.5)' }}
                                    >
                                        <Brain className="w-8 h-8 text-purple-400 mb-3" />
                                        <h4 className="text-white font-semibold mb-1">Data Science</h4>
                                        <p className="text-gray-400 text-sm">ML & Analytics</p>
                                    </motion.div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Right Column - Stats & Contact */}
                        <FadeIn delay={200}>
                            <div className="space-y-6">
                                {/* Stats Grid */}
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-6">
                                        Quick Stats
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {ABOUT_STATS.map((stat, index) => (
                                            <motion.div
                                                key={index}
                                                className="p-6 rounded-2xl bg-white/5 border border-purple-500/20 hover:border-cyan-400/40 backdrop-blur-sm"
                                                whileHover={{
                                                    scale: 1.05,
                                                    backgroundColor: 'rgba(168, 85, 247, 0.05)',
                                                }}
                                            >
                                                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
                                                    {stat.value}
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    {stat.label}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Contact Card */}
                                <motion.div
                                    className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 via-cyan-500/5 to-transparent border border-purple-500/30 backdrop-blur-sm"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <h3 className="text-xl font-bold text-white mb-6">
                                        Contact Information
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <span className="text-purple-300 text-sm uppercase tracking-wider">Email</span>
                                            <p className="text-white font-medium mt-1">{PERSONAL_INFO.email}</p>
                                        </div>
                                        <div>
                                            <span className="text-purple-300 text-sm uppercase tracking-wider">Location</span>
                                            <p className="text-white font-medium mt-1">{PERSONAL_INFO.location}</p>
                                        </div>
                                        <div className="pt-4 border-t border-purple-500/20">
                                            <motion.a
                                                href={PERSONAL_INFO.resume}
                                                download
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 hover:from-purple-500/30 hover:to-cyan-500/30 text-purple-300 border border-purple-400/30 hover:border-cyan-400/50 rounded-xl transition-all font-medium"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Download className="w-4 h-4" />
                                                Download Resume
                                            </motion.a>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
