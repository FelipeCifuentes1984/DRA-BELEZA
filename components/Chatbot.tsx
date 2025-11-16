import React, { useState, useRef, useEffect } from 'react';
import type { GoogleGenAI, Chat } from '@google/genai';
import { Translations } from '../types';
import { ChatIcon, CloseIcon, SendIcon, BotIcon } from './icons';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

const TypingIndicator = () => (
    <div className="flex items-center space-x-1 p-2">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
		<span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
		<span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
    </div>
);


export const Chatbot: React.FC<{ t: Translations }> = ({ t }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const chatRef = useRef<Chat | null>(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ sender: 'bot', text: t.chatbot_greeting }]);
        }
    }, [isOpen, t.chatbot_greeting, messages.length]);
    
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const getSystemInstruction = () => {
        const serviceTitles = t.services_list.map(s => s.title).join(', ');
        return `You are a friendly and professional virtual assistant for 'Dra. Beleza - Estética Regenerativa', a high-end aesthetic clinic. Your purpose is to answer questions about the clinic's services. The available services are: ${serviceTitles}. Provide concise, helpful, and encouraging answers. Do not provide medical advice. If asked about prices, appointments, or personal medical questions, gently guide the user to contact the clinic directly via phone, WhatsApp, or the contact form on the website. Always respond in the language of the user's question (Portuguese or English).`;
    };

    const initializeChat = async (): Promise<Chat> => {
        if (chatRef.current) return chatRef.current;
        
        try {
            const { GoogleGenAI } = await import('@google/genai');
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

            const chat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: { systemInstruction: getSystemInstruction() },
            });
            chatRef.current = chat;
            return chat;
        } catch (error) {
            console.error("Failed to initialize chat:", error);
            throw new Error("Could not initialize the virtual assistant. Please try again later.");
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = inputValue.trim();
        if (!trimmedInput || isLoading) return;

        setMessages(prev => [...prev, { sender: 'user', text: trimmedInput }]);
        setInputValue('');
        setIsLoading(true);

        try {
            const chat = await initializeChat();
            const response = await chat.sendMessage({ message: trimmedInput });
            setMessages(prev => [...prev, { sender: 'bot', text: response.text }]);
        } catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : t.chatbot_error;
            setMessages(prev => [...prev, { sender: 'bot', text: errorMessage }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 font-body">
            {/* Chat Window */}
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <div className="w-80 sm:w-96 h-[60vh] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200">
                    {/* Header */}
                    <div className="bg-[#4A2521] text-white p-4 flex justify-between items-center rounded-t-lg">
                        <h3 className="font-bold text-lg">{t.chatbot_title}</h3>
                        <button onClick={() => setIsOpen(false)} aria-label="Close chat">
                            <CloseIcon className="w-6 h-6 hover:text-[#F28C7E]" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-[#F28C7E] flex items-center justify-center flex-shrink-0"><BotIcon className="w-5 h-5 text-white" /></div>}
                                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-[#F28C7E] text-[#4A2521] rounded-br-none' : 'bg-gray-200 text-[#5a2a22] rounded-bl-none'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex items-end gap-2 justify-start">
                                <div className="w-8 h-8 rounded-full bg-[#F28C7E] flex items-center justify-center flex-shrink-0"><BotIcon className="w-5 h-5 text-white" /></div>
                                <div className="max-w-[80%] p-3 rounded-2xl bg-gray-200 rounded-bl-none">
                                    <TypingIndicator />
                                </div>
                            </div>
                        )}
                    </div>
                     <div className="text-xs text-center text-gray-400 p-2">{t.chatbot_disclaimer}</div>

                    {/* Input Form */}
                    <div className="p-4 border-t">
                        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={t.chatbot_placeholder}
                                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#F28C7E]"
                                aria-label="Chat input"
                            />
                            <button type="submit" disabled={isLoading || !inputValue.trim()} className="bg-[#4A2521] text-white p-3 rounded-full hover:bg-[#F28C7E] disabled:opacity-50 transition-colors">
                                <SendIcon className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* FAB */}
            <button onClick={() => setIsOpen(!isOpen)} className={`bg-[#4A2521] text-white p-4 rounded-full shadow-lg hover:bg-[#F28C7E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A2521] transition-transform transform hover:scale-110 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} aria-label="Open chat">
                <ChatIcon className="w-8 h-8" />
            </button>
        </div>
    );
};