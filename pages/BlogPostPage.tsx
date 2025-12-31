import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { getPostBySlug } from '../services/firebaseService';
import { BlogPost } from '../types';

interface BlogPostPageProps {
    slug: string;
    onNavigate: (page: string) => void;
}

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    },
};

export default function BlogPostPage({ slug, onNavigate }: BlogPostPageProps) {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPost();
    }, [slug]);

    const loadPost = async () => {
        if (!slug) return;
        setLoading(true);
        const data = await getPostBySlug(slug);
        setPost(data);
        setLoading(false);
    };

    const getEmbedUrl = (url: string) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.includes('youtu.be')
                ? url.split('/').pop()
                : new URLSearchParams(new URL(url).search).get('v');
            return `https://www.youtube.com/embed/${videoId}`;
        } else if (url.includes('vimeo.com')) {
            const videoId = url.split('/').pop();
            return `https://player.vimeo.com/video/${videoId}`;
        }
        return url;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-dark flex items-center justify-center pt-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-gold/20 border-t-brand-gold"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-brand-dark flex items-center justify-center pt-20">
                <div className="text-center">
                    <h1 className="text-4xl font-heading font-bold text-brand-light mb-4">Post não encontrado</h1>
                    <button
                        onClick={() => onNavigate('blog')}
                        className="text-brand-gold hover:text-brand-gold/80 font-body underline"
                    >
                        Voltar para o blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-dark pt-20">
            {/* Hero com imagem de capa */}
            <div className="relative h-96 bg-black">
                <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
                    <button
                        onClick={() => onNavigate('blog')}
                        className="text-brand-light flex items-center gap-2 mb-4 hover:text-brand-gold transition font-body"
                    >
                        ← Voltar
                    </button>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className={`inline-block px-3 py-1 text-sm font-bold font-body mb-4 ${post.category === 'Notícia'
                                ? 'bg-brand-gold text-brand-dark'
                                : 'bg-green-600 text-white'
                            }`}>
                            {post.category}
                        </span>
                        <h1 className="text-4xl sm:text-5xl font-heading font-bold text-brand-light mb-4">{post.title}</h1>
                        <div className="flex items-center gap-6 text-brand-light/90 font-body">
                            <div className="flex items-center gap-2">
                                <span>✍️ {post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>📅 {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Conteúdo principal */}
                    <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="bg-brand-dark/50 border border-brand-gold/20 rounded-sm shadow-lg p-8 mb-8"
                    >
                        <div className="prose prose-lg max-w-none">
                            {post.content.split('\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-4 text-brand-light/90 font-body leading-relaxed text-lg">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </motion.div>

                    {/* Vídeo */}
                    {post.videoUrl && (
                        <motion.div
                            variants={sectionVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="bg-brand-dark/50 border border-brand-gold/20 rounded-sm shadow-lg p-8 mb-8"
                        >
                            <h2 className="text-2xl font-heading font-bold text-brand-gold mb-4">Vídeo</h2>
                            <div className="aspect-video">
                                <iframe
                                    src={getEmbedUrl(post.videoUrl)}
                                    className="w-full h-full rounded-sm"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </motion.div>
                    )}

                    {/* Galeria de Imagens */}
                    {post.images && post.images.length > 0 && (
                        <motion.div
                            variants={sectionVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="bg-brand-dark/50 border border-brand-gold/20 rounded-sm shadow-lg p-8"
                        >
                            <h2 className="text-2xl font-heading font-bold text-brand-gold mb-6">Galeria de Fotos</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {post.images.map((image, idx) => (
                                    <div key={idx} className="relative group overflow-hidden rounded-sm border border-brand-gold/20">
                                        <img
                                            src={image}
                                            alt={`Galeria ${idx + 1}`}
                                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mt-8"
                        >
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-brand-dark border border-brand-gold/30 text-brand-light/80 rounded-sm text-sm font-body"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
