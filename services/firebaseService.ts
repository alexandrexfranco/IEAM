import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser
} from 'firebase/auth';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { auth, db } from './firebaseConfig';
import { ChurchEvent, Ministry, ChurchService, ChurchInfo, Congregation, Member } from '../types';

// --- STATIC DATA (Ministries, Church Info, Schedule) ---
// These remain as static data since they don't change frequently

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
        id: '1',
        title: 'Círculo de Oração',
        day: 'Terças-feiras',
        time: '19:30',
        description: 'Um tempo dedicado à oração e intercessão. Venha buscar a face do Senhor e clamar por nossa igreja, cidade e nação.',
    },
    {
        id: '2',
        title: 'Culto de Ensino',
        day: 'Quintas-feiras',
        time: '19:30',
        description: 'Aprofunde-se na Palavra de Deus com estudos bíblicos temáticos e expositivos. Ideal para quem deseja crescer em conhecimento.',
    },
    {
        id: '3',
        title: 'Escola Bíblica Dominical',
        day: 'Domingos',
        time: '09:00',
        description: 'Classes para todas as idades, com ensino bíblico de qualidade para edificar sua fé desde o início do dia.',
    },
    {
        id: '4',
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

// --- AUTHENTICATION ---

export const signInWithPassword = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if user is admin (you can store this in Firestore user document)
        const isAdmin = email === 'admin@ieam.com.br';

        return {
            user: {
                id: user.uid,
                email: user.email || '',
                role: isAdmin ? 'admin' : 'member'
            },
            error: null
        };
    } catch (error: any) {
        return {
            user: null,
            error: error.message || 'Erro ao fazer login.'
        };
    }
};

export const signUp = async (name: string, email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // You could store additional user info in Firestore here
        // await setDoc(doc(db, 'users', user.uid), { name, email, role: 'member' });

        return {
            user: {
                id: user.uid,
                email: user.email || '',
                name: name,
                role: 'member'
            },
            error: null
        };
    } catch (error: any) {
        return {
            user: null,
            error: error.message || 'Erro ao criar conta.'
        };
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        return { error: null };
    } catch (error: any) {
        return { error: error.message || 'Erro ao fazer logout.' };
    }
};

export const onAuthStateChange = (callback: (user: FirebaseUser | null) => void) => {
    return onAuthStateChanged(auth, callback);
};

// --- EVENTS (Firestore) ---

export const getEvents = async (): Promise<ChurchEvent[]> => {
    try {
        const eventsCol = collection(db, 'events');
        const eventsSnapshot = await getDocs(eventsCol);
        const events = eventsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as ChurchEvent));
        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
};

export const createEvent = async (event: Omit<ChurchEvent, 'id'>): Promise<ChurchEvent> => {
    try {
        const eventsCol = collection(db, 'events');
        const docRef = await addDoc(eventsCol, event);
        return { ...event, id: docRef.id };
    } catch (error) {
        console.error('Error creating event:', error);
        throw new Error('Erro ao criar evento.');
    }
};

export const updateEvent = async (event: ChurchEvent): Promise<ChurchEvent> => {
    try {
        const eventDoc = doc(db, 'events', event.id);
        await updateDoc(eventDoc, { ...event });
        return event;
    } catch (error) {
        console.error('Error updating event:', error);
        throw new Error('Erro ao atualizar evento.');
    }
};

export const deleteEvent = async (id: string): Promise<void> => {
    try {
        const eventDoc = doc(db, 'events', id);
        await deleteDoc(eventDoc);
    } catch (error) {
        console.error('Error deleting event:', error);
        throw new Error('Erro ao deletar evento.');
    }
};

// --- MEMBERS (Firestore) ---

export const getMembers = async (): Promise<Member[]> => {
    try {
        const membersCol = collection(db, 'members');
        const membersSnapshot = await getDocs(membersCol);
        const members = membersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Member));
        return members;
    } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
};

export const createMember = async (member: Omit<Member, 'id'>): Promise<Member> => {
    try {
        const membersCol = collection(db, 'members');
        const docRef = await addDoc(membersCol, member);
        return { ...member, id: docRef.id };
    } catch (error) {
        console.error('Error creating member:', error);
        throw new Error('Erro ao criar membro.');
    }
};

export const updateMember = async (member: Member): Promise<Member> => {
    try {
        const memberDoc = doc(db, 'members', member.id);
        await updateDoc(memberDoc, { ...member });
        return member;
    } catch (error) {
        console.error('Error updating member:', error);
        throw new Error('Erro ao atualizar membro.');
    }
};

export const deleteMember = async (id: string): Promise<void> => {
    try {
        const memberDoc = doc(db, 'members', id);
        await deleteDoc(memberDoc);
    } catch (error) {
        console.error('Error deleting member:', error);
        throw new Error('Erro ao deletar membro.');
    }
};

// --- CONGREGATIONS (Firestore) ---

export const getCongregations = async (): Promise<Congregation[]> => {
    try {
        const congregationsCol = collection(db, 'congregations');
        const congregationsSnapshot = await getDocs(congregationsCol);
        const congregations = congregationsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Congregation));
        return congregations;
    } catch (error) {
        console.error('Error fetching congregations:', error);
        return [];
    }
};

export const createCongregation = async (congregation: Omit<Congregation, 'id'>): Promise<Congregation> => {
    try {
        const congregationsCol = collection(db, 'congregations');
        const docRef = await addDoc(congregationsCol, congregation);
        return { ...congregation, id: docRef.id };
    } catch (error) {
        console.error('Error creating congregation:', error);
        throw new Error('Erro ao criar congregação.');
    }
};

export const updateCongregation = async (congregation: Congregation): Promise<Congregation> => {
    try {
        const congregationDoc = doc(db, 'congregations', congregation.id);
        await updateDoc(congregationDoc, { ...congregation });
        return congregation;
    } catch (error) {
        console.error('Error updating congregation:', error);
        throw new Error('Erro ao atualizar congregação.');
    }
};

export const deleteCongregation = async (id: string): Promise<void> => {
    try {
        const congregationDoc = doc(db, 'congregations', id);
        await deleteDoc(congregationDoc);
    } catch (error) {
        console.error('Error deleting congregation:', error);
        throw new Error('Erro ao deletar congregação.');
    }
};

// --- STORAGE (ImgBB) ---

export const uploadImage = async (file: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append('image', file);

        const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
        if (!apiKey) {
            throw new Error('ImgBB API Key não configurada. Adicione VITE_IMGBB_API_KEY no .env.local');
        }

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            return data.data.url;
        } else {
            throw new Error(data.error?.message || 'Erro ao fazer upload da imagem.');
        }
    } catch (error: any) {
        console.error('Error uploading image:', error);
        throw new Error(error.message || 'Erro ao fazer upload da imagem.');
    }
};

// --- STATIC DATA HELPERS ---

export const getMinistryBySlug = (slug: string): Ministry | undefined => {
    return ministriesData.find(m => m.slug === slug);
};

export const getChurchInfoBySlug = (slug: string): ChurchInfo | undefined => {
    return churchInfoData.find(i => i.slug === slug);
};

export const getSchedule = async (): Promise<ChurchService[]> => {
    return scheduleData;
};
