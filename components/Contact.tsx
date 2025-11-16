import React, { useState, useRef, useEffect } from 'react';
import { Translations, ImagePosition } from '../types';
import { PhoneIcon, EmailIcon, WhatsAppIcon } from './icons';
import { useFadeIn } from './useFadeIn';
import { ImageControls } from './ImageControls';

interface ContactProps {
    t: Translations;
    contactImageUrl: string;
    setContactImageUrl: (url: string) => void;
    contactImagePosition: ImagePosition;
    setContactImagePosition: (position: ImagePosition) => void;
}

export const Contact: React.FC<ContactProps> = ({ t, contactImageUrl, setContactImageUrl, contactImagePosition, setContactImagePosition }) => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const firstErrorRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
    const { ref, style } = useFadeIn<HTMLElement>();
    
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setContactImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: boolean } = {};
        firstErrorRef.current = null;
        if (!formData.name) newErrors.name = true;
        if (!formData.email) newErrors.email = true;
        if (!formData.subject) newErrors.subject = true;
        if (!formData.message) newErrors.message = true;
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        if (Object.keys(errors).length > 0 && firstErrorRef.current) {
            firstErrorRef.current.focus();
        }
    }, [errors]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: false }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            setStatus('error');
            setTimeout(() => {
                if (status === 'error') setStatus('idle');
            }, 3000);
            return;
        }
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-20 bg-[#4A2521] text-white" ref={ref} style={style}>
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.contact_title}</h2>
                    <p className="max-w-2xl mx-auto font-body">{t.contact_intro}</p>
                </div>
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div 
                        className="relative group rounded-lg shadow-2xl overflow-hidden aspect-video bg-cover bg-center"
                        style={{
                            backgroundImage: `url('${contactImageUrl}')`,
                            backgroundPosition: `${contactImagePosition.x}% ${contactImagePosition.y}%`,
                            backgroundAttachment: 'fixed'
                        }}
                        role="img"
                        aria-label="Interior da Clínica Dra. Beleza"
                    >
                        <div className="absolute top-5 right-5 z-10">
                            <ImageControls 
                                onImageChange={handleImageChange}
                                position={contactImagePosition}
                                setPosition={setContactImagePosition}
                                label="contacto"
                            />
                        </div>
                    </div>
                    <div>
                         <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-8 mb-10 font-body text-center sm:text-left">
                            <a href="tel:+351912345678" className="flex items-center space-x-4 hover:text-[#F28C7E] transition-colors group">
                                <PhoneIcon className="w-8 h-8 text-[#F28C7E] flex-shrink-0" />
                                <div>
                                    <p className="font-bold">Telefone</p>
                                    <p className="group-hover:underline text-sm">+351 912 345 678</p>
                                </div>
                            </a>
                            <a href="mailto:geral@drabeleza.pt" className="flex items-center space-x-4 hover:text-[#F28C7E] transition-colors group">
                                <EmailIcon className="w-8 h-8 text-[#F28C7E] flex-shrink-0" />
                                <div>
                                    <p className="font-bold">Email</p>
                                    <p className="group-hover:underline text-sm">geral@drabeleza.pt</p>
                                </div>
                            </a>
                            <a href="https://wa.me/351912345678" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 hover:text-[#F28C7E] transition-colors group">
                                <WhatsAppIcon className="w-8 h-8 text-[#F28C7E] flex-shrink-0" />
                                <div>
                                    <p className="font-bold">WhatsApp</p>
                                    <p className="group-hover:underline text-sm">Iniciar Conversa</p>
                                </div>
                            </a>
                        </div>

                        <h3 className="text-3xl font-bold mb-6 text-center lg:text-left">{t.contact_form_title}</h3>
                        <form onSubmit={handleSubmit} className="space-y-6 font-body" noValidate>
                            <div>
                                <label htmlFor="contact-name" className="sr-only">{t.contact_form_name}</label>
                                <input
                                    ref={errors.name ? (el) => { if (!firstErrorRef.current) firstErrorRef.current = el; } : null}
                                    id="contact-name"
                                    type="text"
                                    name="name"
                                    placeholder={t.contact_form_name}
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full bg-transparent border-b-2 py-2 outline-none transition-colors ${errors.name ? 'border-red-400 placeholder-red-400' : 'border-gray-500 focus:border-[#F28C7E]'}`}
                                    aria-invalid={errors.name ? "true" : "false"}
                                />
                            </div>
                            <div>
                                <label htmlFor="contact-email" className="sr-only">{t.contact_form_email}</label>
                                <input
                                    ref={errors.email ? (el) => { if (!firstErrorRef.current) firstErrorRef.current = el; } : null}
                                    id="contact-email"
                                    type="email"
                                    name="email"
                                    placeholder={t.contact_form_email}
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full bg-transparent border-b-2 py-2 outline-none transition-colors ${errors.email ? 'border-red-400 placeholder-red-400' : 'border-gray-500 focus:border-[#F28C7E]'}`}
                                    aria-invalid={errors.email ? "true" : "false"}
                                />
                            </div>
                           <div>
                                <label htmlFor="contact-subject" className="sr-only">{t.contact_form_subject}</label>
                                <input
                                    ref={errors.subject ? (el) => { if (!firstErrorRef.current) firstErrorRef.current = el; } : null}
                                    id="contact-subject"
                                    type="text"
                                    name="subject"
                                    placeholder={t.contact_form_subject}
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={`w-full bg-transparent border-b-2 py-2 outline-none transition-colors ${errors.subject ? 'border-red-400 placeholder-red-400' : 'border-gray-500 focus:border-[#F28C7E]'}`}
                                    aria-invalid={errors.subject ? "true" : "false"}
                                />
                           </div>
                            <div>
                                <label htmlFor="contact-message" className="sr-only">{t.contact_form_message}</label>
                                <textarea
                                    ref={errors.message ? (el) => { if (!firstErrorRef.current) firstErrorRef.current = el as HTMLTextAreaElement; } : null}
                                    id="contact-message"
                                    name="message"
                                    placeholder={t.contact_form_message}
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`w-full bg-transparent border-b-2 py-2 outline-none transition-colors ${errors.message ? 'border-red-400 placeholder-red-400' : 'border-gray-500 focus:border-[#F28C7E]'}`}
                                    aria-invalid={errors.message ? "true" : "false"}
                                ></textarea>
                            </div>
                            
                            <div className="h-10 text-sm">
                                {status === 'success' && <p className="text-green-300">{t.contact_form_success_message}</p>}
                                {status === 'error' && Object.keys(errors).length > 0 && <p className="text-red-400">{t.contact_form_error_message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full bg-[#F28C7E] text-[#4A2521] font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                            >
                                {status === 'sending' ? t.contact_form_sending : t.contact_form_button}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};