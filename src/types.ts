export type MainSection = 'guida' | 'progressi';
export type GuideSubSection = 'comandi' | 'rinforzo';

export type CommandDifficulty = 'Principiante' | 'Intermedio' | 'Avanzato';

export type CommandCategory = 'Obbedienza' | 'Sicurezza' | 'Autocontrollo';

export interface CommandGuide {
  id: string;
  name: string;
  translation: string;
  category: CommandCategory;
  difficulty: CommandDifficulty;
  shortDesc: string;
  iconName: string;
  importance: string;
  vocalCue: string;
  handSignal: string;
  steps: {
    number: number;
    title: string;
    description: string;
  }[];
  commonMistakes: string[];
  trainerTip: string;
}

export interface TechniqueGuide {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  iconName: string;
  summary: string;
  coreRule: string;
  bulletPoints: {
    title: string;
    desc: string;
  }[];
  practicalExample: string;
}

export type SessionRating = 1 | 2 | 3 | 4 | 5; // 1-2: Da migliorare, 3: Buono, 4-5: Ottimo
export type DistractionLevel = 'bassa' | 'media' | 'alta';
export type PuppyMood = 'attento' | 'gioioso' | 'distratto' | 'stanco';

export interface TrainingSession {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  commandId: string;
  commandName: string;
  durationMinutes: number;
  rating: SessionRating;
  distractionLevel: DistractionLevel;
  puppyMood: PuppyMood;
  notes: string;
  treatUsed?: string;
}

export interface PuppyProfile {
  name: string;
  breed?: string;
  ageMonths?: number;
}
