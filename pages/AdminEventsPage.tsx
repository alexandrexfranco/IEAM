
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChurchEvent } from '../types';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../services/supabaseService';
import Button from '../components/Button';

const AdminEventsPage: React.FC = () => {
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ChurchEvent | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    image: ''
  });

  const fetchEvents = async () => {
    setLoading(true);
    const data = await getEvents();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenModal = (event?: ChurchEvent) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        date: event.date,
        time: event.time,
        description: event.description,
        image: event.image
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        date: '',
        time: '',
        description: '',
        image: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingEvent) {
        await updateEvent({ ...editingEvent, ...formData });
      } else {
        await createEvent(formData);
      }
      await fetchEvents();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Erro ao salvar evento.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      setLoading(true);
      try {
        await deleteEvent(id);
        await fetchEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Erro ao excluir evento.");
      } finally {
        setLoading(false);
      }
    }
  };

  const inputStyles = "w-full bg-brand-dark border border-brand-gold/30 focus:border-brand-gold text-brand-light p-3 rounded-sm outline-none transition-colors";

  return (
    <div className="pt-24 pb-12 min-h-screen bg-brand-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-brand-gold">
              Gerenciar Eventos
            </h1>
            <p className="text-brand-light/70 mt-2">Área administrativa</p>
          </div>
          <Button onClick={() => handleOpenModal()} variant="solid">
            + Novo Evento
          </Button>
        </div>

        {loading && !isModalOpen ? (
          <div className="text-center py-10">
            <p className="text-brand-gold animate-pulse">Carregando...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <motion.div 
                key={event.id}
                layoutId={`event-${event.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-brand-dark border border-brand-gold/20 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold font-heading text-brand-gold mb-2 truncate">{event.title}</h3>
                  <p className="text-sm text-brand-light/60 mb-2">{event.date} • {event.time}</p>
                  <p className="text-brand-light/80 text-sm line-clamp-3 mb-4">{event.description}</p>
                  <div className="flex justify-end space-x-2">
                    <button 
                        onClick={() => handleOpenModal(event)}
                        className="px-3 py-1 text-sm border border-brand-gold text-brand-gold rounded hover:bg-brand-gold hover:text-brand-dark transition-colors"
                    >
                        Editar
                    </button>
                    <button 
                        onClick={() => handleDelete(event.id)}
                        className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                    >
                        Excluir
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
            {events.length === 0 && (
                <div className="col-span-full text-center py-10 border border-dashed border-brand-gold/30 rounded-lg">
                    <p className="text-brand-light/50">Nenhum evento cadastrado.</p>
                </div>
            )}
          </div>
        )}

        {/* Modal Form */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseModal}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-brand-dark border border-brand-gold rounded-lg shadow-2xl w-full max-w-lg p-6 z-10 max-h-[90vh] overflow-y-auto"
              >
                <h2 className="text-2xl font-heading font-bold text-brand-gold mb-6">
                  {editingEvent ? 'Editar Evento' : 'Novo Evento'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-brand-gold text-sm font-bold mb-1">Título</label>
                    <input 
                      type="text" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleInputChange} 
                      className={inputStyles}
                      required 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-brand-gold text-sm font-bold mb-1">Data (Texto)</label>
                        <input 
                        type="text" 
                        name="date" 
                        placeholder="ex: 25 de Dezembro"
                        value={formData.date} 
                        onChange={handleInputChange} 
                        className={inputStyles}
                        required 
                        />
                    </div>
                    <div>
                        <label className="block text-brand-gold text-sm font-bold mb-1">Horário</label>
                        <input 
                        type="text" 
                        name="time" 
                        placeholder="ex: 19:00"
                        value={formData.time} 
                        onChange={handleInputChange} 
                        className={inputStyles}
                        required 
                        />
                    </div>
                  </div>
                  <div>
                    <label className="block text-brand-gold text-sm font-bold mb-1">URL da Imagem</label>
                    <input 
                      type="url" 
                      name="image" 
                      placeholder="https://..."
                      value={formData.image} 
                      onChange={handleInputChange} 
                      className={inputStyles}
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-brand-gold text-sm font-bold mb-1">Descrição</label>
                    <textarea 
                      name="description" 
                      rows={4}
                      value={formData.description} 
                      onChange={handleInputChange} 
                      className={inputStyles}
                      required 
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <button 
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 text-brand-light hover:text-white transition-colors"
                    >
                      Cancelar
                    </button>
                    <Button type="submit" variant="solid" disabled={loading}>
                      {loading ? 'Salvando...' : 'Salvar'}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminEventsPage;
