import React from 'react'
import { Code, Heart, Github, Linkedin, Twitter, Instagram } from 'lucide-react'
import { PERSONAL_INFO, NAV_LINKS, SOCIAL_LINKs } from '../../utils/constants'
import { scrollToSection } from '../../hooks/useScrollSpy'
import { motion } from 'framer-motion'
import Starfield from '../backgrounds/Starfield'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const socialLinks = [
        { icon: Github, url: SOCIAL_LINKs.github, label: 'GitHub' },
        { icon: Linkedin, url: SOCIAL_LINKs.linkedin, label: 'LinkedIn' },
        { icon: Twitter, url: SOCIAL_LINKs.x, label: 'X (Twitter)' },
        { icon: Instagram, url: SOCIAL_LINKs.instagram, label: 'Instagram' }
    ]

    return (
        <footer className="relative py-20 border-t border-white/5 bg-black overflow-hidden">
            {/* Space Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
            <Starfield density={100} speed={0.1} />

            {/* Top cosmic glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent shadow-[0_0_20px_rgba(6,182,212,0.5)]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        {/* Brand */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30">
                                    <Code className="w-6 h-6 text-cyan-400" />
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                    {PERSONAL_INFO.name.split(' ')[0]}
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                                {PERSONAL_INFO.tagline}. Crafting digital experiences that merge creativity with cutting-edge technology.
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-4">
                                {socialLinks.map(({ icon: Icon, url, label }) => (
                                    <motion.a
                                        key={label}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
                            <nav className="flex flex-col gap-3">
                                {NAV_LINKS.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => scrollToSection(link.id)}
                                        className="text-gray-400 hover:text-cyan-400 transition-colors text-left text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 group-hover:bg-cyan-400 transition-colors" />
                                        {link.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-white font-semibold mb-6">Contact</h3>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">Email</span>
                                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-gray-300 hover:text-cyan-400 transition-colors">
                                        {PERSONAL_INFO.email}
                                    </a>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1">Location</span>
                                    <p className="text-gray-300">{PERSONAL_INFO.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
                        </p>
                        <p className="text-gray-500 text-sm flex items-center gap-2">
                            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> in the Cosmos
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer