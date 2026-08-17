import React, { useState } from 'react'
import { faqs } from '../../data/faqs'
import FadeIn from '../animations/FadeIn'
import Particles from '../reactbits/Particles'
import { HelpCircle, ChevronDown } from 'lucide-react'

const FAQ = () => {
    const [openId, setOpenId] = useState(1)

    const toggleFAQ = (id) => {
        setOpenId(openId === id ? null : id)
    }

    return (
        <section id="faq" className="relative py-20 md:py-32 overflow-hidden bg-black font-sans">
            {/* Cosmic Background */}
            <div className="absolute inset-0 bg-black z-0" />
            <Particles
                speed={0.12}
                particleColors={['#60a5fa', '#3b82f6', '#8b5cf6']}
                moveParticlesOnHover={true}
                enableConstellations={true}
                className="z-1 opacity-40"
            />
            <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                                <HelpCircle className="w-4 h-4 text-cyan-400" />
                                <span className="text-sm text-gray-400 uppercase tracking-widest font-display font-medium">Knowledge Base</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
                                Frequently Asked <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400">Questions</span>
                            </h2>
                            <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                                Informasi lengkap seputar profil Arief Maulana (ariefmavlana), jasa pembuatan website, dan konsultasi fullstack development di Bandung.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openId === faq.id
                            return (
                                <FadeIn key={faq.id} delay={index * 80}>
                                    <div
                                        className={`rounded-2xl transition-all duration-300 border backdrop-blur-md overflow-hidden ${
                                            isOpen
                                                ? 'bg-white/10 border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                                                : 'bg-white/5 border-white/10 hover:border-white/20'
                                        }`}
                                    >
                                        <button
                                            onClick={() => toggleFAQ(faq.id)}
                                            className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                                            aria-expanded={isOpen}
                                        >
                                            <span className="text-lg md:text-xl font-semibold text-white font-display">
                                                {faq.question}
                                            </span>
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-between shrink-0 transition-transform duration-300 ${
                                                    isOpen ? 'bg-cyan-500/20 text-cyan-300 rotate-180' : 'bg-white/5 text-gray-400'
                                                }`}
                                            >
                                                <ChevronDown className="w-5 h-5 mx-auto" />
                                            </div>
                                        </button>

                                        {isOpen && (
                                            <div className="px-6 pb-6 text-gray-300 text-base md:text-lg leading-relaxed border-t border-white/5 pt-4">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                </FadeIn>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FAQ
