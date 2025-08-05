import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { generateEmbedding, generateResponse } from '@/lib/ai/openai'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, chatHistory, language = 'en' } = req.body

  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  try {
    // Create Supabase client with service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Generate embedding for the user's question
    const queryEmbedding = await generateEmbedding(message)

    // Search for relevant content across ALL lesson plans using vector similarity
    const { data: similarContent, error: searchError } = await supabase.rpc(
      'match_lesson_plan_embeddings',
      {
        query_embedding: queryEmbedding,
        match_threshold: 0.7,
        match_count: 5
      }
    )

    if (searchError) {
      console.error('Vector search error:', searchError)
      // Fallback to general response without RAG
      return generateGeneralResponse(message, language, res)
    }

    // If we have relevant content, use it for context
    if (similarContent && similarContent.length > 0) {
      // Get lesson plan titles for the matched content
      const lessonPlanIds = [...new Set(similarContent.map(item => item.lesson_plan_id))]
      const { data: lessonPlans } = await supabase
        .from('lesson_plans')
        .select('id, title, subject, age_group')
        .in('id', lessonPlanIds)

      // Create a map of lesson plan info
      const lessonPlanMap = lessonPlans?.reduce((acc, plan) => {
        acc[plan.id] = plan
        return acc
      }, {} as Record<string, any>) || {}

      // Build context from similar content
      const context = similarContent
        .map(item => {
          const lessonInfo = lessonPlanMap[item.lesson_plan_id]
          return `From "${lessonInfo?.title || 'Unknown Lesson'}" (${lessonInfo?.subject || 'General'}, Ages ${lessonInfo?.age_group || 'All'}):\n${item.content}`
        })
        .join('\n\n---\n\n')

      // Generate contextual response
      const response = await generateContextualResponse(message, context, language, chatHistory)
      res.status(200).json({ response })
    } else {
      // No relevant content found, provide general teaching advice
      return generateGeneralResponse(message, language, res)
    }

  } catch (error) {
    console.error('Comprehensive chat error:', error)
    res.status(500).json({ error: 'Failed to generate response' })
  }
}

async function generateContextualResponse(
  message: string, 
  context: string, 
  language: string,
  chatHistory: any[] = []
): Promise<string> {
  const isArabic = language === 'ar'
  
  const systemMessage = isArabic 
    ? `أنت هدايا، مساعد ذكي متخصص في تدريس اللغة العربية ومدرب من قبل معلمين خبراء في أرابيكالي.

خصائصك:
- مدرب على مكتبة شاملة من خطط دروس أرابيكالي
- متخصص في التعلم التفاعلي والأساليب الحديثة
- تقدم نصائح عملية جاهزة للتطبيق في الصف
- تركز على احتياجات المعلمين العرب

استخدم المحتوى التالي من دروس أرابيكالي للإجابة على السؤال:

${context}

قدم إجابة مفيدة وعملية مبنية على هذا المحتوى. اذكر اسم الدرس عند الاقتباس منه.`
    : `You are HedAia, an AI teaching assistant specialized in Arabic language education, trained by expert teachers at Arabically.

Your characteristics:
- Trained on Arabically's comprehensive lesson plan library
- Specialized in interactive learning and modern methodologies  
- Provide practical, classroom-ready advice
- Focus on Arabic teachers' needs

Use the following content from Arabically lessons to answer the question:

${context}

Provide helpful and practical advice based on this content. Mention the lesson name when referencing it.`

  const messages = [
    { role: 'system', content: systemMessage },
    ...chatHistory.slice(-4).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.content
    })),
    { role: 'user', content: message }
  ]

  return await generateResponse(messages)
}

async function generateGeneralResponse(
  message: string, 
  language: string, 
  res: NextApiResponse
) {
  const isArabic = language === 'ar'
  
  const systemMessage = isArabic
    ? `أنت هدايا، مساعد ذكي متخصص في تدريس اللغة العربية. 
    
أنت مدرب من قبل معلمين خبراء ومتخصص في:
- التعلم التفاعلي والأساليب الحديثة
- تقديم نصائح عملية للمعلمين
- طرق تدريس مبتكرة للأطفال

قدم نصائح عامة مفيدة في تدريس العربية.`
    : `You are HedAia, an AI assistant specialized in Arabic language teaching.

You are trained by expert teachers and specialize in:
- Interactive learning and modern methodologies
- Providing practical advice for teachers  
- Innovative teaching methods for children

Provide helpful general advice about Arabic teaching.`

  const messages = [
    { role: 'system', content: systemMessage },
    { role: 'user', content: message }
  ]

  try {
    const response = await generateResponse(messages)
    res.status(200).json({ response })
  } catch (error) {
    console.error('General response error:', error)
    res.status(500).json({ error: 'Failed to generate response' })
  }
} 