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

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // Verify user owns the lesson plan
    const { data: lessonPlan, error: planError } = await supabase
      .from('lesson_plans')
      .select('id, title, user_id')
      .eq('id', lessonPlanId)
      .eq('user_id', user.id)
      .single()

    if (planError || !lessonPlan) {
      return res.status(404).json({ error: 'Lesson plan not found' })
    }

    // Generate AI response with lesson plan context
    const response = await generateContextualResponse(
      message,
      lessonPlanId,
      chatHistory || []
    )

    if (!response) {
      return res.status(500).json({ error: 'Failed to generate response' })
    }

    // Save chat session and messages to database
    try {
      // Create or get existing chat session
      let { data: session, error: sessionError } = await supabase
        .from('chat_sessions')
        .select('id')
        .eq('user_id', user.id)
        .eq('lesson_plan_id', lessonPlanId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (sessionError || !session) {
        // Create new session
        const { data: newSession, error: createError } = await supabase
          .from('chat_sessions')
          .insert({
            user_id: user.id,
            lesson_plan_id: lessonPlanId,
            title: `Chat about ${lessonPlan.title}`,
          })
          .select('id')
          .single()

        if (createError) {
          console.error('Session creation error:', createError)
        } else {
          session = newSession
        }
      }

      if (session) {
        // Save messages
        await supabase.from('chat_messages').insert([
          {
            session_id: session.id,
            role: 'user',
            content: message,
          },
          {
            session_id: session.id,
            role: 'assistant',
            content: response,
          },
        ])
      }
    } catch (dbError) {
      console.error('Database error saving chat:', dbError)
      // Don't fail the API call if chat saving fails
    }

    res.status(200).json({ response })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
} 