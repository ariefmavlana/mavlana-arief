import React, { useState } from 'react'
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import { PERSONAL_INFO, SOCIAL_LINKs } from '../../utils/constants'
import FadeIn from '../animations/FadeIn'
import Starfield from '../backgrounds/Starfield'

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
        const subject = `Portfolio Contact from ${formData.name}`
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
            {/* Space Background */}
            <div className="absolute inset-0 bg-black z-0" />
            <div className="absolute inset-0 z-0 opacity-50">
                <Starfield density={180} speed={0.2} />
                <div className="absolute bottom-0 right-0 w-full h-full bg-linear-to-t from-purple-900/20 to-transparent pointer-events-none" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
                                Get In <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Touch</span>
                            </h2>
                            <p className="text-gray-400 text-xl font-light">
                                Let's discuss your next project
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <FadeIn delay={100}>
                            <div className="space-y-8">
                                <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
                                    <div className="absolute top-0 right-0 p-24 bg-purple-600/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-purple-600/20 transition-colors" />

                                    <h3 className="text-2xl font-bold font-display text-white mb-6">
                                        Let's Connect
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed mb-8 text-lg font-light">
                                        I'm always open to discussing new projects, creative ideas, or opportunities.
                                    </p>

                                    {/* Contact Details */}
                                    <div className="space-y-4 relative z-10">
                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                            <div className="p-2 bg-purple-500/20 rounded-xl">
                                                <Mail className="w-5 h-5 text-purple-300" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium text-sm mb-1">Email</h4>
                                                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-gray-400 hover:text-white transition-colors">
                                                    {PERSONAL_INFO.email}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                            <div className="p-2 bg-blue-500/20 rounded-xl">
                                                <MapPin className="w-5 h-5 text-blue-300" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium text-sm mb-1">Location</h4>
                                                <p className="text-gray-400">{PERSONAL_INFO.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                    <h4 className="text-white font-medium text-sm mb-6 uppercase tracking-wider font-display">Follow Me</h4>
                                    <div className="flex gap-4">
                                        {socialLinks.map(({ icon: Icon, url, label }) => (
                                            <a
                                                key={label}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-4 rounded-2xl bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all shadow-lg hover:shadow-blue-500/20 group"
                                                aria-label={label}
                                            >
                                                <Icon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Contact Form */}
                        <FadeIn delay={200}>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6 p-8 rounded-3xl glass-panel relative overflow-hidden"
                            >
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500" />

                                <div>
                                    <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2 pl-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all duration-300"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2 pl-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all duration-300"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2 pl-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all duration-300 resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 group"
                                >
                                    <span>Send Message</span>
                                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
