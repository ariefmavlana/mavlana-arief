import React, { useState } from 'react'
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Instagram, Radio } from 'lucide-react'
import { PERSONAL_INFO, SOCIAL_LINKs } from '../../utils/constants'
import FadeIn from '../animations/FadeIn'
import Particles from '../reactbits/Particles'
import SpotlightCard from '../reactbits/SpotlightCard'
import ShinyText from '../reactbits/ShinyText'
import Magnet from '../reactbits/Magnet'
import ClickSpark from '../reactbits/ClickSpark'
import TelemetryHeader from '../ui/TelemetryHeader'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const subject = `[Endurance Signal] from ${formData.name}`
        const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`
        window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`
    }

    const socialLinks = [
        { icon: Github, url: SOCIAL_LINKs.github, label: 'GitHub' },
        { icon: Linkedin, url: SOCIAL_LINKs.linkedin, label: 'LinkedIn' },
        { icon: Twitter, url: SOCIAL_LINKs.x, label: 'X (Twitter)' },
        { icon: Instagram, url: SOCIAL_LINKs.instagram, label: 'Instagram' }
    ]

    return (
        <section id="contact" className="relative py-20 md:py-32 overflow-hidden bg-black font-sans">
            {/* Ambient Background Particles */}
            <div className="absolute inset-0 bg-black z-0" />
            <Particles
                speed={0.15}
                particleColors={['#f59e0b', '#fbbf24', '#38bdf8']}
                moveParticlesOnHover={false}
                className="z-1 opacity-50"
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <TelemetryHeader
                            tag="COMMUNICATION ARRAY"
                            title="INITIATE TRANSMISSION"
                            subtitle="Open for freelance assignments, engineering roles, and technical collaborations."
                        />
                    </FadeIn>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Information Cards */}
                        <FadeIn delay={100}>
                            <div className="space-y-8">
                                <SpotlightCard spotlightColor="rgba(245, 158, 11, 0.2)" borderColor="rgba(245, 158, 11, 0.3)" className="p-8 rounded-3xl bg-black/60">
                                    <h3 className="text-2xl font-bold font-mono text-white mb-4">
                                        [ DIRECT SIGNAL CHANNEL ]
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed mb-8 font-light">
                                        Direct line to discuss project requirements, architecture design, or consulting opportunities.
                                    </p>

                                    {/* Details */}
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-black/60 border border-amber-500/20 hover:border-amber-400/50 transition-colors">
                                            <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/30">
                                                <Mail className="w-5 h-5 text-amber-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-mono font-medium text-sm mb-1">EMAIL DIRECTORY</h4>
                                                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-amber-300 hover:text-amber-400 transition-colors font-mono text-sm">
                                                    {PERSONAL_INFO.email}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-black/60 border border-amber-500/20 hover:border-amber-400/50 transition-colors">
                                            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
                                                <MapPin className="w-5 h-5 text-cyan-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-mono font-medium text-sm mb-1">COORDINATES</h4>
                                                <p className="text-gray-300 text-sm font-mono">{PERSONAL_INFO.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </SpotlightCard>

                                {/* Social Links */}
                                <div className="p-8 rounded-3xl bg-black/60 border border-amber-500/20 backdrop-blur-md">
                                    <h4 className="text-amber-400 font-medium text-xs mb-6 uppercase tracking-widest font-mono">[ SOCIAL FREQUENCY CHANNELS ]</h4>
                                    <div className="flex gap-4">
                                        {socialLinks.map((link) => (
                                            <Magnet key={link.label} magnetStrength={4} padding={25}>
                                                <a
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-4 rounded-2xl bg-black/80 border border-amber-500/20 text-gray-400 hover:text-amber-300 hover:bg-amber-500/10 hover:border-amber-400/50 transition-all hover:scale-105 group shadow-lg inline-block"
                                                    aria-label={link.label}
                                                >
                                                    <link.icon className="w-5 h-5 group-hover:rotate-12 transition-transform text-gray-300 group-hover:text-amber-400" />
                                                </a>
                                            </Magnet>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Transmission Form */}
                        <FadeIn delay={200}>
                            <SpotlightCard spotlightColor="rgba(245, 158, 11, 0.2)" borderColor="rgba(245, 158, 11, 0.3)" className="p-8 rounded-3xl bg-black/60">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-amber-400 text-xs font-mono uppercase tracking-wider mb-2 pl-1">
                                            // SENDER IDENTIFIER
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-4 bg-black/80 border border-amber-500/20 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:bg-black transition-all font-mono text-sm"
                                            placeholder="Your Name or Organization"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-amber-400 text-xs font-mono uppercase tracking-wider mb-2 pl-1">
                                            // RETURN FREQUENCY (EMAIL)
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-4 bg-black/80 border border-amber-500/20 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:bg-black transition-all font-mono text-sm"
                                            placeholder="name@company.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-amber-400 text-xs font-mono uppercase tracking-wider mb-2 pl-1">
                                            // PAYLOAD TRANSMISSION (MESSAGE)
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            className="w-full px-5 py-4 bg-black/80 border border-amber-500/20 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:bg-black transition-all resize-none font-mono text-sm"
                                            placeholder="Describe project roadmap, architectural requirements, or consultation..."
                                        />
                                    </div>

                                    <Magnet magnetStrength={3} padding={50}>
                                        <ClickSpark sparkColor="#f59e0b" sparkCount={15}>
                                            <button
                                                type="submit"
                                                className="w-full px-6 py-4 bg-linear-to-r from-amber-500 via-orange-500 to-cyan-500 text-black rounded-xl font-mono font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 group cursor-pointer"
                                            >
                                                <span>TRANSMIT SIGNAL</span>
                                                <Send className="w-4 h-4 text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </button>
                                        </ClickSpark>
                                    </Magnet>
                                </form>
                            </SpotlightCard>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact

