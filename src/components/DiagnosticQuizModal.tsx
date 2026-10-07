import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  Compass,
  X,
  AlertTriangle,
  FileText,
  Bookmark,
  Brain,
  Target,
  Lightbulb,
  Binary,
  Layers,
  Database,
  Globe,
  Network,
  Cpu,
  ShieldAlert,
  Library,
  RefreshCw,
  Check
} from 'lucide-react';
import { AcademicLevel, CourseType, MissedQuizQuestion, StudentProfile, User } from '../types';
import {
  STUDY_AREAS,
  StudyAreaDefinition,
  DiagnosticQuestion,
  getStudyAreaById,
  detectStudyAreaFromText
} from '../data/diagnosticQuestionBanks';

interface DiagnosticQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSaveProfile: (profile: StudentProfile) => void;
  onNavigateToResourcesWithFilter?: (topic?: string, onlyErrors?: boolean) => void;
  onNavigateToGDrive?: () => void;
  onAddFlashcards?: (cards: { front: string; back: string; category: string }[]) => void;
  onAddStudyNote?: (title: string, content: string, category: string) => void;
}

export const DiagnosticQuizModal: React.FC<DiagnosticQuizModalProps> = ({
  isOpen,
  onClose,
  user,
  onSaveProfile,
  onNavigateToResourcesWithFilter,
  onNavigateToGDrive,
  onAddFlashcards,
  onAddStudyNote,
}) => {
  const [step, setStep] = useState<'setup' | 'quiz' | 'analyzing' | 'report'>('setup');
  const [setupPage, setSetupPage] = useState<number>(1);

  // STEP 1: Diagnostic Profile & Focus
  const [selectedAreaId, setSelectedAreaId] = useState<string>(() => {
    if (user?.profile?.targetArea) return user.profile.targetArea;
    if (user?.profile?.courseName) {
      return detectStudyAreaFromText(user.profile.courseName).id;
    }
    return 'algoritmos';
  });

  const [customAreaText, setCustomAreaText] = useState('');
  const [courseType, setCourseType] = useState<CourseType>(
    user?.profile?.courseType || 'Graduação'
  );
  const [courseName, setCourseName] = useState(
    user?.profile?.courseName || 'Ciência da Computação / ADS'
  );
  const [selfLevel, setSelfLevel] = useState<AcademicLevel>(
    user?.profile?.level || 'Iniciante'
  );
  const [studyObjective, setStudyObjective] = useState<string>(
    user?.profile?.studyObjective || 'Dominar a disciplina e passar em provas/entrevistas'
  );

  // Dynamic Questions from Bank or AI
  const [activeQuestions, setActiveQuestions] = useState<DiagnosticQuestion[]>([]);
  const [isGeneratingAiQuestions, setIsGeneratingAiQuestions] = useState(false);
  const [aiGeneratedBadge, setAiGeneratedBadge] = useState(false);

  // STEP 2: Quiz execution
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});
  const [quizScore, setQuizScore] = useState(0);
  const [missedQuestions, setMissedQuestions] = useState<MissedQuizQuestion[]>([]);

  // STEP 3 & 4: Tutor Diagnostic Result
  const [diagnosticResult, setDiagnosticResult] = useState<{
    calculatedLevel: AcademicLevel;
    summary: string;
    strengths: string[];
    learningGaps: string[];
    tutorAdvice: string;
    roadmap: string[];
    focusAreas: string[];
    recommendedBooks: string[];
    recommendedFlashcards: { front: string; back: string; category: string }[];
  } | null>(null);

  // UI state for instant action buttons
  const [flashcardsCreated, setFlashcardsCreated] = useState(false);
  const [studyNoteSaved, setStudyNoteSaved] = useState(false);

  // Sync questions whenever selected area changes (if not in quiz mode)
  useEffect(() => {
    if (step === 'setup') {
      const areaDef = getStudyAreaById(selectedAreaId);
      setActiveQuestions(areaDef.questions);
      setAiGeneratedBadge(false);
    }
  }, [selectedAreaId, step]);

  if (!isOpen) return null;

  const currentArea = getStudyAreaById(selectedAreaId);

  const popularCourses = [
    'Ciência da Computação',
    'Análise e Desenv. de Sistemas (ADS)',
    'Engenharia de Software',
    'Sistemas de Informação',
    'Engenharia da Computação',
    'Técnico em Informática',
  ];

  const popularObjectives = [
    'Dominar matérias difíceis da faculdade',
    'Preparação para entrevistas técnicas e testes',
    'Consolidar fundamentos teóricos e arquiteturais',
    'Subir de nível profissional (Júnior -> Pleno)',
    'Construir projetos práticos do zero com segurança',
  ];

  const getAreaIcon = (iconName: string) => {
    switch (iconName) {
      case 'Binary': return <Binary className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      case 'Database': return <Database className="w-4 h-4" />;
      case 'Globe': return <Globe className="w-4 h-4" />;
      case 'Network': return <Network className="w-4 h-4" />;
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'ShieldAlert': return <ShieldAlert className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  // Start with default bank
  const handleStartQuiz = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const areaDef = getStudyAreaById(selectedAreaId);
    if (!activeQuestions || activeQuestions.length === 0) {
      setActiveQuestions(areaDef.questions);
    }
    setStep('quiz');
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setRevealedQuestions({});
    setMissedQuestions([]);
    setFlashcardsCreated(false);
    setStudyNoteSaved(false);
  };

  // Generate dynamic questions with AI Tutor
  const handleGenerateAiQuestions = async () => {
    setIsGeneratingAiQuestions(true);
    const targetLabel = customAreaText.trim() || currentArea.name;
    try {
      const res = await fetch('/api/ai/generate-diagnostic-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetArea: targetLabel,
          courseName,
          selfLevel,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.questions) && data.questions.length > 0) {
          setActiveQuestions(data.questions);
          setAiGeneratedBadge(true);
          setStep('quiz');
          setCurrentQuestionIdx(0);
          setSelectedAnswers({});
          setRevealedQuestions({});
          setMissedQuestions([]);
          setIsGeneratingAiQuestions(false);
          return;
        }
      }
      throw new Error('Falha na geração via IA');
    } catch (err) {
      // Fallback to current curated area questions
      const areaDef = getStudyAreaById(selectedAreaId);
      setActiveQuestions(areaDef.questions);
      setStep('quiz');
      setCurrentQuestionIdx(0);
      setSelectedAnswers({});
      setRevealedQuestions({});
    } finally {
      setIsGeneratingAiQuestions(false);
    }
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (revealedQuestions[questionId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    setRevealedQuestions((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < activeQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      // Finished all questions! Calculate score and gather missed questions
      let correctCount = 0;
      const missed: MissedQuizQuestion[] = [];

      activeQuestions.forEach((q) => {
        const selected = selectedAnswers[q.id];
        if (selected !== undefined) {
          const chosenOpt = q.options[selected];
          if (chosenOpt?.correct) {
            correctCount++;
          } else {
            const correctOpt = q.options.find((o) => o.correct);
            missed.push({
              id: q.id,
              question: q.question,
              topic: q.topic,
              selectedOption: chosenOpt ? chosenOpt.text : 'Não respondida',
              correctOption: correctOpt ? correctOpt.text : '',
              explanation: correctOpt ? correctOpt.reason : (q.trapWarning || ''),
              timestamp: new Date().toISOString(),
              resolved: false,
            });
          }
        }
      });

      setQuizScore(correctCount);
      setMissedQuestions(missed);
      processTutorDiagnosis(correctCount, missed);
    }
  };

  const processTutorDiagnosis = async (score: number, missed: MissedQuizQuestion[]) => {
    setStep('analyzing');

    let defaultCalculatedLevel: AcademicLevel = 'Iniciante';
    const totalQ = activeQuestions.length || 4;
    const ratio = score / totalQ;

    if (ratio >= 0.75) {
      defaultCalculatedLevel = selfLevel === 'Avançado' ? 'Avançado' : 'Intermediário';
    } else if (ratio >= 0.5) {
      defaultCalculatedLevel = 'Intermediário';
    } else {
      defaultCalculatedLevel = 'Iniciante';
    }

    const targetLabel = customAreaText.trim() || currentArea.name;

    try {
      const res = await fetch('/api/ai/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseType,
          courseName,
          targetArea: targetLabel,
          studyObjective,
          selfLevel,
          quizScore: score,
          totalQuestions: totalQ,
          answersSummary: selectedAnswers,
          missedQuestions: missed,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setDiagnosticResult({
          calculatedLevel: data.calculatedLevel || defaultCalculatedLevel,
          summary: data.summary || `Diagnóstico do Tutor: Perfil calibrado em ${defaultCalculatedLevel} com foco em ${targetLabel}.`,
          strengths: data.tutorAnalysis?.strengths || [
            `Capacidade de raciocínio estruturado em ${targetLabel}`,
            'Compreensão de cenários e vocabulário técnico da área'
          ],
          learningGaps: data.tutorAnalysis?.learningGaps || missed.map((m) => `Revisar ${m.topic} e regras operacionais`),
          tutorAdvice: data.tutorAnalysis?.tutorAdvice || `Como tutor, recomendo dedicar 45 minutos diários de estudo ativo e resolução prática de exercícios em ${targetLabel}.`,
          roadmap: data.roadmap || [
            'Fase 1 (Fundamentação Teórica): Ler capítulos selecionados do livro no acervo',
            'Fase 2 (Active Recall): Revisar os flashcards das lacunas encontradas',
            'Fase 3 (Prática Deliberada): Implementar soluções de código para os tópicos errados',
            'Fase 4 (Técnica de Feynman): Explicar os conceitos em voz alta sem consultar anotações'
          ],
          focusAreas: data.focusAreas || [targetLabel, 'Resolução de Problemas', 'Fundamentos'],
          recommendedBooks: data.recommendedBooks || [currentArea.curatedDriveBook, 'Código Limpo (Robert C. Martin)'],
          recommendedFlashcards: data.recommendedFlashcards || missed.map((m) => ({
            front: `Conceito: ${m.topic} - Qual a regra essencial?`,
            back: `${m.correctOption}. Explicação: ${m.explanation}`,
            category: targetLabel,
          })),
        });
      } else {
        throw new Error('Fallback local');
      }
    } catch (e) {
      setDiagnosticResult({
        calculatedLevel: defaultCalculatedLevel,
        summary: `Diagnóstico do Tutor: Perfil calibrado para **${targetLabel}** (${courseType}) com nível ${defaultCalculatedLevel}. Identificamos ${score} acertos de ${totalQ} questões.`,
        strengths: [
          `Base inicial consolidada nos cenários de entrada de ${targetLabel}`,
          'Foco evidente e postura analítica no teste'
        ],
        learningGaps: missed.length > 0
          ? missed.map((m) => `Atenção no tópico: ${m.topic}`)
          : ['Aprofundar em otimização assintótica e arquitetura de larga escala'],
        tutorAdvice: `Para avançar rapidamente em ${targetLabel}, combine 25 minutos de estudo conceitual com 25 minutos de código prático e flashcards de fixação.`,
        roadmap: [
          `Fase 1 (Fundamentação): Ler ${currentArea.curatedDriveBook}`,
          'Fase 2 (Active Recall): Treinar com repetição espaçada nos tópicos com erro',
          'Fase 3 (Prática Deliberada): Resolver exercícios sem consultar documentação prévia',
          'Fase 4 (Técnica de Feynman): Resumir com palavras próprias a regra de negócio'
        ],
        focusAreas: [targetLabel, 'Lógica Aplicada', 'Prática Deliberada'],
        recommendedBooks: [currentArea.curatedDriveBook, 'Código Limpo (Robert C. Martin)'],
        recommendedFlashcards: missed.map((m) => ({
          front: `O que determina: ${m.topic}?`,
          back: `${m.correctOption} (${m.explanation})`,
          category: targetLabel,
        })),
      });
    }

    setStep('report');
    if (ratio >= 0.5) {
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch (err) {}
    }
  };

  // Instant actions in the report
  const handleGenerateFlashcardsAction = () => {
    if (!diagnosticResult) return;
    const cardsToCreate = diagnosticResult.recommendedFlashcards.length > 0
      ? diagnosticResult.recommendedFlashcards
      : missedQuestions.map((m) => ({
          front: `Conceito: ${m.topic}`,
          back: `Correto: ${m.correctOption} — ${m.explanation}`,
          category: currentArea.shortTitle,
        }));

    if (onAddFlashcards && cardsToCreate.length > 0) {
      onAddFlashcards(cardsToCreate);
      setFlashcardsCreated(true);
    }
  };

  const handleSaveTutorNoteAction = () => {
    if (!diagnosticResult || !onAddStudyNote) return;
    const targetLabel = customAreaText.trim() || currentArea.name;
    const markdownContent = `# Plano de Melhoria do Tutor: ${targetLabel}

**Data do Diagnóstico:** ${new Date().toLocaleDateString('pt-BR')}  
**Nível Calibrado:** ${diagnosticResult.calculatedLevel} (${quizScore}/${activeQuestions.length} acertos)  
**Curso:** ${courseName} (${courseType})  
**Objetivo Declarado:** ${studyObjective}

---

## Diagnóstico Geral do Tutor
${diagnosticResult.summary}

> **Conselho do Tutor:**  
> ${diagnosticResult.tutorAdvice}

---

## Pontos Fortes Comprovados
${diagnosticResult.strengths.map((s) => `- ${s}`).join('\n')}

---

## Lacunas Críticas Identificadas (Gaps de Estudo)
${diagnosticResult.learningGaps.map((g) => `- ${g}`).join('\n')}

---

## Roadmap de Estudos em 4 Etapas (Alta Retenção)
${diagnosticResult.roadmap.map((r, i) => `${i + 1}. **${r}**`).join('\n')}

---

## Livros e Referências Recomendadas no Acervo
${diagnosticResult.recommendedBooks.map((b) => `- ${b}`).join('\n')}
`;

    onAddStudyNote(
      `Plano do Tutor: ${targetLabel} (${diagnosticResult.calculatedLevel})`,
      markdownContent,
      targetLabel
    );
    setStudyNoteSaved(true);
  };

  const handleFinishAndSave = (openErrorsTab = false) => {
    if (!diagnosticResult) return;
    const targetLabel = customAreaText.trim() || currentArea.name;

    const profile: StudentProfile = {
      courseType,
      courseName,
      level: diagnosticResult.calculatedLevel,
      targetFocus: targetLabel,
      targetArea: targetLabel,
      studyObjective,
      diagnosticDone: true,
      diagnosticSummary: diagnosticResult.summary,
      calculatedScore: quizScore,
      roadmap: diagnosticResult.roadmap,
      focusAreas: diagnosticResult.focusAreas,
      missedQuizQuestions: missedQuestions,
      weakTopics: Array.from(new Set(missedQuestions.map((m) => m.topic))),
      strengths: diagnosticResult.strengths,
      learningGaps: diagnosticResult.learningGaps,
      tutorAdvice: diagnosticResult.tutorAdvice,
      recommendedBooks: diagnosticResult.recommendedBooks,
      recommendedFlashcards: diagnosticResult.recommendedFlashcards,
    };

    onSaveProfile(profile);
    onClose();

    if (openErrorsTab && onNavigateToResourcesWithFilter) {
      onNavigateToResourcesWithFilter(undefined, true);
    }
  };

  const currentQ = activeQuestions[currentQuestionIdx];
  const isCurrentAnswered = currentQ ? revealedQuestions[currentQ.id] : false;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden p-5 sm:p-7 min-h-[580px] sm:min-h-[640px] max-h-[96vh] overflow-y-auto flex flex-col justify-between">
        {/* Close Button */}
        <button
          id="diagnostic-close-btn"
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors z-20"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: Setup - Single Question Per Page */}
        {step === 'setup' && (
          <div className="space-y-5">
            {/* Header with setup progress */}
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3 space-y-2">
              <div className="flex items-center justify-between pr-10 sm:pr-12">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Diagnóstico Inicial</span>
                </span>
                <span className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400">
                  Pergunta {setupPage} de 5
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${(setupPage / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* SETUP QUESTION 1 */}
            {setupPage === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                    1. Qual área ou disciplina você busca aprofundar e melhorar?
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Selecione a trilha prioritária para calibrar o diagnóstico de conhecimento.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[52vh] overflow-y-auto pr-1">
                  {STUDY_AREAS.map((area) => {
                    const isSelected = selectedAreaId === area.id;
                    return (
                      <button
                        key={area.id}
                        id={`select-area-${area.id}-btn`}
                        type="button"
                        onClick={() => {
                          setSelectedAreaId(area.id);
                          setCustomAreaText('');
                        }}
                        className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                            : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-emerald-950 dark:text-emerald-200' : 'text-zinc-800 dark:text-zinc-200'}`}>
                            {area.shortTitle}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                        </div>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {area.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customAreaText}
                    onChange={(e) => setCustomAreaText(e.target.value)}
                    placeholder="Ou digite outra matéria específica (ex: Compiladores, Rust, Microsserviços...)"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white placeholder:text-zinc-400"
                  />
                  {customAreaText.trim() && (
                    <span className="text-[10px] font-semibold px-2 py-1 rounded bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
                      Customizado
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* SETUP QUESTION 2 */}
            {setupPage === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-500" />
                    <span>2. Qual é o seu principal objetivo ou desafio nesta área?</span>
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Isso direciona a ênfase das recomendações e do roadmap final.
                  </p>
                </div>

                <div className="space-y-2">
                  {popularObjectives.map((obj) => {
                    const isSelected = studyObjective === obj;
                    return (
                      <button
                        key={obj}
                        type="button"
                        onClick={() => setStudyObjective(obj)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between text-xs sm:text-sm font-medium cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-800 dark:text-emerald-200 ring-2 ring-emerald-500/20'
                            : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                        }`}
                      >
                        <span>{obj}</span>
                        {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SETUP QUESTION 3 */}
            {setupPage === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                    3. Qual é o seu tipo de formação atual?
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Ajusta o nível teórico e prático das questões apresentadas.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['Técnico', 'Graduação', 'Autodidata'] as CourseType[]).map((type) => {
                    const isSelected = courseType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setCourseType(type)}
                        className={`p-4 rounded-xl text-center border font-bold text-sm transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                            : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SETUP QUESTION 4 */}
            {setupPage === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                    4. Como você avalia seu nível atual de conhecimento no tema?
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Sua auto-avaliação será cruzada com o desempenho nas questões práticas.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['Iniciante', 'Intermediário', 'Avançado'] as AcademicLevel[]).map((lvl) => {
                    const isSelected = selfLevel === lvl;
                    return (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSelfLevel(lvl)}
                        className={`p-4 rounded-xl text-center border font-bold text-sm transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                            : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SETUP QUESTION 5 */}
            {setupPage === 5 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                    5. Qual é o seu Curso ou Graduação específica?
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Personalize o nome para que o plano do tutor cite sua grade curricular.
                  </p>
                </div>

                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="Ex: ADS, Ciência da Computação, Engenharia de Software..."
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
                />

                <div className="flex flex-wrap gap-1.5">
                  {popularCourses.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCourseName(c)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 hover:text-emerald-700 cursor-pointer"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SETUP NAVIGATION CONTROLS */}
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={setupPage === 1}
                onClick={() => setSetupPage((prev) => Math.max(1, prev - 1))}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  setupPage === 1
                    ? 'opacity-30 border-transparent text-zinc-400 cursor-not-allowed'
                    : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>

              {setupPage < 5 ? (
                <button
                  type="button"
                  onClick={() => setSetupPage((prev) => prev + 1)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    id="diagnostic-advance-to-quiz-btn"
                    type="button"
                    onClick={() => handleStartQuiz()}
                    className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Iniciar Quiz ({activeQuestions.length || 4} Questões)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    id="diagnostic-generate-ai-quiz-btn"
                    type="button"
                    disabled={isGeneratingAiQuestions}
                    onClick={handleGenerateAiQuestions}
                    className="py-2.5 px-3 rounded-xl border border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold text-xs hover:bg-purple-100 dark:hover:bg-purple-900/60 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                  >
                    {isGeneratingAiQuestions ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-600" />
                        <span>Gerando...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                        <span>Gerar com IA</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: Interactive Technical Quiz */}
        {step === 'quiz' && currentQ && (
          <div className="space-y-5">
            {/* Header with Area and Progress */}
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3 space-y-2">
              <div className="flex items-center justify-between pr-10 sm:pr-12">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                    {getAreaIcon(currentArea.iconName)}
                    <span>{customAreaText.trim() || currentArea.name}</span>
                  </span>
                  {aiGeneratedBadge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">
                      Gerado por IA Tutor
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono font-bold text-zinc-500 dark:text-zinc-400">
                  Questão {currentQuestionIdx + 1} de {activeQuestions.length}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIdx + 1) / activeQuestions.length) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                  Tópico: {currentQ.topic}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 font-mono">
                  Nível {currentQ.weight}
                </span>
              </div>
            </div>

            {/* Question Statement */}
            <div className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 leading-relaxed bg-zinc-50 dark:bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
              {currentQ.question}
            </div>

            {/* Options */}
            <div className="space-y-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                const isAnswered = revealedQuestions[currentQ.id];

                let style =
                  'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 hover:border-emerald-500';
                if (isAnswered) {
                  if (opt.correct) {
                    style =
                      'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-200 font-medium ring-1 ring-emerald-500/30';
                  } else if (isSelected && !opt.correct) {
                    style =
                      'border-red-500 bg-red-50 dark:bg-red-950/70 text-red-950 dark:text-red-200 font-medium';
                  } else {
                    style = 'opacity-40 border-zinc-200 dark:border-zinc-800';
                  }
                }

                return (
                  <button
                    key={idx}
                    id={`quiz-q${currentQ.id}-opt${idx}-btn`}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(currentQ.id, idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${style}`}
                  >
                    <span className="leading-snug">{opt.text}</span>
                    {isAnswered && (
                      <span className="shrink-0 mt-0.5">
                        {opt.correct ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        ) : isSelected ? (
                          <XCircle className="w-4 h-4 text-red-500" />
                        ) : null}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tutor Didactic Rationale and Trap Warning */}
            {isCurrentAnswered && (
              <div className="space-y-2 animate-fadeIn">
                <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs text-zinc-800 dark:text-zinc-200">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300 mb-1">
                    <Brain className="w-4 h-4 text-emerald-600" />
                    <span>Explicação do Tutor:</span>
                  </div>
                  <p className="leading-relaxed">
                    {currentQ.options.find((o) => o.correct)?.reason}
                  </p>
                </div>

                {currentQ.trapWarning && (
                  <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Armadilha Comum de Prova / Entrevista:</span>{' '}
                      <span className="text-zinc-700 dark:text-zinc-300">{currentQ.trapWarning}</span>
                    </div>
                  </div>
                )}

                {currentQ.recommendedBookOrDoc && (
                  <div className="px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-300 flex items-center justify-between">
                    <span><strong>Onde Aprofundar:</strong> {currentQ.recommendedBookOrDoc}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">
                      {currentQ.studyTechnique || 'Active Recall'}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-xs text-zinc-400 font-mono">
                {isCurrentAnswered ? 'Alternativa registrada' : 'Selecione uma resposta'}
              </span>
              <button
                id="quiz-next-question-btn"
                type="button"
                disabled={!isCurrentAnswered}
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md disabled:opacity-40 transition-all flex items-center gap-1.5"
              >
                <span>
                  {currentQuestionIdx < activeQuestions.length - 1
                    ? 'Próxima Pergunta'
                    : 'Gerar Diagnóstico do Tutor'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Analyzing State with Tutor Animation */}
        {step === 'analyzing' && (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-pulse">
              <Brain className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              O Tutor IA está analisando seu raciocínio...
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
              Mapeando os pontos fortes demonstrados, identificando as lacunas conceituais e gerando um plano pedagógico com metodologia de alta retenção para a área selecionada.
            </p>
          </div>
        )}

        {/* STEP 4: Comprehensive Tutor Report & Actionable Roadmap */}
        {step === 'report' && diagnosticResult && (
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-1 border border-emerald-300 dark:border-emerald-800">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Diagnóstico Pedagógico Concluído</span>
              </div>
              <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white">
                Seu Nível Calibrado:{' '}
                <span className="text-emerald-600 dark:text-emerald-400">
                  {diagnosticResult.calculatedLevel}
                </span>
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Você acertou <strong className="text-emerald-600">{quizScore} de {activeQuestions.length}</strong> questões na área de <strong className="text-zinc-800 dark:text-zinc-200">{customAreaText.trim() || currentArea.name}</strong>.
              </p>
            </div>

            {/* Tutor Synthesis Card */}
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                    Avaliação Analítica do Tutor
                  </h4>
                  <p className="text-xs text-zinc-800 dark:text-zinc-200 mt-1 leading-relaxed">
                    {diagnosticResult.summary}
                  </p>
                </div>
              </div>

              {diagnosticResult.tutorAdvice && (
                <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-900/60 text-xs text-zinc-700 dark:text-zinc-300">
                  <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    Conselho de Mestre do Tutor:
                  </strong>{' '}
                  <span>{diagnosticResult.tutorAdvice}</span>
                </div>
              )}
            </div>

            {/* Strengths & Learning Gaps side-by-side or stacked */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Pontos Fortes */}
              <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pontos Fortes Demonstrados</span>
                </div>
                <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                  {diagnosticResult.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lacunas de Conhecimento */}
              <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Lacunas Críticas a Revisar ({missedQuestions.length})</span>
                </div>
                {diagnosticResult.learningGaps.length > 0 ? (
                  <ul className="space-y-1.5 text-xs text-amber-900 dark:text-amber-200/90">
                    {diagnosticResult.learningGaps.map((g, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    Nenhuma lacuna crítica encontrada nas questões testadas.
                  </p>
                )}
              </div>
            </div>

            {/* DETALHE DAS QUESTÕES COM ERRO (SE HOUVER) */}
            {missedQuestions.length > 0 && (
              <div className="space-y-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span>Análise do Tutor por Questão com Erro</span>
                  </h4>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    Registrado para Revisão Ativa
                  </span>
                </div>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {missedQuestions.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {m.topic}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold">
                          Revisar com Flashcard
                        </span>
                      </div>
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {m.question}
                      </div>
                      <div className="text-[11px] text-zinc-600 dark:text-zinc-400">
                        <span className="text-red-500 font-medium">Sua resposta:</span> {m.selectedOption}
                      </div>
                      <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                        <span>Gabarito Técnico:</span> {m.correctOption}
                      </div>
                      <div className="text-[11px] text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-950 p-2 rounded border border-zinc-100 dark:border-zinc-800">
                        <strong>Orientação do Tutor:</strong> {m.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ROADMAP EM 4 FASES (METODOLOGIA DE ALTA RETENÇÃO) */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>Plano de Ação do Tutor (Metodologia de Alta Retenção)</span>
              </h4>
              <div className="space-y-2">
                {diagnosticResult.roadmap.map((stepItem, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                      {stepItem}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* LIVROS RECOMENDADOS DO ACERVO */}
            {diagnosticResult.recommendedBooks && diagnosticResult.recommendedBooks.length > 0 && (
              <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>Livros Recomendados no Acervo do Google Drive:</span>
                  </span>
                  {onNavigateToGDrive && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onNavigateToGDrive();
                      }}
                      className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                    >
                      Abrir Drive de Livros →
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {diagnosticResult.recommendedBooks.map((book, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-800 text-zinc-800 dark:text-zinc-200 font-medium text-[11px]"
                    >
                      {book}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* QUICK ACTIONS (Flashcards & Note) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleGenerateFlashcardsAction}
                disabled={flashcardsCreated}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  flashcardsCreated
                    ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-800 dark:text-emerald-200'
                    : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-emerald-500'
                }`}
              >
                {flashcardsCreated ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Flashcards Salvos no Deck!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Criar Flashcards das Minhas Lacunas</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleSaveTutorNoteAction}
                disabled={studyNoteSaved}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  studyNoteSaved
                    ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-800 dark:text-emerald-200'
                    : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-emerald-500'
                }`}
              >
                {studyNoteSaved ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Plano Salvo nas Suas Notas!</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Salvar Plano do Tutor como Nota</span>
                  </>
                )}
              </button>
            </div>

            {/* FINAL BUTTON */}
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-2">
              <button
                id="diagnostic-finish-save-profile-btn"
                type="button"
                onClick={() => handleFinishAndSave(false)}
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Concluir & Atualizar Perfil de Estudos</span>
                <Check className="w-4 h-4" />
              </button>

              {missedQuestions.length > 0 && (
                <button
                  type="button"
                  onClick={() => handleFinishAndSave(true)}
                  className="py-3 px-4 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold text-xs hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-all"
                >
                  Ver Recursos Filtrados para os Erros ({missedQuestions.length})
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
