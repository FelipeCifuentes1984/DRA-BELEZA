import React, { useState } from 'react';
import { translations } from './constants/translations';
import { Language, ImagePosition } from './types';
import { Header, Hero, About, Services, Events, Contact, Footer, Chatbot } from './components';

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>('pt');

    // Hero Image State
    const [heroImageUrl, setHeroImageUrl] = useState<string>('https://i.imgur.com/K3wY5h6.jpeg');
    const [heroImagePosition, setHeroImagePosition] = useState<ImagePosition>({ x: 50, y: 50 });
    
    // About Image State
    const [aboutImageUrl, setAboutImageUrl] = useState<string>('https://images.unsplash.com/photo-1576091160550-2173dba9996a?q=80&w=2070&auto=format&fit=crop');
    const [aboutImagePosition, setAboutImagePosition] = useState<ImagePosition>({ x: 50, y: 30 });

    // Contact Image State
    const [contactImageUrl, setContactImageUrl] = useState<string>('https://images.unsplash.com/photo-1616394584738-FC6e6fb3e190?q=80&w=1935&auto=format&fit=crop');
    const [contactImagePosition, setContactImagePosition] = useState<ImagePosition>({ x: 50, y: 50 });

    const t = translations[language];

    return (
        <div className="antialiased">
            <Header t={t} setLanguage={setLanguage} language={language} />
            <main>
                <Hero 
                    t={t} 
                    heroImageUrl={heroImageUrl} 
                    setHeroImageUrl={setHeroImageUrl}
                    heroImagePosition={heroImagePosition}
                    setHeroImagePosition={setHeroImagePosition}
                />
                <About 
                    t={t}
                    aboutImageUrl={aboutImageUrl}
                    setAboutImageUrl={setAboutImageUrl}
                    aboutImagePosition={aboutImagePosition}
                    setAboutImagePosition={setAboutImagePosition}
                />
                <Services t={t} />
                <Events t={t} />
                <Contact 
                    t={t} 
                    contactImageUrl={contactImageUrl} 
                    setContactImageUrl={setContactImageUrl} 
                    contactImagePosition={contactImagePosition}
                    setContactImagePosition={setContactImagePosition}
                />
            </main>
            <Footer t={t} />
            <Chatbot t={t} />
        </div>
    );
};

export default App;