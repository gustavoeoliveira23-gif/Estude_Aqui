export interface DiagnosticOption {
  text: string;
  correct: boolean;
  reason: string;
}

export interface DiagnosticQuestion {
  id: number;
  question: string;
  topic: string;
  weight: 'Iniciante' | 'Intermediário' | 'Avançado';
  options: DiagnosticOption[];
  trapWarning: string;
  recommendedBookOrDoc: string;
  studyTechnique: string;
}

export interface StudyAreaDefinition {
  id: string;
  name: string;
  shortTitle: string;
  description: string;
  iconName: string;
  color: string;
  curatedDriveBook: string;
  tags: string[];
  questions: DiagnosticQuestion[];
}

export const STUDY_AREAS: StudyAreaDefinition[] = [
  {
    id: 'algoritmos',
    name: 'Algoritmos & Estruturas de Dados',
    shortTitle: 'Algoritmos & Dados',
    description: 'Análise assintótica (Big-O), árvores binárias, tabelas hash, recursão e grafos.',
    iconName: 'Binary',
    color: 'emerald',
    curatedDriveBook: 'Algoritmos: Teoria e Prática - CLRS (Thomas H. Cormen)',
    tags: ['Big-O', 'BST', 'Grafos', 'Hash', 'Programação Dinâmica'],
    questions: [
      {
        id: 101,
        question: 'Ao analisar a complexidade temporal de um algoritmo com dois laços aninhados independentes onde o laço externo executa N vezes e o interno executa N/2 vezes, qual é a classificação na Notação Big-O?',
        topic: 'Complexidade de Algoritmos & Notação Big-O',
        weight: 'Iniciante',
        options: [
          { text: 'O(N)', correct: false, reason: 'O(N) representaria apenas um único laço linear sem aninhamento.' },
          { text: 'O(N²)', correct: true, reason: 'O número total de operações é N * (N/2) = (1/2)N². Na análise assintótica Big-O, constantes multiplicativas como 1/2 são descartadas, restando O(N²).' },
          { text: 'O(N log N)', correct: false, reason: 'O(N log N) é comum em divisão e conquista (Merge Sort, Heap Sort), não em loops aninhados simples.' },
          { text: 'O(log N)', correct: false, reason: 'O(log N) reduz o espaço de busca pela metade a cada passo (como busca binária).' }
        ],
        trapWarning: 'Muitos estudantes se confundem com o fator N/2 e acham que a complexidade cai para O(N) ou O(N/2). Lembre-se: no Big-O ignoramos constantes multiplicativas!',
        recommendedBookOrDoc: 'Algoritmos: Teoria e Prática (Cormen, Cap. 3: Notação Assintótica)',
        studyTechnique: 'Prática deliberada calculando contagem de operações passo a passo para loops.'
      },
      {
        id: 102,
        question: 'Em uma Árvore Binária de Busca (BST) não-balanceada, qual é a complexidade temporal de pior caso para buscar um elemento inserido com chaves estritamente ordenadas?',
        topic: 'Árvores Binárias de Busca (BST)',
        weight: 'Intermediário',
        options: [
          { text: 'O(log N)', correct: false, reason: 'O(log N) é a busca em árvore balanceada (como AVL ou Rubro-Negra), não no pior caso de uma BST simples.' },
          { text: 'O(1)', correct: false, reason: 'Acesso em tempo constante é típico de tabelas hash ou arrays com índice direto.' },
          { text: 'O(N)', correct: true, reason: 'Se os elementos forem inseridos em ordem crescente (ou decrescente), a BST se degenera em uma lista encadeada, tornando a profundidade igual a N e a busca linear O(N).' },
          { text: 'O(N²)', correct: false, reason: 'Não há dois loops na busca; apenas a travessia de uma lista linear de tamanho N.' }
        ],
        trapWarning: 'Achar que BST sempre faz busca em O(log N). Uma BST sem mecanismo de rotação de balanceamento pode degradar para O(N)!',
        recommendedBookOrDoc: 'Algoritmos: Teoria e Prática (Cormen, Cap. 12: Árvores Binárias de Busca & Cap. 13: Rubro-Negras)',
        studyTechnique: 'Desenhar visualmente a inserção de [1, 2, 3, 4, 5] em uma folha para enxergar a degeneração em lista.'
      },
      {
        id: 103,
        question: 'Ao implementar uma Tabela Hash, o que acontece no pior caso se a função hash mapear todas as chaves inseridas exatamente para o mesmo bucket (índice)?',
        topic: 'Tabelas Hash & Tratamento de Colisões',
        weight: 'Intermediário',
        options: [
          { text: 'A busca mantém o tempo constante O(1) devido à indexação da memória.', correct: false, reason: 'Se todas caírem no mesmo bucket, perde-se a vantagem do endereçamento direto.' },
          { text: 'A complexidade de busca degenera para O(N), pois será necessário percorrer a lista de colisões.', correct: true, reason: 'Com encadeamento separado (separate chaining), todos os elementos formam uma lista ligada no mesmo índice, forçando busca linear O(N).' },
          { text: 'A tabela lança um estouro de pilha (Stack Overflow) imediatamente.', correct: false, reason: 'Stack Overflow ocorre por recursão profunda ou pilha cheia, não em colisão de hash.' },
          { text: 'A tabela converte automaticamente as chaves para chaves criptográficas RSA.', correct: false, reason: 'Funções hash de tabelas priorizam velocidade e distribuição uniforme, não RSA.' }
        ],
        trapWarning: 'Confundir a garantia média de O(1) com a garantia estrita de pior caso. A qualidade da função hash define o sucesso do hash map.',
        recommendedBookOrDoc: 'Designing Data-Intensive Applications (Kleppmann, Cap. 3: Mecanismos de Armazenamento e Índices)',
        studyTechnique: 'Active Recall: explicar a diferença entre endereçamento aberto (probing) e encadeamento separado.'
      },
      {
        id: 104,
        question: 'Qual algoritmo de travessia em grafos é naturalmente adequado para encontrar o menor caminho (menor número de arestas) em um grafo não-ponderado?',
        topic: 'Algoritmos em Grafos',
        weight: 'Avançado',
        options: [
          { text: 'Busca em Profundidade (DFS - Depth-First Search)', correct: false, reason: 'DFS explora ramos até a profundidade máxima, não garantindo o menor caminho em arestas.' },
          { text: 'Busca em Largura (BFS - Breadth-First Search) utilizando uma Fila (FIFO)', correct: true, reason: 'BFS expande os vértices em camadas concêntricas (distância 1, distância 2...), garantindo que o primeiro encontro com o destino é o caminho mínimo em grafos não-ponderados.' },
          { text: 'Algoritmo de Prim para Árvore Geradora Mínima', correct: false, reason: 'Prim encontra a árvore geradora mínima (MST), não o caminho entre dois nós.' },
          { text: 'Ordenação Topológica com Pilha', correct: false, reason: 'Ordenação topológica é usada para dependências em DAGs, não para caminho mínimo.' }
        ],
        trapWarning: 'Usar DFS para buscar caminho mais curto. DFS é excelente para detectar ciclos ou componentes conectados, mas BFS é a escolha para menor caminho sem pesos.',
        recommendedBookOrDoc: 'Algoritmos: Teoria e Prática (Cormen, Cap. 22: Algoritmos Elementares em Grafos)',
        studyTechnique: 'Implementar BFS com fila e comparar o rastreamento da matriz de distâncias com o DFS.'
      }
    ]
  },
  {
    id: 'engenharia_software',
    name: 'Engenharia de Software & Arquitetura',
    shortTitle: 'Engenharia & Arquitetura',
    description: 'Princípios SOLID, Clean Architecture, Padrões de Projeto (GoF), coesão e testes.',
    iconName: 'Layers',
    color: 'blue',
    curatedDriveBook: 'Código Limpo (Robert C. Martin) & Padrões de Projeto (GoF)',
    tags: ['SOLID', 'Clean Code', 'Design Patterns', 'Testes', 'Acoplamento'],
    questions: [
      {
        id: 201,
        question: 'No acrônimo SOLID, o Princípio da Inversão de Dependência (DIP - Dependency Inversion Principle) estabelece que:',
        topic: 'Princípios SOLID & Arquitetura',
        weight: 'Intermediário',
        options: [
          { text: 'Módulos de alto nível não devem depender de módulos de baixo nível; ambos devem depender de abstrações.', correct: true, reason: 'DIP afirma que detalhes de implementação devem depender de abstrações (interfaces/contratos), e não o contrário, desacoplando regras de negócio do banco ou UI.' },
          { text: 'Toda dependência deve ser estática e importada no início do arquivo.', correct: false, reason: 'Import estático não tem relação com o princípio arquitetural DIP.' },
          { text: 'Classes filhas não devem sobrescrever métodos da classe pai.', correct: false, reason: 'Isso se aproxima do Princípio de Substituição de Liskov (LSP), não do DIP.' },
          { text: 'Não devemos utilizar injeção de dependência para evitar consumo de memória.', correct: false, reason: 'Pelo contrário: injeção de dependência é a principal técnica prática para cumprir o DIP.' }
        ],
        trapWarning: 'Confundir Inversão de Dependência (princípio arquitetural) com Injeção de Dependência (padrão de implementação) ou com Inversão de Controle (IoC).',
        recommendedBookOrDoc: 'Código Limpo (Robert C. Martin) & Princípios, Padrões e Práticas Ágeis',
        studyTechnique: 'Refatorar uma classe de serviço que instanciava diretamente um repositório SQL para receber uma interface no construtor.'
      },
      {
        id: 202,
        question: 'Qual padrão de projeto GoF comportamental permite definir uma família de algoritmos, encapsular cada um deles e torná-los intercambiáveis em tempo de execução sem alterar quem os consome?',
        topic: 'Padrões de Projeto (GoF)',
        weight: 'Intermediário',
        options: [
          { text: 'Singleton', correct: false, reason: 'Singleton garante apenas uma instância global de uma classe (padrão criacional).' },
          { text: 'Strategy', correct: true, reason: 'O padrão Strategy permite variar o algoritmo (ex: cálculo de frete, regras de desconto) delegando a execução para objetos polimórficos.' },
          { text: 'Adapter', correct: false, reason: 'Adapter converte a interface de uma classe para outra interface esperada pelos clientes (estrutural).' },
          { text: 'Decorator', correct: false, reason: 'Decorator adiciona responsabilidades extras dinamicamente sem usar herança (estrutural).' }
        ],
        trapWarning: 'Usar múltiplos blocos de if/else ou switch/case gigantescos quando um Strategy resolveria com polimorfismo limpo e respeito ao Princípio Aberto/Fechado (OCP).',
        recommendedBookOrDoc: 'Padrões de Projeto: Soluções Reutilizáveis de Software Orientado a Objetos (GoF)',
        studyTechnique: 'Prática de Feynman: explicar o Strategy simulando diferentes estratégias de pagamento (PIX, Cartão, Boleto).'
      },
      {
        id: 203,
        question: 'Na Arquitetura Limpa (Clean Architecture) de Robert C. Martin, qual é a "Regra de Dependência" fundamental que governa a relação entre as camadas concêntricas?',
        topic: 'Arquitetura Limpa & Hexagonal',
        weight: 'Avançado',
        options: [
          { text: 'As entidades de domínio devem importar os modelos do framework web para validação automática.', correct: false, reason: 'A camada de domínio nunca deve conhecer detalhes da web ou frameworks externos.' },
          { text: 'O código-fonte só pode apontar dependências para dentro, em direção às políticas de mais alto nível (Domínio/Entidades).', correct: true, reason: 'A regra de ouro da Clean Architecture: dependências apontam para dentro. Nada no círculo interno sabe nada sobre o círculo externo.' },
          { text: 'O banco de dados deve controlar a lógica de negócios por meio de triggers e stored procedures.', correct: false, reason: 'O banco de dados é um mero detalhe na camada externa; o domínio não deve depender de triggers.' },
          { text: 'Todas as camadas devem se comunicar bidirecionalmente sem interfaces intermediárias.', correct: false, reason: 'A comunicação bidirecional direta cria acoplamento cíclico indesejado.' }
        ],
        trapWarning: 'Achar que a entidade de negócio pode ter decorators de ORM (ex: @Entity, @Column) sem ferir a independência do domínio.',
        recommendedBookOrDoc: 'Arquitetura Limpa: O Guia do Artesão para Estrutura e Design de Software (Robert C. Martin)',
        studyTechnique: 'Desenhar os círculos concêntricos e verificar para onde apontam os imports no seu código.'
      },
      {
        id: 204,
        question: 'Ao escrever testes automatizados de unidade, qual a diferença essencial entre um Mock e um Stub?',
        topic: 'Testes Automatizados & Qualidade',
        weight: 'Intermediário',
        options: [
          { text: 'Mocks apenas fornecem dados fixos gravados; Stubs verificam expectativas de chamada e parâmetros.', correct: false, reason: 'A definição está invertida! Stubs fornecem respostas pré-definidas; Mocks verificam o comportamento (se o método foi chamado X vezes).' },
          { text: 'Stubs fornecem respostas pré-programadas para chamadas; Mocks são configurados para verificar comportamento e chamadas esperadas.', correct: true, reason: 'Conforme Martin Fowler: Stubs respondem a consultas com dados fictícios. Mocks verificam a interação (teste comportamental de chamadas de métodos).' },
          { text: 'Mocks rodam em banco de dados real em produção; Stubs rodam apenas na máquina do desenvolvedor.', correct: false, reason: 'Ambos são dublês de teste que evitam conexões externas reais em testes unitários.' },
          { text: 'Não existe diferença técnica; os termos são sinônimos perfeitos.', correct: false, reason: 'São tipos distintos de "Test Doubles" (Dublês de Teste).' }
        ],
        trapWarning: 'Chamar qualquer dublê de teste de "mock" e focar em testar implementação interna em vez de saídas observáveis.',
        recommendedBookOrDoc: 'Refatoração: Aperfeiçoando o Design de Código Existente (Martin Fowler)',
        studyTechnique: 'Escrever um teste unitário simples usando Spy/Mock e outro usando Stub e analisar o assert.'
      }
    ]
  },
  {
    id: 'banco_dados',
    name: 'Banco de Dados & Modelagem SQL',
    shortTitle: 'Banco de Dados & SQL',
    description: 'Transações ACID, modelagem relacional, índices B-Tree, normalização e otimização.',
    iconName: 'Database',
    color: 'purple',
    curatedDriveBook: 'Sistema de Banco de Dados (Silberschatz, Korth & Sudarshan)',
    tags: ['ACID', 'SQL', 'Índices B-Tree', 'Normalização', 'Transações'],
    questions: [
      {
        id: 301,
        question: 'Em um Sistema Gerenciador de Banco de Dados Relacional (SGBDR), o fenômeno de "Leitura Fantasma" (Phantom Read) ocorre quando:',
        topic: 'Transações ACID & Níveis de Isolamento',
        weight: 'Avançado',
        options: [
          { text: 'Uma transação lê dados modificados por outra transação que ainda não efetuou COMMIT e depois sofreu ROLLBACK.', correct: false, reason: 'Isso é uma "Leitura Suja" (Dirty Read), comum no nível Read Uncommitted.' },
          { text: 'Uma transação lê o mesmo registro duas vezes e encontra valores de colunas alterados por outra transação com COMMIT.', correct: false, reason: 'Isso é uma "Leitura Não-Repetível" (Non-Repeatable Read).' },
          { text: 'Uma transação executa uma consulta de busca por intervalo e, ao reexecutar a mesma consulta, encontra novas linhas inseridas e confirmadas por outra transação.', correct: true, reason: 'Exato! Novas linhas ("fantasmas") passam a satisfazer a condição do predicado WHERE durante a mesma transação. Só é evitado no nível Serializable.' },
          { text: 'O banco de dados perde os dados gravados no disco após uma falha de energia elétrica.', correct: false, reason: 'Isso seria uma quebra da propriedade de Durabilidade (D do ACID).' }
        ],
        trapWarning: 'Confundir Leitura Não-Repetível (modificação em linhas existentes) com Leitura Fantasma (inserção de novas linhas no intervalo).',
        recommendedBookOrDoc: 'Sistema de Banco de Dados (Silberschatz, Cap. 14: Transações & Cap. 15: Controle de Concorrência)',
        studyTechnique: 'Construir uma tabela comparativa dos 4 níveis de isolamento ANSI SQL vs as 3 anomalias clássicas.'
      },
      {
        id: 302,
        question: 'Ao criar um índice composto em PostgreSQL ou MySQL nas colunas (status, data_criacao), por que uma consulta com "WHERE data_criacao > \'2026-01-01\'" não aproveita plenamente o índice?',
        topic: 'Índices & Otimização de Consultas',
        weight: 'Intermediário',
        options: [
          { text: 'Índices B-Tree funcionam exclusivamente com comparações de igualdade estrita (=).', correct: false, reason: 'Índices B-Tree suportam comparações de intervalo (> , < , BETWEEN) perfeitamente.' },
          { text: 'Índices compostos exigem o uso das colunas da esquerda para a direita (Left-to-Right Prefix Rule).', correct: true, reason: 'A árvore B-Tree composta é ordenada primariamente pela primeira coluna (status). Sem filtrar por status, o SGBD não pode navegar diretamente até as folhas e tende a fazer Full Table Scan.' },
          { text: 'A data deve ser convertida obrigatoriamente para timestamp numérico no cliente.', correct: false, reason: 'Tipos DATE e TIMESTAMP são indexáveis nativamente.' },
          { text: 'Índices compostos só podem ter no máximo uma coluna de data.', correct: false, reason: 'Não há essa restrição nos principais SGBDs.' }
        ],
        trapWarning: 'Criar índices compostos sem considerar a ordem das colunas nas consultas mais frequentes (regra do prefixo mais à esquerda).',
        recommendedBookOrDoc: 'Designing Data-Intensive Applications (Kleppmann, Cap. 3: Índices B-Tree & LSM-Trees)',
        studyTechnique: 'Utilizar o comando EXPLAIN ANALYZE no SQL para visualizar quando o planejador usa Index Scan vs Seq Scan.'
      },
      {
        id: 303,
        question: 'Para uma tabela estar em Terceira Forma Normal (3NF), além de estar na Segunda Forma Normal (2NF), qual condição é indispensável?',
        topic: 'Modelagem de Dados & Normalização',
        weight: 'Intermediário',
        options: [
          { text: 'Todos os atributos devem ser do tipo numérico inteiro.', correct: false, reason: 'Normalização diz respeito a dependências funcionais, não tipos de dados primitivos.' },
          { text: 'Não deve haver dependência funcional transitiva de atributos não-chave em relação à chave primária.', correct: true, reason: '3NF: nenhum atributo não-chave depende transitivamente da chave primária (X -> Y e Y -> Z onde Z é não-chave). "Todo atributo deve depender da chave, de toda a chave e de nada além da chave".' },
          { text: 'A tabela não pode possuir relacionamentos de chave estrangeira com outras tabelas.', correct: false, reason: 'Pelo contrário: chaves estrangeiras viabilizam a normalização sem redundância.' },
          { text: 'A tabela deve possuir campos multivalorados em formato JSON.', correct: false, reason: 'Campos multivalorados violam até mesmo a 1ª Forma Normal (1NF).' }
        ],
        trapWarning: 'Armazenar o CEP e junto o Bairro e a Cidade na mesma tabela de Usuário: se Bairro depende do CEP, há dependência transitiva violando a 3NF!',
        recommendedBookOrDoc: 'Sistema de Banco de Dados (Silberschatz, Cap. 7: Design de Banco de Dados Relacionais)',
        studyTechnique: 'Mapear as dependências funcionais em setas (A -> B) para identificar visualmente dependências transitivas.'
      },
      {
        id: 304,
        question: 'Em uma cláusula SQL, qual é a diferença fundamental de momento de avaliação entre WHERE e HAVING?',
        topic: 'Consultas SQL Avançadas',
        weight: 'Iniciante',
        options: [
          { text: 'WHERE filtra linhas individuais antes de qualquer agregação; HAVING filtra os grupos formados pelo GROUP BY após a agregação.', correct: true, reason: 'WHERE opera em tuplas individuais antes do GROUP BY. HAVING opera sobre o resultado das funções agregadas (como SUM, COUNT, AVG).' },
          { text: 'HAVING só pode ser utilizado com operadores matemáticos de multiplicação.', correct: false, reason: 'HAVING aceita qualquer expressão booleana sobre agregados.' },
          { text: 'WHERE é opcional, mas HAVING é obrigatório em todas as instruções SELECT.', correct: false, reason: 'Ambos são opcionais.' },
          { text: 'WHERE é exclusivo de bancos NoSQL e HAVING de bancos relacionais.', correct: false, reason: 'Ambos são cláusulas padronizadas do ANSI SQL relacional.' }
        ],
        trapWarning: 'Tentar colocar funções de agregação como "WHERE COUNT(*) > 5", gerando erro de sintaxe SQL, em vez de usar "HAVING COUNT(*) > 5".',
        recommendedBookOrDoc: 'Manual Prático: Banco de Dados Relacionais, Modelagem e SQL (Acervo)',
        studyTechnique: 'Mentalizar o pipeline de execução da query SQL: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.'
      }
    ]
  },
  {
    id: 'desenvolvimento_web',
    name: 'Desenvolvimento Web & APIs RESTful',
    shortTitle: 'Web & APIs REST',
    description: 'Semântica HTTP, idempotência, autenticação JWT, CORS, caching e design REST.',
    iconName: 'Globe',
    color: 'amber',
    curatedDriveBook: 'Apresentação: Redes e HTTP/REST & Designing Data-Intensive Applications',
    tags: ['HTTP', 'REST', 'JWT', 'CORS', 'Idempotência'],
    questions: [
      {
        id: 401,
        question: 'No padrão arquitetural REST, qual é a diferença semântica e de idempotência entre os métodos HTTP PUT e PATCH?',
        topic: 'Semântica HTTP & Idempotência',
        weight: 'Intermediário',
        options: [
          { text: 'PUT é utilizado para modificação parcial e não é idempotente; PATCH substitui todo o documento e é estritamente idempotente.', correct: false, reason: 'A definição está invertida! PUT substitui o recurso completo e é idempotente; PATCH altera parcialmente.' },
          { text: 'PUT é semanticamente uma substituição completa do recurso (idempotente); PATCH representa uma modificação parcial (não garantidamente idempotente).', correct: true, reason: 'PUT envia a representação completa do recurso; se repetido 10 vezes com os mesmos dados, o estado final no servidor é idêntico. PATCH envia apenas deltas de alteração.' },
          { text: 'Ambos funcionam exatamente igual e a RFC HTTP os considera sinônimos intercambiáveis.', correct: false, reason: 'A RFC 7231 e RFC 5789 especificam propósitos semânticos e regras de idempotência distintas.' },
          { text: 'PATCH não permite corpo de requisição (body) no padrão HTTP.', correct: false, reason: 'PATCH transporta obrigatoriamente um payload com as instruções de modificação (ex: JSON Patch).' }
        ],
        trapWarning: 'Achar que enviar PUT com apenas 1 campo atualiza somente esse campo sem apagar os demais campos omitidos.',
        recommendedBookOrDoc: 'RFC 7231 (HTTP/1.1 Semantics and Content) & RFC 5789 (PATCH Method for HTTP)',
        studyTechnique: 'Fazer requisições reais com cURL ou Postman testando múltiplos PUTs seguidos para observar a idempotência.'
      },
      {
        id: 402,
        question: 'Ao implementar autenticação baseada em JSON Web Token (JWT) em uma aplicação web SPA, qual é a prática recomendada para armazenar o Refresh Token contra ataques XSS?',
        topic: 'Segurança em APIs & Autenticação',
        weight: 'Intermediário',
        options: [
          { text: 'Gravar no localStorage do navegador para acesso direto por scripts JavaScript.', correct: false, reason: 'localStorage é vulnerável a qualquer injeção de script malicioso (XSS), permitindo roubo do token.' },
          { text: 'Armazenar em um cookie HTTP com as flags HttpOnly, Secure e SameSite.', correct: true, reason: 'A flag HttpOnly impede que o JavaScript do navegador leia o cookie, protegendo contra roubo por XSS. Secure exige HTTPS e SameSite previne CSRF.' },
          { text: 'Armazenar na URL da página através de query parameters.', correct: false, reason: 'Tokens em URLs vazam em histórico do browser, logs de servidores proxy e headers Referer.' },
          { text: 'Desativar a criptografia e usar texto puro em memória global.', correct: false, reason: 'Extremamente inseguro.' }
        ],
        trapWarning: 'Salvar tokens sensíveis no localStorage por comodidade sem se atentar aos riscos de Cross-Site Scripting (XSS).',
        recommendedBookOrDoc: 'OWASP REST Security Cheat Sheet & RFC 7519 (JSON Web Token)',
        studyTechnique: 'Inspecionar a aba Application/Cookies no DevTools do navegador verificando as flags HttpOnly e Secure.'
      },
      {
        id: 403,
        question: 'O que desencadeia uma requisição de pré-verificação ("Preflight" OPTIONS) em uma comunicação Cross-Origin Resource Sharing (CORS)?',
        topic: 'CORS & Navegadores',
        weight: 'Avançado',
        options: [
          { text: 'Qualquer requisição GET sem parâmetros de busca na URL.', correct: false, reason: 'GET simples com headers padrão não dispara preflight.' },
          { text: 'Requisições que utilizam métodos como PUT/DELETE ou cabeçalhos personalizados que fogem da categoria de "Simple Requests".', correct: true, reason: 'O navegador envia um OPTIONS automático antes da requisição real para checar se a origem remota autoriza os headers, métodos e credenciais solicitados.' },
          { text: 'O uso de imagens através da tag <img>.', correct: false, reason: 'Tags <img> realizam requisições cross-origin simples permitidas por padrão.' },
          { text: 'Apenas quando o usuário estiver navegando em modo anônimo.', correct: false, reason: 'CORS é aplicado independentemente do modo de navegação.' }
        ],
        trapWarning: 'Achar que o erro de CORS é um erro do backend. É uma proteção do próprio navegador no cliente que bloqueia respostas quando o preflight falha.',
        recommendedBookOrDoc: 'MDN Web Docs: Cross-Origin Resource Sharing (CORS)',
        studyTechnique: 'Analisar o fluxo: Requisição OPTIONS -> Headers Access-Control-Allow-Origin -> Requisição real.'
      },
      {
        id: 404,
        question: 'Qual código de status HTTP deve ser retornado por uma API RESTful ao criar com sucesso um novo recurso no servidor contendo o cabeçalho "Location" para o novo ID?',
        topic: 'Códigos de Status HTTP',
        weight: 'Iniciante',
        options: [
          { text: '200 OK', correct: false, reason: '200 indica sucesso genérico, mas a criação de novos recursos tem status semântico próprio.' },
          { text: '201 Created', correct: true, reason: '201 Created indica explicitamente que um novo recurso foi criado, frequentemente acompanhado do cabeçalho Location.' },
          { text: '204 No Content', correct: false, reason: '204 é para ações bem-sucedidas que não retornam corpo de resposta (ex: DELETE).' },
          { text: '304 Not Modified', correct: false, reason: '304 é status de cache condicional, não de criação.' }
        ],
        trapWarning: 'Retornar sempre 200 OK para tudo, inclusive criações, deleções e erros de validação com { status: "error" }.',
        recommendedBookOrDoc: 'HTTP: The Definitive Guide & RFC 7231',
        studyTechnique: 'Flashcards com as faixas de status HTTP (2xx Sucesso, 3xx Redirecionamento, 4xx Erro do Cliente, 5xx Erro do Servidor).'
      }
    ]
  },
  {
    id: 'redes_sistemas',
    name: 'Redes de Computadores & Sistemas Operacionais',
    shortTitle: 'Redes & Sistemas Op.',
    description: 'Modelo TCP/IP, processos e threads, memória virtual, paginação e concorrência.',
    iconName: 'Network',
    color: 'cyan',
    curatedDriveBook: 'Redes de Computadores (Tanenbaum) & Sistemas Operacionais Modernos (Tanenbaum)',
    tags: ['TCP/IP', 'Threads', 'Memória Virtual', 'Processos', 'Deadlock'],
    questions: [
      {
        id: 501,
        question: 'No protocolo de transporte TCP, como é estabelecida uma conexão confiável entre cliente e servidor (Three-Way Handshake)?',
        topic: 'Redes de Computadores & Protocolo TCP',
        weight: 'Iniciante',
        options: [
          { text: 'Cliente envia SYN -> Servidor responde com SYN-ACK -> Cliente confirma com ACK.', correct: true, reason: 'O aperto de mão de três vias sincroniza os números de sequência iniciais e confirma que ambas as partes podem transmitir e receber dados antes do tráfego.' },
          { text: 'Cliente envia DATA -> Servidor envia ACK -> Conexão fechada.', correct: false, reason: 'Dados só fluem após a conexão estar no estado ESTABLISHED.' },
          { text: 'Cliente envia FIN -> Servidor responde com RST -> Conexão criada.', correct: false, reason: 'FIN e RST são utilizados para encerramento e reinicialização de conexões.' },
          { text: 'Servidor envia PING -> Cliente responde PONG.', correct: false, reason: 'PING/PONG é protocolo ICMP de eco, não o handshake TCP.' }
        ],
        trapWarning: 'Esquecer que tanto o cliente quanto o servidor precisam sincronizar (SYN) e confirmar (ACK) seus números de sequência de pacotes.',
        recommendedBookOrDoc: 'Redes de Computadores (Tanenbaum, Cap. 6: A Camada de Transporte)',
        studyTechnique: 'Usar o Wireshark para capturar e inspecionar os pacotes SYN, SYN+ACK e ACK de uma requisição.'
      },
      {
        id: 502,
        question: 'Qual é a diferença fundamental entre um Processo e uma Thread em termos de recursos de memória alocados pelo Sistema Operacional?',
        topic: 'Sistemas Operacionais & Concorrência',
        weight: 'Intermediário',
        options: [
          { text: 'Processos compartilham o mesmo espaço de endereçamento; threads possuem espaços de memória completamente isolados.', correct: false, reason: 'A definição está invertida! Processos possuem espaço de memória isolado; threads compartilham a memória do mesmo processo.' },
          { text: 'Processos possuem seu próprio espaço de endereçamento de memória isolado; threads pertencentes ao mesmo processo compartilham o heap, código e dados.', correct: true, reason: 'Cada processo tem sua própria tabela de páginas e memória virtual protegida. Threads compartilham os dados globais e heap, tendo apenas pilhas (stacks) e registradores próprios.' },
          { text: 'Threads só podem rodar em computadores com mais de 64 GB de memória RAM.', correct: false, reason: 'Qualquer processador moderno suporta threads.' },
          { text: 'Não há diferença no consumo de memória ou isolamento entre processos e threads.', correct: false, reason: 'A troca de contexto entre processos é consideravelmente mais pesada devido à troca do espaço de memória virtual.' }
        ],
        trapWarning: 'Esquecer que, por compartilharem o mesmo heap, threads exigem mecanismos de sincronização (mutex/locks) para evitar condições de corrida.',
        recommendedBookOrDoc: 'Sistemas Operacionais Modernos (Tanenbaum, Cap. 2: Processos e Threads)',
        studyTechnique: 'Desenhar a estrutura de memória de um processo contendo 3 threads compartilhando o Heap.'
      },
      {
        id: 503,
        question: 'O que caracteriza uma falha de página ("Page Fault") no gerenciamento de Memória Virtual de um Sistema Operacional?',
        topic: 'Memória Virtual & Paginação',
        weight: 'Avançado',
        options: [
          { text: 'Um erro crítico de hardware na placa-mãe que exige a reinicialização física da máquina.', correct: false, reason: 'Page fault é um evento de software/hardware rotineiro do subsistema de memória virtual.' },
          { text: 'A tentativa da CPU de acessar uma página virtual cujo bit de presença indica que ela não está atualmente carregada na memória física (RAM).', correct: true, reason: 'A Unidade de Gerenciamento de Memória (MMU) gera uma interrupção (trap) para o S.O., que busca a página no disco/swap e a carrega na RAM.' },
          { text: 'Um ataque cibernético de buffer overflow em servidores web.', correct: false, reason: 'Buffer overflow é uma vulnerabilidade de código, não um page fault de memória virtual.' },
          { text: 'Quando um arquivo de log excede 4 GB de tamanho no disco.', correct: false, reason: 'Não tem relação com arquivos de log.' }
        ],
        trapWarning: 'Achar que "Fault" (falha) significa um bug ou travamento do sistema. É um mecanismo normal de paginação sob demanda!',
        recommendedBookOrDoc: 'Sistemas Operacionais Modernos (Tanenbaum, Cap. 3: Gerenciamento de Memória)',
        studyTechnique: 'Active Recall: explicar o ciclo MMU -> Trap -> Busca no Swap -> Atualização da Tabela de Páginas.'
      },
      {
        id: 504,
        question: 'Quais são as quatro condições simultâneas de Coffman necessárias para que ocorra uma situação de Impasse (Deadlock) no sistema?',
        topic: 'Deadlocks & Concorrência',
        weight: 'Avançado',
        options: [
          { text: 'Exclusão Mútua, Posse e Espera, Não-Preempção e Espera Circular.', correct: true, reason: 'As 4 condições clássicas de Coffman. Se qualquer uma dessas quatro condições for quebrada ou prevenida, o deadlock não pode ocorrer.' },
          { text: 'Lentidão de CPU, Memória Insuficiente, Timeout de Rede e Cache Cheio.', correct: false, reason: 'Problemas de desempenho genéricos.' },
          { text: 'Transação Aberta, Índice Faltante, Bloqueio de Tabela e Chave Estrangeira.', correct: false, reason: 'Conceitos de SQL.' },
          { text: 'Leitura Suja, Leitura Fantasma, Gravação Perdida e Isolamento Parcial.', correct: false, reason: 'Anomalias de transação de banco de dados.' }
        ],
        trapWarning: 'Achar que basta ter dois processos disputando o mesmo recurso para haver deadlock. É necessária a espera circular e a impossibilidade de preempção!',
        recommendedBookOrDoc: 'Sistemas Operacionais Modernos (Tanenbaum, Cap. 6: Impasses / Deadlocks)',
        studyTechnique: 'Analisar o clássico problema do "Jantar dos Filósofos" e como quebrar a espera circular.'
      }
    ]
  },
  {
    id: 'inteligencia_artificial',
    name: 'Inteligência Artificial & Ciência de Dados',
    shortTitle: 'IA & Dados',
    description: 'Machine Learning, overfitting, métricas de avaliação, embeddings e arquitetura Transformer.',
    iconName: 'Cpu',
    color: 'rose',
    curatedDriveBook: 'Inteligência Artificial: Uma Abordagem Moderna (Russell & Norvig)',
    tags: ['Machine Learning', 'Overfitting', 'Transformers', 'Embeddings', 'Métricas'],
    questions: [
      {
        id: 601,
        question: 'Quando um modelo de Machine Learning apresenta uma acurácia quase perfeita no conjunto de treino (99%), mas desempenho muito fraco no conjunto de validação/teste (60%), dizemos que ocorreu:',
        topic: 'Generalização em Machine Learning',
        weight: 'Iniciante',
        options: [
          { text: 'Underfitting (Subajuste)', correct: false, reason: 'Underfitting ocorre quando o modelo é simplista demais e vai mal tanto no treino quanto no teste.' },
          { text: 'Overfitting (Sobreajuste)', correct: true, reason: 'O modelo "memorizou" os dados de treino com seu ruído e particularidades, perdendo a capacidade de generalizar para dados inéditos.' },
          { text: 'Convergência Estocástica', correct: false, reason: 'Convergência refere-se ao algoritmo atingir um mínimo da função de perda.' },
          { text: 'Desbalanceamento de Classes Neutro', correct: false, reason: 'Desbalanceamento afeta a proporção de classes, não a disparidade treino/teste.' }
        ],
        trapWarning: 'Achar que alta acurácia no conjunto de treino significa sucesso. O que importa é a capacidade de generalização em dados não vistos!',
        recommendedBookOrDoc: 'Hands-On Machine Learning (Aurélien Géron) & Russell & Norvig',
        studyTechnique: 'Listar 3 técnicas para combater overfitting: Regularização (L1/L2), Dropout, e aumento de dados (Data Augmentation).'
      },
      {
        id: 602,
        question: 'Em um problema de diagnóstico médico de uma doença rara que afeta 1 a cada 1.000 pacientes, por que a métrica de Acurácia (Accuracy) é inadequada para avaliar o modelo?',
        topic: 'Métricas de Avaliação de Modelos',
        weight: 'Intermediário',
        options: [
          { text: 'Porque a acurácia só pode ser calculada em modelos de regressão linear.', correct: false, reason: 'Acurácia é usada em problemas de classificação.' },
          { text: 'Um modelo ingênuo que sempre prever "saudável" para todos os pacientes terá 99.9% de acurácia, mas falhará em 100% dos pacientes doentes.', correct: true, reason: 'Em classes altamente desbalanceadas, o modelo alcança acurácia enganosa apenas prevendo a classe majoritária. Métricas como Recall (Revocação), Precision e F1-Score são necessárias.' },
          { text: 'Acurácia exige que os dados estejam normalizados entre -1 e 1.', correct: false, reason: 'Normalização é pré-processamento de features.' },
          { text: 'Acurácia não é aceita pela literatura científica moderna.', correct: false, reason: 'É válida para conjuntos com classes perfeitamente equilibradas.' }
        ],
        trapWarning: 'Comemorar 99% de acurácia em datasets desbalanceados sem olhar a matriz de confusão e o Recall da classe positiva.',
        recommendedBookOrDoc: 'Pattern Recognition and Machine Learning (Christopher Bishop)',
        studyTechnique: 'Calcular manualmente a matriz de confusão: Verdadeiro Positivo, Falso Positivo, Falso Negativo, Verdadeiro Negativo.'
      },
      {
        id: 603,
        question: 'Qual é o papel fundamental dos Vetores de Embeddings em sistemas modernos de Processamento de Linguagem Natural (NLP) e RAG (Retrieval-Augmented Generation)?',
        topic: 'Processamento de Linguagem Natural & Embeddings',
        weight: 'Avançado',
        options: [
          { text: 'Compactar o texto em formato ZIP para economizar tráfego de rede.', correct: false, reason: 'Embeddings são representações geométricas vetoriais de significado, não algoritmos de compressão de arquivos.' },
          { text: 'Representar palavras ou textos como vetores numéricos densos em um espaço contínuo onde a proximidade geométrica reflete proximidade semântica.', correct: true, reason: 'Textos com significados semelhantes (ex: "rei" e "rainha", ou perguntas sinônimas) ficam próximos no espaço vetorial (calculado por similaridade de cosseno).' },
          { text: 'Substituir os bancos de dados relacionais por tabelas estáticas sem índices.', correct: false, reason: 'Bancos vetoriais utilizam índices especializados como HNSW para busca por similaridade.' },
          { text: 'Impedir que o usuário insira prompts maliciosos no chatbot.', correct: false, reason: 'Isso é papel de guardrails de segurança e alinhamento.' }
        ],
        trapWarning: 'Achar que busca vetorial é busca por palavras-chave exatas (Lexical Search). Embeddings buscam pelo significado conceitual, mesmo com palavras diferentes.',
        recommendedBookOrDoc: 'Speech and Language Processing (Jurafsky & Martin) & Documentação Oficial Google Gemini',
        studyTechnique: 'Testar uma busca por similaridade de cosseno entre duas frases sinônimas.'
      }
    ]
  },
  {
    id: 'seguranca_info',
    name: 'Segurança da Informação & DevSecOps',
    shortTitle: 'Segurança da Informação',
    description: 'Vulnerabilidades OWASP, prevenção a SQL Injection e XSS, criptografia e RBAC.',
    iconName: 'ShieldAlert',
    color: 'red',
    curatedDriveBook: 'Segurança em Computação e Redes & OWASP Guidelines',
    tags: ['OWASP', 'SQL Injection', 'Criptografia', 'XSS', 'RBAC'],
    questions: [
      {
        id: 701,
        question: 'Qual é a forma mais eficaz e estrutural de prevenir vulnerabilidades de Injeção de SQL (SQL Injection) em uma aplicação?',
        topic: 'Segurança de Aplicações Web (OWASP)',
        weight: 'Iniciante',
        options: [
          { text: 'Utilizar filtros de expressão regular (Regex) para remover palavras como "SELECT" e "DROP".', correct: false, reason: 'Listas negras e filtros regex são facilmente contornados por atacantes com diferentes codificações e técnicas de evasão.' },
          { text: 'Utilizar Consultas Parametrizadas (Prepared Statements) ou ORMs que separam a instrução SQL dos dados de entrada.', correct: true, reason: 'Prepared Statements tratam as entradas do usuário estritamente como parâmetros de dados e nunca como código executável, neutralizando o ataque na raiz.' },
          { text: 'Bloquear requisições que venham de sistemas operacionais Linux.', correct: false, reason: 'Não tem relação com vulnerabilidade de código na aplicação.' },
          { text: 'Armazenar senhas em cookies abertos sem criptografia.', correct: false, reason: 'Isso aumenta drasticamente a insegurança.' }
        ],
        trapWarning: 'Tentar sanitizar strings com replace() em vez de usar prepared statements nativos do driver de banco.',
        recommendedBookOrDoc: 'OWASP Top 10 Application Security Risks (Injection Cheat Sheet)',
        studyTechnique: 'Examinar o plano de compilação de uma prepared statement para entender por que o dado nunca vira comando.'
      },
      {
        id: 702,
        question: 'Em Criptografia, qual a diferença essencial entre Criptografia Simétrica (ex: AES) e Criptografia Assimétrica (ex: RSA/ECC)?',
        topic: 'Criptografia & Certificados Digitais',
        weight: 'Intermediário',
        options: [
          { text: 'A simétrica usa a mesma chave secreta para cifrar e decifrar; a assimétrica usa um par de chaves (uma pública para cifrar e uma privada para decifrar).', correct: true, reason: 'Exato! A simétrica é muito mais rápida para grandes volumes de dados. A assimétrica resolve o problema da distribuição segura de chaves e possibilita assinaturas digitais.' },
          { text: 'A simétrica só funciona para senhas de banco de dados e a assimétrica para e-mails corporativos.', correct: false, reason: 'São primitivas criptográficas de uso geral.' },
          { text: 'A simétrica pode ser quebrada sem computador e a assimétrica é matematicamente indestrutível.', correct: false, reason: 'Ambas oferecem altíssima segurança se usadas com tamanhos de chave adequados (ex: AES-256).' },
          { text: 'Não existe diferença técnica relevante.', correct: false, reason: 'São paradigmas matemáticos completamente distintos.' }
        ],
        trapWarning: 'Tentar cifrar um arquivo de 1 GB com chave RSA pura: a criptografia assimétrica é pesada computacionalmente, por isso usa-se criptografia híbrida (RSA para trocar chave AES).',
        recommendedBookOrDoc: 'Cryptography and Network Security: Principles and Practice (William Stallings)',
        studyTechnique: 'Active Recall: esquematizar o funcionamento do TLS/HTTPS unindo RSA e AES.'
      }
    ]
  }
];

// Helper to find an area by ID or keyword
export function getStudyAreaById(id: string): StudyAreaDefinition {
  const found = STUDY_AREAS.find((a) => a.id === id);
  if (found) return found;
  return STUDY_AREAS[0]; // fallback to algoritmos
}

// Helper to find the best matching study area from a course name or target string
export function detectStudyAreaFromText(text: string): StudyAreaDefinition {
  if (!text) return STUDY_AREAS[0];
  const lower = text.toLowerCase();

  if (lower.includes('banco') || lower.includes('sql') || lower.includes('dados') && !lower.includes('ciência') && !lower.includes('estrutura')) {
    return STUDY_AREAS.find((a) => a.id === 'banco_dados') || STUDY_AREAS[0];
  }
  if (lower.includes('engenharia') || lower.includes('arquitetura') || lower.includes('clean') || lower.includes('solid') || lower.includes('projeto')) {
    return STUDY_AREAS.find((a) => a.id === 'engenharia_software') || STUDY_AREAS[0];
  }
  if (lower.includes('web') || lower.includes('api') || lower.includes('rest') || lower.includes('frontend') || lower.includes('backend') || lower.includes('http')) {
    return STUDY_AREAS.find((a) => a.id === 'desenvolvimento_web') || STUDY_AREAS[0];
  }
  if (lower.includes('rede') || lower.includes('sistema operacional') || lower.includes('linux') || lower.includes('infra') || lower.includes('so')) {
    return STUDY_AREAS.find((a) => a.id === 'redes_sistemas') || STUDY_AREAS[0];
  }
  if (lower.includes('inteligência') || lower.includes('ia') || lower.includes('machine learning') || lower.includes('ciência de dados') || lower.includes('data science')) {
    return STUDY_AREAS.find((a) => a.id === 'inteligencia_artificial') || STUDY_AREAS[0];
  }
  if (lower.includes('segurança') || lower.includes('security') || lower.includes('hacker') || lower.includes('cripto') || lower.includes('devsecops')) {
    return STUDY_AREAS.find((a) => a.id === 'seguranca_info') || STUDY_AREAS[0];
  }

  return STUDY_AREAS[0]; // Algoritmos e Estruturas de Dados
}
