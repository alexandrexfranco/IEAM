
export interface ChurchEvent {
  id: number;
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
  id: number;
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
  id: number;
  name: string;
  address: string;
  pastor: string;
  schedule: string;
  mapUrl: string;
}

export type ChurchRole = 'Pastor' | 'Presbítero' | 'Evangelista' | 'Diácono' | 'Obreiro' | 'Membro' | 'Músico';

export interface Member {
  id: number;
  name: string;
  role: ChurchRole;
  email?: string;
  phone?: string;
  photo?: string;
}
