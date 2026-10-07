import React, { useState } from 'react';
import {
  ArrowRight,
  BrainCircuit,
  Volume2,
  Play,
  RotateCw,
  Search,
  Sun,
  Moon
} from 'lucide-react';
import { User } from '../types';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  user?: User | null;
  onReturnToPlatform?: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onLogin,
  user,
  onReturnToPlatform,
  darkMode,
  setDarkMode,
}) => {
  // Mini interactive widgets for the sales demonstration
  const [cardFlipped, setCardFlipped] = useState(false);
  const [pomodoroRunning, setPomodoroRunning] = useState(false);
  const [demoSearch, setDemoSearch] = useState('Como funciona a Notação Big-O?');
  const [demoSearchResult, setDemoSearchResult] = useState<string | null>(
    'A Notação Big-O descreve o comportamento assintótico de um algoritmo, medindo como o tempo de execução ou uso de memória escala à medida que o tamanho da entrada (n) cresce.'
  );

  const handleDemoSearch = () => {
    if (!demoSearch.trim()) return;
    setDemoSearchResult(
      `Análise para "${demoSearch}": Conceito fundamental estruturado em passos lógicos, com analogias práticas e complexidade mapeada para fixação rápida.`
    );
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200 selection:bg-emerald-500 selection:text-black">
      {/* Background subtle geometric grid pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      {/* Minimalist Single-Page Navigation Header (NO LOGO ICON, NO VERSION) */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Name (Strictly Typography, No Logo Icon, No Version Tag) */}
          <div className="flex items-center">
            <span className="font-bold text-xl tracking-tight text-zinc-950 dark:text-white font-sans">
              Estude <span className="text-emerald-600 dark:text-emerald-400">Aqui</span>
            </span>
          </div>

          {/* Section Anchor Links (Minimalist Single Page Links) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <button
              type="button"
              onClick={() => scrollToSection('funcionalidades')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Funcionalidades
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('publico-alvo')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Para Quem É
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('beneficios')}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Benefícios
            </button>
          </nav>

          {/* Controls & Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button (Light/Dark Switcher) */}
            <button
              id="landing-theme-toggle-btn"
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all cursor-pointer"
              title={darkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
              aria-label="Alternar tema"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-800" />
              )}
            </button>

            {/* Header Login Action: ONLY "Entrar" button when not logged in */}
            {user ? (
              <button
                id="landing-header-app-btn"
                type="button"
                onClick={onReturnToPlatform}
                className="flex items-center gap-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer font-sans"
              >
                Acessar Plataforma
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                id="landing-header-login-btn"
                type="button"
                onClick={onLogin}
                className="flex items-center gap-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer font-sans"
              >
                Entrar
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH PUNCHY TAGLINE */}
      <section className="relative z-10 pt-16 sm:pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <h1
          style={{ fontFamily: "'Press Start 2P', monospace" }}
          className="font-press-start text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-relaxed sm:leading-relaxed"
        >
          Transforme horas de estudo em{' '}
          <span
            style={{ fontFamily: "'Press Start 2P', monospace" }}
            className="font-press-start text-emerald-600 dark:text-emerald-400 underline decoration-emerald-500/30 underline-offset-4"
          >
            domínio técnico real
          </span>
          .
        </h1>

        <p className="mt-6 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Estude programação, engenharia de software e gestão com um ecossistema completo:
          repetição espaçada inteligente, pomodoro com áudio binaural, diagnóstico de nível e tutor de IA com materiais abertos.
        </p>

        {/* Primary Action Callouts */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="hero-cta-diagnostic-btn"
            type="button"
            onClick={onGetStarted}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all cursor-pointer"
          >
            <BrainCircuit className="w-4 h-4" />
            Fazer Diagnóstico de Nível Gratuito
          </button>

          {user ? (
            <button
              id="hero-cta-return-btn"
              type="button"
              onClick={onReturnToPlatform}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-sm transition-all cursor-pointer"
            >
              Ir para o Meu Painel
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="hero-cta-login-btn"
              type="button"
              onClick={onLogin}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-sm transition-all cursor-pointer"
            >
              Entrar
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Highlight Metrics */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3">
            <div className="text-2xl font-bold text-zinc-950 dark:text-white font-mono">+300%</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Retenção de Conceitos</div>
          </div>
          <div className="p-3">
            <div className="text-2xl font-bold text-zinc-950 dark:text-white font-mono">40Hz</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Ondas Gamma para Foco</div>
          </div>
          <div className="p-3">
            <div className="text-2xl font-bold text-zinc-950 dark:text-white font-mono">1-Clique</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Geração de Flashcards com IA</div>
          </div>
          <div className="p-3">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">100%</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Gratuito para Estudantes</div>
          </div>
        </div>
      </section>

      {/* SECTION 1: FUNCIONALIDADES DA APLICAÇÃO */}
      <section id="funcionalidades" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 border-t border-zinc-200 dark:border-zinc-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Funcionalidades Integradas
          </span>
          <h2
            style={{ fontFamily: "'Press Start 2P', monospace" }}
            className="font-press-start text-lg sm:text-xl lg:text-2xl font-bold text-zinc-950 dark:text-white mt-4 leading-relaxed sm:leading-relaxed"
          >
            Tudo o que você precisa para aprender mais rápido e sem esquecer
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3">
            Uma suíte de ferramentas projetada cientificamente para apoiar a rotina do estudante moderno.
          </p>
        </div>

        {/* Feature Grid with Interactive Demos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1: Flashcards com SRS */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900/90 p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-all duration-200">
            <div>
              <h3 className="text-[21px] font-bold text-zinc-950 dark:text-white leading-snug">
                Flashcards com Repetição Espaçada
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2.5 mb-5 leading-relaxed">
                Revise na data calculada pelo algoritmo de retenção ativa antes de cair na curva do esquecimento.
              </p>
            </div>

            {/* Interactive Flashcard Preview */}
            <div
              id="demo-flashcard"
              role="button"
              tabIndex={0}
              onClick={() => setCardFlipped(!cardFlipped)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCardFlipped(!cardFlipped);
                }
              }}
              className="p-4 rounded-xl bg-zinc-100/70 dark:bg-zinc-950/80 text-center cursor-pointer transition-all hover:bg-zinc-100 dark:hover:bg-zinc-950 shadow-2xs"
            >
              <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 mb-2">
                <span>{cardFlipped ? 'Resposta' : 'Pergunta (Clique para virar)'}</span>
                <RotateCw className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="font-medium text-xs text-zinc-800 dark:text-zinc-200 min-h-[48px] flex items-center justify-center">
                {cardFlipped ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    O(1) no caso médio — acesso imediato pelo cálculo do índice hash.
                  </span>
                ) : (
                  <span>Qual a complexidade média de busca em uma Hash Table?</span>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
              <span>Deck: Estruturas de Dados</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Ativo</span>
            </div>
          </div>

          {/* Feature 2: Pomodoro & Audio Synthesis */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900/90 p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-all duration-200">
            <div>
              <h3 className="text-[21px] font-bold text-zinc-950 dark:text-white leading-snug">
                Pomodoro com Áudio Binaural
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2.5 mb-5 leading-relaxed">
                Temporizador de blocos de foco integrado a gerador de ruído branco, chuva e ondas 40Hz sintetizadas via Web Audio.
              </p>
            </div>

            {/* Interactive Pomodoro Preview */}
            <div className="p-4 rounded-xl bg-zinc-100/70 dark:bg-zinc-950/80 flex items-center justify-between shadow-2xs">
              <div>
                <div className="text-xl font-bold font-mono text-cyan-700 dark:text-cyan-300">
                  {pomodoroRunning ? '24:52' : '25:00'}
                </div>
                <div className="text-[10px] text-zinc-500">Frequência 40Hz Ativa</div>
              </div>
              <button
                type="button"
                onClick={() => setPomodoroRunning(!pomodoroRunning)}
                className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {pomodoroRunning ? 'Pausar' : 'Iniciar'}
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-cyan-500" /> Sons Ambientes
              </span>
              <span className="font-semibold text-cyan-600 dark:text-cyan-400">25m / 5m</span>
            </div>
          </div>

          {/* Feature 3: Tutor IA & Recomendações */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900/90 p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-all duration-200">
            <div>
              <h3 className="text-[21px] font-bold text-zinc-950 dark:text-white leading-snug">
                Tutor IA com Código & Cursos
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2.5 mb-5 leading-relaxed">
                Tire dúvidas de algoritmos, linguagens e bancos de dados com exemplos em código e indicação de aulas gratuitas do YouTube.
              </p>
            </div>

            {/* Interactive Search Box */}
            <div className="p-3.5 rounded-xl bg-zinc-100/70 dark:bg-zinc-950/80 shadow-2xs">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={demoSearch}
                  onChange={(e) => setDemoSearch(e.target.value)}
                  className="w-full bg-transparent text-xs text-zinc-800 dark:text-zinc-200 outline-none placeholder:text-zinc-400"
                  placeholder="Pesquisar conceito..."
                />
                <button
                  type="button"
                  onClick={handleDemoSearch}
                  className="p-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>
              {demoSearchResult && (
                <div className="mt-2 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/80 text-[11px] text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {demoSearchResult}
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
              <span>Harvard CS50 / YouTube</span>
              <span className="font-semibold text-teal-600 dark:text-teal-400">1-Clique Cards</span>
            </div>
          </div>

          {/* Feature 4: Caderno de Anotações Markdown */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900/90 p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-all duration-200">
            <div>
              <h3 className="text-[21px] font-bold text-zinc-950 dark:text-white leading-snug">
                Caderno Digital Markdown
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2.5 leading-relaxed">
                Crie resumos com suporte a tabelas, syntax highlight para linguagens de programação e exportação rápida em `.md`.
              </p>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-zinc-100/70 dark:bg-zinc-950/80 text-xs font-mono text-zinc-600 dark:text-zinc-400 shadow-2xs">
              <span className="text-emerald-600 dark:text-emerald-400"># SOLID:</span> SRP, OCP, LSP, ISP, DIP
            </div>
          </div>

          {/* Feature 5: Diagnóstico Acadêmico Personalizado */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900/90 p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-all duration-200">
            <div>
              <h3 className="text-[21px] font-bold text-zinc-950 dark:text-white leading-snug">
                Diagnóstico por Nível e Curso
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2.5 leading-relaxed">
                Questionário inteligente que avalia sua base teórica e calibra os materiais para Iniciante, Intermediário ou Avançado.
              </p>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-zinc-100/70 dark:bg-zinc-950/80 text-xs font-sans text-zinc-700 dark:text-zinc-300 flex items-center justify-between shadow-2xs">
              <span>Trilha Personalizada:</span>
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">ADS & Eng. Software</span>
            </div>
          </div>

          {/* Feature 6: Repositório de Cursos & Notícias */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900/90 p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-all duration-200">
            <div>
              <h3 className="text-[21px] font-bold text-zinc-950 dark:text-white leading-snug">
                Cursos Gratuitos & Notícias
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2.5 leading-relaxed">
                Feed com artigos técnicos curados de TabNews, Dev.to e diretório de cursos abertos com geração de cards em 1 clique.
              </p>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-zinc-100/70 dark:bg-zinc-950/80 text-xs font-sans text-zinc-700 dark:text-zinc-300 flex items-center justify-between shadow-2xs">
              <span>Fontes Verificadas:</span>
              <span className="font-semibold text-purple-600 dark:text-purple-400">Harvard, edX & YouTube</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PARA QUEM FOI FEITA */}
      <section id="publico-alvo" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/30">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Público-Alvo
          </span>
          <h2
            style={{ fontFamily: "'Press Start 2P', monospace" }}
            className="font-press-start text-lg sm:text-xl lg:text-2xl font-bold text-zinc-950 dark:text-white mt-4 leading-relaxed sm:leading-relaxed"
          >
            Desenvolvido sob medida para a sua jornada acadêmica e profissional
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3">
            Não importa se você está no primeiro semestre técnico ou se preparando para entrevistas em big techs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Profile 1 */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900/90 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-all duration-200">
            <h3 className="text-[19px] font-bold text-zinc-950 dark:text-white leading-snug">
              Cursos Técnicos & Tecnólogos
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2.5 leading-relaxed">
              Estudantes de <strong>ADS, Redes, Informática e Sistemas</strong> que precisam consolidar lógica de programação, banco de dados e arquitetura prática com rapidez.
            </p>
            <ul className="mt-5 space-y-2 text-[11px] text-zinc-700 dark:text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Fixação para provas e projetos</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Prática direta com código</span>
              </li>
            </ul>
          </div>

          {/* Profile 2 */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900/90 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-all duration-200">
            <h3 className="text-[19px] font-bold text-zinc-950 dark:text-white leading-snug">
              Graduação em TI & Engenharia
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2.5 leading-relaxed">
              Alunos de <strong>Ciência da Computação e Engenharia de Software</strong> que lidam com estruturas de dados pesadas, algoritmos complexos, sistemas operacionais e redes.
            </p>
            <ul className="mt-5 space-y-2 text-[11px] text-zinc-700 dark:text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                <span>Notação Big-O e grafos</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                <span>Teoria densa simplificada</span>
              </li>
            </ul>
          </div>

          {/* Profile 3 */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900/90 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-all duration-200">
            <h3 className="text-[19px] font-bold text-zinc-950 dark:text-white leading-snug">
              Autodidatas & Transição de Carreira
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2.5 leading-relaxed">
              Profissionais e entusiastas que estudam por conta própria e necessitam de uma estrutura clara para não se perder no excesso de informações da internet.
            </p>
            <ul className="mt-5 space-y-2 text-[11px] text-zinc-700 dark:text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                <span>Roteiro de estudos organizado</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                <span>Foco sem procrastinação</span>
              </li>
            </ul>
          </div>

          {/* Profile 4 */}
          <div className="rounded-2xl bg-white dark:bg-zinc-900/90 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-all duration-200">
            <h3 className="text-[19px] font-bold text-zinc-950 dark:text-white leading-snug">
              Administração & Negócios
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2.5 leading-relaxed">
              Estudantes de <strong>Gestão, Finanças e Administração</strong> que necessitam memorizar termos de governança, frameworks e estratégias corporativas.
            </p>
            <ul className="mt-5 space-y-2 text-[11px] text-zinc-700 dark:text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                <span>Conceitos de gestão e finanças</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                <span>Núcleo dedicado com preview</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 3: BENEFÍCIOS PARA QUEM UTILIZAR */}
      <section id="beneficios" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 border-t border-zinc-200 dark:border-zinc-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Benefícios Comprovados
          </span>
          <h2
            style={{ fontFamily: "'Press Start 2P', monospace" }}
            className="font-press-start text-lg sm:text-xl lg:text-2xl font-bold text-zinc-950 dark:text-white mt-4 leading-relaxed sm:leading-relaxed"
          >
            Por que estudantes que utilizam a ferramenta aprendem muito mais
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3">
            Combinamos psicologia cognitiva com inteligência artificial para eliminar a perda de tempo nos estudos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900/90 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-all duration-200">
            <h3 className="text-[19px] font-bold text-zinc-950 dark:text-white mb-2 leading-snug">
              Fim do Esquecimento Precoce
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              O sistema calcula automaticamente o dia ideal para revisar cada card. Você não estuda à toa e retém a matéria a longo prazo.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900/90 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-all duration-200">
            <h3 className="text-[19px] font-bold text-zinc-950 dark:text-white mb-2 leading-snug">
              Entrada Rápida em Estado de Flow
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              O áudio sintetizado em 40Hz e ruídos suaves acalmam o cérebro e isolam o barulho ao redor, acelerando o foco na leitura e na escrita de código.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900/90 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-all duration-200">
            <h3 className="text-[19px] font-bold text-zinc-950 dark:text-white mb-2 leading-snug">
              Zero Conteúdo Genérico
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Com o teste de entrada, sua trilha recomenda exatamente o que condiz com seu curso e nível, evitando frustração com aulas fáceis ou difíceis demais.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900/90 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-all duration-200">
            <h3 className="text-[19px] font-bold text-zinc-950 dark:text-white mb-2 leading-snug">
              Criação de Cards em Segundos
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Basta digitar o nome de qualquer assunto (ex: <i>"Recursão em Python"</i>) para a IA gerar perguntas e respostas perfeitas para você revisar.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900/90 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-all duration-200">
            <h3 className="text-[19px] font-bold text-zinc-950 dark:text-white mb-2 leading-snug">
              Visibilidade Clara da sua Evolução
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Acompanhe seu gráfico de minutos estudados, consistência de dias seguidos (streaks) e taxa de acerto por matéria.
            </p>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900/90 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.5)] transition-all duration-200">
            <h3 className="text-[19px] font-bold text-zinc-950 dark:text-white mb-2 leading-snug">
              Tudo em um Único Lugar
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Diga adeus a ter 15 abas abertas de cronômetro, anotações e vídeo aulas. A plataforma unifica todos os recursos de forma limpa.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL HIGH-CONVERSION CTA BOX */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent dark:from-emerald-950/40 dark:via-zinc-900/60 dark:to-zinc-950 p-8 sm:p-12 text-center shadow-xl">
          <h2
            style={{ fontFamily: "'Press Start 2P', monospace" }}
            className="font-press-start text-lg sm:text-xl lg:text-2xl font-bold text-zinc-950 dark:text-white leading-relaxed sm:leading-relaxed"
          >
            Pronto para elevar seu nível de aprendizado?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
            Comece agora mesmo com o teste diagnóstico gratuito e organize seus estudos de tecnologia em minutos.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="final-cta-diagnostic-btn"
              type="button"
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Fazer Teste Diagnóstico Grátis
            </button>
            {user ? (
              <button
                id="final-cta-return-btn"
                type="button"
                onClick={onReturnToPlatform}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-sm transition-all cursor-pointer"
              >
                Voltar à Plataforma
              </button>
            ) : (
              <button
                id="final-cta-login-btn"
                type="button"
                onClick={onLogin}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-sm transition-all cursor-pointer"
              >
                Entrar
              </button>
            )}
          </div>
        </div>
      </section>

      {/* MINIMALIST FOOTER (NO LOGO ICON, NO VERSION NUMBER) */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800/80 py-10 px-4 sm:px-6 max-w-7xl mx-auto text-center text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-bold text-zinc-800 dark:text-zinc-200">
            Estude <span className="text-emerald-600 dark:text-emerald-400">Aqui</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => scrollToSection('funcionalidades')}
              className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Funcionalidades
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('publico-alvo')}
              className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Para Quem É
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('beneficios')}
              className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Benefícios
            </button>
            {user ? (
              <button
                type="button"
                onClick={onReturnToPlatform}
                className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                Minha Conta
              </button>
            ) : (
              <button
                type="button"
                onClick={onLogin}
                className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                Entrar
              </button>
            )}
          </div>
          <div className="text-zinc-500">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};
