import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { getPosts } from '../services/firebaseService';
import { BlogPost, BlogCategory } from '../types';

interface BlogPageProps {
    onNavigate: (page: string) => void;
}

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function BlogPage({ onNavigate }: BlogPageProps) {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'Todos'>('Todos');

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        setLoading(true);
        const data = await getPosts();
        setPosts(data);
        setLoading(false);
    };

    const filteredPosts = selectedCategory === 'Todos'
        ? posts
        : posts.filter(p => p.category === selectedCategory);

    return (
        <div className="pt-20 bg-brand-dark min-h-screen">
            {/* Hero Section */}
            <section className="relative py-28 sm:py-32 md:py-40 text-center bg-brand-dark flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
                <img
                    src="https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Blog background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <motion.div
                    className="relative z-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-brand-light">
                        Blog IEAM
                    </h1>
                    <p className="font-body text-base sm:text-lg md:text-xl text-brand-gold mt-2">
                        Notícias e eventos da nossa igreja
                    </p>
                </motion.div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Filtros */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex gap-4 mb-12 justify-center flex-wrap"
                >
                    <button
                        onClick={() => setSelectedCategory('Todos')}
                        className={`px-6 py-3 rounded-sm font-body font-medium transition ${selectedCategory === 'Todos'
                                ? 'bg-brand-gold text-brand-dark'
                                : 'bg-brand-dark border border-brand-gold/30 text-brand-light hover:bg-brand-gold/10 hover:border-brand-gold'
                            }`}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setSelectedCategory('Notícia')}
                        className={`px-6 py-3 rounded-sm font-body font-medium transition ${selectedCategory === 'Notícia'
                                ? 'bg-brand-gold text-brand-dark'
                                : 'bg-brand-dark border border-brand-gold/30 text-brand-light hover:bg-brand-gold/10 hover:border-brand-gold'
                            }`}
                    >
                        Notícias
                    </button>
                    <button
                        onClick={() => setSelectedCategory('Evento Realizado')}
                        className={`px-6 py-3 rounded-sm font-body font-medium transition ${selectedCategory === 'Evento Realizado'
                                ? 'bg-brand-gold text-brand-dark'
                                : 'bg-brand-dark border border-brand-gold/30 text-brand-light hover:bg-brand-gold/10 hover:border-brand-gold'
                            }`}
                    >
                        Eventos Realizados
                    </button>
                </motion.div>

                {/* Lista de Posts */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-gold/20 border-t-brand-gold"></div>
                        <p className="mt-4 text-brand-light/60 font-body">Carregando posts...</p>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-xl text-brand-light/60 font-body">Nenhum post encontrado</p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-brand-dark/50 border border-brand-gold/20 rounded-sm overflow-hidden shadow-lg hover:shadow-2xl hover:border-brand-gold/50 transition-all duration-300 cursor-pointer group"
                                onClick={() => onNavigate(`blog/${post.slug}`)}
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={post.coverImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold font-body ${post.category === 'Notícia'
                                            ? 'bg-brand-gold text-brand-dark'
                                            : 'bg-green-600 text-white'
                                        }`}>
                                        {post.category}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h2 className="text-2xl font-heading font-bold mb-3 text-brand-gold group-hover:text-brand-gold/80 transition">
                                        {post.title}
                                    </h2>
                                    <p className="text-brand-light/80 font-body mb-4 line-clamp-3">
                                        {post.content}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-brand-light/60 font-body">
                                        <div className="flex items-center gap-1">
                                            <span>✍️ {post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>📅 {new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
