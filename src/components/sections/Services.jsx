import React from 'react'
import { services } from '../../data/services'
import ServiceCard from '../ui/ServiceCard'
import FadeIn from '../animations/FadeIn'
import Particles from '../reactbits/Particles'
import TelemetryHeader from '../ui/TelemetryHeader'

const Services = () => {
    return (
        <section id="services" className="relative py-20 md:py-32 overflow-hidden bg-black font-sans">
            {/* Cosmic Space Background */}
            <div className="absolute inset-0 bg-black z-0" />
            <Particles
                speed={0.15}
                particleColors={['#f59e0b', '#fbbf24', '#38bdf8', '#60a5fa']}
                moveParticlesOnHover={true}
                enableConstellations={true}
                className="z-1 opacity-60"
            />
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <TelemetryHeader
                            tag="SYSTEM MODULES"
                            title="ENGINEERING SERVICES"
                            subtitle="Specialized technical capabilities for enterprise web applications, API platforms, and AI engineering workflows."
                        />
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

