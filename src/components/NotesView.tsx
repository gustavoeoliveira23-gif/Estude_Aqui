import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Trash2,
  Edit3,
  Eye,
  Save,
  Download,
  Copy,
  Check,
  Sparkles,
  Tag,
  Search,
  FileText,
  Code
} from 'lucide-react';
import { SectorType, StudyNote } from '../types';

interface NotesViewProps {
  notes: StudyNote[];
  currentSector: SectorType;
  onSaveNote: (note: StudyNote) => void;
  onDeleteNote: (id: string) => void;
  onGenerateFlashcardsFromNote: (topic: string, text: string) => void;
}

export const NotesView: React.FC<NotesViewProps> = ({
  notes,
  currentSector,
  onSaveNote,
  onDeleteNote,
  onGenerateFlashcardsFromNote,
}) => {
  const sectorNotes = notes.filter((n) => n.sector === currentSector);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(sectorNotes[0]?.id || null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Active note in editor
  const activeNote = sectorNotes.find((n) => n.id === selectedNoteId);

  // Editable local state
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editTags, setEditTags] = useState('');

  // Synchronize editor when selected note changes
  React.useEffect(() => {
    if (activeNote) {
      setEditTitle(activeNote.title);
      setEditContent(activeNote.content);
      setEditCategory(activeNote.category);
      setEditTags(activeNote.tags.join(', '));
    }
  }, [selectedNoteId, activeNote]);

  const handleCreateNewNote = () => {
    const newNote: StudyNote = {
      id: 'note-' + Date.now(),
      title: 'Nova Anotação de Estudo',
      content:
        '# Título do Assunto\n\n## Pontos Importantes\n- Anote aqui os conceitos chave explicados em aula ou no tutor IA.\n\n```typescript\n// Exemplo de código ou lógica\nfunction exemplo() {\n  return "Anotação rápida";\n}\n```\n',
      category: 'Geral',
      sector: currentSector,
      tags: ['estudos', 'resumo'],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    onSaveNote(newNote);
    setSelectedNoteId(newNote.id);
    setIsEditing(true);
  };

  const handleSaveCurrent = () => {
    if (!activeNote) return;
    const updated: StudyNote = {
      ...activeNote,
      title: editTitle.trim() || 'Sem Título',
      content: editContent,
      category: editCategory.trim() || 'Geral',
      tags: editTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      updatedAt: new Date().toISOString().split('T')[0],
    };
    onSaveNote(updated);
    setIsEditing(false);
  };

  const handleCopyMarkdown = () => {
    if (!activeNote) return;
    navigator.clipboard.writeText(activeNote.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!activeNote) return;
    const blob = new Blob([activeNote.content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeNote.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredNotes = sectorNotes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 sm:space-y-14 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
              Caderno de Anotações & Resumos
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Organize pontos-chave, trechos de código e transforme suas notas em flashcards automáticos.
          </p>
        </div>

        <button
          id="new-note-btn"
          type="button"
          onClick={handleCreateNewNote}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Nova Anotação</span>
        </button>
      </div>

      {/* Main Split Layout: Notes List (Left) + Note Editor/Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        {/* Left Column: Search & Notes List (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-4 space-y-3 flex flex-col">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            <input
              id="search-notes-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar anotações..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 font-mono px-1">
            <span>{filteredNotes.length} anotações salvas</span>
          </div>

          {/* Notes list */}
          <div className="space-y-2 overflow-y-auto max-h-[500px] flex-1 pr-1 scrollbar-thin">
            {filteredNotes.map((n) => {
              const isSelected = n.id === selectedNoteId;
              return (
                <button
                  key={n.id}
                  id={`select-note-${n.id}-btn`}
                  type="button"
                  onClick={() => {
                    setSelectedNoteId(n.id);
                    setIsEditing(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-zinc-900 dark:text-white shadow-2xs'
                      : 'border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {n.category}
                    </span>
                    <span>{n.updatedAt}</span>
                  </div>
                  <h4 className="text-xs font-bold line-clamp-1">{n.title}</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                    {n.content.replace(/[#*`_]/g, '')}
                  </p>
                </button>
              );
            })}

            {filteredNotes.length === 0 && (
              <div className="text-center py-10 text-xs text-zinc-400">
                Nenhuma anotação encontrada.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Note Editor / Reader (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col justify-between space-y-4">
          {activeNote ? (
            <>
              {/* Note Header & Action Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/40">
                    {isEditing ? editCategory : activeNote.category}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">
                    Atualizado em {activeNote.updatedAt}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Generate Flashcards from Note */}
                  <button
                    id="note-generate-cards-btn"
                    type="button"
                    onClick={() =>
                      onGenerateFlashcardsFromNote(
                        activeNote.title,
                        activeNote.content.slice(0, 1000)
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition-colors"
                    title="Criar deck de flashcards a partir desta anotação"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Gerar Flashcards</span>
                  </button>

                  <button
                    id="note-toggle-edit-btn"
                    type="button"
                    onClick={() => {
                      if (isEditing) {
                        handleSaveCurrent();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors"
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Salvar</span>
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Editar</span>
                      </>
                    )}
                  </button>

                  <button
                    id="note-copy-btn"
                    type="button"
                    onClick={handleCopyMarkdown}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    title="Copiar texto"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>

                  <button
                    id="note-download-btn"
                    type="button"
                    onClick={handleDownloadTxt}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    title="Baixar arquivo Markdown"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    id="note-delete-btn"
                    type="button"
                    onClick={() => {
                      if (confirm('Deseja excluir esta anotação?')) {
                        onDeleteNote(activeNote.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                    title="Excluir anotação"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Note Content (Editing vs Viewing) */}
              {isEditing ? (
                <div className="space-y-3 flex-1 flex flex-col">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                        Título
                      </label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                        Categoria
                      </label>
                      <input
                        type="text"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">
                      Conteúdo (Markdown e Código)
                    </label>
                    <textarea
                      rows={14}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full flex-1 p-3 text-xs font-mono rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white leading-relaxed"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      id="note-save-bottom-btn"
                      type="button"
                      onClick={handleSaveCurrent}
                      className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm"
                    >
                      Salvar Alterações
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto space-y-4">
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                    {activeNote.title}
                  </h2>

                  <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap font-sans">
                    {activeNote.content}
                  </div>

                  {activeNote.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                      <Tag className="w-3.5 h-3.5 text-zinc-400" />
                      {activeNote.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center text-xs text-zinc-400">
              Selecione uma anotação na lista ou clique em "Criar Nova Anotação".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
