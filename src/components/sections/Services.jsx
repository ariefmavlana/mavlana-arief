import React from 'react'
import { motion } from 'framer-motion'
import { services } from '../../data/services'
import ServiceCard from '../ui/ServiceCard'
import FadeIn from '../animations/FadeIn'
import Starfield from '../backgrounds/Starfield'

const Services = () => {
    return (
        <section id="services" className="relative py-12 md:py-32 overflow-hidden">
            {/* Space Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
            <Starfield density={200} speed={0.3} />

            {/* Animated cosmic background elements */}
            <motion.div
                className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                    x: [0, 50, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1],
                    x: [0, -50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2,
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-10 md:mb-16">
                            <motion.h2
                                className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Do</span>
                            </motion.h2>
                            <p className="text-gray-400 text-base md:text-lg">
                                Services I offer to help bring your ideas to life
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
