import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  BookOpen,
  ExternalLink,
  Search,
  Sparkles,
  Layers,
  Clock,
  CheckCircle2,
  Award,
  BookMarked,
  ArrowRight,
  Filter,
  FileText
} from 'lucide-react';
import {
  CourseSuggestion,
  ReadingArticleSuggestion,
  SUGGESTED_COURSES,
  SUGGESTED_ARTICLES
} from '../data/coursesAndArticles';

interface SuggestedCoursesAndArticlesProps {
  onStartStudyWithTopic?: (topicTitle: string, desc: string) => void;
  onOpenNotes?: () => void;
}

export const SuggestedCoursesAndArticles: React.FC<SuggestedCoursesAndArticlesProps> = ({
  onStartStudyWithTopic,
  onOpenNotes
}) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'articles'>('courses');
  const [selectedNiche, setSelectedNiche] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter courses
  const filteredCourses = useMemo(() => {
    return SUGGESTED_COURSES.filter((course) => {
      const matchesNiche = selectedNiche === 'all' || course.niche === selectedNiche;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q) ||
        course.provider.toLowerCase().includes(q) ||
        course.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesNiche && matchesQuery;
    });
  }, [selectedNiche, searchQuery]);

  // Filter articles
  const filteredArticles = useMemo(() => {
    return SUGGESTED_ARTICLES.filter((art) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.authorOrSource.toLowerCase().includes(q) ||
        art.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesQuery;
    });
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {/* Subheader Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Tab switcher */}
        <div className="inline-flex p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700">
          <button
            id="tab-courses-btn"
            type="button"
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Sugestões de Cursos Gratuitos ({SUGGESTED_COURSES.length})</span>
          </button>

          <button
            id="tab-articles-btn"
            type="button"
            onClick={() => setActiveTab('articles')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'articles'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Artigos Fundamentais para Leitura ({SUGGESTED_ARTICLES.length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Filtrar cursos ou artigos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Courses View */}
      {activeTab === 'courses' && (
        <div className="space-y-4">
          {/* Niche Pills for Courses */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'Todas as Áreas' },
              { id: 'fundamentos', label: 'Ciência da Computação & Lógica' },
              { id: 'web', label: 'Web Full Stack' },
              { id: 'robotica', label: 'Robótica & IoT' },
              { id: 'ia_datascience', label: 'IA & Machine Learning' },
              { id: 'mobile', label: 'Mobile (Android & iOS)' }
            ].map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => setSelectedNiche(n.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  selectedNiche === n.id
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {n.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-2xs hover:shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-bold text-[11px]">
                      {course.providerBadge}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {course.estimatedHours}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300">
                        100% Gratuito
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-zinc-950 dark:text-white leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {course.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-500"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-zinc-500 font-medium">
                    Idioma: <strong className="text-zinc-700 dark:text-zinc-300">{course.language}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                    >
                      <span>Acessar Curso</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Articles View */}
      {activeTab === 'articles' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-2xs hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900/50 text-indigo-800 dark:text-indigo-300 font-bold text-[11px]">
                      {art.category}
                    </span>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {art.readTime} de leitura
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-zinc-950 dark:text-white leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  {/* Key Takeaways */}
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-zinc-500">
                      Principais Aprendizados:
                    </span>
                    <ul className="space-y-1">
                      {art.keyTakeaways.map((takeaway, idx) => (
                        <li
                          key={idx}
                          className="text-[11px] text-zinc-700 dark:text-zinc-300 flex items-start gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-zinc-500 font-medium truncate">
                    Fonte: {art.authorOrSource}
                  </span>

                  <a
                    href={art.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors inline-flex items-center gap-1.5 shadow-2xs shrink-0"
                  >
                    <span>Ler Artigo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
