import { OpenAI } from 'openai'
import { OpenAIEmbeddings } from '@langchain/openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable')
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'text-embedding-3-small',
})

export async function createEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })
  
  return response.data[0].embedding
}

export async function generateChatResponse(messages: Array<{ role: 'user' | 'assistant' | 'system', content: string }>) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    temperature: 0.7,
    max_tokens: 1000,
  })
  
  return response.choices[0].message.content
} 