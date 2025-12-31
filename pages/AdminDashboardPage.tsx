
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChurchEvent, Member, ChurchRole, Congregation, BlogPost, BlogCategory } from '../types';
import {
  getEvents, createEvent, updateEvent, deleteEvent,
  getMembers, createMember, updateMember, deleteMember,
  getCongregations, createCongregation, updateCongregation, deleteCongregation,
  uploadImage, getMemberByUserId,
  getPosts, createPost, updatePost, deletePost
} from '../services/firebaseService';
import { auth } from '../services/firebaseConfig';
import Button from '../components/Button';

// Icons
const HomeIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>;
const EventIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>;
const MemberIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>;
const LocationIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>;
const BlogIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>;
const MenuIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>;

const AdminDashboardPage: React.FC = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'members' | 'congregations' | 'blog'>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default closed, effect will open for desktop
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminMember, setAdminMember] = useState<Member | null>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const user = auth.currentUser;
      if (!user) {
        onNavigate('login');
        return;
      }

      const member = await getMemberByUserId(user.uid);
      if (member && member.isAdmin) {
        setIsAdmin(true);
        setAdminMember(member);
      } else {
        alert('Acesso negado. Área restrita para administradores.');
        onNavigate('home');
      }
      setLoading(false);
    };
    checkAdminStatus();
  }, [onNavigate]);

  // Toggle sidebar for mobile
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Auto-open sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-close sidebar on mobile when tab changes
  const handleTabChange = (tab: 'overview' | 'events' | 'members' | 'congregations' | 'blog') => {
    setActiveTab(tab);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-brand-dark flex items-center justify-center text-brand-gold">Carregando...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex h-screen bg-brand-dark overflow-hidden pt-20">

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isSidebarOpen ? 0 : '-100%',
        }}
        className={`fixed md:relative top-0 left-0 z-[60] w-64 h-screen md:h-full bg-[#1a1a1a] border-r border-brand-gold/10 flex flex-col transition-all duration-300 overflow-hidden md:translate-x-0`}
      >
        <div className="relative p-8 flex flex-col items-center border-b border-brand-gold/10">
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden absolute top-4 right-4 text-brand-gold/50 hover:text-brand-gold"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <div className="w-20 h-20 rounded-full p-1 border-2 border-brand-gold mb-4 relative">
            <img
              src={adminMember?.photo || "https://ui-avatars.com/api/?name=Admin+User&background=D4AF74&color=232323"}
              alt="Admin"
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-brand-dark rounded-full"></div>
          </div>
          <h3 className="text-brand-light font-heading font-bold text-lg text-center">{adminMember?.name || 'Administrador'}</h3>
          <p className="text-brand-light/50 text-xs mt-1">{adminMember?.email || 'admin@ieam.com.br'}</p>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <SidebarItem
            label="Visão Geral"
            icon={<HomeIcon />}
            isActive={activeTab === 'overview'}
            onClick={() => handleTabChange('overview')}
          />
          <SidebarItem
            label="Eventos"
            icon={<EventIcon />}
            isActive={activeTab === 'events'}
            onClick={() => handleTabChange('events')}
          />
          <SidebarItem
            label="Membros"
            icon={<MemberIcon />}
            isActive={activeTab === 'members'}
            onClick={() => handleTabChange('members')}
          />
          <SidebarItem
            label="Congregações"
            icon={<LocationIcon />}
            isActive={activeTab === 'congregations'}
            onClick={() => handleTabChange('congregations')}
          />
          <SidebarItem
            label="Blog"
            icon={<BlogIcon />}
            isActive={activeTab === 'blog'}
            onClick={() => handleTabChange('blog')}
          />
        </nav>

        <div className="p-4 border-t border-brand-gold/10">
          <p className="text-xs text-brand-light/30 text-center">IEAM System v1.0</p>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden fixed inset-0 top-0 bg-black/60 z-[55]"
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#232323] relative">
        {/* Top Bar Mobile Trigger */}
        <div className="md:hidden p-4 flex items-center bg-brand-dark border-b border-brand-gold/20">
          <button onClick={toggleSidebar} className="text-brand-gold">
            <MenuIcon />
          </button>
          <span className="ml-4 font-heading text-brand-gold font-bold">Dashboard</span>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-heading text-brand-light font-bold">
              {activeTab === 'overview' && 'Dashboard User'}
              {activeTab === 'events' && 'Gerenciar Eventos'}
              {activeTab === 'members' && 'Gerenciar Membros'}
              {activeTab === 'congregations' && 'Gerenciar Congregações'}
              {activeTab === 'blog' && 'Gerenciar Blog'}
            </h2>
            <div className="text-brand-light/50 text-sm hidden md:block">
              Bem vindo à área administrativa
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'overview' && <DashboardOverview key="overview" />}
            {activeTab === 'events' && <EventsManager key="events" />}
            {activeTab === 'members' && <MembersManager key="members" />}
            {activeTab === 'congregations' && <CongregationsManager key="congregations" />}
            {activeTab === 'blog' && <BlogManager key="blog" />}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const SidebarItem: React.FC<{ label: string; icon: React.ReactNode; isActive: boolean; onClick: () => void }> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group ${isActive
      ? 'bg-brand-gold text-brand-dark font-bold shadow-lg shadow-brand-gold/20'
      : 'text-brand-light/60 hover:bg-brand-light/5 hover:text-brand-gold'
      }`}
  >
    <div className={`${isActive ? 'text-brand-dark' : 'text-brand-light/60 group-hover:text-brand-gold'}`}>
      {icon}
    </div>
    <span>{label}</span>
    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-dark"></div>}
  </button>
);

// --- DASHBOARD OVERVIEW (The Layout Match) ---

const DashboardOverview: React.FC = () => {
  const [stats, setStats] = useState({ events: 0, members: 0, congregations: 0 });
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [roleDistribution, setRoleDistribution] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [eventsData, membersData, congregationsData] = await Promise.all([getEvents(), getMembers(), getCongregations()]);

        setEvents(eventsData);
        setStats({
          events: eventsData.length,
          members: membersData.length,
          congregations: congregationsData.length
        });

        const dist = membersData.reduce((acc, member) => {
          const role = member.role;
          acc[role] = (acc[role] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        setRoleDistribution(dist);
      } catch (error) {
        console.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div className="w-full h-full flex items-center justify-center text-brand-gold">Carregando...</div>;

  // Process data for charts
  const maxCount = Math.max(...(Object.values(roleDistribution) as number[]), 1);
  const sortedRoles = Object.entries(roleDistribution).sort((a, b) => (b[1] as number) - (a[1] as number)).slice(0, 6);

  // Calculate percentage for circle chart (e.g., Leadership vs Members)
  const totalMembers = stats.members || 1;
  const leadershipCount = (roleDistribution['Pastor'] || 0) + (roleDistribution['Presbítero'] || 0) + (roleDistribution['Diácono'] || 0);
  const leadershipPercent = Math.round((leadershipCount / totalMembers) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Top Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total de Membros" value={stats.members.toString()} icon={<MemberIcon />} trend="+12%" />
        <StatCard title="Total de Eventos" value={stats.events.toString()} icon={<EventIcon />} trend="+4" />
        <StatCard title="Congregações" value={stats.congregations.toString()} icon={<LocationIcon />} trend="Estável" />
        <StatCard title="Média Frequência" value="85%" icon={<div className="text-xl font-bold">★</div>} trend="+2.5%" />
      </div>

      {/* Middle Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart Area */}
        <div className="lg:col-span-2 bg-[#2A2A2A] p-6 rounded-2xl shadow-xl border border-brand-gold/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-brand-light font-heading font-bold text-lg">Distribuição por Cargo</h3>
            <button className="bg-brand-gold text-brand-dark text-xs font-bold px-3 py-1 rounded-md">Ver Todos</button>
          </div>

          <div className="h-64 flex items-end justify-between gap-4 px-2">
            {sortedRoles.map(([role, count], index) => (
              <div key={role} className="flex flex-col items-center flex-1 group">
                <div className="relative w-full flex justify-center items-end h-full">
                  {/* Tooltip */}
                  <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-gold text-brand-dark text-xs font-bold px-2 py-1 rounded pointer-events-none">
                    {count}
                  </div>
                  {/* Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(Number(count) / Number(maxCount)) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`w-full max-w-[40px] rounded-t-md ${index % 2 === 0 ? 'bg-[#3a4a6b]' : 'bg-brand-gold'}`} // Alternating colors like image
                  ></motion.div>
                </div>
                <span className="text-[10px] sm:text-xs text-brand-light/60 mt-2 truncate w-full text-center">{role.substring(0, 8)}..</span>
              </div>
            ))}
          </div>
        </div>

        {/* Circular Chart Area */}
        <div className="bg-[#2A2A2A] p-6 rounded-2xl shadow-xl border border-brand-gold/5 flex flex-col items-center justify-center relative">
          <h3 className="absolute top-6 left-6 text-brand-light font-heading font-bold text-lg">Liderança</h3>

          <div className="relative w-48 h-48 mt-4">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background Circle */}
              <circle cx="96" cy="96" r="80" stroke="#333" strokeWidth="12" fill="transparent" />
              {/* Progress Circle */}
              <motion.circle
                initial={{ strokeDashoffset: 502 }} // 2 * PI * 80 ≈ 502
                animate={{ strokeDashoffset: 502 - (502 * Number(leadershipPercent)) / 100 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="96" cy="96" r="80"
                stroke="#D4AF74"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray="502"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-brand-light">{leadershipPercent}%</span>
              <span className="text-xs text-brand-light/50 uppercase tracking-widest">Do Total</span>
            </div>
          </div>

          <div className="mt-8 w-full space-y-3">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brand-gold"></div>
                <span className="text-brand-light/70">Líderes</span>
              </div>
              <span className="text-brand-light font-bold">{leadershipCount}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#333]"></div>
                <span className="text-brand-light/70">Membros</span>
              </div>
              <span className="text-brand-light font-bold">{totalMembers - leadershipCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: List/Graph equivalent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart Mimic (Simple Sine Wave for "Activity") */}
        <div className="lg:col-span-2 bg-[#2A2A2A] p-6 rounded-2xl shadow-xl border border-brand-gold/5 overflow-hidden">
          <h3 className="text-brand-light font-heading font-bold text-lg mb-2">Atividade Recente</h3>
          <p className="text-brand-light/40 text-xs mb-6">Visualização de engajamento nos últimos 6 meses</p>

          <div className="relative h-40 w-full">
            <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradientGold" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF74" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#D4AF74" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,150 L0,100 C50,80 100,120 150,90 C200,60 250,100 300,50 C350,0 400,80 450,100 L500,150 Z" fill="url(#gradientGold)" />
              <path d="M0,100 C50,80 100,120 150,90 C200,60 250,100 300,50 C350,0 400,80 450,100" fill="none" stroke="#D4AF74" strokeWidth="3" />
              {/* Points */}
              <circle cx="150" cy="90" r="4" fill="#232323" stroke="#D4AF74" strokeWidth="2" />
              <circle cx="300" cy="50" r="6" fill="#D4AF74" stroke="#fff" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Upcoming List (Calendar equivalent) */}
        <div className="bg-[#2A2A2A] p-6 rounded-2xl shadow-xl border border-brand-gold/5">
          <h3 className="text-brand-light font-heading font-bold text-lg mb-4">Próximos Eventos</h3>
          <div className="space-y-4">
            {events.slice(0, 3).map((event, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-brand-dark/50 hover:bg-brand-dark transition-colors border border-transparent hover:border-brand-gold/20">
                <div className="w-10 h-10 rounded-lg bg-brand-gold/20 text-brand-gold flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {i + 10} <br /> AGO
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-brand-light font-bold text-sm truncate">{event.title}</h4>
                  <p className="text-brand-light/50 text-xs truncate">{event.date} - {event.time}</p>
                </div>
              </div>
            ))}
            <button onClick={() => { }} className="w-full py-2 mt-2 bg-brand-gold text-brand-dark text-sm font-bold rounded-lg hover:bg-opacity-90 transition-all">
              Ver Calendário
            </button>
          </div>
        </div>
      </div>

    </motion.div>
  );
}

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; trend: string }> = ({ title, value, icon, trend }) => (
  <div className="bg-[#2A2A2A] p-6 rounded-2xl shadow-xl border border-brand-gold/5 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-brand-light/60 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-heading font-bold text-brand-light">{value}</h3>
      </div>
      <div className="p-2 bg-brand-gold/20 text-brand-gold rounded-lg">
        {icon}
      </div>
    </div>
    <div className="mt-4 relative z-10">
      <span className="text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded">{trend}</span>
      <span className="text-brand-light/30 text-xs ml-2">desde o último mês</span>
    </div>
    {/* Decorative Circle */}
    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-gold/5 rounded-full blur-xl"></div>
  </div>
);


// --- MANAGER COMPONENTS (Reused logic, simplified wrappers) ---

const EventsManager: React.FC = () => {
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ChurchEvent | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    description: '',
    image: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

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
    setSelectedFile(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUploading(true);
      let imageUrl = formData.image;

      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const eventData = { ...formData, image: imageUrl };

      if (editingEvent) {
        await updateEvent({ ...editingEvent, ...eventData });
      } else {
        await createEvent(eventData);
      }
      await fetchEvents();
      handleCloseModal();
    } catch (error) {
      alert("Erro ao salvar evento.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      try {
        await deleteEvent(id);
        await fetchEvents();
      } catch (error) {
        alert("Erro ao excluir evento.");
      }
    }
  };

  const inputStyles = "w-full bg-brand-dark border border-brand-gold/30 focus:border-brand-gold text-brand-light p-3 rounded-sm outline-none transition-colors";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <div className="flex justify-end mb-6">
        <Button onClick={() => handleOpenModal()} variant="solid">
          + Novo Evento
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-brand-gold">Carregando eventos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-[#2A2A2A] border border-brand-gold/20 rounded-lg shadow-lg overflow-hidden group hover:border-brand-gold/50 transition-colors">
              <div className="h-40 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold font-heading text-brand-gold mb-1 truncate">{event.title}</h3>
                <p className="text-xs text-brand-light/60 mb-2">{event.date} • {event.time}</p>
                <div className="flex justify-end space-x-2 mt-4">
                  <button onClick={() => handleOpenModal(event)} className="text-xs sm:text-sm px-3 py-2 border border-brand-gold text-brand-gold rounded hover:bg-brand-gold hover:text-brand-dark transition-colors min-h-[44px] sm:min-h-0">Editar</button>
                  <button onClick={() => handleDelete(event.id)} className="text-xs sm:text-sm px-3 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors min-h-[44px] sm:min-h-0">Excluir</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleCloseModal} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-brand-dark border border-brand-gold rounded-lg w-full max-w-lg p-4 sm:p-6 z-10 max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-heading font-bold text-brand-gold mb-6">{editingEvent ? 'Editar Evento' : 'Novo Evento'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-brand-gold text-sm font-bold mb-1">Título</label>
                  <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputStyles} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-gold text-sm font-bold mb-1">Data</label>
                    <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className={inputStyles} required />
                  </div>
                  <div>
                    <label className="block text-brand-gold text-sm font-bold mb-1">Horário</label>
                    <input type="time" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} className={inputStyles} required />
                  </div>
                </div>
                <div>
                  <label className="block text-brand-gold text-sm font-bold mb-1">Imagem do Evento</label>
                  <div className="flex items-center gap-4">
                    {(selectedFile || formData.image) && (
                      <div className="w-24 h-24 rounded overflow-hidden border border-brand-gold shrink-0">
                        <img
                          src={selectedFile ? URL.createObjectURL(selectedFile) : formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className={`${inputStyles} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-brand-dark hover:file:bg-opacity-90`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-brand-gold text-sm font-bold mb-1">Descrição</label>
                  <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className={inputStyles} required />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-brand-light hover:text-white" disabled={uploading}>Cancelar</button>
                  <Button type="submit" variant="solid" disabled={uploading}>{uploading ? 'Salvando...' : 'Salvar'}</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MembersManager: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState<ChurchRole | 'Todos'>('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Membro' as ChurchRole,
    email: '',
    phone: '',
    photo: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchMembers = async () => {
    setLoading(true);
    const data = await getMembers();
    setMembers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const filteredMembers = filterRole === 'Todos'
    ? members
    : members.filter(m => m.role === filterRole);

  const handleOpenModal = (member?: Member) => {
    setSelectedFile(null);
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        role: member.role,
        email: member.email || '',
        phone: member.phone || '',
        photo: member.photo || ''
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        role: 'Membro',
        email: '',
        phone: '',
        photo: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUploading(true);
      let photoUrl = formData.photo;

      if (selectedFile) {
        photoUrl = await uploadImage(selectedFile);
      }

      const memberData = { ...formData, photo: photoUrl };

      if (editingMember) {
        await updateMember({ ...editingMember, ...memberData });
      } else {
        await createMember(memberData);
      }
      await fetchMembers();
      handleCloseModal();
    } catch (error) {
      alert("Erro ao salvar membro.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este membro?')) {
      try {
        await deleteMember(id);
        await fetchMembers();
      } catch (error) {
        alert("Erro ao excluir membro.");
      }
    }
  };

  const handleToggleAdmin = async (member: Member) => {
    const action = member.isAdmin ? 'remover' : 'conceder';
    if (window.confirm(`Tem certeza que deseja ${action} permissão de administrador para ${member.name}?`)) {
      try {
        await updateMember({ ...member, isAdmin: !member.isAdmin });
        await fetchMembers();
      } catch (error) {
        alert(`Erro ao ${action} permissão de administrador.`);
      }
    }
  };

  const roles: ChurchRole[] = ['Pastor', 'Presbítero', 'Evangelista', 'Diácono', 'Obreiro', 'Músico', 'Membro'];
  const inputStyles = "w-full bg-brand-dark border border-brand-gold/30 focus:border-brand-gold text-brand-light p-3 rounded-sm outline-none transition-colors";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 max-w-full custom-scrollbar">
          <button
            onClick={() => setFilterRole('Todos')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${filterRole === 'Todos' ? 'bg-brand-gold text-brand-dark font-bold' : 'bg-[#2A2A2A] border border-brand-gold/10 text-brand-light hover:border-brand-gold'}`}
          >
            Todos
          </button>
          {roles.map(role => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${filterRole === role ? 'bg-brand-gold text-brand-dark font-bold' : 'bg-[#2A2A2A] border border-brand-gold/10 text-brand-light hover:border-brand-gold'}`}
            >
              {role}
            </button>
          ))}
        </div>
        <Button onClick={() => handleOpenModal()} variant="solid" className="whitespace-nowrap text-sm">
          + Novo Membro
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-brand-gold">Carregando membros...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-[#2A2A2A] border border-brand-gold/10 rounded-lg shadow-lg p-6 flex items-center space-x-4 relative group hover:border-brand-gold/30 transition-all">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-brand-gold flex-shrink-0">
                <img
                  src={member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=D4AF74&color=232323`}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-md font-bold font-heading text-brand-light truncate">{member.name}</h3>
                <span className="text-xs text-brand-gold uppercase tracking-wide mb-1 flex items-center gap-2">
                  {member.role}
                  {member.isAdmin && <span className="bg-green-500/20 text-green-500 px-1.5 py-0.5 rounded text-[10px] font-bold border border-green-500/30">ADMIN</span>}
                </span>
                <p className="text-brand-light/40 text-xs truncate">{member.email || 'Sem email'}</p>
              </div>
              <div className="absolute right-2 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleToggleAdmin(member)} className={`p-1.5 ${member.isAdmin ? 'text-green-500 hover:bg-green-500/10' : 'text-gray-400 hover:bg-gray-400/10'} rounded`} title={member.isAdmin ? "Remover Admin" : "Tornar Admin"}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </button>
                <button onClick={() => handleOpenModal(member)} className="p-1.5 text-brand-gold hover:bg-brand-gold/10 rounded"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                <button onClick={() => handleDelete(member.id)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Member Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleCloseModal} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-brand-dark border border-brand-gold rounded-lg w-full max-w-lg p-4 sm:p-6 z-10 max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-heading font-bold text-brand-gold mb-6">{editingMember ? 'Editar Membro' : 'Novo Membro'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><label className="block text-brand-gold text-sm font-bold mb-1">Nome Completo</label><input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputStyles} required /></div>
                <div>
                  <label className="block text-brand-gold text-sm font-bold mb-1">Cargo / Classificação</label>
                  <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value as ChurchRole })} className={inputStyles} required>
                    {roles.map(role => <option key={role} value={role}>{role}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-brand-gold text-sm font-bold mb-1">Email</label><input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={inputStyles} /></div>
                  <div><label className="block text-brand-gold text-sm font-bold mb-1">Telefone</label><input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className={inputStyles} /></div>
                </div>
                <div>
                  <label className="block text-brand-gold text-sm font-bold mb-1">Foto</label>
                  <div className="flex items-center gap-4">
                    {(selectedFile || formData.photo) && (
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-brand-gold shrink-0">
                        <img
                          src={selectedFile ? URL.createObjectURL(selectedFile) : formData.photo}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className={`${inputStyles} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-brand-dark hover:file:bg-opacity-90`}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-brand-light hover:text-white" disabled={uploading}>Cancelar</button>
                  <Button type="submit" variant="solid" disabled={uploading}>{uploading ? 'Salvando...' : 'Salvar'}</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CongregationsManager: React.FC = () => {
  const [congregations, setCongregations] = useState<Congregation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCongregation, setEditingCongregation] = useState<Congregation | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    pastor: '',
    schedule: '',
    mapUrl: ''
  });

  const fetchCongregations = async () => {
    setLoading(true);
    const data = await getCongregations();
    setCongregations(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCongregations();
  }, []);

  const handleOpenModal = (congregation?: Congregation) => {
    if (congregation) {
      setEditingCongregation(congregation);
      setFormData({
        name: congregation.name,
        address: congregation.address,
        pastor: congregation.pastor,
        schedule: congregation.schedule,
        mapUrl: congregation.mapUrl
      });
    } else {
      setEditingCongregation(null);
      setFormData({
        name: '',
        address: '',
        pastor: '',
        schedule: '',
        mapUrl: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCongregation(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCongregation) {
        await updateCongregation({ ...editingCongregation, ...formData });
      } else {
        await createCongregation(formData);
      }
      await fetchCongregations();
      handleCloseModal();
    } catch (error) {
      alert("Erro ao salvar congregação.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta congregação?')) {
      try {
        await deleteCongregation(id);
        await fetchCongregations();
      } catch (error) {
        alert("Erro ao excluir congregação.");
      }
    }
  };

  const inputStyles = "w-full bg-brand-dark border border-brand-gold/30 focus:border-brand-gold text-brand-light p-3 rounded-sm outline-none transition-colors";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <div className="flex justify-end mb-6">
        <Button onClick={() => handleOpenModal()} variant="solid">
          + Nova Congregação
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-brand-gold">Carregando congregações...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {congregations.map((congregation) => (
            <div key={congregation.id} className="bg-[#2A2A2A] border border-brand-gold/10 rounded-lg shadow-lg p-6 flex flex-col relative group hover:border-brand-gold/30">
              <h3 className="text-xl font-bold font-heading text-brand-gold mb-2">{congregation.name}</h3>
              <div className="space-y-2 text-brand-light/80 text-sm flex-grow mb-4">
                <p><strong className="text-brand-gold">Endereço:</strong> {congregation.address}</p>
                <p><strong className="text-brand-gold">Pastor:</strong> {congregation.pastor}</p>
              </div>
              <div className="flex justify-end space-x-2 mt-auto">
                <button onClick={() => handleOpenModal(congregation)} className="text-xs px-3 py-1 border border-brand-gold text-brand-gold rounded hover:bg-brand-gold hover:text-brand-dark transition-colors">Editar</button>
                <button onClick={() => handleDelete(congregation.id)} className="text-xs px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Congregation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleCloseModal} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-brand-dark border border-brand-gold rounded-lg w-full max-w-lg p-4 sm:p-6 z-10 max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-heading font-bold text-brand-gold mb-6">{editingCongregation ? 'Editar Congregação' : 'Nova Congregação'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><label className="block text-brand-gold text-sm font-bold mb-1">Nome da Congregação</label><input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputStyles} required /></div>
                <div><label className="block text-brand-gold text-sm font-bold mb-1">Endereço</label><input type="text" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className={inputStyles} required /></div>
                <div><label className="block text-brand-gold text-sm font-bold mb-1">Pastor Responsável</label><input type="text" value={formData.pastor} onChange={e => setFormData({ ...formData, pastor: e.target.value })} className={inputStyles} required /></div>
                <div><label className="block text-brand-gold text-sm font-bold mb-1">Horários de Culto</label><textarea rows={2} value={formData.schedule} onChange={e => setFormData({ ...formData, schedule: e.target.value })} className={inputStyles} required /></div>
                <div><label className="block text-brand-gold text-sm font-bold mb-1">URL do Google Maps (Embed)</label><input type="text" value={formData.mapUrl} onChange={e => setFormData({ ...formData, mapUrl: e.target.value })} className={inputStyles} placeholder="https://www.google.com/maps/embed?..." required /></div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-brand-light hover:text-white">Cancelar</button>
                  <Button type="submit" variant="solid">Salvar</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- BLOG MANAGER ---
const BlogManager: React.FC = () => {
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

  const fetchPosts = async () => {
    setLoading(true);
    const data = await getPosts();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const generateSlug = (title: string) => {
    return title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title, slug: generateSlug(title) });
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
        setFormData({ ...formData, images: [...(formData.images || []), imageUrl] });
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
      fetchPosts();
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
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      try {
        await deletePost(id);
        fetchPosts();
      } catch (error) {
        alert('Erro ao excluir post.');
      }
    }
  };

  const resetForm = () => {
    setEditingPost(null);
    setFormData({ title: '', slug: '', category: 'Notícia', content: '', coverImage: '', images: [], videoUrl: '', publishedAt: new Date().toISOString(), author: '', tags: [] });
  };

  const filteredPosts = selectedCategory === 'Todos' ? posts : posts.filter(p => p.category === selectedCategory);
  const inputStyles = "w-full bg-brand-dark border border-brand-gold/30 focus:border-brand-gold text-brand-light p-3 rounded-sm outline-none transition-colors";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <div className="flex justify-end mb-6">
        <Button onClick={() => { resetForm(); setShowModal(true); }} variant="solid">+ Novo Post</Button>
      </div>

      <div className="mb-6 flex gap-4 flex-wrap">
        <button onClick={() => setSelectedCategory('Todos')} className={`px-4 py-2 rounded-sm text-sm transition-colors ${selectedCategory === 'Todos' ? 'bg-brand-gold text-brand-dark font-bold' : 'bg-[#2A2A2A] border border-brand-gold/10 text-brand-light hover:border-brand-gold'}`}>Todos</button>
        <button onClick={() => setSelectedCategory('Notícia')} className={`px-4 py-2 rounded-sm text-sm transition-colors ${selectedCategory === 'Notícia' ? 'bg-brand-gold text-brand-dark font-bold' : 'bg-[#2A2A2A] border border-brand-gold/10 text-brand-light hover:border-brand-gold'}`}>Notícias</button>
        <button onClick={() => setSelectedCategory('Evento Realizado')} className={`px-4 py-2 rounded-sm text-sm transition-colors ${selectedCategory === 'Evento Realizado' ? 'bg-brand-gold text-brand-dark font-bold' : 'bg-[#2A2A2A] border border-brand-gold/10 text-brand-light hover:border-brand-gold'}`}>Eventos Realizados</button>
      </div>

      {loading ? (
        <p className="text-center text-brand-gold py-12">Carregando posts...</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-center text-brand-light/50 py-12">Nenhum post encontrado</p>
      ) : (
        <div className="grid gap-6">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-[#2A2A2A] border border-brand-gold/20 rounded-lg p-6 flex gap-6 hover:border-brand-gold/50 transition-colors">
              <img src={post.coverImage} alt={post.title} className="w-48 h-32 object-cover rounded-lg" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-xs px-2 py-1 rounded font-bold ${post.category === 'Notícia' ? 'bg-blue-600/20 text-blue-400' : 'bg-green-600/20 text-green-400'}`}>{post.category}</span>
                    <h3 className="text-xl font-heading font-bold text-brand-gold mt-2">{post.title}</h3>
                    <p className="text-sm text-brand-light/60 mt-1">Por {post.author} • {new Date(post.publishedAt).toLocaleDateString('pt-BR')}</p>
                    <p className="text-brand-light/80 mt-2 line-clamp-2">{post.content}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(post)} className="text-brand-gold hover:text-brand-gold/80 text-xl p-2" title="Editar">✏️</button>
                    <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:text-red-400 text-xl p-2" title="Excluir">🗑️</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => { setShowModal(false); resetForm(); }} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-brand-dark border border-brand-gold rounded-lg w-full max-w-4xl p-6 z-10 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-heading font-bold text-brand-gold mb-6">{editingPost ? 'Editar Post' : 'Novo Post'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-brand-gold text-sm font-bold mb-1">Título *</label>
                  <input type="text" value={formData.title} onChange={(e) => handleTitleChange(e.target.value)} className={inputStyles} required />
                  <p className="text-xs text-brand-light/40 mt-1">Slug: {formData.slug}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-brand-gold text-sm font-bold mb-1">Categoria *</label>
                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as BlogCategory })} className={inputStyles} required>
                      <option value="Notícia">Notícia</option>
                      <option value="Evento Realizado">Evento Realizado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-brand-gold text-sm font-bold mb-1">Autor *</label>
                    <input type="text" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} className={inputStyles} required />
                  </div>
                </div>
                <div>
                  <label className="block text-brand-gold text-sm font-bold mb-1">Imagem de Capa *</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'cover')} className={`${inputStyles} file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-brand-dark hover:file:bg-opacity-90`} />
                  {formData.coverImage && <img src={formData.coverImage} alt="Capa" className="mt-2 w-full h-48 object-cover rounded-lg border border-brand-gold/20" />}
                </div>
                <div>
                  <label className="block text-brand-gold text-sm font-bold mb-1">Conteúdo *</label>
                  <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={8} className={inputStyles} required />
                </div>
                <div>
                  <label className="block text-brand-gold text-sm font-bold mb-1">Galeria de Imagens</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'gallery')} className={`${inputStyles} file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-brand-gold file:text-brand-dark hover:file:bg-opacity-90`} />
                  {formData.images && formData.images.length > 0 && (
                    <div className="mt-2 grid grid-cols-4 gap-2">{formData.images.map((img, idx) => <img key={idx} src={img} alt={`Galeria ${idx}`} className="w-full h-24 object-cover rounded border border-brand-gold/20" />)}</div>
                  )}
                </div>
                <div>
                  <label className="block text-brand-gold text-sm font-bold mb-1">URL do Vídeo (YouTube ou Vimeo)</label>
                  <input type="url" value={formData.videoUrl} onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })} placeholder="https://www.youtube.com/watch?v=..." className={inputStyles} />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="px-6 py-2 text-brand-light hover:text-white transition" disabled={uploadingImage}>Cancelar</button>
                  <Button type="submit" variant="solid" disabled={uploadingImage}>{uploadingImage ? 'Enviando...' : editingPost ? 'Atualizar' : 'Criar'}</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminDashboardPage;

