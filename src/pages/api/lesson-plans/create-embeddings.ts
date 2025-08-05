import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'
import { storeEmbeddings } from '@/lib/ai/rag'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { lessonPlanId } = req.body

  if (!lessonPlanId) {
    return res.status(400).json({ error: 'Lesson plan ID is required' })
  }

  try {
    // Create Supabase client with service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Get the lesson plan
    const { data: lessonPlan, error } = await supabase
      .from('lesson_plans')
      .select('id, extracted_text')
      .eq('id', lessonPlanId)
      .single()

    if (error || !lessonPlan) {
      return res.status(404).json({ error: 'Lesson plan not found' })
    }

    if (!lessonPlan.extracted_text) {
      return res.status(400).json({ error: 'No text content to create embeddings from' })
    }

    // Create embeddings
    await storeEmbeddings(lessonPlan.id, lessonPlan.extracted_text)

    res.status(200).json({ success: true, message: 'Embeddings created successfully' })
  } catch (error) {
    console.error('Error creating embeddings:', error)
    res.status(500).json({ error: 'Failed to create embeddings' })
  }
} 