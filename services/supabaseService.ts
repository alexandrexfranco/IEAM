
import { ChurchEvent } from '../types';

// --- MOCK DATA ---
const mockEvents: ChurchEvent[] = [
  {
    id: 1,
    title: 'Culto de Celebração',
    date: 'Todo Domingo',
    time: '19:00',
    description: 'Junte-se a nós para um tempo de louvor, adoração e uma mensagem inspiradora da Palavra de Deus.',
    image: 'https://picsum.photos/400/300?random=10',
  },
  {
    id: 2,
    title: 'Estudo Bíblico Semanal',
    date: 'Toda Quarta-feira',
    time: '20:00',
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

// --- MOCK API FUNCTIONS ---

/**
 * Simulates fetching events from a database.
 * @returns A promise that resolves to an array of ChurchEvent objects.
 */
export const getEvents = async (): Promise<ChurchEvent[]> => {
  console.log('Fetching events...');
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Events fetched successfully.');
  return mockEvents;
};

/**
 * Simulates a user sign-in process.
 * @param email The user's email.
 * @param password The user's password.
 * @returns A promise that resolves to an object containing user data or an error.
 */
export const signInWithPassword = async (email: string, password: string) => {
  console.log(`Attempting to sign in with email: ${email}`);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (password === 'password123') {
    console.log('Sign-in successful.');
    return {
      user: { id: '123', email: email },
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
