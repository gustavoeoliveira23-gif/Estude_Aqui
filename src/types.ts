export type SectorType = 'tecnologia' | 'administracao';

export type AcademicLevel = 'Iniciante' | 'Intermediário' | 'Avançado';

export type CourseType = 'Técnico' | 'Tecnólogo' | 'Graduação' | 'Pós-graduação' | 'Autodidata';

export interface MissedQuizQuestion {
  id: string | number;
  question: string;
  topic: string;
  selectedOption: string;
  correctOption: string;
  explanation: string;
  timestamp: string;
  resolved?: boolean;
}

export interface StudentProfile {
  courseType: CourseType;
  courseName: string;
  level: AcademicLevel;
  targetFocus: string;
  targetArea?: string;
  studyObjective?: string;
  diagnosticDone: boolean;
  diagnosticSummary?: string;
  calculatedScore?: number;
  roadmap?: string[];
  focusAreas?: string[];
  missedQuizQuestions?: MissedQuizQuestion[];
  weakTopics?: string[];
  strengths?: string[];
  learningGaps?: string[];
  tutorAdvice?: string;
  recommendedBooks?: string[];
  recommendedFlashcards?: { front: string; back: string; category: string }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  joinedDate: string;
  currentSector: SectorType;
  profile: StudentProfile;
  xp: number;
  levelTitle: string;
}

export interface Flashcard {
  id: string;
  deckId: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  reviewCount: number;
  correctCount: number;
  lastReviewed?: string;
  status: 'new' | 'learning' | 'mastered';
}

export interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  category: string;
  cardCount: number;
  sector: SectorType;
  iconName: string;
  color: string;
  level: AcademicLevel | 'Todos';
}

export interface PomodoroSettings {
  workTime: number; // minutes
  shortBreak: number;
  longBreak: number;
  soundEnabled: boolean;
  ambientSound: 'none' | 'whitenoise' | 'rain' | 'binaural';
  autoStartBreaks: boolean;
}

export interface DailyStudyLog {
  date: string;
  day?: string;
  minutes: number;
  cardsReviewed: number;
  pomodorosCompleted: number;
}

export interface StudyStats {
  totalStudyMinutes: number;
  streakDays: number;
  lastStudyDate: string;
  cardsReviewedTotal: number;
  cardsMasteredTotal: number;
  pomodorosCompleted: number;
  dailyLogs: DailyStudyLog[];
  dailyStudyMinutes: { day: string; minutes: number }[];
  subjectMastery: {
    subject: string;
    score: number;
    totalCards: number;
  }[];
}

export interface CuratedResource {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  type: 'documentacao' | 'artigo' | 'especificacao_rfc' | 'tutorial_externo' | 'repositorio_guia' | 'video' | 'curso';
  durationOrReadTime: string;
  level: AcademicLevel | 'Todos';
  sector: SectorType;
  category: string;
  topic?: string;
  officialDoc?: boolean;
  isYoutube?: boolean;
  youtubeId?: string;
  rating?: number;
  free: boolean;
  tags: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  date: string;
  category: string;
  sector: SectorType;
  readTime: string;
  tag: string;
}

export interface StudyNote {
  id: string;
  title: string;
  content: string;
  category: string;
  sector: SectorType;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendations?: {
    title: string;
    url: string;
    type: 'video' | 'curso' | 'artigo' | 'doc';
    source: string;
    level?: string;
  }[];
  keyPoints?: string[];
}

export type ActiveTab =
  | 'dashboard'
  | 'flashcards'
  | 'pomodoro'
  | 'notes'
  | 'chat'
  | 'resources'
  | 'gdrive'
  | 'stats'
  | 'profile';
