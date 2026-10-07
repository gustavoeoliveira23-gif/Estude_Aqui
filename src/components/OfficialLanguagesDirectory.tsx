import React, { useState, useMemo } from 'react';
import {
  Code2,
  ExternalLink,
  Search,
  BookOpen,
  Sparkles,
  Layers,
  Cpu,
  Globe,
  Database,
  Smartphone,
  Cloud,
  Gamepad2,
  ShieldCheck,
  Binary,
  CheckCircle2,
  Filter,
  ArrowUpRight,
  BookMarked,
  Tag
} from 'lucide-react';
import {
  LanguageOfficialLink,
  NICHE_CATEGORIES,
  OFFICIAL_LANGUAGES_DATA,
  NicheCategory
} from '../data/languagesByNiche';

interface OfficialLanguagesDirectoryProps {
  onGenerateFlashcardsForLanguage?: (langName: string, desc: string) => void;
  onCreateNoteForLanguage?: (langName: string, desc: string) => void;
  initialNicheFilter?: string;
}

export const OfficialLanguagesDirectory: React.FC<OfficialLanguagesDirectoryProps> = ({
  onGenerateFlashcardsForLanguage,
  onCreateNoteForLanguage,
  initialNicheFilter = 'all'
}) => {
  const [selectedNiche, setSelectedNiche] = useState<string>(initialNicheFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('Todos');

  // Filtered languages
  const filteredLanguages = useMemo(() => {
    return OFFICIAL_LANGUAGES_DATA.filter((item) => {
      const matchesNiche = selectedNiche === 'all' || item.niche === selectedNiche;
      const matchesLevel = selectedLevel === 'Todos' || item.level === selectedLevel || item.level === 'Todos';
      
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.nicheLabel.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesNiche && matchesLevel && matchesQuery;
    });
  }, [selectedNiche, selectedLevel, searchQuery]);

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

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
              <span>Diretório Oficial de Linguagens & Tecnologias</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
              Documentações e Manuais Oficiais por Nicho
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Acesse os links oficiais das linguagens de programação, compiladores e frameworks divididos por especialidade: Web, Robótica, Backend, IA, Mobile, Banco de Dados, DevOps, Game Dev e Cibersegurança.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold">
              {filteredLanguages.length} Tecnologias Listadas
            </span>
          </div>
        </div>
      </div>

      {/* Search & Niche Filter Bar */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              id="search-languages-input"
              type="text"
              placeholder="Buscar linguagem (ex: C++, Python, Arduino, Rust, React, Godot)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <span className="text-[11px] font-semibold text-zinc-500">Nível:</span>
            {['Todos', 'Iniciante', 'Intermediário', 'Avançado'].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Niche Category Pills (Horizontal Scrolling) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            id="niche-filter-all-btn"
            type="button"
            onClick={() => setSelectedNiche('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
              selectedNiche === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            <span>Todos os Nichos</span>
          </button>

          {NICHE_CATEGORIES.map((cat) => {
            const isSelected = selectedNiche === cat.id;
            return (
              <button
                key={cat.id}
                id={`niche-filter-${cat.id}-btn`}
                type="button"
                onClick={() => setSelectedNiche(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-xs'
                    : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
              >
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Languages and Official Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLanguages.map((lang, idx) => (
          <div
            key={idx}
            className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-2xs hover:shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Header: Niche Badge + Level */}
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  <span>{lang.nicheLabel}</span>
                </div>

                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/40">
                  {lang.level}
                </span>
              </div>

              {/* Language Title & Description */}
              <div>
                <h3 className="text-base font-extrabold text-zinc-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {lang.name}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                  {lang.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {lang.tags.slice(0, 3).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 text-zinc-500"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
              <div className="flex items-center gap-2">
                <a
                  href={lang.officialDocUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Manual Oficial</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>

                {lang.officialSiteUrl && (
                  <a
                    href={lang.officialSiteUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors flex items-center justify-center"
                    title={`Site Oficial de ${lang.name}`}
                  >
                    <Globe className="w-4 h-4" />
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
                  <ArrowUpRight className="w-3 h-3 shrink-0 text-zinc-400" />
                </a>
              )}

              {/* Study Action Triggers */}
              {(onGenerateFlashcardsForLanguage || onCreateNoteForLanguage) && (
                <div className="flex items-center gap-2 pt-1">
                  {onGenerateFlashcardsForLanguage && (
                    <button
                      type="button"
                      onClick={() =>
                        onGenerateFlashcardsForLanguage(lang.name, lang.description)
                      }
                      className="flex-1 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold border border-emerald-200/60 dark:border-emerald-900/40 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>Gerar Flashcards</span>
                    </button>
                  )}

                  {onCreateNoteForLanguage && (
                    <button
                      type="button"
                      onClick={() =>
                        onCreateNoteForLanguage(lang.name, lang.description)
                      }
                      className="flex-1 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 dark:hover:bg-cyan-900/50 text-cyan-800 dark:text-cyan-300 text-[11px] font-semibold border border-cyan-200/60 dark:border-cyan-900/40 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <BookMarked className="w-3 h-3 text-cyan-600" />
                      <span>Criar Nota</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredLanguages.length === 0 && (
        <div className="py-16 text-center space-y-3 p-8 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
          <Code2 className="w-10 h-10 mx-auto text-zinc-400" />
          <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
            Nenhuma linguagem encontrada para os critérios selecionados
          </h3>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            Tente remover os filtros ou buscar por palavras-chave como C, Python, JavaScript, Arduino, Linux ou ROS.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedNiche('all');
              setSelectedLevel('Todos');
            }}
            className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 cursor-pointer"
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  );
};
