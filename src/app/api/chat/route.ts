import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const {
    messages,
    model = "llama-3.1-70b-versatile",
    temperature = 0.5,
  } = await req.json();

  const result = await streamText({
    model: groq(model),
    messages,
    temperature,
  });

  return result.toAIStreamResponse();
}
