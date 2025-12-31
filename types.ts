export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
}

export interface Ministry {
  id: string;
  slug: string;
  name: string;
  title: string;
  bannerImage: string;
  description: string[];
  details: {
    leader: string;
    schedule: string;
    contact: string;
  };
}

export interface ChurchService {
  id: string;
  title: string;
  day: string;
  time: string;
  description: string;
}

export interface ChurchInfo {
  id: string;
  slug: string;
  name: string;
  title: string;
  bannerImage: string;
  content: Array<{
    type: 'heading' | 'paragraph';
    text: string;
  }>;
}

export interface Congregation {
  id: string;
  name: string;
  address: string;
  pastor: string;
  schedule: string;
  mapUrl: string;
}

export type ChurchRole = 'Pastor' | 'Presbítero' | 'Evangelista' | 'Diácono' | 'Obreiro' | 'Membro' | 'Músico';

export interface Member {
  id: string;
  uid?: string; // Link to Firebase Auth User ID
  name: string;
  role: ChurchRole;
  email?: string;
  phone?: string;
  photo?: string;
  isAdmin?: boolean; // Database-backed admin flag
}

export type PrayerRequestStatus = 'Pendente' | 'Em Oração' | 'Respondido';

export interface PrayerRequest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  request: string;
  status: PrayerRequestStatus;
  createdAt: string;
  adminNotes?: string;
}

export type BlogCategory = 'Evento Realizado' | 'Notícia';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  content: string;
  coverImage: string;
  images?: string[];
  videoUrl?: string; // YouTube or Vimeo URL
  publishedAt: string;
  author: string;
  tags?: string[];
}
