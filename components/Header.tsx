import React, { useState, useEffect } from 'react';
import { Language, Translations } from '../types';
import { handleScrollLinkClick } from './useFadeIn';

interface HeaderProps {
    t: Translations;
    setLanguage: (lang: Language) => void;
    language: Language;
}

export const Header: React.FC<HeaderProps> = ({ t, setLanguage, language }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        handleScrollLinkClick(event);
        if (isOpen) {
            setIsOpen(false);
        }
    };

    const headerClasses = `fixed w-full top-0 z-50 p-4 font-body transition-colors duration-300 ${
        scrolled ? 'bg-[#4A2521] shadow-lg' : 'bg-transparent'
    }`;

    return (
        <header className={headerClasses}>
            <div className="container mx-auto flex justify-between items-center text-white">
                <a href="#home" onClick={handleNavClick} className="text-xl font-bold font-heading tracking-wider cursor-pointer">Dra. Beleza</a>
                <nav className="hidden md:flex items-center space-x-6">
                    <a href="#about" onClick={handleNavClick} className="hover:text-[#F28C7E] transition-colors cursor-pointer">{t.nav_about}</a>
                    <a href="#services" onClick={handleNavClick} className="hover:text-[#F28C7E] transition-colors cursor-pointer">{t.nav_services}</a>
                    <a href="#events" onClick={handleNavClick} className="hover:text-[#F28C7E] transition-colors cursor-pointer">{t.nav_events}</a>
                    <a href="#contact" onClick={handleNavClick} className="hover:text-[#F28C7E] transition-colors cursor-pointer">{t.nav_contact}</a>
                </nav>
                <div className="hidden md:flex items-center">
                    <button onClick={() => setLanguage('pt')} className={`px-2 py-1 text-sm ${language === 'pt' ? 'font-bold text-[#F28C7E]' : 'opacity-70'}`}>PT</button>
                    <span className="opacity-70">/</span>
                    <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-sm ${language === 'en' ? 'font-bold text-[#F28C7E]' : 'opacity-70'}`}>EN</button>
                </div>
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                </button>
            </div>
            {isOpen && (
                 <div className="md:hidden mt-4 text-center space-y-2 bg-[#4A2521] p-4 rounded-md">
                    <a href="#about" onClick={handleNavClick} className="block py-2 text-white hover:text-[#F28C7E] cursor-pointer">{t.nav_about}</a>
                    <a href="#services" onClick={handleNavClick} className="block py-2 text-white hover:text-[#F28C7E] cursor-pointer">{t.nav_services}</a>
                    <a href="#events" onClick={handleNavClick} className="block py-2 text-white hover:text-[#F28C7E] cursor-pointer">{t.nav_events}</a>
                    <a href="#contact" onClick={handleNavClick} className="block py-2 text-white hover:text-[#F28C7E] cursor-pointer">{t.nav_contact}</a>
                    <div className="flex justify-center items-center pt-2">
                        <button onClick={() => setLanguage('pt')} className={`px-2 py-1 text-sm ${language === 'pt' ? 'font-bold text-[#F28C7E]' : 'text-white opacity-70'}`}>PT</button>
                        <span className="text-white opacity-70">/</span>
                        <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-sm ${language === 'en' ? 'font-bold text-[#F28C7E]' : 'text-white opacity-70'}`}>EN</button>
                    </div>
                </div>
            )}
        </header>
    );
};