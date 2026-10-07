export interface CourseSuggestion {
  id: string;
  title: string;
  provider: string;
  providerBadge: string;
  url: string;
  category: string;
  niche: 'web' | 'robotica' | 'backend' | 'ia_datascience' | 'mobile' | 'fundamentos';
  description: string;
  estimatedHours: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Todos';
  isFree: boolean;
  hasCertificate: boolean;
  language: string;
  tags: string[];
}

export interface ReadingArticleSuggestion {
  id: string;
  title: string;
  authorOrSource: string;
  url: string;
  category: string;
  readTime: string;
  summary: string;
  keyTakeaways: string[];
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  tags: string[];
}

export const SUGGESTED_COURSES: CourseSuggestion[] = [
  {
    id: 'course-cs50',
    title: 'Harvard CS50x: Introdução à Ciência da Computação',
    provider: 'Universidade de Harvard / edX',
    providerBadge: 'Harvard University',
    url: 'https://cs50.harvard.edu/x/',
    category: 'Fundamentos da Computação',
    niche: 'fundamentos',
    description: 'O curso de introdução à ciência da computação mais aclamado do mundo. Ensina como pensar algoritmicamente e resolver problemas com C, Python, SQL, HTML, CSS e JavaScript.',
    estimatedHours: '60-80 horas',
    level: 'Iniciante',
    isFree: true,
    hasCertificate: true,
    language: 'Inglês (Legendas PT)',
    tags: ['Harvard', 'C', 'Python', 'Algoritmos', 'SQL', 'Estruturas de Dados']
  },
  {
    id: 'course-odin-project',
    title: 'The Odin Project: Trilha Full Stack Open Source',
    provider: 'The Odin Project Community',
    providerBadge: 'Open Source',
    url: 'https://www.theodinproject.com/',
    category: 'Desenvolvimento Web',
    niche: 'web',
    description: 'Currículo 100% gratuito e mantido pela comunidade mundial para formar desenvolvedores Web Full Stack com projetos práticos em JavaScript, React, Node.js e bancos de dados.',
    estimatedHours: '150-250 horas',
    level: 'Iniciante',
    isFree: true,
    hasCertificate: false,
    language: 'Inglês',
    tags: ['Web Full Stack', 'JavaScript', 'React', 'Node.js', 'Git']
  },
  {
    id: 'course-freecodecamp',
    title: 'freeCodeCamp: Certificação de Design Web Responsivo & JavaScript',
    provider: 'freeCodeCamp.org',
    providerBadge: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/portuguese/',
    category: 'Programação Web & Algoritmos',
    niche: 'web',
    description: 'Plataforma interativa com centenas de exercícios práticos com feedback em tempo real no navegador, abordando HTML5, CSS3 moderno, JavaScript ES6+ e estruturas de dados.',
    estimatedHours: '300 horas',
    level: 'Iniciante',
    isFree: true,
    hasCertificate: true,
    language: 'Português',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Certificação Gratuita']
  },
  {
    id: 'course-guanabara-algoritmos',
    title: 'Algoritmos e Lógica de Programação com VisualG',
    provider: 'Curso em Vídeo (Prof. Gustavo Guanabara)',
    providerBadge: 'Curso em Vídeo',
    url: 'https://www.youtube.com/playlist?list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV',
    category: 'Lógica & Algoritmos',
    niche: 'fundamentos',
    description: 'O melhor ponto de partida em língua portuguesa para quem nunca programou. Didática impecável com variáveis, estruturas condicionais, laços de repetição, vetores e matrizes.',
    estimatedHours: '40 horas',
    level: 'Iniciante',
    isFree: true,
    hasCertificate: true,
    language: 'Português',
    tags: ['Lógica', 'Algoritmos', 'Iniciante', 'Didática PT-BR']
  },
  {
    id: 'course-arduino-official',
    title: 'Arduino Starter Projects & Documentação Oficial de Robótica',
    provider: 'Arduino Foundation',
    providerBadge: 'Arduino Oficial',
    url: 'https://docs.arduino.cc/learn/',
    category: 'Robótica & IoT',
    niche: 'robotica',
    description: 'Laboratórios práticos oficiais cobrindo desde o acionamento do primeiro LED até leitura de sensores ultrassônicos, motores de passo, servos e displays OLED.',
    estimatedHours: '30 horas',
    level: 'Iniciante',
    isFree: true,
    hasCertificate: false,
    language: 'Inglês',
    tags: ['Arduino', 'Robótica', 'Sensores', 'Microcontroladores', 'Eletrônica']
  },
  {
    id: 'course-kaggle-python-ml',
    title: 'Kaggle Learn: Python, Pandas & Machine Learning Micro-Courses',
    provider: 'Kaggle (Google)',
    providerBadge: 'Kaggle',
    url: 'https://www.kaggle.com/learn',
    category: 'Inteligência Artificial & Dados',
    niche: 'ia_datascience',
    description: 'Módulos interativos de 3 a 5 horas direto em Jupyter Notebooks para dominar Python para dados, manipulação com Pandas, limpeza e modelos preditivos em Scikit-Learn.',
    estimatedHours: '25 horas',
    level: 'Iniciante',
    isFree: true,
    hasCertificate: true,
    language: 'Inglês',
    tags: ['Python', 'Pandas', 'Machine Learning', 'Kaggle', 'Google']
  },
  {
    id: 'course-android-compose',
    title: 'Android Basics with Jetpack Compose (Curso Oficial Google)',
    provider: 'Google Developers',
    providerBadge: 'Google Developers',
    url: 'https://developer.android.com/courses/android-basics-compose/course',
    category: 'Desenvolvimento Mobile',
    niche: 'mobile',
    description: 'Trilha oficial do Google para aprender Kotlin do zero e construir aplicativos Android modernos utilizando Jetpack Compose, Material Design 3 e arquitetura recomendada.',
    estimatedHours: '50 horas',
    level: 'Iniciante',
    isFree: true,
    hasCertificate: true,
    language: 'Português',
    tags: ['Android', 'Kotlin', 'Jetpack Compose', 'Google', 'Mobile']
  },
  {
    id: 'course-mit-algorithms',
    title: 'MIT 6.006: Introduction to Algorithms (OpenCourseWare)',
    provider: 'MIT (Massachusetts Institute of Technology)',
    providerBadge: 'MIT OCW',
    url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
    category: 'Ciência da Computação Avançada',
    niche: 'fundamentos',
    description: 'Aulas completas gravadas no MIT cobrindo estruturas de dados avançadas, árvores balanceadas AVL, hashing, grafos (Dijkstra/Bellman-Ford) e Programação Dinâmica.',
    estimatedHours: '70 horas',
    level: 'Avançado',
    isFree: true,
    hasCertificate: false,
    language: 'Inglês',
    tags: ['MIT', 'Algoritmos', 'Estruturas de Dados', 'Big-O', 'Grafos']
  }
];

export const SUGGESTED_ARTICLES: ReadingArticleSuggestion[] = [
  {
    id: 'art-big-o-guide',
    title: 'Guia Definitivo de Complexidade Assintótica e Notação Big-O',
    authorOrSource: 'FreeCodeCamp / Computer Science Guide',
    url: 'https://www.freecodecamp.org/news/big-o-notation-why-it-matters-and-why-it-doesnt-1674cfa8a23c/',
    category: 'Algoritmos',
    readTime: '10 min',
    summary: 'Aprenda a analisar como o tempo de execução e o consumo de memória do seu código escalam conforme a entrada (N) cresce exponencialmente.',
    keyTakeaways: [
      'Diferença prática entre O(1), O(log N), O(N), O(N log N) e O(N²)',
      'Como identificar loops aninhados e gargalos de processamento',
      'Trade-offs entre tempo de CPU e uso de memória RAM'
    ],
    level: 'Iniciante',
    tags: ['Big-O', 'Algoritmos', 'Performance', 'Complexidade']
  },
  {
    id: 'art-solid-principles',
    title: 'Os 5 Princípios SOLID explicados com Analogias do Mundo Real',
    authorOrSource: 'Clean Coder Blog / Robert C. Martin',
    url: 'https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html',
    category: 'Engenharia de Software',
    readTime: '12 min',
    summary: 'Entenda os princípios de design de software que garantem código sustentável, modular, fácil de testar e livre de acoplamentos frágeis.',
    keyTakeaways: [
      'Single Responsibility (SRP): cada classe tem um único propósito',
      'Open/Closed (OCP): aberto para extensão, fechado para modificação',
      'Dependency Inversion (DIP): dependa de interfaces, não de implementações concretas'
    ],
    level: 'Intermediário',
    tags: ['SOLID', 'Clean Code', 'Arquitetura', 'Design Patterns']
  },
  {
    id: 'art-rest-http-methods',
    title: 'HTTP Semantics: Métodos Idempotentes, Códigos de Status e Boas Práticas de APIs RESTful',
    authorOrSource: 'MDN Web Docs & IETF RFC Standards',
    url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods',
    category: 'Web & APIs',
    readTime: '8 min',
    summary: 'Guia oficial sobre como desenhar APIs REST elegantes respeitando a semântica correta de verbos como GET, POST, PUT, DELETE e PATCH.',
    keyTakeaways: [
      'Idempotência: por que PUT e DELETE podem ser repetidos com segurança',
      'Status codes 2xx (Sucesso), 4xx (Erro do Cliente) e 5xx (Erro do Servidor)',
      'Headers de segurança e CORS essenciais para navegadores modernos'
    ],
    level: 'Iniciante',
    tags: ['HTTP', 'REST', 'APIs', 'Status Codes', 'Idempotência']
  },
  {
    id: 'art-embedded-robotics-primer',
    title: 'Como Começar em Robótica: Microcontroladores, Sensores e Controle em Tempo Real',
    authorOrSource: 'IEEE Robotics & Automation Society',
    url: 'https://docs.arduino.cc/learn/starting-guide/getting-started-microcontrollers/',
    category: 'Robótica & IoT',
    readTime: '15 min',
    summary: 'Panorama introdutório sobre arquitetura de microcontroladores (Harvard vs Von Neumann), GPIOs digitais/analógicos, PWM, barramentos I2C e SPI.',
    keyTakeaways: [
      'Diferença entre microprocessador (Raspberry Pi) e microcontrolador (Arduino/ESP32)',
      'Protocolos de comunicação serial: UART, I2C e SPI para ligar periféricos',
      'Interrupções de hardware (ISRs) para responder a eventos em tempo real'
    ],
    level: 'Iniciante',
    tags: ['Robótica', 'Microcontroladores', 'GPIO', 'I2C', 'SPI']
  },
  {
    id: 'art-acid-transactions',
    title: 'Bancos de Dados Relacionais: Transações ACID, Níveis de Isolamento e Índices B-Tree',
    authorOrSource: 'PostgreSQL Global Development Group',
    url: 'https://www.postgresql.org/docs/current/tutorial-transactions.html',
    category: 'Bancos de Dados',
    readTime: '11 min',
    summary: 'Como os bancos de dados modernos garantem integridade transacional contra quedas de energia, concorrência agressiva e deadlocks.',
    keyTakeaways: [
      'Atomicidade, Consistência, Isolamento e Durabilidade na prática',
      'Por que índices aceleram leituras mas deixam inserções mais lentas',
      'Como isolamento Read Committed vs Serializable previne leituras fantasmas'
    ],
    level: 'Intermediário',
    tags: ['PostgreSQL', 'ACID', 'SQL', 'Índices', 'Transações']
  }
];
