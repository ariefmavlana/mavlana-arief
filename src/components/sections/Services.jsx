import React from 'react'

import { services } from '../../data/services'
import ServiceCard from '../ui/ServiceCard'
import FadeIn from '../animations/FadeIn'
import Starfield from '../backgrounds/Starfield'

const Services = () => {
    return (
        <section id="services" className="relative py-12 md:py-32 overflow-hidden bg-black font-sans">
            {/* Space Background */}
            <div className="absolute inset-0 bg-black z-0" />
            <div className="absolute inset-0 z-0 opacity-40">
                <Starfield density={200} speed={0.3} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-10 md:mb-16">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
                                What I <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-orange-400">Do</span>
                            </h2>
                            <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto">
                                Services I offer to bring your ideas to life
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
