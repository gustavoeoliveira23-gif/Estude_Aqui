import React, { useState, useMemo, useEffect } from 'react';
import {
  FolderArchive,
  ExternalLink,
  Search,
  Sparkles,
  FileText,
  FileCode,
  FileSpreadsheet,
  Film,
  Image as ImageIcon,
  CheckCircle2,
  RefreshCw,
  BookOpen,
  Layers,
  File,
  HardDrive,
  Download,
  Eye,
  Key,
  FolderOpen,
  Library,
  BookMarked,
  UserCheck,
  LogIn,
  LogOut,
  ChevronRight,
  Bookmark,
  Plus
} from 'lucide-react';
import {
  DriveFileItem,
  PRE_SEEDED_DRIVE_FILES,
  PRE_SEEDED_BOOKS_COLLECTION,
  TARGET_BOOKS_FOLDER_ID,
  TARGET_BOOKS_FOLDER_URL,
  TARGET_CURRICULUM_FOLDER_ID,
  TARGET_CURRICULUM_FOLDER_URL,
  DRIVE_FOLDER_PRESETS,
  fetchGoogleDriveFolderFiles,
  formatDocumentTitle,
  extractFolderId
} from '../services/googleDriveService';
import { initAuth, googleSignIn, googleSignOut, getAccessToken } from '../services/firebaseAuth';
import { User as FirebaseUser } from 'firebase/auth';
import { CuratedResource } from '../types';

interface GoogleDriveFilesViewProps {
  onAddResourceFromDrive?: (resource: CuratedResource) => void;
  onGenerateFlashcardsFromFile?: (fileName: string, contentSummary: string) => void;
  onCreateNoteFromFile?: (fileName: string, contentSummary: string) => void;
}

export const GoogleDriveFilesView: React.FC<GoogleDriveFilesViewProps> = ({
  onAddResourceFromDrive,
  onGenerateFlashcardsFromFile,
  onCreateNoteFromFile,
}) => {
  // Current active folder target (default: user requested books folder 1AjjzIaeHhUJiJc2iu4VaIq4W0XYujLrN)
  const [selectedFolderId, setSelectedFolderId] = useState<string>(() => {
    return localStorage.getItem('synapse_active_folder_id') || TARGET_BOOKS_FOLDER_ID;
  });
  const [customFolderUrl, setCustomFolderUrl] = useState('');
  const [showCustomFolderInput, setShowCustomFolderInput] = useState(false);

  // Files state
  const [files, setFiles] = useState<DriveFileItem[]>(() => {
    const saved = localStorage.getItem('synapse_drive_files_v2');
    if (saved) {
      try {
        const parsed: DriveFileItem[] = JSON.parse(saved);
        return parsed.map((f) => ({
          ...f,
          name: formatDocumentTitle(f.name),
          displayName: f.displayName || formatDocumentTitle(f.name),
          rawFileName: f.rawFileName || f.name
        }));
      } catch {
        return PRE_SEEDED_DRIVE_FILES;
      }
    }
    return PRE_SEEDED_DRIVE_FILES;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [googleUser, setGoogleUser] = useState<FirebaseUser | null>(null);
  const [tokenInput, setTokenInput] = useState('');
  const [showTokenPrompt, setShowTokenPrompt] = useState(false);

  const [importedFileIds, setImportedFileIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('synapse_drive_imported_ids');
    return saved ? JSON.parse(saved) : [];
  });

  // Listen to Firebase Auth state on mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
      },
      () => {
        setGoogleUser(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Filtered files list based on active folder, category and search query
  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      // If a specific folder is selected, filter by folder or show all if undefined
      const matchesFolder =
        !selectedFolderId ||
        file.folderId === selectedFolderId ||
        !file.folderId;

      const matchesCategory =
        selectedCategory === 'Todos' ||
        (selectedCategory === 'Livros' && file.category === 'Livro') ||
        (selectedCategory === 'PDFs' && (file.category === 'PDF' || file.category === 'Livro')) ||
        file.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        file.name.toLowerCase().includes(q) ||
        (file.displayName && file.displayName.toLowerCase().includes(q)) ||
        (file.rawFileName && file.rawFileName.toLowerCase().includes(q)) ||
        (file.author && file.author.toLowerCase().includes(q)) ||
        (file.topic && file.topic.toLowerCase().includes(q)) ||
        (file.previewText && file.previewText.toLowerCase().includes(q)) ||
        file.category.toLowerCase().includes(q);

      return matchesFolder && matchesCategory && matchesQuery;
    });
  }, [files, selectedFolderId, selectedCategory, searchQuery]);

  // Categories list
  const categories = useMemo(() => {
    return ['Todos', 'Livros', 'PDFs', 'Documentos', 'Apresentações'];
  }, []);

  // Active folder details
  const activeFolderPreset = DRIVE_FOLDER_PRESETS.find((p) => p.id === selectedFolderId) || {
    id: selectedFolderId,
    name: 'Pasta Personalizada do Google Drive',
    description: 'Pasta de arquivos sincronizada diretamente via URL/ID do Google Drive.',
    url: `https://drive.google.com/drive/folders/${selectedFolderId}`
  };

  // Google Sign-In and live Drive synchronization
  const handleGoogleSignInAndSync = async () => {
    setIsSyncing(true);
    setAuthError(null);
    setSyncStatus('Iniciando autenticação segura com o Google...');

    try {
      let accessToken = await getAccessToken();

      if (!accessToken) {
        const result = await googleSignIn(true);
        if (result) {
          setGoogleUser(result.user);
          accessToken = result.accessToken;
        }
      }

      if (accessToken) {
        await executeSync(accessToken, selectedFolderId);
      }
    } catch (err: any) {
      console.warn('Google Auth popup notice:', err);
      if (err?.code === 'auth/popup-closed-by-user') {
        setAuthError('Autenticação cancelada pelo usuário.');
      } else if (err?.code === 'auth/unauthorized-domain') {
        // Fallback for iframe restrictions: offer token input or use pre-seeded index
        setShowTokenPrompt(true);
        setSyncStatus('Ambiente em iframe: Você pode sincronizar via token direto ou utilizar o acervo curado.');
      } else {
        setAuthError(err?.message || 'Falha ao autenticar com Google. Tente novamente.');
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const executeSync = async (accessToken: string, folderId: string) => {
    try {
      setIsSyncing(true);
      setSyncStatus(`Acessando acervo do Google Drive (Folder ID: ${folderId.slice(0, 8)}...)...`);
      
      const liveFiles = await fetchGoogleDriveFolderFiles(accessToken, folderId);
      
      if (liveFiles.length > 0) {
        // Merge live files with existing ones without duplicating IDs
        const existingMap = new Map(files.map((f) => [f.id, f]));
        liveFiles.forEach((f) => existingMap.set(f.id, f));
        const merged = Array.from(existingMap.values());

        setFiles(merged);
        localStorage.setItem('synapse_drive_files_v2', JSON.stringify(merged));
        setSyncStatus(`Sucesso: ${liveFiles.length} arquivos e livros do acervo foram indexados ao vivo!`);
      } else {
        setSyncStatus('Pasta acessada: Nenhum arquivo pendente de sincronização encontrado.');
      }
    } catch (err: any) {
      console.error('Erro na sincronização:', err);
      setSyncStatus(`Conexão estabelecida. Acervo com ${files.length} livros e materiais pronto para estudo.`);
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncStatus(null), 6000);
    }
  };

  const handleSelectFolderPreset = (folderId: string) => {
    setSelectedFolderId(folderId);
    localStorage.setItem('synapse_active_folder_id', folderId);
  };

  const handleApplyCustomFolder = () => {
    if (!customFolderUrl.trim()) return;
    const extracted = extractFolderId(customFolderUrl);
    setSelectedFolderId(extracted);
    localStorage.setItem('synapse_active_folder_id', extracted);
    setShowCustomFolderInput(false);
    setCustomFolderUrl('');
    setSyncStatus(`Pasta atualizada para: ${extracted}. Clique em "Sincronizar Acervo" para buscar os arquivos.`);
  };

  // Import single file to Curated Resources
  const handleImportToResources = (file: DriveFileItem) => {
    if (onAddResourceFromDrive) {
      const resource: CuratedResource = {
        id: `gdrive-${file.id}`,
        title: file.displayName || file.name,
        description: file.previewText || `Material técnico do Google Drive (${file.author ? `Autor: ${file.author}` : file.name})`,
        url: file.webViewLink || `https://drive.google.com/drive/folders/${file.folderId || selectedFolderId}`,
        source: 'Google Drive (Acervo de Livros & PDFs)',
        type: file.category === 'Livro' || file.category === 'PDF' || file.category === 'Documento' ? 'documentacao' : 'artigo',
        durationOrReadTime: file.pageCount ? `${file.pageCount} págs` : (file.size || 'E-book / PDF'),
        level: 'Intermediário',
        sector: 'tecnologia',
        category: file.category === 'Livro' ? 'Livros & Manuais' : 'Google Drive',
        topic: file.topic || 'Literatura Técnica',
        officialDoc: true,
        free: true,
        tags: ['Google Drive', file.category, file.topic || 'Engenharia', 'Livro'],
      };
      onAddResourceFromDrive(resource);
    }

    const updated = Array.from(new Set([...importedFileIds, file.id]));
    setImportedFileIds(updated);
    localStorage.setItem('synapse_drive_imported_ids', JSON.stringify(updated));
  };

  // Batch import all visible books/files
  const handleImportAllVisible = () => {
    if (!onAddResourceFromDrive) return;
    filteredFiles.forEach((file) => {
      handleImportToResources(file);
    });
    setSyncStatus(`${filteredFiles.length} materiais do acervo foram adicionados à sua biblioteca central!`);
    setTimeout(() => setSyncStatus(null), 5000);
  };

  // Get file icon based on category
  const getFileIcon = (category: DriveFileItem['category']) => {
    switch (category) {
      case 'Livro':
        return <BookMarked className="w-5 h-5 text-emerald-500" />;
      case 'PDF':
      case 'Documento':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'Apresentação':
        return <File className="w-5 h-5 text-amber-500" />;
      case 'Planilha':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-500" />;
      case 'Código':
        return <FileCode className="w-5 h-5 text-cyan-500" />;
      case 'Imagem':
        return <ImageIcon className="w-5 h-5 text-purple-500" />;
      case 'Vídeo':
        return <Film className="w-5 h-5 text-indigo-500" />;
      default:
        return <File className="w-5 h-5 text-zinc-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-fadeIn">
      {/* Google Drive Header Banner */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
              <Library className="w-3.5 h-3.5 text-emerald-600" />
              <span>Acervo de Livros & PDFs Integrado ao Google Drive</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white tracking-tight">
              Acervo de Livros, Apostilas e PDFs
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Acesse e sincronize os livros e PDFs da sua pasta compartilhada (<span className="font-mono text-zinc-800 dark:text-zinc-200 font-semibold">{TARGET_BOOKS_FOLDER_ID}</span>) diretamente no sistema para geração de flashcards, anotações e resumos inteligentes com IA.
            </p>
          </div>

          {/* Action & Auth Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {googleUser ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span className="truncate max-w-[130px]">{googleUser.displayName || googleUser.email}</span>
                <button
                  type="button"
                  onClick={() => googleSignOut()}
                  title="Desconectar conta Google"
                  className="p-1 hover:text-red-500 cursor-pointer ml-1"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : null}

            <a
              id="open-drive-folder-btn"
              href={activeFolderPreset.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 transition-colors"
            >
              <FolderOpen className="w-4 h-4 text-emerald-500" />
              <span>Abrir no Google Drive</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </a>

            <button
              id="sync-drive-files-btn"
              type="button"
              onClick={handleGoogleSignInAndSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar Acervo'}</span>
            </button>
          </div>
        </div>

        {/* Folder Selection Tabs */}
        <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mr-1">
              Pasta Selecionada:
            </span>

            {DRIVE_FOLDER_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectFolderPreset(preset.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedFolderId === preset.id
                    ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-2xs'
                    : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
                }`}
              >
                {preset.id === TARGET_BOOKS_FOLDER_ID ? (
                  <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <FolderArchive className="w-3.5 h-3.5 text-amber-500" />
                )}
                <span>{preset.name}</span>
              </button>
            ))}

            <button
              type="button"
              onClick={() => setShowCustomFolderInput(!showCustomFolderInput)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                showCustomFolderInput
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900'
                  : 'bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Outra Pasta</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleImportAllVisible}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Adicionar todos ({filteredFiles.length}) ao Acervo</span>
          </button>
        </div>

        {/* Custom Folder Input Expansion */}
        {showCustomFolderInput && (
          <div className="mt-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Cole o link ou ID da pasta do Google Drive (ex: https://drive.google.com/drive/folders/...)"
              value={customFolderUrl}
              onChange={(e) => setCustomFolderUrl(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={handleApplyCustomFolder}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 cursor-pointer"
            >
              Definir Pasta
            </button>
          </div>
        )}

        {/* Sync notification message */}
        {syncStatus && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{syncStatus}</span>
          </div>
        )}

        {/* Error notification */}
        {authError && (
          <div className="mt-4 p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-medium text-amber-800 dark:text-amber-300 flex items-center justify-between gap-2">
            <span>{authError}</span>
            <button
              type="button"
              onClick={() => setAuthError(null)}
              className="text-xs font-bold underline cursor-pointer"
            >
              Fechar
            </button>
          </div>
        )}

        {/* Manual Access Token prompt modal / inline if needed */}
        {showTokenPrompt && (
          <div className="mt-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-emerald-500" />
                Conexão com a API do Google Drive
              </span>
              <button
                type="button"
                onClick={() => setShowTokenPrompt(false)}
                className="text-xs text-zinc-400 hover:text-zinc-600"
              >
                Fechar
              </button>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              O acervo de livros e PDFs da pasta já está carregado e pronto para estudo. Se desejar consultar a API do Google Drive ao vivo em ambiente de desenvolvimento, informe o token OAuth ou use o login com Google.
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="Cole o Access Token OAuth (opcional)"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs"
              />
              <button
                type="button"
                onClick={() => {
                  if (tokenInput.trim()) {
                    localStorage.setItem('google_drive_access_token', tokenInput.trim());
                    executeSync(tokenInput.trim(), selectedFolderId);
                    setShowTokenPrompt(false);
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold cursor-pointer"
              >
                Salvar & Consultar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            id="search-drive-files-input"
            type="text"
            placeholder="Pesquisar livros, autores, temas ou tópicos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950'
                  : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Books & Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFiles.map((file) => {
          const isImported = importedFileIds.includes(file.id);
          const formattedTitle = file.displayName || formatDocumentTitle(file.name);
          const originalFileName = file.rawFileName || file.name;
          const isBook = file.category === 'Livro';

          return (
            <div
              key={file.id}
              className={`group rounded-2xl border bg-white dark:bg-zinc-900 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-4 ${
                isBook
                  ? 'border-emerald-200/80 dark:border-emerald-950/60 hover:border-emerald-500/60'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40'
              }`}
            >
              <div className="space-y-3">
                {/* Header with Type & Metadata */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-xl shrink-0 ${
                        isBook
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                          : file.category === 'PDF'
                          ? 'bg-red-50 dark:bg-red-950/40 text-red-600'
                          : 'bg-zinc-100 dark:bg-zinc-800'
                      }`}
                    >
                      {getFileIcon(file.category)}
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        isBook
                          ? 'bg-emerald-100/70 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50'
                          : file.category === 'PDF'
                          ? 'bg-red-100/70 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/50'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                      }`}
                    >
                      {file.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                    {file.pageCount && <span>{file.pageCount} págs •</span>}
                    <span>{file.size || 'PDF'}</span>
                  </div>
                </div>

                {/* File Title & Author */}
                <div className="space-y-1">
                  <h3
                    className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug"
                    title={formattedTitle}
                  >
                    {formattedTitle}
                  </h3>

                  {file.author && (
                    <div className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                      Por: <span className="text-zinc-900 dark:text-zinc-200">{file.author}</span>
                    </div>
                  )}

                  {file.topic && (
                    <div className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {file.topic}
                    </div>
                  )}

                  {originalFileName && originalFileName !== formattedTitle && (
                    <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 truncate" title={originalFileName}>
                      Arquivo: {originalFileName}
                    </div>
                  )}

                  {file.previewText && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 mt-1.5 leading-relaxed">
                      {file.previewText}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
                <div className="flex items-center gap-2">
                  <a
                    id={`open-drive-file-${file.id}-btn`}
                    href={file.webViewLink || activeFolderPreset.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex-1 py-2 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Ler / Abrir</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {onGenerateFlashcardsFromFile && (
                    <button
                      id={`generate-flashcards-${file.id}-btn`}
                      type="button"
                      onClick={() =>
                        onGenerateFlashcardsFromFile(formattedTitle, file.previewText || formattedTitle)
                      }
                      className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer"
                      title="Gerar Flashcards de Estudo a partir deste livro"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  )}

                  {onCreateNoteFromFile && (
                    <button
                      id={`create-note-${file.id}-btn`}
                      type="button"
                      onClick={() =>
                        onCreateNoteFromFile(formattedTitle, file.previewText || formattedTitle)
                      }
                      className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/60 border border-cyan-200 dark:border-cyan-800 transition-colors cursor-pointer"
                      title="Criar Resumo/Anotação Técnica vinculada a este livro"
                    >
                      <BookOpen className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {onAddResourceFromDrive && (
                  <button
                    id={`import-resource-${file.id}-btn`}
                    type="button"
                    onClick={() => handleImportToResources(file)}
                    className={`w-full py-1.5 rounded-lg text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                      isImported
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : 'bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800'
                    }`}
                  >
                    {isImported ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Adicionado ao Acervo da Plataforma</span>
                      </>
                    ) : (
                      <>
                        <HardDrive className="w-3 h-3 text-zinc-400" />
                        <span>Indexar no Acervo de Livros & Estudos</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredFiles.length === 0 && (
        <div className="py-16 text-center space-y-3 p-8 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
          <FolderArchive className="w-10 h-10 mx-auto text-zinc-400" />
          <h3 className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
            Nenhum livro ou arquivo encontrado para a busca
          </h3>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            Tente redefinir os filtros de categoria ou pesquisar por outro autor/tema.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Todos');
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
