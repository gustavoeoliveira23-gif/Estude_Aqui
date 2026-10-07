import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquareCode,
  Send,
  Sparkles,
  Bot,
  User as UserIcon,
  ExternalLink,
  BookOpen,
  Layers,
  Check,
  Search,
  Compass,
  Lightbulb,
  Youtube
} from 'lucide-react';
import { ChatMessage, SectorType, User } from '../types';

interface AIChatViewProps {
  messages: ChatMessage[];
  user: User | null;
  currentSector: SectorType;
  onSendMessage: (text: string) => Promise<void>;
  onSaveAsNote: (title: string, content: string) => void;
  onGenerateFlashcards: (topic: string) => void;
}

export const AIChatView: React.FC<AIChatViewProps> = ({
  messages,
  user,
  currentSector,
  onSendMessage,
  onSaveAsNote,
  onGenerateFlashcards,
}) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [savedNoteIdx, setSavedNoteIdx] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const studentLevel = user?.profile?.level || 'Iniciante';
  const studentCourse = user?.profile?.courseName || 'Tecnologia da Informação';

  const quickPrompts = [
    'Explique Notação Big-O e Complexidade de Algoritmos',
    'O que é o Event Loop e Microtasks no JavaScript?',
    'Como funciona a 3ª Forma Normal em Banco de Dados SQL?',
    'Qual a diferença entre REST, GraphQL e gRPC?',
    'Explique o Princípio da Responsabilidade Única (SRP) no SOLID',
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isTyping) return;

    setInputText('');
    setIsTyping(true);
    try {
      await onSendMessage(text);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSaveToNotes = (msg: ChatMessage, idx: number) => {
    const topic = msg.text.slice(0, 40).replace(/[^a-zA-Z0-9\s]/g, '') || 'Resumo Tutor IA';
    onSaveAsNote(`Resumo IA: ${topic}`, msg.text);
    setSavedNoteIdx(idx);
    setTimeout(() => setSavedNoteIdx(null), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-sm shadow-emerald-500/20">
              <MessageSquareCode className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
              Tutor IA & Pesquisa de Conteúdos
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Pesquise qualquer dúvida ou conceito técnico. A IA explica com exemplos didáticos e recomenda cursos, vídeos do YouTube e documentações.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
          <Compass className="w-3.5 h-3.5 text-emerald-500" />
          <span>
            {studentCourse} ({studentLevel})
          </span>
        </div>
      </div>

      {/* Main Chat Box Container */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col h-[650px] overflow-hidden">
        {/* Messages Stream Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin">
          {messages.map((msg, idx) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3.5 max-w-3xl ${isUser ? 'ml-auto justify-end' : 'mr-auto'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-none space-y-3'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

                  {/* Recommendations Cards (Videos & Articles) */}
                  {msg.recommendations && msg.recommendations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Youtube className="w-3.5 h-3.5 text-red-500" /> Cursos e Links Recomendados:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.recommendations.map((rec, rIdx) => (
                          <a
                            key={rIdx}
                            href={rec.url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-emerald-500 transition-colors flex items-center justify-between text-xs"
                          >
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                              {rec.title}
                            </span>
                            <ExternalLink className="w-3 h-3 text-emerald-500 shrink-0 ml-1" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 1-Click Quick Actions for Assistant Responses */}
                  {!isUser && (
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[11px]">
                      <button
                        id={`chat-save-note-${idx}-btn`}
                        type="button"
                        onClick={() => handleSaveToNotes(msg, idx)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium transition-colors"
                      >
                        {savedNoteIdx === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span>Salvo nas Anotações!</span>
                          </>
                        ) : (
                          <>
                            <BookOpen className="w-3 h-3 text-indigo-500" />
                            <span>Salvar como Anotação</span>
                          </>
                        )}
                      </button>

                      <button
                        id={`chat-gen-cards-${idx}-btn`}
                        type="button"
                        onClick={() =>
                          onGenerateFlashcards(
                            msg.text.slice(0, 30).replace(/[^a-zA-Z0-9\s]/g, '') || 'Assunto do Chat'
                          )
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold transition-colors"
                      >
                        <Layers className="w-3 h-3" />
                        <span>Gerar Flashcards deste Tema</span>
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-3 mr-auto">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl rounded-tl-none bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-emerald-500" />
                <span>Consultando repositórios e estruturando recomendações didáticas...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="p-2.5 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-500" /> Sugestões:
          </span>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(p)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-emerald-500 hover:text-emerald-600 whitespace-nowrap transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              id="ai-chat-input"
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite o assunto que quer estudar (ex: ponteiros em C, Event Loop, SQL JOINs)..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <button
              id="ai-chat-send-btn"
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-500/20 disabled:opacity-40 transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Pesquisar</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
