import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Layers,
  Plus,
  Sparkles,
  RotateCw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Trash2,
  BookOpen,
  Award,
  Filter,
  Flame,
  Check,
  X
} from 'lucide-react';
import { AcademicLevel, Flashcard, FlashcardDeck, SectorType, User } from '../types';

interface FlashcardsViewProps {
  decks: FlashcardDeck[];
  flashcards: Flashcard[];
  currentSector: SectorType;
  user: User | null;
  onUpdateFlashcard: (card: Flashcard, result: 'wrong' | 'good' | 'easy') => void;
  onAddCards: (deckId: string, newCards: Omit<Flashcard, 'id' | 'deckId' | 'reviewCount' | 'correctCount' | 'status'>[]) => void;
  onCreateDeck: (deck: Omit<FlashcardDeck, 'id' | 'cardCount'>) => string;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  decks,
  flashcards,
  currentSector,
  user,
  onUpdateFlashcard,
  onAddCards,
  onCreateDeck,
}) => {
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0, total: 0 });

  // AI Generator Modal State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiCount, setAiCount] = useState(5);
  const [aiLevel, setAiLevel] = useState<AcademicLevel>('Intermediário');
  const [aiLoading, setAiLoading] = useState(false);

  // Manual Card Modal State
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualFront, setManualFront] = useState('');
  const [manualBack, setManualBack] = useState('');
  const [manualCategory, setManualCategory] = useState('Geral');
  const [manualDifficulty, setManualDifficulty] = useState<'Fácil' | 'Médio' | 'Difícil'>('Médio');
  const [selectedDeckForNewCard, setSelectedDeckForNewCard] = useState<string>(decks[0]?.id || '');

  // Filter Decks
  const [categoryFilter, setCategoryFilter] = useState<string>('Todos');

  const sectorDecks = decks.filter((d) => d.sector === currentSector);
  const currentDeck = decks.find((d) => d.id === activeDeckId);
  const activeDeckCards = flashcards.filter((c) => c.deckId === activeDeckId);
  const currentCard = activeDeckCards[cardIndex];

  // Start study session for a deck
  const handleStartSession = (deckId: string) => {
    setActiveDeckId(deckId);
    setCardIndex(0);
    setIsFlipped(false);
    setSessionCompleted(false);
    setSessionStats({ correct: 0, wrong: 0, total: 0 });
  };

  // Handle card response rating
  const handleRateCard = (result: 'wrong' | 'good' | 'easy') => {
    if (!currentCard) return;

    onUpdateFlashcard(currentCard, result);

    setSessionStats((prev) => ({
      ...prev,
      correct: result === 'good' || result === 'easy' ? prev.correct + 1 : prev.correct,
      wrong: result === 'wrong' ? prev.wrong + 1 : prev.wrong,
      total: prev.total + 1,
    }));

    if (cardIndex < activeDeckCards.length - 1) {
      setIsFlipped(false);
      setCardIndex(cardIndex + 1);
    } else {
      setSessionCompleted(true);
      try {
        confetti({
          particleCount: 70,
          spread: 50,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }
  };

  // AI Flashcards Generator API Call
  const handleGenerateAiFlashcards = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopic.trim()) return;

    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/generate-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic,
          count: aiCount,
          level: aiLevel,
        }),
      });

      const data = await res.json();
      if (data.flashcards && data.flashcards.length > 0) {
        // Create a new deck for this topic if not selected
        let targetDeckId = activeDeckId;
        if (!targetDeckId) {
          targetDeckId = onCreateDeck({
            title: `Estudo: ${aiTopic}`,
            description: `Deck inteligente de ${aiTopic} (${aiLevel})`,
            category: aiTopic,
            sector: currentSector,
            iconName: 'Sparkles',
            color: 'emerald',
            level: aiLevel,
          });
        }

        onAddCards(targetDeckId, data.flashcards);
        setIsAiModalOpen(false);
        setAiTopic('');
        handleStartSession(targetDeckId);
      }
    } catch (err) {
      console.error('Falha ao gerar flashcards:', err);
    } finally {
      setAiLoading(false);
    }
  };

  // Manual Card Creation
  const handleCreateManualCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualFront.trim() || !manualBack.trim() || !selectedDeckForNewCard) return;

    onAddCards(selectedDeckForNewCard, [
      {
        front: manualFront,
        back: manualBack,
        category: manualCategory,
        difficulty: manualDifficulty,
      },
    ]);

    setManualFront('');
    setManualBack('');
    setIsManualModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 sm:space-y-14 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
              Flashcards & Repetição Espaçada
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Fixe conceitos teóricos e código na memória de longo prazo com algoritmos de repetição ativa.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            id="flashcard-generate-ai-btn"
            type="button"
            onClick={() => setIsAiModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gerar com IA</span>
          </button>

          <button
            id="flashcard-add-manual-btn"
            type="button"
            onClick={() => setIsManualModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Novo Card</span>
          </button>
        </div>
      </div>

      {/* ACTIVE STUDY SESSION VIEW */}
      {activeDeckId && currentDeck ? (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Top Session Navigation */}
          <div className="flex items-center justify-between">
            <button
              id="flashcard-back-to-decks-btn"
              type="button"
              onClick={() => setActiveDeckId(null)}
              className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar aos Decks</span>
            </button>

            <div className="text-center">
              <span className="text-xs font-bold text-zinc-900 dark:text-white">
                {currentDeck.title}
              </span>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Card {cardIndex + 1} de {activeDeckCards.length}
              </div>
            </div>

            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              Acertos: {sessionStats.correct}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
              style={{
                width: `${((cardIndex + (sessionCompleted ? 1 : 0)) / activeDeckCards.length) * 100}%`,
              }}
            />
          </div>

          {/* If Session is in progress */}
          {!sessionCompleted && currentCard ? (
            <div className="space-y-6">
              {/* 3D Flip Card Container */}
              <div
                id="interactive-study-card"
                role="button"
                tabIndex={0}
                onClick={() => setIsFlipped(!isFlipped)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    setIsFlipped(!isFlipped);
                  }
                }}
                className={`min-h-[280px] sm:min-h-[340px] p-6 sm:p-8 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between select-none shadow-md ${
                  isFlipped
                    ? 'border-emerald-500/50 bg-emerald-50/40 dark:bg-emerald-950/20 text-zinc-900 dark:text-white'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                    {isFlipped ? 'Verso (Resposta)' : 'Frente (Pergunta)'}
                  </span>
                  <span className="flex items-center gap-1 text-[11px]">
                    <RotateCw className="w-3.5 h-3.5 text-emerald-500" />
                    Clique ou use Espaço para virar
                  </span>
                </div>

                <div className="my-auto py-6 text-center">
                  <div className="text-base sm:text-xl font-bold leading-relaxed max-w-xl mx-auto">
                    {isFlipped ? currentCard.back : currentCard.front}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 border-t border-zinc-100 dark:border-zinc-800/80 pt-3">
                  <span>Categoria: {currentCard.category}</span>
                  <span
                    className={`font-mono px-2 py-0.5 rounded text-[10px] ${
                      currentCard.difficulty === 'Fácil'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : currentCard.difficulty === 'Médio'
                        ? 'bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                    }`}
                  >
                    {currentCard.difficulty}
                  </span>
                </div>
              </div>

              {/* Spaced Repetition Rating Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  id="rate-card-wrong-btn"
                  type="button"
                  onClick={() => handleRateCard('wrong')}
                  className="py-3 px-2 rounded-xl bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-950/70 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 text-xs sm:text-sm font-bold flex flex-col items-center justify-center gap-1 transition-all"
                >
                  <span className="flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Errei / Difícil
                  </span>
                  <span className="text-[10px] opacity-75 font-mono">Rever em 1 dia</span>
                </button>

                <button
                  id="rate-card-good-btn"
                  type="button"
                  onClick={() => handleRateCard('good')}
                  className="py-3 px-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-950/70 border border-cyan-200 dark:border-cyan-800/60 text-cyan-700 dark:text-cyan-300 text-xs sm:text-sm font-bold flex flex-col items-center justify-center gap-1 transition-all"
                >
                  <span className="flex items-center gap-1">
                    <Check className="w-4 h-4" /> Bom / Médio
                  </span>
                  <span className="text-[10px] opacity-75 font-mono">Rever em 3 dias</span>
                </button>

                <button
                  id="rate-card-easy-btn"
                  type="button"
                  onClick={() => handleRateCard('easy')}
                  className="py-3 px-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-bold flex flex-col items-center justify-center gap-1 transition-all"
                >
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Fácil / Dominado
                  </span>
                  <span className="text-[10px] opacity-75 font-mono">Rever em 7 dias</span>
                </button>
              </div>
            </div>
          ) : (
            /* Session Completed Screen */
            <div className="p-8 rounded-2xl border border-emerald-500/40 bg-white dark:bg-zinc-900 text-center space-y-6 shadow-xl">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Sessão de Estudos Concluída!
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                  Você revisou todos os {activeDeckCards.length} flashcards deste deck. Seus dados de repetição espaçada foram atualizados.
                </p>
              </div>

              {/* Stats Box */}
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {sessionStats.correct}
                  </div>
                  <div className="text-[11px] text-zinc-500">Acertos</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-xl font-bold text-amber-500 font-mono">+35 XP</div>
                  <div className="text-[11px] text-zinc-500">Ganho de XP</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  id="session-restart-btn"
                  type="button"
                  onClick={() => handleStartSession(activeDeckId)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-800 dark:text-zinc-200 text-xs font-semibold"
                >
                  Revisar Novamente
                </button>
                <button
                  id="session-finish-return-btn"
                  type="button"
                  onClick={() => setActiveDeckId(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20"
                >
                  Voltar para os Decks
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* DECKS DIRECTORY VIEW */
        <div className="space-y-6">
          {/* Deck Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filtro:
            </span>
            {['Todos', 'Ciência da Computação', 'Frontend', 'Backend', 'Infraestrutura', 'Engenharia'].map(
              (cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    categoryFilter === cat
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          {/* Decks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sectorDecks
              .filter((d) => (categoryFilter === 'Todos' ? true : d.category === categoryFilter))
              .map((deck) => {
                const deckCards = flashcards.filter((c) => c.deckId === deck.id);
                const masteredCount = deckCards.filter((c) => c.status === 'mastered').length;
                const masteryPercentage =
                  deckCards.length > 0 ? Math.round((masteredCount / deckCards.length) * 100) : 0;

                return (
                  <div
                    key={deck.id}
                    className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/40">
                          {deck.category}
                        </span>
                        <span className="text-[11px] font-mono text-zinc-400">
                          Nível: {deck.level}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {deck.title}
                      </h3>

                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                        {deck.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                      {/* Mastery Progress Bar */}
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 mb-1">
                          <span>{deckCards.length} flashcards</span>
                          <span>{masteryPercentage}% dominado</span>
                        </div>
                        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{ width: `${masteryPercentage}%` }}
                          />
                        </div>
                      </div>

                      <button
                        id={`start-deck-${deck.id}-btn`}
                        type="button"
                        onClick={() => handleStartSession(deck.id)}
                        className="w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-800 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Estudar este Deck</span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* MODAL: AI Flashcard Generator */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6">
            <button
              type="button"
              onClick={() => setIsAiModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Gerar Flashcards com IA
              </h3>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
              Informe qualquer tema ou disciplina para criar um deck inteligente instantâneo.
            </p>

            <form onSubmit={handleGenerateAiFlashcards} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Tema ou Conceito Técnico
                </label>
                <input
                  id="ai-topic-input"
                  type="text"
                  required
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Ex: Árvores AVL, React Hooks, Normalização SQL, Protocolo TCP"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Quantidade de Cards
                  </label>
                  <select
                    value={aiCount}
                    onChange={(e) => setAiCount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
                  >
                    <option value={3}>3 Cards</option>
                    <option value={5}>5 Cards</option>
                    <option value={8}>8 Cards</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Nível de Dificuldade
                  </label>
                  <select
                    value={aiLevel}
                    onChange={(e) => setAiLevel(e.target.value as AcademicLevel)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
                  >
                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                  </select>
                </div>
              </div>

              <button
                id="ai-generate-submit-btn"
                type="submit"
                disabled={aiLoading}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
              >
                {aiLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Gerando Flashcards com IA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Gerar e Iniciar Estudo</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Manual Card Creator */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6">
            <button
              type="button"
              onClick={() => setIsManualModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1">
              Criar Flashcard Personalizado
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
              Adicione perguntas e respostas feitas sob medida para suas aulas.
            </p>

            <form onSubmit={handleCreateManualCard} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Selecione o Deck de Destino
                </label>
                <select
                  value={selectedDeckForNewCard}
                  onChange={(e) => setSelectedDeckForNewCard(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
                >
                  {sectorDecks.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title} ({d.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Frente (Pergunta ou Desafio)
                </label>
                <textarea
                  rows={2}
                  required
                  value={manualFront}
                  onChange={(e) => setManualFront(e.target.value)}
                  placeholder="Ex: O que é complexidade O(n log n)?"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Verso (Resposta Explicativa)
                </label>
                <textarea
                  rows={3}
                  required
                  value={manualBack}
                  onChange={(e) => setManualBack(e.target.value)}
                  placeholder="Ex: É a complexidade típica de algoritmos eficientes de ordenação como Merge Sort e Quick Sort..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Categoria
                  </label>
                  <input
                    type="text"
                    value={manualCategory}
                    onChange={(e) => setManualCategory(e.target.value)}
                    placeholder="Ex: Algoritmos"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                    Dificuldade
                  </label>
                  <select
                    value={manualDifficulty}
                    onChange={(e) => setManualDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
                  >
                    <option value="Fácil">Fácil</option>
                    <option value="Médio">Médio</option>
                    <option value="Difícil">Difícil</option>
                  </select>
                </div>
              </div>

              <button
                id="manual-save-card-btn"
                type="submit"
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
              >
                Salvar Flashcard
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
