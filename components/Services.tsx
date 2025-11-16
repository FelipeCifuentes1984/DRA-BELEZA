import React from 'react';
import { Translations } from '../types';
import { FacialIcon, LaserIcon, CollagenIcon, PeelIcon, MesoIcon, SkincareIcon } from './icons';
import { useFadeIn } from './useFadeIn';

const iconMap: { [key: string]: React.ReactNode } = {
    "Harmonização Facial": <FacialIcon className="w-12 h-12 mx-auto mb-4 text-[#F28C7E]" />,
    "Facial Harmonization": <FacialIcon className="w-12 h-12 mx-auto mb-4 text-[#F28C7E]" />,
    "Tratamentos a Laser": <LaserIcon className="w-12 h-12 mx-auto mb-4 text-[#F28C7E]" />,
    "Laser Treatments": <LaserIcon className="w-12 h-12 mx-auto mb-4 text-[#F28C7E]" />,
    "Bioestimuladores de Colagénio": <CollagenIcon className="w-12 h-12 mx-auto mb-4 text-[#F28C7E]" />,
    "Collagen Biostimulators": <CollagenIcon className="w-12 h-12 mx-auto mb-4 text-[#F28C7E]" />,
    "Peelings Químicos": <PeelIcon className="w-12 h-12 mx-auto mb-4 text-[#F28C7E]" />,
    "Chemical Peels": <PeelIcon className="w-12 h-12 mx-auto mb-4 text-[#F28C7E]" />,
    "Mesoterapia": <MesoIcon className="w-12 h-12 mx-auto mb-4 text-[#F28C7E]" />,
    "Mesotherapy": <MesoIcon className="w-12 h-12 mx-auto mb-4 text-[#F28C7E]" />,
    "Cuidados de Rosto Avançados": <SkincareIcon className="w-12 h-12 mx-auto mb-4 text-[#F28C7E]" />,
    "Advanced Facials": <SkincareIcon className="w-12 h-12 mx-auto mb-4 text-[#F28C7E]" />,
};

export const Services: React.FC<{ t: Translations }> = ({ t }) => {
    const { ref, style } = useFadeIn<HTMLElement>();

    return (
        <section id="services" className="py-20 bg-white" ref={ref} style={style}>
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-[#4A2521] mb-12">{t.services_title}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {t.services_list.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                            {iconMap[service.title] || <div className="w-12 h-12 mx-auto mb-4"></div>}
                            <h3 className="text-2xl font-bold text-[#F28C7E] mb-3">{service.title}</h3>
                            <p className="font-body">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};