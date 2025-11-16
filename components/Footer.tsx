import React from 'react';
import { Translations } from '../types';
import { InstagramIcon, FacebookIcon } from './icons';

export const Footer: React.FC<{ t: Translations }> = ({ t }) => (
    <footer className="bg-[#5a2a22] text-white py-8">
        <div className="container mx-auto px-6 text-center">
            <div className="flex justify-center space-x-6 mb-4">
                <a href="https://www.instagram.com/drabeleza.pt?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="hover:text-[#F28C7E] transition-colors"><InstagramIcon className="w-7 h-7" /></a>
                <a href="#" onClick={(e) => e.preventDefault()} title={t.footer_facebook_soon} className="opacity-50 cursor-not-allowed"><FacebookIcon className="w-7 h-7" /></a>
            </div>
            <p className="font-body text-sm opacity-80">&copy; {new Date().getFullYear()} {t.footer_text}</p>
        </div>
    </footer>
);