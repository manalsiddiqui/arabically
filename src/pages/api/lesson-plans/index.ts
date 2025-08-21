import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

  if (req.method === 'GET') {
    try {
      // Get all lesson plans (bypassing RLS for now)
      const { data: lessonPlans, error } = await supabase
        .from('lesson_plans')
        .select(`
          id,
          title,
          original_filename,
          file_size,
          age_group,
          subject,
          language,
          tags,
          created_at
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Database error:', error)
        return res.status(500).json({ error: 'Failed to fetch lesson plans' })
      }

      // Transform data to match the expected format
      const formattedLessons = lessonPlans?.map(plan => ({
        id: plan.id,
        title: plan.title,
        filename: plan.original_filename,
        file_size: plan.file_size,
        age_group: plan.age_group,
        subject: plan.subject,
        language: plan.language,
        tags: plan.tags,
        upload_date: plan.created_at
      })) || []

      return res.status(200).json({
        success: true,
        lessonPlansCount: formattedLessons.length,
        lessonPlans: formattedLessons
      })

    } catch (error) {
      console.error('API error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }

  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Lesson plan ID is required' })
      }

      // Delete lesson plan embeddings first
      const { error: embeddingsError } = await supabase
        .from('lesson_plan_embeddings')
        .delete()
        .eq('lesson_plan_id', id)

      if (embeddingsError) {
        console.error('Error deleting embeddings:', embeddingsError)
        // Continue with lesson plan deletion even if embeddings fail
      }

      // Delete the lesson plan
      const { error: lessonError } = await supabase
        .from('lesson_plans')
        .delete()
        .eq('id', id)

      if (lessonError) {
        console.error('Error deleting lesson plan:', lessonError)
        return res.status(500).json({ error: 'Failed to delete lesson plan' })
      }

      return res.status(200).json({ success: true, message: 'Lesson plan deleted successfully' })

    } catch (error) {
      console.error('Delete error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }

  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
} 