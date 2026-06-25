import { getCurrentUser } from '../utils/auth';
export interface Verb {
  id: number;
  infinitive: string;
  spanish: string;
  imageUrl: string;
  present: string;
  past: string;
  future: string;
  examplePresent: string[];
  examplePast: string[];
  exampleFuture: string[];
}

export const verbs: Verb[] = [
  {
    id: 1,
    infinitive: 'eat',
    spanish: 'comer',
    imageUrl: '/images/eat.jpeg',
    present: 'eat/eats',
    past: 'ate',
    future: 'will eat',
    examplePresent: ['I', 'eat', 'pizza', 'every', 'day'],
    examplePast: ['I', 'ate', 'pizza', 'yesterday'],
    exampleFuture: ['I', 'will', 'eat', 'pizza', 'tomorrow'],
  },
  {
    id: 2,
    infinitive: 'run',
    spanish: 'correr',
    imageUrl: '/images/run.jpeg',
    present: 'run/runs',
    past: 'ran',
    future: 'will run',
    examplePresent: ['She', 'runs', 'in', 'the', 'park'],
    examplePast: ['She', 'ran', 'in', 'the', 'park'],
    exampleFuture: ['She', 'will', 'run', 'tomorrow'],
  },
  {
    id: 3,
    infinitive: 'swim',
    spanish: 'nadar',
    imageUrl: '/images/swim.jpeg',
    present: 'swim/swims',
    past: 'swam',
    future: 'will swim',
    examplePresent: ['He', 'swims', 'every', 'morning'],
    examplePast: ['He', 'swam', 'last', 'week'],
    exampleFuture: ['He', 'will', 'swim', 'tomorrow'],
  },
  {
    id: 4,
    infinitive: 'read',
    spanish: 'leer',
    imageUrl: '/images/read.jpeg',
    present: 'read/reads',
    past: 'read',
    future: 'will read',
    examplePresent: ['I', 'read', 'books', 'daily'],
    examplePast: ['I', 'read', 'a', 'book', 'yesterday'],
    exampleFuture: ['I', 'will', 'read', 'later'],
  },
  {
    id: 5,
    infinitive: 'write',
    spanish: 'escribir',
    imageUrl: '/images/write.jpeg',
    present: 'write/writes',
    past: 'wrote',
    future: 'will write',
    examplePresent: ['She', 'writes', 'every', 'day'],
    examplePast: ['She', 'wrote', 'a', 'letter'],
    exampleFuture: ['She', 'will', 'write', 'tomorrow'],
  },
  {
    id: 6,
    infinitive: 'sing',
    spanish: 'cantar',
    imageUrl: '/images/sing.jpeg',
    present: 'sing/sings',
    past: 'sang',
    future: 'will sing',
    examplePresent: ['He', 'sings', 'very', 'well'],
    examplePast: ['He', 'sang', 'yesterday'],
    exampleFuture: ['He', 'will', 'sing', 'later'],
  },
  {
    id: 7,
    infinitive: 'dance',
    spanish: 'bailar',
    imageUrl: '/images/dance.jpeg',
    present: 'dance/dances',
    past: 'danced',
    future: 'will dance',
    examplePresent: ['They', 'dance', 'together'],
    examplePast: ['They', 'danced', 'last', 'night'],
    exampleFuture: ['They', 'will', 'dance', 'tomorrow'],
  },
  {
    id: 8,
    infinitive: 'play',
    spanish: 'jugar',
    imageUrl: '/images/play.jpeg',
    present: 'play/plays',
    past: 'played',
    future: 'will play',
    examplePresent: ['We', 'play', 'soccer', 'daily'],
    examplePast: ['We', 'played', 'soccer', 'yesterday'],
    exampleFuture: ['We', 'will', 'play', 'tomorrow'],
  },
  {
    id: 9,
    infinitive: 'cook',
    spanish: 'cocinar',
    imageUrl: '/images/cook.jpeg',
    present: 'cook/cooks',
    past: 'cooked',
    future: 'will cook',
    examplePresent: ['Mom', 'cooks', 'delicious', 'food'],
    examplePast: ['Mom', 'cooked', 'pasta', 'yesterday'],
    exampleFuture: ['Mom', 'will', 'cook', 'tomorrow'],
  },
  {
    id: 10,
    infinitive: 'study',
    spanish: 'estudiar',
    imageUrl: '/images/study.jpeg',
    present: 'study/studies',
    past: 'studied',
    future: 'will study',
    examplePresent: ['I', 'study', 'English', 'daily'],
    examplePast: ['I', 'studied', 'math', 'yesterday'],
    exampleFuture: ['I', 'will', 'study', 'tonight'],
  },
  {
    id: 11,
    infinitive: 'jump',
    spanish: 'saltar',
    imageUrl: '/images/jump.jpeg',
    present: 'jump/jumps',
    past: 'jumped',
    future: 'will jump',
    examplePresent: ['The', 'cat', 'jumps', 'high'],
    examplePast: ['The', 'cat', 'jumped', 'yesterday'],
    exampleFuture: ['The', 'cat', 'will', 'jump'],
  },
  {
    id: 12,
    infinitive: 'sleep',
    spanish: 'dormir',
    imageUrl: '/images/sleep.jpeg',
    present: 'sleep/sleeps',
    past: 'slept',
    future: 'will sleep',
    examplePresent: ['I', 'sleep', 'eight', 'hours'],
    examplePast: ['I', 'slept', 'well', 'yesterday'],
    exampleFuture: ['I', 'will', 'sleep', 'early'],
  },
  {
    id: 13,
    infinitive: 'walk',
    spanish: 'caminar',
    imageUrl: '/images/walk.jpeg',
    present: 'walk/walks',
    past: 'walked',
    future: 'will walk',
    examplePresent: ['She', 'walks', 'to', 'school'],
    examplePast: ['She', 'walked', 'home', 'yesterday'],
    exampleFuture: ['She', 'will', 'walk', 'tomorrow'],
  },
  {
    id: 14,
    infinitive: 'drive',
    spanish: 'conducir',
    imageUrl: '/images/drive.jpeg',
    present: 'drive/drives',
    past: 'drove',
    future: 'will drive',
    examplePresent: ['Dad', 'drives', 'to', 'work'],
    examplePast: ['Dad', 'drove', 'yesterday'],
    exampleFuture: ['Dad', 'will', 'drive', 'tomorrow'],
  },
  {
    id: 15,
    infinitive: 'teach',
    spanish: 'enseñar',
    imageUrl: '/images/teach.jpeg',
    present: 'teach/teaches',
    past: 'taught',
    future: 'will teach',
    examplePresent: ['She', 'teaches', 'English', 'well'],
    examplePast: ['She', 'taught', 'us', 'yesterday'],
    exampleFuture: ['She', 'will', 'teach', 'tomorrow'],
  },
  {
    id: 16,
    infinitive: 'listen',
    spanish: 'escuchar',
    imageUrl: '/images/listen.jpeg',
    present: 'listen/listens',
    past: 'listened',
    future: 'will listen',
    examplePresent: ['We', 'listen', 'to', 'music'],
    examplePast: ['We', 'listened', 'yesterday'],
    exampleFuture: ['We', 'will', 'listen', 'later'],
  },
];

// Progress tracking
export interface VerbProgress {
  verbId: number;
  attempts: number;
  correctAttempts: number;
  lastAttempt: Date | null;
  mastered: boolean;
}

export const getInitialProgress = (): VerbProgress[] => {
  return verbs.map((verb) => ({
    verbId: verb.id,
    attempts: 0,
    correctAttempts: 0,
    lastAttempt: null,
    mastered: false,
  }));
};

export const saveProgress = (progress: VerbProgress[]) => {
  localStorage.setItem('verbProgress', JSON.stringify(progress));
};

export const loadProgress = () => {
  const user = getCurrentUser();

  // Si no hay usuario logueado, devolvemos un historial vacío
  if (!user) return [];

  // Buscamos el progreso ESPECÍFICO de este correo en el almacenamiento
  const storedProgress = localStorage.getItem(`progress_${user.email}`);

  // Si el usuario ya tiene progreso guardado, lo cargamos
  if (storedProgress) {
    return JSON.parse(storedProgress);
  }

  // Si es un USUARIO NUEVO (storedProgress es null),
  // le creamos un historial limpio (todo en 0) basado en la cantidad de verbos
  return verbs.map(verb => ({
    verbId: verb.id,
    attempts: 0,
    correctAttempts: 0,
    mastered: false
  }));
};