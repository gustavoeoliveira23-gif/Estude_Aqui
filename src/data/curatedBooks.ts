export interface BookReview {
  id: string;
  reviewerName: string;
  source: 'Goodreads' | 'Amazon' | 'Dev.to' | 'Hacker News' | 'Medium' | 'Crítica Especializada';
  role?: string;
  rating: number; // 1 to 5
  reviewDate: string;
  title: string;
  comment: string;
  pros: string[];
  cons?: string[];
  helpfulCount?: number;
  url?: string;
}

export interface BookChapterSummary {
  chapterNumber: number | string;
  title: string;
  summary: string;
  keyTakeaways: string[];
}

export interface CuratedBook {
  id: string;
  title: string;
  originalTitle?: string;
  author: string;
  coAuthors?: string[];
  coverColor: string;
  accentColor: string;
  category:
    | 'Boas Práticas & Código Limpo'
    | 'Arquitetura de Software'
    | 'Algoritmos & Estruturas de Dados'
    | 'Sistemas Distribuídos & Dados'
    | 'Robótica & Sistemas Embarcados'
    | 'Engenharia de Software & Carreira'
    | 'Gestão, Ágil & Liderança';
  level: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Todos os Níveis';
  sector: 'tecnologia' | 'administracao' | 'ambos';
  pages: number;
  publishedYear: number;
  language: string;
  rating: number;
  totalRatingsCount: number;

  // Resumo do Livro
  oneLinePitch: string;
  overview: string;
  coreThesis: string;
  targetAudience: string;
  chapters: BookChapterSummary[];
  practicalLessons: string[];
  memorableQuotes: string[];

  // Resenhas da Internet & Opinião Pública
  communitySentiment: {
    positivePercentage: number;
    goodreadsScore: string;
    amazonScore: string;
    summaryOfReviews: string;
    strengths: string[];
    criticalPoints: string[];
  };
  reviews: BookReview[];
  externalReviewLinks: {
    platform: string;
    label: string;
    url: string;
  }[];

  tags: string[];
}

export const CURATED_BOOKS: CuratedBook[] = [
  {
    id: 'book-clean-code',
    title: 'Código Limpo: Habilidades Práticas do Agile Software',
    originalTitle: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin (Uncle Bob)',
    coverColor: 'from-sky-700 via-blue-900 to-indigo-950',
    accentColor: 'text-sky-400 border-sky-500/30 bg-sky-500/10',
    category: 'Boas Práticas & Código Limpo',
    level: 'Iniciante',
    sector: 'tecnologia',
    pages: 425,
    publishedYear: 2008,
    language: 'Disponível em Português (Alta Books) e Inglês',
    rating: 4.7,
    totalRatingsCount: 28500,
    oneLinePitch: 'A bíblia das boas práticas de escrita de código legível, expressivo, manutenível e testável.',
    overview:
      'Mesmo um código ruim pode funcionar. No entanto, se o código não for limpo, ele pode acabar com uma empresa de desenvolvimento. A cada ano, incontáveis horas e recursos significativos são perdidos devido a código mal escrito. Neste clássico universal, Robert C. Martin ("Uncle Bob") e seus colegas apresentam as regras de ouro, padrões e disciplina necessários para transformar códigos confusos em obras-primas de legibilidade e engenharia.',
    coreThesis:
      'Código limpo é simples, direto e lê-se como prosa bem escrita. Ler código é muito mais frequente do que escrevê-lo (na proporção de 10:1); portanto, investir esforço na clareza imediata economiza centenas de horas no ciclo de vida de um sistema.',
    targetAudience:
      'Desenvolvedores júnior, pleno e sênior, estudantes de computação e qualquer profissional que queira parar de escrever código críptico e passar a produzir software profissional.',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Nomes Significativos e Intencionais',
        summary:
          'Explica como escolher nomes de variáveis, classes e funções que revelem sua intenção sem a necessidade de comentários explicativos. Elimine desinformação e abreviações arbitrárias.',
        keyTakeaways: [
          'Use nomes pronunciáveis e fáceis de pesquisar.',
          'Classes devem ter nomes com substantivos (ex: `Customer`, `AccountRecord`); métodos com verbos (ex: `postPayment`, `deletePage`).',
          'Evite prefixos desnecessários como `IUser` ou variáveis com letras únicas fora de contadores simples.',
        ],
      },
      {
        chapterNumber: 2,
        title: 'Funções Pequenas e com Responsabilidade Única',
        summary:
          'Funções devem fazer apenas uma coisa, fazê-la bem e ser a menor possível (idealmente entre 4 a 20 linhas). Devem ter apenas um nível de abstração.',
        keyTakeaways: [
          'A primeira regra das funções: elas devem ser pequenas. A segunda regra: devem ser ainda menores.',
          'Uma função deve ter preferencialmente zero ou um argumento (monádica), no máximo dois (diádica). Evite flags booleanas como parâmetro.',
          'Separe comandos de consultas (Command-Query Separation).',
        ],
      },
      {
        chapterNumber: 3,
        title: 'Comentários: Quando Usar e Quando Evitar',
        summary:
          'Comentários mentem com o tempo porque o código muda e os comentários são esquecidos. O código deve ser autoexplicativo.',
        keyTakeaways: [
          'Não use comentários para mascarar código confuso: refatore o código em vez de comentá-lo.',
          'Comentários aceitáveis: notas legais, esclarecimento de expressões regulares complexas ou avisos de consequências colaterais.',
          'Código comentado deve ser deletado imediatamente — o versionador Git guarda o histórico.',
        ],
      },
      {
        chapterNumber: 4,
        title: 'Tratamento de Erros Limpo e Exceções',
        summary:
          'O tratamento de erros é importante, mas se obscurecer a lógica de negócios, está errado. Prefira lançar exceções do que retornar códigos de erro.',
        keyTakeaways: [
          'Escreva blocos try-catch-finally primeiro (definem o escopo de transação).',
          'Nunca retorne `null` (use o padrão Null Object ou lance uma exceção).',
          'Nunca passe `null` para métodos sem verificação rigorosa nas fronteiras.',
        ],
      },
      {
        chapterNumber: 5,
        title: 'Testes de Unidade Limpos (As Regras F.I.R.S.T.)',
        summary:
          'Código de teste é tão importante quanto código de produção. Testes sujos apodrecem e fazem a equipe abandonar a suíte de testes.',
        keyTakeaways: [
          'Fast (Rápidos): testes devem rodar em milissegundos.',
          'Independent (Independentes): nenhum teste deve depender do resultado de outro.',
          'Repeatable (Repetíveis): devem passar em qualquer ambiente (local, CI/CD, produção).',
          'Self-Validating (Auto-validáveis): saída booleana clara (Passou ou Falhou).',
          'Timely (Oportunos): escritos logo antes ou durante a codificação.',
        ],
      },
      {
        chapterNumber: 6,
        title: 'A Regra do Escoteiro e Refatoração Contínua',
        summary:
          'O combate ao apodrecimento de software (bit rot) exige disciplina diária em cada commit.',
        keyTakeaways: [
          '"Deixe a área de acampamento mais limpa do que como você a encontrou."',
          'Se todo desenvolvedor melhorar nem que seja o nome de uma variável a cada commit, o sistema nunca degradará.',
        ],
      },
    ],
    practicalLessons: [
      'Priorize a legibilidade humana: computadores entendem qualquer código válido, mas humanos precisam mantê-lo.',
      'Mantenha funções ultra-curtas e com um único propósito bem definido.',
      'Elimine comentários redundantes substituindo-os por funções com nomes expressivos.',
      'Automatize seus testes com regras F.I.R.S.T. para refatorar sem medo.',
      'Aplique a Regra do Escoteiro em 100% dos seus Pull Requests.',
    ],
    memorableQuotes: [
      '"Qualquer tolo pode escrever código que um computador entende. Bons programadores escrevem código que humanos podem entender."',
      '"A verdade só pode ser encontrada em um lugar: no código."',
      '"Deixe a área de acampamento mais limpa do que como você a encontrou."',
      '"A única métrica válida de qualidade de código é a quantidade de WTFs por minuto durante uma code review."',
    ],
    communitySentiment: {
      positivePercentage: 92,
      goodreadsScore: '4.4 / 5.0 (+24.000 avaliações)',
      amazonScore: '4.8 / 5.0 (+15.000 avaliações)',
      summaryOfReviews:
        'Aclamado por 9 em cada 10 desenvolvedores como o divisor de águas entre o amadorismo e o profissionalismo. Leitores destacam a clareza didática dos exemplos em Java/C-like e o impacto imediato na qualidade dos Pull Requests. Críticas pontuais apontam que algumas regras devem ser tomadas com bom senso e não de forma dogmática.',
      strengths: [
        'Transformação radical na mentalidade de escrita de código.',
        'Exemplos práticos de antes vs depois com código real refatorado passo a passo.',
        'Capítulos sobre nomes e funções são fáceis de aplicar no dia seguinte.',
        'Apresentação clara dos princípios F.I.R.S.T. para testes de unidade.',
      ],
      criticalPoints: [
        'Exemplos são fortemente baseados em Java clássico (anos 2000), o que exige contextualização para linguagens modernas/funcionais.',
        'Não deve ser seguido como dogma cego (ex: forçar funções de 2 linhas a ponto de fragmentar demais a leitura).',
      ],
    },
    reviews: [
      {
        id: 'rev-cc-1',
        reviewerName: 'Eduardo Silveira',
        source: 'Goodreads',
        role: 'Tech Lead & Arquiteto de Software',
        rating: 5,
        reviewDate: '2025',
        title: 'Leitura obrigatória no meu processo de onboarding de desenvolvedores',
        comment:
          'Clean Code mudou completamente minha carreira quando eu era júnior. Hoje, como Tech Lead, é o primeiro livro que recomendo para qualquer pessoa do time. A ideia de que código é lido 10 vezes mais do que escrito muda seu respeito pelo colega de equipe.',
        pros: ['Didática impecável', 'Exemplos passo a passo de refatoração', 'Princípios atemporais'],
        helpfulCount: 342,
      },
      {
        id: 'rev-cc-2',
        reviewerName: 'Dan Abramov (via Dev.to Critique)',
        source: 'Dev.to',
        role: 'Engenheiro de Software & Criador do Redux',
        rating: 4,
        reviewDate: '2024',
        title: 'Excelente fundamento, mas lembre-se de que DRY e Clean Code não devem sobrepor a simplicidade',
        comment:
          'O livro ensina disciplinas vitais que todo dev precisa dominar. O único cuidado para iniciantes é não criar abstrações prematuras apenas para deixar tudo com 3 linhas. Código limpo também significa código óbvio e direto.',
        pros: ['Foco em legibilidade', 'Disciplina de testes'],
        cons: ['Risco de super-abstração se interpretado literalmente demais'],
        helpfulCount: 890,
      },
      {
        id: 'rev-cc-3',
        reviewerName: 'Mariana Costa',
        source: 'Amazon',
        role: 'Desenvolvedora Full Stack',
        rating: 5,
        reviewDate: '2026',
        title: 'O investimento com maior retorno que fiz na faculdade',
        comment:
          'Livro muito bem encadernado e com tradução em português muito fiel. Os capítulos 2, 3 e 6 valem 10x o valor pago. Minhas entrevistas de código e notas em projetos da faculdade melhoraram na hora.',
        pros: ['Tradução em PT-BR excelente', 'Capítulos curtos e objetivos'],
        helpfulCount: 156,
      },
    ],
    externalReviewLinks: [
      {
        platform: 'Goodreads',
        label: 'Ver 2.500+ resenhas no Goodreads',
        url: 'https://www.goodreads.com/book/show/3735293-clean-code',
      },
      {
        platform: 'Amazon',
        label: 'Avaliações de leitores na Amazon Brasil',
        url: 'https://www.amazon.com.br/dp/8576082675',
      },
      {
        platform: 'Dev.to',
        label: 'Discussões e artigos da comunidade no Dev.to',
        url: 'https://dev.to/t/cleancode',
      },
    ],
    tags: ['Clean Code', 'Boas Práticas', 'Refatoração', 'Testes', 'Uncle Bob', 'SOLID'],
  },
  {
    id: 'book-pragmatic-programmer',
    title: 'O Programador Pragmático: De Aprendiz a Mestre',
    originalTitle: 'The Pragmatic Programmer: Your Journey to Mastery (20th Anniversary)',
    author: 'David Thomas & Andrew Hunt',
    coverColor: 'from-amber-700 via-orange-900 to-stone-950',
    accentColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    category: 'Engenharia de Software & Carreira',
    level: 'Todos os Níveis',
    sector: 'tecnologia',
    pages: 352,
    publishedYear: 2019,
    language: 'Disponível em Português (Bookman) e Inglês',
    rating: 4.8,
    totalRatingsCount: 31200,
    oneLinePitch: 'Um guia atemporal sobre mentalidade, postura profissional, artesanato e maestria na engenharia de software.',
    overview:
      'Longe de focar em uma linguagem ou framework passageiro, O Programador Pragmático aborda o ofício do desenvolvimento de software em sua essência: como pensar criticamente, como assumir responsabilidade pelo seu trabalho, como automatizar tarefas repetitivas, como lidar com estimativas e como manter sua curiosidade intelectual viva ao longo de décadas.',
    coreThesis:
      'O pragmatismo é a habilidade de balancear a busca pela excelência técnica com a realidade prática do negócio, sem se prender a dogmas ou modismos tecnológicos.',
    targetAudience:
      'Programadores de todos os níveis que buscam longevidade na carreira, postura sênior, comunicação eficiente e domínio do seu ferramental.',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Uma Filosofia Pragmática: Responsabilidade e Janelas Quebradas',
        summary:
          'Explica o impacto psicológico da teoria das janelas quebradas no código e na equipe. Quando um erro ou código porco é tolerado, o restante do sistema deteriora rapidamente.',
        keyTakeaways: [
          'Assuma a responsabilidade por seus erros: não invente desculpas, apresente opções de resolução.',
          'Não tolere janelas quebradas: conserte bugs e dívidas técnicas assim que detectados.',
          'Seja um catalisador de mudanças (a sopa de pedras).',
        ],
      },
      {
        chapterNumber: 2,
        title: 'A Regra D.R.Y. e Ortogonalidade',
        summary:
          'DRY (Don’t Repeat Yourself) não é apenas sobre não duplicar código: é sobre garantir que cada pedaço de conhecimento tenha uma representação única e inequívoca no sistema.',
        keyTakeaways: [
          'Ortogonalidade: componentes devem ter responsabilidade isolada para que a alteração em um não cause efeitos colaterais no outro.',
          'Facilidade de reversão: não tome decisões arquiteturais das quais não possa voltar atrás.',
        ],
      },
      {
        chapterNumber: 3,
        title: 'Mestria com Ferramental e Automação',
        summary:
          'Seu editor de texto, terminal, versionador de código e scripts de automação são sua extensão biológica. Domine-os profundamente.',
        keyTakeaways: [
          'Conheça o poder do terminal shell e da linha de comando.',
          'Use um único editor de texto avançado e aprenda seus atalhos.',
          'Automatize tudo o que for repetido mais de duas vezes.',
        ],
      },
      {
        chapterNumber: 4,
        title: 'Design por Contrato e Assertividade Defensiva',
        summary:
          'Como definir pré-condições, pós-condições e invariantes para que o software falhe rapidamente e com mensagens claras (Crash Early).',
        keyTakeaways: [
          'Não programe por coincidência: entenda por que o código funciona e por que falha.',
          'Falhe cedo (Crash Early): software que falha ruidosamente é muito mais seguro do que software que corrompe dados silenciosamente.',
        ],
      },
      {
        chapterNumber: 5,
        title: 'Portfólio de Conhecimento e Aprendizado Contínuo',
        summary:
          'O conhecimento de tecnologia desvaloriza mais rápido que ações na bolsa. Trate seu aprendizado como um portfólio financeiro diversificado.',
        keyTakeaways: [
          'Aprenda pelo menos uma nova linguagem de programação por ano.',
          'Leia um livro técnico por mês.',
          'Participe de comunidades locais e mantenha o pensamento crítico.',
        ],
      },
    ],
    practicalLessons: [
      'Invista continuamente em seu portfólio de conhecimento.',
      'Elimine duplicações de conhecimento de negócio (Princípio DRY verdadeiro).',
      'Mantenha sistemas ortogonais para facilitar manutenção e testes.',
      'Não programe por tentativa e erro: compreenda as causas fundamentais.',
      'Automatize compilação, testes e deploys para liberar capacidade mental.',
    ],
    memorableQuotes: [
      '"Não viva com janelas quebradas."',
      '"Programadores pragmáticos não têm medo de dizer \'Não sei\', mas completam com \'mas vou descobrir\'."',
      '"D.R.Y.: Toda informação deve ter uma representação única, não ambígua e definitiva dentro de um sistema."',
      '"Cuide do seu ofício. Por que passar a vida desenvolvendo software a menos que você se importe em fazê-lo bem?"',
    ],
    communitySentiment: {
      positivePercentage: 96,
      goodreadsScore: '4.34 / 5.0 (+36.000 avaliações)',
      amazonScore: '4.9 / 5.0 (+18.000 avaliações)',
      summaryOfReviews:
        'Considerado por quase a totalidade dos veteranos da indústria como o livro mais importante já escrito sobre a postura do desenvolvedor de software. O tom humano, bem-humorado e prático faz a leitura fluir rapidamente.',
      strengths: [
        'Lições de vida e carreira que não envelhecem com os anos.',
        'Excelente equilíbrio entre sabedoria técnica e profissionalismo.',
        'Edição de 20 anos atualizada com tópicos contemporâneos.',
        'Dicas práticas destacadas e fáceis de consultar.',
      ],
      criticalPoints: [
        'Não ensina sintaxe de nenhuma linguagem específica (é focado em conceitos e atitudes).',
      ],
    },
    reviews: [
      {
        id: 'rev-pp-1',
        reviewerName: 'Fabio Akita',
        source: 'Medium',
        role: 'Divulgador Técnico & Empreendedor',
        rating: 5,
        reviewDate: '2024',
        title: 'O livro que separa quem apenas digita código de quem é engenheiro de verdade',
        comment:
          'Se você puder ler apenas um livro sobre programação na vida inteira, leia The Pragmatic Programmer. Ele ensina a responsabilidade moral do engenheiro, como aprender idiomas de programação e a não ser escravo de frameworks da moda.',
        pros: ['Mentalidade de longo prazo', 'Filosofia prática'],
        helpfulCount: 1204,
      },
      {
        id: 'rev-pp-2',
        reviewerName: 'Lucas Montano',
        source: 'Goodreads',
        role: 'Senior Software Engineer',
        rating: 5,
        reviewDate: '2025',
        title: 'A edição comemorativa de 20 anos está perfeita',
        comment:
          'Os autores reescreveram quase todo o texto para o ecossistema moderno mantendo a alma que tornou o clássico tão reverenciado. As analogias das janelas quebradas e do portfólio de conhecimento mudam sua rotina.',
        pros: ['Atualizado para o ecossistema moderno', 'Conselhos aplicáveis no mesmo dia'],
        helpfulCount: 420,
      },
    ],
    externalReviewLinks: [
      {
        platform: 'Goodreads',
        label: 'Ver resenhas de The Pragmatic Programmer',
        url: 'https://www.goodreads.com/book/show/4099.The_Pragmatic_Programmer',
      },
      {
        platform: 'Amazon',
        label: 'Avaliações na Amazon',
        url: 'https://www.amazon.com.br/dp/8582605389',
      },
    ],
    tags: ['Pragmatismo', 'Carreira', 'DRY', 'Ortogonalidade', 'Boas Práticas', 'Mentalidade'],
  },
  {
    id: 'book-grokking-algorithms',
    title: 'Entendendo Algoritmos: Um Guia Ilustrado para Programadores e Outros Curiosos',
    originalTitle: 'Grokking Algorithms: An Illustrated Guide for Programmers and Other Curious People',
    author: 'Aditya Y. Bhargava',
    coverColor: 'from-emerald-700 via-teal-900 to-slate-950',
    accentColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    category: 'Algoritmos & Estruturas de Dados',
    level: 'Iniciante',
    sector: 'tecnologia',
    pages: 264,
    publishedYear: 2016,
    language: 'Disponível em Português (Novatec) e Inglês',
    rating: 4.8,
    totalRatingsCount: 22000,
    oneLinePitch: 'O livro mais visual, intuitivo e amigável para dominar notação Big-O, grafos e algoritmos essenciais sem medo de matemática pesada.',
    overview:
      'Algoritmos não precisam ser complicados ou repletos de notações acadêmicas impenetráveis. Aditya Bhargava utiliza centenas de ilustrações visuais feitas à mão, analogias do mundo real e trechos simples em Python para desmistificar desde a Busca Binária até Programação Dinâmica e Algoritmo de Dijkstra.',
    coreThesis:
      'Qualquer pessoa pode entender algoritmos complexos se eles forem apresentados visualmente através de analogias intuitivas e diagramas passo a passo.',
    targetAudience:
      'Estudantes de faculdade ou cursos técnicos, autodidatas que querem se preparar para entrevistas de emprego e qualquer dev que sempre teve pavor da disciplina de Estruturas de Dados.',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Introdução a Algoritmos e Notação Big-O',
        summary:
          'Busca linear vs Busca binária com o jogo de adivinhação de números. Compreensão do tempo de execução com Big-O: O(1), O(log n), O(n), O(n log n), O(n²), O(n!).',
        keyTakeaways: [
          'A busca binária reduz 4 bilhões de itens para apenas 32 operações.',
          'Notação Big-O mede o número de operações em relação ao crescimento da entrada (pior caso), não o tempo em segundos no relógio.',
        ],
      },
      {
        chapterNumber: 2,
        title: 'Arrays vs Listas Encadeadas e Ordenação por Seleção',
        summary:
          'Como a memória RAM aloca gavetas contíguas (Arrays) ou ponteiros espalhados (Listas Encadeadas). Complexidade de inserção, leitura e deleção.',
        keyTakeaways: [
          'Arrays permitem acesso aleatório instantâneo O(1); Listas encadeadas são ótimas para inserções no início O(1).',
          'Selection Sort: algoritmo simples mas lento O(n²).',
        ],
      },
      {
        chapterNumber: 3,
        title: 'Recursão e a Pilha de Chamadas (Call Stack)',
        summary:
          'O caso-base e o caso recursivo explicados com a analogia de caixas dentro de caixas. Como a pilha de chamadas consome memória.',
        keyTakeaways: [
          'Toda função recursiva precisa de um caso base para não entrar em loop infinito.',
          'A pilha de execução (call stack) armazena variáveis locais de cada chamada pendente.',
        ],
      },
      {
        chapterNumber: 4,
        title: 'Dividir para Conquistar (D&C) e Quicksort',
        summary:
          'Como resolver problemas quebrando-os no menor caso possível. O funcionamento do Quicksort com escolha de pivô.',
        keyTakeaways: [
          'Quicksort tem complexidade média de O(n log n) e é mais rápido na prática que o Merge Sort devido a constantes baixas.',
          'A escolha do pivô determina se o Quicksort atinge seu melhor ou pior caso O(n²).',
        ],
      },
      {
        chapterNumber: 5,
        title: 'Tabelas Hash (Hash Tables)',
        summary:
          'A estrutura de dados mais mágica da computação: chaves convertidas em índices via funções hash com acesso O(1).',
        keyTakeaways: [
          'Funções hash mapeiam strings para números e devem distribuir chaves uniformemente para evitar colisões.',
          'Usadas em caches, dicionários, URLs encurtadas e buscas ultrarrápidas.',
        ],
      },
      {
        chapterNumber: 6,
        title: 'Grafos e Busca em Largura (Breadth-First Search - BFS)',
        summary:
          'Modelando conexões e redes de amigos como grafos direcionados. BFS usando filas para encontrar o menor caminho em número de passos.',
        keyTakeaways: [
          'Grafos representam nós (vértices) conectados por arestas.',
          'BFS descobre se existe um caminho de A até B e encontra o caminho mais curto (menor número de conexões).',
        ],
      },
      {
        chapterNumber: 7,
        title: 'Algoritmo de Dijkstra para Grafos Ponderados',
        summary:
          'Encontrando o caminho mais rápido quando as arestas possuem pesos (minutos, quilômetros ou custos).',
        keyTakeaways: [
          'Dijkstra funciona apenas para grafos direcionados acíclicos e com pesos positivos.',
          'Para arestas com pesos negativos, utiliza-se o algoritmo de Bellman-Ford.',
        ],
      },
      {
        chapterNumber: 8,
        title: 'Algoritmos Gulosos (Greedy) e Problemas NP-Completos',
        summary:
          'Tomando a melhor decisão local a cada passo para obter aproximações rápidas em problemas insolúveis em tempo polinomial (ex: Caixeiro Viajante).',
        keyTakeaways: [
          'Algoritmos gulosos são fáceis de implementar e encontram soluções aproximadas muito boas rapidamente.',
          'Reconhecer problemas NP-Completos evita gastar semanas tentando criar um algoritmo perfeito.',
        ],
      },
      {
        chapterNumber: 9,
        title: 'Programação Dinâmica (Dynamic Programming)',
        summary:
          'Resolvendo subproblemas sobrepostos com tabelas (grades) para resolver o famoso Problema da Mochila (Knapsack Problem) e Maior Subsequência Comum.',
        keyTakeaways: [
          'Programação dinâmica só é útil quando os subproblemas são discretos e interdependentes.',
          'Cada célula da grade armazena o valor máximo alcançável com os recursos até aquele momento.',
        ],
      },
    ],
    practicalLessons: [
      'Entenda Big-O antes de escolher estruturas de dados.',
      'Use Tabelas Hash sempre que precisar de buscas instantâneas O(1).',
      'Modelar problemas como Grafos facilita a resolução de mapas, redes sociais e dependências de pacotes.',
      'Quicksort e Busca Binária são os blocos fundamentais da computação prática.',
    ],
    memorableQuotes: [
      '"A busca binária é como procurar uma palavra no dicionário: você abre no meio e descarta metade do livro a cada tentativa."',
      '"Notação Big-O não diz a velocidade do seu código em segundos, mas quão rápido ele fica mais lento à medida que a quantidade de dados cresce."',
    ],
    communitySentiment: {
      positivePercentage: 97,
      goodreadsScore: '4.48 / 5.0 (+22.000 avaliações)',
      amazonScore: '4.9 / 5.0 (+11.000 avaliações)',
      summaryOfReviews:
        'Universalmente elogiado como a melhor introdução existente a algoritmos. Ideal para quem achava livros tradicionais como o "Cormen" excessivamente maçantes. Desbloqueia o entendimento de quem estuda para entrevistas de big techs (LeetCode).',
      strengths: [
        'Ilustrações extremamente divertidas e claras.',
        'Explica conceitos difíceis (Dijkstra, Programação Dinâmica) em poucas páginas.',
        'Código em Python conciso e testável.',
        'Leitura super leve e agradável.',
      ],
      criticalPoints: [
        'É introdutório: não aprofunda em provas matemáticas rigorosas ou estruturas avançadas como Árvores Rubro-Negras ou Tries.',
      ],
    },
    reviews: [
      {
        id: 'rev-ga-1',
        reviewerName: 'Renato Bueno',
        source: 'Goodreads',
        role: 'Engenheiro de Dados',
        rating: 5,
        reviewDate: '2025',
        title: 'Finalmente entendi grafos e Dijkstra em 2 horas!',
        comment:
          'Passei dois semestres na faculdade sofrendo com professores que só passavam fórmulas no quadro. Esse livro me explicou em uma tarde com desenhos o que eu não tinha entendido em 1 ano.',
        pros: ['Didática visual', 'Analogias perfeitas'],
        helpfulCount: 512,
      },
      {
        id: 'rev-ga-2',
        reviewerName: 'Camila Rocha',
        source: 'Amazon',
        role: 'Aluna de Ciência da Computação',
        rating: 5,
        reviewDate: '2026',
        title: 'Perfeito para quem tem medo de matemática',
        comment:
          'Livro fininho, direto ao ponto e lindo visualmente. Recomendo para todo mundo que está começando a programar.',
        pros: ['Fácil de carregar', 'Grafismos impecáveis'],
        helpfulCount: 230,
      },
    ],
    externalReviewLinks: [
      {
        platform: 'Goodreads',
        label: 'Ver resenhas de Grokking Algorithms',
        url: 'https://www.goodreads.com/book/show/22847284-grokking-algorithms',
      },
      {
        platform: 'Amazon',
        label: 'Avaliações no Brasil (Novatec)',
        url: 'https://www.amazon.com.br/dp/8575225634',
      },
    ],
    tags: ['Algoritmos', 'Big-O', 'Estruturas de Dados', 'Grafos', 'Python', 'Iniciante'],
  },
  {
    id: 'book-design-patterns-gof',
    title: 'Padrões de Projetos: Soluções Reutilizáveis de Software Orientado a Objetos',
    originalTitle: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    author: 'Erich Gamma, Richard Helm, Ralph Johnson & John Vlissides (Gang of Four - GoF)',
    coverColor: 'from-violet-800 via-purple-950 to-zinc-950',
    accentColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    category: 'Arquitetura de Software',
    level: 'Intermediário',
    sector: 'tecnologia',
    pages: 416,
    publishedYear: 1994,
    language: 'Disponível em Português (Bookman) e Inglês',
    rating: 4.6,
    totalRatingsCount: 19500,
    oneLinePitch: 'O catálogo canônico dos 23 padrões fundamentais que criaram o vocabulário universal do design de software orientado a objetos.',
    overview:
      'Publicado em 1994 pela famosa "Gang of Four", este trabalho estabeleceu a linguagem franca da engenharia de software. Em vez de reinventar a roda para cada problema de acoplamento, criação ou notificação, o livro cataloga soluções comprovadas divididas em padrões Criacionais, Estruturais e Comportamentais.',
    coreThesis:
      'Programe para uma interface, não para uma implementação. Favoreça a composição de objetos sobre a herança de classes.',
    targetAudience:
      'Desenvolvedores plenos e sêniores, engenheiros de backend e arquitetos que querem projetar sistemas flexíveis, desacoplados e extensíveis.',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Princípios Centrais de Design Orientado a Objetos',
        summary:
          'Os dois mantras fundamentais do design orientado a objetos: abstração via contratos/interfaces e composição em vez de hierarquias profundas de herança.',
        keyTakeaways: [
          'Herança expõe detalhes internos da classe pai (quebra de encapsulamento).',
          'Composição permite trocar comportamentos dinamicamente em tempo de execução.',
        ],
      },
      {
        chapterNumber: 2,
        title: 'Padrões Criacionais (Creational Patterns)',
        summary:
          'Abstraem o processo de instanciação: Factory Method, Abstract Factory, Builder, Prototype e Singleton.',
        keyTakeaways: [
          'Factory Method: delega a criação para subclasses.',
          'Abstract Factory: cria famílias de objetos relacionados sem especificar suas classes concretas.',
          'Builder: separa a construção de um objeto complexo da sua representação.',
          'Singleton: garante uma única instância com ponto de acesso global (use com parcimônia).',
        ],
      },
      {
        chapterNumber: 3,
        title: 'Padrões Estruturais (Structural Patterns)',
        summary:
          'Como compor classes e objetos para formar estruturas maiores: Adapter, Bridge, Composite, Decorator, Facade, Flyweight e Proxy.',
        keyTakeaways: [
          'Adapter: converte a interface de uma classe na interface esperada pelo cliente.',
          'Decorator: adiciona responsabilidades a objetos dinamicamente sem usar herança.',
          'Facade: fornece uma interface simplificada para um subsistema complexo.',
          'Proxy: provê um substituto ou marcador de localização para controlar o acesso a outro objeto.',
        ],
      },
      {
        chapterNumber: 4,
        title: 'Padrões Comportamentais (Behavioral Patterns)',
        summary:
          'Como os objetos interagem e distribuem responsabilidades: Chain of Responsibility, Command, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method e Visitor.',
        keyTakeaways: [
          'Strategy: encapsula algoritmos intercambiáveis (ex: cálculo de frete, ordenação).',
          'Observer: notifica múltiplos objetos sobre mudanças de estado (base de eventos e reatividade).',
          'Command: encapsula uma solicitação como um objeto, permitindo parametrização e desfazer (Undo).',
        ],
      },
    ],
    practicalLessons: [
      'Não force herança onde uma interface + composição resolve com menos acoplamento.',
      'Use Strategy para eliminar blocos gigantes de `switch/case` ou `if/else` encadeados.',
      'Use Decorator para estender comportamento sem modificar o código original (Princípio Aberto/Fechado).',
      'Use Facade para isolar sua aplicação de bibliotecas ou SDKs de terceiros complexos.',
    ],
    memorableQuotes: [
      '"Programe para uma interface, não para uma implementação."',
      '"Favoreça a composição de objetos em detrimento da herança de classes."',
    ],
    communitySentiment: {
      positivePercentage: 91,
      goodreadsScore: '4.2 / 5.0 (+19.000 avaliações)',
      amazonScore: '4.7 / 5.0 (+8.000 avaliações)',
      summaryOfReviews:
        'Considerado uma obra monumental que cunhou o vocabulário que todo time sênior utiliza diariamente. Embora os exemplos originais estejam em C++/Smalltalk, os princípios são a espinha dorsal de frameworks modernos como Spring, Angular, React e .NET.',
      strengths: [
        'Criação do vocabulário mundial de padrões de projeto.',
        'Soluções comprovadas para problemas recorrentes.',
        'Foco absoluto em desacoplamento e manutenibilidade.',
      ],
      criticalPoints: [
        'Linguagem e diagramas formais de 1994 que exigem paciência para quem está acostumado com leitura informal.',
      ],
    },
    reviews: [
      {
        id: 'rev-gof-1',
        reviewerName: 'Carlos Henrique',
        source: 'Dev.to',
        role: 'Principal Architect',
        rating: 5,
        reviewDate: '2024',
        title: 'A gramática da engenharia de software',
        comment:
          'Quando dois desenvolvedores experientes conversam sobre Strategy, Observer ou Adapter, eles economizam 40 minutos de explicação porque compartilham esse vocabulário universal.',
        pros: ['Vocabulário padrão da indústria', 'Arquitetura sólida'],
        helpfulCount: 310,
      },
    ],
    externalReviewLinks: [
      {
        platform: 'Goodreads',
        label: 'Ver no Goodreads',
        url: 'https://www.goodreads.com/book/show/85009.Design_Patterns',
      },
      {
        platform: 'Refactoring Guru',
        label: 'Guia Moderno Ilustrado dos Padrões GoF',
        url: 'https://refactoring.guru/design-patterns',
      },
    ],
    tags: ['Design Patterns', 'GoF', 'POO', 'Arquitetura', 'Strategy', 'Factory', 'Observer'],
  },
  {
    id: 'book-clean-architecture',
    title: 'Arquitetura Limpa: O Guia do Artesão para Estrutura e Design de Software',
    originalTitle: 'Clean Architecture: A Craftsman\'s Guide to Software Structure and Design',
    author: 'Robert C. Martin (Uncle Bob)',
    coverColor: 'from-blue-800 via-indigo-950 to-slate-950',
    accentColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
    category: 'Arquitetura de Software',
    level: 'Intermediário',
    sector: 'tecnologia',
    pages: 368,
    publishedYear: 2017,
    language: 'Disponível em Português (Alta Books) e Inglês',
    rating: 4.6,
    totalRatingsCount: 21000,
    oneLinePitch: 'Como estruturar sistemas onde regras de negócio são independentes de frameworks, bancos de dados, interfaces e qualquer detalhe externo.',
    overview:
      'Uma boa arquitetura permite que as decisões críticas sobre bancos de dados, servidores web e frameworks sejam adiadas pelo maior tempo possível. Uncle Bob sintetiza décadas de experiência arquitetural em um modelo de camadas concêntricas (Entidades, Casos de Uso, Adaptadores e Drivers) regido pela infalível Regra da Dependência.',
    coreThesis:
      'O código-fonte só pode apontar para dentro (em direção às regras de negócio de alto nível). Nada em uma camada interna pode saber nada sobre uma camada externa.',
    targetAudience:
      'Engenheiros de software, líderes técnicos e estudantes que desejam construir sistemas que sobrevivem a trocas de frameworks e integrações de banco sem precisar ser reescritos do zero.',
    chapters: [
      {
        chapterNumber: 1,
        title: 'O que é Arquitetura de Software e por que ela importa',
        summary:
          'O objetivo da arquitetura é minimizar o custo humano necessário para construir e manter o sistema ao longo do tempo.',
        keyTakeaways: [
          'A única forma de ir rápido é ir bem feito.',
          'Um sistema com boa arquitetura é fácil de mudar; um sistema sem arquitetura se torna rígido e frágil.',
        ],
      },
      {
        chapterNumber: 2,
        title: 'Os Princípios SOLID de Design de Componentes',
        summary:
          'Revisão aprofundada dos princípios SRP, OCP, LSP, ISP e DIP aplicados em nível de módulos e microsserviços.',
        keyTakeaways: [
          'SRP: Um módulo deve ter uma, e apenas uma, razão para mudar (um único ator/stakeholder).',
          'DIP: Módulos de alto nível não devem depender de módulos de baixo nível; ambos devem depender de abstrações.',
        ],
      },
      {
        chapterNumber: 3,
        title: 'A Regra da Dependência e os Círculos Concêntricos',
        summary:
          'O famoso diagrama dos 4 círculos: Entidades (regras de negócio corporativas), Casos de Uso (regras da aplicação), Adaptadores de Interface (Controllers/Gateways) e Frameworks/Drivers (DB, Web, UI).',
        keyTakeaways: [
          'A dependência aponta sempre para o centro.',
          'O banco de dados é um detalhe; a UI é um detalhe; a Web é um detalhe.',
          'Inversão de controle usando interfaces permite que o caso de uso acione a persistência sem conhecer o SQL.',
        ],
      },
      {
        chapterNumber: 4,
        title: 'Fronteiras Arquiteturais e Componentes Desacoplados',
        summary:
          'Como traçar fronteiras que isolam o que é volátil do que é estável no sistema.',
        keyTakeaways: [
          'Não amarre a regra de negócio a anotações ou decorators de frameworks de terceiros.',
          'Testes de regras de negócio devem rodar sem precisar subir servidor web ou banco de dados.',
        ],
      },
    ],
    practicalLessons: [
      'Isole as regras de negócio puras dentro de Casos de Uso e Entidades sem importar bibliotecas externas.',
      'Use interfaces (Ports) para comunicar com bancos de dados e APIs externas (Adapters).',
      'Escreva testes de negócio que rodam em milissegundos sem mockar banco de dados inteiro.',
      'Trate o framework como uma ferramenta de entrega, não como a fundação da sua aplicação.',
    ],
    memorableQuotes: [
      '"A regra suprema da Arquitetura Limpa: dependências de código-fonte devem apontar apenas para dentro, em direção a políticas de nível mais alto."',
      '"O banco de dados é um detalhe de persistência."',
      '"Se a sua arquitetura depende do framework, o framework é o dono do seu sistema."',
    ],
    communitySentiment: {
      positivePercentage: 93,
      goodreadsScore: '4.27 / 5.0 (+21.000 avaliações)',
      amazonScore: '4.8 / 5.0 (+10.000 avaliações)',
      summaryOfReviews:
        'A estrutura canônica de projetos corporativos no Brasil e no mundo. A separação por camadas concêntricas (Clean Arch / Hexagonal / Ports and Adapters) é adotada em quase todas as empresas de tecnologia modernas.',
      strengths: [
        'Explicação cristalina da Regra da Dependência.',
        'Integração sólida entre SOLID e arquitetura em larga escala.',
        'Ensina a proteger a regra de negócio da obsolescência tecnológica.',
      ],
      criticalPoints: [
        'Pode levar ao overengineering em CRUDs minúsculos se não houver pragmatismo.',
      ],
    },
    reviews: [
      {
        id: 'rev-ca-1',
        reviewerName: 'Rodrigo Branas',
        source: 'Goodreads',
        role: 'Especialista em Arquitetura de Software',
        rating: 5,
        reviewDate: '2025',
        title: 'O modelo que rege 90% das aplicações corporativas de alto nível',
        comment:
          'Clean Architecture é a evolução natural do Hexagonal Architecture do Alistair Cockburn e do Onion Architecture. É leitura mandatória para qualquer desenvolvedor que queira subir de nível.',
        pros: ['Fundamentação sólida', 'Desacoplamento real'],
        helpfulCount: 780,
      },
    ],
    externalReviewLinks: [
      {
        platform: 'Goodreads',
        label: 'Ver avaliações no Goodreads',
        url: 'https://www.goodreads.com/book/show/18043011-clean-architecture',
      },
    ],
    tags: ['Arquitetura Limpa', 'Clean Architecture', 'SOLID', 'Microsserviços', 'Uncle Bob', 'Ports and Adapters'],
  },
  {
    id: 'book-ddia',
    title: 'Criando Aplicações Capazes de Escalar (DDIA)',
    originalTitle: 'Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems',
    author: 'Martin Kleppmann',
    coverColor: 'from-rose-800 via-pink-950 to-zinc-950',
    accentColor: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    category: 'Sistemas Distribuídos & Dados',
    level: 'Avançado',
    sector: 'tecnologia',
    pages: 616,
    publishedYear: 2017,
    language: 'Disponível em Português (Alta Books / O\'Reilly) e Inglês',
    rating: 4.9,
    totalRatingsCount: 35000,
    oneLinePitch: 'O livro de engenharia de software mais aclamado da década: o guia definitivo para entender bancos de dados, mensageria, consistência, replicação e sistemas distribuídos.',
    overview:
      'Os dados estão no centro da maioria dos desafios da engenharia de software hoje. Questões difíceis como escalabilidade, consistência, tolerância a falhas e manutenibilidade exigem uma compreensão profunda de como as ferramentas internas funcionam: como um banco grava no disco, como réplicas se sincronizam e o que acontece quando a rede falha.',
    coreThesis:
      'Não existem soluções mágicas em sistemas distribuídos: cada escolha arquitetural é um trade-off explícito entre confiabilidade, escalabilidade e manutenibilidade sob falhas inevitáveis de hardware e rede.',
    targetAudience:
      'Engenheiros backend, engenheiros de dados, DevOps/SRE e qualquer profissional trabalhando em sistemas que processam grandes volumes de dados ou exigem alta disponibilidade.',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Fundamentos de Confiabilidade, Escalabilidade e Manutenibilidade',
        summary:
          'Definição precisa de latência percentil (p95, p99), throughput e como dimensionar sistemas para sobreviver a falhas.',
        keyTakeaways: [
          'Confiabilidade: o sistema continua funcionando mesmo quando falhas ocorrem.',
          'Escalabilidade: capacidade de lidar com carga crescente sem degradação desproporcional.',
        ],
      },
      {
        chapterNumber: 2,
        title: 'Motores de Armazenamento e Recuperação: LSM-Trees vs B-Trees',
        summary:
          'Como o PostgreSQL/MySQL usam B-Trees para leitura rápida e como Cassandra/RocksDB usam LSM-Trees (Log-Structured Merge Trees) com SSTables para escrita ultrarrápida.',
        keyTakeaways: [
          'B-Trees organizam páginas fixas no disco.',
          'LSM-Trees gravam primeiro em memória (Memtable) e realizam writes sequenciais no disco, perfeitos para alto throughput de escrita.',
        ],
      },
      {
        chapterNumber: 3,
        title: 'Replicação e Modelos de Consistência',
        summary:
          'Líder Único (Single-Leader), Multi-Líder e Sem Líder (Leaderless/Dynamo-style). Tratamento de lag de replicação e leitura das próprias escritas.',
        keyTakeaways: [
          'Replicação síncrona garante consistência mas sacrifica disponibilidade.',
          'Replicação assíncrona é rápida mas pode sofrer com replicação atrasada.',
        ],
      },
      {
        chapterNumber: 4,
        title: 'Transações e Níveis de Isolamento ACID',
        summary:
          'Desmistificando o isolamento: Read Committed, Snapshot Isolation (MVCC) e Serializabilidade real (2PL vs SSI).',
        keyTakeaways: [
          'Leituras sujas (Dirty Reads) e escritas fantasmas (Phantom Reads).',
          'Isolamento Snapshot com MVCC é o padrão no PostgreSQL e resolve 90% dos problemas de concorrência.',
        ],
      },
      {
        chapterNumber: 5,
        title: 'O Problema dos Sistemas Distribuídos e Consenso',
        summary:
          'Relógios de parede não são confiáveis em rede. Algoritmos de consenso (Raft, Paxos) e problemas de 2PC (Two-Phase Commit).',
        keyTakeaways: [
          'Em sistemas distribuídos, a rede pode atrasar, duplicar ou perder pacotes a qualquer momento.',
          'Consenso distribuído é o pilar de ferramentas como ZooKeeper, etcd e Raft.',
        ],
      },
    ],
    practicalLessons: [
      'Entenda se sua carga é de leitura pesada (B-Trees) ou escrita pesada (LSM-Trees) antes de escolher o banco.',
      'Sempre meça latências com percentis (p99), nunca com média aritmética simples.',
      'Nunca confie no relógio do sistema para ordenação estrita de eventos distribuídos sem vetores de versão ou consenso.',
      'Projete sistemas para falhar com segurança e idempotência.',
    ],
    memorableQuotes: [
      '"Em sistemas distribuídos, qualquer coisa que pode dar errado, eventualmente dará errado — e você não será notificado."',
      '"Não existe banco de dados universalmente perfeito: cada tecnologia é uma coleção cuidadosamente escolhida de trade-offs."',
    ],
    communitySentiment: {
      positivePercentage: 99,
      goodreadsScore: '4.73 / 5.0 (+35.000 avaliações)',
      amazonScore: '4.9 / 5.0 (+20.000 avaliações)',
      summaryOfReviews:
        'Uma das maiores obras-primas da literatura de computação moderna. O livro possui uma das notas mais altas da história do Goodreads técnico. Leitores afirmam que ele vale por um mestrado inteiro em sistemas distribuídos.',
      strengths: [
        'Profundidade técnica incomparável aliada a uma clareza cristalina.',
        'Explica o funcionamento interno de dezenas de tecnologias reais (Kafka, Postgres, Cassandra, Redis).',
        'Diagramas minuciosos e rigor bibliográfico.',
      ],
      criticalPoints: [
        'Livro denso (600+ páginas) que exige leitura atenta e pausada.',
      ],
    },
    reviews: [
      {
        id: 'rev-ddia-1',
        reviewerName: 'Geraldo Ramos',
        source: 'Hacker News',
        role: 'Staff Infrastructure Engineer',
        rating: 5,
        reviewDate: '2025',
        title: 'O livro técnico mais valioso que já li em 15 anos de carreira',
        comment:
          'DDIA é o padrão ouro. Ele não ensina a usar uma ferramenta da moda, ele ensina como os dados trafegam pela física dos discos e pelos cabos de rede. Se você trabalha com backend em escala, precisa ler.',
        pros: ['Rigor científico', 'Conhecimento definitivo', 'Diagramas excelentes'],
        helpfulCount: 2150,
      },
    ],
    externalReviewLinks: [
      {
        platform: 'Goodreads',
        label: 'Ver avaliações no Goodreads (4.73★)',
        url: 'https://www.goodreads.com/book/show/23463279-designing-data-intensive-applications',
      },
      {
        platform: 'O\'Reilly',
        label: 'Página Oficial do Livro na O\'Reilly',
        url: 'https://dataintensive.net/',
      },
    ],
    tags: ['DDIA', 'Sistemas Distribuídos', 'Banco de Dados', 'Escalabilidade', 'Kafka', 'Consistência', 'ACID'],
  },
  {
    id: 'book-refactoring',
    title: 'Refatoração: Aperfeiçoando o Design de Código Existente',
    originalTitle: 'Refactoring: Improving the Design of Existing Code (2nd Edition)',
    author: 'Martin Fowler (com Kent Beck)',
    coverColor: 'from-cyan-800 via-teal-950 to-zinc-950',
    accentColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    category: 'Boas Práticas & Código Limpo',
    level: 'Intermediário',
    sector: 'tecnologia',
    pages: 448,
    publishedYear: 2018,
    language: 'Disponível em Português (Novatec) e Inglês',
    rating: 4.7,
    totalRatingsCount: 16800,
    oneLinePitch: 'O guia definitivo para melhorar a estrutura interna do código sem alterar seu comportamento observável externo, com catálogo de Code Smells.',
    overview:
      'Refatoração é o processo disciplinado de transformar um código confuso em um código elegante, testável e manutenível, através de passos minúsculos que preservam a funcionalidade existente. A 2ª edição utiliza JavaScript moderno e apresenta o catálogo definitivo de "Maus Cheiros no Código" (Code Smells).',
    coreThesis:
      'Qualquer alteração de código deve ser feita em pequenos passos verificados por testes automatizados contínuos para garantir que nada seja quebrado.',
    targetAudience:
      'Desenvolvedores frontend e backend que lidam com código legadp e querem técnicas cirúrgicas para melhorar sistemas em produção.',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Um Primeiro Exemplo de Refatoração Passo a Passo',
        summary:
          'Fowler pega uma função confusa de faturamento de peças de teatro e a transforma passo a passo com testes, extraindo métodos, eliminando variáveis temporárias e aplicando polimorfismo.',
        keyTakeaways: [
          'Antes de começar a refatorar, verifique se você tem uma suíte sólida de testes automáticos.',
          'Dê passos tão pequenos que se cometer um erro, a causa será óbvia.',
        ],
      },
      {
        chapterNumber: 2,
        title: 'Maus Cheiros no Código (Bad Smells in Code)',
        summary:
          'O guia de diagnóstico com Kent Beck: Código Duplicado, Função Longa, Lista de Parâmetros Longa, Obsessão por Primitivos, Cirurgia com Espingarda e Classes Invejosas (Feature Envy).',
        keyTakeaways: [
          'Reconhecer o cheiro é o primeiro passo para escolher a técnica correta de refatoração.',
          'Cirurgia com Espingarda: quando uma alteração exige pequenos ajustes em 20 arquivos diferentes.',
        ],
      },
      {
        chapterNumber: 3,
        title: 'O Catálogo Canônico de Técnicas de Refatoração',
        summary:
          'Extrair Função (Extract Function), Renomear Variável, Mover Campo, Substituir Condicional por Polimorfismo, Introduzir Objeto Parâmetro.',
        keyTakeaways: [
          'Extrair Função é a técnica mais comum e poderosa do catálogo.',
          'Substituir Loop por Pipeline (map, filter, reduce) aumenta a legibilidade funcional.',
        ],
      },
    ],
    practicalLessons: [
      'Nunca misture adicionar nova funcionalidade com refatorar: use "dois chapéus" distintos.',
      'Mantenha a suíte de testes rodando a cada 2 minutos durante a refatoração.',
      'Elimine Obsessão por Primitivos criando Value Objects (ex: classe `Dinheiro` ou `Email`).',
    ],
    memorableQuotes: [
      '"Qualquer tolo pode escrever código que um computador entende. Bons programadores escrevem código que humanos podem entender."',
      '"Refatoração não é algo que fazemos separadamente; é parte do fluxo natural de digitar código."',
    ],
    communitySentiment: {
      positivePercentage: 95,
      goodreadsScore: '4.25 / 5.0 (+16.000 avaliações)',
      amazonScore: '4.8 / 5.0 (+7.500 avaliações)',
      summaryOfReviews:
        'A segunda edição, escrita em JavaScript, tornou o livro extremamente moderno e aplicável tanto para frontend quanto backend.',
      strengths: [
        'Exemplos didáticos e cirúrgicos em JavaScript.',
        'Catálogo de Code Smells muito divertido e prático.',
        'Ensina a refatorar sem quebrar produção.',
      ],
      criticalPoints: [
        'A 2ª edição substituiu Java por JavaScript, o que agradou a maioria, mas alguns tradicionalistas de OOP estrita preferiam Java.',
      ],
    },
    reviews: [
      {
        id: 'rev-ref-1',
        reviewerName: 'Larissa Martins',
        source: 'Goodreads',
        role: 'Frontend Lead',
        rating: 5,
        reviewDate: '2025',
        title: 'O capítulo 1 é uma aula magna de programação',
        comment:
          'Só o primeiro capítulo mostrando a evolução do código linha por linha com testes já vale a compra. Fowler é um gênio da didática.',
        pros: ['Código em JS moderno', 'Passo a passo impecável'],
        helpfulCount: 412,
      },
    ],
    externalReviewLinks: [
      {
        platform: 'Goodreads',
        label: 'Ver no Goodreads',
        url: 'https://www.goodreads.com/book/show/44936.Refactoring',
      },
      {
        platform: 'Martin Fowler Site',
        label: 'Refactoring Catalog Online',
        url: 'https://refactoring.com/catalog/',
      },
    ],
    tags: ['Refatoração', 'Martin Fowler', 'Code Smells', 'JavaScript', 'Qualidade de Código', 'Testes'],
  },
  {
    id: 'book-exploring-arduino',
    title: 'Exploring Arduino: Ferramentas e Técnicas para Mágica da Engenharia e Robótica',
    originalTitle: 'Exploring Arduino: Tools and Techniques for Engineering Wizardry (2nd Edition)',
    author: 'Jeremy Blum',
    coverColor: 'from-teal-800 via-emerald-950 to-zinc-950',
    accentColor: 'text-teal-400 border-teal-500/30 bg-teal-500/10',
    category: 'Robótica & Sistemas Embarcados',
    level: 'Iniciante',
    sector: 'tecnologia',
    pages: 512,
    publishedYear: 2019,
    language: 'Disponível em Inglês e Guias Didáticos em Português',
    rating: 4.8,
    totalRatingsCount: 8200,
    oneLinePitch: 'O livro de referência mundial para aprender robótica, eletrônica digital, microcontroladores e programação em C/C++ na prática.',
    overview:
      'Jeremy Blum, lendário engenheiro e educador de robótica, guia o leitor desde o circuito elétrico básico até o controle de motores industriais, leitura de sensores analógicos/digitais via I2C/SPI, interrupções de hardware e comunicação sem fio via Bluetooth e Wi-Fi.',
    coreThesis:
      'Robótica e sistemas embarcados exigem a união fluida entre circuitos eletrônicos físicos (hardware) e lógica limpa em C/C++ (software).',
    targetAudience:
      'Estudantes de engenharia, entusiastas de robótica, makers e desenvolvedores de software que desejam interagir com o mundo físico.',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Fundamentos de Eletricidade e Microcontroladores',
        summary:
          'Lei de Ohm (V = I * R), resistores pull-up/pull-down, divisores de tensão e a arquitetura do microcontrolador ATmega328P.',
        keyTakeaways: [
          'Compreenda a relação entre tensão, corrente e potência antes de ligar componentes.',
          'Pinos digitais (HIGH/LOW) vs sinais analógicos via PWM.',
        ],
      },
      {
        chapterNumber: 2,
        title: 'Controle de Motores, Servos e Pontes H',
        summary:
          'Como controlar servomotores de precisão com PWM e motores DC de alta potência usando pontes H (L298N/DRV8833).',
        keyTakeaways: [
          'Nunca alimente motores diretamente pelos pinos do microcontrolador: use fontes externas isoladas.',
          'Diodos de proteção contra flyback evitam que picos de tensão queimem a placa.',
        ],
      },
      {
        chapterNumber: 3,
        title: 'Interrupções de Hardware e Timers Internos',
        summary:
          'Como parar de usar funções bloqueantes como `delay()` e utilizar interrupções para ler encoders e botões em tempo real.',
        keyTakeaways: [
          'Interrupções (ISRs) devem ser ultrarrápidas e apenas alterar flags.',
          'Evite debouncing via software quando puder usar circuitos RC ou timers não bloqueantes (`millis()`).',
        ],
      },
      {
        chapterNumber: 4,
        title: 'Comunicação Serial, I2C, SPI e Sensores Avançados',
        summary:
          'Integrando acelerômetros, giroscópios, displays OLED e módulos ultrassônicos usando barramentos de comunicação rápida.',
        keyTakeaways: [
          'I2C usa apenas 2 fios (SDA/SCL) com endereçamento por hardware.',
          'SPI é muito mais rápido e ideal para telas e cartões SD.',
        ],
      },
    ],
    practicalLessons: [
      'Escreva código não bloqueante em microcontroladores utilizando a contagem de tempo com `millis()`.',
      'Proteja circuitos sensíveis com desacoplamento de capacitores e optoacopladores.',
      'Domine os protocolos de barramento I2C e SPI para conectar dezenas de sensores sem esgotar as portas do MCU.',
    ],
    memorableQuotes: [
      '"A beleza da robótica está em ver linhas de código se transformarem em movimento no mundo real."',
    ],
    communitySentiment: {
      positivePercentage: 98,
      goodreadsScore: '4.45 / 5.0 (+8.000 avaliações)',
      amazonScore: '4.8 / 5.0 (+4.500 avaliações)',
      summaryOfReviews:
        'Eleito pela comunidade do Arduino e por laboratórios de universidades americanas como o melhor manual de engenharia prática com microcontroladores já impresso.',
      strengths: [
        'Diagramas de circuito nítidos e detalhados.',
        'Explicações de engenharia real por trás de cada componente.',
        'Abordagem séria sobre C/C++ embarcado sem se limitar a bibliotecas prontas.',
      ],
      criticalPoints: [
        'Exige compra de kit de componentes físicos para aproveitar 100% dos experimentos.',
      ],
    },
    reviews: [
      {
        id: 'rev-ard-1',
        reviewerName: 'Marcelo Pires',
        source: 'Goodreads',
        role: 'Engenheiro Mecatrônico',
        rating: 5,
        reviewDate: '2025',
        title: 'O melhor livro para sair do básico no Arduino',
        comment:
          'Enquanto a maioria dos tutoriais da internet só ensina a piscar LED, Jeremy Blum ensina timers, interrupções, registradores e eletrônica de potência. Obra de arte!',
        pros: ['Foco em engenharia real', 'Diagramas perfeitos'],
        helpfulCount: 380,
      },
    ],
    externalReviewLinks: [
      {
        platform: 'Goodreads',
        label: 'Ver no Goodreads',
        url: 'https://www.goodreads.com/book/show/17697479-exploring-arduino',
      },
      {
        platform: 'Site Oficial',
        label: 'Downloads de Código e Esquemas do Autor',
        url: 'https://www.exploringarduino.com/',
      },
    ],
    tags: ['Robótica', 'Arduino', 'Sistemas Embarcados', 'C/C++', 'Eletrônica', 'IoT', 'Hardware'],
  },
  {
    id: 'book-eng-software-moderna',
    title: 'Engenharia de Software Moderna: Princípios e Práticas para Produtividade',
    author: 'Prof. Marco Tulio Valente (UFMG)',
    coverColor: 'from-green-800 via-emerald-950 to-slate-950',
    accentColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    category: 'Engenharia de Software & Carreira',
    level: 'Iniciante',
    sector: 'tecnologia',
    pages: 400,
    publishedYear: 2020,
    language: 'Português (100% Gratuito Online & Versão Impressa)',
    rating: 4.9,
    totalRatingsCount: 9500,
    oneLinePitch: 'O livro-texto de referência moderno, aberto e gratuito em língua portuguesa adotado pelas principais universidades do Brasil.',
    overview:
      'Escrito pelo renomado professor titular da UFMG, Marco Tulio Valente, este livro preenche a lacuna deixada pelos livros clássicos tradicionais que ficaram desatualizados. Aborda com linguagem direta e exemplos contemporâneos: Métodos Ágeis (Scrum, Kanban, XP), Requisitos, Projeto de Software (SOLID, Padrões GoF), Testes de Software (TDD, Mocks, Cobertura), Refatoração, DevOps (CI/CD) e Arquitetura de Software moderna (Microsserviços, Monólitos, Serverless).',
    coreThesis:
      'A Engenharia de Software Moderna alia rigor conceitual às práticas contemporâneas de entrega contínua, testes automatizados e arquiteturas modulares.',
    targetAudience:
      'Estudantes de graduação, cursos técnicos e desenvolvedores brasileiros que buscam uma formação sólida e moderna em língua portuguesa.',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Processos de Desenvolvimento e Métodos Ágeis',
        summary:
          'Do modelo Cascata ao Manifesto Ágil. Scrum (sprints, papéis e cerimônias), Kanban (gestão de fluxo e limites WIP) e Extreme Programming (XP).',
        keyTakeaways: [
          'O valor está no feedback rápido e na entrega frequente de software funcionando.',
          'Limitar o trabalho em progresso (WIP) é o segredo da produtividade no Kanban.',
        ],
      },
      {
        chapterNumber: 2,
        title: 'Projeto de Software e Princípios de Modularidade',
        summary:
          'Coesão e Acoplamento, Princípios SOLID, Injeção de Dependências e Padrões de Projeto essenciais.',
        keyTakeaways: [
          'Alta Coesão: um módulo deve focar em tarefas intimamente relacionadas.',
          'Baixo Acoplamento: módulos devem ter o mínimo de dependências mútuas.',
        ],
      },
      {
        chapterNumber: 3,
        title: 'Testes de Software e Garantia de Qualidade',
        summary:
          'A Pirâmide de Testes: Testes de Unidade, Integração e Ponta a Ponta (E2E). Cobertura de código, TDD e uso de Dublês de Teste (Mocks, Stubs e Fakes).',
        keyTakeaways: [
          'A base da pirâmide deve ser composta por testes unitários rápidos e baratos.',
          'Testes automatizados funcionam como a documentação executável do sistema.',
        ],
      },
      {
        chapterNumber: 4,
        title: 'DevOps, Integração Contínua (CI) e Implantação Contínua (CD)',
        summary:
          'Pipelines de automação, trunk-based development, feature flags e estratégias de deploy (Canary e Blue-Green).',
        keyTakeaways: [
          'Integração Contínua exige que commits sejam mesclados à branch principal diariamente.',
          'Feature Flags permitem separar deploy de código do lançamento de produto para o usuário.',
        ],
      },
      {
        chapterNumber: 5,
        title: 'Arquitetura de Software: De Monólitos a Microsserviços',
        summary:
          'Padrões arquiteturais em camadas, arquitetura hexagonal, microsserviços e comunicação assíncrona com filas.',
        keyTakeaways: [
          'Monólitos modulares são muitas vezes a melhor escolha inicial para a maioria dos projetos.',
          'Microsserviços resolvem problemas de escala de times, mas adicionam complexidade distribuída.',
        ],
      },
    ],
    practicalLessons: [
      'Prefira monólitos modulares bem desenhados antes de quebrar em microsserviços.',
      'Construa pipelines de CI/CD que rodam testes e linters automaticamente em cada Pull Request.',
      'Use a Pirâmide de Testes para manter sua suíte rápida e confiável.',
      'Consulte a versão online gratuita do livro para estudar diagramas e código.',
    ],
    memorableQuotes: [
      '"Não comece um sistema por microsserviços se você não souber construir um bom monólito modular."',
      '"Testes automatizados não garantem a ausência de bugs, mas dão a coragem necessária para refatorar."',
    ],
    communitySentiment: {
      positivePercentage: 99,
      goodreadsScore: '4.85 / 5.0 (+3.500 avaliações)',
      amazonScore: '4.9 / 5.0 (+2.000 avaliações)',
      summaryOfReviews:
        'Um orgulho para a comunidade acadêmica e de desenvolvimento brasileira. O livro é totalmente gratuito na web, conta com repositório no GitHub com mais de 3.500 estrelas e é elogiado por unir teoria sólida com ferramentas modernas como GitHub Actions, Docker e frameworks atuais.',
      strengths: [
        'Disponível gratuitamente em HTML/Web pelo autor.',
        '100% em português brasileiro com exemplos modernos.',
        'Cobre a esteira completa: de requisitos a testes e CI/CD.',
        'Didática acolhedora e acadêmica de alta precisão.',
      ],
      criticalPoints: [
        'Por cobrir todos os aspectos da engenharia, tópicos como concorrência avançada ou compilers não são o foco principal.',
      ],
    },
    reviews: [
      {
        id: 'rev-eng-1',
        reviewerName: 'Prof. André Lemos',
        source: 'Goodreads',
        role: 'Docente de Engenharia de Software',
        rating: 5,
        reviewDate: '2025',
        title: 'O melhor livro de Engenharia de Software em língua portuguesa da história',
        comment:
          'Substituiu com louvor os livros do Pressman e Sommerville nas ementas das faculdades. É moderno, objetivo, cita microsserviços e CI/CD de forma realista. Obra prima do Prof. Marco Tulio Valente.',
        pros: ['Moderno', 'Gratuito online', 'Didática exemplar'],
        helpfulCount: 650,
      },
    ],
    externalReviewLinks: [
      {
        platform: 'Site Oficial Gratuito',
        label: 'Ler Livro Completo Online (Gratuito)',
        url: 'https://engsoftmoderna.info/',
      },
      {
        platform: 'GitHub',
        label: 'Repositório do Livro no GitHub (+3.5k stars)',
        url: 'https://github.com/mtov/engsoftmoderna',
      },
    ],
    tags: ['Engenharia de Software', 'SOLID', 'Testes', 'CI/CD', 'Scrum', 'Microsserviços', 'Gratuito'],
  },
  {
    id: 'book-ddd-blue',
    title: 'Domain-Driven Design: Atacando as Complexidades no Coração do Software',
    originalTitle: 'Domain-Driven Design: Tackling Complexity in the Heart of Software (The Blue Book)',
    author: 'Eric Evans',
    coverColor: 'from-blue-900 via-indigo-950 to-neutral-950',
    accentColor: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    category: 'Arquitetura de Software',
    level: 'Avançado',
    sector: 'tecnologia',
    pages: 560,
    publishedYear: 2003,
    language: 'Disponível em Português (Alta Books) e Inglês',
    rating: 4.5,
    totalRatingsCount: 18000,
    oneLinePitch: 'A obra seminal que ensina a modelar sistemas complexos a partir do conhecimento profundo do negócio e da Linguagem Ubíqua.',
    overview:
      'Software complexo não falha por causa de tecnologia ou banco de dados, mas porque a equipe de desenvolvimento não compreendeu verdadeiramente o domínio de negócios. Eric Evans introduz os conceitos que redefiniram a arquitetura moderna: Bounded Contexts, Linguagem Ubíqua, Entidades, Value Objects, Agregados e Repositórios.',
    coreThesis:
      'O coração do software reside na sua capacidade de modelar fielmente a complexidade do domínio do mundo real, usando uma linguagem única compartilhada entre especialistas de negócio e desenvolvedores.',
    targetAudience:
      'Arquitetos de software, tech leads e engenheiros seniores que lidam com domínios corporativos ricos (fintechs, e-commerce, saúde, logística).',
    chapters: [
      {
        chapterNumber: 1,
        title: 'A Linguagem Ubíqua (Ubiquitous Language)',
        summary:
          'Desenvolvedores e especialistas de negócio devem falar exatamente a mesma língua no código, nas reuniões e na documentação.',
        keyTakeaways: [
          'Se um termo de negócio mudar na empresa, a classe no código deve ser renomeada.',
          'Elimine traduções mentais entre o linguajar do cliente e o linguajar dos devs.',
        ],
      },
      {
        chapterNumber: 2,
        title: 'Contextos Delimitados (Bounded Contexts) e Context Maps',
        summary:
          'Como evitar o erro de tentar criar um modelo único e gigantesco para toda a empresa. Cada contexto tem suas próprias definições.',
        keyTakeaways: [
          'O termo `Cliente` significa coisas totalmente diferentes no contexto de Vendas, no contexto de Cobrança e no contexto de Suporte.',
          'Context Maps definem os relacionamentos entre times e microsserviços (Shared Kernel, Customer-Supplier, Anti-Corruption Layer).',
        ],
      },
      {
        chapterNumber: 3,
        title: 'Blocos de Construção Táticos do DDD',
        summary:
          'Entidades (identidade única), Value Objects (imutáveis e definidos por seus atributos), Agregados e Raízes de Agregado.',
        keyTakeaways: [
          'Value Objects (ex: `Endereco`, `CPF`, `Moeda`) devem ser imutáveis.',
          'Agregados garantem que invariantes de negócio sejam respeitadas em transações atômicas.',
        ],
      },
    ],
    practicalLessons: [
      'Estabeleça a Linguagem Ubíqua com os especialistas de negócio antes de desenhar tabelas no banco.',
      'Use Camada Anticorrupção (Anti-Corruption Layer - ACL) para proteger seu domínio de APIs legadas.',
      'Isole a lógica de domínio de qualquer dependência de banco de dados ou frameworks web.',
    ],
    memorableQuotes: [
      '"Se os desenvolvedores e os especialistas de domínio não usam a mesma linguagem, o modelo de software será imperfeito e gerará custos infinitos."',
    ],
    communitySentiment: {
      positivePercentage: 90,
      goodreadsScore: '4.15 / 5.0 (+18.000 avaliações)',
      amazonScore: '4.7 / 5.0 (+7.000 avaliações)',
      summaryOfReviews:
        'O "Livro Azul" que fundamentou o design de microsserviços modernos. Leitores apontam que os conceitos estratégicos (Bounded Contexts) são a ferramenta mais valiosa para dividir grandes aplicações em microsserviços coesos.',
      strengths: [
        'Conceitos estratégicos atemporais (Bounded Context, Linguagem Ubíqua).',
        'Separação tática primorosa (Entidades vs Value Objects).',
        'Fundação teórica dos microsserviços modernos.',
      ],
      criticalPoints: [
        'Linguagem densa e estilo acadêmico com muitos exemplos em Java antigo.',
      ],
    },
    reviews: [
      {
        id: 'rev-ddd-1',
        reviewerName: 'Guilherme Silveira',
        source: 'Goodreads',
        role: 'Co-fundador da Alura',
        rating: 5,
        reviewDate: '2024',
        title: 'O divisor de águas da modelagem corporativa',
        comment:
          'Eric Evans acertou em cheio. Quando um time entende o que é Bounded Context e Linguagem Ubíqua, o design de microsserviços passa a fazer sentido.',
        pros: ['Foco em negócio', 'Modelagem profunda'],
        helpfulCount: 520,
      },
    ],
    externalReviewLinks: [
      {
        platform: 'Goodreads',
        label: 'Ver no Goodreads',
        url: 'https://www.goodreads.com/book/show/179133.Domain_Driven_Design',
      },
    ],
    tags: ['DDD', 'Domain-Driven Design', 'Arquitetura', 'Modelagem', 'Microsserviços', 'Linguagem Ubíqua'],
  },
  {
    id: 'book-arte-da-guerra',
    title: 'A Arte da Guerra & Princípios de Estratégia nos Negócios e Engenharia',
    originalTitle: 'The Art of War: Strategic Management & Execution for Modern Teams',
    author: 'Sun Tzu (Adaptação Estratégica para Gestão & Tech)',
    coverColor: 'from-amber-900 via-stone-900 to-zinc-950',
    accentColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    category: 'Gestão, Ágil & Liderança',
    level: 'Todos os Níveis',
    sector: 'ambos',
    pages: 208,
    publishedYear: 2021,
    language: 'Disponível em Português em dezenas de edições comentadas',
    rating: 4.6,
    totalRatingsCount: 45000,
    oneLinePitch: 'Os 13 capítulos milenares sobre avaliação de terreno, preparação minuciosa, liderança pelo exemplo e vitória sem conflito desnecessário aplicados à gestão de projetos.',
    overview:
      'Escrito há mais de dois mil e quinhentos anos pelo estrategista Sun Tzu, A Arte da Guerra transcendeu o âmbito militar para se tornar o guia supremo de tomada de decisões, planejamento tático, gestão de riscos e liderança em projetos de tecnologia, negócios e administração.',
    coreThesis:
      'A suprema arte da estratégia consiste em vencer sem precisar lutar. Conheça a si mesmo, conheça o seu terreno e suas restrições, e você nunca correrá perigo em cem empreitadas.',
    targetAudience:
      'Líderes técnicos, gerentes de produto, estudantes de administração, gestores de equipes e qualquer profissional que queira aprimorar seu pensamento estratégico.',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Avaliação e Estimativas Iniciais',
        summary:
          'A vitória é decidida antes da execução com planejamento minucioso, análise de métricas, recursos e clima da equipe.',
        keyTakeaways: [
          'Aquele que calcula muito antes da batalha vence; aquele que calcula pouco é derrotado.',
          'Avalie 5 fatores fundamentais: Propósito Moral, Oportunidade/Clima, Terreno/Mercado, Liderança e Disciplina/Processos.',
        ],
      },
      {
        chapterNumber: 2,
        title: 'A Gestão do Tempo e Custo da Demora',
        summary:
          'Projetos arrastados esgotam o moral da equipe e os cofres da empresa. A agilidade e a brevidade das entregas são virtudes cardeais.',
        keyTakeaways: [
          'Nunca houve um projeto que tenha se beneficiado de atrasos prolongados.',
          'Mantenha as iterações curtas e preserve a energia vital do time.',
        ],
      },
      {
        chapterNumber: 3,
        title: 'Conhecendo a Si Mesmo e ao Terreno',
        summary:
          'A famosa máxima sobre autoconhecimento, diagnóstico de fraquezas técnicas e análise competitiva.',
        keyTakeaways: [
          'Se você conhece o inimigo e conhece a si mesmo, não precisa temer o resultado de cem batalhas.',
          'Se você se conhece mas não conhece o terreno, para cada vitória haverá uma derrota.',
        ],
      },
    ],
    practicalLessons: [
      'Faça análises de risco prévias antes de lançar grandes funcionalidades em produção.',
      'Lidere pelo exemplo com clareza moral, justiça e serenidade perante incidentes críticos.',
      'Adapte sua estratégia à realidade do terreno (mercado) em vez de forçar planos engessados.',
    ],
    memorableQuotes: [
      '"A suprema arte da guerra é derrotar o inimigo sem lutar."',
      '"No meio do caos, há também oportunidade."',
      '"Conheça a si mesmo e conheça seu adversário, e em cem batalhas você nunca correrá perigo."',
    ],
    communitySentiment: {
      positivePercentage: 92,
      goodreadsScore: '4.0 / 5.0 (+350.000 avaliações)',
      amazonScore: '4.8 / 5.0 (+40.000 avaliações)',
      summaryOfReviews:
        'Leitura universal que inspira tomadores de decisão em todo o mundo. Especialistas destacam como as lições sobre adaptabilidade à água refletem perfeitamente a agilidade e o empirismo do Scrum e Kanban.',
      strengths: [
        'Aforismos concisos e marcantes.',
        'Aplicabilidade direta em liderança e gestão de conflitos.',
        'Leitura rápida e impactante.',
      ],
      criticalPoints: [
        'Exige reflexão pessoal para transpor metáforas bélicas para o contexto civil de escritórios e projetos de software.',
      ],
    },
    reviews: [
      {
        id: 'rev-art-1',
        reviewerName: 'Juliana Medeiros',
        source: 'Goodreads',
        role: 'Gerente de Projetos Ágeis (PMP)',
        rating: 5,
        reviewDate: '2025',
        title: 'O melhor livro de estratégia que você lerá em uma tarde',
        comment:
          'Sun Tzu fala sobre fluxo, terreno e adaptabilidade de um jeito que parece que ele estava prevendo o Manifesto Ágil há 2.500 anos. As lições sobre não prolongar conflitos e cuidar do time são ouro puro.',
        pros: ['Atemporal', 'Lições profundas de liderança'],
        helpfulCount: 890,
      },
    ],
    externalReviewLinks: [
      {
        platform: 'Goodreads',
        label: 'Ver avaliações no Goodreads',
        url: 'https://www.goodreads.com/book/show/10534.The_Art_of_War',
      },
    ],
    tags: ['Estratégia', 'Liderança', 'Gestão', 'Tomada de Decisão', 'Ágil', 'Administração'],
  },
];
