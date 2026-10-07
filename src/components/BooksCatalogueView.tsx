import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Star,
  Search,
  BookmarkCheck,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Quote,
  ThumbsUp,
  MessageSquare,
  Layers,
  ChevronRight,
  X,
  Share2,
  Copy,
  BookMarked,
  Filter,
  TrendingUp,
  Award,
  AlertCircle
} from 'lucide-react';
import { CuratedBook, CURATED_BOOKS, BookChapterSummary, BookReview } from '../data/curatedBooks';
import { SectorType } from '../types';

interface BooksCatalogueViewProps {
  currentSector?: SectorType;
  onGenerateCardsForBook?: (bookTitle: string, bookSummary: string) => void;
  onCreateNoteForBook?: (book: CuratedBook) => void;
}

export const BooksCatalogueView: React.FC<BooksCatalogueViewProps> = ({
  currentSector = 'tecnologia',
  onGenerateCardsForBook,
  onCreateNoteForBook,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedLevel, setSelectedLevel] = useState<string>('Todos');
  const [selectedBook, setSelectedBook] = useState<CuratedBook | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'summary' | 'reviews'>('summary');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [expandedChapterIndex, setExpandedChapterIndex] = useState<number | null>(0);

  // Filter books list
  const filteredBooks = useMemo(() => {
    return CURATED_BOOKS.filter((book) => {
      const matchesSector =
        book.sector === 'ambos' ||
        book.sector === currentSector ||
        currentSector === undefined;

      const matchesCategory =
        selectedCategory === 'Todas' || book.category === selectedCategory;

      const matchesLevel =
        selectedLevel === 'Todos' || book.level === selectedLevel || book.level === 'Todos os Níveis';

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        (book.originalTitle && book.originalTitle.toLowerCase().includes(q)) ||
        book.author.toLowerCase().includes(q) ||
        book.oneLinePitch.toLowerCase().includes(q) ||
        book.overview.toLowerCase().includes(q) ||
        book.tags.some((t) => t.toLowerCase().includes(q));

      return matchesSector && matchesCategory && matchesLevel && matchesSearch;
    });
  }, [currentSector, selectedCategory, selectedLevel, searchQuery]);

  // Categories set
  const categories = useMemo(() => {
    const set = new Set<string>();
    CURATED_BOOKS.forEach((b) => set.add(b.category));
    return ['Todas', ...Array.from(set)];
  }, []);

  const handleCopySummary = (book: CuratedBook) => {
    const textToCopy = `RESUMO: ${book.title}\nAutor: ${book.author} (${book.publishedYear})\n\nTese Central:\n${book.coreThesis}\n\nLições Práticas:\n${book.practicalLessons.map((l, i) => `${i + 1}. ${l}`).join('\n')}\n\nAvaliação da Crítica: ${book.rating}/5.0 (Goodreads/Amazon)\n${book.communitySentiment.summaryOfReviews}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handleSelectBook = (book: CuratedBook, defaultTab: 'summary' | 'reviews' = 'summary') => {
    setSelectedBook(book);
    setActiveModalTab(defaultTab);
    setExpandedChapterIndex(0);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Explanation */}
      <div className="p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-linear-to-r from-zinc-900 via-zinc-900 to-zinc-950 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Biblioteca Essencial de Engenharia & Computação</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Livros Canônicos, Resumos Estruturados & Resenhas
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Acesse o resumo aprofundado dos maiores clássicos da literatura técnica (Clean Code, Pragmatic Programmer, DDIA, Grokking Algorithms e mais), com as principais lições práticas e o consenso de resenhas da comunidade global (Goodreads, Amazon e Dev.to).
          </p>
        </div>

        <div className="flex flex-wrap md:flex-col items-start gap-2 text-xs text-zinc-300 font-mono shrink-0">
          <div className="px-3 py-1.5 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span><strong>{CURATED_BOOKS.length}</strong> Livros Catalogados</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Resenhas Verificadas</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs space-y-3.5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              id="search-books-input"
              type="text"
              placeholder="Buscar livro por título, autor (ex: Uncle Bob, Martin Fowler, Bhargava), conceitos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-zinc-400 shrink-0" />
            <select
              id="select-book-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-2 px-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  Categoria: {cat}
                </option>
              ))}
            </select>

            {/* Level Select */}
            <select
              id="select-book-level"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="py-2 px-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Todos">Nível: Todos</option>
              <option value="Iniciante">Nível: Iniciante</option>
              <option value="Intermediário">Nível: Intermediário</option>
              <option value="Avançado">Nível: Avançado</option>
            </select>
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            id={`book-card-${book.id}`}
            className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-2xs hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3.5">
              {/* Fake Book Cover / Spine Visual */}
              <div
                className={`h-36 rounded-xl bg-linear-to-br ${book.coverColor} p-4 text-white flex flex-col justify-between relative overflow-hidden border border-white/10 shadow-inner`}
              >
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-black/20 backdrop-blur-xs border-l border-white/10 flex items-center justify-center">
                  <span className="text-[9px] font-mono tracking-widest uppercase rotate-90 text-white/70 whitespace-nowrap">
                    {book.category.split(' ')[0]}
                  </span>
                </div>

                <div className="space-y-1 pr-8">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-xs">
                    {book.level}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold leading-tight line-clamp-2 text-white">
                    {book.title}
                  </h3>
                </div>

                <div className="pr-8 text-[11px] text-zinc-200/90 font-medium truncate">
                  Por {book.author} • {book.publishedYear}
                </div>
              </div>

              {/* Rating & Stats */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-amber-500 dark:text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{book.rating.toFixed(1)}</span>
                  <span className="text-zinc-400 font-normal">
                    ({(book.totalRatingsCount / 1000).toFixed(1)}k avaliações)
                  </span>
                </div>

                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
                  {book.pages} páginas
                </span>
              </div>

              {/* Pitch */}
              <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
                {book.oneLinePitch}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {book.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
              <button
                id={`btn-open-summary-${book.id}`}
                type="button"
                onClick={() => handleSelectBook(book, 'summary')}
                className="flex-1 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Ver Resumo Completo</span>
              </button>

              <button
                id={`btn-open-reviews-${book.id}`}
                type="button"
                onClick={() => handleSelectBook(book, 'reviews')}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-all flex items-center gap-1 cursor-pointer"
                title="Ver Resenhas da Internet"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Resenhas</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="p-12 text-center rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 space-y-3">
          <BookOpen className="w-10 h-10 mx-auto text-zinc-400" />
          <h3 className="text-base font-bold text-zinc-900 dark:text-white">
            Nenhum livro encontrado para este filtro
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Tente remover os termos de busca ou mudar a categoria selecionada.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Todas');
              setSelectedLevel('Todos');
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white cursor-pointer"
          >
            Limpar Filtros
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DETAILED MODAL: RESUMO COMPLETO & RESENHAS DA INTERNET                    */}
      {/* ========================================================================= */}
      {selectedBook && (
        <div
          id="book-detail-modal-overlay"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={() => setSelectedBook(null)}
        >
          <div
            id="book-detail-modal-card"
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden animate-scaleUp text-zinc-900 dark:text-zinc-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient and meta */}
            <div className={`p-6 bg-linear-to-r ${selectedBook.coverColor} text-white relative shrink-0`}>
              <button
                id="btn-close-book-modal"
                type="button"
                onClick={() => setSelectedBook(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors cursor-pointer"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row items-start gap-4 pr-8">
                <div className="w-16 h-22 rounded-lg bg-white/10 border border-white/20 flex flex-col justify-between p-2 shadow-inner shrink-0 hidden sm:flex">
                  <BookOpen className="w-5 h-5 text-white/80" />
                  <span className="text-[9px] font-mono text-white/80 uppercase leading-none">
                    {selectedBook.level}
                  </span>
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs uppercase">
                      {selectedBook.category}
                    </span>
                    <span className="text-xs text-white/80 font-mono">
                      {selectedBook.pages} págs • Ano {selectedBook.publishedYear}
                    </span>
                    <span className="text-xs text-emerald-300 font-semibold">
                      ★ {selectedBook.rating.toFixed(1)} / 5.0 (Crítica Consolidada)
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    {selectedBook.title}
                  </h2>

                  {selectedBook.originalTitle && (
                    <p className="text-xs text-white/80 italic font-mono">
                      Título Original: {selectedBook.originalTitle}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-white/90 font-medium">
                    Autor(es): <strong>{selectedBook.author}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs between Summary and Reviews */}
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-6 bg-zinc-50 dark:bg-zinc-950/60 shrink-0">
              <div className="flex items-center gap-4 text-xs font-bold">
                <button
                  id="modal-tab-summary-btn"
                  type="button"
                  onClick={() => setActiveModalTab('summary')}
                  className={`py-3.5 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                    activeModalTab === 'summary'
                      ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                      : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Resumo Completo da Obra</span>
                </button>

                <button
                  id="modal-tab-reviews-btn"
                  type="button"
                  onClick={() => setActiveModalTab('reviews')}
                  className={`py-3.5 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                    activeModalTab === 'reviews'
                      ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                      : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Resenhas da Internet & Crítica ({selectedBook.reviews.length})</span>
                </button>
              </div>

              {/* Quick Copy / Share */}
              <button
                type="button"
                onClick={() => handleCopySummary(selectedBook)}
                className="px-3 py-1 rounded-lg text-xs font-semibold bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedNotification ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Síntese</span>
                  </>
                )}
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* ========================================================= */}
              {/* TAB 1: RESUMO DO LIVRO (SUMMARY)                         */}
              {/* ========================================================= */}
              {activeModalTab === 'summary' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Core Thesis Card */}
                  <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/60 dark:bg-emerald-950/30 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                      <Sparkles className="w-4 h-4" />
                      <span>TESE CENTRAL & FILOSOFIA DA OBRA</span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 leading-relaxed font-medium">
                      "{selectedBook.coreThesis}"
                    </p>
                  </div>

                  {/* Overview */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      Visão Geral & Contexto
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {selectedBook.overview}
                    </p>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 pt-1">
                      <strong>Público-Alvo Recomendado:</strong> {selectedBook.targetAudience}
                    </div>
                  </div>

                  {/* Structured Chapters Accordion */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Resumo dos Capítulos Principais ({selectedBook.chapters.length})</span>
                      </h4>
                      <span className="text-[11px] text-zinc-400">Clique para expandir</span>
                    </div>

                    <div className="space-y-2.5">
                      {selectedBook.chapters.map((chap, idx) => {
                        const isExpanded = expandedChapterIndex === idx;
                        return (
                          <div
                            key={chap.title}
                            className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 overflow-hidden transition-all"
                          >
                            <button
                              type="button"
                              onClick={() => setExpandedChapterIndex(isExpanded ? null : idx)}
                              className="w-full p-3.5 text-left flex items-center justify-between gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-6 h-6 rounded-md bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                                  {chap.chapterNumber}
                                </span>
                                <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
                                  {chap.title}
                                </span>
                              </div>
                              <ChevronRight
                                className={`w-4 h-4 text-zinc-400 transition-transform ${
                                  isExpanded ? 'rotate-90 text-emerald-600' : ''
                                }`}
                              />
                            </button>

                            {isExpanded && (
                              <div className="p-4 pt-0 border-t border-zinc-200/60 dark:border-zinc-800/60 space-y-3 mt-2 text-xs">
                                <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                  {chap.summary}
                                </p>

                                <div className="space-y-1.5 bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
                                  <span className="font-bold text-[11px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                                    Conceitos-Chave & Regras de Ouro:
                                  </span>
                                  <ul className="space-y-1 text-zinc-700 dark:text-zinc-300">
                                    {chap.keyTakeaways.map((point, pIdx) => (
                                      <li key={pIdx} className="flex items-start gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                        <span>{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Practical Daily Lessons */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>5 Lições Práticas para o seu Dia a Dia</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedBook.practicalLessons.map((lesson, lIdx) => (
                        <div
                          key={lIdx}
                          className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {lIdx + 1}
                          </span>
                          <span className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                            {lesson}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Memorable Quotes */}
                  {selectedBook.memorableQuotes.length > 0 && (
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                        <Quote className="w-3.5 h-3.5" />
                        <span>Citações Marcantes da Obra</span>
                      </h4>
                      <div className="space-y-2">
                        {selectedBook.memorableQuotes.map((quote, qIdx) => (
                          <div
                            key={qIdx}
                            className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 border-l-4 border-emerald-500 text-xs italic text-zinc-800 dark:text-zinc-200"
                          >
                            {quote}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 2: RESENHAS DA INTERNET & CRÍTICA                     */}
              {/* ========================================================= */}
              {activeModalTab === 'reviews' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Scoreboard Overview */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-center space-y-1">
                      <div className="text-[11px] font-semibold text-zinc-500 uppercase">
                        Aprovação da Comunidade
                      </div>
                      <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                        {selectedBook.communitySentiment.positivePercentage}%
                      </div>
                      <div className="text-[11px] text-zinc-400">Sentimento Positivo</div>
                    </div>

                    <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-center space-y-1">
                      <div className="text-[11px] font-semibold text-zinc-500 uppercase">
                        Goodreads Global
                      </div>
                      <div className="text-lg font-bold text-amber-500">
                        {selectedBook.communitySentiment.goodreadsScore.split(' ')[0]} ★
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        {selectedBook.communitySentiment.goodreadsScore}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-center space-y-1">
                      <div className="text-[11px] font-semibold text-zinc-500 uppercase">
                        Amazon Reviewers
                      </div>
                      <div className="text-lg font-bold text-amber-500">
                        {selectedBook.communitySentiment.amazonScore.split(' ')[0]} ★
                      </div>
                      <div className="text-[10px] text-zinc-400">
                        {selectedBook.communitySentiment.amazonScore}
                      </div>
                    </div>
                  </div>

                  {/* Summary of Consensus */}
                  <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Consenso Geral das Resenhas na Web</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {selectedBook.communitySentiment.summaryOfReviews}
                    </p>
                  </div>

                  {/* Strengths and Critical Points */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Strengths */}
                    <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
                      <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Principais Elogios & Pontos Fortes</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                        {selectedBook.communitySentiment.strengths.map((str, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Critical Points */}
                    <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 space-y-2">
                      <div className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        <span>Pontos de Atenção & Críticas Construtivas</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                        {selectedBook.communitySentiment.criticalPoints.map((cri, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-1.5">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{cri}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Detailed Reviews Cards */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Resenhas em Destaque da Comunidade</span>
                    </h4>

                    <div className="space-y-3">
                      {selectedBook.reviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 space-y-2.5"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs uppercase">
                                {rev.reviewerName.charAt(0)}
                              </div>
                              <div>
                                <span className="font-bold text-zinc-900 dark:text-zinc-100">
                                  {rev.reviewerName}
                                </span>
                                {rev.role && (
                                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block sm:inline sm:ml-2">
                                    • {rev.role}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                                {rev.source}
                              </span>
                              <div className="flex items-center text-amber-500">
                                {Array.from({ length: rev.rating }).map((_, i) => (
                                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                            </div>
                          </div>

                          <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                            "{rev.title}"
                          </h5>

                          <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            {rev.comment}
                          </p>

                          {rev.pros.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {rev.pros.map((p, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded text-[10px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40"
                                >
                                  + {p}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* External Links */}
                  <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2.5">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Links Oficiais para Ler Mais Resenhas na Web</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedBook.externalReviewLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="w-3 h-3 text-zinc-400" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Action Bar */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                Livro: <strong>{selectedBook.title}</strong>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {onGenerateCardsForBook && (
                  <button
                    id="btn-generate-cards-from-book"
                    type="button"
                    onClick={() => {
                      onGenerateCardsForBook(
                        selectedBook.title,
                        `Livro: ${selectedBook.title} por ${selectedBook.author}. Tese: ${selectedBook.coreThesis}. Lições: ${selectedBook.practicalLessons.join(' | ')}`
                      );
                      setSelectedBook(null);
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Gerar Flashcards deste Livro</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedBook(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
