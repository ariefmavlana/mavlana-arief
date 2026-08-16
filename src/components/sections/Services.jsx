import React from 'react'
import { services } from '../../data/services'
import ServiceCard from '../ui/ServiceCard'
import FadeIn from '../animations/FadeIn'
import Particles from '../reactbits/Particles'
import { Orbit } from 'lucide-react'

const Services = () => {
    return (
        <section id="services" className="relative py-20 md:py-32 overflow-hidden bg-black font-sans">
            {/* Cosmic Space Background */}
            <div className="absolute inset-0 bg-black z-0" />
            <Particles
                speed={0.15}
                particleColors={['#a855f7', '#60a5fa', '#ec4899']}
                moveParticlesOnHover={true}
                enableConstellations={true}
                className="z-1 opacity-50"
            />
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                                <Orbit className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: '10s' }} />
                                <span className="text-sm text-gray-400 uppercase tracking-widest font-display font-medium">Mission Modules</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
                                Engineering <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-400 to-blue-400">Services</span>
                            </h2>
                            <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                                Specialized technical capabilities for enterprise web applications, API platforms, and AI engineering workflows.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {services.map((service, index) => (
                            <FadeIn key={service.id} delay={index * 100}>
                                <ServiceCard service={service} index={index} />
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services
