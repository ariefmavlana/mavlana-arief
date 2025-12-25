import React from 'react'
import { Code, Heart } from 'lucide-react'
import { PERSONAL_INFO, NAV_LINKS } from '../../utils/constants'
import { scrollToSection } from '../../hooks/useScrollSpy'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative py-12 border-t border-white/10 bg-black">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Code className="w-6 h-6 text-primary" />
                                <span className="text-xl font-bold text-white">
                                    {PERSONAL_INFO.name.split(' ')[0]}
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {PERSONAL_INFO.tagline}
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                            <nav className="flex flex-col gap-2">
                                {NAV_LINKS.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => scrollToSection(link.id)}
                                        className="text-gray-400 hover:text-primary transition-colors text-left text-sm"
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Contact</h3>
                            <div className="space-y-2 text-sm">
                                <p className="text-gray-400">{PERSONAL_INFO.email}</p>
                                <p className="text-gray-400">{PERSONAL_INFO.location}</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-white/10">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-gray-400 text-sm">
                                © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
                            </p>
                            <p className="text-gray-400 text-sm flex items-center gap-2">
                                Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using React & Tailwind CSS
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer