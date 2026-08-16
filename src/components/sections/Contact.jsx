import React, { useState } from 'react'
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Instagram, Radio } from 'lucide-react'
import { PERSONAL_INFO, SOCIAL_LINKs } from '../../utils/constants'
import FadeIn from '../animations/FadeIn'
import Particles from '../reactbits/Particles'
import SpotlightCard from '../reactbits/SpotlightCard'
import ShinyText from '../reactbits/ShinyText'

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
        const subject = `[Portfolio Inquiry] from ${formData.name}`
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
                particleColors={['#60a5fa', '#a855f7', '#38bdf8']}
                moveParticlesOnHover={false}
                className="z-1 opacity-50"
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                                <span className="text-sm text-gray-400 uppercase tracking-widest font-display font-medium">Communication Array</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
                                Initiate <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">Transmission</span>
                            </h2>
                            <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
                                Open for freelance assignments, engineering roles, and technical collaborations.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Information Cards */}
                        <FadeIn delay={100}>
                            <div className="space-y-8">
                                <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.2)" className="p-8 rounded-3xl">
                                    <h3 className="text-2xl font-bold font-display text-white mb-4">
                                        Let's Connect
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed mb-8 font-light">
                                        Direct line to discuss project requirements, architecture design, or consulting opportunities.
                                    </p>

                                    {/* Details */}
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                            <div className="p-2.5 bg-blue-500/20 rounded-xl border border-blue-500/30">
                                                <Mail className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium text-sm mb-1">Direct Email</h4>
                                                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-gray-300 hover:text-blue-400 transition-colors font-mono text-sm">
                                                    {PERSONAL_INFO.email}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                            <div className="p-2.5 bg-purple-500/20 rounded-xl border border-purple-500/30">
                                                <MapPin className="w-5 h-5 text-purple-400" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium text-sm mb-1">Location</h4>
                                                <p className="text-gray-300 text-sm font-sans">{PERSONAL_INFO.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </SpotlightCard>

                                {/* Social Links */}
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                                    <h4 className="text-gray-400 font-medium text-xs mb-6 uppercase tracking-widest font-display">Social Channels</h4>
                                    <div className="flex gap-4">
                                        {socialLinks.map((link) => (
                                            <a
                                                key={link.label}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-4 rounded-2xl bg-black/50 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-blue-500/30 transition-all hover:scale-105 group shadow-lg"
                                                aria-label={link.label}
                                            >
                                                <link.icon className="w-5 h-5 group-hover:rotate-12 transition-transform text-gray-300 group-hover:text-blue-400" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Transmission Form */}
                        <FadeIn delay={200}>
                            <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.2)" className="p-8 rounded-3xl">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-gray-300 text-xs font-mono uppercase tracking-wider mb-2 pl-1">
                                            Sender Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-4 bg-black/60 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 focus:bg-black/80 transition-all"
                                            placeholder="Your Name or Organization"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-gray-300 text-xs font-mono uppercase tracking-wider mb-2 pl-1">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-4 bg-black/60 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 focus:bg-black/80 transition-all"
                                            placeholder="name@company.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-gray-300 text-xs font-mono uppercase tracking-wider mb-2 pl-1">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="5"
                                            className="w-full px-5 py-4 bg-black/60 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 focus:bg-black/80 transition-all resize-none"
                                            placeholder="Describe your project, roadmap, or technical requirements..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full px-6 py-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2 group cursor-pointer"
                                    >
                                        <ShinyText text="Send Message" speed={3.5} className="text-white font-semibold" />
                                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
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
