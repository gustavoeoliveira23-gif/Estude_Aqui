import { CuratedResource, FlashcardDeck, Flashcard, NewsItem, StudyStats } from '../types';

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Arquiteturas Modernas: Por que Microsserviços e Event-Driven dominam o mercado',
    summary: 'Análise aprofundada sobre desacoplamento, mensageria com Kafka/RabbitMQ e resiliência em sistemas de alta escala.',
    source: 'TechPulse Brasil',
    url: 'https://dev.to',
    date: 'Hoje, 10:45',
    category: 'Arquitetura',
    sector: 'tecnologia',
    readTime: '6 min',
    tag: 'Engenharia'
  },
  {
    id: 'n2',
    title: 'Guia Definitivo de Algoritmos e Estruturas de Dados para Entrevistas Técnicas',
    summary: 'Aprenda notação Big-O, grafos, árvores binárias e programação dinâmica com exemplos comentados.',
    source: 'DevCommunity BR',
    url: 'https://tabnews.com.br',
    date: 'Ontem',
    category: 'Ciência da Computação',
    sector: 'tecnologia',
    readTime: '9 min',
    tag: 'Algoritmos'
  },
  {
    id: 'n3',
    title: 'React 19 & Next.js: O impacto dos Server Components na performance web',
    summary: 'Entenda como a renderização no servidor reduz o bundle enviado ao cliente e acelera a primeira pintura com conteúdo.',
    source: 'Frontend News',
    url: 'https://dev.to',
    date: '2 dias atrás',
    category: 'Desenvolvimento Web',
    sector: 'tecnologia',
    readTime: '5 min',
    tag: 'Frontend'
  },
  {
    id: 'n4',
    title: 'PostgreSQL vs NoSQL: Como escolher a modelagem correta de dados para seu projeto',
    summary: 'Casos práticos de ACID, índices B-Tree vs GIN e quando realmente vale a pena adotar bancos não relacionais.',
    source: 'Data Brazil',
    url: 'https://tabnews.com.br',
    date: '3 dias atrás',
    category: 'Banco de Dados',
    sector: 'tecnologia',
    readTime: '8 min',
    tag: 'Backend'
  },
  {
    id: 'n5',
    title: 'Metodologias Ágeis: Scrum, Kanban e OKRs na gestão de produtos digitais',
    summary: 'Como alinhar entregas de times de engenharia com métricas de negócio e previsibilidade de sprints.',
    source: 'Gestão & Negócios Tech',
    url: 'https://medium.com',
    date: 'Ontem',
    category: 'Gestão',
    sector: 'administracao',
    readTime: '7 min',
    tag: 'Ágil'
  }
];

export const CURATED_RESOURCES: CuratedResource[] = [
  // ==========================================
  // GOOGLE DRIVE - ACERVO DE LIVROS E REFERÊNCIAS (1AjjzIaeHhUJiJc2iu4VaIq4W0XYujLrN)
  // ==========================================
  {
    id: 'gdrive-book-1',
    title: 'Código Limpo: Habilidades Práticas do Agile Software (Robert C. Martin)',
    description: 'Referência fundamental sobre legibilidade de código, nomes significativos, funções pequenas com responsabilidade única, tratamento elegante de erros e refatoração contínua.',
    url: 'https://drive.google.com/drive/folders/1AjjzIaeHhUJiJc2iu4VaIq4W0XYujLrN',
    source: 'Google Drive (Acervo de Livros)',
    type: 'documentacao',
    durationOrReadTime: '464 págs • PDF',
    level: 'Intermediário',
    sector: 'tecnologia',
    category: 'Engenharia de Software',
    topic: 'Boas Práticas & Clean Code',
    officialDoc: true,
    rating: 5.0,
    free: true,
    tags: ['Google Drive', 'Livro', 'Clean Code', 'Uncle Bob', 'Refatoração']
  },
  {
    id: 'gdrive-book-2',
    title: 'Algoritmos: Teoria e Prática - CLRS (Thomas H. Cormen et al.)',
    description: 'A bíblia mundial de algoritmos (CLRS). Cobre análise assintótica, programação dinâmica, algoritmos gulosos, grafos (Dijkstra, Bellman-Ford, Kruskal), árvores rubro-negras e complexidade NP.',
    url: 'https://drive.google.com/drive/folders/1AjjzIaeHhUJiJc2iu4VaIq4W0XYujLrN',
    source: 'Google Drive (Acervo de Livros)',
    type: 'documentacao',
    durationOrReadTime: '1312 págs • PDF',
    level: 'Avançado',
    sector: 'tecnologia',
    category: 'Estruturas de Dados',
    topic: 'Algoritmos & Complexidade',
    officialDoc: true,
    rating: 5.0,
    free: true,
    tags: ['Google Drive', 'Livro', 'CLRS', 'Cormen', 'Algoritmos', 'Grafos']
  },
  {
    id: 'gdrive-book-3',
    title: 'Designing Data-Intensive Applications (Martin Kleppmann)',
    description: 'Guia definitivo para construir aplicações distribuídas confiáveis, escaláveis e de fácil manutenção: replicação, particionamento, consenso distribuído e processamento em stream.',
    url: 'https://drive.google.com/drive/folders/1AjjzIaeHhUJiJc2iu4VaIq4W0XYujLrN',
    source: 'Google Drive (Acervo de Livros)',
    type: 'documentacao',
    durationOrReadTime: '616 págs • PDF',
    level: 'Avançado',
    sector: 'tecnologia',
    category: 'Arquitetura de Software',
    topic: 'Sistemas Distribuídos & Dados',
    officialDoc: true,
    rating: 5.0,
    free: true,
    tags: ['Google Drive', 'Livro', 'Distribuição', 'Banco de Dados', 'Escalabilidade']
  },
  {
    id: 'gdrive-book-4',
    title: 'Padrões de Projeto: Soluções Reutilizáveis de Software Orientado a Objetos (GoF)',
    description: 'O clássico original do Gang of Four que catalogou os 23 padrões essenciais de criação, estrutura e comportamento (Factory, Observer, Strategy, Decorator, Adapter, etc).',
    url: 'https://drive.google.com/drive/folders/1AjjzIaeHhUJiJc2iu4VaIq4W0XYujLrN',
    source: 'Google Drive (Acervo de Livros)',
    type: 'documentacao',
    durationOrReadTime: '395 págs • PDF',
    level: 'Intermediário',
    sector: 'tecnologia',
    category: 'Engenharia de Software',
    topic: 'Design Patterns',
    officialDoc: true,
    rating: 5.0,
    free: true,
    tags: ['Google Drive', 'Livro', 'GoF', 'Design Patterns', 'POO']
  },
  {
    id: 'gdrive-book-5',
    title: 'Redes de Computadores (Andrew S. Tanenbaum & David J. Wetherall)',
    description: 'Tratado clássico sobre a arquitetura de camadas de rede, protocolo TCP/IP, roteamento, controle de congestionamento, protocolos de aplicação HTTP/DNS e segurança.',
    url: 'https://drive.google.com/drive/folders/1AjjzIaeHhUJiJc2iu4VaIq4W0XYujLrN',
    source: 'Google Drive (Acervo de Livros)',
    type: 'documentacao',
    durationOrReadTime: '960 págs • PDF',
    level: 'Intermediário',
    sector: 'tecnologia',
    category: 'Redes de Computadores',
    topic: 'Redes & Protocolos',
    officialDoc: true,
    rating: 5.0,
    free: true,
    tags: ['Google Drive', 'Livro', 'Tanenbaum', 'TCP/IP', 'Redes']
  },
  {
    id: 'gdrive-book-6',
    title: 'Sistema de Banco de Dados (Silberschatz, Korth & Sudarshan)',
    description: 'Fundamentos de modelagem relacional, álgebra relacional, SQL avançado, gerenciamento de transações, recuperação de falhas, árvores B+ e arquiteturas NoSQL.',
    url: 'https://drive.google.com/drive/folders/1AjjzIaeHhUJiJc2iu4VaIq4W0XYujLrN',
    source: 'Google Drive (Acervo de Livros)',
    type: 'documentacao',
    durationOrReadTime: '1376 págs • PDF',
    level: 'Intermediário',
    sector: 'tecnologia',
    category: 'Banco de Dados',
    topic: 'Banco de Dados & SQL',
    officialDoc: true,
    rating: 5.0,
    free: true,
    tags: ['Google Drive', 'Livro', 'SQL', 'Banco de Dados', 'Transações ACID']
  },

  // ==========================================
  // GOOGLE DRIVE - MATERIAIS DIDÁTICOS DA PASTA (1eZCVcNkHtDZZK9knShFn5MxPSOVTtfrY)
  // ==========================================
  {
    id: 'gdrive-item-1',
    title: 'Guia Completo: Estruturas de Dados e Algoritmos',
    description: 'Material didático completo com explicações aprofundadas sobre Pilhas, Filas, Listas Encadeadas, Árvores Binárias de Busca (BST), Grafos e Notação Big-O.',
    url: 'https://drive.google.com/drive/folders/1eZCVcNkHtDZZK9knShFn5MxPSOVTtfrY',
    source: 'Google Drive (Pasta da Disciplina)',
    type: 'documentacao',
    durationOrReadTime: '2.4 MB • PDF',
    level: 'Iniciante',
    sector: 'tecnologia',
    category: 'Estruturas de Dados',
    topic: 'Estruturas de Dados',
    officialDoc: true,
    rating: 5.0,
    free: true,
    tags: ['Google Drive', 'PDF', 'Estruturas de Dados', 'Big-O', 'Algoritmos']
  },
  {
    id: 'gdrive-item-2',
    title: 'Apostila Avançada: Princípios SOLID e Padrões de Projeto',
    description: 'Apostila técnica abordando boas práticas de Engenharia de Software, SOLID, Clean Architecture e Padrões Criacionais e Estruturais.',
    url: 'https://drive.google.com/drive/folders/1eZCVcNkHtDZZK9knShFn5MxPSOVTtfrY',
    source: 'Google Drive (Pasta da Disciplina)',
    type: 'documentacao',
    durationOrReadTime: '3.8 MB • PDF',
    level: 'Intermediário',
    sector: 'tecnologia',
    category: 'Engenharia de Software',
    topic: 'Engenharia de Software',
    officialDoc: true,
    rating: 5.0,
    free: true,
    tags: ['Google Drive', 'PDF', 'SOLID', 'Clean Architecture', 'Engenharia']
  },
  {
    id: 'gdrive-item-3',
    title: 'Manual Prático: Modelagem Relacional & SQL Avançado',
    description: 'Documento prático com Formas Normais (1FN a 3FN), Índices B-Tree, Transações ACID, concorrência e otimização de queries SQL.',
    url: 'https://drive.google.com/drive/folders/1eZCVcNkHtDZZK9knShFn5MxPSOVTtfrY',
    source: 'Google Drive (Pasta da Disciplina)',
    type: 'documentacao',
    durationOrReadTime: '1.2 MB • DOCX',
    level: 'Intermediário',
    sector: 'tecnologia',
    category: 'Banco de Dados',
    topic: 'Banco de Dados',
    officialDoc: true,
    rating: 5.0,
    free: true,
    tags: ['Google Drive', 'DOCX', 'SQL', 'PostgreSQL', 'Modelagem']
  },
  {
    id: 'gdrive-item-4',
    title: 'Slides Ilustrados: Redes de Computadores e Métodos HTTP/REST',
    description: 'Apresentação ilustrada com fluxo de requisições web, verbos HTTP (PUT, POST, GET, DELETE), cabeçalhos, códigos de status e modelo OSI.',
    url: 'https://drive.google.com/drive/folders/1eZCVcNkHtDZZK9knShFn5MxPSOVTtfrY',
    source: 'Google Drive (Pasta da Disciplina)',
    type: 'artigo',
    durationOrReadTime: '5.1 MB • Slides',
    level: 'Iniciante',
    sector: 'tecnologia',
    category: 'Web & APIs',
    topic: 'Web & APIs',
    officialDoc: true,
    rating: 5.0,
    free: true,
    tags: ['Google Drive', 'PPTX', 'HTTP', 'REST', 'Redes']
  },
  {
    id: 'gdrive-item-5',
    title: 'Resumo Executivo: Metodologias Ágeis, Scrum e Kanban',
    description: 'Síntese das cerimônias ágeis, estimativas com story points, gestão visual no Kanban e entrega contínua com pipelines CI/CD.',
    url: 'https://drive.google.com/drive/folders/1eZCVcNkHtDZZK9knShFn5MxPSOVTtfrY',
    source: 'Google Drive (Pasta da Disciplina)',
    type: 'artigo',
    durationOrReadTime: '1.9 MB • PDF',
    level: 'Iniciante',
    sector: 'administracao',
    category: 'Gestão Ágil',
    topic: 'Gestão Ágil',
    officialDoc: true,
    rating: 5.0,
    free: true,
    tags: ['Google Drive', 'PDF', 'Scrum', 'Kanban', 'Ágil']
  },
  {
    id: 'gdrive-item-6',
    title: 'Caderno de Exercícios: 25 Desafios de Lógica e Algoritmos',
    description: 'Caderno de exercícios com problemas de ordenação, recursão, matrizes e desafios práticos para fixação com repetição espaçada.',
    url: 'https://drive.google.com/drive/folders/1eZCVcNkHtDZZK9knShFn5MxPSOVTtfrY',
    source: 'Google Drive (Pasta da Disciplina)',
    type: 'documentacao',
    durationOrReadTime: '890 KB • PDF',
    level: 'Iniciante',
    sector: 'tecnologia',
    category: 'Algoritmos & Lógica',
    topic: 'Estruturas de Dados',
    officialDoc: true,
    rating: 5.0,
    free: true,
    tags: ['Google Drive', 'PDF', 'Exercícios', 'Lógica', 'Algoritmos']
  },
  // ==========================================
  // TECNOLOGIA - DOCUMENTAÇÕES OFICIAIS & ARTIGOS
  // ==========================================
  {
    id: 'doc-mdn-http',
    title: 'MDN Web Docs: Métodos de Requisição HTTP (PUT, POST e Idempotência)',
    description: 'Documentação oficial detalhada sobre os verbos HTTP, semântica de mutação de recursos, idempotência e tratamento seguro de requisições na Web.',
    url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods/PUT',
    source: 'MDN Web Docs (Mozilla)',
    type: 'documentacao',
    durationOrReadTime: '8 min de leitura',
    level: 'Iniciante',
    sector: 'tecnologia',
    category: 'Web & APIs',
    topic: 'Web & APIs',
    officialDoc: true,
    rating: 5.0,
    free: true,
    tags: ['HTTP', 'REST', 'APIs', 'Idempotência', 'MDN']
  },
  {
    id: 'doc-rfc-http',
    title: 'IETF RFC 7231: Hypertext Transfer Protocol (HTTP/1.1) Semantics',
    description: 'Especificação técnica e normativa padrão internacional da IETF definindo a semântica rigorosa dos métodos HTTP, códigos de status e cabeçalhos.',
    url: 'https://datatracker.ietf.org/doc/html/rfc7231',
    source: 'IETF (Internet Engineering Task Force)',
    type: 'especificacao_rfc',
    durationOrReadTime: 'Especificação Oficial',
    level: 'Avançado',
    sector: 'tecnologia',
    category: 'Web & APIs',
    topic: 'Web & APIs',
    officialDoc: true,
    rating: 5.0,
    free: true,
    tags: ['RFC', 'IETF', 'Protocolos', 'HTTP']
  },
  {
    id: 'doc-solid-srp',
    title: 'Uncle Bob: The Single Responsibility Principle (Princípio da Responsabilidade Única)',
    description: 'Artigo seminal de Robert C. Martin dissecando o princípio "S" do SOLID: uma classe deve ter apenas uma razão para mudar.',
    url: 'https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html',
    source: 'Clean Coder Blog (Robert C. Martin)',
    type: 'artigo',
    durationOrReadTime: '12 min de leitura',
    level: 'Intermediário',
    sector: 'tecnologia',
    category: 'Engenharia de Software',
    topic: 'Engenharia de Software',
    officialDoc: false,
    rating: 4.9,
    free: true,
    tags: ['SOLID', 'SRP', 'Clean Code', 'Arquitetura']
  },
  {
    id: 'doc-solid-refactoring-guru',
    title: 'Refactoring Guru: Princípios SOLID e Padrões de Projeto',
    description: 'Guia visual e prático com exemplos de código em múltiplas linguagens demonstrando SRP, OCP, LSP, ISP e DIP.',
    url: 'https://refactoring.guru/pt-br/design-patterns',
    source: 'Refactoring Guru',
    type: 'tutorial_externo',
    durationOrReadTime: 'Guia Interativo',
    level: 'Intermediário',
    sector: 'tecnologia',
    category: 'Engenharia de Software',
    topic: 'Engenharia de Software',
    officialDoc: false,
    rating: 4.9,
    free: true,
    tags: ['Design Patterns', 'SOLID', 'Refatoração']
  },
  {
    id: 'doc-avl-mit',
    title: 'MIT OpenCourseWare: Binary Search Trees & AVL Balancing (6.006)',
    description: 'Notas de aula e apostila técnica oficial do MIT sobre árvores de busca balanceadas, fatores de balanceamento e complexidade O(log n).',
    url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
    source: 'MIT OpenCourseWare',
    type: 'documentacao',
    durationOrReadTime: 'Apostila Universitária',
    level: 'Intermediário',
    sector: 'tecnologia',
    category: 'Ciência da Computação',
    topic: 'Estruturas de Dados',
    officialDoc: true,
    rating: 5.0,
    free: true,
    tags: ['Árvores AVL', 'Big-O', 'Algoritmos', 'MIT']
  },
  {
    id: 'doc-python-ds',
    title: 'Documentação Oficial do Python: Estruturas de Dados e Algoritmos',
    description: 'Manual oficial da linguagem Python dissecando implementação de listas, dicionários (Hash Tables), sets e análise assintótica.',
    url: 'https://docs.python.org/pt-br/3/tutorial/datastructures.html',
    source: 'Python Software Foundation',
    type: 'documentacao',
    durationOrReadTime: 'Documentação Oficial',
    level: 'Iniciante',
    sector: 'tecnologia',
    category: 'Ciência da Computação',
    topic: 'Estruturas de Dados',
    officialDoc: true,
    rating: 4.9,
    free: true,
    tags: ['Python', 'Estruturas de Dados', 'Doc Oficial']
  },
  {
    id: 'doc-cap-brewer',
    title: 'Teorema CAP: Revisão e Evolução dos Sistemas Distribuídos (Eric Brewer)',
    description: 'Artigo referencial sobre a impossibilidade de garantir Consistência estrita, Disponibilidade e Tolerância a Partição simultaneamente.',
    url: 'https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/',
    source: 'IEEE Computer / InfoQ',
    type: 'artigo',
    durationOrReadTime: '15 min de leitura',
    level: 'Avançado',
    sector: 'tecnologia',
    category: 'Arquitetura',
    topic: 'Sistemas Distribuídos & Arquitetura',
    officialDoc: false,
    rating: 4.9,
    free: true,
    tags: ['CAP', 'Sistemas Distribuídos', 'Consistência']
  },
  {
    id: 'doc-martin-fowler-microservices',
    title: 'Martin Fowler: Microservices Guide & Event-Driven Architecture',
    description: 'O artigo seminal mais lido da indústria de engenharia de software sobre padrões de desacoplamento, mensageria e particionamento de banco.',
    url: 'https://martinfowler.com/articles/microservices.html',
    source: 'martinfowler.com',
    type: 'artigo',
    durationOrReadTime: '20 min de leitura',
    level: 'Avançado',
    sector: 'tecnologia',
    category: 'Arquitetura',
    topic: 'Sistemas Distribuídos & Arquitetura',
    officialDoc: false,
    rating: 5.0,
    free: true,
    tags: ['Microsserviços', 'Arquitetura', 'Event-Driven']
  },
  {
    id: 'doc-postgres-official',
    title: 'PostgreSQL 16 Official Manual: Concurrency Control & Indexing',
    description: 'Documentação técnica oficial do banco de dados relacional PostgreSQL cobrindo MVCC, níveis de isolamento de transação (ACID) e índices B-Tree.',
    url: 'https://www.postgresql.org/docs/current/mvcc.html',
    source: 'PostgreSQL Global Development Group',
    type: 'documentacao',
    durationOrReadTime: 'Manual Oficial',
    level: 'Intermediário',
    sector: 'tecnologia',
    category: 'Banco de Dados',
    topic: 'Banco de Dados',
    officialDoc: true,
    rating: 5.0,
    free: true,
    tags: ['PostgreSQL', 'SQL', 'ACID', 'MVCC', 'Doc Oficial']
  },
  {
    id: 'doc-devdocs',
    title: 'DevDocs.io: API Documentation Explorer Unificado',
    description: 'Navegador de documentações offline e online reunindo manuais oficiais de React, Node.js, TypeScript, Docker, Git e Linux.',
    url: 'https://devdocs.io',
    source: 'DevDocs Open Source',
    type: 'repositorio_guia',
    durationOrReadTime: 'Referência Contínua',
    level: 'Todos',
    sector: 'tecnologia',
    category: 'Documentação',
    topic: 'Documentação',
    officialDoc: true,
    rating: 5.0,
    free: true,
    tags: ['DevDocs', 'API', 'Documentação', 'Linux', 'Git']
  },
  {
    id: 'doc-cs50-harvard',
    title: 'Harvard CS50x: Materiais Abertos e Notas de Aula de Ciência da Computação',
    description: 'Portal de materiais de apoio, notas de estudo e especificações de projetos do curso CS50 da Universidade de Harvard.',
    url: 'https://cs50.harvard.edu/x/',
    source: 'Harvard University',
    type: 'tutorial_externo',
    durationOrReadTime: 'Notas & Exercícios',
    level: 'Iniciante',
    sector: 'tecnologia',
    category: 'Fundamentos',
    topic: 'Estruturas de Dados',
    officialDoc: false,
    rating: 5.0,
    free: true,
    tags: ['Harvard', 'CS50', 'Algoritmos', 'C']
  },

  // ==========================================
  // ADMINISTRAÇÃO & GESTÃO - LINKS E ARTIGOS
  // ==========================================
  {
    id: 'doc-okr-guide',
    title: 'What is an OKR? O Guia Definitivo de Objectives & Key Results',
    description: 'Metodologia criada por Andy Grove na Intel e popularizada por John Doerr no Google para alinhamento estratégico de metas.',
    url: 'https://www.whatmatters.com/get-started/',
    source: 'What Matters (John Doerr Foundation)',
    type: 'artigo',
    durationOrReadTime: '10 min de leitura',
    level: 'Iniciante',
    sector: 'administracao',
    category: 'Gestão',
    topic: 'Gestão & Ágil',
    officialDoc: true,
    rating: 4.8,
    free: true,
    tags: ['OKRs', 'Gestão', 'Estratégia', 'Metas']
  },
  {
    id: 'doc-scrum-guide',
    title: 'The Scrum Guide: O Guia Oficial do Framework Scrum',
    description: 'Documento oficial escrito por Ken Schwaber e Jeff Sutherland definindo regras, papéis, eventos e artefatos da gestão ágil.',
    url: 'https://scrumguides.org/scrum-guide.html',
    source: 'ScrumGuides.org (Ken Schwaber & Jeff Sutherland)',
    type: 'documentacao',
    durationOrReadTime: 'Guia Oficial',
    level: 'Iniciante',
    sector: 'administracao',
    category: 'Gestão',
    topic: 'Gestão & Ágil',
    officialDoc: true,
    rating: 5.0,
    free: true,
    tags: ['Scrum', 'Ágil', 'Sprints', 'Doc Oficial']
  }
];

export const INITIAL_DECKS: FlashcardDeck[] = [
  {
    id: 'deck-1',
    title: 'Estruturas de Dados & Algoritmos',
    description: 'Ponteiros, Arrays, Listas Encadeadas, Árvores Binárias, Grafos e Análise Big-O.',
    category: 'Ciência da Computação',
    cardCount: 6,
    sector: 'tecnologia',
    iconName: 'Binary',
    color: 'emerald',
    level: 'Intermediário'
  },
  {
    id: 'deck-2',
    title: 'JavaScript & Web Moderna',
    description: 'Promises, Async/Await, Closures, Event Loop, DOM e React Hooks.',
    category: 'Frontend',
    cardCount: 6,
    sector: 'tecnologia',
    iconName: 'Code2',
    color: 'cyan',
    level: 'Iniciante'
  },
  {
    id: 'deck-3',
    title: 'Bancos de Dados & SQL',
    description: 'Modelagem relacional, ACID, Chaves Estrangeiras, Índices, Joins e Normalização.',
    category: 'Backend',
    cardCount: 5,
    sector: 'tecnologia',
    iconName: 'Database',
    color: 'indigo',
    level: 'Intermediário'
  },
  {
    id: 'deck-4',
    title: 'Redes & Protocolos de Internet',
    description: 'Modelo OSI, TCP/IP, DNS, HTTP/HTTPS, WebSockets e Segurança de Redes.',
    category: 'Infraestrutura',
    cardCount: 5,
    sector: 'tecnologia',
    iconName: 'Network',
    color: 'amber',
    level: 'Todos'
  },
  {
    id: 'deck-5',
    title: 'Engenharia de Software & SOLID',
    description: 'Princípios SOLID, Padrões de Projeto, Clean Code, Testes Unitários e CI/CD.',
    category: 'Engenharia',
    cardCount: 5,
    sector: 'tecnologia',
    iconName: 'Layers',
    color: 'violet',
    level: 'Avançado'
  }
];

export const INITIAL_FLASHCARDS: Flashcard[] = [
  // Deck 1
  {
    id: 'fc-1',
    deckId: 'deck-1',
    front: 'O que significa a complexidade de tempo O(1) em um algoritmo?',
    back: 'Significa tempo constante: a execução leva a mesma quantidade de tempo independentemente do tamanho da entrada (n). Exemplo: acessar um elemento num array por índice.',
    category: 'Estruturas de Dados',
    difficulty: 'Fácil',
    reviewCount: 0,
    correctCount: 0,
    status: 'new'
  },
  {
    id: 'fc-2',
    deckId: 'deck-1',
    front: 'Qual é a diferença fundamental entre uma Pilha (Stack) e uma Fila (Queue)?',
    back: 'A Pilha segue o princípio LIFO (Last In, First Out - o último a entrar é o primeiro a sair), enquanto a Fila segue FIFO (First In, First Out - o primeiro a entrar é o primeiro a sair).',
    category: 'Estruturas de Dados',
    difficulty: 'Fácil',
    reviewCount: 0,
    correctCount: 0,
    status: 'new'
  },
  {
    id: 'fc-3',
    deckId: 'deck-1',
    front: 'Como funciona uma Tabela Hash (Hash Table) e qual sua complexidade média de busca?',
    back: 'Utiliza uma função hash para converter uma chave em um índice de array. Sua complexidade média de busca, inserção e remoção é O(1). No pior caso (muitas colisões), pode ser O(n).',
    category: 'Estruturas de Dados',
    difficulty: 'Médio',
    reviewCount: 0,
    correctCount: 0,
    status: 'new'
  },
  {
    id: 'fc-4',
    deckId: 'deck-1',
    front: 'O que é uma Árvore Binária de Busca (BST)?',
    back: 'É uma árvore onde cada nó possui no máximo 2 filhos, e para qualquer nó: todos os valores na subárvore esquerda são menores que ele, e na subárvore direita são maiores.',
    category: 'Estruturas de Dados',
    difficulty: 'Médio',
    reviewCount: 0,
    correctCount: 0,
    status: 'new'
  },
  {
    id: 'fc-5',
    deckId: 'deck-1',
    front: 'Qual a complexidade média e de pior caso do algoritmo Quicksort?',
    back: 'Complexidade média: O(n log n). Pior caso (quando o pivô escolhido é o menor ou maior elemento sucessivamente): O(n²).',
    category: 'Algoritmos',
    difficulty: 'Difícil',
    reviewCount: 0,
    correctCount: 0,
    status: 'new'
  },
  {
    id: 'fc-6',
    deckId: 'deck-1',
    front: 'Qual é a diferença entre Busca em Largura (BFS) e Busca em Profundidade (DFS) em grafos?',
    back: 'BFS explora vizinhos nível por nível (usa Fila). DFS explora um ramo até o final antes de retroceder (usa Pilha ou recursão).',
    category: 'Algoritmos',
    difficulty: 'Difícil',
    reviewCount: 0,
    correctCount: 0,
    status: 'new'
  },

  // Deck 2
  {
    id: 'fc-7',
    deckId: 'deck-2',
    front: 'O que é uma Closure em JavaScript?',
    back: 'Uma closure é a combinação de uma função com as referências ao seu estado circundante (o ambiente léxico). Dá acesso ao escopo de uma função externa a partir de uma função interna.',
    category: 'JavaScript',
    difficulty: 'Médio',
    reviewCount: 0,
    correctCount: 0,
    status: 'new'
  },
  {
    id: 'fc-8',
    deckId: 'deck-2',
    front: 'Como funciona o Event Loop no motor JavaScript?',
    back: 'O Event Loop monitora constantemente a Call Stack e a Callback/Microtask Queue. Quando a Call Stack fica vazia, ele empurra os callbacks da fila para execução.',
    category: 'JavaScript',
    difficulty: 'Difícil',
    reviewCount: 0,
    correctCount: 0,
    status: 'new'
  },
  {
    id: 'fc-9',
    deckId: 'deck-2',
    front: 'Qual é o papel do hook useEffect no React?',
    back: 'Executar efeitos colaterais em componentes funcionais (chamadas a APIs, timers, subscrições de eventos e sincronização com sistemas externos).',
    category: 'Frontend',
    difficulty: 'Fácil',
    reviewCount: 0,
    correctCount: 0,
    status: 'new'
  },
  {
    id: 'fc-10',
    deckId: 'deck-2',
    front: 'O que é a diferença entre "==" e "===" em JavaScript?',
    back: '"==" compara valores realizando coerção implícita de tipo. "===" (estrito) compara tanto o valor quanto o tipo sem conversões automáticas.',
    category: 'JavaScript',
    difficulty: 'Fácil',
    reviewCount: 0,
    correctCount: 0,
    status: 'new'
  },
  {
    id: 'fc-11',
    deckId: 'deck-2',
    front: 'Qual a finalidade do Promise.all()?',
    back: 'Recebe um array de Promises e retorna uma única Promise que resolve quando todas resolverem com sucesso, ou rejeita imediatamente no primeiro erro (fail-fast).',
    category: 'JavaScript',
    difficulty: 'Médio',
    reviewCount: 0,
    correctCount: 0,
    status: 'new'
  },
  {
    id: 'fc-12',
    deckId: 'deck-2',
    front: 'O que são Server Components no React 19?',
    back: 'Componentes que são renderizados exclusivamente no servidor e não enviam código JavaScript para o bundle do cliente, reduzindo o tempo de carregamento.',
    category: 'Frontend',
    difficulty: 'Médio',
    reviewCount: 0,
    correctCount: 0,
    status: 'new'
  },

  // Deck 3
  {
    id: 'fc-13',
    deckId: 'deck-3',
    front: 'O que representa o acrônimo ACID em Bancos de Dados?',
    back: 'Atomicidade (tudo ou nada), Consistência (regras e constraints válidas), Isolamento (transações concorrentes não interferem), Durabilidade (dados persistem após commit).',
    category: 'Banco de Dados',
    difficulty: 'Médio',
    reviewCount: 0,
    correctCount: 0,
    status: 'new'
  },
  {
    id: 'fc-14',
    deckId: 'deck-3',
    front: 'Qual a diferença entre INNER JOIN e LEFT JOIN no SQL?',
    back: 'INNER JOIN retorna apenas registros que possuem correspondência em ambas as tabelas. LEFT JOIN retorna todos os registros da tabela da esquerda, mesmo sem par na direita (preenchendo com NULL).',
    category: 'SQL',
    difficulty: 'Fácil',
    reviewCount: 0,
    correctCount: 0,
    status: 'new'
  },
  {
    id: 'fc-15',
    deckId: 'deck-3',
    front: 'Para que serve um Índice (Index) em uma tabela SQL e qual o seu custo?',
    back: 'Acelera consultas de busca (geralmente usando árvore B-Tree), mas tem custo de espaço em disco e torna inserções e atualizações (INSERT/UPDATE) mais lentas.',
    category: 'SQL',
    difficulty: 'Médio',
    reviewCount: 0,
    correctCount: 0,
    status: 'new'
  },
  {
    id: 'fc-16',
    deckId: 'deck-3',
    front: 'O que é a 3ª Forma Normal (3NF) na normalização de dados?',
    back: 'A tabela deve estar na 2NF e nenhum atributo não-chave pode depender transitivamente de outro atributo não-chave (eliminação de dependências transitivas).',
    category: 'Banco de Dados',
    difficulty: 'Difícil',
    reviewCount: 0,
    correctCount: 0,
    status: 'new'
  },
  {
    id: 'fc-17',
    deckId: 'deck-3',
    front: 'Quando devemos usar transações (BEGIN / COMMIT / ROLLBACK)?',
    back: 'Sempre que precisamos executar múltiplas operações de banco de dados interdependentes que não podem ficar em estado inconsistente caso uma delas falhe.',
    category: 'SQL',
    difficulty: 'Médio',
    reviewCount: 0,
    correctCount: 0,
    status: 'new'
  }
];

export const DIAGNOSTIC_QUESTIONS = [
  {
    id: 1,
    question: 'Qual é o resultado da complexidade temporal ao percorrer um array bidimensional de tamanho N x N com dois loops aninhados?',
    options: [
      { text: 'O(N)', correct: false, reason: 'O(N) seria para um único loop linear.' },
      { text: 'O(N²)', correct: true, reason: 'Dois loops aninhados multiplicam o número de iterações por N * N, resultando em complexidade quadrática O(N²).' },
      { text: 'O(log N)', correct: false, reason: 'O(log N) é típico de busca binária ou árvores balanceadas.' },
      { text: 'O(1)', correct: false, reason: 'O(1) é tempo constante.' }
    ],
    topic: 'Algoritmos & Complexidade',
    weight: 'Iniciante/Intermediário'
  },
  {
    id: 2,
    question: 'Em Programação Orientada a Objetos e Arquitetura Limpa, o princípio "S" do SOLID (Single Responsibility Principle) afirma que:',
    options: [
      { text: 'Uma classe deve implementar apenas uma interface por vez.', correct: false, reason: 'Isso se relaciona com segregação de interfaces, não responsabilidade única.' },
      { text: 'Uma classe deve ter apenas um motivo para mudar, possuindo uma única responsabilidade.', correct: true, reason: 'Correto! SRP prega alta coesão e baixo acoplamento limitando o escopo de atuação da classe.' },
      { text: 'Todo método deve ter no máximo uma linha de código.', correct: false, reason: 'Regra arbitrária inexistente no SOLID.' },
      { text: 'Todas as variáveis devem ser privadas e acessadas apenas por setters.', correct: false, reason: 'Encapsulamento é importante, mas não define SRP.' }
    ],
    topic: 'Engenharia de Software',
    weight: 'Intermediário'
  },
  {
    id: 3,
    question: 'No protocolo HTTP/REST, qual método é semanticamente idempotente e utilizado para atualizar completamente um recurso existente?',
    options: [
      { text: 'POST', correct: false, reason: 'POST cria novos recursos e não é idempotente.' },
      { text: 'PUT', correct: true, reason: 'PUT substitui completamente o recurso e sua execução repetida com os mesmos dados produz o mesmo efeito (idempotente).' },
      { text: 'CONNECT', correct: false, reason: 'CONNECT é usado para criar túneis bidirecionais.' },
      { text: 'FETCH', correct: false, reason: 'FETCH é uma API JavaScript no cliente, não um método HTTP.' }
    ],
    topic: 'Web & APIs',
    weight: 'Iniciante/Intermediário'
  },
  {
    id: 4,
    question: 'Em um sistema concorrente distribuído, o Teorema CAP estabelece que é impossível garantir simultaneamente:',
    options: [
      { text: 'Consistência, Disponibilidade e Tolerância a Particionamento de Rede.', correct: true, reason: 'Exato! Em caso de particionamento (P), o sistema precisa priorizar Consistência (CP) ou Disponibilidade (AP).' },
      { text: 'Criptografia, Autenticação e Permissões.', correct: false, reason: 'Conceitos de segurança da informação.' },
      { text: 'CPU, Armazenamento e Performance.', correct: false, reason: 'Recursos de hardware, não Teorema CAP.' },
      { text: 'Compressão, Assincronismo e Paralelismo.', correct: false, reason: 'Técnicas de otimização de processamento.' }
    ],
    topic: 'Sistemas Distribuídos & Arquitetura',
    weight: 'Avançado'
  }
];

export const INITIAL_RESOURCES = CURATED_RESOURCES;

export const INITIAL_NOTES: import('../types').StudyNote[] = [
  {
    id: 'note-1',
    title: 'Resumo: Complexidade de Algoritmos e Notação Big-O',
    content: `# Complexidade de Algoritmos e Notação Big-O

## Principais Classes de Complexidade
- **O(1) - Constante:** Acesso direto a elementos de array pelo índice, inserção/remoção no topo de uma pilha.
- **O(log n) - Logarítmica:** Busca binária em arrays ordenados, operações em árvores balanceadas (AVL, Red-Black).
- **O(n) - Linear:** Busca linear em lista não ordenada, iteração simples de 0 a n.
- **O(n log n) - Linearítmica:** Algoritmos eficientes de ordenação por divisão e conquista (*Merge Sort*, *Quick Sort*, *Heap Sort*).
- **O(n²) - Quadrática:** Loops aninhados (ex: *Bubble Sort*, *Selection Sort*). Evitar em datasets volumosos.

\`\`\`typescript
// Busca Binária O(log n)
function binarySearch(arr: number[], target: number): number {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
\`\`\`
`,
    category: 'Estruturas de Dados',
    sector: 'tecnologia',
    tags: ['algoritmos', 'big-o', 'computacao'],
    createdAt: '2026-08-20',
    updatedAt: '2026-08-22'
  },
  {
    id: 'note-2',
    title: 'Guia de Bolso: Princípios SOLID na Prática',
    content: `# Princípios SOLID para Código Limpo

1. **S - Single Responsibility Principle (SRP):** Uma classe deve ter um e apenas um motivo para ser alterada.
2. **O - Open/Closed Principle (OCP):** Entidades de software devem ser abertas para extensão, mas fechadas para modificação.
3. **L - Liskov Substitution Principle (LSP):** Subclasses devem poder substituir suas classes base sem quebrar o comportamento do sistema.
4. **I - Interface Segregation Principle (ISP):** Clientes não devem ser forçados a depender de interfaces que não utilizam.
5. **D - Dependency Inversion Principle (DIP):** Módulos de alto nível não devem depender de módulos de baixo nível; ambos devem depender de abstrações.
`,
    category: 'Engenharia de Software',
    sector: 'tecnologia',
    tags: ['solid', 'clean-code', 'arquitetura'],
    createdAt: '2026-08-21',
    updatedAt: '2026-08-22'
  }
];

export const INITIAL_STATS: StudyStats = {
  totalStudyMinutes: 0,
  streakDays: 0,
  lastStudyDate: '',
  cardsReviewedTotal: 0,
  cardsMasteredTotal: 0,
  pomodorosCompleted: 0,
  dailyLogs: [],
  dailyStudyMinutes: [
    { day: 'Seg', minutes: 0 },
    { day: 'Ter', minutes: 0 },
    { day: 'Qua', minutes: 0 },
    { day: 'Qui', minutes: 0 },
    { day: 'Sex', minutes: 0 },
    { day: 'Sáb', minutes: 0 },
    { day: 'Dom', minutes: 0 }
  ],
  subjectMastery: [
    { subject: 'Estruturas de Dados', score: 0, totalCards: 6 },
    { subject: 'JavaScript & Web', score: 0, totalCards: 6 },
    { subject: 'Banco de Dados (SQL)', score: 0, totalCards: 5 },
    { subject: 'Redes & Protocolos', score: 0, totalCards: 5 },
    { subject: 'Engenharia de Software', score: 0, totalCards: 5 }
  ]
};
