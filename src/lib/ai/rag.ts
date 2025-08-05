import { createServerClient } from '@/lib/supabase/server'
import { generateEmbedding, generateChatResponse } from './openai'

export interface LessonPlanChunk {
  id: string
  lesson_plan_id: string
  content: string
  embedding: number[]
  metadata: Record<string, any>
}

export function chunkText(text: string, chunkSize: number = 1000, overlap: number = 200): string[] {
  const chunks: string[] = []
  let start = 0
  
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length)
    chunks.push(text.slice(start, end))
    start = end - overlap

    if (start >= text.length) break
  }

  return chunks
}

export async function storeEmbeddings(
  lessonPlanId: string,
  text: string,
  metadata: Record<string, any> = {}
): Promise<void> {
  const supabase = createServerClient()
  const chunks = chunkText(text)
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i]
    const embedding = await generateEmbedding(chunk)
  
  const { error } = await supabase
    .from('lesson_plan_embeddings')
      .insert({
        lesson_plan_id: lessonPlanId,
        content: chunk,
        embedding: embedding, // Don't JSON.stringify - Supabase handles vector conversion
        metadata: { ...metadata, chunk_index: i }
      })
  
  if (error) {
      console.error('Error storing embedding:', error)
      throw new Error('Failed to store embedding')
    }
  }
}

export async function searchSimilarContent(
  query: string, 
  lessonPlanId?: string, 
  limit: number = 5
): Promise<LessonPlanChunk[]> {
  const supabase = createServerClient()
  const queryEmbedding = await generateEmbedding(query)
  
  let rpcQuery = supabase.rpc('match_lesson_plan_embeddings', {
    query_embedding: queryEmbedding, // Don't JSON.stringify - pass array directly
    match_threshold: 0.7,
    match_count: limit
  })
  
  if (lessonPlanId) {
    rpcQuery = rpcQuery.eq('lesson_plan_id', lessonPlanId)
  }
  
  const { data, error } = await rpcQuery
  
  if (error) {
    console.error('Error searching similar content:', error)
    throw new Error('Failed to search similar content')
  }
  
  return data || []
}

export async function generateContextualResponse(
  query: string, 
  lessonPlanId: string,
  lessonTitle: string,
  isRTL: boolean = false
): Promise<string> {
  // Get relevant chunks
  const similarChunks = await searchSimilarContent(query, lessonPlanId, 3)
  
  // Build context from chunks
  const context = similarChunks
    .map(chunk => chunk.content)
    .join('\n\n')
  
  // Create system message
  const systemMessage = {
    role: 'system' as const,
    content: isRTL
      ? `أنت هدايا، مساعد ذكي متخصص في تدريس اللغة العربية. استخدم المحتوى التالي من درس "${lessonTitle}" للإجابة على السؤال:

المحتوى:
${context}

خصائصك:
- مدرب من قبل معلمين خبراء في تدريس العربية
- متخصص في التعلم التفاعلي والأساليب الحديثة
- مصمم خصيصاً لمعلمي اللغة العربية

قدم إجابة مفيدة وعملية مبنية على هذا المحتوى فقط.`
      : `You are HedAia, a specialized AI assistant for Arabic language teaching. Use the following content from the lesson "${lessonTitle}" to answer the question:

Content:
${context}

Your characteristics:
- Trained by expert Arabic language teachers
- Specialized in interactive learning and modern methodologies
- Designed specifically for Arabic language educators

Provide a helpful and practical answer based only on this content.`
  }

  const userMessage = {
    role: 'user' as const,
    content: query
  }

  return await generateChatResponse([systemMessage, userMessage])
} 