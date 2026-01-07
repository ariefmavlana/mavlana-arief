import React, { useState, useEffect } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import PixelRocket from '../ui/PixelRocket'
import { NAV_LINKS, PERSONAL_INFO } from '../../utils/constants'
import { scrollToSection, useScrollSpy } from '../../hooks/useScrollSpy'


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
        <nav
            className={`fixed top-0 left-0 right-0 z-50 flex justify-center py-4 transition-all duration-300 pointer-events-none`}
        >
            <div className={`pointer-events-auto transition-all duration-500 ${isScrolled
                ? 'w-[90%] md:w-fit px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl mt-2'
                : 'w-full max-w-[1320px] px-5 py-4 bg-transparent border-transparent'
                }`}>
                <div className="flex items-center justify-between gap-8">
                    {/* Logo - Modern */}
                    <div
                        className="flex items-center gap-3 group cursor-pointer"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <div className="relative flex items-center justify-center p-2 rounded-xl bg-linear-to-br from-blue-500/20 to-purple-500/20 border border-white/10 group-hover:bg-white/10 transition-colors duration-300">
                            <PixelRocket className='w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors' />
                        </div>

                        <span className='text-lg font-display font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors'>
                            {PERSONAL_INFO.name.split(' ')[0]}
                        </span>
                    </div>

                    {/* Desktop Navigation - Pill Style */}
                    <div className="hidden md:flex items-center bg-black/20 backdrop-blur-sm rounded-full p-1 border border-white/5">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNavClick(link.id)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${activeSection === link.id
                                    ? 'text-white bg-white/10 shadow-lg'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* CTA button - Modern Gradient */}
                    <div className="hidden md:flex items-center">
                        <button
                            onClick={() => window.open(`https://wa.me/${PERSONAL_INFO.whatsapp}?text=${encodeURIComponent("Hello Arief, I'm interested in working with you.")}`, '_blank')}
                            className='btn-primary text-sm px-5 py-2.5 !rounded-full shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Hire Me</span>
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className='md:hidden p-2 text-white rounded-full hover:bg-white/10 transition-colors'
                    >
                        {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu - Modern Glass */}
            <div className={`md:hidden absolute top-full left-0 right-0 p-4 transition-all duration-300 ${isMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl">
                    <div className="flex flex-col gap-2">
                        {NAV_LINKS.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNavClick(link.id)}
                                className={`text-lg font-display text-left px-4 py-3 rounded-xl transition-all ${activeSection === link.id
                                    ? 'bg-blue-600/20 text-blue-400'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
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
                            className='btn-primary w-full justify-center !rounded-xl'
                        >
                            Hire Me
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
