import { createClient } from '@/lib/supabase/client'
import { createEmbedding } from './openai'

export interface ChunkResult {
  content: string
  similarity: number
  lesson_plan_id: string
}

export async function chunkText(text: string, chunkSize: number = 1000, overlap: number = 200): Promise<string[]> {
  const chunks: string[] = []
  let start = 0
  
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length)
    const chunk = text.slice(start, end)
    chunks.push(chunk.trim())
    
    if (end === text.length) break
    start = end - overlap
  }
  
  return chunks.filter(chunk => chunk.length > 50) // Filter out very small chunks
}

export async function storeEmbeddings(lessonPlanId: string, text: string) {
  const supabase = createClient()
  const chunks = await chunkText(text)
  
  const embeddingPromises = chunks.map(async (chunk, index) => {
    const embedding = await createEmbedding(chunk)
    
    return {
      lesson_plan_id: lessonPlanId,
      content: chunk,
      embedding,
      chunk_index: index,
    }
  })
  
  const embeddingData = await Promise.all(embeddingPromises)
  
  const { error } = await supabase
    .from('lesson_plan_embeddings')
    .insert(embeddingData)
  
  if (error) {
    console.error('Error storing embeddings:', error)
    throw error
  }
}

export async function searchSimilarContent(
  query: string, 
  lessonPlanId?: string, 
  limit: number = 5
): Promise<ChunkResult[]> {
  const supabase = createClient()
  const queryEmbedding = await createEmbedding(query)
  
  let rpcQuery = supabase.rpc('match_lesson_plan_embeddings', {
    query_embedding: queryEmbedding,
    match_threshold: 0.7,
    match_count: limit,
  })
  
  if (lessonPlanId) {
    rpcQuery = rpcQuery.eq('lesson_plan_id', lessonPlanId)
  }
  
  const { data, error } = await rpcQuery
  
  if (error) {
    console.error('Error searching embeddings:', error)
    throw error
  }
  
  return data || []
}

export async function generateContextualResponse(
  query: string, 
  lessonPlanId?: string,
  chatHistory: Array<{ role: 'user' | 'assistant', content: string }> = []
) {
  // Get relevant content from the lesson plan
  const similarContent = await searchSimilarContent(query, lessonPlanId, 3)
  
  // Build context from similar content
  const context = similarContent
    .map(chunk => chunk.content)
    .join('\n\n')
  
  // Create system message with context and Arabic teaching expertise
  const systemMessage = {
    role: 'system' as const,
    content: `You are an expert Arabic language teaching assistant. You help teachers improve their lesson plans and teaching strategies.

${context ? `Here is the relevant content from the lesson plan:
${context}

` : ''}You should:
1. Provide practical, actionable advice for Arabic language teaching
2. Suggest age-appropriate activities and exercises
3. Recommend assessment methods
4. Help adapt content for different skill levels
5. Support both Arabic and English in your responses
6. Focus on proven pedagogical methods for Arabic as a second language

When discussing the lesson plan content, only reference what has been provided. For general Arabic teaching advice, you can draw from your knowledge base.

Be encouraging and practical in your responses.`
  }
  
  // Combine system message, chat history, and current query
  const messages = [
    systemMessage,
    ...chatHistory,
    { role: 'user' as const, content: query }
  ]
  
  const { generateChatResponse } = await import('./openai')
  return await generateChatResponse(messages)
} 