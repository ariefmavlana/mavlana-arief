import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Send, Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import { PERSONAL_INFO, SOCIAL_LINKs } from '../../utils/constants'
import FadeIn from '../animations/FadeIn'

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
        { icon: Github, url: SOCIAL_LINKs.github, label: 'GitHub', color: '#333' },
        { icon: Linkedin, url: SOCIAL_LINKs.linkedin, label: 'LinkedIn', color: '#0077B5' },
        { icon: Twitter, url: SOCIAL_LINKs.x, label: 'X (Twitter)', color: '#1DA1F2' },
        { icon: Instagram, url: SOCIAL_LINKs.instagram, label: 'Instagram', color: '#E4405F' }
    ]

    return (
        <section id="contact" className="relative py-20 md:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: 'url(/grid.png)',
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Glowing orbs */}
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <FadeIn delay={0}>
                        <div className="text-center mb-16">
                            <motion.h2
                                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                Get In <span className="text-primary">Touch</span>
                            </motion.h2>
                            <p className="text-gray-400 text-lg">
                                Let's discuss your next project or just say hi
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <FadeIn delay={100}>
                            <div className="space-y-8">
                                <motion.div
                                    className="relative"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-3xl blur-xl" />

                                    <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                        <h3 className="text-2xl font-bold text-white mb-6">
                                            Let's Connect
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed mb-8">
                                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                                        </p>

                                        {/* Contact Details */}
                                        <div className="space-y-4">
                                            <motion.div
                                                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                                                whileHover={{ backgroundColor: 'rgba(141, 255, 105, 0.05)', borderColor: 'rgba(141, 255, 105, 0.3)' }}
                                            >
                                                <Mail className="w-6 h-6 text-primary mt-1" />
                                                <div>
                                                    <h4 className="text-white font-medium mb-1">Email</h4>
                                                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-gray-400 hover:text-primary transition-colors">
                                                        {PERSONAL_INFO.email}
                                                    </a>
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                                                whileHover={{ backgroundColor: 'rgba(141, 255, 105, 0.05)', borderColor: 'rgba(141, 255, 105, 0.3)' }}
                                            >
                                                <MapPin className="w-6 h-6 text-primary mt-1" />
                                                <div>
                                                    <h4 className="text-white font-medium mb-1">Location</h4>
                                                    <p className="text-gray-400">{PERSONAL_INFO.location}</p>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Social Links */}
                                <motion.div
                                    className="p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-transparent border border-primary/20 backdrop-blur-sm"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <h4 className="text-white font-semibold mb-6 text-lg">Follow Me</h4>
                                    <div className="flex gap-4">
                                        {socialLinks.map(({ icon: Icon, url, label, color }) => (
                                            <motion.a
                                                key={label}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 backdrop-blur-sm transition-all duration-300"
                                                aria-label={label}
                                                whileHover={{
                                                    scale: 1.1,
                                                    backgroundColor: 'rgba(141, 255, 105, 0.1)',
                                                    borderColor: 'rgba(141, 255, 105, 0.5)'
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Icon className="w-6 h-6 text-gray-400 hover:text-primary transition-colors" />
                                            </motion.a>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </FadeIn>

                        {/* Contact Form */}
                        <FadeIn delay={200}>
                            <motion.form
                                onSubmit={handleSubmit}
                                className="space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
                                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                            >
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

                                <motion.button
                                    type="submit"
                                    className="w-full px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-black font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
                                    whileHover={{
                                        scale: 1.02,
                                        boxShadow: '0 20px 40px rgba(141, 255, 105, 0.4)'
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Send Message
                                    <Send className="w-5 h-5" />
                                </motion.button>
                            </motion.form>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
