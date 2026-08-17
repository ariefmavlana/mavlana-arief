import React, { useState } from 'react'
import { faqs } from '../../data/faqs'
import FadeIn from '../animations/FadeIn'
import Particles from '../reactbits/Particles'
import { ChevronDown } from 'lucide-react'
import TelemetryHeader from '../ui/TelemetryHeader'

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
                particleColors={['#f59e0b', '#fbbf24', '#38bdf8', '#60a5fa']}
                moveParticlesOnHover={true}
                enableConstellations={true}
                className="z-1 opacity-60"
            />
            <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <FadeIn delay={0}>
                        <TelemetryHeader
                            tag="SYSTEM KNOWLEDGE BASE"
                            title="FREQUENTLY ASKED QUESTIONS"
                            subtitle="Informasi lengkap seputar profil Arief Maulana (ariefmavlana), jasa pembuatan website, dan konsultasi fullstack development di Bandung."
                        />
                    </FadeIn>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openId === faq.id
                            return (
                                <FadeIn key={faq.id} delay={index * 80}>
                                    <div
                                        className={`rounded-2xl transition-all duration-300 border backdrop-blur-md overflow-hidden ${
                                            isOpen
                                                ? 'bg-black/80 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                                                : 'bg-black/50 border-amber-500/20 hover:border-amber-400/40'
                                        }`}
                                    >
                                        <button
                                            onClick={() => toggleFAQ(faq.id)}
                                            className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                                            aria-expanded={isOpen}
                                        >
                                            <span className={`text-base sm:text-lg md:text-xl font-semibold font-mono transition-colors ${
                                                isOpen ? 'text-amber-400' : 'text-white'
                                            }`}>
                                                {faq.question}
                                            </span>
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                                    isOpen ? 'bg-amber-500/20 text-amber-300 rotate-180 border border-amber-500/30' : 'bg-black/60 text-gray-400 border border-amber-500/20'
                                                }`}
                                            >
                                                <ChevronDown className="w-5 h-5 mx-auto" />
                                            </div>
                                        </button>

                                        {isOpen && (
                                            <div className="px-6 pb-6 text-gray-300 text-sm md:text-base leading-relaxed border-t border-amber-500/15 pt-4 font-sans font-light">
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

