import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Sparkles,
  RotateCcw,
  Building2,
  Target,
  Video,
  DollarSign,
  TrendingUp,
  Layers,
  Share2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { OfficialLanguagesDirectory } from './OfficialLanguagesDirectory';

export interface QuizAnswerData {
  companyName: string;
  segment: string;
  segmentLabel: string;
  mainChallenge: string;
  mainChallengeLabel: string;
  ugcMaturity: string;
  ugcMaturityLabel: string;
  trafficChannel: string;
  trafficChannelLabel: string;
  monthlyRevenue: string;
  monthlyRevenueLabel: string;
  priorityFormat: string;
  priorityFormatLabel: string;
}

interface SingleQuestionQuizProps {
  onFinish?: (planMarkdown: string, answers: QuizAnswerData) => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
  onOpenLanding?: () => void;
}

interface QuestionDef {
  id: keyof QuizAnswerData;
  number: number;
  badge: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  type: 'text' | 'options';
  placeholder?: string;
  options?: {
    value: string;
    label: string;
    description: string;
    hotkey: string;
  }[];
}

const QUESTIONS: QuestionDef[] = [
  {
    id: 'companyName',
    number: 1,
    badge: '01 / Identificação',
    title: 'Qual é o nome da sua empresa ou marca?',
    subtitle: 'O plano estratégico de marketing e UGC será gerado com diagnóstico exclusivo para o seu negócio.',
    icon: <Building2 className="w-5 h-5 text-emerald-500" />,
    type: 'text',
    placeholder: 'Ex: Luminus Beauty, TechFlow, StudioArq, EcoVida...'
  },
  {
    id: 'segment',
    number: 2,
    badge: '02 / Mercado & Nicho',
    title: 'Qual é o segmento de atuação da sua empresa?',
    subtitle: 'Cada nicho exige uma linguagem nativa, ganchos (hooks) específicos e perfis distintos de criadores.',
    icon: <Layers className="w-5 h-5 text-emerald-500" />,
    type: 'options',
    options: [
      {
        value: 'ecommerce_d2c',
        label: 'E-commerce & D2C (Moda, Cosméticos, Acessórios, Casa)',
        description: 'Venda direta ao consumidor com forte apelo visual, unboxing e prova social.',
        hotkey: 'A'
      },
      {
        value: 'saude_fitness',
        label: 'Saúde, Bem-Estar & Fitness (Suplementos, Clínicas, Skincare)',
        description: 'Forte necessidade de confiança, rotina real de uso e quebra de ceticismo.',
        hotkey: 'B'
      },
      {
        value: 'infoprodutos_educacao',
        label: 'Infoprodutos, Cursos Online & Mentorias',
        description: 'Foco em transformação pessoal, depoimentos sinceros e quebra de objeções.',
        hotkey: 'C'
      },
      {
        value: 'saas_tecnologia',
        label: 'SaaS, Software & Startups Tech (B2B / B2C)',
        description: 'Demonstração de produto em tela, caso de uso prático e alívio de dor operacional.',
        hotkey: 'D'
      },
      {
        value: 'alimentos_gastronomia',
        label: 'Alimentos, Bebidas & Gastronomia',
        description: 'Estímulo sensorial imediato, reação ao sabor e consumo autêntico.',
        hotkey: 'E'
      },
      {
        value: 'servicos_locais',
        label: 'Serviços Profissionais, B2B & Negócios Locais',
        description: 'Autoridade humanizada, bastidores de atendimento e recomendação próxima.',
        hotkey: 'F'
      }
    ]
  },
  {
    id: 'mainChallenge',
    number: 3,
    badge: '03 / Gargalo de Vendas',
    title: 'Qual é o maior gargalo atual do seu marketing e conversão?',
    subtitle: 'Identificamos a raiz do vazamento de receita para posicionar a alavanca correta.',
    icon: <Target className="w-5 h-5 text-emerald-500" />,
    type: 'options',
    options: [
      {
        value: 'cac_fadiga',
        label: 'CAC disparando e anúncios com fadiga rápida (ad fatigue)',
        description: 'Criativos estáticos morrem em poucos dias e o custo por clique/aquisição sobe sem parar.',
        hotkey: 'A'
      },
      {
        value: 'baixa_conversao',
        label: 'Baixa taxa de conversão nas Landing Pages / Checkout',
        description: 'O tráfego chega, mas os visitantes desistem antes de comprar por falta de confiança.',
        hotkey: 'B'
      },
      {
        value: 'falta_prova_social',
        label: 'Falta de prova social autêntica e reviews reais de pessoas',
        description: 'O público desconfia de vídeos institucionais e modelos tradicionais de estúdio.',
        hotkey: 'C'
      },
      {
        value: 'dificuldade_escala_criativos',
        label: 'Lentidão e alto custo para produzir novos criativos em volume',
        description: 'Produzir vídeos internamente ou com agências tradicionais é caro, lento e sem variedade.',
        hotkey: 'D'
      },
      {
        value: 'dependencia_trafego_frio',
        label: 'Dependência total de tráfego pago sem engajamento e retenção',
        description: 'Se parar de investir em mídia paga um dia, as vendas secam imediatamente.',
        hotkey: 'E'
      }
    ]
  },
  {
    id: 'ugcMaturity',
    number: 4,
    badge: '04 / Maturidade em UGC',
    title: 'Como sua marca trabalha hoje com UGC (Conteúdo de Criadores)?',
    subtitle: 'Avaliamos a capacidade operacional da sua empresa para implementar novas esteiras de criativos.',
    icon: <Video className="w-5 h-5 text-emerald-500" />,
    type: 'options',
    options: [
      {
        value: 'nunca_usou',
        label: 'Nunca utilizamos — 100% de criativos estáticos e banners',
        description: 'Operação ainda presa a designs gráficos estáticos que o público ignora no feed.',
        hotkey: 'A'
      },
      {
        value: 'influenciadores_caros',
        label: 'Já testamos influenciadores tradicionais (alto custo, baixo ROI)',
        description: 'Cachês caros pagos por publicações isoladas que geraram pouco ou nenhum retorno em vendas.',
        hotkey: 'B'
      },
      {
        value: 'testes_sem_processo',
        label: 'Já fizemos vídeos pontuais com clientes, mas sem escala nem método',
        description: 'Vídeos esporádicos gravados sem roteiro de conversão e sem fluxo recorrente.',
        hotkey: 'C'
      },
      {
        value: 'ja_usa_quer_escala',
        label: 'Já validamos UGC e precisamos escalar com volume de novos criadores',
        description: 'Sabemos que UGC converte, mas o gargalo atual é recrutar, gerenciar e receber vídeos semanalmente.',
        hotkey: 'D'
      }
    ]
  },
  {
    id: 'trafficChannel',
    number: 5,
    badge: '05 / Canal de Aquisição',
    title: 'Qual é o canal onde sua empresa mais investe em tráfego?',
    subtitle: 'Os roteiros e ganchos de UGC serão estruturados de acordo com o algoritmo e comportamento deste canal.',
    icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
    type: 'options',
    options: [
      {
        value: 'meta_ads',
        label: 'Meta Ads (Instagram Reels, Stories e Feed)',
        description: 'Exige criativos nativos que pareçam postagens orgânicas de amigos e ganchos em 2 segundos.',
        hotkey: 'A'
      },
      {
        value: 'tiktok_ads_organico',
        label: 'TikTok (Anúncios Spark Ads e Conteúdo Orgânico)',
        description: 'Linguagem 100% rápida, descontraída, com trends, áudios em alta e dinamismo.',
        hotkey: 'B'
      },
      {
        value: 'google_youtube',
        label: 'Google Ads & YouTube (Performance Max, Shorts, Search)',
        description: 'Formatos verticais e horizontais com foco em demonstração e busca por soluções.',
        hotkey: 'C'
      },
      {
        value: 'organico_comunidade',
        label: 'Tráfego Orgânico, Comunidades e Redes Sociais',
        description: 'Alavancagem de engajamento espontâneo, reposts e retenção de audiência.',
        hotkey: 'D'
      },
      {
        value: 'multicanal',
        label: 'Estratégia Multicanal (Meta + TikTok + Google)',
        description: 'Esteira de criativos adaptável e distribuída para múltiplos pontos de contato.',
        hotkey: 'E'
      }
    ]
  },
  {
    id: 'monthlyRevenue',
    number: 6,
    badge: '06 / Porte & Faturamento',
    title: 'Qual é a faixa de faturamento mensal aproximada da marca?',
    subtitle: 'Calculamos a cadência ideal de testes de criativos e o tamanho da esteira de criadores recomendada.',
    icon: <DollarSign className="w-5 h-5 text-emerald-500" />,
    type: 'options',
    options: [
      {
        value: 'ate_30k',
        label: 'Até R$ 30.000 / mês',
        description: 'Fase de validação: foco em testar 3 a 5 criadores selecionados a dedo para achar o ângulo campeão.',
        hotkey: 'A'
      },
      {
        value: '30k_100k',
        label: 'R$ 30.000 a R$ 100.000 / mês',
        description: 'Fase de tração: esteira contínua com 5 a 10 novos vídeos mensais para evitar fadiga de anúncios.',
        hotkey: 'B'
      },
      {
        value: '100k_500k',
        label: 'R$ 100.000 a R$ 500.000 / mês',
        description: 'Fase de escala: máquina de criativos com mais de 15 a 30 variações mensais de ganchos e rostos.',
        hotkey: 'C'
      },
      {
        value: 'acima_500k',
        label: 'Acima de R$ 500.000 / mês',
        description: 'Alta escala corporativa: dezenas de criadores simultâneos gerando conteúdo segmentado por público.',
        hotkey: 'D'
      }
    ]
  },
  {
    id: 'priorityFormat',
    number: 7,
    badge: '07 / Ângulo Narrativo',
    title: 'Qual formato narrativo quebraria a maior objeção do seu cliente hoje?',
    subtitle: 'Definiremos a estrutura do primeiro lote de vídeos da sua campanha.',
    icon: <Sparkles className="w-5 h-5 text-emerald-500" />,
    type: 'options',
    options: [
      {
        value: 'dor_solucao',
        label: 'Problema vs. Solução (Dor real + Transformação visual)',
        description: 'Apresenta a frustração que o cliente vive diariamente e mostra o produto como alívio imediato.',
        hotkey: 'A'
      },
      {
        value: 'unboxing_reacao',
        label: 'Unboxing + Primeiras Impressões reais sem filtro',
        description: 'Sensação tátil de receber o pacote, acabamento de entrega e primeira experiência sem maquiagem.',
        hotkey: 'B'
      },
      {
        value: 'depoimento_sincero',
        label: 'Review sincero com quebra de objeções (Preço / Qualidade)',
        description: 'Criador respondendo com franqueza: "Vale mesmo a pena? Minha experiência após 15 dias de uso".',
        hotkey: 'C'
      },
      {
        value: 'comparativo_direto',
        label: 'Comparativo: "Por que abandonei a concorrência por esta marca"',
        description: 'Contraste direto evidenciando o diferencial único do seu produto.',
        hotkey: 'D'
      },
      {
        value: 'trend_humor',
        label: 'Trend & Hook nativo com humor contextualizado',
        description: 'Retenção absoluta nos primeiros 3 segundos utilizando formatos já viralizados no nicho.',
        hotkey: 'E'
      }
    ]
  }
];

export const SingleQuestionQuiz: React.FC<SingleQuestionQuizProps> = ({
  onFinish,
  onOpenAuth,
  onOpenLanding
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswerData>>({
    companyName: '',
    segment: '',
    segmentLabel: '',
    mainChallenge: '',
    mainChallengeLabel: '',
    ugcMaturity: '',
    ugcMaturityLabel: '',
    trafficChannel: '',
    trafficChannelLabel: '',
    monthlyRevenue: '',
    monthlyRevenueLabel: '',
    priorityFormat: '',
    priorityFormatLabel: ''
  });

  const [inputVal, setInputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisPhase, setAnalysisPhase] = useState(0);
  const [planMarkdown, setPlanMarkdown] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const currentQ = QUESTIONS[currentIdx];
  const totalQuestions = QUESTIONS.length;
  const progressPercent = Math.round(((currentIdx + 1) / totalQuestions) * 100);

  // Auto focus input on text questions
  useEffect(() => {
    if (currentQ && currentQ.type === 'text') {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      setInputVal(answers.companyName || '');
    }
  }, [currentIdx, currentQ]);

  // Keyboard navigation listener (A, B, C, D, E, F and Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input field
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleNext();
        }
        return;
      }

      if (isAnalyzing || planMarkdown) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        handleNext();
        return;
      }

      if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        if (currentIdx > 0) {
          handlePrev();
        }
        return;
      }

      if (currentQ && currentQ.type === 'options' && currentQ.options) {
        const key = e.key.toUpperCase();
        const matched = currentQ.options.find((opt) => opt.hotkey === key);
        if (matched) {
          e.preventDefault();
          handleSelectOption(matched.value, matched.label);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, currentQ, answers, isAnalyzing, planMarkdown, inputVal]);

  const handleSelectOption = (value: string, label: string) => {
    setErrorMsg('');
    const id = currentQ.id;
    const labelKey = `${id}Label` as keyof QuizAnswerData;

    setAnswers((prev) => ({
      ...prev,
      [id]: value,
      [labelKey]: label
    }));

    // Auto advance smoothly after brief feedback
    setTimeout(() => {
      if (currentIdx < totalQuestions - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        triggerAnalysis({
          ...answers,
          [id]: value,
          [labelKey]: label
        } as QuizAnswerData);
      }
    }, 240);
  };

  const handleNext = () => {
    setErrorMsg('');

    if (currentQ.type === 'text') {
      if (!inputVal.trim()) {
        setErrorMsg('Por favor, informe o nome da sua empresa para continuar.');
        inputRef.current?.focus();
        return;
      }
      setAnswers((prev) => ({
        ...prev,
        companyName: inputVal.trim()
      }));

      if (currentIdx < totalQuestions - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        triggerAnalysis({
          ...answers,
          companyName: inputVal.trim()
        } as QuizAnswerData);
      }
      return;
    }

    // Options question check
    const currentAnswer = answers[currentQ.id];
    if (!currentAnswer) {
      setErrorMsg('Selecione uma das opções para prosseguir.');
      return;
    }

    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      triggerAnalysis(answers as QuizAnswerData);
    }
  };

  const handlePrev = () => {
    setErrorMsg('');
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const triggerAnalysis = (completedData: QuizAnswerData) => {
    setIsAnalyzing(true);
    setAnalysisPhase(0);

    const phases = [
      'Cruzando benchmarks do segmento com métricas de conversão...',
      'Mapeando o vazamento de receita pelo principal gargalo relatado...',
      'Dimensionando a alavanca de User Generated Content (UGC)...',
      'Estruturando o plano tático de esteira na CreHub...',
      'Finalizando plano de ação estratégico...'
    ];

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < phases.length) {
        setAnalysisPhase(step);
      } else {
        clearInterval(interval);
        generateActionPlan(completedData);
      }
    }, 550);
  };

  const generateActionPlan = (data: QuizAnswerData) => {
    const company = data.companyName || 'Sua Empresa';
    const segment = data.segmentLabel || 'E-commerce & D2C';
    const challenge = data.mainChallengeLabel || 'CAC elevado e fadiga de criativos';
    const maturity = data.ugcMaturityLabel || 'Sem esteira estruturada';
    const channel = data.trafficChannelLabel || 'Meta Ads';
    const revenue = data.monthlyRevenueLabel || 'Em crescimento';
    const format = data.priorityFormatLabel || 'Problema vs. Solução';

    // Build strictly structured, authoritative Markdown plan adhering to the UGC consultant role
    const markdown = `# PLANO DE AÇÃO ESTRATÉGICO: CONVERSÃO & ALAVANCAGEM COM UGC

**Empresa Diagnosticada:** ${company}  
**Segmento de Mercado:** ${segment}  
**Faixa de Faturamento:** ${revenue}  
**Canal Primário de Aquisição:** ${channel}  
**Principal Gargalo de Conversão:** ${challenge}  
**Nível de Maturidade em UGC:** ${maturity}  
**Formato Prioritário:** ${format}  

---

## 1. DIAGNÓSTICO DO CENÁRIO & ANÁLISE DE GARGALO

A operação da **${company}** no segmento de **${segment}** atingiu o clássico ponto de atrito em escala: a dependência de anúncios estáticos e criativos institucionais já não sustenta custos de aquisição competitivos.

O maior vazamento do seu funil foi diagnosticado como:
> **"${challenge}"**

### Raiz do Problema
1. **Cegueira de Banner e Fadiga Visual:** No canal **${channel}**, o usuário médio decide em menos de 1,8 segundos se ignora uma peça publicitária. Modelos de banco de imagens e artes gráficas estáticas ativam o filtro de anúncio do cérebro imediatamente, inflando o CPM e derrubando o CTR.
2. **Deficit de Confiança e Prova Social:** O consumidor de ${segment} não compra apenas pelas características técnicas do produto, mas sim pela confirmação social implícita de que pessoas normais estão obtendo os resultados prometidos.
3. **Inércia Operacional:** Sem uma esteira contínua de criadores, a empresa fica refém de poucas variações de mídia, forçando o algoritmo a saturar a mesma audiência repetidamente.

---

## 2. O UGC COMO ALAVANCA PRINCIPAL DE CONVERSÃO

O **UGC (User Generated Content)** não é apenas uma tendência estética; é uma alavanca matemática de performance no tráfego pago e orgânico.

Para a **${company}**, o UGC atua cirurgicamente no seu maior desafio:
* **Redução Imediata de CAC:** Vídeos filmados em formato nativo (9:16, câmera de celular, iluminação natural) aumentam o Thumbstop Rate em até 3,2x em comparação com criativos de estúdio.
* **Quebra de Objeções em Tempo Real:** O criador aborda exatamente a dúvida que impede o checkout: qualidade real, durabilidade, facilidade de uso e entrega.
* **Escala de Volume Criativo:** Em vez de apostar todas as fichas em uma única gravação cara, a marca passa a testar de 10 a 30 variações de ganchos (hooks) por mês, encontrando os criativos vencedores com agilidade.

---

## 3. PLANO DE AÇÃO EM 3 FASES (TESTE, OTIMIZAÇÃO E ESCALA)

### FASE 1: Implantação e Validação do Ângulo Campeão (Dias 1 a 15)
* **Objetivo:** Produzir e validar o primeiro lote de 5 criativos focados no formato **${format}**.
* **Ações:**
  1. Recrutar 3 criadores com perfil demográfico idêntico à Persona consumidora de ${segment}.
  2. Fornecer briefing padronizado contendo 3 variações de gancho (0-3s), demonstração prática do benefício central (3-20s) e CTA direto para ação (20-30s).
  3. Lançar campanha de teste no canal **${channel}** isolando apenas criativos de UGC contra os melhores criativos atuais da marca.

### FASE 2: Iteração & Otimização do Funil (Dias 16 a 45)
* **Objetivo:** Ampliar o ROAS e inserir os criativos de UGC na página de destino.
* **Ações:**
  1. Identificar o criador e o hook com menor CPA na Fase 1.
  2. Desdobrar o criativo campeão em 4 novas variações de introdução sem regravar o corpo do vídeo.
  3. Integrar os vídeos mais autênticos diretamente na primeira dobra da página do produto/serviço, aumentando a taxa de conversão da página em até 28%.

### FASE 3: Escala Contínua e Máquina de Criativos (Dias 46 em diante)
* **Objetivo:** Manter esteira previsível de 10 a 20 novos vídeos por mês, blindando a conta contra a fadiga de anúncios.
* **Ações:**
  1. Estabelecer calendário quinzenal de recebimento e aprovação de novos conteúdos.
  2. Implementar biblioteca de ganchos emocionais específicos para ${segment}.
  3. Escalar o orçamento diário nas peças validadas com segurança de margem.

---

## 4. FRAMEWORK DE ROTEIRO RECOMENDADO: "${format}"

Para gerar retorno imediato na primeira esteira da **${company}**, utilize este roteiro comprovado:

| Bloco | Tempo | Gatilho Psicológico | Ação em Cena |
| :--- | :--- | :--- | :--- |
| **01. O Gancho (Hook)** | 0 a 3s | Quebra de Padrão / Curiosidade | Criador olhando diretamente para a câmera mostrando o problema sem filtro ou segurando o produto de forma surpreendente. |
| **02. A Dor Comum** | 3 a 10s | Identificação Imediata | Criador relata a frustração comum vivenciada pelo público de ${segment} antes de encontrar a ${company}. |
| **03. A Revelação** | 10 a 20s | Demonstração Prática | Mostra o produto/serviço em uso real com cortes rápidos e áudio nativo nítido. |
| **04. Quebra de Objeção** | 20 a 35s | Prova de Valor | "Eu achava que não ia funcionar / que era caro, mas olhem isso aqui..." |
| **05. Chamada de Ação (CTA)** | 35 a 45s | Urgência & Direcionamento | Indicação clara: "Clica no botão aqui embaixo e aproveita antes que esgote". |

---

## 5. A SOLUÇÃO OPERACIONAL INEVITÁVEL: PLATAFORMA CREHUB

A maior barreira para a **${company}** executar este plano com velocidade não é a teoria, mas o gargalo operacional:
* *Como encontrar criadores qualificados de ${segment} sem perder semanas mandando DMs no Instagram?*
* *Como garantir contratos com cessão de direitos de imagem para tráfego pago sem riscos jurídicos?*
* *Como padronizar prazos, aprovações e pagamentos com segurança?*

A **CreHub** foi desenvolvida como o conector direto e definitivo entre marcas que buscam alta conversão e criadores especializados em UGC.

### Por que a CreHub é o caminho lógico para a ${company}:
1. **Acervo Segmentado de Criadores:** Acesso instantâneo a criadores testados para o nicho de ${segment}.
2. **Briefing Inteligente Padronizado:** Roteiros validados prontos para preenchimento, garantindo que o criador entregue exatamente os ângulos de conversão necessários.
3. **Cessão Completa de Direitos de Mídia:** Direitos autorais liberados para uso em anúncios nos canais Meta, TikTok e Google sem complicação jurídica.
4. **Agilidade de Entrega:** Do envio do produto ao recebimento do vídeo final pronto para rodar em questão de dias, permitindo alimentar sua esteira continuamente.

> **Recomendação Final do Consultor:** Não tente construir uma equipe interna de caça a criadores do zero. Inicie seu primeiro lote de testes através da **CreHub** para validar o CAC da ${company} com o menor custo e o maior retorno sobre investimento.
`;

    setPlanMarkdown(markdown);
    setIsAnalyzing(false);

    if (onFinish) {
      onFinish(markdown, data);
    }
  };

  const handleCopyMarkdown = () => {
    if (!planMarkdown) return;
    navigator.clipboard.writeText(planMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadMarkdown = () => {
    if (!planMarkdown) return;
    const blob = new Blob([planMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Plano-Estrategico-UGC-${(answers.companyName || 'Empresa').replace(/\s+/g, '_')}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleRestart = () => {
    setPlanMarkdown(null);
    setIsAnalyzing(false);
    setCurrentIdx(0);
    setAnswers({
      companyName: '',
      segment: '',
      segmentLabel: '',
      mainChallenge: '',
      mainChallengeLabel: '',
      ugcMaturity: '',
      ugcMaturityLabel: '',
      trafficChannel: '',
      trafficChannelLabel: '',
      monthlyRevenue: '',
      monthlyRevenueLabel: '',
      priorityFormat: '',
      priorityFormatLabel: ''
    });
    setInputVal('');
    setErrorMsg('');
  };

  // 1. ANALYZING / PROCESSING VIEW
  if (isAnalyzing) {
    const phases = [
      'Cruzando benchmarks do segmento com métricas de conversão...',
      'Mapeando o vazamento de receita pelo principal gargalo relatado...',
      'Dimensionando a alavanca de User Generated Content (UGC)...',
      'Estruturando o plano tático de esteira na CreHub...',
      'Finalizando plano de ação estratégico...'
    ];

    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-2xl shadow-emerald-500/30 animate-pulse">
            <Sparkles className="w-10 h-10 text-zinc-950 animate-bounce" />
          </div>
          <div className="absolute -inset-4 rounded-3xl border border-emerald-500/20 animate-ping pointer-events-none" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
          Processando Diagnóstico Estratégico
        </h2>

        <p className="text-sm sm:text-base text-zinc-400 max-w-md mx-auto mb-8 font-mono">
          {phases[analysisPhase] || 'Compilando plano analítico de conversão...'}
        </p>

        {/* Dynamic progress loader bar */}
        <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 h-2 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${((analysisPhase + 1) / phases.length) * 100}%` }}
          />
        </div>
      </div>
    );
  }

  // 2. REPORT / STRATEGIC PLAN RESULT VIEW
  if (planMarkdown) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
        {/* Top Navbar in Result */}
        <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
              <span>CreHub</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-medium">
                Diagnóstico Estratégico
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleRestart}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-3 py-2 rounded-lg border border-zinc-800 hover:bg-zinc-900 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Refazer Quiz</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white px-3 py-2 rounded-lg border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Baixar .md</span>
            </button>

            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Plano</span>
                </>
              )}
            </button>

            {onOpenAuth && (
              <button
                type="button"
                onClick={() => onOpenAuth('login')}
                className="text-xs font-semibold text-zinc-300 hover:text-white px-3 py-2 rounded-lg transition-colors ml-1"
              >
                Entrar
              </button>
            )}
          </div>
        </header>

        {/* Content Body with Markdown Rendering */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Executive Header Callout */}
          <div className="mb-8 p-6 sm:p-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/40 via-zinc-900/60 to-zinc-950 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Diagnóstico Concluído com Sucesso</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Plano Estratégico de Conversão: {answers.companyName || 'Sua Empresa'}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
              Análise tática conduzida sob a ótica de User Generated Content (UGC) para combater o gargalo de{' '}
              <strong className="text-emerald-400">{answers.mainChallengeLabel || 'CAC elevado'}</strong>.
            </p>

            {/* Inevitable CreHub Call to Action Banner */}
            <div className="mt-6 pt-6 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-white">Pronto para colocar esta esteira em prática?</div>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  Conecte sua marca a criadores UGC testados e receba vídeos prontos para anúncios.
                </div>
              </div>
              <a
                href="#crehub-cta"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`A CreHub está pronta para atender a ${answers.companyName || 'sua empresa'}! Em instantes você poderá iniciar sua primeira seleção de criadores.`);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs tracking-wide shadow-lg shadow-emerald-500/20 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Conectar com Criadores na CreHub</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Raw Structured Markdown Container */}
          <article className="prose prose-invert prose-emerald max-w-none bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="text-xs font-mono text-zinc-400 flex items-center justify-between pb-4 border-b border-zinc-800">
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Documento Oficial em Formato Markdown Estruturado</span>
              </span>
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            {/* Formatted Markdown Sections */}
            <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-zinc-200 leading-relaxed overflow-x-auto selection:bg-emerald-500 selection:text-black">
              {planMarkdown}
            </pre>
          </article>

          {/* Bottom Footer Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-zinc-800 text-xs text-zinc-500">
            <div>© {new Date().getFullYear()} CreHub • Conector de Marcas & Criadores UGC</div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleRestart}
                className="hover:text-zinc-300 transition-colors cursor-pointer"
              >
                Iniciar Novo Diagnóstico
              </button>
              {onOpenLanding && (
                <button
                  type="button"
                  onClick={onOpenLanding}
                  className="hover:text-zinc-300 transition-colors cursor-pointer"
                >
                  Voltar à Apresentação
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // 3. MAIN QUIZ VIEW: STRICTLY SINGLE QUESTION PER PAGE
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Top Fixed Header with Brand & Progress */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1">
            <span>CreHub</span>
            <span className="text-emerald-400 font-normal">Quiz</span>
          </span>
          <span className="hidden sm:inline-block text-xs text-zinc-500 font-mono">
            • Central de Documentações Oficiais
          </span>
        </div>

        {/* Top Level Actions */}
        <div className="flex items-center gap-3">
          {onOpenAuth && (
            <button
              type="button"
              onClick={() => onOpenAuth('login')}
              className="text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Entrar
            </button>
          )}
        </div>
      </header>

      {/* MAIN DOCUMENTATION WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="w-full space-y-8 animate-fadeIn">
          {/* TÍTULO PERGUNTANDO AO USUÁRIO O QUE VAI ESTUDAR */}
          <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              O que você vai estudar hoje?
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
              Acesse a lista de documentações oficiais, tutoriais e manuais organizados por nicho para acelerar seus estudos.
            </p>
          </div>

          {/* LISTA DE DOCUMENTAÇÕES PARA ESTUDOS */}
          <OfficialLanguagesDirectory />
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-zinc-900 py-6 px-6 text-center text-xs text-zinc-500 font-sans">
        © {new Date().getFullYear()} Estude Aqui • Documentações Oficiais para Estudantes de Tecnologia
      </footer>
    </div>
  );
};
