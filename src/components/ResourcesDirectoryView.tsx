import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  FileText,
  BookOpen,
  ExternalLink,
  Search,
  Filter,
  Sparkles,
  Layers,
  Compass,
  CheckCircle2,
  AlertTriangle,
  BookmarkCheck,
  ShieldCheck,
  Globe,
  RotateCcw,
  Tag,
  Code2,
  BookMarked,
  Library
} from 'lucide-react';
import { CuratedResource, SectorType, User } from '../types';
import { OfficialLanguagesDirectory } from './OfficialLanguagesDirectory';
import { SuggestedCoursesAndArticles } from './SuggestedCoursesAndArticles';
import { BooksCatalogueView } from './BooksCatalogueView';

interface ResourcesDirectoryViewProps {
  resources: CuratedResource[];
  currentSector: SectorType;
  user: User | null;
  onGenerateCardsForResource: (title: string, desc: string) => void;
  initialFilterOnlyErrors?: boolean;
  initialMainTab?: 'books' | 'languages' | 'courses' | 'articles_docs';
}

export const ResourcesDirectoryView: React.FC<ResourcesDirectoryViewProps> = ({
  resources,
  currentSector,
  user,
  onGenerateCardsForResource,
  initialFilterOnlyErrors = false,
  initialMainTab = 'books'
}) => {
  // Main view mode tabs
  const [mainViewTab, setMainViewTab] = useState<'books' | 'languages' | 'courses' | 'articles_docs'>(initialMainTab);

  // Filters for the curated documentation/articles catalogue tab
  const [selectedType, setSelectedType] = useState<string>('Todos');
  const [selectedTopic, setSelectedTopic] = useState<string>('Todos');
  const [selectedLevel, setSelectedLevel] = useState<string>('Todos');
  const [onlyOfficial, setOnlyOfficial] = useState<boolean>(false);
  const [filterByQuizErrors, setFilterByQuizErrors] = useState<boolean>(initialFilterOnlyErrors);
  const [searchQuery, setSearchQuery] = useState('');

  const studentLevel = user?.profile?.level || 'Iniciante';
  const missedQuestions = user?.profile?.missedQuizQuestions || [];
  const missedTopics = useMemo(() => {
    return Array.from(new Set(missedQuestions.map((m) => m.topic.trim())));
  }, [missedQuestions]);

  // Sector filtering
  const sectorResources = useMemo(() => {
    return resources.filter((r) => r.sector === currentSector);
  }, [resources, currentSector]);

  // Unique topics list for selector
  const availableTopics = useMemo(() => {
    const topics = new Set<string>();
    sectorResources.forEach((r) => {
      if (r.topic) topics.add(r.topic);
      else if (r.category) topics.add(r.category);
    });
    return ['Todos', ...Array.from(topics)];
  }, [sectorResources]);

  // Comprehensive filtering logic
  const filteredResources = useMemo(() => {
    return sectorResources.filter((res) => {
      // 1. Format / Type Match
      const matchesType =
        selectedType === 'Todos' ||
        res.type === selectedType ||
        (selectedType === 'documentacao' && (res.type === 'documentacao' || res.type === 'especificacao_rfc')) ||
        (selectedType === 'artigo' && res.type === 'artigo');

      // 2. Academic Level Match
      const matchesLevel =
        selectedLevel === 'Todos' || res.level === selectedLevel || res.level === 'Todos';

      // 3. Topic Match
      const matchesTopic =
        selectedTopic === 'Todos' ||
        res.topic?.toLowerCase() === selectedTopic.toLowerCase() ||
        res.category?.toLowerCase() === selectedTopic.toLowerCase();

      // 4. Official Doc Toggle
      const matchesOfficial = !onlyOfficial || res.officialDoc === true;

      // 5. Quiz Errors Match
      let matchesQuizErrors = true;
      if (filterByQuizErrors) {
        if (missedTopics.length === 0) {
          matchesQuizErrors = false;
        } else {
          matchesQuizErrors = missedTopics.some((topicName) => {
            const topicLower = topicName.toLowerCase();
            const resTopicLower = (res.topic || '').toLowerCase();
            const resCatLower = (res.category || '').toLowerCase();
            const resTitleLower = res.title.toLowerCase();
            const resTagsMatch = res.tags?.some((t) =>
              topicLower.includes(t.toLowerCase()) || t.toLowerCase().includes(topicLower)
            );
            return (
              resTopicLower.includes(topicLower) ||
              topicLower.includes(resTopicLower) ||
              resCatLower.includes(topicLower) ||
              resTitleLower.includes(topicLower) ||
              resTagsMatch
            );
          });
        }
      }

      // 6. Text Search Query
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        res.title.toLowerCase().includes(query) ||
        res.description.toLowerCase().includes(query) ||
        res.source.toLowerCase().includes(query) ||
        (res.topic || '').toLowerCase().includes(query) ||
        (res.category || '').toLowerCase().includes(query) ||
        res.tags.some((tag) => tag.toLowerCase().includes(query));

      return (
        matchesType &&
        matchesLevel &&
        matchesTopic &&
        matchesOfficial &&
        matchesQuizErrors &&
        matchesSearch
      );
    });
  }, [
    sectorResources,
    selectedType,
    selectedLevel,
    selectedTopic,
    onlyOfficial,
    filterByQuizErrors,
    missedTopics,
    searchQuery,
  ]);

  const handleResetFilters = () => {
    setSelectedType('Todos');
    setSelectedTopic('Todos');
    setSelectedLevel('Todos');
    setOnlyOfficial(false);
    setFilterByQuizErrors(false);
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedType !== 'Todos' ||
    selectedTopic !== 'Todos' ||
    selectedLevel !== 'Todos' ||
    onlyOfficial ||
    filterByQuizErrors ||
    searchQuery.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16 animate-fadeIn">
      {/* Header with explicit architecture model */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
              Central de Documentações & Conhecimento Oficial
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Consulte os links oficiais das linguagens por nicho, descubra os cursos e artigos sugeridos ou pesquise no acervo indexado de manuais técnicos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {missedQuestions.length > 0 && (
            <button
              id="quick-filter-quiz-errors-btn"
              type="button"
              onClick={() => {
                setMainViewTab('articles_docs');
                setFilterByQuizErrors(!filterByQuizErrors);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
                filterByQuizErrors && mainViewTab === 'articles_docs'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800 hover:bg-amber-100'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>
                {filterByQuizErrors ? 'Filtrando Erros do Quiz' : `Revisar Meus Erros (${missedQuestions.length})`}
              </span>
            </button>
          )}

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
            <Compass className="w-3.5 h-3.5" />
            <span>Nível: {studentLevel}</span>
          </div>
        </div>
      </div>

      {/* Main Top Switcher Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          id="tab-view-books-btn"
          type="button"
          onClick={() => setMainViewTab('books')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            mainViewTab === 'books'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          <BookMarked className="w-4 h-4" />
          <span>Livros Recomendados & Resenhas</span>
        </button>

        <button
          id="tab-view-languages-btn"
          type="button"
          onClick={() => setMainViewTab('languages')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            mainViewTab === 'languages'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Linguagens Oficiais por Nicho</span>
        </button>

        <button
          id="tab-view-courses-btn"
          type="button"
          onClick={() => setMainViewTab('courses')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            mainViewTab === 'courses'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Cursos & Artigos Sugeridos</span>
        </button>

        <button
          id="tab-view-docs-btn"
          type="button"
          onClick={() => setMainViewTab('articles_docs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            mainViewTab === 'articles_docs'
              ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-xs'
              : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Catálogo de Recursos & Artigos</span>
        </button>
      </div>

      {/* Tab 0: Curated Books, Detailed Summaries & Internet Reviews */}
      {mainViewTab === 'books' && (
        <BooksCatalogueView
          currentSector={currentSector}
          onGenerateCardsForBook={(bookTitle, bookSummary) =>
            onGenerateCardsForResource(bookTitle, bookSummary)
          }
        />
      )}

      {/* Tab 1: Official Languages by Niche */}
      {mainViewTab === 'languages' && (
        <OfficialLanguagesDirectory
          onGenerateFlashcardsForLanguage={(langName, desc) =>
            onGenerateCardsForResource(langName, desc)
          }
        />
      )}

      {/* Tab 2: Suggested Courses & Reading Articles */}
      {mainViewTab === 'courses' && (
        <SuggestedCoursesAndArticles />
      )}

      {/* Tab 3: Detailed Filterable Catalog */}
      {mainViewTab === 'articles_docs' && (
        <div className="space-y-6">
          {/* Filter Toolbar */}
          <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs space-y-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Pesquisar por título, autor, protocolo, conceito..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Reset button if active filters */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Limpar Filtros</span>
                </button>
              )}
            </div>

            {/* Select Dropdowns and Toggles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              {/* Type Select */}
              <div>
                <label className="block text-[10px] font-mono text-zinc-500 mb-1">Formato:</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="Todos">Todos os Formatos</option>
                  <option value="documentacao">Documentação Oficial</option>
                  <option value="artigo">Artigo Técnico</option>
                  <option value="curso_mooc">Curso Aberto / MOOC</option>
                </select>
              </div>

              {/* Topic Select */}
              <div>
                <label className="block text-[10px] font-mono text-zinc-500 mb-1">Tópico:</label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  {availableTopics.map((top) => (
                    <option key={top} value={top}>
                      {top}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Select */}
              <div>
                <label className="block text-[10px] font-mono text-zinc-500 mb-1">Nível de Dificuldade:</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-xs font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="Todos">Todos os Níveis</option>
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>

              {/* Official Docs Toggle */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => setOnlyOfficial(!onlyOfficial)}
                  className={`w-full py-1.5 px-2.5 rounded-lg text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    onlyOfficial
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Apenas Oficiais</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-2xs hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/40">
                      {res.source}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800">
                      {res.durationOrReadTime}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-zinc-950 dark:text-white leading-snug">
                      {res.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 line-clamp-3 leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {res.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
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
                      href={res.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <span>{res.officialDoc ? 'Manual Oficial' : 'Acessar Artigo'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => onGenerateCardsForResource(res.title, res.description)}
                      className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors flex items-center justify-center cursor-pointer"
                      title="Gerar Flashcards com IA"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="py-16 text-center space-y-3 p-8 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
              <FileText className="w-10 h-10 mx-auto text-zinc-400" />
              <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Nenhum recurso encontrado com os filtros selecionados
              </h3>
              <p className="text-xs text-zinc-500 max-w-md mx-auto">
                Tente redefinir os filtros de busca ou navegar pelos links oficiais por nicho.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer"
              >
                Limpar Todos os Filtros
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
