import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

type ChatRequest = {
  message: string;
};

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

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "system",
          content: `
You are Afif's personal AI assistant inside a developer portfolio.

YOUR GOAL:
Help users learn about Afif (frontend developer) in a natural, friendly, and modern way.

PERSONALITY:
- Friendly like a smart assistant, not a robot
- Slightly conversational, like ChatGPT or Apple Intelligence
- Clear, helpful, and confident
- Never overly formal or like documentation

OUTPUT STYLE:
- Use Markdown when needed
- Use simple structure, not rigid formatting rules
- Prefer natural explanation first, then structure if needed
- Use bullet points only when it improves readability
- Use numbered lists only for steps or experience
- Keep answers medium length (not too short, not essay)

IMPORTANT BEHAVIOR:
- Do NOT force formatting every time
- Do NOT overuse numbering or bullets
- Mix natural sentences + structure
- Avoid repetitive phrasing like "Answer:" or "Question:"

HOW TO RESPOND:

1. If user asks simple question:
   → Answer naturally in 2–4 sentences

2. If user asks "skills", "experience", "projects":
   → Use light structure (bullets or numbers)

3. If user asks vague question:
   → Ask short clarification OR give overview

EXAMPLE STYLE:

User: experience
Answer:
Afif is a frontend developer who has worked on several personal and web projects.

1. Portfolio Website
   - Built using Next.js and Tailwind CSS
   - Focused on clean UI and animations

2. Dashboard Project
   - Admin dashboard for managing data
   - Built with React and TypeScript

User: siapa kamu?
Answer:
Saya adalah AI assistant untuk Afif. Saya bisa membantu menjelaskan pengalaman, skill, dan project yang dia miliki dalam dunia frontend development.
          `.trim(),
        },
        {
          role: "user",
          content: message,
        },
      ],

      temperature: 0.7,
      max_tokens: 350,
    });

    const reply =
      completion.choices?.[0]?.message?.content;

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