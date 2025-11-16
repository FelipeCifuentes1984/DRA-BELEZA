import React, { useState, useRef, useEffect } from 'react';
import { Translations } from '../types';
import { LocationIcon } from './icons';
import { useFadeIn } from './useFadeIn';

interface EventCardProps {
    t: Translations;
    eventTitle: string;
    eventDesc: string;
    location: string;
}

const EventCard: React.FC<EventCardProps> = ({ t, eventTitle, eventDesc, location }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const firstErrorRef = useRef<HTMLInputElement | null>(null);

    const validateForm = () => {
        const newErrors: { [key: string]: boolean } = {};
        firstErrorRef.current = null;
        if (!formData.name) newErrors.name = true;
        if (!formData.email) newErrors.email = true;
        if (!formData.phone) newErrors.phone = true;
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    useEffect(() => {
        if (Object.keys(errors).length > 0 && firstErrorRef.current) {
            firstErrorRef.current.focus();
        }
    }, [errors]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                if(status === 'error') setStatus('idle');
            }, 3000);
            return;
        }
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', phone: '' });
            setTimeout(() => setStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg text-[#5a2a22]">
            <div className="flex items-center mb-4">
                <LocationIcon className="w-6 h-6 mr-3 text-[#F28C7E]" />
                <h3 className="text-3xl font-bold text-[#4A2521]">{location}</h3>
            </div>
            <h4 className="text-2xl font-bold text-[#F28C7E] mb-3">{eventTitle}</h4>
            <p className="font-body mb-6">{eventDesc}</p>
            
            <h5 className="text-xl font-bold mb-4">{t.event_form_title}</h5>
            <form onSubmit={handleSubmit} className="space-y-4 font-body" noValidate>
                <div>
                    <label htmlFor={`event-name-${location}`} className="sr-only">{t.event_form_name}</label>
                    <input
                        ref={errors.name ? (el) => { if (!firstErrorRef.current) firstErrorRef.current = el; } : null}
                        id={`event-name-${location}`}
                        type="text"
                        name="name"
                        placeholder={t.event_form_name}
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full bg-transparent border-b-2 py-2 outline-none transition-colors ${errors.name ? 'border-red-500 placeholder-red-500' : 'border-gray-300 focus:border-[#F28C7E]'}`}
                        aria-invalid={errors.name ? "true" : "false"}
                    />
                </div>
                <div>
                    <label htmlFor={`event-email-${location}`} className="sr-only">{t.event_form_email}</label>
                    <input
                        ref={errors.email ? (el) => { if (!firstErrorRef.current) firstErrorRef.current = el; } : null}
                        id={`event-email-${location}`}
                        type="email"
                        name="email"
                        placeholder={t.event_form_email}
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-transparent border-b-2 py-2 outline-none transition-colors ${errors.email ? 'border-red-500 placeholder-red-500' : 'border-gray-300 focus:border-[#F28C7E]'}`}
                        aria-invalid={errors.email ? "true" : "false"}
                    />
                </div>
                 <div>
                    <label htmlFor={`event-phone-${location}`} className="sr-only">{t.event_form_phone}</label>
                    <input
                        ref={errors.phone ? (el) => { if (!firstErrorRef.current) firstErrorRef.current = el; } : null}
                        id={`event-phone-${location}`}
                        type="tel"
                        name="phone"
                        placeholder={t.event_form_phone}
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full bg-transparent border-b-2 py-2 outline-none transition-colors ${errors.phone ? 'border-red-500 placeholder-red-500' : 'border-gray-300 focus:border-[#F28C7E]'}`}
                        aria-invalid={errors.phone ? "true" : "false"}
                    />
                </div>

                <div className="h-8 text-sm pt-2">
                    {status === 'success' && <p className="text-green-600">{t.event_form_success_message}</p>}
                    {status === 'error' && <p className="text-red-500">{t.event_form_error_message}</p>}
                </div>
                
                <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-[#F28C7E] text-[#4A2521] font-bold py-3 px-6 rounded-full text-md hover:bg-opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                >
                    {status === 'sending' ? t.event_form_sending : t.event_form_button}
                </button>
            </form>
        </div>
    );
};

export const Events: React.FC<{ t: Translations }> = ({ t }) => {
    const { ref, style } = useFadeIn<HTMLElement>();
    return (
        <section id="events" className="py-20" ref={ref} style={style}>
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-[#4A2521] mb-12">{t.events_title}</h2>
                <div className="grid md:grid-cols-2 gap-12">
                    <EventCard 
                        t={t}
                        location="Madeira"
                        eventTitle={t.event_madeira_title}
                        eventDesc={t.event_madeira_desc}
                    />
                    <EventCard 
                        t={t}
                        location="Lisboa"
                        eventTitle={t.event_lisbon_title}
                        eventDesc={t.event_lisbon_desc}
                    />
                </div>
            </div>
        </section>
    );
};