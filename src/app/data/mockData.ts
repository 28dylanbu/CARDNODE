export interface Flashcard {
  id: string;
  term: string;
  phonetic: string;
  definition: string;
  example: string;
}

export interface Deck {
  id: string;
  title: string;
  category: string;
  total: number;
  studied: number;
  color: string;
}

export const decks: Deck[] = [
  {
    id: '1',
    title: 'Phrasal Verbs',
    category: 'Grammar',
    total: 50,
    studied: 32,
    color: '#6FCF97',
  },
  {
    id: '2',
    title: 'Financial English',
    category: 'Business',
    total: 40,
    studied: 15,
    color: '#F2C94C',
  },
  {
    id: '3',
    title: 'Collocations',
    category: 'Vocabulary',
    total: 60,
    studied: 48,
    color: '#FF9F9F',
  },
  {
    id: '4',
    title: 'Academic Writing',
    category: 'Writing',
    total: 35,
    studied: 20,
    color: '#BB6BD9',
  },
  {
    id: '5',
    title: 'IELTS Speaking',
    category: 'Test Prep',
    total: 45,
    studied: 0,
    color: '#56CCF2',
  },
  {
    id: '6',
    title: 'Idioms & Expressions',
    category: 'Advanced',
    total: 55,
    studied: 38,
    color: '#F2994A',
  },
];

export const flashcards: Record<string, Flashcard[]> = {
  '1': [
    {
      id: '1-1',
      term: 'bring up',
      phonetic: '/brɪŋ ʌp/',
      definition: 'To mention or introduce a topic in conversation',
      example: 'She brought up an interesting point during the meeting.',
    },
    {
      id: '1-2',
      term: 'call off',
      phonetic: '/kɔːl ɒf/',
      definition: 'To cancel an event or arrangement',
      example: 'They decided to call off the wedding.',
    },
    {
      id: '1-3',
      term: 'come across',
      phonetic: '/kʌm əˈkrɒs/',
      definition: 'To find something by chance or to give a certain impression',
      example: 'I came across this old photo album in the attic.',
    },
    {
      id: '1-4',
      term: 'get over',
      phonetic: '/ɡet ˈəʊvə/',
      definition: 'To recover from an illness or difficult experience',
      example: "It took her months to get over the breakup.",
    },
    {
      id: '1-5',
      term: 'look into',
      phonetic: '/lʊk ˈɪntuː/',
      definition: 'To investigate or examine something',
      example: 'The police are looking into the matter.',
    },
  ],
  '2': [
    {
      id: '2-1',
      term: 'asset',
      phonetic: '/ˈæset/',
      definition: 'A useful or valuable thing, person, or quality',
      example: 'Experience is a valuable asset in any profession.',
    },
    {
      id: '2-2',
      term: 'liability',
      phonetic: '/ˌlaɪəˈbɪləti/',
      definition: 'A thing for which someone is responsible, especially a debt',
      example: 'The company has significant financial liabilities.',
    },
    {
      id: '2-3',
      term: 'equity',
      phonetic: '/ˈekwəti/',
      definition: 'The value of shares issued by a company',
      example: 'They decided to increase their equity stake in the business.',
    },
  ],
};

export interface StudySession {
  deckId: string;
  cards: Flashcard[];
  results: Record<string, 'difficult' | 'hard' | 'mastered'>;
}
