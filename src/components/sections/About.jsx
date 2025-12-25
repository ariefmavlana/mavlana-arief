import React from 'react'
import { Download } from 'lucide-react'
import { PERSONAL_INFO, ABOUT_STATS } from '../../utils/constants'
import FadeIn from '../animations/FadeIn'
import RadialGradientBackground from '../backgrounds/RadialGradientBackground'

const About = () => {
    return (
        <section id="about" className="relative py-20 md:py-32 overflow-hidden">
            <RadialGradientBackground variant="section" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                About <span className="text-primary">Me</span>
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Get to know more about who I am and what I do
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Photo and Bio Section */}
                        <FadeIn delay={100}>
                            <div className="space-y-6">
                                {/* Photo */}
                                <div className="flex justify-center md:justify-start mb-8">
                                    <div className="relative group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                                        <img
                                            src={PERSONAL_INFO.photo}
                                            alt={PERSONAL_INFO.name}
                                            className="relative w-64 h-64 object-cover rounded-full border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-6">
                                    Who I Am
                                </h3>
                                {PERSONAL_INFO.bio.map((paragraph, index) => (
                                    <p key={index} className="text-gray-400 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </FadeIn>

                        {/* Stats Section */}
                        <FadeIn delay={200}>
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white mb-6">
                                    Quick Stats
                                </h3>
                                <div className="grid grid-cols-2 gap-6">
                                    {ABOUT_STATS.map((stat, index) => (
                                        <div
                                            key={index}
                                            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                                        >
                                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                                {stat.value}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Contact Info */}
                                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-gray-400 text-sm">Email:</span>
                                            <p className="text-white font-medium">{PERSONAL_INFO.email}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-sm">Location:</span>
                                            <p className="text-white font-medium">{PERSONAL_INFO.location}</p>
                                        </div>
                                        <div className="pt-3 border-t border-white/10">
                                            <a
                                                href={PERSONAL_INFO.resume}
                                                download
                                                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                                            >
                                                <Download className="w-4 h-4" />
                                                Download Resume
                                            </a>
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
