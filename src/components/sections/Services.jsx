import React from 'react'
import { services } from '../../data/services'
import ServiceCard from '../ui/ServiceCard'
import FadeIn from '../animations/FadeIn'
import RadialGradientBackground from '../backgrounds/RadialGradientBackground'

const Services = () => {
    return (
        <section id="services" className="relative py-20 md:py-32 overflow-hidden">
            <RadialGradientBackground variant="section" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                What I <span className="text-primary">Do</span>
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Services I offer to help bring your ideas to life
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <FadeIn key={service.id} delay={index * 100}>
                                <ServiceCard service={service} />
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services
