import React, { useState } from 'react'
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import { PERSONAL_INFO, SOCIAL_LINKs } from '../../utils/constants'
import FadeIn from '../animations/FadeIn'
import RadialGradientBackground from '../backgrounds/RadialGradientBackground'

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
        // Create mailto link with form data
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
        <section id="contact" className="relative py-20 md:py-32 overflow-hidden">
            <RadialGradientBackground variant="section" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Get In <span className="text-primary">Touch</span>
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Let's discuss your next project or just say hi
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <FadeIn delay={100}>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-6">
                                        Let's Connect
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed mb-8">
                                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                                    </p>
                                </div>

                                {/* Contact Details */}
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                        <Mail className="w-6 h-6 text-primary mt-1" />
                                        <div>
                                            <h4 className="text-white font-medium mb-1">Email</h4>
                                            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-gray-400 hover:text-primary transition-colors">
                                                {PERSONAL_INFO.email}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                        <MapPin className="w-6 h-6 text-primary mt-1" />
                                        <div>
                                            <h4 className="text-white font-medium mb-1">Location</h4>
                                            <p className="text-gray-400">{PERSONAL_INFO.location}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div>
                                    <h4 className="text-white font-medium mb-4">Follow Me</h4>
                                    <div className="flex gap-4">
                                        {socialLinks.map(({ icon: Icon, url, label }) => (
                                            <a
                                                key={label}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                                                aria-label={label}
                                            >
                                                <Icon className="w-5 h-5 text-gray-400 hover:text-primary transition-colors" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Contact Form */}
                        <FadeIn delay={200}>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-white font-medium mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-white font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-white font-medium mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                        placeholder="Your message..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-black font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50 flex items-center justify-center gap-2"
                                >
                                    Send Message
                                    <Send className="w-5 h-5" />
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
