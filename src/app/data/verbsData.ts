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
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
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

export const loadProgress = (): VerbProgress[] => {
  const saved = localStorage.getItem('verbProgress');
  return saved ? JSON.parse(saved) : getInitialProgress();
};
