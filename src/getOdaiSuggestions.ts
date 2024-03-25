import OpenAI from "openai"
import { createPrompt } from "./createPrompt"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function getOdaiSuggestions(keyword: string): Promise<string[]> {
  const prompt = createPrompt(keyword)
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo-0125",
  })

  if (!chatCompletion.choices[0].message.content) {
    throw new Error("No response from OpenAI API")
  }

  return chatCompletion.choices[0].message.content
    .split("\n")
    .filter((line) => line.length > 0)
}
