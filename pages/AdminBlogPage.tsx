import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPosts, createPost, updatePost, deletePost, uploadImage } from '../services/firebaseService';
import { BlogPost, BlogCategory } from '../types';
import Button from '../components/Button';

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [formData, setFormData] = useState<Omit<BlogPost, 'id'>>({
        title: '',
        slug: '',
        category: 'Notícia',
        content: '',
        coverImage: '',
        images: [],
        videoUrl: '',
        publishedAt: new Date().toISOString(),
        author: '',
        tags: []
    });
    const [uploadingImage, setUploadingImage] = useState(false);
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

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleTitleChange = (title: string) => {
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title)
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'gallery') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const imageUrl = await uploadImage(file);
            if (type === 'cover') {
                setFormData({ ...formData, coverImage: imageUrl });
            } else {
                setFormData({
                    ...formData,
                    images: [...(formData.images || []), imageUrl]
                });
            }
        } catch (error) {
            alert('Erro ao fazer upload da imagem.');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.content || !formData.coverImage || !formData.author) {
            alert('Preencha todos os campos obrigatórios.');
            return;
        }

        try {
            if (editingPost) {
                await updatePost({ ...formData, id: editingPost.id });
            } else {
                await createPost(formData);
            }
            setShowModal(false);
            resetForm();
            loadPosts();
        } catch (error) {
            alert('Erro ao salvar post.');
        }
    };

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        setFormData(post);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir este post?')) {
            try {
                await deletePost(id);
                loadPosts();
            } catch (error) {
                alert('Erro ao excluir post.');
            }
        }
    };

    const resetForm = () => {
        setEditingPost(null);
        setFormData({
            title: '',
            slug: '',
            category: 'Notícia',
            content: '',
            coverImage: '',
            images: [],
            videoUrl: '',
            publishedAt: new Date().toISOString(),
            author: '',
            tags: []
        });
    };

    const filteredPosts = selectedCategory === 'Todos'
        ? posts
        : posts.filter(p => p.category === selectedCategory);

    const inputStyles = "w-full bg-brand-dark border border-brand-gold/30 focus:border-brand-gold text-brand-light p-3 rounded-sm outline-none transition-colors";

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-8">
            <div className="flex justify-end mb-6">
                <Button onClick={() => {
                    resetForm();
                    setShowModal(true);
                }} variant="solid">
                    + Novo Post
                </Button>
            </div>

            {/* Filtros */}
            <div className="mb-6 flex gap-4 flex-wrap">
                <button
                    onClick={() => setSelectedCategory('Todos')}
                    className={`px-4 py-2 rounded-sm text-sm transition-colors ${selectedCategory === 'Todos'
                        ? 'bg-brand-gold text-brand-dark font-bold'
                        : 'bg-[#2A2A2A] border border-brand-gold/10 text-brand-light hover:border-brand-gold'
                        }`}
                >
                    Todos
                </button>
                <button
                    onClick={() => setSelectedCategory('Notícia')}
                    className={`px-4 py-2 rounded-sm text-sm transition-colors ${selectedCategory === 'Notícia'
                        ? 'bg-brand-gold text-brand-dark font-bold'
                        : 'bg-[#2A2A2A] border border-brand-gold/10 text-brand-light hover:border-brand-gold'
                        }`}
                >
                    Notícias
                </button>
                <button
                    onClick={() => setSelectedCategory('Evento Realizado')}
                    className={`px-4 py-2 rounded-sm text-sm transition-colors ${selectedCategory === 'Evento Realizado'
                        ? 'bg-brand-gold text-brand-dark font-bold'
                        : 'bg-[#2A2A2A] border border-brand-gold/10 text-brand-light hover:border-brand-gold'
                        }`}
                >
                    Eventos Realizados
                </button>
            </div>

            {/* Lista de Posts */}
            {loading ? (
                <p className="text-center text-brand-gold py-12">Carregando posts...</p>
            ) : filteredPosts.length === 0 ? (
                <p className="text-center text-brand-light/50 py-12">Nenhum post encontrado</p>
            ) : (
                <div className="grid gap-6">
                    {filteredPosts.map(post => (
                        <div key={post.id} className="bg-[#2A2A2A] border border-brand-gold/20 rounded-lg p-6 flex gap-6 hover:border-brand-gold/50 transition-colors">
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-48 h-32 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className={`text-xs px-2 py-1 rounded font-bold ${post.category === 'Notícia'
                                            ? 'bg-blue-600/20 text-blue-400'
                                            : 'bg-green-600/20 text-green-400'
                                            }`}>
                                            {post.category}
                                        </span>
                                        <h3 className="text-xl font-heading font-bold text-brand-gold mt-2">{post.title}</h3>
                                        <p className="text-sm text-brand-light/60 mt-1">
                                            Por {post.author} • {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                                        </p>
                                        <p className="text-brand-light/80 mt-2 line-clamp-2">{post.content}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(post)}
                                            className="text-brand-gold hover:text-brand-gold/80 text-xl p-2"
                                            title="Editar"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="text-red-500 hover:text-red-400 text-xl p-2"
                                            title="Excluir"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal de Criar/Editar */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-brand-dark border border-brand-gold rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6"
                    >
                        <h2 className="text-2xl font-heading font-bold text-brand-gold mb-6">
                            {editingPost ? 'Editar Post' : 'Novo Post'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-brand-gold text-sm font-bold mb-1">Título *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleTitleChange(e.target.value)}
                                    className={inputStyles}
                                    required
                                />
                                <p className="text-xs text-brand-light/40 mt-1">Slug: {formData.slug}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-brand-gold text-sm font-bold mb-1">Categoria *</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value as BlogCategory })}
                                        className={inputStyles}
                                        required
                                    >
                                        <option value="Notícia">Notícia</option>
                                        <option value="Evento Realizado">Evento Realizado</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-brand-gold text-sm font-bold mb-1">Autor *</label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        className={inputStyles}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-brand-gold text-sm font-bold mb-1">Imagem de Capa *</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'cover')}
                                    className={`${inputStyles} file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-brand-dark hover:file:bg-opacity-90`}
                                />
                                {formData.coverImage && (
                                    <img src={formData.coverImage} alt="Capa" className="mt-2 w-full h-48 object-cover rounded-lg border border-brand-gold/20" />
                                )}
                            </div>

                            <div>
                                <label className="block text-brand-gold text-sm font-bold mb-1">Conteúdo *</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    rows={8}
                                    className={inputStyles}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-brand-gold text-sm font-bold mb-1">Galeria de Imagens</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'gallery')}
                                    className={`${inputStyles} file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-brand-dark hover:file:bg-opacity-90`}
                                />
                                {formData.images && formData.images.length > 0 && (
                                    <div className="mt-2 grid grid-cols-4 gap-2">
                                        {formData.images.map((img, idx) => (
                                            <img key={idx} src={img} alt={`Galeria ${idx}`} className="w-full h-24 object-cover rounded border border-brand-gold/20" />
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-brand-gold text-sm font-bold mb-1">URL do Vídeo (YouTube ou Vimeo)</label>
                                <input
                                    type="url"
                                    value={formData.videoUrl}
                                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className={inputStyles}
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        resetForm();
                                    }}
                                    className="px-6 py-2 text-brand-light hover:text-white transition"
                                    disabled={uploadingImage}
                                >
                                    Cancelar
                                </button>
                                <Button type="submit" variant="solid" disabled={uploadingImage}>
                                    {uploadingImage ? 'Enviando...' : editingPost ? 'Atualizar' : 'Criar'}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}
