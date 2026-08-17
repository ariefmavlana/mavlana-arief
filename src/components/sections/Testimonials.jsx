import React from 'react'
import { Star, ShieldCheck } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import FadeIn from '../animations/FadeIn'
import SpotlightCard from '../reactbits/SpotlightCard'
import Particles from '../reactbits/Particles'
import TelemetryHeader from '../ui/TelemetryHeader'

const Testimonials = () => {
    return (
        <section id="testimonials" className="relative py-20 md:py-32 overflow-hidden bg-black font-sans">
            {/* Deep Space Background Particles */}
            <div className="absolute inset-0 bg-black z-0" />
            <Particles
                speed={0.16}
                particleColors={['#f59e0b', '#fbbf24', '#38bdf8', '#60a5fa']}
                moveParticlesOnHover={false}
                enableConstellations={true}
                className="z-1 opacity-60"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/10 blur-[160px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <TelemetryHeader
                            tag="SUBSPACE TRANSMISSIONS"
                            title="VERIFIED ENDORSEMENTS"
                            subtitle="Direct feedback and telemetry endorsements from tech leads, engineering partners, and enterprise collaborators."
                        />
                    </FadeIn>

                    {/* Testimonials Grid - Transmission Logs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((item, index) => (
                            <FadeIn key={item.id} delay={index * 150}>
                                <SpotlightCard
                                    spotlightColor="rgba(245, 158, 11, 0.2)"
                                    borderColor="rgba(245, 158, 11, 0.3)"
                                    className="h-full group hover:-translate-y-1 transition-transform duration-300 bg-black/60"
                                >
                                    <div className="p-6 sm:p-8 flex flex-col justify-between h-full relative">
                                        {/* Equalizer & Verification Header */}
                                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-amber-500/15">
                                            <div className="flex items-center gap-1.5 h-4">
                                                <span className="w-1 bg-amber-400 rounded-full animate-[pulse_1s_ease-in-out_infinite] h-3" />
                                                <span className="w-1 bg-cyan-400 rounded-full animate-[pulse_1.2s_ease-in-out_infinite_0.2s] h-5" />
                                                <span className="w-1 bg-amber-500 rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.4s] h-2" />
                                                <span className="w-1 bg-cyan-300 rounded-full animate-[pulse_1.4s_ease-in-out_infinite_0.1s] h-4" />
                                            </div>

                                            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                                                <ShieldCheck className="w-3 h-3 text-amber-400" />
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
                                        <div className="flex items-center gap-4 pt-6 border-t border-amber-500/15 mt-auto">
                                            <img
                                                src={item.avatar}
                                                alt={item.author}
                                                className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/30 group-hover:border-amber-400 transition-colors shadow-md"
                                            />
                                            <div>
                                                <h3 className="text-white font-bold font-mono text-sm group-hover:text-amber-300 transition-colors">
                                                    {item.author}
                                                </h3>
                                                <p className="text-gray-400 text-xs font-mono font-light">
                                                    {item.role} • <span className="text-amber-400">{item.company}</span>
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

