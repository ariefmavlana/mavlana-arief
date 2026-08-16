import React from 'react'
import { Quote, Star, Radio, ShieldCheck } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import FadeIn from '../animations/FadeIn'
import SpotlightCard from '../reactbits/SpotlightCard'
import Particles from '../reactbits/Particles'

const Testimonials = () => {
    return (
        <section id="testimonials" className="relative py-20 md:py-32 overflow-hidden bg-black font-sans">
            {/* Deep Space Background Particles */}
            <div className="absolute inset-0 bg-black z-0" />
            <Particles
                speed={0.16}
                particleColors={['#c084fc', '#60a5fa', '#e0e7ff']}
                moveParticlesOnHover={false}
                enableConstellations={true}
                className="z-1 opacity-50"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/15 blur-[160px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                                <Radio className="w-4 h-4 text-purple-400 animate-pulse" />
                                <span className="text-sm text-gray-400 uppercase tracking-widest font-display font-medium">Subspace Telemetry</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                                Verified <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-blue-400">Transmissions</span>
                            </h2>
                            <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                                Direct feedback and endorsements from tech leads, engineering partners, and enterprise collaborators.
                            </p>
                        </div>
                    </FadeIn>

                    {/* Testimonials Grid - Transmission Logs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((item, index) => (
                            <FadeIn key={item.id} delay={index * 150}>
                                <SpotlightCard
                                    spotlightColor="rgba(168, 85, 247, 0.2)"
                                    borderColor="rgba(168, 85, 247, 0.3)"
                                    className="h-full group hover:-translate-y-1 transition-transform duration-300"
                                >
                                    <div className="p-8 flex flex-col justify-between h-full relative">
                                        {/* Equalizer & Verification Header */}
                                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                                            <div className="flex items-center gap-1.5 h-4">
                                                <span className="w-1 bg-cyan-400 rounded-full animate-[pulse_1s_ease-in-out_infinite] h-3" />
                                                <span className="w-1 bg-purple-400 rounded-full animate-[pulse_1.2s_ease-in-out_infinite_0.2s] h-5" />
                                                <span className="w-1 bg-blue-400 rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.4s] h-2" />
                                                <span className="w-1 bg-pink-400 rounded-full animate-[pulse_1.4s_ease-in-out_infinite_0.1s] h-4" />
                                            </div>

                                            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                                                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                                <span>VERIFIED_LOG</span>
                                            </div>
                                        </div>

                                        {/* Quote Text */}
                                        <div className="grow">
                                            <div className="flex gap-1 mb-4">
                                                {[...Array(item.rating)].map((_, i) => (
                                                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                                ))}
                                            </div>

                                            <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light italic mb-8 relative z-10">
                                                "{item.quote}"
                                            </p>
                                        </div>

                                        {/* Author Profile */}
                                        <div className="flex items-center gap-4 pt-6 border-t border-white/10 mt-auto">
                                            <img
                                                src={item.avatar}
                                                alt={item.author}
                                                className="w-12 h-12 rounded-full object-cover border-2 border-white/20 group-hover:border-purple-400 transition-colors shadow-md"
                                            />
                                            <div>
                                                <h3 className="text-white font-bold font-display text-sm group-hover:text-purple-300 transition-colors">
                                                    {item.author}
                                                </h3>
                                                <p className="text-gray-400 text-xs font-light">
                                                    {item.role} • <span className="text-gray-300">{item.company}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials
