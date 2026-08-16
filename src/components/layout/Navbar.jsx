import React, { useState, useEffect } from 'react'
import { Menu, X, Sparkles, Orbit, Radio } from 'lucide-react'
import { NAV_LINKS, PERSONAL_INFO } from '../../utils/constants'
import { scrollToSection, useScrollSpy } from '../../hooks/useScrollSpy'
import ShinyText from '../reactbits/ShinyText'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const activeSection = useScrollSpy(NAV_LINKS.map((link) => link.id))

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY >= 40)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleNavClick = (sectionId) => {
        scrollToSection(sectionId)
        setIsMenuOpen(false)
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-3 sm:py-4 transition-all duration-300 pointer-events-none">
            <div className={`pointer-events-auto transition-all duration-500 ${isScrolled
                ? 'w-[94%] sm:w-[92%] md:w-fit px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-full shadow-[0_0_35px_rgba(59,130,246,0.2)] mt-1 sm:mt-2'
                : 'w-full max-w-[1320px] px-4 sm:px-5 py-3 sm:py-4 bg-transparent border-transparent'
                }`}>
                <div className="flex items-center justify-between gap-4 sm:gap-8">
                    {/* Logo */}
                    <div
                        className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <div className="relative flex items-center justify-center p-1.5 sm:p-2 rounded-xl bg-linear-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/15 group-hover:bg-white/10 transition-all duration-300 group-hover:scale-105">
                            <Orbit className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover:text-purple-300 transition-colors" />
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm sm:text-base md:text-lg font-display font-bold text-white tracking-tight leading-none group-hover:text-blue-400 transition-colors">
                                MAVLANA
                            </span>
                            <span className="text-[9px] sm:text-[10px] font-mono text-gray-400 tracking-wider uppercase font-light">
                                Fullstack & AI
                            </span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center bg-black/40 backdrop-blur-md rounded-full p-1 border border-white/10">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNavClick(link.id)}
                                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 relative font-sans cursor-pointer ${activeSection === link.id
                                    ? 'text-white bg-white/15 shadow-md border border-white/10'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* CTA Button Desktop */}
                    <div className="hidden md:flex items-center">
                        <button
                            onClick={() => window.open(`https://wa.me/${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent("Hello Arief, I'm interested in working with you.")}`, '_blank')}
                            className="group relative px-5 py-2.5 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full text-xs font-medium transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center gap-2 cursor-pointer"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <ShinyText text="Hire Me" speed={3} className="text-white" />
                        </button>
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-white rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-blue-400" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <div className={`md:hidden absolute top-full left-0 right-0 px-4 pt-2 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <div className="bg-black/95 backdrop-blur-3xl border border-white/15 rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-2xl rounded-full pointer-events-none" />

                    {/* Mobile Drawer Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Orbital Navigation</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">ONLINE</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNavClick(link.id)}
                                className={`text-sm font-display text-left px-4 py-3 rounded-2xl transition-all flex items-center justify-between ${activeSection === link.id
                                    ? 'bg-linear-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30 font-semibold'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <span>{link.label}</span>
                                {activeSection === link.id && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
                                )}
                            </button>
                        ))}

                        <div className="h-px bg-white/10 my-2" />

                        <button
                            onClick={() => {
                                window.open(`https://wa.me/${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent("Hello Arief, I'm interested in working with you.")}`, '_blank')
                                setIsMenuOpen(false)
                            }}
                            className="w-full py-3.5 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl font-medium text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.4)] active:scale-98 transition-all"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span className="font-display font-semibold">Initiate Work Request</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
