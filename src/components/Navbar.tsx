import React, { useState, useRef, useEffect } from 'react';
import {
  Sun,
  Moon,
  LogIn,
  LogOut,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { ActiveTab, User } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  user: User | null;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
  onLogout: () => void;
  onOpenLanding?: () => void;
}

interface NavPartition {
  id: 'aprender' | 'explorar' | 'progresso';
  label: string;
  description: string;
  items: {
    id: ActiveTab;
    label: string;
    description: string;
  }[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  darkMode,
  setDarkMode,
  onOpenAuth,
  onLogout,
  onOpenLanding,
}) => {
  // Navigation structure strictly organized into 3 partitions: Aprender, Explorar, Progresso
  const navPartitions: NavPartition[] = [
    {
      id: 'aprender',
      label: 'Aprender',
      description: 'Ferramentas de retenção, foco e anotações técnicas',
      items: [
        { id: 'dashboard', label: 'Início', description: 'Visão geral e ações prioritárias' },
        { id: 'flashcards', label: 'Flashcards', description: 'Repetição espaçada inteligente' },
        { id: 'pomodoro', label: 'Pomodoro', description: 'Ciclos de foco com som binaural 40Hz' },
        { id: 'notes', label: 'Anotações', description: 'Caderno de síntese técnica Markdown' },
      ],
    },
    {
      id: 'explorar',
      label: 'Explorar',
      description: 'Tutor de inteligência artificial, arquivos do Google Drive e acervo de documentações',
      items: [
        { id: 'chat', label: 'Tutor IA', description: 'Tire dúvidas e resolva exercícios com código' },
        { id: 'gdrive', label: 'Google Drive', description: 'Materiais didáticos, apostilas em PDF e slides da pasta' },
        { id: 'resources', label: 'Documentações & Links', description: 'MDN, RFCs, manuais oficiais e artigos' },
      ],
    },
    {
      id: 'progresso',
      label: 'Progresso',
      description: 'Métricas de retenção, histórico de foco e perfil do estudante',
      items: [
        { id: 'stats', label: 'Estatísticas', description: 'Tempo de foco, streak, domínio e perfil' },
      ],
    },
  ];

  // Open dropdown state for desktop
  const [openDropdown, setOpenDropdown] = useState<'aprender' | 'explorar' | 'progresso' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine which partition contains the current active tab
  const getActivePartition = () => {
    for (const partition of navPartitions) {
      if (partition.items.some((item) => item.id === activeTab)) {
        return partition.id;
      }
    }
    if (activeTab === 'profile') return 'progresso';
    return null;
  };

  const activePartitionId = getActivePartition();

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200 bg-white/95 dark:bg-zinc-900/95 border-zinc-200 dark:border-zinc-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Name */}
          <div className="flex items-center gap-3">
            <button
              id="brand-logo-btn"
              type="button"
              onClick={() => {
                setActiveTab('dashboard');
                setOpenDropdown(null);
                setMobileMenuOpen(false);
              }}
              className="flex items-center text-left cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none rounded-lg py-1 px-1.5"
            >
              <span className="font-bold text-xl tracking-tight text-zinc-950 dark:text-zinc-100 font-sans">
                Estude <span className="text-emerald-600 dark:text-emerald-400">Aqui</span>
              </span>
            </button>
          </div>

          {/* 3 Main Partitions with Vertical Submenus (Desktop) */}
          <nav ref={navContainerRef} className="hidden md:flex items-center gap-3">
            {navPartitions.map((partition) => {
              const isPartitionActive = activePartitionId === partition.id;
              const isOpen = openDropdown === partition.id;
              const activeItem = partition.items.find((it) => it.id === activeTab);

              return (
                <div key={partition.id} className="relative">
                  <button
                    id={`nav-partition-${partition.id}`}
                    type="button"
                    onClick={() => setOpenDropdown(isOpen ? null : partition.id)}
                    onMouseEnter={() => setOpenDropdown(partition.id)}
                    aria-expanded={isOpen}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none ${
                      isPartitionActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 shadow-2xs'
                        : isOpen
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 hover:text-zinc-950 dark:hover:text-white'
                    }`}
                  >
                    <span>{partition.label}</span>
                    {isPartitionActive && activeItem && (
                      <span className="text-[11px] font-normal text-emerald-600 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-900/60 px-1.5 py-0.2 rounded-md">
                        {activeItem.label}
                      </span>
                    )}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-emerald-600 dark:text-emerald-400' : 'text-zinc-400 dark:text-zinc-500'
                      }`}
                    />
                  </button>

                  {/* Vertical Menu Dropdown Card */}
                  {isOpen && (
                    <div
                      onMouseLeave={() => setOpenDropdown(null)}
                      className="absolute left-0 mt-1.5 w-72 rounded-2xl bg-white dark:bg-zinc-900 shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)] border border-zinc-200/80 dark:border-zinc-800 p-2 space-y-1 z-50 animate-fadeIn"
                    >
                      <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800/80 mb-1">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold">
                          {partition.label}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {partition.description}
                        </p>
                      </div>

                      {partition.items.map((item) => {
                        const isItemActive = activeTab === item.id;

                        return (
                          <button
                            key={item.id}
                            id={`nav-item-${item.id}`}
                            type="button"
                            onClick={() => {
                              setActiveTab(item.id);
                              setOpenDropdown(null);
                            }}
                            className={`w-full p-2.5 rounded-xl text-left transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none ${
                              isItemActive
                                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200'
                                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-bold ${isItemActive ? 'text-emerald-700 dark:text-emerald-300' : 'text-zinc-900 dark:text-zinc-100'}`}>
                                {item.label}
                              </span>
                              {isItemActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                              )}
                            </div>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                              {item.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Controls: Landing Link + Theme Toggle + Auth / Profile */}
          <div className="flex items-center gap-2">
            {onOpenLanding && (
              <button
                id="nav-landing-page-btn"
                type="button"
                onClick={onOpenLanding}
                className="hidden lg:inline-flex text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                title="Visualizar a página de apresentação do produto"
              >
                Página de Apresentação
              </button>
            )}

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              title={darkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
              aria-label="Alternar tema"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
            </button>

            {/* Auth / Profile Area */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  id="profile-view-btn"
                  type="button"
                  onClick={() => {
                    setActiveTab('stats');
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none ${
                    activeTab === 'stats' || activeTab === 'profile'
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                      : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                  title="Ver estatísticas e perfil"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-semibold leading-tight">{user.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{user.levelTitle}</p>
                  </div>
                </button>

                <button
                  id="nav-logout-btn"
                  type="button"
                  onClick={onLogout}
                  className="p-2 rounded-xl text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none"
                  title="Sair da conta"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  id="nav-login-btn"
                  type="button"
                  onClick={() => onOpenAuth('login')}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Entrar
                </button>
                <button
                  id="nav-register-btn"
                  type="button"
                  onClick={() => onOpenAuth('register')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-colors cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Criar Conta</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Menu principal"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Vertical Menu Modal / Accordion */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4 animate-fadeIn">
            {navPartitions.map((partition) => (
              <div key={partition.id} className="space-y-1.5">
                <div className="px-2 py-1 flex items-center justify-between text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-mono">
                  <span>{partition.label}</span>
                  <span className="text-[10px] normal-case font-sans text-zinc-500">
                    {partition.items.length} opções
                  </span>
                </div>

                <div className="space-y-1">
                  {partition.items.map((item) => {
                    const isItemActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`mobile-nav-item-${item.id}`}
                        type="button"
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer ${
                          isItemActive
                            ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                            : 'bg-zinc-50 dark:bg-zinc-800/60 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">{item.label}</span>
                          {isItemActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                          )}
                        </div>
                        <div className={`text-[10px] truncate mt-0.5 ${isItemActive ? 'text-emerald-100' : 'text-zinc-500 dark:text-zinc-400'}`}>
                          {item.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {onOpenLanding && (
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    onOpenLanding();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-xs font-semibold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:text-emerald-600"
                >
                  Ver Página de Apresentação
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};


