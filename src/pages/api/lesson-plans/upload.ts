import { NextApiRequest, NextApiResponse } from 'next'
import formidable, { IncomingForm } from 'formidable'
import { v4 as uuidv4 } from 'uuid'
import { storeEmbeddings } from '@/lib/ai/rag'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Parse the multipart form data
    const form = new IncomingForm()
    const [fields, files] = await form.parse(req)

    const file = Array.isArray(files.file) ? files.file[0] : files.file
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Get form data
    const title = Array.isArray(fields.title) ? fields.title[0] : fields.title
    const ageGroup = Array.isArray(fields.ageGroup) ? fields.ageGroup[0] : fields.ageGroup
    const subject = Array.isArray(fields.subject) ? fields.subject[0] : fields.subject
    const tags = Array.isArray(fields.tags) ? fields.tags[0] : fields.tags
    const language = Array.isArray(fields.language) ? fields.language[0] : fields.language
    const extractedText = Array.isArray(fields.extractedText) ? fields.extractedText[0] : fields.extractedText

    if (!title || !extractedText) {
      return res.status(400).json({ error: 'Title and extracted text are required' })
    }

    // Create Supabase client with service role key for file uploads
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Temporarily disable auth for testing - use dummy user ID
    const dummyUserId = '00000000-0000-0000-0000-000000000000'
    
    // TODO: Re-enable authentication later
    // const { data: { user }, error: authError } = await supabase.auth.getUser()
    // if (authError || !user) {
    //   return res.status(401).json({ error: 'Unauthorized' })
    // }

    // Read file content
    const fileContent = fs.readFileSync(file.filepath)
    
    // Generate unique filename
    const fileExtension = file.originalFilename?.split('.').pop() || 'txt'
    const uniqueFilename = `${uuidv4()}.${fileExtension}`
    const filePath = `lesson-plans/${uniqueFilename}` // Simplified path without user folder

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('lesson-plans')
      .upload(filePath, fileContent, {
        contentType: file.mimetype || 'application/octet-stream',
        upsert: false,
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      return res.status(500).json({ error: 'Failed to upload file' })
    }

    // Parse tags
    const tagsArray = tags ? tags.split(',').map((tag: string) => tag.trim()).filter(Boolean) : []

    // Save lesson plan to database
    const { data: lessonPlan, error: dbError } = await supabase
      .from('lesson_plans')
      .insert({
        user_id: null, // Set to null since we made it nullable for testing
        title,
        original_filename: file.originalFilename || 'unknown',
        file_path: filePath,
        file_type: file.mimetype || 'application/octet-stream',
        file_size: file.size,
        extracted_text: extractedText,
        tags: tagsArray,
        age_group: ageGroup || null,
        subject: subject || null,
        language: language || 'ar',
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      // Clean up uploaded file if database insert fails
      await supabase.storage.from('lesson-plans').remove([filePath])
      return res.status(500).json({ error: 'Failed to save lesson plan' })
    }

    // Store embeddings for RAG
    try {
      await storeEmbeddings(lessonPlan.id, extractedText)
    } catch (embeddingError) {
      console.error('Embedding error:', embeddingError)
      // Don't fail the entire upload if embeddings fail
    }

    res.status(200).json({ success: true, lessonPlan })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default handler 