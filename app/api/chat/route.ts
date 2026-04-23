import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";
import portfolio from "@/data/portfolio.json";

type ChatHistory = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequest = {
  message: string;
  history?: ChatHistory[];
  projectContext?: string;
};

// 🔥 extract skills
function extractSkills() {
  const skills: string[] = [];

  Object.values(portfolio.skills).forEach((group: any) => {
    if (Array.isArray(group)) {
      skills.push(...group);
    }
  });

  return skills.map((s) => s.toLowerCase());
}

// 🔥 detect skill
function detectSkill(message: string, skills: string[]) {
  const msg = message.toLowerCase();
  return skills.find((skill) => msg.includes(skill));
}

// 🔥 detect language
function detectLanguage(text: string) {
  const indo = /apa|yang|dan|atau|dengan|saya|kamu|ini|itu|bisa/i;
  return indo.test(text) ? "id" : "en";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequest;
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json(
        { reply: "Message is empty" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: "Server error (missing API key)" },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });

    // 🔥 DETECTION
    const allSkills = extractSkills();
    const matchedSkill = detectSkill(message, allSkills);
    const lang = detectLanguage(message);

    // 🔥 SMART CONTEXT (hemat token)
    let context: unknown;

    if (matchedSkill) {
      context = {
        skill: matchedSkill,
        summary: portfolio.summary,
      };
    } else if (/project|work|portfolio/i.test(message)) {
      context = portfolio.projects.slice(0, 2);
    } else if (/experience|kerja|pengalaman/i.test(message)) {
      context = portfolio.experience.slice(0, 2);
    } else if (/skill|tech|stack/i.test(message)) {
      context = portfolio.skills;
    } else {
      context = {
        name: portfolio.name,
        role: portfolio.role,
        summary: portfolio.summary,
      };
    }

    // 🔥 PROMPT FINAL (SMART + CONSISTENT)
    const systemPrompt = `
You are Afif's AI assistant inside a modern portfolio.

LANGUAGE:
Respond ONLY in ${lang === "id" ? "Bahasa Indonesia" : "English"}.

PROJECT CONTEXT:
${body.projectContext || "None"}

CONTEXT:
${JSON.stringify(context)}

---

ROLE:
Explain Afif clearly, naturally, and concisely.

CORE TRAIT:
Afif is a fullstack developer, designer, and videographer with a fast learner, adaptable, and open to opportunities.

RULES:
- 2–4 sentences max
- No fluff, no repetition
- Do NOT hallucinate

LOGIC:
- If tech is in skills → be confident
- Do NOT use "meskipun", "although"
- If not → emphasize ability to learn quickly

STYLE:
- Natural, modern, slightly persuasive
- Highlight strengths first

GOAL:
Make Afif feel capable and worth contacting.
`.trim();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        ...(body.history?.slice(-6) || []), // 🔥 limit history
        { role: "user", content: message },
      ],
      temperature: 0.5,
      max_tokens: 200,
    });

    const reply = completion.choices?.[0]?.message?.content;

    if (!reply) {
      return NextResponse.json(
        { reply: "No response from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    const err = error as Error;

    console.error("❌ GROQ ERROR:", err);

    return NextResponse.json(
      {
        reply: "AI lagi error 😅 coba lagi nanti ya",
        error: err.message,
      },
      { status: 500 }
    );
  }
}