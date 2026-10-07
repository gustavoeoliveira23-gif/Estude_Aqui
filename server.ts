import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined. Server AI features will fallback to smart curated knowledge.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.static(path.join(process.cwd(), "public")));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Study Assistant & Recommendation Search
  app.post("/api/ai/study-assistant", async (req, res) => {
    try {
      const { prompt, studentProfile } = req.body;
      const ai = getGenAI();

      if (!prompt) {
        return res.status(400).json({ error: "O prompt de estudo é obrigatório." });
      }

      if (!ai) {
        return res.json({
          text: `### Guia de Estudos: ${prompt}\n\n` +
            `Este assunto é fundamental para a formação na área de tecnologia.\n\n` +
            `#### 📌 Conceitos-Chave:\n` +
            `- **Fundamentos**: Compreensão estrutural e lógica da aplicação no dia a dia.\n` +
            `- **Aplicações Práticas**: Implementação em projetos reais, arquitetura limpa e testes.\n` +
            `- **Boas Práticas**: Clareza, manutenibilidade e performance de código.\n\n` +
            `#### 🎓 Cursos e Conteúdos Gratuitos Recomendados:\n` +
            `- 📺 **Curso Completo no YouTube**: Pesquise canais como *Curso em Vídeo (Gustavo Guanabara)*, *Fabio Akita*, *Rocketseat* ou *freeCodeCamp Brasil*.\n` +
            `- 📖 **Documentação Oficial**: Sempre consulte a documentação oficial (MDN Web Docs, DevDocs.io ou repositórios oficiais).\n` +
            `- 📝 **Artigos e Tutoriais**: Leituras no *TabNews*, *Dev.to* e *freeCodeCamp*.\n\n` +
            `*Dica*: Adicione os conceitos acima às suas Anotações e gere Flashcards para fixar na repetição espaçada!`,
          recommendations: [
            {
              type: "video",
              title: `Guia & Tutorial: ${prompt}`,
              url: `https://www.youtube.com/results?search_query=curso+${encodeURIComponent(prompt)}+gratis`,
              platform: "YouTube",
              level: studentProfile?.level || "Iniciante"
            },
            {
              type: "article",
              title: `Documentação e Artigos sobre ${prompt}`,
              url: `https://devdocs.io/search?q=${encodeURIComponent(prompt)}`,
              platform: "DevDocs / Web",
              level: studentProfile?.level || "Geral"
            }
          ]
        });
      }

      const systemInstruction = `Você é o Synapse Tutor, um tutor acadêmico e mentor sênior de Tecnologia e Computação da plataforma Synapse Study.
Seu objetivo é responder em Português Brasileiro de forma clara, didática, concisa e estruturada.
Adapte sua explicação para o perfil do estudante:
- Curso: ${studentProfile?.courseName || "Tecnologia da Informação"}
- Nível de Formação: ${studentProfile?.courseType || "Graduação / Tecnólogo"}
- Nível de Domínio: ${studentProfile?.level || "Iniciante"}

Estrutura da sua resposta:
1. **Explicação Clara e Direta** (com analogia simples e exemplos práticos se couber código/diagrama em Markdown).
2. **Pontos Vitais para Anotação** (bullet points com 3 a 5 conceitos essenciais).
3. **Cursos Gratuitos e Vídeos Recomendados** (mencione cursos reais gratuitos como CS50 Harvard, Curso em Vídeo, freeCodeCamp, DIO, Khan Academy, canais de YouTube recomendados).
4. **Artigos e Documentações Recomendados** (MDN, Dev.to, TabNews, documentações oficiais).
5. **Sugestão de Pergunta para Flashcard** (uma pergunta de desafio para testar fixação).

Seja motivador, profissional e direto ao ponto.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          systemInstruction,
        },
      });

      const responseText = response.text || "Não foi possível gerar uma resposta detalhada no momento.";

      return res.json({
        text: responseText,
      });
    } catch (err: any) {
      console.error("Erro na rota /api/ai/study-assistant:", err);
      return res.status(500).json({
        error: "Falha ao processar requisição com a IA",
        details: err?.message || String(err),
      });
    }
  });

  // AI Flashcards Generator
  app.post("/api/ai/generate-flashcards", async (req, res) => {
    try {
      const { topic, count = 5, level = "Intermediário" } = req.body;
      const ai = getGenAI();

      if (!topic) {
        return res.status(400).json({ error: "O tema para os flashcards é obrigatório." });
      }

      if (!ai) {
        // Fallback default high quality cards
        return res.json({
          flashcards: [
            {
              front: `Qual é o conceito fundamental de ${topic}?`,
              back: `${topic} é um conceito chave que estrutura processos e lógica, permitindo escalabilidade e clareza no desenvolvimento.`,
              category: topic,
              difficulty: "Fácil"
            },
            {
              front: `Quais são as principais vantagens de utilizar ${topic}?`,
              back: `Melhoria no desempenho, organização estruturada, facilidade de manutenção e resolução eficiente de problemas.`,
              category: topic,
              difficulty: "Médio"
            },
            {
              front: `Qual é um erro comum ao aplicar ${topic} e como evitá-lo?`,
              back: `Negligenciar boas práticas de arquitetura e casos de borda; deve-se aplicar testes e seguir padrões estabelecidos.`,
              category: topic,
              difficulty: "Difícil"
            }
          ]
        });
      }

      const prompt = `Gere exatamente ${count} flashcards de estudo sobre o tema "${topic}" para um estudante de nível "${level}".
Responda EXCLUSIVAMENTE em formato JSON com uma lista de objetos contendo "front" (pergunta ou desafio), "back" (resposta clara e explicativa), "category" ("${topic}") e "difficulty" ("Fácil", "Médio" ou "Difícil").
Não use markdown extra antes ou depois do JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      let parsed: any;
      try {
        parsed = JSON.parse(response.text || "[]");
        if (Array.isArray(parsed)) {
          parsed = { flashcards: parsed };
        }
      } catch (parseErr) {
        console.warn("Failed to parse JSON, returning fallback", parseErr);
        parsed = {
          flashcards: [
            {
              front: `Qual é a definição de ${topic}?`,
              back: `Definição essencial e aplicação prática do conceito no ecossistema de tecnologia.`,
              category: topic,
              difficulty: "Médio"
            }
          ]
        };
      }

      return res.json(parsed);
    } catch (err: any) {
      console.error("Erro na rota /api/ai/generate-flashcards:", err);
      return res.status(500).json({ error: "Erro ao gerar flashcards", details: err?.message });
    }
  });

  // AI Diagnostic Analysis (Senior Study Tutor)
  app.post("/api/ai/diagnostic", async (req, res) => {
    let fallbackReport: any = null;
    try {
      const {
        courseType,
        courseName,
        targetArea,
        studyObjective,
        selfLevel,
        quizScore,
        totalQuestions,
        answersSummary,
        missedQuestions,
      } = req.body;

      const ai = getGenAI();

      const defaultLevel =
        quizScore >= 3
          ? selfLevel === "Avançado"
            ? "Avançado"
            : "Intermediário"
          : "Iniciante";

      fallbackReport = {
        calculatedLevel: defaultLevel,
        summary: `Diagnóstico do Tutor: Perfil calibrado para **${targetArea || courseName || "Tecnologia"}** em nível ${defaultLevel}. Identificamos ${quizScore}/${totalQuestions || 4} acertos nas questões diagnósticas.`,
        tutorAnalysis: {
          strengths: [
            `Capacidade de interpretação técnica e raciocínio contextualizado em ${targetArea || "TI"}`,
            "Domínio das premissas fundamentais de introdução da disciplina"
          ],
          learningGaps: missedQuestions && missedQuestions.length > 0
            ? missedQuestions.map((m: any) => `Revisar ${m.topic}: ${m.explanation ? m.explanation.slice(0, 100) + '...' : 'reforçar conceitos essenciais'}`)
            : ["Consolidar tópicos de complexidade avançada e cenários de alta concorrência"],
          tutorAdvice: `Como seu tutor, recomendo priorizar a compreensão das causas-raiz antes da sintaxe superficial. Dedique 45 minutos diários com a metodologia de Active Recall e resolução deliberada de problemas na área de ${targetArea || courseName}.`
        },
        roadmap: [
          "Fase 1 (Fundamentação Teórica): Revisar capítulos teóricos essenciais nos livros recomendados do acervo.",
          "Fase 2 (Active Recall & Repetição): Treinar com os flashcards gerados para fixar termos e comportamentos.",
          "Fase 3 (Prática Deliberada): Implementar desafios práticos e mini-projetos sem consultar soluções prontas.",
          "Fase 4 (Técnica de Feynman): Explicar os conceitos mais difíceis em notas autorais no caderno de estudos."
        ],
        focusAreas: [targetArea || "Fundamentos Técnicos", "Resolução de Problemas", "Prática Deliberada"],
        recommendedBooks: ["Código Limpo (Robert C. Martin)", "Algoritmos: Teoria e Prática (CLRS)"],
        recommendedFlashcards: missedQuestions && missedQuestions.length > 0
          ? missedQuestions.map((m: any) => ({
              front: `Conceito: ${m.topic} - Qual a regra essencial?`,
              back: `${m.correctOption}. ${m.explanation || ''}`,
              category: targetArea || "Estudos"
            }))
          : [
              {
                front: `Qual o pilar central de excelência em ${targetArea || "TI"}?`,
                back: "Compreender os fundamentos teóricos e aplicar com prática deliberada constante.",
                category: targetArea || "Estudos"
              }
            ]
      };

      if (!ai) {
        return res.json(fallbackReport);
      }

      const prompt = `Você é um Tutor Pedagógico Sênior de Estudos em Computação e Tecnologia da Informação.
Sua missão é atuar como um mentor acadêmico analítico, altamente encorajador, cirúrgico e focado na melhoria do estudo do aluno.

DADOS DO ALUNO:
- Tipo de Formação: ${courseType || "Graduação"}
- Curso: ${courseName || "TI / Computação"}
- Área que busca melhorar com prioridade: ${targetArea || "Fundamentos de Computação"}
- Objetivo de Estudo: ${studyObjective || "Avançar de nível e passar em matérias difíceis"}
- Auto-avaliação inicial do aluno: ${selfLevel || "Iniciante"}
- Desempenho no Quiz Diagnóstico: ${quizScore} acertos de ${totalQuestions || 4} perguntas.
- Tópicos com erros ou dúvidas: ${JSON.stringify(missedQuestions || [])}
- Resumo das respostas: ${JSON.stringify(answersSummary || {})}

DIRETRIZES DE TUTORIA:
1. Avalie honestamente o nível técnico real demonstrado (Iniciante, Intermediário ou Avançado).
2. Analise os acertos como pontos fortes a alavancar.
3. Analise cada erro/lacuna identificado com olhar pedagógico: explique a armadilha comum (por que muitos erram) e qual conceito central deve ser revisado.
4. Estruture um plano de ação em 4 etapas práticas (Fase 1: Leitura Guiada, Fase 2: Active Recall com Flashcards, Fase 3: Prática Deliberada com código, Fase 4: Auto-Explicação/Feynman).
5. Recomende livros e documentações canônicas do acervo correspondentes à área (${targetArea}).
6. Gere de 2 a 3 sugestões de flashcards prontos para o aluno revisar os tópicos que errou ou deve reforçar.

Retorne EXCLUSIVAMENTE um JSON válido com o seguinte formato:
{
  "calculatedLevel": "Iniciante" | "Intermediário" | "Avançado",
  "summary": "Resumo analítico de 2 a 3 frases com o diagnóstico do tutor sobre o estado atual do aluno nesta área",
  "tutorAnalysis": {
    "strengths": ["Ponto forte 1 demonstrado", "Ponto forte 2 demonstrado"],
    "learningGaps": ["Lacuna conceitual específica 1", "Lacuna conceitual específica 2"],
    "tutorAdvice": "Mensagem direta do tutor em tom de mentoria sênior focada na melhoria do estudo do aluno"
  },
  "roadmap": [
    "Fase 1 (Fundamentação Teórica): ação específica",
    "Fase 2 (Active Recall & Repetição): ação específica",
    "Fase 3 (Prática Deliberada): ação específica",
    "Fase 4 (Validação & Feynman): ação específica"
  ],
  "focusAreas": ["Tópico 1", "Tópico 2", "Tópico 3"],
  "recommendedBooks": ["Nome do Livro 1 (Autor)", "Nome do Livro 2 (Autor)"],
  "recommendedFlashcards": [
    { "front": "Pergunta conceitual para fixação", "back": "Explicação direta e memorável", "category": "${targetArea || "Estudos"}" }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json(parsed);
    } catch (err: any) {
      console.error("Erro na rota /api/ai/diagnostic (ativando fallback do tutor):", err?.message || err);
      // Fallback robusto garantido para nunca travar a experiência do aluno
      return res.json(fallbackReport);
    }
  });

  // AI Dynamic Diagnostic Questions Generator
  app.post("/api/ai/generate-diagnostic-questions", async (req, res) => {
    try {
      const { targetArea, courseName, selfLevel } = req.body;
      const ai = getGenAI();

      if (!ai) {
        return res.status(503).json({ error: "Chave Gemini não configurada para gerar questões dinâmicas" });
      }

      const prompt = `Você é um Tutor Pedagógico Especialista em Avaliações e Nivelamento Acadêmico em Computação e Tecnologia.
O estudante deseja realizar um teste diagnóstico de nivelamento focado na seguinte área de estudo que busca melhorar:
- Área de Estudo: ${targetArea || "Desenvolvimento de Software"}
- Curso: ${courseName || "Ciência da Computação / ADS"}
- Nível Auto-avaliado: ${selfLevel || "Intermediário"}

Gere exatamente 4 perguntas diagnósticas de múltipla escolha focadas estritamente na área de "${targetArea}".
As perguntas devem progredir em nível (Questão 1: Conceito essencial, Questão 2 e 3: Aplicação prática e armadilhas reais, Questão 4: Análise arquitetural ou otimização avançada).

Cada pergunta deve ter:
- question: Enunciado claro de um cenário real de engenharia ou problema conceitual
- topic: Subtópico específico dentro de ${targetArea}
- weight: "Iniciante" | "Intermediário" | "Avançado"
- options: 4 opções de resposta, com apenas UMA correta
- options.text: Texto da alternativa
- options.correct: true para a correta, false para as outras 3
- options.reason: Explicação didática demonstrando por que a opção está certa ou por que é uma alternativa incorreta
- trapWarning: A pegadinha ou armadilha conceitual clássica que muitos estudantes caem nessa pergunta
- recommendedBookOrDoc: Livro clássico ou documentação oficial para aprofundar
- studyTechnique: Técnica recomendada para estudar este tópico (ex: Active Recall, LeetCode, Prática com Código)

Retorne EXCLUSIVAMENTE um array JSON de objetos:
[
  {
    "id": 1001,
    "question": "...",
    "topic": "...",
    "weight": "Iniciante",
    "options": [
      { "text": "...", "correct": false, "reason": "..." },
      { "text": "...", "correct": true, "reason": "..." },
      { "text": "...", "correct": false, "reason": "..." },
      { "text": "...", "correct": false, "reason": "..." }
    ],
    "trapWarning": "...",
    "recommendedBookOrDoc": "...",
    "studyTechnique": "..."
  }
]`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const parsed = JSON.parse(response.text || "[]");
      return res.json({ questions: parsed });
    } catch (err: any) {
      console.error("Erro na rota /api/ai/generate-diagnostic-questions:", err);
      return res.status(500).json({ error: "Erro ao gerar questões com IA", details: err?.message });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Synapse Study server running on http://localhost:${PORT}`);
  });
}

startServer();
