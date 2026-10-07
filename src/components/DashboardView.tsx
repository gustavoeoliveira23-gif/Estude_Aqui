import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Clock,
  BookOpen,
  MessageSquareCode,
  GraduationCap,
  Flame,
  ArrowRight,
  ExternalLink,
  Code2,
  Cpu,
  Globe,
  Database,
  Smartphone,
  Cloud,
  Gamepad2,
  ShieldCheck,
  Binary
} from 'lucide-react';
import { ActiveTab, CuratedResource, FlashcardDeck, NewsItem, SectorType, StudyStats, User } from '../types';
import { NICHE_CATEGORIES, OFFICIAL_LANGUAGES_DATA } from '../data/languagesByNiche';
import { SUGGESTED_COURSES, SUGGESTED_ARTICLES } from '../data/coursesAndArticles';
import { CURATED_BOOKS } from '../data/curatedBooks';

interface DashboardViewProps {
  user: User | null;
  currentSector: SectorType;
  stats: StudyStats;
  news: NewsItem[];
  resources: CuratedResource[];
  setActiveTab: (tab: ActiveTab) => void;
  onOpenDiagnostic: () => void;
  onOpenAuth: () => void;
  onStartFlashcardDeck: (deckId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  currentSector,
  stats,
  news,
  resources,
  setActiveTab,
  onOpenDiagnostic,
  onOpenAuth,
  onStartFlashcardDeck,
}) => {
  // Selected Niche for Official Languages Quick Explorer
  const [selectedNiche, setSelectedNiche] = useState<string>('web');
  
  // Selected Section for Suggestions (Courses vs Articles)
  const [suggestionTab, setSuggestionTab] = useState<'courses' | 'articles'>('courses');


  // Active topic in progress (for continuing or starting)
  const [activeTopic, setActiveTopic] = useState<{
    subject: string;
    topicName: string;
    progress: number;
    estimatedMinutes: number;
    deckId?: string;
  } | null>(null);

  // Self-reflection modal state
  const [reflectionState, setReflectionState] = useState<'idle' | 'answered' | 'feedback'>('idle');

  const studentLevel = user?.profile?.level || 'Iniciante';

  // Starter Learning Tracks for first-time onboarding
  const starterTracks = [
    {
      id: 'track-web',
      title: 'Programação Web Full Stack',
      niche: 'web',
      icon: <Globe className="w-5 h-5 text-emerald-500" />,
      description: 'Fundamentos de HTML5, CSS3 moderno, JavaScript ES6+, React e APIs RESTful.',
      deckId: 'deck-2',
      estimatedMinutes: 25,
      docName: 'MDN Web Docs & React.dev',
      docUrl: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript'
    },
    {
      id: 'track-robotica',
      title: 'Robótica & Sistemas Embarcados',
      niche: 'robotica',
      icon: <Cpu className="w-5 h-5 text-amber-500" />,
      description: 'Linguagem C/C++, pinos GPIO, sensores, atuadores, microcontroladores Arduino e ESP32.',
      deckId: 'deck-1',
      estimatedMinutes: 25,
      docName: 'Documentação Oficial Arduino',
      docUrl: 'https://docs.arduino.cc/'
    },
    {
      id: 'track-ia',
      title: 'Inteligência Artificial & Dados',
      niche: 'ia_datascience',
      icon: <Binary className="w-5 h-5 text-purple-500" />,
      description: 'Python para dados, manipulação matricial com NumPy, DataFrames Pandas e Scikit-Learn.',
      deckId: 'deck-1',
      estimatedMinutes: 25,
      docName: 'Manual Oficial Python 3',
      docUrl: 'https://docs.python.org/pt-br/3/'
    },
    {
      id: 'track-backend',
      title: 'Backend, SQL & Arquitetura',
      niche: 'backend',
      icon: <Code2 className="w-5 h-5 text-cyan-500" />,
      description: 'Bancos de dados relacionais PostgreSQL, transações ACID, SOLID e criação de APIs.',
      deckId: 'deck-3',
      estimatedMinutes: 25,
      docName: 'Manual Oficial PostgreSQL',
      docUrl: 'https://www.postgresql.org/docs/'
    }
  ];

  // Helper icon for niches
  const getNicheIcon = (nicheId: string) => {
    switch (nicheId) {
      case 'web':
        return <Globe className="w-4 h-4 text-emerald-500" />;
      case 'robotica':
        return <Cpu className="w-4 h-4 text-amber-500" />;
      case 'backend':
        return <Code2 className="w-4 h-4 text-cyan-500" />;
      case 'ia_datascience':
        return <Binary className="w-4 h-4 text-purple-500" />;
      case 'mobile':
        return <Smartphone className="w-4 h-4 text-blue-500" />;
      case 'banco_dados':
        return <Database className="w-4 h-4 text-indigo-500" />;
      case 'devops_cloud':
        return <Cloud className="w-4 h-4 text-teal-500" />;
      case 'gamedev':
        return <Gamepad2 className="w-4 h-4 text-rose-500" />;
      case 'seguranca':
        return <ShieldCheck className="w-4 h-4 text-red-500" />;
      default:
        return <Code2 className="w-4 h-4 text-zinc-400" />;
    }
  };

  // Filtered languages for selected niche in quick explorer
  const languagesForNiche = OFFICIAL_LANGUAGES_DATA.filter(
    (l) => selectedNiche === 'all' || l.niche === selectedNiche
  ).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-14 space-y-16 sm:space-y-20 lg:space-y-24 animate-fadeIn">
      {/* =========================================================================
          TÍTULO PRINCIPAL: O QUE VOCÊ VAI ESTUDAR HOJE?
          ========================================================================= */}
      <section aria-labelledby="hero-study-heading" className="pt-2 pb-2 sm:pb-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1
              id="hero-study-heading"
              style={{ fontFamily: "'M PLUS Code Latin', monospace", width: 'fit-content' }}
              className="font-code-latin text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-tight w-fit"
            >
              O que você vai estudar hoje?
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2">
              Acesse a lista de documentações oficiais, tutoriais e manuais organizados por nicho para acelerar seus estudos.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold">
              Documentações Oficiais
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO NOBRE 1: LINKS OFICIAIS DAS LINGUAGENS POR NICHO
          ========================================================================= */}
      <section id="section-official-languages" aria-labelledby="languages-niche-heading" className="pt-10 sm:pt-14 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 id="languages-niche-heading" className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">
              Links Oficiais das Linguagens por Nicho
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Acesse a documentação oficial, compiladores e tutoriais recomendados das linguagens de programação mais utilizadas no mercado.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('resources')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center cursor-pointer self-start sm:self-auto"
          >
            <span>Ver Acervo Completo</span>
          </button>
        </div>

        {/* Niche Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {NICHE_CATEGORIES.map((cat) => {
            const isSelected = selectedNiche === cat.id;
            return (
              <button
                key={cat.id}
                id={`dash-niche-${cat.id}-btn`}
                type="button"
                onClick={() => setSelectedNiche(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Cards of Official Languages for Selected Niche */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {languagesForNiche.map((lang, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-2xs hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    <span>{lang.nicheLabel}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {lang.level}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-zinc-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {lang.name}
                </h3>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {lang.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {lang.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-500"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
                <div className="flex items-center gap-2">
                  <a
                    href={lang.officialDocUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center justify-center shadow-2xs"
                  >
                    <span>Manual Oficial</span>
                  </a>

                  {lang.officialSiteUrl && (
                    <a
                      href={lang.officialSiteUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors flex items-center justify-center"
                      title="Site Oficial"
                    >
                      <span>Site Oficial</span>
                    </a>
                  )}
                </div>

                {lang.learningResourceUrl && (
                  <a
                    href={lang.learningResourceUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-full py-1.5 px-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-[11px] font-medium transition-colors flex items-center justify-between"
                  >
                    <span className="truncate">
                      {lang.learningResourceLabel || 'Tutorial para Iniciantes'}
                    </span>
                    <span className="text-[10px] text-zinc-400">Acessar</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SEÇÃO NOBRE 2: SUGESTÕES DE CURSOS GRATUITOS E ARTIGOS DE LEITURA
          ========================================================================= */}
      <section id="section-courses-articles" aria-labelledby="courses-articles-heading" className="pt-10 sm:pt-14 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 id="courses-articles-heading" className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">
              Sugestões de Cursos Gratuitos e Artigos para Leitura
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Cursos consagrados de universidades mundiais e artigos estruturados para acelerar sua compreensão técnica.
            </p>
          </div>

          {/* Toggle Tab */}
          <div className="inline-flex p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 self-start sm:self-auto">
            <button
              id="dash-toggle-courses-btn"
              type="button"
              onClick={() => setSuggestionTab('courses')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                suggestionTab === 'courses'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
              }`}
            >
              Cursos Gratuitos ({SUGGESTED_COURSES.length})
            </button>
            <button
              id="dash-toggle-articles-btn"
              type="button"
              onClick={() => setSuggestionTab('articles')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                suggestionTab === 'articles'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
              }`}
            >
              Artigos Fundamentais ({SUGGESTED_ARTICLES.length})
            </button>
          </div>
        </div>

        {/* Courses Display */}
        {suggestionTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUGGESTED_COURSES.slice(0, 6).map((course) => (
              <div
                key={course.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-2xs hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/50 text-indigo-800 dark:text-indigo-300 font-bold text-[11px]">
                      {course.providerBadge}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {course.estimatedHours}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-zinc-950 dark:text-white leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {course.tags.slice(0, 3).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-500"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-zinc-500">
                    {course.language}
                  </span>

                  <a
                    href={course.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors inline-flex items-center shadow-2xs"
                  >
                    <span>Acessar Curso</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Articles Display */}
        {suggestionTab === 'articles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SUGGESTED_ARTICLES.map((art) => (
              <div
                key={art.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-2xs hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-bold text-[11px]">
                      {art.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {art.readTime}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-zinc-950 dark:text-white leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-zinc-500">
                      Ponto-Chave:
                    </span>
                    <p className="text-[11px] text-zinc-700 dark:text-zinc-300 line-clamp-2">
                      {art.keyTakeaways[0]}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-zinc-500 truncate">
                    {art.authorOrSource}
                  </span>

                  <a
                    href={art.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors inline-flex items-center shadow-2xs"
                  >
                    <span>Ler Artigo</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================================
          SEÇÃO NOBRE 3: LIVROS CLÁSSICOS, RESUMOS & RESENHAS DA INTERNET
          ========================================================================= */}
      <section id="section-curated-books" aria-labelledby="curated-books-heading" className="pt-10 sm:pt-14 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 id="curated-books-heading" className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">
              Biblioteca Canônica: Livros, Resumos & Resenhas
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Consulte a síntese dos livros essenciais da computação (Clean Code, Pragmatic Programmer, DDIA, Grokking Algorithms) com análise de resenhas do Goodreads e Amazon.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('resources')}
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center cursor-pointer self-start sm:self-auto"
          >
            <span>Abrir Biblioteca Completa</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CURATED_BOOKS.slice(0, 4).map((book) => (
            <div
              key={book.id}
              onClick={() => setActiveTab('resources')}
              className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-2xs hover:border-emerald-500/40 hover:shadow-md transition-all flex flex-col justify-between space-y-3 cursor-pointer"
            >
              <div className="space-y-2.5">
                <div className={`h-24 rounded-xl bg-linear-to-br ${book.coverColor} p-3 text-white flex flex-col justify-between relative overflow-hidden shadow-inner`}>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded backdrop-blur-xs self-start">
                    {book.level}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold line-clamp-2 leading-snug">
                    {book.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[11px] text-zinc-500 truncate font-medium">
                    {book.author.split(' ')[0]} {book.author.split(' ')[1] || ''}
                  </span>
                  <span className="text-zinc-700 dark:text-zinc-300 font-bold text-[11px]">
                    Nota {book.rating.toFixed(1)}/5
                  </span>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {book.oneLinePitch}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold group-hover:underline">
                <span>Ver Resumo & Resenhas</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
