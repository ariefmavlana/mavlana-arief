import React, { useState, useEffect } from 'react'
import { Menu, X, Sparkles, Orbit, Radio } from 'lucide-react'
import { NAV_LINKS, PERSONAL_INFO } from '../../utils/constants'
import { scrollToSection, useScrollSpy } from '../../hooks/useScrollSpy'
import ShinyText from '../reactbits/ShinyText'
import Magnet from '../reactbits/Magnet'
import ClickSpark from '../reactbits/ClickSpark'
import DecryptedText from '../reactbits/DecryptedText'

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
                ? 'w-[94%] sm:w-[92%] md:w-fit px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-black/85 backdrop-blur-2xl border border-amber-500/25 rounded-full shadow-[0_0_35px_rgba(245,158,11,0.15)] mt-1 sm:mt-2'
                : 'w-full max-w-[1320px] px-4 sm:px-5 py-3 sm:py-4 bg-transparent border-transparent'
                }`}>
                <div className="flex items-center justify-between gap-4 sm:gap-8">
                    {/* Logo with Magnet */}
                    <Magnet magnetStrength={3} padding={40}>
                        <div
                            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <div className="relative flex items-center justify-center p-1.5 sm:p-2 rounded-xl bg-black/60 border border-amber-500/30 group-hover:border-amber-400 transition-all duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                                <Orbit className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:text-cyan-300 transition-colors animate-spin-slow" />
                            </div>

                            <div className="flex flex-col">
                                <span className="text-sm sm:text-base md:text-lg font-display font-bold text-white tracking-tight leading-none group-hover:text-amber-300 transition-colors">
                                    <DecryptedText text="MAVLANA" animateOn="hover" speed={40} maxIterations={8} />
                                </span>
                                <span className="text-[9px] sm:text-[10px] font-mono text-amber-400/80 tracking-widest uppercase font-light flex items-center gap-1 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                                    ENDURANCE • SYS
                                </span>
                            </div>
                        </div>
                    </Magnet>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center bg-black/60 backdrop-blur-md rounded-full p-1 border border-amber-500/20">
                        {NAV_LINKS.map((link) => (
                            <Magnet key={link.id} magnetStrength={5} padding={20}>
                                <button
                                    onClick={() => handleNavClick(link.id)}
                                    className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-all duration-300 relative cursor-pointer ${activeSection === link.id
                                        ? 'text-amber-300 bg-amber-500/15 shadow-md border border-amber-500/40 font-semibold'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {link.label}
                                </button>
                            </Magnet>
                        ))}
                    </div>

                    {/* CTA Button Desktop with ClickSpark + Magnet */}
                    <div className="hidden md:flex items-center">
                        <Magnet magnetStrength={2} padding={60}>
                            <ClickSpark sparkColor="#f59e0b" sparkCount={10}>
                                <button
                                    onClick={() => window.open(`https://wa.me/${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent("Hello Arief, I'm interested in working with you.")}`, '_blank')}
                                    className="group relative px-5 py-2.5 bg-linear-to-r from-amber-500 via-orange-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-black rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] flex items-center gap-2 cursor-pointer"
                                >
                                    <Sparkles className="w-3.5 h-3.5 text-black" />
                                    <ShinyText text="Initiate Contact" speed={3} className="text-black font-bold" />
                                </button>
                            </ClickSpark>
                        </Magnet>
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-white rounded-full bg-black/60 border border-amber-500/30 hover:bg-amber-500/10 transition-all active:scale-95"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-cyan-400" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <div className={`md:hidden absolute top-full left-0 right-0 px-4 pt-2 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <div className="bg-black/95 backdrop-blur-3xl border border-amber-500/30 rounded-3xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.9)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-2xl rounded-full pointer-events-none" />

                    {/* Mobile Drawer Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-500/20">
                        <div className="flex items-center gap-2">
                            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">ENDURANCE TELEMETRY</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">OPERATIONAL</span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNavClick(link.id)}
                                className={`text-sm font-mono text-left px-4 py-3 rounded-2xl transition-all flex items-center justify-between ${activeSection === link.id
                                    ? 'bg-linear-to-r from-amber-500/20 to-cyan-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <span>{link.label}</span>
                                {activeSection === link.id && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                                )}
                            </button>
                        ))}

                        <div className="h-px bg-amber-500/20 my-2" />

                        <ClickSpark sparkColor="#f59e0b" sparkCount={10}>
                            <button
                                onClick={() => {
                                    window.open(`https://wa.me/${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent("Hello Arief, I'm interested in working with you.")}`, '_blank')
                                    setIsMenuOpen(false)
                                }}
                                className="w-full py-3.5 bg-linear-to-r from-amber-500 via-orange-500 to-cyan-500 text-black rounded-2xl font-mono font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-98 transition-all uppercase tracking-wider"
                            >
                                <Sparkles className="w-4 h-4 text-black" />
                                <span>Initiate Work Protocol</span>
                            </button>
                        </ClickSpark>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
