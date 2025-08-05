import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid lesson plan ID' })
  }

  try {
    // Create Supabase client with service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Get the lesson plan
    const { data: lessonPlan, error: fetchError } = await supabase
      .from('lesson_plans')
      .select('file_path, original_filename, file_type, user_id')
      .eq('id', id)
      .single()

    if (fetchError || !lessonPlan) {
      return res.status(404).json({ error: 'Lesson plan not found' })
    }

    // Get authenticated user to verify ownership
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user || user.id !== lessonPlan.user_id) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    // Download file from Supabase Storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('lesson-plans')
      .download(lessonPlan.file_path)

    if (downloadError || !fileData) {
      console.error('Download error:', downloadError)
      return res.status(500).json({ error: 'Failed to download file' })
    }

    // Convert blob to buffer
    const arrayBuffer = await fileData.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Set appropriate headers
    res.setHeader('Content-Type', lessonPlan.file_type)
    res.setHeader('Content-Disposition', `attachment; filename="${lessonPlan.original_filename}"`)
    res.setHeader('Content-Length', buffer.length)

    // Send the file
    res.send(buffer)
  } catch (error) {
    console.error('Download error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
} 