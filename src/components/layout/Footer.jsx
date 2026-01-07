import React from 'react'
import { Github, Linkedin, Twitter, Instagram, ArrowUp } from 'lucide-react'
import PixelRocket from '../ui/PixelRocket'
import { PERSONAL_INFO, NAV_LINKS, SOCIAL_LINKs } from '../../utils/constants'
import { scrollToSection } from '../../hooks/useScrollSpy'
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
        <footer className="relative py-20 bg-black overflow-hidden font-sans border-t border-white/5">
            {/* Space Background */}
            <div className="absolute inset-0 bg-black z-0" />
            <div className="absolute inset-0 z-0 opacity-30">
                <Starfield density={100} speed={0.1} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        {/* Brand */}
                        <div className="md:col-span-2 space-y-6">
                            <div
                                className="flex items-center gap-3 cursor-pointer group w-fit"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                <div className="p-2.5 rounded-xl bg-linear-to-br from-blue-500/10 to-purple-500/10 border border-white/10 group-hover:bg-white/5 transition-colors">
                                    <PixelRocket className="w-5 h-5 text-blue-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                                <span className="text-xl font-bold font-display text-white tracking-tight">
                                    {PERSONAL_INFO.name}
                                </span>
                            </div>
                            <p className="text-gray-400 text-base leading-relaxed max-w-sm font-light">
                                {PERSONAL_INFO.tagline}. Crafting digital experiences that merge creativity with cutting-edge technology.
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-3 pt-2">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1"
                                        aria-label={link.label}
                                    >
                                        <link.icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white font-bold font-display text-sm mb-6 uppercase tracking-wider">Quick Links</h3>
                            <nav className="flex flex-col gap-3">
                                {NAV_LINKS.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => scrollToSection(link.id)}
                                        className="text-gray-400 hover:text-blue-400 transition-colors text-left text-sm flex items-center gap-2 group w-fit"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-blue-400 transition-colors" />
                                        {link.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-white font-bold font-display text-sm mb-6 uppercase tracking-wider">Contact</h3>
                            <div className="space-y-4 text-sm font-light">
                                <div>
                                    <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1 font-medium">Email</span>
                                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-gray-300 hover:text-blue-400 transition-colors">
                                        {PERSONAL_INFO.email}
                                    </a>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1 font-medium">Location</span>
                                    <p className="text-gray-300">{PERSONAL_INFO.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-light">
                        <p>
                            © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
                        </p>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="flex items-center gap-2 hover:text-white transition-colors group"
                        >
                            Back to Top
                            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
