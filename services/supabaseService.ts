
import { ChurchEvent, Ministry, ChurchService, ChurchInfo, Congregation, Member } from '../types';

// --- MOCK DATA ---
// Changed to let to allow mutations
let mockEvents: ChurchEvent[] = [
  {
    id: 1,
    title: 'Culto de Celebração',
    date: 'Todo Domingo',
    time: '18:00',
    description: 'Junte-se a nós para um tempo de louvor, adoração e uma mensagem inspiradora da Palavra de Deus.',
    image: 'https://picsum.photos/400/300?random=10',
  },
  {
    id: 2,
    title: 'Estudo Bíblico EBD',
    date: 'Todo Domingo',
    time: '08:00',
    description: 'Aprofunde seu conhecimento nas Escrituras em nosso estudo bíblico semanal. Aberto a todos os níveis de conhecimento.',
    image: 'https://picsum.photos/400/300?random=11',
  },
  {
    id: 3,
    title: 'Noite de Jovens',
    date: 'Último Sábado do Mês',
    time: '19:30',
    description: 'Uma noite especial para os jovens, com música, comunhão e uma palavra direcionada para a juventude.',
    image: 'https://picsum.photos/400/300?random=12',
  },
];

let mockMembers: Member[] = [
  {
    id: 1,
    name: 'João Silva',
    role: 'Pastor',
    email: 'joao.silva@ieam.com.br',
    phone: '(11) 99999-9999',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    role: 'Pastor',
    email: 'maria.oliveira@ieam.com.br',
    phone: '(11) 98888-8888',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 3,
    name: 'Carlos Santos',
    role: 'Presbítero',
    email: 'carlos.santos@ieam.com.br',
    photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 4,
    name: 'Roberto Neves',
    role: 'Diácono',
    email: 'roberto.n@ieam.com.br',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
  }
];

let mockCongregations: Congregation[] = [
    {
      id: 1,
      name: 'Congregação de Porto Belo',
      address: 'Rua Amélia Schwab Sarmento, 305 - Porto Belo - ES',
      pastor: 'Ev. Marcos Pereira',
      schedule: 'Cultos às Segundas (19:30), Quintas (19:30) e Domingo às (18:00)',
      mapUrl: 'https://www.google.com/maps/embed?pb=!3m2!1spt-BR!2sbr!4v1763319976871!5m2!1spt-BR!2sbr!6m8!1m7!1s__WOQOC7Esbec6lEYoC3YA!2m2!1d-20.27390757085691!2d-40.39819518181582!3f122.72783844898606!4f-13.689183287111348!5f0.7820865974627469',
    },
    {
      id: 2,
      name: 'Congregação de Jardim Camburi',
      address: 'Av. das Palmeiras, 456, Jardim Camburi - ES',
      pastor: 'Pb. Antônio Carlos',
      schedule: 'Cultos às Quintas (19:30) e Domingos (18:30)',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.111166318354!2d-40.33777588507963!3d-20.2819279864239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb81e259b8a3f5d%3A0x33b8f445f14e6b7!2sPra%C3%A7a%20dos%20Namorados!5e0!3m2!1spt-BR!2sbr!4v1620843370014!5m2!1spt-BR!2sbr'
    },
];

export const ministriesData: Ministry[] = [
  {
    id: '1',
    slug: 'criancas',
    name: 'Crianças',
    title: 'Ministério Infantil',
    bannerImage: 'https://images.pexels.com/photos/3662843/pexels-photo-3662843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: [
      'O Ministério Infantil "Sementinhas da Fé" é dedicado a ensinar as crianças sobre o amor de Jesus de uma forma divertida, criativa e segura.',
      'Nossa missão é construir uma base sólida da Palavra de Deus no coração dos pequenos, através de histórias bíblicas, louvores, brincadeiras e atividades que estimulam o crescimento espiritual e o relacionamento com Deus e com os amigos.',
      'Acreditamos que cada criança é um presente de Deus e nosso objetivo é cuidar delas com excelência, proporcionando um ambiente onde se sintam amadas, valorizadas e animadas para aprender mais sobre o Reino de Deus.'
    ],
    details: {
      leader: 'Tia Ana Paula',
      schedule: 'Domingos, durante o Culto de Celebração (19:00)',
      contact: 'infantil@ieam.com.br'
    }
  },
  {
    id: '2',
    slug: 'jovens',
    name: 'Jovens',
    title: 'Ministério de Jovens',
    bannerImage: 'https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: [
      'O Ministério de Jovens "Geração Eleita" busca conectar a juventude com Cristo, fortalecendo a fé e criando laços de amizade verdadeiros.',
      'Promovemos encontros dinâmicos, com louvor, estudos bíblicos relevantes para os desafios atuais e momentos de comunhão. Nosso objetivo é equipar os jovens para serem luz no mundo e fazerem a diferença em sua geração.',
      'Se você é jovem e busca um lugar para crescer na fé e encontrar amigos, seu lugar é aqui!'
    ],
    details: {
      leader: 'Pr. Lucas Martins',
      schedule: 'Sábados, às 19:30',
      contact: 'jovens@ieam.com.br'
    }
  },
  {
    id: '3',
    slug: 'homens',
    name: 'Homens',
    title: 'Ministério de Homens',
    bannerImage: 'https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: [
      'O Ministério de Homens "Homens de Honra" visa fortalecer e encorajar os homens a assumirem seu papel de liderança espiritual em suas famílias, na igreja e na sociedade, segundo os princípios bíblicos.',
      'Através de encontros, palestras e momentos de comunhão, buscamos o crescimento mútuo em sabedoria, integridade e serviço. Discutimos temas relevantes para o universo masculino à luz da Palavra de Deus.',
      'Junte-se a nós para ser um homem segundo o coração de Deus.'
    ],
    details: {
      leader: 'Presb. Carlos Andrade',
      schedule: 'Toda 1ª Segunda-feira do mês, às 20:00',
      contact: 'homens@ieam.com.br'
    }
  },
    {
    id: '4',
    slug: 'mulheres',
    name: 'Mulheres',
    title: 'Ministério de Mulheres',
    bannerImage: 'https://images.pexels.com/photos/3810792/pexels-photo-3810792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: [
        'O Ministério de Mulheres "Mulheres Virtuosas" é um espaço de acolhimento, edificação e fortalecimento da identidade feminina em Cristo.',
        'Realizamos chás, conferências e estudos que abordam os desafios e as alegrias da vida da mulher cristã. Nosso propósito é encorajar umas às outras a florescer nos dons que Deus deu a cada uma, servindo com amor e graça.',
        'Venha fazer parte desta linda união de mulheres que buscam a presença de Deus juntas.'
    ],
    details: {
        leader: 'Pra. Lúcia Ferreira',
        schedule: 'Toda 3ª Terça-feira do mês, às 19:30',
        contact: 'mulheres@ieam.com.br'
    }
    },
    {
    id: '5',
    slug: 'ebd',
    name: 'EBD',
    title: 'Escola Bíblica Dominical',
    bannerImage: 'https://images.pexels.com/photos/415571/pexels-photo-415571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: [
        'A Escola Bíblica Dominical (EBD) é o coração do ensino em nossa igreja, oferecendo um espaço para o estudo aprofundado e sistemático da Palavra de Deus para todas as idades.',
        'Com classes divididas por faixas etárias, desde crianças até adultos, a EBD proporciona um ambiente de aprendizado interativo, onde é possível tirar dúvidas, compartilhar experiências e crescer no conhecimento das Escrituras.',
        'Participe da EBD e fortaleça os alicerces da sua fé.'
    ],
    details: {
        leader: 'Sup. Diácono Roberto Neves',
        schedule: 'Domingos, às 09:00',
        contact: 'ebd@ieam.com.br'
    }
  },
  {
    id: '6',
    slug: 'louvor',
    name: 'Louvor',
    title: 'Ministério de Louvor',
    bannerImage: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: [
      'O Ministério de Louvor "Adoração Profunda" tem como principal objetivo conduzir a igreja a uma experiência genuína de adoração e intimidade com Deus através da música.',
      'Nossa equipe é formada por músicos e vocalistas dedicados que servem com excelência e unção, buscando criar uma atmosfera onde o Espírito Santo possa se mover livremente. Os ensaios são momentos de preparo técnico e, acima de tudo, espiritual.',
      'Cremos que o louvor é uma arma poderosa que quebra cadeias e abre os céus. Se você tem um chamado para a música e deseja servir a Deus com seu talento, venha fazer parte da nossa equipe.'
    ],
    details: {
      leader: 'Líder João Batista',
      schedule: 'Ensaios aos Sábados, às 17:00',
      contact: 'louvor@ieam.com.br'
    }
  }
];

const scheduleData: ChurchService[] = [
    {
      id: 1,
      title: 'Círculo de Oração',
      day: 'Terças-feiras',
      time: '19:30',
      description: 'Um tempo dedicado à oração e intercessão. Venha buscar a face do Senhor e clamar por nossa igreja, cidade e nação.',
    },
    {
      id: 2,
      title: 'Culto de Ensino',
      day: 'Quintas-feiras',
      time: '19:30',
      description: 'Aprofunde-se na Palavra de Deus com estudos bíblicos temáticos e expositivos. Ideal para quem deseja crescer em conhecimento.',
    },
    {
      id: 3,
      title: 'Escola Bíblica Dominical',
      day: 'Domingos',
      time: '09:00',
      description: 'Classes para todas as idades, com ensino bíblico de qualidade para edificar sua fé desde o início do dia.',
    },
    {
      id: 4,
      title: 'Culto de Celebração',
      day: 'Domingos',
      time: '19:00',
      description: 'O ponto alto da nossa semana! Uma grande festa de adoração a Deus com louvor, comunhão e uma mensagem poderosa.',
    },
  ];

export const churchInfoData: ChurchInfo[] = [
    {
        id: '1',
        slug: 'historia',
        name: 'História',
        title: 'Nossa História',
        bannerImage: 'https://images.pexels.com/photos/277454/pexels-photo-277454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: [
            { type: 'paragraph', text: 'Fundada em 1998, a Igreja Evangélica Apostólica Missionária nasceu de um pequeno grupo de oração com um grande desejo de ver a comunidade transformada pelo amor de Cristo. O que começou em uma sala de estar com apenas dez membros, rapidamente floresceu em uma comunidade vibrante e crescente.' },
            { type: 'paragraph', text: 'Ao longo dos anos, crescemos em número e em fé, sempre mantendo nosso foco na pregação da Palavra, na comunhão dos santos e no serviço ao próximo. Em 2005, inauguramos nosso primeiro templo, um marco de fé e da provisão de Deus. Hoje, somos gratos por tudo que Deus tem feito e animados para o futuro que Ele nos reserva, continuando a ser um farol de esperança em nossa cidade.' }
        ]
    },
    {
        id: '2',
        slug: 'missao',
        name: 'Missão',
        title: 'Nossa Missão, Visão e Valores',
        bannerImage: 'https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: [
            { type: 'heading', text: 'Missão' },
            { type: 'paragraph', text: 'Nossa missão é glorificar a Deus, fazendo discípulos de todas as nações, batizando-os em nome do Pai, do Filho e do Espírito Santo, e ensinando-os a obedecer a tudo o que Cristo ordenou (Mateus 28:19-20).' },
            { type: 'heading', text: 'Visão' },
            { type: 'paragraph', text: 'Ser uma igreja relevante e acolhedora, que impacta a sociedade com o Evangelho transformador de Jesus, através do amor, serviço e comunhão.' },
            { type: 'heading', text: 'Valores' },
            { type: 'paragraph', text: 'Adoração a Deus, Compromisso com a Bíblia, Comunhão Fraterna, Serviço ao Próximo, Evangelismo e Missões.' }
        ]
    },
    {
        id: '3',
        slug: 'governanca',
        name: 'Governança',
        title: 'Nossa Governança',
        bannerImage: 'https://images.pexels.com/photos/7745564/pexels-photo-7745564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: [
            { type: 'paragraph', text: 'A IEAM é governada por um conselho de presbíteros, liderado pelo pastor presidente, que são responsáveis pela direção espiritual, doutrinária e administrativa da igreja. Cremos no modelo bíblico de liderança servidora, onde aqueles que lideram o fazem com humildade e para o bem do rebanho.' },
            { type: 'paragraph', text: 'O corpo diaconal atua no serviço prático e no cuidado com os membros, garantindo que as necessidades da comunidade sejam atendidas. Todas as decisões importantes são tomadas em oração e submissão à direção do Espírito Santo e da Palavra de Deus.' }
        ]
    },
    {
        id: '4',
        slug: 'principios',
        name: 'Princípios',
        title: 'Nossos Princípios de Fé',
        bannerImage: 'https://images.pexels.com/photos/458844/pexels-photo-458844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: [
            { type: 'paragraph', text: 'Cremos na Bíblia como a Palavra de Deus inspirada, inerrante e autoritativa.' },
            { type: 'paragraph', text: 'Cremos em um só Deus, eternamente existente em três pessoas: Pai, Filho e Espírito Santo.' },
            { type: 'paragraph', text: 'Cremos na divindade de nosso Senhor Jesus Cristo, em Seu nascimento virginal, em Sua vida sem pecado, em Seus milagres, em Sua morte vicária e expiatória, em Sua ressurreição corporal, em Sua ascensão à direita do Pai e em Sua volta pessoal em poder e glória.' },
            { type: 'paragraph', text: 'Cremos que a salvação é pela graça, através da fé em Jesus Cristo, e não por obras.' },
            { type: 'paragraph', text: 'Cremos no ministério atual do Espírito Santo, que capacita o crente a viver uma vida de santidade e serviço.' }
        ]
    },
    {
        id: '5',
        slug: 'financas',
        name: 'Finanças',
        title: 'Transparência Financeira',
        bannerImage: 'https://images.pexels.com/photos/6863248/pexels-photo-6863248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: [
            { type: 'paragraph', text: 'Cremos que tudo o que temos pertence a Deus, e somos apenas mordomos dos recursos que Ele nos confia. A IEAM é mantida através dos dízimos e ofertas voluntárias de seus membros e congregados, que contribuem com alegria e generosidade.' },
            { type: 'paragraph', text: 'Temos um compromisso com a transparência e a boa gestão financeira. Relatórios financeiros são apresentados periodicamente à igreja, e todos os recursos são investidos na manutenção da obra, no avanço do evangelho e no cuidado com os necessitados, para a glória de Deus.' }
        ]
    },
    {
        id: '6',
        slug: 'estatuto',
        name: 'Estatuto',
        title: 'Estatuto da Igreja',
        bannerImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: [
            { type: 'heading', text: 'Artigo 1: Denominação e Sede' },
            { type: 'paragraph', text: 'A Igreja Evangélica Apostólica Missionária, doravante denominada IEAM, é uma organização religiosa sem fins lucrativos, com sede e foro na cidade de [Cidade], estado de [UF].' },
            { type: 'heading', text: 'Artigo 2: Fins' },
            { type: 'paragraph', text: 'A IEAM tem por finalidade prestar culto a Deus, pregar o evangelho de Nosso Senhor Jesus Cristo, promover o ensino das Escrituras Sagradas, e desenvolver atividades de assistência social e beneficência.' },
            { type: 'paragraph', text: '[... O restante do estatuto pode ser detalhado aqui. Este é um conteúdo de exemplo ...]' }
        ]
    },
    {
        id: '7',
        slug: 'congregacoes',
        name: 'Congregações',
        title: 'Nossas Congregações',
        bannerImage: 'https://images.pexels.com/photos/1750275/pexels-photo-1750275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        content: [
            { type: 'paragraph', text: 'Além da nossa sede, a IEAM se estende por outras localidades, levando a Palavra de Deus a mais corações. Conheça nossas congregações.' },
        ]
    }
];

// --- MOCK API FUNCTIONS FOR EVENTS ---

export const getEvents = async (): Promise<ChurchEvent[]> => {
  console.log('Fetching events...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [...mockEvents];
};

export const createEvent = async (event: Omit<ChurchEvent, 'id'>): Promise<ChurchEvent> => {
    console.log('Creating event...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newEvent = { ...event, id: Date.now() };
    mockEvents.push(newEvent);
    return newEvent;
}

export const updateEvent = async (event: ChurchEvent): Promise<ChurchEvent> => {
    console.log('Updating event...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = mockEvents.findIndex(e => e.id === event.id);
    if (index !== -1) {
        mockEvents[index] = event;
        return event;
    }
    throw new Error("Evento não encontrado");
}

export const deleteEvent = async (id: number): Promise<void> => {
    console.log('Deleting event...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    mockEvents = mockEvents.filter(e => e.id !== id);
}

// --- MOCK API FUNCTIONS FOR MEMBERS ---

export const getMembers = async (): Promise<Member[]> => {
  console.log('Fetching members...');
  await new Promise(resolve => setTimeout(resolve, 800));
  return [...mockMembers];
};

export const createMember = async (member: Omit<Member, 'id'>): Promise<Member> => {
    console.log('Creating member...');
    await new Promise(resolve => setTimeout(resolve, 800));
    const newMember = { ...member, id: Date.now() };
    mockMembers.push(newMember);
    return newMember;
}

export const updateMember = async (member: Member): Promise<Member> => {
    console.log('Updating member...');
    await new Promise(resolve => setTimeout(resolve, 800));
    const index = mockMembers.findIndex(m => m.id === member.id);
    if (index !== -1) {
        mockMembers[index] = member;
        return member;
    }
    throw new Error("Membro não encontrado");
}

export const deleteMember = async (id: number): Promise<void> => {
    console.log('Deleting member...');
    await new Promise(resolve => setTimeout(resolve, 800));
    mockMembers = mockMembers.filter(m => m.id !== id);
}

// --- MOCK API FUNCTIONS FOR CONGREGATIONS ---

export const getCongregations = async (): Promise<Congregation[]> => {
    console.log('Fetching congregations...');
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockCongregations];
}

export const createCongregation = async (congregation: Omit<Congregation, 'id'>): Promise<Congregation> => {
    console.log('Creating congregation...');
    await new Promise(resolve => setTimeout(resolve, 800));
    const newCongregation = { ...congregation, id: Date.now() };
    mockCongregations.push(newCongregation);
    return newCongregation;
}

export const updateCongregation = async (congregation: Congregation): Promise<Congregation> => {
    console.log('Updating congregation...');
    await new Promise(resolve => setTimeout(resolve, 800));
    const index = mockCongregations.findIndex(c => c.id === congregation.id);
    if (index !== -1) {
        mockCongregations[index] = congregation;
        return congregation;
    }
    throw new Error("Congregação não encontrada");
}

export const deleteCongregation = async (id: number): Promise<void> => {
    console.log('Deleting congregation...');
    await new Promise(resolve => setTimeout(resolve, 800));
    mockCongregations = mockCongregations.filter(c => c.id !== id);
}


/**
 * Simulates fetching ministry data by its slug.
 */
export const getMinistryBySlug = (slug: string): Ministry | undefined => {
    return ministriesData.find(m => m.slug === slug);
}

/**
 * Simulates fetching church info data by its slug.
 */
export const getChurchInfoBySlug = (slug: string): ChurchInfo | undefined => {
    return churchInfoData.find(i => i.slug === slug);
}


/**
 * Simulates fetching the weekly schedule.
 */
export const getSchedule = async (): Promise<ChurchService[]> => {
    console.log('Fetching schedule...');
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Schedule fetched successfully.');
    return scheduleData;
}


/**
 * Simulates a user sign-in process.
 */
export const signInWithPassword = async (email: string, password: string) => {
  console.log(`Attempting to sign in with email: ${email}`);
  await new Promise(resolve => setTimeout(resolve, 1500));

  // ADMIN LOGIN SIMULATION
  if (email === 'admin@ieam.com.br' && password === 'admin123') {
    console.log('Admin Sign-in successful.');
    return {
        user: { id: '999', email: email, role: 'admin' },
        error: null
    }
  }

  if (password === 'password123') {
    console.log('Sign-in successful.');
    return {
      user: { id: '123', email: email, role: 'member' },
      error: null,
    };
  } else {
    console.log('Sign-in failed: Invalid credentials.');
    return {
      user: null,
      error: 'Email ou senha inválidos.',
    };
  }
};

/**
 * Simulates a user sign-up process.
 */
export const signUp = async (name: string, email: string, password: string) => {
    console.log(`Attempting to sign up with email: ${email}`);
    await new Promise(resolve => setTimeout(resolve, 1500));
  
    // Simulate existing user check
    if (email === 'user@example.com') {
        console.log('Sign-up failed: User already exists.');
       return {
          user: null,
          error: 'Usuário já cadastrado com este email.',
       };
    }
  
    console.log('Sign-up successful.');
    return {
      user: { id: '456', email: email, name: name, role: 'member' },
      error: null,
    };
  };
