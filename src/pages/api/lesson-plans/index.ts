import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Create Supabase client with service role key (bypasses RLS)
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

    res.status(200).json({ lessonPlans: formattedLessons })
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
} 