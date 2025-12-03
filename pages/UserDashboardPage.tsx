import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getMemberByUserId, updateMemberProfile, uploadImage, createMember } from '../services/firebaseService';
import { Member } from '../types';
import { auth } from '../services/firebaseConfig';
import Button from '../components/Button';

const UserDashboardPage: React.FC = () => {
    const [member, setMember] = useState<Member | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form states
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchMemberData = async () => {
            const user = auth.currentUser;
            if (user) {
                let memberData = await getMemberByUserId(user.uid);

                // If member doesn't exist (e.g. created before migration), create it
                if (!memberData) {
                    const newMember: Omit<Member, 'id'> = {
                        uid: user.uid,
                        name: user.displayName || user.email?.split('@')[0] || 'Usuário',
                        email: user.email || '',
                        role: 'Membro',
                        photo: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || 'User')}&background=random`
                    };
                    try {
                        memberData = await createMember(newMember);
                    } catch (e) {
                        console.error("Error auto-creating profile:", e);
                    }
                }

                if (memberData) {
                    setMember(memberData);
                    setName(memberData.name);
                    setPhone(memberData.phone || '');
                }
            }
            setLoading(false);
        };

        fetchMemberData();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!member || !auth.currentUser) return;

        setSaving(true);
        try {
            let photoUrl = member.photo;

            if (selectedFile) {
                setUploading(true);
                photoUrl = await uploadImage(selectedFile);
                setUploading(false);
            }

            await updateMemberProfile(auth.currentUser.uid, {
                name,
                phone,
                photo: photoUrl
            });

            // Update local state
            setMember({ ...member, name, phone, photo: photoUrl });
            alert('Perfil atualizado com sucesso!');
            setSelectedFile(null);
            setPreviewUrl(null);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Erro ao atualizar perfil.');
        } finally {
            setSaving(false);
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-dark pt-20 flex items-center justify-center">
                <div className="text-brand-gold">Carregando...</div>
            </div>
        );
    }

    if (!member) {
        return (
            <div className="min-h-screen bg-brand-dark pt-20 flex items-center justify-center">
                <div className="text-brand-light">Perfil não encontrado.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-dark pt-28 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#1a1a1a] rounded-lg border border-brand-gold/10 overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-6 sm:p-8 border-b border-brand-gold/10 bg-brand-dark/50">
                        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-brand-gold">Meu Perfil</h1>
                        <p className="text-brand-light/60 mt-2">Gerencie suas informações pessoais</p>
                    </div>

                    <div className="p-6 sm:p-8">
                        <form onSubmit={handleSave} className="space-y-8">

                            {/* Photo Section */}
                            <div className="flex flex-col sm:flex-row items-center gap-8">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-brand-gold bg-brand-dark">
                                        <img
                                            src={previewUrl || member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <label className="absolute bottom-0 right-0 bg-brand-gold text-brand-dark p-2 rounded-full cursor-pointer hover:bg-white transition-colors shadow-lg">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>

                                <div className="text-center sm:text-left">
                                    <h3 className="text-xl font-bold text-brand-light">{member.name}</h3>
                                    <p className="text-brand-gold">{member.role}</p>
                                    <p className="text-brand-light/50 text-sm mt-1">{member.email}</p>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-brand-light/80">Nome Completo</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-brand-dark border border-brand-gold/20 rounded-md px-4 py-2 text-brand-light focus:outline-none focus:border-brand-gold transition-colors"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-brand-light/80">Telefone / WhatsApp</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="(00) 00000-0000"
                                        className="w-full bg-brand-dark border border-brand-gold/20 rounded-md px-4 py-2 text-brand-light focus:outline-none focus:border-brand-gold transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 border-t border-brand-gold/10 flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={saving || uploading}
                                    className="min-w-[150px]"
                                >
                                    {uploading ? 'Enviando foto...' : saving ? 'Salvando...' : 'Salvar Alterações'}
                                </Button>
                            </div>

                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default UserDashboardPage;
