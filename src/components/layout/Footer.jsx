import React from 'react'
import { Github, Linkedin, Twitter, Instagram, ArrowUp, Orbit } from 'lucide-react'
import { PERSONAL_INFO, NAV_LINKS, SOCIAL_LINKs } from '../../utils/constants'
import { scrollToSection } from '../../hooks/useScrollSpy'
import Particles from '../reactbits/Particles'
import ShinyText from '../reactbits/ShinyText'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const socialLinks = [
        { icon: Github, url: SOCIAL_LINKs.github, label: 'GitHub' },
        { icon: Linkedin, url: SOCIAL_LINKs.linkedin, label: 'LinkedIn' },
        { icon: Twitter, url: SOCIAL_LINKs.x, label: 'X (Twitter)' },
        { icon: Instagram, url: SOCIAL_LINKs.instagram, label: 'Instagram' }
    ]

    return (
        <footer className="relative py-20 bg-black overflow-hidden font-sans border-t border-white/10">
            {/* React Bits Ambient Background Particles */}
            <div className="absolute inset-0 bg-black z-0" />
            <Particles
                speed={0.1}
                particleColors={['#60a5fa', '#a855f7', '#38bdf8']}
                moveParticlesOnHover={false}
                className="z-1 opacity-40"
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        {/* Brand */}
                        <div className="md:col-span-2 space-y-6">
                            <div
                                className="flex items-center gap-3 cursor-pointer group w-fit"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                <div className="p-2.5 rounded-xl bg-linear-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/15 group-hover:bg-white/10 transition-colors">
                                    <Orbit className="w-5 h-5 text-blue-400 group-hover:rotate-90 transition-transform duration-500" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold font-display text-white tracking-tight">
                                        ARIEF MAULANA
                                    </span>
                                    <span className="text-xs font-mono text-gray-400 uppercase tracking-widest font-light">
                                        Fullstack Developer & AI Engineer
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-sm font-light">
                                Crafting reliable web applications, distributed APIs, and intelligent data systems from Bandung, Indonesia.
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-3 pt-2">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-blue-500/30 transition-all hover:-translate-y-1"
                                        aria-label={link.label}
                                    >
                                        <link.icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div>
                            <h3 className="text-white font-bold font-display text-xs mb-6 uppercase tracking-widest text-gray-400">Navigation</h3>
                            <nav className="flex flex-col gap-3">
                                {NAV_LINKS.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => scrollToSection(link.id)}
                                        className="text-gray-400 hover:text-blue-400 transition-colors text-left text-sm flex items-center gap-2 group w-fit font-light"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-blue-400 transition-colors" />
                                        {link.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h3 className="text-white font-bold font-display text-xs mb-6 uppercase tracking-widest text-gray-400">Direct Contact</h3>
                            <div className="space-y-4 text-sm font-light">
                                <div>
                                    <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1 font-mono">Email</span>
                                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-blue-300 font-mono text-sm hover:text-blue-200 transition-colors">
                                        {PERSONAL_INFO.email}
                                    </a>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-xs uppercase tracking-wider mb-1 font-mono">Base Station</span>
                                    <p className="text-gray-300 text-sm font-sans">{PERSONAL_INFO.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-gray-400 font-light">
                        <p>
                            © {currentYear} <ShinyText text="Arief Maulana" speed={4} />. All rights reserved.
                        </p>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group font-mono text-xs uppercase tracking-wider"
                        >
                            Back to Top
                            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform text-blue-400" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
