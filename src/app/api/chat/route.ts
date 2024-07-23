import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: groq("llama-3.1-70b-versatile"),
    messages,
  });

  return result.toAIStreamResponse();
}
