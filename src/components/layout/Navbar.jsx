import React, { useState, useEffect } from 'react'
import { Menu, X, Sparkles, Orbit } from 'lucide-react'
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
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 transition-all duration-300 pointer-events-none">
            <div className={`pointer-events-auto transition-all duration-500 ${isScrolled
                ? 'w-[92%] md:w-fit px-6 md:px-8 py-3 bg-black/70 backdrop-blur-2xl border border-white/15 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.15)] mt-2'
                : 'w-full max-w-[1320px] px-5 py-4 bg-transparent border-transparent'
                }`}>
                <div className="flex items-center justify-between gap-8">
                    {/* Logo */}
                    <div
                        className="flex items-center gap-3 group cursor-pointer"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <div className="relative flex items-center justify-center p-2 rounded-xl bg-linear-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-white/15 group-hover:bg-white/10 transition-all duration-300 group-hover:scale-105">
                            <Orbit className="w-5 h-5 text-blue-400 group-hover:text-purple-300 transition-colors" />
                        </div>

                        <div className="flex flex-col">
                            <span className="text-base md:text-lg font-display font-bold text-white tracking-tight leading-none group-hover:text-blue-400 transition-colors">
                                MAVLANA
                            </span>
                            <span className="text-[10px] font-mono text-gray-400 tracking-wider uppercase font-light">
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
                                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 relative font-sans ${activeSection === link.id
                                    ? 'text-white bg-white/15 shadow-md border border-white/10'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center">
                        <button
                            onClick={() => window.open(`https://wa.me/${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent("Hello Arief, I'm interested in working with you.")}`, '_blank')}
                            className="group relative px-5 py-2.5 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full text-xs font-medium transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center gap-2"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <ShinyText text="Hire Me" speed={3} className="text-white" />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-white rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 right-0 p-4 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <div className="bg-black/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-5 shadow-2xl">
                    <div className="flex flex-col gap-2">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNavClick(link.id)}
                                className={`text-base font-display text-left px-4 py-3 rounded-xl transition-all ${activeSection === link.id
                                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </button>
                        ))}

                        <div className="h-px bg-white/10 my-2" />

                        <button
                            onClick={() => {
                                window.open(`https://wa.me/${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent("Hello Arief, I'm interested in working with you.")}`, '_blank')
                                setIsMenuOpen(false)
                            }}
                            className="w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 shadow-lg"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Hire Me</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
