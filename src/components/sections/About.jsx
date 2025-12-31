import React from 'react'
import { motion } from 'framer-motion'
import { Download, Code2, Database, Brain } from 'lucide-react'
import { PERSONAL_INFO, ABOUT_STATS } from '../../utils/constants'
import FadeIn from '../animations/FadeIn'

const About = () => {
    return (
        <section id="about" className="relative py-20 md:py-32 overflow-hidden">
            {/* Coding POV Background */}
            <div className="absolute inset-0 opacity-10">
                <img
                    src="/coding-pov.png"
                    alt="Coding Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
            </div>

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: 'url(/grid.png)',
                    backgroundSize: '50px 50px',
                }}
            />

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
                                About <span className="text-primary">Me</span>
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
                                    {/* Glowing card */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-3xl blur-xl" />

                                    <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                                                <Code2 className="w-6 h-6 text-primary" />
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
                                        className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 backdrop-blur-sm"
                                        whileHover={{ scale: 1.05, borderColor: 'rgba(59, 130, 246, 0.5)' }}
                                    >
                                        <Database className="w-8 h-8 text-blue-400 mb-3" />
                                        <h4 className="text-white font-semibold mb-1">Fullstack</h4>
                                        <p className="text-gray-400 text-sm">End-to-end development</p>
                                    </motion.div>

                                    <motion.div
                                        className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 backdrop-blur-sm"
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
                                                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 backdrop-blur-sm"
                                                whileHover={{
                                                    scale: 1.05,
                                                    backgroundColor: 'rgba(141, 255, 105, 0.05)',
                                                    borderColor: 'rgba(141, 255, 105, 0.5)'
                                                }}
                                            >
                                                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
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
                                    className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 backdrop-blur-sm"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <h3 className="text-xl font-bold text-white mb-6">
                                        Contact Information
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <span className="text-gray-400 text-sm uppercase tracking-wider">Email</span>
                                            <p className="text-white font-medium mt-1">{PERSONAL_INFO.email}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-sm uppercase tracking-wider">Location</span>
                                            <p className="text-white font-medium mt-1">{PERSONAL_INFO.location}</p>
                                        </div>
                                        <div className="pt-4 border-t border-white/10">
                                            <motion.a
                                                href={PERSONAL_INFO.resume}
                                                download
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 hover:border-primary/50 rounded-xl transition-all font-medium"
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
