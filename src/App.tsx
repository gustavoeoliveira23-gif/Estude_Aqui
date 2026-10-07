import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { AuthModal } from './components/AuthModal';
import { DiagnosticQuizModal } from './components/DiagnosticQuizModal';
import { DashboardView } from './components/DashboardView';
import { FlashcardsView } from './components/FlashcardsView';
import { PomodoroView } from './components/PomodoroView';
import { NotesView } from './components/NotesView';
import { AIChatView } from './components/AIChatView';
import { StatsView } from './components/StatsView';
import { ResourcesDirectoryView } from './components/ResourcesDirectoryView';
import { GoogleDriveFilesView } from './components/GoogleDriveFilesView';
import { CuratedResource } from './types';

import {
  ActiveTab,
  ChatMessage,
  Flashcard,
  FlashcardDeck,
  SectorType,
  StudentProfile,
  StudyNote,
  StudyStats,
  User
} from './types';
import {
  INITIAL_DECKS,
  INITIAL_FLASHCARDS,
  INITIAL_NEWS,
  INITIAL_NOTES,
  INITIAL_RESOURCES,
  INITIAL_STATS
} from './data/mockData';

export function App() {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('synapse_theme') as 'dark' | 'light') || 'dark';
  });

  // Sales Landing Page vs Full Platform View
  // Login is mandatory: unauthenticated visitors are always kept on the Landing Page.
  const [showLanding, setShowLanding] = useState<boolean>(() => {
    const userSaved = localStorage.getItem('synapse_user');
    return !userSaved;
  });

  // User Authentication
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('synapse_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [resourcesFilterOnlyErrors, setResourcesFilterOnlyErrors] = useState<boolean>(false);

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  // Active view & Sector
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [currentSector, setCurrentSector] = useState<SectorType>('tecnologia');

  // Application Data States (Persisted in localStorage)
  const [decks, setDecks] = useState<FlashcardDeck[]>(() => {
    const saved = localStorage.getItem('synapse_decks');
    return saved ? JSON.parse(saved) : INITIAL_DECKS;
  });

  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    const saved = localStorage.getItem('synapse_cards');
    return saved ? JSON.parse(saved) : INITIAL_FLASHCARDS;
  });

  const [notes, setNotes] = useState<StudyNote[]>(() => {
    const saved = localStorage.getItem('synapse_notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [stats, setStats] = useState<StudyStats>(() => {
    const saved = localStorage.getItem('synapse_stats');
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('synapse_chat');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'msg-welcome',
            sender: 'assistant',
            text: 'Olá! Sou seu Tutor de Estudos com IA. Qual matéria ou conceito técnico você gostaria de pesquisar e dominar hoje? Posso explicar com analogias, exemplos práticos de código e indicar cursos e vídeos gratuitos do YouTube.',
            timestamp: new Date().toISOString(),
            recommendations: [
              {
                title: 'Harvard CS50 - Introdução à Ciência da Computação (Gratuito)',
                url: 'https://cs50.harvard.edu/x/',
                source: 'Harvard / edX',
                type: 'curso',
              },
              {
                title: 'Curso em Vídeo: Algoritmos e Lógica de Programação - Prof. Guanabara',
                url: 'https://www.youtube.com/playlist?list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV',
                source: 'Curso em Vídeo (YouTube)',
                type: 'video',
              },
            ],
          },
        ];
  });

  // Toggle Theme Class on <html> or container
  useEffect(() => {
    localStorage.setItem('synapse_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Persist storage whenever state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('synapse_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('synapse_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('synapse_decks', JSON.stringify(decks));
  }, [decks]);

  useEffect(() => {
    localStorage.setItem('synapse_cards', JSON.stringify(flashcards));
  }, [flashcards]);

  useEffect(() => {
    localStorage.setItem('synapse_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('synapse_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('synapse_chat', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Auth Handler
  const handleAuthSuccess = (authenticatedUser: User) => {
    let finalUser = authenticatedUser;
    const pendingProfileRaw = localStorage.getItem('synapse_pending_profile');
    if (pendingProfileRaw) {
      try {
        const pendingProfile: StudentProfile = JSON.parse(pendingProfileRaw);
        finalUser = {
          ...authenticatedUser,
          profile: pendingProfile,
          xp: (authenticatedUser.xp || 150) + 100,
        };
        localStorage.removeItem('synapse_pending_profile');
      } catch (err) {
        console.error('Erro ao recuperar perfil pendente:', err);
      }
    }

    setUser(finalUser);
    setIsAuthOpen(false);
    setShowLanding(false);
    localStorage.setItem('synapse_landing_viewed', 'true');

    // If user hasn't completed diagnostic quiz, open it!
    if (!finalUser.profile?.diagnosticDone) {
      setTimeout(() => {
        setIsDiagnosticOpen(true);
      }, 300);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('synapse_user');
    setShowLanding(true);
    setActiveTab('dashboard');
  };

  // Profile Diagnostic update
  const handleSaveProfile = (profile: StudentProfile) => {
    if (user) {
      const updatedUser: User = {
        ...user,
        profile,
        xp: user.xp + 100, // XP bonus for diagnostic
      };
      setUser(updatedUser);
      setShowLanding(false);
      localStorage.setItem('synapse_landing_viewed', 'true');
    } else {
      // Login is mandatory to access the platform:
      // Store pending profile and prompt user to login or register
      localStorage.setItem('synapse_pending_profile', JSON.stringify(profile));
      handleOpenAuth('register');
    }
  };

  // Flashcards Management
  const handleUpdateFlashcard = (card: Flashcard, result: 'wrong' | 'good' | 'easy') => {
    const isCorrect = result === 'good' || result === 'easy';
    const isMastered = result === 'easy';

    setFlashcards((prev) =>
      prev.map((c) => {
        if (c.id === card.id) {
          const newCorrectCount = isCorrect ? c.correctCount + 1 : c.correctCount;
          return {
            ...c,
            reviewCount: c.reviewCount + 1,
            correctCount: newCorrectCount,
            status: isMastered ? 'mastered' : isCorrect ? 'review' : 'learning',
            lastReviewed: new Date().toISOString(),
          };
        }
        return c;
      })
    );

    // Update Stats
    setStats((prev) => ({
      ...prev,
      cardsReviewedTotal: prev.cardsReviewedTotal + 1,
      cardsMasteredTotal: isMastered ? prev.cardsMasteredTotal + 1 : prev.cardsMasteredTotal,
    }));

    if (user) {
      setUser((prev) => (prev ? { ...prev, xp: prev.xp + (isCorrect ? 10 : 2) } : null));
    }
  };

  const handleAddCards = (
    deckId: string,
    newCards: Omit<Flashcard, 'id' | 'deckId' | 'reviewCount' | 'correctCount' | 'status'>[]
  ) => {
    const formattedCards: Flashcard[] = newCards.map((c, i) => ({
      ...c,
      id: `card-${Date.now()}-${i}`,
      deckId,
      reviewCount: 0,
      correctCount: 0,
      status: 'learning',
    }));

    setFlashcards((prev) => [...prev, ...formattedCards]);

    // Update deck card count
    setDecks((prev) =>
      prev.map((d) => (d.id === deckId ? { ...d, cardCount: d.cardCount + newCards.length } : d))
    );
  };

  const handleCreateDeck = (deckData: Omit<FlashcardDeck, 'id' | 'cardCount'>): string => {
    const newId = 'deck-' + Date.now();
    const newDeck: FlashcardDeck = {
      ...deckData,
      id: newId,
      cardCount: 0,
    };
    setDecks((prev) => [newDeck, ...prev]);
    return newId;
  };

  // Pomodoro Session Complete
  const handleCompletePomodoro = (minutes: number) => {
    setStats((prev) => {
      const today = new Date().toLocaleDateString('pt-BR', { weekday: 'short' }).slice(0, 3);
      const updatedDaily = prev.dailyStudyMinutes.map((d) =>
        d.day.toLowerCase() === today.toLowerCase() ? { ...d, minutes: d.minutes + minutes } : d
      );

      return {
        ...prev,
        totalStudyMinutes: prev.totalStudyMinutes + minutes,
        pomodorosCompleted: prev.pomodorosCompleted + 1,
        dailyStudyMinutes: updatedDaily,
      };
    });

    if (user) {
      setUser((prev) => (prev ? { ...prev, xp: prev.xp + 25 } : null));
    }
  };

  // Notes Management
  const handleSaveNote = (note: StudyNote) => {
    setNotes((prev) => {
      const exists = prev.some((n) => n.id === note.id);
      if (exists) {
        return prev.map((n) => (n.id === note.id ? note : n));
      }
      return [note, ...prev];
    });
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // AI Chat Assistant
  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toISOString(),
    };

    setChatMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch('/api/ai/study-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          courseName: user?.profile?.courseName || 'Tecnologia da Informação',
          studentLevel: user?.profile?.level || 'Iniciante',
          sector: currentSector,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: ChatMessage = {
          id: 'msg-' + (Date.now() + 1),
          sender: 'assistant',
          text: data.reply || 'Aqui está a explicação do conceito.',
          timestamp: new Date().toISOString(),
          recommendations: data.recommendations || [],
        };
        setChatMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('Fallback to local assistant');
      }
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'assistant',
        text: `Entendido! Para **${text}**, a melhor abordagem é consolidar a fundamentação teórica e praticar com exemplos aplicados ao seu nível (${user?.profile?.level || 'Iniciante'}).`,
        timestamp: new Date().toISOString(),
        recommendations: [
          {
            title: `Playlist de Estudo: ${text}`,
            url: `https://www.youtube.com/results?search_query=curso+${encodeURIComponent(text)}`,
            source: 'YouTube Education',
            type: 'video',
          },
        ],
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
    }
  };

  // Cross-feature Generators
  const handleGenerateCardsForTopic = (topic: string, description?: string) => {
    const targetDeckId = handleCreateDeck({
      title: `Deck: ${topic.slice(0, 30)}`,
      description: description?.slice(0, 100) || `Estudo aprofundado sobre ${topic}`,
      category: topic.slice(0, 20),
      sector: currentSector,
      iconName: 'Sparkles',
      color: 'emerald',
      level: user?.profile?.level || 'Iniciante',
    });

    handleAddCards(targetDeckId, [
      {
        front: `Qual é o conceito fundamental de ${topic}?`,
        back: description || `É um pilar essencial nos estudos de ${user?.profile?.courseName || 'TI'}.`,
        category: topic.slice(0, 20),
        difficulty: 'Médio',
      },
      {
        front: `Quais são as principais vantagens e aplicações práticas de ${topic}?`,
        back: `Melhoria de desempenho, organização arquitetural e maior escalabilidade de software.`,
        category: topic.slice(0, 20),
        difficulty: 'Fácil',
      },
    ]);

    setActiveTab('flashcards');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200 flex flex-col">
      {!user || showLanding ? (
        <LandingPage
          user={user}
          onGetStarted={() => {
            if (user) {
              setShowLanding(false);
              setIsDiagnosticOpen(true);
            } else {
              setIsDiagnosticOpen(true);
            }
          }}
          onLogin={() => handleOpenAuth('login')}
          onReturnToPlatform={user ? () => setShowLanding(false) : undefined}
          darkMode={theme === 'dark'}
          setDarkMode={(val) => setTheme(val ? 'dark' : 'light')}
        />
      ) : (
        <>
          {/* Top Main Navigation for Platform */}
          <Navbar
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenAuth={(mode) => handleOpenAuth(mode || 'login')}
            onLogout={handleLogout}
            darkMode={theme === 'dark'}
            setDarkMode={(val) => setTheme(val ? 'dark' : 'light')}
            onOpenLanding={() => setShowLanding(true)}
          />

          {/* Main View Router */}
          <main className="flex-1">
            {activeTab === 'dashboard' && (
              <DashboardView
                user={user}
                currentSector={currentSector}
                stats={stats}
                news={INITIAL_NEWS}
                resources={INITIAL_RESOURCES}
                setActiveTab={setActiveTab}
                onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
                onOpenAuth={() => handleOpenAuth('login')}
                onStartFlashcardDeck={(deckId) => {
                  setActiveTab('flashcards');
                }}
              />
            )}

            {activeTab === 'flashcards' && (
              <FlashcardsView
                decks={decks}
                flashcards={flashcards}
                currentSector={currentSector}
                user={user}
                onUpdateFlashcard={handleUpdateFlashcard}
                onAddCards={handleAddCards}
                onCreateDeck={handleCreateDeck}
              />
            )}

            {activeTab === 'pomodoro' && (
              <PomodoroView onCompleteSession={handleCompletePomodoro} />
            )}

            {activeTab === 'chat' && (
              <AIChatView
                messages={chatMessages}
                user={user}
                currentSector={currentSector}
                onSendMessage={handleSendMessage}
                onSaveAsNote={(title, content) => {
                  const newNote: StudyNote = {
                    id: 'note-' + Date.now(),
                    title,
                    content,
                    category: 'Tutor IA',
                    sector: currentSector,
                    tags: ['ia', 'resumo'],
                    createdAt: new Date().toISOString().split('T')[0],
                    updatedAt: new Date().toISOString().split('T')[0],
                  };
                  handleSaveNote(newNote);
                }}
                onGenerateFlashcards={(topic) => handleGenerateCardsForTopic(topic)}
              />
            )}

            {activeTab === 'notes' && (
              <NotesView
                notes={notes}
                currentSector={currentSector}
                onSaveNote={handleSaveNote}
                onDeleteNote={handleDeleteNote}
                onGenerateFlashcardsFromNote={(topic, text) => handleGenerateCardsForTopic(topic, text)}
              />
            )}

            {activeTab === 'stats' && (
              <StatsView
                stats={stats}
                user={user}
                currentSector={currentSector}
                setCurrentSector={setCurrentSector}
                onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
                onOpenAuth={(mode) => handleOpenAuth(mode || 'login')}
              />
            )}

            {activeTab === 'resources' && (
              <ResourcesDirectoryView
                resources={INITIAL_RESOURCES}
                currentSector={currentSector}
                user={user}
                onGenerateCardsForResource={(title, desc) => handleGenerateCardsForTopic(title, desc)}
                initialFilterOnlyErrors={resourcesFilterOnlyErrors}
              />
            )}

            {activeTab === 'gdrive' && (
              <GoogleDriveFilesView
                onAddResourceFromDrive={(resource) => {
                  INITIAL_RESOURCES.unshift(resource);
                  setActiveTab('resources');
                }}
                onGenerateFlashcardsFromFile={(fileName, summary) => {
                  handleGenerateCardsForTopic(fileName, summary);
                }}
                onCreateNoteFromFile={(fileName, summary) => {
                  const newNote: StudyNote = {
                    id: 'note-' + Date.now(),
                    title: `Estudo: ${fileName.replace(/\.[^/.]+$/, '').replace(/_/g, ' ')}`,
                    content: `# ${fileName}\n\n## Resumo do Material\n${summary}\n\n## Conceitos-Chave e Anotações\n- Ponto 1: \n- Ponto 2: \n\n## Questões de Revisão\n1. Como este conceito é aplicado em projetos reais?\n`,
                    category: 'Google Drive',
                    sector: currentSector,
                    tags: ['google-drive', 'material-oficial', 'resumo'],
                    createdAt: new Date().toISOString().split('T')[0],
                    updatedAt: new Date().toISOString().split('T')[0],
                  };
                  handleSaveNote(newNote);
                  setActiveTab('notes');
                }}
              />
            )}
          </main>

          {/* Platform Footer (Minimalist, No Logo Icon, No Version Tag) */}
          <footer className="mt-16 sm:mt-24 border-t border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 py-8 px-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-zinc-800 dark:text-zinc-200">Estude <span className="text-emerald-600 dark:text-emerald-400">Aqui</span></span>
                <span>— Plataforma de Estudos Inteligente</span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <button
                  type="button"
                  onClick={() => setShowLanding(true)}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium cursor-pointer"
                >
                  Página de Apresentação
                </button>
                <span>•</span>
                <span>Flashcards</span>
                <span>•</span>
                <span>Pomodoro</span>
                <span>•</span>
                <span>Diagnóstico</span>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Authentication Modal (Login / Register / Recover) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onSuccess={handleAuthSuccess}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Diagnostic & Profile Analysis Modal */}
      <DiagnosticQuizModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        user={user}
        onSaveProfile={handleSaveProfile}
        onNavigateToResourcesWithFilter={(_topic, onlyErrors) => {
          setActiveTab('resources');
          setResourcesFilterOnlyErrors(!!onlyErrors);
        }}
        onNavigateToGDrive={() => {
          setActiveTab('gdrive');
        }}
        onAddFlashcards={(cards) => {
          handleAddCards(
            'deck-1',
            cards.map((c) => ({
              front: c.front,
              back: c.back,
              category: c.category || 'Diagnóstico',
              difficulty: 'Médio',
            }))
          );
        }}
        onAddStudyNote={(title, content, category) => {
          handleSaveNote({
            id: 'note-' + Date.now(),
            title,
            content,
            category,
            sector: currentSector,
            tags: ['Diagnóstico', 'Tutor IA', 'Plano de Estudo'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }}
      />
    </div>
  );
}

export default App;
