import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { generateContextualResponse } from '@/lib/ai/rag'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { lessonPlanId } = req.query
  const { message, chatHistory } = req.body

  if (!lessonPlanId || typeof lessonPlanId !== 'string') {
    return res.status(400).json({ error: 'Invalid lesson plan ID' })
  }

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' })
  }

  try {
    // Create Supabase client with service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Get lesson plan details (no auth check for now, but we should add it back later)
    const { data: lessonPlan, error: planError } = await supabase
      .from('lesson_plans')
      .select('id, title, user_id')
      .eq('id', lessonPlanId)
      .single()

    if (planError || !lessonPlan) {
      return res.status(404).json({ error: 'Lesson plan not found' })
    }

    // Generate AI response using RAG with lesson plan embeddings
    const response = await generateContextualResponse(
      message,
      lessonPlanId,
      lessonPlan.title,
      false // TODO: detect RTL from request
    )

    if (!response) {
      return res.status(500).json({ error: 'Failed to generate response' })
    }

    // TODO: Save chat session and messages to database
    // For now, just return the response

    res.status(200).json({ response })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
} 