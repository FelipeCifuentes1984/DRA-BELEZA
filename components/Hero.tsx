import React from 'react';
import { Translations, ImagePosition } from '../types';
import { ChevronDownIcon } from './icons';
import { ImageControls } from './ImageControls';
import { handleScrollLinkClick } from './useFadeIn';

interface HeroProps {
    t: Translations;
    heroImageUrl: string;
    setHeroImageUrl: (url: string) => void;
    heroImagePosition: ImagePosition;
    setHeroImagePosition: (position: ImagePosition) => void;
}

export const Hero: React.FC<HeroProps> = ({ t, heroImageUrl, setHeroImageUrl, heroImagePosition, setHeroImagePosition }) => {
    
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHeroImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <section 
            id="home"
            className="group relative min-h-screen flex items-center justify-center text-center text-white bg-cover transition-all duration-500" 
            style={{ 
                backgroundImage: `url('${heroImageUrl}')`,
                backgroundPosition: `${heroImagePosition.x}% ${heroImagePosition.y}%`,
                backgroundAttachment: 'fixed'
            }}>
            <div className="absolute inset-0 bg-black opacity-40"></div>
            
            <div className="absolute top-24 right-5 md:top-20 md:right-5 z-20">
                <ImageControls 
                    onImageChange={handleImageChange}
                    position={heroImagePosition}
                    setPosition={setHeroImagePosition}
                    label="principal"
                />
            </div>

            <div className="relative z-10 p-4">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4">{t.hero_title}</h1>
                <p className="text-lg md:text-2xl max-w-2xl mx-auto font-body">{t.hero_subtitle}</p>
                <a 
                    href="#contact" 
                    onClick={handleScrollLinkClick}
                    className="mt-8 inline-block bg-[#F28C7E] text-[#5a2a22] font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105 font-body cursor-pointer">
                    {t.hero_cta}
                </a>
            </div>
            <a 
                href="#about" 
                onClick={handleScrollLinkClick}
                aria-label="Scroll down" 
                className="absolute bottom-10 animate-bounce cursor-pointer z-10">
                <ChevronDownIcon className="w-10 h-10 text-white"/>
            </a>
        </section>
    );
};