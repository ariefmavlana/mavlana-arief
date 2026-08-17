import React from 'react'
import { Github, Linkedin, Twitter, Instagram, ArrowUp } from 'lucide-react'
import { PERSONAL_INFO, NAV_LINKS, SOCIAL_LINKs } from '../../utils/constants'
import { scrollToSection } from '../../hooks/useScrollSpy'
import Particles from '../reactbits/Particles'
import ShinyText from '../reactbits/ShinyText'
import EnduranceStation from '../reactbits/EnduranceStation'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const socialLinks = [
        { icon: Github, url: SOCIAL_LINKs.github, label: 'GitHub' },
        { icon: Linkedin, url: SOCIAL_LINKs.linkedin, label: 'LinkedIn' },
        { icon: Twitter, url: SOCIAL_LINKs.x, label: 'X (Twitter)' },
        { icon: Instagram, url: SOCIAL_LINKs.instagram, label: 'Instagram' }
    ]

    return (
        <footer className="relative py-20 bg-black overflow-hidden font-sans border-t border-amber-500/20">
            {/* React Bits Ambient Background Particles */}
            <div className="absolute inset-0 bg-black z-0" />
            <Particles
                speed={0.1}
                particleColors={['#f59e0b', '#fbbf24', '#38bdf8']}
                moveParticlesOnHover={false}
                className="z-1 opacity-50"
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        {/* Brand */}
                        <div className="md:col-span-2 space-y-6">
                            <div
                                className="flex items-center gap-4 cursor-pointer group w-fit"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                <EnduranceStation size={40} />
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold font-mono text-white tracking-tight group-hover:text-amber-400 transition-colors">
                                        ARIEF MAULANA
                                    </span>
                                    <span className="text-xs font-mono text-amber-400/80 uppercase tracking-widest font-light">
                                        // FULLSTACK & AI ARCHITECT
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
                                        className="p-2.5 rounded-full bg-black/80 border border-amber-500/20 text-gray-400 hover:text-amber-300 hover:bg-amber-500/10 hover:border-amber-400/50 transition-all hover:-translate-y-1 shadow-[0_0_10px_rgba(245,158,11,0.1)]"
                                        aria-label={link.label}
                                    >
                                        <link.icon className="w-4 h-4" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div>
                            <h3 className="text-amber-400 font-bold font-mono text-xs mb-6 uppercase tracking-widest">[ SYSTEM INDEX ]</h3>
                            <nav className="flex flex-col gap-3 font-mono text-xs">
                                {NAV_LINKS.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => scrollToSection(link.id)}
                                        className="text-gray-400 hover:text-amber-400 transition-colors text-left flex items-center gap-2 group w-fit font-light"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-amber-500/40 group-hover:bg-amber-400 transition-colors" />
                                        {link.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h3 className="text-amber-400 font-bold font-mono text-xs mb-6 uppercase tracking-widest">[ TELEMETRY STATION ]</h3>
                            <div className="space-y-4 text-xs font-mono font-light">
                                <div>
                                    <span className="block text-cyan-400 text-[10px] uppercase tracking-wider mb-1">EMAIL SIGNAL</span>
                                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-gray-300 hover:text-amber-300 transition-colors">
                                        {PERSONAL_INFO.email}
                                    </a>
                                </div>
                                <div>
                                    <span className="block text-cyan-400 text-[10px] uppercase tracking-wider mb-1">BASE COORDINATES</span>
                                    <p className="text-gray-300">{PERSONAL_INFO.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-amber-500/15 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-400 font-light">
                        <p>
                            © {currentYear} <ShinyText text="Arief Maulana" speed={4} />. All rights reserved.
                        </p>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-colors group font-mono text-xs uppercase tracking-wider cursor-pointer"
                        >
                            Back to Top
                            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform text-amber-400" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

