import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getEventBySlug } from '../services/firebaseService';
import { ChurchEvent } from '../types';

interface EventDetailPageProps {
    slug: string;
    onNavigate: (page: string) => void;
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ slug, onNavigate }) => {
    const [event, setEvent] = useState<ChurchEvent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true);
            const fetchedEvent = await getEventBySlug(slug);
            setEvent(fetchedEvent);
            setLoading(false);
        };
        fetchEvent();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-dark flex items-center justify-center pt-24">
                <p className="text-brand-gold text-xl">Carregando evento...</p>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center pt-24 px-4">
                <h1 className="text-4xl font-heading font-bold text-brand-gold mb-4">Evento não encontrado</h1>
                <p className="text-brand-light/70 mb-8">O evento que você está procurando não existe ou foi removido.</p>
                <button
                    onClick={() => onNavigate('home')}
                    className="px-6 py-3 bg-brand-gold text-brand-dark font-bold rounded-sm hover:bg-opacity-90 transition"
                >
                    Voltar para Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-dark pt-24 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => onNavigate('home')}
                    className="flex items-center gap-2 text-brand-gold hover:text-brand-gold/80 transition mb-8 group"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-body font-medium">Voltar para Eventos</span>
                </motion.button>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full h-96 rounded-lg overflow-hidden mb-8 shadow-2xl"
                >
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
                </motion.div>

                {/* Event Content */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-brand-dark/50 border border-brand-gold/20 rounded-lg p-8 sm:p-12"
                >
                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl font-heading font-bold text-brand-gold mb-6 leading-tight">
                        {event.title}
                    </h1>

                    {/* Date and Time */}
                    <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-brand-gold/20">
                        <div className="flex items-center gap-3">
                            <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <div>
                                <p className="text-xs text-brand-light/50 uppercase tracking-wider">Data</p>
                                <p className="text-brand-light font-body font-medium">{new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <p className="text-xs text-brand-light/50 uppercase tracking-wider">Horário</p>
                                <p className="text-brand-light font-body font-medium">{event.time}</p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="prose prose-invert max-w-none">
                        <p className="text-brand-light/90 text-lg leading-relaxed whitespace-pre-wrap">
                            {event.description}
                        </p>
                    </div>

                    {/* Share Button (Optional) */}
                    <div className="mt-12 pt-8 border-t border-brand-gold/20 flex justify-center">
                        <button
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: event.title,
                                        text: event.description,
                                        url: window.location.href
                                    });
                                } else {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Link copiado para a área de transferência!');
                                }
                            }}
                            className="flex items-center gap-2 px-6 py-3 bg-brand-gold/10 border border-brand-gold/30 text-brand-gold rounded-sm hover:bg-brand-gold/20 transition"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            <span className="font-body font-medium">Compartilhar Evento</span>
                        </button>
                    </div>
                </motion.article>
            </div>
        </div>
    );
};

export default EventDetailPage;
