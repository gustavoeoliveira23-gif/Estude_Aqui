export interface LanguageOfficialLink {
  name: string;
  niche: 'web' | 'robotica' | 'backend' | 'ia_datascience' | 'mobile' | 'banco_dados' | 'devops_cloud' | 'gamedev' | 'seguranca';
  nicheLabel: string;
  officialDocUrl: string;
  officialSiteUrl: string;
  description: string;
  learningResourceUrl?: string;
  learningResourceLabel?: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Todos';
  popularity: string;
  tags: string[];
}

export interface NicheCategory {
  id: 'web' | 'robotica' | 'backend' | 'ia_datascience' | 'mobile' | 'banco_dados' | 'devops_cloud' | 'gamedev' | 'seguranca';
  title: string;
  description: string;
  color: string;
  badge: string;
}

export const NICHE_CATEGORIES: NicheCategory[] = [
  {
    id: 'web',
    title: 'Programação Web & Frontend',
    description: 'Construção de interfaces modernas, aplicações reativas e padrões da Web aberta.',
    color: 'emerald',
    badge: 'Web & UI'
  },
  {
    id: 'robotica',
    title: 'Robótica, Sistemas Embarcados & IoT',
    description: 'Controle de hardware, microcontroladores, sensores, atuadores e sistemas de tempo real.',
    color: 'amber',
    badge: 'Hardware & IoT'
  },
  {
    id: 'backend',
    title: 'Backend, APIs & Microsserviços',
    description: 'Servidores de alto desempenho, arquiteturas distribuídas, regras de negócio e microsserviços.',
    color: 'cyan',
    badge: 'Servidores & APIs'
  },
  {
    id: 'ia_datascience',
    title: 'Inteligência Artificial & Ciência de Dados',
    description: 'Modelos de Machine Learning, Deep Learning, análise de dados e processamento neural.',
    color: 'purple',
    badge: 'IA & Data Science'
  },
  {
    id: 'mobile',
    title: 'Desenvolvimento Mobile (iOS & Android)',
    description: 'Aplicativos nativos e multiplataforma para smartphones, tablets e wearables.',
    color: 'blue',
    badge: 'Mobile Apps'
  },
  {
    id: 'banco_dados',
    title: 'Bancos de Dados & Armazenamento',
    description: 'Modelagem relacional SQL, bancos NoSQL, memória rápida e streaming de dados.',
    color: 'indigo',
    badge: 'Bancos de Dados'
  },
  {
    id: 'devops_cloud',
    title: 'DevOps, Nuvem & Infraestrutura',
    description: 'Contêineres, orquestração, integração contínua (CI/CD) e infraestrutura como código.',
    color: 'teal',
    badge: 'DevOps & Cloud'
  },
  {
    id: 'gamedev',
    title: 'Desenvolvimento de Jogos & Gráficos',
    description: 'Engines de jogos 2D/3D, física, renderização gráfica em tempo real e WebGL.',
    color: 'rose',
    badge: 'Game Dev'
  },
  {
    id: 'seguranca',
    title: 'Segurança da Informação & Redes',
    description: 'Análise de vulnerabilidades, criptografia, defesa cibernética e protocolos seguros.',
    color: 'red',
    badge: 'Segurança & Redes'
  }
];

export const OFFICIAL_LANGUAGES_DATA: LanguageOfficialLink[] = [
  // ==========================================
  // 1. PROGRAMAÇÃO WEB & FRONTEND
  // ==========================================
  {
    name: 'JavaScript (ECMAScript)',
    niche: 'web',
    nicheLabel: 'Programação Web & Frontend',
    officialSiteUrl: 'https://tc39.es/',
    officialDocUrl: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript',
    learningResourceUrl: 'https://javascript.info/',
    learningResourceLabel: 'The Modern JavaScript Tutorial',
    description: 'A linguagem fundamental e padrão da Web. Executada em todos os navegadores e no servidor com Node.js/Deno.',
    level: 'Iniciante',
    popularity: 'Essencial na Web',
    tags: ['JavaScript', 'JS', 'ECMAScript', 'Web', 'Frontend']
  },
  {
    name: 'TypeScript',
    niche: 'web',
    nicheLabel: 'Programação Web & Frontend',
    officialSiteUrl: 'https://www.typescriptlang.org/',
    officialDocUrl: 'https://www.typescriptlang.org/docs/',
    learningResourceUrl: 'https://www.typescriptlang.org/docs/handbook/intro.html',
    learningResourceLabel: 'TypeScript Official Handbook',
    description: 'Superset tipado do JavaScript desenvolvido pela Microsoft que adiciona tipagem estática opcional e escalabilidade.',
    level: 'Intermediário',
    popularity: 'Padrão da Indústria',
    tags: ['TypeScript', 'TS', 'Tipagem', 'Microsoft', 'Full Stack']
  },
  {
    name: 'HTML5 & CSS3',
    niche: 'web',
    nicheLabel: 'Programação Web & Frontend',
    officialSiteUrl: 'https://whatwg.org/',
    officialDocUrl: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML',
    learningResourceUrl: 'https://developer.mozilla.org/pt-BR/docs/Learn',
    learningResourceLabel: 'MDN Web Docs: Guia do Aprendiz',
    description: 'A base estrutural e visual da World Wide Web, mantida pelo W3C e WHATWG com suporte semântico e responsivo.',
    level: 'Iniciante',
    popularity: 'Fundamento Obrigatório',
    tags: ['HTML5', 'CSS3', 'Semântica', 'Flexbox', 'Grid']
  },
  {
    name: 'React.js',
    niche: 'web',
    nicheLabel: 'Programação Web & Frontend',
    officialSiteUrl: 'https://react.dev/',
    officialDocUrl: 'https://react.dev/reference/react',
    learningResourceUrl: 'https://react.dev/learn',
    learningResourceLabel: 'React Official Tutorial & Docs',
    description: 'Biblioteca declarativa baseada em componentes reativos para criação de interfaces de usuário escaláveis.',
    level: 'Iniciante',
    popularity: 'Líder em Frontend',
    tags: ['React', 'Frontend', 'Hooks', 'Componentes', 'JSX']
  },
  {
    name: 'Next.js',
    niche: 'web',
    nicheLabel: 'Programação Web & Frontend',
    officialSiteUrl: 'https://nextjs.org/',
    officialDocUrl: 'https://nextjs.org/docs',
    learningResourceUrl: 'https://nextjs.org/learn',
    learningResourceLabel: 'Next.js Official Interactive Course',
    description: 'Framework React para produção com suporte nativo a Server Components, SSR, rotas estáticas e otimização de imagem.',
    level: 'Intermediário',
    popularity: 'Padrão Full Stack React',
    tags: ['Next.js', 'SSR', 'Server Components', 'Vercel']
  },
  {
    name: 'Vue.js',
    niche: 'web',
    nicheLabel: 'Programação Web & Frontend',
    officialSiteUrl: 'https://vuejs.org/',
    officialDocUrl: 'https://vuejs.org/guide/introduction.html',
    learningResourceUrl: 'https://vuejs.org/tutorial/',
    learningResourceLabel: 'Vue Official Interactive Tutorial',
    description: 'Framework progressivo, acessível e versátil para construção de interfaces web com Composition API.',
    level: 'Iniciante',
    popularity: 'Altamente Popular',
    tags: ['Vue', 'Composition API', 'Frontend', 'Vite']
  },
  {
    name: 'WebAssembly (Wasm)',
    niche: 'web',
    nicheLabel: 'Programação Web & Frontend',
    officialSiteUrl: 'https://webassembly.org/',
    officialDocUrl: 'https://developer.mozilla.org/pt-BR/docs/WebAssembly',
    learningResourceUrl: 'https://developer.mozilla.org/pt-BR/docs/WebAssembly/Concepts',
    learningResourceLabel: 'MDN: Conceitos de WebAssembly',
    description: 'Formato binário de instruções de baixo nível que permite rodar código em C, C++, Rust e Go na web em velocidade nativa.',
    level: 'Avançado',
    popularity: 'Alta Performance Web',
    tags: ['Wasm', 'WebAssembly', 'Performance', 'Rust', 'C++']
  },

  // ==========================================
  // 2. ROBÓTICA, SISTEMAS EMBARCADOS & IOT
  // ==========================================
  {
    name: 'Linguagem C (ISO C)',
    niche: 'robotica',
    nicheLabel: 'Robótica, Sistemas Embarcados & IoT',
    officialSiteUrl: 'https://www.iso.org/standard/74528.html',
    officialDocUrl: 'https://en.cppreference.com/w/c',
    learningResourceUrl: 'https://cs50.harvard.edu/x/2024/weeks/1/',
    learningResourceLabel: 'Harvard CS50 C Module',
    description: 'A espinha dorsal dos sistemas operacionais, microcontroladores, drivers e sistemas de tempo real com acesso direto à memória.',
    level: 'Iniciante',
    popularity: 'Base de Sistemas',
    tags: ['C', 'Embarcados', 'Ponteiros', 'Memória', 'Microcontroladores']
  },
  {
    name: 'C++ (ISO C++20 / C++23)',
    niche: 'robotica',
    nicheLabel: 'Robótica, Sistemas Embarcados & IoT',
    officialSiteUrl: 'https://isocpp.org/',
    officialDocUrl: 'https://en.cppreference.com/w/cpp',
    learningResourceUrl: 'https://www.learncpp.com/',
    learningResourceLabel: 'LearnCpp: Guia Completo e Gratuito',
    description: 'Linguagem de altíssimo desempenho com abstrações de custo zero, templates e orientação a objetos para robótica avançada.',
    level: 'Intermediário',
    popularity: 'Padrão em Robótica & ROS',
    tags: ['C++', 'Robótica', 'ROS', 'Performance', 'Embarcados']
  },
  {
    name: 'Arduino (Wiring / C++)',
    niche: 'robotica',
    nicheLabel: 'Robótica, Sistemas Embarcados & IoT',
    officialSiteUrl: 'https://www.arduino.cc/',
    officialDocUrl: 'https://docs.arduino.cc/programming/',
    learningResourceUrl: 'https://docs.arduino.cc/learn/',
    learningResourceLabel: 'Arduino Official Learn & Tutorials',
    description: 'Plataforma de prototipagem eletrônica open-source com sintaxe intuitiva para controle de sensores e atuadores.',
    level: 'Iniciante',
    popularity: 'Ideal para Iniciantes em Hardware',
    tags: ['Arduino', 'Sensores', 'Atuadores', 'Microcontrolador', 'Eletrônica']
  },
  {
    name: 'ESP32 / ESP-IDF (Espressif)',
    niche: 'robotica',
    nicheLabel: 'Robótica, Sistemas Embarcados & IoT',
    officialSiteUrl: 'https://www.espressif.com/en/products/socs/esp32',
    officialDocUrl: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/',
    learningResourceUrl: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/',
    learningResourceLabel: 'ESP-IDF Getting Started Guide',
    description: 'SoC com Wi-Fi e Bluetooth integrado de baixo custo, rodando FreeRTOS para aplicações profissionais de IoT e robótica conectada.',
    level: 'Intermediário',
    popularity: 'Líder em IoT Conectada',
    tags: ['ESP32', 'FreeRTOS', 'IoT', 'Wi-Fi', 'Bluetooth']
  },
  {
    name: 'ROS 2 (Robot Operating System)',
    niche: 'robotica',
    nicheLabel: 'Robótica, Sistemas Embarcados & IoT',
    officialSiteUrl: 'https://www.ros.org/',
    officialDocUrl: 'https://docs.ros.org/en/humble/',
    learningResourceUrl: 'https://docs.ros.org/en/humble/Tutorials.html',
    learningResourceLabel: 'ROS 2 Official Humble Tutorials',
    description: 'Conjunto de bibliotecas e ferramentas de middleware para criar aplicações robóticas complexas (robôs autônomos, braços, drones).',
    level: 'Avançado',
    popularity: 'Padrão Global em Robótica',
    tags: ['ROS', 'ROS2', 'Robôs Autônomos', 'Cinemática', 'Sensores']
  },
  {
    name: 'MicroPython',
    niche: 'robotica',
    nicheLabel: 'Robótica, Sistemas Embarcados & IoT',
    officialSiteUrl: 'https://micropython.org/',
    officialDocUrl: 'https://docs.micropython.org/',
    learningResourceUrl: 'https://docs.micropython.org/en/latest/esp32/quickref.html',
    learningResourceLabel: 'MicroPython Quick Reference Guide',
    description: 'Implementação enxuta e eficiente de Python 3 otimizada para rodar em microcontroladores como Raspberry Pi Pico e ESP32.',
    level: 'Iniciante',
    popularity: 'Python no Hardware',
    tags: ['MicroPython', 'Python', 'Raspberry Pi Pico', 'ESP32']
  },
  {
    name: 'Embedded Rust',
    niche: 'robotica',
    nicheLabel: 'Robótica, Sistemas Embarcados & IoT',
    officialSiteUrl: 'https://www.rust-lang.org/what/embedded',
    officialDocUrl: 'https://docs.rust-embedded.org/book/',
    learningResourceUrl: 'https://docs.rust-embedded.org/discovery/',
    learningResourceLabel: 'Discovery: Hands-on Embedded Rust',
    description: 'Desenvolvimento de sistemas embarcados seguros contra falhas de memória e concorrência sem necessidade de coletor de lixo.',
    level: 'Avançado',
    popularity: 'Futuro dos Embarcados Seguros',
    tags: ['Rust', 'Embedded', 'Memory Safety', 'Sem Coletor de Lixo']
  },

  // ==========================================
  // 3. BACKEND, APIS & MICROSSERVIÇOS
  // ==========================================
  {
    name: 'Python',
    niche: 'backend',
    nicheLabel: 'Backend, APIs & Microsserviços',
    officialSiteUrl: 'https://www.python.org/',
    officialDocUrl: 'https://docs.python.org/pt-br/3/',
    learningResourceUrl: 'https://docs.python.org/pt-br/3/tutorial/index.html',
    learningResourceLabel: 'Python Official Tutorial em Português',
    description: 'Linguagem de propósito geral de altíssima produtividade com sintaxe limpa, vasta comunidade e ecossistema rico para web e automação.',
    level: 'Iniciante',
    popularity: 'Líder Global em Ensino & Backend',
    tags: ['Python', 'Django', 'FastAPI', 'Flask', 'Backend']
  },
  {
    name: 'Node.js',
    niche: 'backend',
    nicheLabel: 'Backend, APIs & Microsserviços',
    officialSiteUrl: 'https://nodejs.org/',
    officialDocUrl: 'https://nodejs.org/docs/latest/api/',
    learningResourceUrl: 'https://nodejs.org/en/learn',
    learningResourceLabel: 'Node.js Official Learn Track',
    description: 'Ambiente de execução JavaScript assíncrono e orientada a eventos construído sobre o motor V8 do Google Chrome.',
    level: 'Iniciante',
    popularity: 'Muito Usado na Indústria',
    tags: ['Node.js', 'Express', 'Event Loop', 'JavaScript', 'NPM']
  },
  {
    name: 'Java (OpenJDK / Oracle)',
    niche: 'backend',
    nicheLabel: 'Backend, APIs & Microsserviços',
    officialSiteUrl: 'https://openjdk.org/',
    officialDocUrl: 'https://docs.oracle.com/en/java/javase/21/docs/api/',
    learningResourceUrl: 'https://dev.java/learn/',
    learningResourceLabel: 'Dev.java: Portal de Aprendizagem Oficial',
    description: 'Linguagem robusta, orientada a objetos e amplamente adotada em grandes sistemas corporativos com o Spring Boot.',
    level: 'Intermediário',
    popularity: 'Dominante no Corporativo',
    tags: ['Java', 'Spring Boot', 'JVM', 'OOP', 'Microsserviços']
  },
  {
    name: 'C# & .NET (Microsoft)',
    niche: 'backend',
    nicheLabel: 'Backend, APIs & Microsserviços',
    officialSiteUrl: 'https://dotnet.microsoft.com/',
    officialDocUrl: 'https://learn.microsoft.com/pt-br/dotnet/csharp/',
    learningResourceUrl: 'https://learn.microsoft.com/pt-br/training/dotnet/',
    learningResourceLabel: 'Microsoft Learn: Trilhas Gratuitas de .NET',
    description: 'Linguagem moderna, fortemente tipada e multiplataforma para construção de APIs corporativas, jogos (Unity) e serviços em nuvem.',
    level: 'Intermediário',
    popularity: 'Top Corporativo & Cloud',
    tags: ['C#', '.NET', 'Microsoft', 'ASP.NET', 'APIs']
  },
  {
    name: 'Go (Golang - Google)',
    niche: 'backend',
    nicheLabel: 'Backend, APIs & Microsserviços',
    officialSiteUrl: 'https://go.dev/',
    officialDocUrl: 'https://go.dev/doc/',
    learningResourceUrl: 'https://go.dev/tour/welcome/1',
    learningResourceLabel: 'A Tour of Go: Tour Interativo Oficial',
    description: 'Criada pelo Google para concorrência de altíssimo desempenho (Goroutines) e compilação em binários nativos rápidos.',
    level: 'Intermediário',
    popularity: 'Líder em Cloud & Kubernetes',
    tags: ['Go', 'Golang', 'Concorrência', 'Goroutines', 'Google']
  },
  {
    name: 'Rust',
    niche: 'backend',
    nicheLabel: 'Backend, APIs & Microsserviços',
    officialSiteUrl: 'https://www.rust-lang.org/',
    officialDocUrl: 'https://doc.rust-lang.org/book/',
    learningResourceUrl: 'https://doc.rust-lang.org/rust-by-example/',
    learningResourceLabel: 'Rust by Example Tutorial',
    description: 'Linguagem de sistemas com foco absoluto em segurança de memória, ausência de falhas de concorrência e zero-cost abstractions.',
    level: 'Avançado',
    popularity: 'Mais Amada pelos Desenvolvedores',
    tags: ['Rust', 'Ownership', 'Borrow Checker', 'Alta Performance']
  },
  {
    name: 'PHP',
    niche: 'backend',
    nicheLabel: 'Backend, APIs & Microsserviços',
    officialSiteUrl: 'https://www.php.net/',
    officialDocUrl: 'https://www.php.net/manual/pt_BR/',
    learningResourceUrl: 'https://laravel.com/docs',
    learningResourceLabel: 'Laravel Framework Documentation',
    description: 'Uma das linguagens mais difundidas na web, alimentando WordPress, Laravel e grande parte dos serviços web mundiais.',
    level: 'Iniciante',
    popularity: 'Presente em ~75% da Web',
    tags: ['PHP', 'Laravel', 'Web', 'Servidores', 'WordPress']
  },

  // ==========================================
  // 4. IA & CIÊNCIA DE DADOS
  // ==========================================
  {
    name: 'PyTorch (Linux Foundation)',
    niche: 'ia_datascience',
    nicheLabel: 'Inteligência Artificial & Ciência de Dados',
    officialSiteUrl: 'https://pytorch.org/',
    officialDocUrl: 'https://pytorch.org/docs/stable/index.html',
    learningResourceUrl: 'https://pytorch.org/tutorials/',
    learningResourceLabel: 'PyTorch Official Deep Learning Tutorials',
    description: 'Framework de tensores e redes neurais profundas com grafos de computação dinâmica, líder em pesquisas de IA de ponta.',
    level: 'Avançado',
    popularity: 'Líder em Pesquisa e LLMs',
    tags: ['PyTorch', 'Deep Learning', 'Redes Neurais', 'Tensors', 'IA']
  },
  {
    name: 'TensorFlow & Keras (Google)',
    niche: 'ia_datascience',
    nicheLabel: 'Inteligência Artificial & Ciência de Dados',
    officialSiteUrl: 'https://www.tensorflow.org/',
    officialDocUrl: 'https://www.tensorflow.org/api_docs',
    learningResourceUrl: 'https://www.tensorflow.org/tutorials',
    learningResourceLabel: 'TensorFlow Core Tutorials',
    description: 'Plataforma completa de aprendizado de máquina para treinamento e implantação de modelos em larga escala.',
    level: 'Avançado',
    popularity: 'Muito Usado em Produção',
    tags: ['TensorFlow', 'Keras', 'Google', 'Machine Learning']
  },
  {
    name: 'Scikit-Learn',
    niche: 'ia_datascience',
    nicheLabel: 'Inteligência Artificial & Ciência de Dados',
    officialSiteUrl: 'https://scikit-learn.org/stable/',
    officialDocUrl: 'https://scikit-learn.org/stable/user_guide.html',
    learningResourceUrl: 'https://scikit-learn.org/stable/tutorial/index.html',
    learningResourceLabel: 'Scikit-learn User Guide & Tutorial',
    description: 'Biblioteca padrão para algoritmos clássicos de Machine Learning: Regressão, Classificação, Clustering e Redução de Dimensionalidade.',
    level: 'Intermediário',
    popularity: 'Padrão em Machine Learning Clássico',
    tags: ['Scikit-Learn', 'Classificação', 'Regressão', 'Python']
  },
  {
    name: 'Pandas & NumPy',
    niche: 'ia_datascience',
    nicheLabel: 'Inteligência Artificial & Ciência de Dados',
    officialSiteUrl: 'https://pandas.pydata.org/',
    officialDocUrl: 'https://pandas.pydata.org/docs/',
    learningResourceUrl: 'https://numpy.org/doc/stable/user/absolute_beginners.html',
    learningResourceLabel: 'NumPy for Absolute Beginners',
    description: 'Fundamentos de computação matricial e manipulação de DataFrames para análise exploratória e engenharia de features.',
    level: 'Iniciante',
    popularity: 'Base de Toda Análise em Python',
    tags: ['Pandas', 'NumPy', 'DataFrames', 'Matrizes', 'Estatística']
  },
  {
    name: 'R Language',
    niche: 'ia_datascience',
    nicheLabel: 'Inteligência Artificial & Ciência de Dados',
    officialSiteUrl: 'https://www.r-project.org/',
    officialDocUrl: 'https://cran.r-project.org/manuals.html',
    learningResourceUrl: 'https://r4ds.hadley.nz/',
    learningResourceLabel: 'R for Data Science (Hadley Wickham)',
    description: 'Linguagem e ambiente para computação estatística, visualização gráfica avançada (ggplot2) e bioinformática.',
    level: 'Intermediário',
    popularity: 'Padrão Acadêmico e Estatístico',
    tags: ['R', 'Estatística', 'ggplot2', 'Bioinformática']
  },
  {
    name: 'Julia Language',
    niche: 'ia_datascience',
    nicheLabel: 'Inteligência Artificial & Ciência de Dados',
    officialSiteUrl: 'https://julialang.org/',
    officialDocUrl: 'https://docs.julialang.org/',
    learningResourceUrl: 'https://julialang.org/learning/',
    learningResourceLabel: 'Julia Learning Resources',
    description: 'Projetada para combinar a facilidade do Python com a velocidade bruta do C em computação científica e álgebra linear.',
    level: 'Avançado',
    popularity: 'Alta Performance Científica',
    tags: ['Julia', 'Computação Científica', 'Performance']
  },

  // ==========================================
  // 5. DESENVOLVIMENTO MOBILE
  // ==========================================
  {
    name: 'Kotlin (Android)',
    niche: 'mobile',
    nicheLabel: 'Desenvolvimento Mobile',
    officialSiteUrl: 'https://kotlinlang.org/',
    officialDocUrl: 'https://developer.android.com/kotlin',
    learningResourceUrl: 'https://developer.android.com/courses/android-basics-compose/course',
    learningResourceLabel: 'Android Basics with Jetpack Compose',
    description: 'Linguagem oficial recomendada pelo Google para desenvolvimento Android, com suporte nativo a Jetpack Compose e Coroutines.',
    level: 'Iniciante',
    popularity: 'Líder Oficial Android',
    tags: ['Kotlin', 'Android', 'Jetpack Compose', 'Google']
  },
  {
    name: 'Swift (iOS & macOS - Apple)',
    niche: 'mobile',
    nicheLabel: 'Desenvolvimento Mobile',
    officialSiteUrl: 'https://www.swift.org/',
    officialDocUrl: 'https://developer.apple.com/documentation/swift',
    learningResourceUrl: 'https://developer.apple.com/tutorials/swiftui',
    learningResourceLabel: 'SwiftUI Official Interactive Tutorials',
    description: 'Linguagem intuitiva e segura criada pela Apple para construir apps para iOS, iPadOS, macOS, watchOS e visionOS com SwiftUI.',
    level: 'Iniciante',
    popularity: 'Padrão Oficial Apple',
    tags: ['Swift', 'iOS', 'SwiftUI', 'Apple', 'Mobile']
  },
  {
    name: 'Flutter & Dart (Google)',
    niche: 'mobile',
    nicheLabel: 'Desenvolvimento Mobile',
    officialSiteUrl: 'https://flutter.dev/',
    officialDocUrl: 'https://docs.flutter.dev/',
    learningResourceUrl: 'https://docs.flutter.dev/get-started/codelab',
    learningResourceLabel: 'Write Your First Flutter App',
    description: 'SDK do Google para criar aplicações compiladas nativamente para mobile, web e desktop a partir de uma única base de código em Dart.',
    level: 'Iniciante',
    popularity: 'Líder Multiplataforma',
    tags: ['Flutter', 'Dart', 'Multiplataforma', 'Google']
  },
  {
    name: 'React Native',
    niche: 'mobile',
    nicheLabel: 'Desenvolvimento Mobile',
    officialSiteUrl: 'https://reactnative.dev/',
    officialDocUrl: 'https://reactnative.dev/docs/getting-started',
    learningResourceUrl: 'https://reactnative.dev/docs/tutorial',
    learningResourceLabel: 'React Native Official Tutorial',
    description: 'Framework da Meta para desenvolvimento de apps nativos para iOS e Android utilizando React e JavaScript.',
    level: 'Intermediário',
    popularity: 'Muito Popular no Mercado',
    tags: ['React Native', 'Mobile', 'JavaScript', 'Meta']
  },

  // ==========================================
  // 6. BANCOS DE DADOS & ARMAZENAMENTO
  // ==========================================
  {
    name: 'PostgreSQL',
    niche: 'banco_dados',
    nicheLabel: 'Bancos de Dados & Armazenamento',
    officialSiteUrl: 'https://www.postgresql.org/',
    officialDocUrl: 'https://www.postgresql.org/docs/current/',
    learningResourceUrl: 'https://www.postgresqltutorial.com/',
    learningResourceLabel: 'PostgreSQL Tutorial Interativo',
    description: 'O banco de dados relacional e objeto-relacional open source mais avançado do mundo, com suporte estrito a ACID e índices GIN/GiST.',
    level: 'Iniciante',
    popularity: 'Banco Relacional Favorito',
    tags: ['PostgreSQL', 'SQL', 'ACID', 'JSONB', 'Modelagem']
  },
  {
    name: 'MySQL',
    niche: 'banco_dados',
    nicheLabel: 'Bancos de Dados & Armazenamento',
    officialSiteUrl: 'https://www.mysql.com/',
    officialDocUrl: 'https://dev.mysql.com/doc/',
    learningResourceUrl: 'https://dev.mysql.com/doc/refman/8.0/en/tutorial.html',
    learningResourceLabel: 'MySQL Official Tutorial Guide',
    description: 'O sistema de gerenciamento de banco de dados relacional mais popular do mundo, amplamente utilizado na web tradicional.',
    level: 'Iniciante',
    popularity: 'Altamente Difundido',
    tags: ['MySQL', 'SQL', 'Oracle', 'Web', 'Relacional']
  },
  {
    name: 'SQLite',
    niche: 'banco_dados',
    nicheLabel: 'Bancos de Dados & Armazenamento',
    officialSiteUrl: 'https://www.sqlite.org/',
    officialDocUrl: 'https://www.sqlite.org/docs.html',
    learningResourceUrl: 'https://www.sqlite.org/quickstart.html',
    learningResourceLabel: 'SQLite Quickstart Tutorial',
    description: 'Motor de banco de dados SQL embutido em arquivo único sem necessidade de processo de servidor separado, presente em bilhões de dispositivos.',
    level: 'Iniciante',
    popularity: 'O Mais Instalado do Mundo',
    tags: ['SQLite', 'Embutido', 'Mobile', 'Arquivo Único']
  },
  {
    name: 'MongoDB',
    niche: 'banco_dados',
    nicheLabel: 'Bancos de Dados & Armazenamento',
    officialSiteUrl: 'https://www.mongodb.com/',
    officialDocUrl: 'https://www.mongodb.com/docs/manual/',
    learningResourceUrl: 'https://learn.mongodb.com/',
    learningResourceLabel: 'MongoDB University: Cursos Oficiais Gratuitos',
    description: 'Banco de dados NoSQL baseado em documentos JSON/BSON com esquema flexível para escalabilidade horizontal.',
    level: 'Iniciante',
    popularity: 'Líder em Documentos NoSQL',
    tags: ['MongoDB', 'NoSQL', 'Documentos', 'JSON', 'Escalabilidade']
  },
  {
    name: 'Redis',
    niche: 'banco_dados',
    nicheLabel: 'Bancos de Dados & Armazenamento',
    officialSiteUrl: 'https://redis.io/',
    officialDocUrl: 'https://redis.io/docs/',
    learningResourceUrl: 'https://redis.io/learn',
    learningResourceLabel: 'Redis University & Learn Tracks',
    description: 'Armazenamento de estrutura de dados em memória (chave-valor, listas, sets, hashes) usado como cache ultrarrápido e mensageria.',
    level: 'Intermediário',
    popularity: 'Padrão em Cache & Sessões',
    tags: ['Redis', 'In-Memory', 'Cache', 'PubSub', 'Chave-Valor']
  },

  // ==========================================
  // 7. DEVOPS, NUVEM & INFRAESTRUTURA
  // ==========================================
  {
    name: 'Linux (Kernel & GNU)',
    niche: 'devops_cloud',
    nicheLabel: 'DevOps, Nuvem & Infraestrutura',
    officialSiteUrl: 'https://www.kernel.org/',
    officialDocUrl: 'https://www.gnu.org/manual/',
    learningResourceUrl: 'https://linuxjourney.com/',
    learningResourceLabel: 'Linux Journey: Guia Interativo Gratuito',
    description: 'O sistema operacional que alimenta a infraestrutura de nuvem, servidores web, supercomputadores e contêineres.',
    level: 'Iniciante',
    popularity: 'Fundamento dos Servidores',
    tags: ['Linux', 'Bash', 'Shell', 'Kernel', 'Terminal']
  },
  {
    name: 'Docker',
    niche: 'devops_cloud',
    nicheLabel: 'DevOps, Nuvem & Infraestrutura',
    officialSiteUrl: 'https://www.docker.com/',
    officialDocUrl: 'https://docs.docker.com/',
    learningResourceUrl: 'https://docs.docker.com/get-started/',
    learningResourceLabel: 'Docker Get Started Official Guide',
    description: 'Plataforma de conteinerização que empacota aplicações e suas dependências em ambientes isolados e reproduzíveis.',
    level: 'Iniciante',
    popularity: 'Padrão em Contêineres',
    tags: ['Docker', 'Contêineres', 'Dockerfile', 'DevOps']
  },
  {
    name: 'Kubernetes (K8s)',
    niche: 'devops_cloud',
    nicheLabel: 'DevOps, Nuvem & Infraestrutura',
    officialSiteUrl: 'https://kubernetes.io/',
    officialDocUrl: 'https://kubernetes.io/docs/home/',
    learningResourceUrl: 'https://kubernetes.io/docs/tutorials/',
    learningResourceLabel: 'Kubernetes Official Interactive Tutorials',
    description: 'Sistema open source de orquestração para automatizar a implantação, escalonamento e gestão de aplicações em contêineres.',
    level: 'Avançado',
    popularity: 'Padrão em Orquestração de Nuvem',
    tags: ['Kubernetes', 'K8s', 'Orquestração', 'Microsserviços', 'Cloud']
  },
  {
    name: 'Git & GitHub',
    niche: 'devops_cloud',
    nicheLabel: 'DevOps, Nuvem & Infraestrutura',
    officialSiteUrl: 'https://git-scm.com/',
    officialDocUrl: 'https://git-scm.com/doc',
    learningResourceUrl: 'https://git-scm.com/book/pt-br/v2',
    learningResourceLabel: 'Pro Git Book em Português Oficial',
    description: 'Sistema de controle de versões distribuído essencial para colaboração em equipe e rastreamento de código-fonte.',
    level: 'Iniciante',
    popularity: 'Universal em Programação',
    tags: ['Git', 'GitHub', 'Versionamento', 'Commits', 'Branches']
  },

  // ==========================================
  // 8. DESENVOLVIMENTO DE JOGOS & GRÁFICOS
  // ==========================================
  {
    name: 'Godot Engine (GDScript / C#)',
    niche: 'gamedev',
    nicheLabel: 'Desenvolvimento de Jogos & Gráficos',
    officialSiteUrl: 'https://godotengine.org/',
    officialDocUrl: 'https://docs.godotengine.org/',
    learningResourceUrl: 'https://docs.godotengine.org/en/stable/getting_started/introduction/index.html',
    learningResourceLabel: 'Godot Getting Started Official Step-by-Step',
    description: 'Engine de jogos 2D e 3D open-source, leve, moderna e sem royalties, com linguagem GDScript e suporte a C#.',
    level: 'Iniciante',
    popularity: 'A Engine Open Source Mais Popular',
    tags: ['Godot', 'GDScript', '2D', '3D', 'Game Dev']
  },
  {
    name: 'Unreal Engine (Epic Games / C++)',
    niche: 'gamedev',
    nicheLabel: 'Desenvolvimento de Jogos & Gráficos',
    officialSiteUrl: 'https://www.unrealengine.com/',
    officialDocUrl: 'https://dev.epicgames.com/documentation/unreal-engine',
    learningResourceUrl: 'https://dev.epicgames.com/community/learning',
    learningResourceLabel: 'Epic Dev Community Learning Courses',
    description: 'A engine AAA mais avançada do mundo para gráficos fotorrealistas em tempo real, iluminação Nanite/Lumen e física.',
    level: 'Avançado',
    popularity: 'Líder em Gráficos AAA & Cinema',
    tags: ['Unreal Engine', 'C++', 'Blueprints', 'Lumen', 'AAA Games']
  },
  {
    name: 'Unity (C#)',
    niche: 'gamedev',
    nicheLabel: 'Desenvolvimento de Jogos & Gráficos',
    officialSiteUrl: 'https://unity.com/',
    officialDocUrl: 'https://docs.unity3d.com/Manual/index.html',
    learningResourceUrl: 'https://learn.unity.com/',
    learningResourceLabel: 'Unity Learn: Cursos e Projetos Oficiais',
    description: 'Engine multiplataforma consagrada para criação de jogos 2D, 3D, realidade virtual (VR) e aumentada (AR).',
    level: 'Intermediário',
    popularity: 'Muito Difundida no Mercado Mobile e Indie',
    tags: ['Unity', 'C#', 'Mobile Games', 'VR', 'AR']
  },

  // ==========================================
  // 9. SEGURANÇA DA INFORMAÇÃO & REDES
  // ==========================================
  {
    name: 'OWASP (Web Security Standards)',
    niche: 'seguranca',
    nicheLabel: 'Segurança da Informação & Redes',
    officialSiteUrl: 'https://owasp.org/',
    officialDocUrl: 'https://owasp.org/www-project-top-ten/',
    learningResourceUrl: 'https://owasp.org/www-project-web-security-testing-guide/',
    learningResourceLabel: 'OWASP Web Security Testing Guide',
    description: 'Fundação mundial que padroniza os principais riscos de segurança (SQL Injection, XSS, Broken Auth) e boas práticas defensivas.',
    level: 'Intermediário',
    popularity: 'Padrão Internacional de Segurança',
    tags: ['OWASP', 'Segurança', 'Hacking Ético', 'Vulnerabilidades']
  },
  {
    name: 'Kali Linux',
    niche: 'seguranca',
    nicheLabel: 'Segurança da Informação & Redes',
    officialSiteUrl: 'https://www.kali.org/',
    officialDocUrl: 'https://www.kali.org/docs/',
    learningResourceUrl: 'https://www.kali.org/get-kali/',
    learningResourceLabel: 'Kali Linux Official Documentation',
    description: 'Distribuição Linux voltada para testes de intrusão, auditoria de segurança, perícia digital e engenharia reversa.',
    level: 'Intermediário',
    popularity: 'Padrão em Pentest',
    tags: ['Kali Linux', 'Pentest', 'Auditoria', 'Cibersegurança']
  },
  {
    name: 'Wireshark',
    niche: 'seguranca',
    nicheLabel: 'Segurança da Informação & Redes',
    officialSiteUrl: 'https://www.wireshark.org/',
    officialDocUrl: 'https://www.wireshark.org/docs/',
    learningResourceUrl: 'https://www.wireshark.org/docs/wsug_html_chunked/',
    learningResourceLabel: "Wireshark User's Guide",
    description: 'Analisador de protocolos de rede mais utilizado do mundo para inspeção profunda de tráfego em tempo real.',
    level: 'Intermediário',
    popularity: 'Essencial para Análise de Redes',
    tags: ['Wireshark', 'TCP/IP', 'Pacotes', 'Redes', 'Análise']
  }
];
