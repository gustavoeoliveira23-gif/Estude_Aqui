import React from 'react';
import {
  TrendingUp,
  Flame,
  Clock,
  Layers,
  Award,
  Calendar,
  CheckCircle2,
  SlidersHorizontal,
  Compass,
  Target,
  Cpu,
  Briefcase,
  User as UserIcon,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { SectorType, StudyStats, User } from '../types';

interface StatsViewProps {
  stats: StudyStats;
  user: User | null;
  currentSector: SectorType;
  setCurrentSector: (sector: SectorType) => void;
  onOpenDiagnostic: () => void;
  onOpenAuth?: (mode?: 'login' | 'register') => void;
}

export const StatsView: React.FC<StatsViewProps> = ({
  stats,
  user,
  currentSector,
  setCurrentSector,
  onOpenDiagnostic,
  onOpenAuth,
}) => {
  const studentLevel = user?.profile?.level || 'Iniciante';
  const studentCourse = user?.profile?.courseName || 'Tecnologia da Informação';
  const studentType = user?.profile?.courseType || 'Graduação';

  // Calculate percentages
  const masteryPercentage =
    stats.cardsReviewedTotal > 0
      ? Math.round((stats.cardsMasteredTotal / stats.cardsReviewedTotal) * 100)
      : 0;

  // Max value in daily study for scaling bar heights
  const maxDailyMin = Math.max(...stats.dailyStudyMinutes.map((d) => d.minutes), 60);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16 animate-fadeIn">
      {/* User Profile & Core Study Area Card */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* User Info & Streak Badge */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="w-7 h-7" />}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-lg sm:text-xl font-extrabold text-zinc-950 dark:text-white">
                  {user?.name || 'Estudante Visitante'}
                </h2>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 font-bold text-xs">
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{stats.streakDays} dias de foco</span>
                </div>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {user?.email || 'Cadastre-se para salvar seu progresso e notas na nuvem'} • Nível:{' '}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {user?.levelTitle || 'Estudante Tech'}
                </span>
              </p>
            </div>
          </div>

          {/* Core Selection & Diagnostic Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Core Study Area Selector (Tecnologia vs Administração) */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                Núcleo Acadêmico Ativo
              </span>
              <div className="inline-flex rounded-xl p-1 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700">
                <button
                  id="stats-sector-tech-btn"
                  type="button"
                  onClick={() => setCurrentSector('tecnologia')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentSector === 'tecnologia'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Tecnologia</span>
                </button>
                <button
                  id="stats-sector-admin-btn"
                  type="button"
                  onClick={() => setCurrentSector('administracao')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    currentSector === 'administracao'
                      ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Administração</span>
                  <span className="text-[9px] uppercase tracking-wider px-1 py-0.2 rounded bg-zinc-300/70 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200">
                    Preview
                  </span>
                </button>
              </div>
            </div>

            {/* Recalibrate / Diagnostic Button */}
            <div className="flex flex-col justify-end">
              <button
                id="stats-recalibrate-profile-btn"
                type="button"
                onClick={onOpenDiagnostic}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
                title="Calibrar curso, semestre e grau de proficiência"
              >
                <SlidersHorizontal className="w-4 h-4 text-emerald-500" />
                <span>Calibrar Nível</span>
              </button>
            </div>
          </div>
        </div>

        {/* Academic Details Strip */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/60">
            <span className="text-zinc-400 text-[11px] block">Curso / Trilha</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{studentCourse}</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/60">
            <span className="text-zinc-400 text-[11px] block">Modalidade de Formação</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{studentType}</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/60">
            <span className="text-zinc-400 text-[11px] block">Nível Diagnosticado</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{studentLevel}</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Sequência de Foco</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-mono">
            {stats.streakDays}{' '}
            <span className="text-xs font-normal text-zinc-500">dias seguidos</span>
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Rotina ativa hoje (+12% retenção)
          </div>
        </div>

        {/* Total Focus Time */}
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Tempo Total Esta Semana</span>
            <Clock className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-mono">
            {Math.floor(stats.totalStudyMinutes / 60)}h {stats.totalStudyMinutes % 60}m
          </div>
          <div className="text-[11px] text-zinc-600 dark:text-zinc-400">
            {stats.totalStudyMinutes > 0 ? (
              <>Representa <strong>{Math.min(100, Math.round((stats.totalStudyMinutes / 480) * 100))}% da meta semanal</strong> ({stats.pomodorosCompleted} blocos de foco)</>
            ) : (
              <>Complete seu <strong>primeiro ciclo de 25 min</strong> para preencher o gráfico</>
            )}
          </div>
        </div>

        {/* Retention & Mastery */}
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Taxa de Domínio de Cards</span>
            <Layers className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-mono">
            {masteryPercentage}%
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400">
            {stats.cardsMasteredTotal} de {stats.cardsReviewedTotal} dominados na memória de longo prazo
          </div>
        </div>

        {/* Level & XP */}
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Pontuação & Nível</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white font-mono">
            {user?.xp || 200}{' '}
            <span className="text-xs font-normal text-zinc-500">XP</span>
          </div>
          <div className="text-[11px] text-zinc-600 dark:text-zinc-400">
            Faltam <strong>50 pontos</strong> para o próximo nível ({user?.levelTitle || 'Estudante Tech'})
          </div>
        </div>
      </div>

      {/* Main Analysis: Daily Activity Chart (Left) + Academic Profile Breakdown (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Weekly Focus Chart (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-500" />
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Minutos de Estudo por Dia (Última Semana)
              </h3>
            </div>
            <span className="text-xs font-mono text-zinc-400">Tempo acumulado</span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 pt-8 pb-2">
            {stats.dailyStudyMinutes.map((item, index) => {
              const heightPercent = Math.max(Math.round((item.minutes / maxDailyMin) * 100), 8);
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-mono text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.minutes}m
                  </span>
                  <div
                    className="w-full max-w-[36px] bg-gradient-to-t from-emerald-600 to-teal-500 rounded-t-lg transition-all duration-500 group-hover:brightness-110"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
            <span>Média diária recente:</span>
            <span className="font-mono font-bold text-zinc-900 dark:text-white">
              {Math.round(
                stats.dailyStudyMinutes.reduce((a, b) => a + b.minutes, 0) /
                  stats.dailyStudyMinutes.length
              )}{' '}
              minutos/dia
            </span>
          </div>
        </div>

        {/* Right Column: Profile & Calibrated Level Breakdown (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              Perfil & Nível de Aprendizado
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                Nível Avaliado:
              </span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
                {studentLevel}
              </span>
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-400">
              Curso: <strong>{studentCourse}</strong> ({studentType})
            </div>
          </div>

          {/* Subject Mastery Progress Bars */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Proficiência por Disciplina
            </span>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300">
                <span>Estruturas de Dados & Algoritmos</span>
                <span className="font-mono font-bold">78%</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300">
                <span>Arquitetura de Software & Clean Code</span>
                <span className="font-mono font-bold">65%</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: '65%' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300">
                <span>Bancos de Dados & SQL</span>
                <span className="font-mono font-bold">84%</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: '84%' }} />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              id="retest-knowledge-btn"
              type="button"
              onClick={onOpenDiagnostic}
              className="w-full py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Target className="w-3.5 h-3.5 text-emerald-500" />
              <span>Refazer Teste Diagnóstico</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

