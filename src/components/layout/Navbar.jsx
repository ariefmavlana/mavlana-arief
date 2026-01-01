import React, { useState, useEffect } from 'react'
import { Rocket, Menu, X, Sparkles } from 'lucide-react'
import { NAV_LINKS, PERSONAL_INFO } from '../../utils/constants'
import { scrollToSection, useScrollSpy } from '../../hooks/useScrollSpy'
import { motion } from 'framer-motion'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const activeSection = useScrollSpy(NAV_LINKS.map((link) => link.id))

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY >= 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleNavClick = (sectionId) => {
        scrollToSection(sectionId)
        setIsMenuOpen(false)
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 w-full py-4 transition-all duration-300 ${isScrolled
                ? 'bg-black/50 backdrop-blur-xl border-b border-white/5'
                : 'bg-transparent'
                }`}
        >
            <div className='max-w-[1320px] mx-auto px-5'>
                <div className="flex items-center justify-between">
                    {/* Logo - Space Themed */}
                    <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 group-hover:border-purple-400/50 transition-all duration-300">
                            <Rocket className='w-6 h-6 text-blue-400 group-hover:text-purple-400 transition-colors duration-300' />
                            <div className="absolute inset-0 bg-blue-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <span className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent bg-300% animate-gradient group-hover:opacity-80 transition-opacity'>
                            {PERSONAL_INFO.name.split(' ')[0]}
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNavClick(link.id)}
                                className={`text-sm font-medium transition-all duration-300 relative group px-2 py-1 ${activeSection === link.id
                                    ? 'text-cyan-400'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.label}
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                            </button>
                        ))}
                    </nav>

                    {/* CTA button */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={() => window.open(`https://wa.me/${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent("Hello Arief, I'm interested in working with you.")}`, '_blank')}
                            className='group relative px-6 py-2.5 rounded-full overflow-hidden transition-all duration-300 hover:scale-105'
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />

                            <div className="relative flex items-center gap-2 text-white font-medium text-sm">
                                <Sparkles className="w-4 h-4" />
                                <span>Hire Me</span>
                            </div>
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className='md:hidden p-2 text-gray-400 hover:text-white transition-colors relative'
                    >
                        {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu - Glassmorphism */}
            <div className={`md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-xl border-b border-white/5 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-5 py-8 flex flex-col gap-4 pb-12">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleNavClick(link.id)}
                            className={`text-lg font-medium transition-all duration-300 text-left px-4 py-2 rounded-lg ${activeSection === link.id
                                ? 'bg-white/5 text-blue-400'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
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
                        className='px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-base rounded-xl transition-all duration-300 shadow-lg shadow-blue-900/20'
                    >
                        Hire Me
                    </button>
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar