import React from 'react';
import { Translations, ImagePosition } from '../types';
import { useFadeIn } from './useFadeIn';
import { ImageControls } from './ImageControls';

interface AboutProps {
    t: Translations;
    aboutImageUrl: string;
    setAboutImageUrl: (url: string) => void;
    aboutImagePosition: ImagePosition;
    setAboutImagePosition: (position: ImagePosition) => void;
}

export const About: React.FC<AboutProps> = ({ t, aboutImageUrl, setAboutImageUrl, aboutImagePosition, setAboutImagePosition }) => {
    const { ref, style } = useFadeIn<HTMLElement>();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAboutImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <section id="about" className="py-20" ref={ref} style={style}>
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#4A2521] mb-6">{t.about_title}</h2>
                    <p className="mb-4 font-body">{t.about_p1}</p>
                    <p className="font-body">{t.about_p2}</p>
                </div>
                <div 
                    className="relative group rounded-lg shadow-2xl overflow-hidden aspect-video bg-cover bg-center"
                    style={{
                        backgroundImage: `url('${aboutImageUrl}')`,
                        backgroundPosition: `${aboutImagePosition.x}% ${aboutImagePosition.y}%`,
                        backgroundAttachment: 'fixed'
                    }}
                    role="img"
                    aria-label="Dra. Beleza na clínica"
                >
                    <div className="absolute top-5 right-5 z-10">
                        <ImageControls 
                            onImageChange={handleImageChange}
                            position={aboutImagePosition}
                            setPosition={setAboutImagePosition}
                            label="sobre nós"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};