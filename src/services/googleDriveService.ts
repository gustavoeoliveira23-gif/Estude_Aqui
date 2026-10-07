// Google Drive Client-Side Service using Firebase Auth & Google Drive API v3
// User Target Books Folder: 1AjjzIaeHhUJiJc2iu4VaIq4W0XYujLrN
// Curriculum Folder: 1eZCVcNkHtDZZK9knShFn5MxPSOVTtfrY

export interface DriveFileItem {
  id: string;
  name: string;
  displayName?: string;
  rawFileName?: string;
  author?: string;
  topic?: string;
  pageCount?: number;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webViewLink?: string;
  webContentLink?: string;
  thumbnailLink?: string;
  iconLink?: string;
  category: 'Livro' | 'PDF' | 'Documento' | 'Apresentação' | 'Planilha' | 'Imagem' | 'Áudio' | 'Vídeo' | 'Código' | 'Outro';
  previewText?: string;
  folderId?: string;
}

export interface DriveFolderPreset {
  id: string;
  name: string;
  description: string;
  url: string;
  isDefault?: boolean;
}

export const TARGET_BOOKS_FOLDER_ID = '1AjjzIaeHhUJiJc2iu4VaIq4W0XYujLrN';
export const TARGET_BOOKS_FOLDER_URL = `https://drive.google.com/drive/folders/${TARGET_BOOKS_FOLDER_ID}`;

export const TARGET_CURRICULUM_FOLDER_ID = '1eZCVcNkHtDZZK9knShFn5MxPSOVTtfrY';
export const TARGET_CURRICULUM_FOLDER_URL = `https://drive.google.com/drive/folders/${TARGET_CURRICULUM_FOLDER_ID}`;

export const DRIVE_FOLDER_PRESETS: DriveFolderPreset[] = [
  {
    id: TARGET_BOOKS_FOLDER_ID,
    name: 'Acervo de Livros e Referências (PDFs)',
    description: 'Pasta de livros clássicos, apostilas e manuais de Engenharia de Software e Ciência da Computação.',
    url: TARGET_BOOKS_FOLDER_URL,
    isDefault: true
  },
  {
    id: TARGET_CURRICULUM_FOLDER_ID,
    name: 'Materiais Didáticos e Slides da Disciplina',
    description: 'Apostilas, resumos e cadernos de exercícios práticos da grade curricular.',
    url: TARGET_CURRICULUM_FOLDER_URL
  }
];

// Helper to format raw filenames into beautiful, readable user titles
export function formatDocumentTitle(fileName: string): string {
  if (!fileName) return 'Documento sem título';

  const lower = fileName.toLowerCase().trim();

  // Known books and curriculum files formatting
  if (lower.includes('clean_code') || lower.includes('codigo_limpo') || lower.includes('clean code')) {
    return 'Código Limpo: Habilidades Práticas do Agile Software (Robert C. Martin)';
  }
  if (lower.includes('cormen') || lower.includes('introduction_to_algorithms') || lower.includes('algoritmos_teoria')) {
    return 'Algoritmos: Teoria e Prática (Thomas H. Cormen et al.)';
  }
  if (lower.includes('designing_data_intensive') || lower.includes('data_intensive') || lower.includes('kleppmann')) {
    return 'Designing Data-Intensive Applications (Martin Kleppmann)';
  }
  if (lower.includes('refactoring') || lower.includes('refatoracao') || lower.includes('martin_fowler')) {
    return 'Refatoração: Aperfeiçoando o Design de Código Existente (Martin Fowler)';
  }
  if (lower.includes('design_patterns') || lower.includes('padroes_de_projeto') || lower.includes('gof') || lower.includes('gang_of_four')) {
    return 'Padrões de Projeto: Soluções Reutilizáveis de Software Orientado a Objetos (GoF)';
  }
  if (lower.includes('tanenbaum') && (lower.includes('redes') || lower.includes('network'))) {
    return 'Redes de Computadores (Andrew S. Tanenbaum & David J. Wetherall)';
  }
  if (lower.includes('tanenbaum') && (lower.includes('operacionais') || lower.includes('operating_systems'))) {
    return 'Sistemas Operacionais Modernos (Andrew S. Tanenbaum)';
  }
  if (lower.includes('domain_driven_design') || lower.includes('ddd') && lower.includes('evans')) {
    return 'Domain-Driven Design: Atacando as Complexidades no Coração do Software (Eric Evans)';
  }
  if (lower.includes('kurose') || (lower.includes('redes') && lower.includes('ross'))) {
    return 'Redes de Computadores e a Internet: Uma Abordagem Top-Down (Kurose & Ross)';
  }
  if (lower.includes('silberschatz') || (lower.includes('banco') && lower.includes('korth'))) {
    return 'Sistema de Banco de Dados (Silberschatz, Korth & Sudarshan)';
  }
  if (lower.includes('estruturas_de_dados') || (lower.includes('estrutura') && lower.includes('algoritmo'))) {
    return 'Guia Completo: Estruturas de Dados e Algoritmos';
  }
  if (lower.includes('arquitetura_de_software') || lower.includes('microsservico')) {
    return 'Apostila Avançada: Arquitetura de Software e Microsserviços';
  }
  if (lower.includes('banco_de_dados') || lower.includes('relacionais_sql')) {
    return 'Manual Prático: Banco de Dados Relacionais, Modelagem e SQL';
  }
  if (lower.includes('redes_de_computadores') || lower.includes('http_rest')) {
    return 'Apresentação: Redes de Computadores e Protocolo HTTP/REST';
  }
  if (lower.includes('engenharia_de_software') || lower.includes('metodologias_ageis') || lower.includes('metodologias_ágeis')) {
    return 'Resumo Executivo: Engenharia de Software e Metodologias Ágeis';
  }
  if (lower.includes('exercicios_praticos') || lower.includes('codificacao_e_logica') || lower.includes('lista_exercicios')) {
    return 'Caderno de Exercícios: 25 Desafios de Lógica e Algoritmos';
  }

  // Generic algorithm to clean any uploaded or synced file name
  let clean = fileName.replace(/\.[a-zA-Z0-9]{2,5}$/, '');
  clean = clean.replace(/^(cap[íi]tulo[_\s-]*)?\d+[\s._-]+/i, '');
  clean = clean.replace(/[_\-]+/g, ' ').replace(/\s+/g, ' ').trim();

  const acronyms: Record<string, string> = {
    sql: 'SQL',
    http: 'HTTP',
    https: 'HTTPS',
    rest: 'REST',
    solid: 'SOLID',
    api: 'API',
    apis: 'APIs',
    pdf: 'PDF',
    osi: 'OSI',
    tcp: 'TCP',
    ip: 'IP',
    acid: 'ACID',
    ci: 'CI',
    cd: 'CD',
    tdd: 'TDD',
    bdd: 'BDD',
    ia: 'IA',
    ai: 'AI',
    bst: 'BST',
    crud: 'CRUD',
    json: 'JSON',
    html: 'HTML',
    css: 'CSS',
    js: 'JS',
    ts: 'TS',
    db: 'DB',
    gof: 'GoF',
    ddd: 'DDD'
  };

  const lowerWords = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com', 'sem', 'um', 'uma', 'uns', 'umas', 'a', 'o', 'as', 'os']);

  const words = clean.split(' ').filter(Boolean);
  const formattedWords = words.map((w, idx) => {
    const wLower = w.toLowerCase();
    if (acronyms[wLower]) {
      return acronyms[wLower];
    }
    if (idx > 0 && lowerWords.has(wLower)) {
      return wLower;
    }
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  });

  return formattedWords.join(' ') || fileName;
}

// Helper to categorize MIME types & determine if it's a Book
export function getCategoryFromMimeType(mimeType: string, fileName: string): DriveFileItem['category'] {
  const name = fileName.toLowerCase();
  if (name.includes('livro') || name.includes('book') || name.includes('tanenbaum') || name.includes('cormen') || name.includes('fowler') || name.includes('martin') || name.includes('kleppmann') || name.includes('silberschatz')) {
    return 'Livro';
  }
  if (mimeType.includes('pdf') || name.endsWith('.pdf')) return 'PDF';
  if (mimeType.includes('document') || mimeType.includes('word') || name.endsWith('.docx') || name.endsWith('.doc') || name.endsWith('.txt') || name.endsWith('.md')) return 'Documento';
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint') || name.endsWith('.pptx') || name.endsWith('.ppt')) return 'Apresentação';
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel') || name.endsWith('.xlsx') || name.endsWith('.xls') || name.endsWith('.csv')) return 'Planilha';
  if (mimeType.startsWith('image/')) return 'Imagem';
  if (mimeType.startsWith('audio/')) return 'Áudio';
  if (mimeType.startsWith('video/')) return 'Vídeo';
  if (name.endsWith('.js') || name.endsWith('.ts') || name.endsWith('.py') || name.endsWith('.java') || name.endsWith('.html') || name.endsWith('.css') || name.endsWith('.json') || name.endsWith('.sql')) return 'Código';
  return 'Outro';
}

// Format human bytes
export function formatBytes(bytes?: number | string): string {
  if (!bytes) return 'N/A';
  const num = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
  if (isNaN(num) || num <= 0) return 'N/A';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(num) / Math.log(1024));
  return `${(num / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

// Pre-seeded curated books collection for folder 1AjjzIaeHhUJiJc2iu4VaIq4W0XYujLrN
export const PRE_SEEDED_BOOKS_COLLECTION: DriveFileItem[] = [
  {
    id: 'gdrive-book-1',
    name: 'Código Limpo: Habilidades Práticas do Agile Software',
    displayName: 'Código Limpo: Habilidades Práticas do Agile Software',
    rawFileName: 'Clean_Code_Robert_C_Martin.pdf',
    author: 'Robert C. Martin (Uncle Bob)',
    topic: 'Engenharia de Software & Boas Práticas',
    pageCount: 464,
    mimeType: 'application/pdf',
    size: '14.8 MB',
    modifiedTime: '2026-08-22T15:10:00.000Z',
    webViewLink: `https://drive.google.com/drive/folders/${TARGET_BOOKS_FOLDER_ID}`,
    category: 'Livro',
    folderId: TARGET_BOOKS_FOLDER_ID,
    previewText: 'Referência fundamental sobre legibilidade de código, nomes significativos, funções pequenas com responsabilidade única, tratamento elegante de erros e refatoração contínua.'
  },
  {
    id: 'gdrive-book-2',
    name: 'Algoritmos: Teoria e Prática (3ª Edição)',
    displayName: 'Algoritmos: Teoria e Prática (3ª Edição)',
    rawFileName: 'Introduction_to_Algorithms_Cormen_CLRS.pdf',
    author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
    topic: 'Algoritmos & Complexidade',
    pageCount: 1312,
    mimeType: 'application/pdf',
    size: '28.4 MB',
    modifiedTime: '2026-08-20T11:00:00.000Z',
    webViewLink: `https://drive.google.com/drive/folders/${TARGET_BOOKS_FOLDER_ID}`,
    category: 'Livro',
    folderId: TARGET_BOOKS_FOLDER_ID,
    previewText: 'A bíblia mundial de algoritmos (CLRS). Cobre análise assintótica, programação dinâmica, algoritmos gulosos, grafos (Dijkstra, Bellman-Ford, Kruskal), árvores rubro-negras e complexidade NP-Completa.'
  },
  {
    id: 'gdrive-book-3',
    name: 'Designing Data-Intensive Applications',
    displayName: 'Designing Data-Intensive Applications',
    rawFileName: 'Designing_Data_Intensive_Applications_Martin_Kleppmann.pdf',
    author: 'Martin Kleppmann',
    topic: 'Sistemas Distribuídos & Bancos de Dados',
    pageCount: 616,
    mimeType: 'application/pdf',
    size: '18.2 MB',
    modifiedTime: '2026-08-19T09:40:00.000Z',
    webViewLink: `https://drive.google.com/drive/folders/${TARGET_BOOKS_FOLDER_ID}`,
    category: 'Livro',
    folderId: TARGET_BOOKS_FOLDER_ID,
    previewText: 'Guia definitivo para construir aplicações confiáveis, escaláveis e de fácil manutenção. Aborda replicação, particionamento, consenso distribuído, transações e processamento de streams.'
  },
  {
    id: 'gdrive-book-4',
    name: 'Padrões de Projeto: Soluções Reutilizáveis de Software Orientado a Objetos',
    displayName: 'Padrões de Projeto: Soluções Reutilizáveis de Software Orientado a Objetos',
    rawFileName: 'Design_Patterns_Elements_of_Reusable_Object_Oriented_Software_GoF.pdf',
    author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides (Gang of Four)',
    topic: 'Arquitetura & Design Patterns',
    pageCount: 395,
    mimeType: 'application/pdf',
    size: '9.6 MB',
    modifiedTime: '2026-08-17T14:20:00.000Z',
    webViewLink: `https://drive.google.com/drive/folders/${TARGET_BOOKS_FOLDER_ID}`,
    category: 'Livro',
    folderId: TARGET_BOOKS_FOLDER_ID,
    previewText: 'O clássico original do GoF que catalogou os 23 padrões essenciais de criação, estrutura e comportamento (Singleton, Factory, Observer, Strategy, Decorator, Adapter, etc).'
  },
  {
    id: 'gdrive-book-5',
    name: 'Redes de Computadores (5ª Edição)',
    displayName: 'Redes de Computadores (5ª Edição)',
    rawFileName: 'Computer_Networks_Tanenbaum_Wetherall.pdf',
    author: 'Andrew S. Tanenbaum & David J. Wetherall',
    topic: 'Redes & Protocolos',
    pageCount: 960,
    mimeType: 'application/pdf',
    size: '22.1 MB',
    modifiedTime: '2026-08-15T16:30:00.000Z',
    webViewLink: `https://drive.google.com/drive/folders/${TARGET_BOOKS_FOLDER_ID}`,
    category: 'Livro',
    folderId: TARGET_BOOKS_FOLDER_ID,
    previewText: 'Tratado clássico sobre a arquitetura de camadas de rede, protocolo TCP/IP, roteamento, controle de congestionamento, protocolos de aplicação HTTP/DNS e criptografia de chave pública.'
  },
  {
    id: 'gdrive-book-6',
    name: 'Sistema de Banco de Dados (6ª Edição)',
    displayName: 'Sistema de Banco de Dados (6ª Edição)',
    rawFileName: 'Database_System_Concepts_Silberschatz_Korth.pdf',
    author: 'Abraham Silberschatz, Henry F. Korth, S. Sudarshan',
    topic: 'Bancos de Dados & Armazenamento',
    pageCount: 1376,
    mimeType: 'application/pdf',
    size: '31.5 MB',
    modifiedTime: '2026-08-14T10:15:00.000Z',
    webViewLink: `https://drive.google.com/drive/folders/${TARGET_BOOKS_FOLDER_ID}`,
    category: 'Livro',
    folderId: TARGET_BOOKS_FOLDER_ID,
    previewText: 'Fundamentos de modelagem relacional, álgebra relacional, SQL avançado, gerenciamento de transações, recuperação de falhas, árvores B+ e arquiteturas NoSQL.'
  },
  {
    id: 'gdrive-book-7',
    name: 'Sistemas Operacionais Modernos (4ª Edição)',
    displayName: 'Sistemas Operacionais Modernos (4ª Edição)',
    rawFileName: 'Modern_Operating_Systems_Tanenbaum.pdf',
    author: 'Andrew S. Tanenbaum & Herbert Bos',
    topic: 'Sistemas Operacionais',
    pageCount: 1136,
    mimeType: 'application/pdf',
    size: '26.7 MB',
    modifiedTime: '2026-08-12T13:00:00.000Z',
    webViewLink: `https://drive.google.com/drive/folders/${TARGET_BOOKS_FOLDER_ID}`,
    category: 'Livro',
    folderId: TARGET_BOOKS_FOLDER_ID,
    previewText: 'Conceitos essenciais de processos, threads, escalonamento de CPU, gerenciamento de memória virtual, paginação, sincronização com semáforos/mutexes e sistemas de arquivos.'
  },
  {
    id: 'gdrive-book-8',
    name: 'Domain-Driven Design: Atacando as Complexidades no Coração do Software',
    displayName: 'Domain-Driven Design: Atacando as Complexidades no Coração do Software',
    rawFileName: 'Domain_Driven_Design_Eric_Evans.pdf',
    author: 'Eric Evans',
    topic: 'Modelagem de Software & Arquitetura',
    pageCount: 560,
    mimeType: 'application/pdf',
    size: '12.4 MB',
    modifiedTime: '2026-08-10T17:45:00.000Z',
    webViewLink: `https://drive.google.com/drive/folders/${TARGET_BOOKS_FOLDER_ID}`,
    category: 'Livro',
    folderId: TARGET_BOOKS_FOLDER_ID,
    previewText: 'Apresenta a metodologia DDD: Linguagem Ubíqua, Bounded Contexts, Entidades, Value Objects, Agregados, Repositórios e Arquitetura em Camadas para sistemas complexos.'
  }
];

// Pre-seeded curated curriculum documents matching the curriculum folder
export const PRE_SEEDED_CURRICULUM_FILES: DriveFileItem[] = [
  {
    id: 'gdrive-item-1',
    name: 'Guia Completo: Estruturas de Dados e Algoritmos',
    displayName: 'Guia Completo: Estruturas de Dados e Algoritmos',
    rawFileName: '01_Guia_Estruturas_de_Dados_e_Algoritmos.pdf',
    mimeType: 'application/pdf',
    size: '2.4 MB',
    modifiedTime: '2026-08-20T14:30:00.000Z',
    webViewLink: `https://drive.google.com/drive/folders/${TARGET_CURRICULUM_FOLDER_ID}`,
    category: 'PDF',
    folderId: TARGET_CURRICULUM_FOLDER_ID,
    previewText: 'Apostila e material completo de Estruturas de Dados Lineares e Não-Lineares: Listas Encadeadas, Pilhas, Filas, Árvores Binárias de Busca (BST), Grafos e Notação Big-O.'
  },
  {
    id: 'gdrive-item-2',
    name: 'Apostila Avançada: Arquitetura de Software e Microsserviços',
    displayName: 'Apostila Avançada: Arquitetura de Software e Microsserviços',
    rawFileName: '02_Apostila_Arquitetura_de_Software_e_Microsservicos.pdf',
    mimeType: 'application/pdf',
    size: '3.8 MB',
    modifiedTime: '2026-08-18T10:15:00.000Z',
    webViewLink: `https://drive.google.com/drive/folders/${TARGET_CURRICULUM_FOLDER_ID}`,
    category: 'PDF',
    folderId: TARGET_CURRICULUM_FOLDER_ID,
    previewText: 'Guia arquitetural abordando os princípios SOLID, Clean Architecture, Padrões de Projeto (Factory, Strategy, Observer, Repository), Comunicação síncrona/assíncrona e Mensageria.'
  },
  {
    id: 'gdrive-item-3',
    name: 'Manual Prático: Banco de Dados Relacionais, Modelagem e SQL',
    displayName: 'Manual Prático: Banco de Dados Relacionais, Modelagem e SQL',
    rawFileName: '03_Banco_de_Dados_Relacionais_SQL_e_Modelagem.docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: '1.2 MB',
    modifiedTime: '2026-08-15T09:00:00.000Z',
    webViewLink: `https://drive.google.com/drive/folders/${TARGET_CURRICULUM_FOLDER_ID}`,
    category: 'Documento',
    folderId: TARGET_CURRICULUM_FOLDER_ID,
    previewText: 'Manual prático de modelagem relacional, Formas Normais (1FN, 2FN, 3FN), Índices B-Tree, Transações ACID, isolamento de dados e otimização de consultas complexas em PostgreSQL.'
  },
  {
    id: 'gdrive-item-4',
    name: 'Apresentação: Redes de Computadores e Protocolo HTTP/REST',
    displayName: 'Apresentação: Redes de Computadores e Protocolo HTTP/REST',
    rawFileName: '04_Slides_Redes_de_Computadores_e_Protocolo_HTTP_REST.pptx',
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    size: '5.1 MB',
    modifiedTime: '2026-08-12T16:45:00.000Z',
    webViewLink: `https://drive.google.com/drive/folders/${TARGET_CURRICULUM_FOLDER_ID}`,
    category: 'Apresentação',
    folderId: TARGET_CURRICULUM_FOLDER_ID,
    previewText: 'Apresentação com diagramas e fluxos dos modelos OSI e TCP/IP, Métodos HTTP (GET, POST, PUT, DELETE, PATCH), Códigos de Status, Idempotência e Segurança com TLS/HTTPS.'
  },
  {
    id: 'gdrive-item-5',
    name: 'Resumo Executivo: Engenharia de Software e Metodologias Ágeis',
    displayName: 'Resumo Executivo: Engenharia de Software e Metodologias Ágeis',
    rawFileName: '05_Resumo_Engenharia_de_Software_e_Metodologias_Ageis.pdf',
    mimeType: 'application/pdf',
    size: '1.9 MB',
    modifiedTime: '2026-08-10T11:20:00.000Z',
    webViewLink: `https://drive.google.com/drive/folders/${TARGET_CURRICULUM_FOLDER_ID}`,
    category: 'PDF',
    folderId: TARGET_CURRICULUM_FOLDER_ID,
    previewText: 'Síntese das práticas ágeis: Papéis e Cerimônias do Scrum, Gestão de Fluxo no Kanban, Métricas de Velocidade, Integração Contínua (CI/CD) e Testes Automatizados (TDD/BDD).'
  },
  {
    id: 'gdrive-item-6',
    name: 'Caderno de Exercícios: 25 Desafios de Lógica e Algoritmos',
    displayName: 'Caderno de Exercícios: 25 Desafios de Lógica e Algoritmos',
    rawFileName: '06_Lista_Exercicios_Praticos_Codificacao_e_Logica.pdf',
    mimeType: 'application/pdf',
    size: '890 KB',
    modifiedTime: '2026-08-08T17:00:00.000Z',
    webViewLink: `https://drive.google.com/drive/folders/${TARGET_CURRICULUM_FOLDER_ID}`,
    category: 'PDF',
    folderId: TARGET_CURRICULUM_FOLDER_ID,
    previewText: 'Caderno com 25 desafios práticos de programação, algoritmos de ordenação, recursão, manipulação de matrizes e ponteiros com gabarito comentado.'
  }
];

export const PRE_SEEDED_DRIVE_FILES: DriveFileItem[] = [
  ...PRE_SEEDED_BOOKS_COLLECTION,
  ...PRE_SEEDED_CURRICULUM_FILES
];

// Helper to extract folder ID from any Google Drive URL or raw string
export function extractFolderId(input: string): string {
  if (!input) return TARGET_BOOKS_FOLDER_ID;
  const trimmed = input.trim();
  const folderMatch = trimmed.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (folderMatch && folderMatch[1]) {
    return folderMatch[1];
  }
  const idMatch = trimmed.match(/id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return idMatch[1];
  }
  return trimmed;
}

// Fetch files from Google Drive API v3 using user's access token
export async function fetchGoogleDriveFolderFiles(
  accessToken: string,
  folderId: string = TARGET_BOOKS_FOLDER_ID
): Promise<DriveFileItem[]> {
  const cleanFolderId = extractFolderId(folderId);
  const query = `'${cleanFolderId}' in parents and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,mimeType,size,modifiedTime,webViewLink,webContentLink,thumbnailLink,iconLink,description)&pageSize=100`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errJson = await response.json().catch(() => ({}));
    throw new Error(errJson?.error?.message || `Erro ao consultar Google Drive (Status: ${response.status})`);
  }

  const data = await response.json();
  const files: any[] = data.files || [];

  return files.map((file) => ({
    id: file.id,
    name: formatDocumentTitle(file.name),
    displayName: formatDocumentTitle(file.name),
    rawFileName: file.name,
    mimeType: file.mimeType,
    size: formatBytes(file.size),
    modifiedTime: file.modifiedTime,
    webViewLink: file.webViewLink || `https://drive.google.com/file/d/${file.id}/view`,
    webContentLink: file.webContentLink,
    thumbnailLink: file.thumbnailLink,
    iconLink: file.iconLink,
    folderId: cleanFolderId,
    category: getCategoryFromMimeType(file.mimeType, file.name),
    previewText: file.description || `Arquivo indexado da pasta do Google Drive (${file.name}).`
  }));
}
