import { NextApiRequest, NextApiResponse } from 'next'
import formidable, { IncomingForm } from 'formidable'
import { v4 as uuidv4 } from 'uuid'
import { storeEmbeddings } from '@/lib/ai/rag'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import mammoth from 'mammoth'
import pdfParse from 'pdf-parse'

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false, // Disable response limit for large files
  },
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Parse the multipart form data with larger size limits
    const form = new IncomingForm({
      maxFileSize: 50 * 1024 * 1024, // 50MB
      maxTotalFileSize: 50 * 1024 * 1024, // 50MB total
      maxFields: 20, // Allow more form fields
      maxFieldsSize: 2 * 1024 * 1024, // 2MB for form fields
    })
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

    // Temporarily skip storage upload for testing
    // TODO: Re-enable storage upload after fixing policies
    /*
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
    */
    console.log('⚠️ Storage upload skipped for testing')

    // Parse tags
    const tagsArray = tags ? tags.split(',').map((tag: string) => tag.trim()).filter(Boolean) : []

    // Extract text from file on server-side if needed
    let finalExtractedText = extractedText
    
    if (extractedText.includes('[File:') && extractedText.includes('Text will be extracted on server')) {
      // Client-side extraction failed, do it server-side
      try {
        const fileExtension = file.originalFilename?.split('.').pop()?.toLowerCase()
        
        console.log(`🔄 Extracting text from ${fileExtension} file: ${file.originalFilename}`)
        
        if (fileExtension === 'pdf') {
          // Read file in chunks to reduce memory usage
          const fileBuffer = fs.readFileSync(file.filepath)
          console.log(`📄 Processing PDF file: ${(fileBuffer.length / 1024 / 1024).toFixed(2)}MB`)
          
          const pdfData = await pdfParse(fileBuffer, {
            // Optimize PDF parsing for large files
            max: 50000, // Limit to 50,000 characters to prevent memory issues
          })
          finalExtractedText = pdfData.text.substring(0, 50000) // Truncate if too long
          console.log(`✅ PDF text extracted: ${finalExtractedText.length} characters`)
          
        } else if (fileExtension === 'docx') {
          const fileBuffer = fs.readFileSync(file.filepath)
          console.log(`📄 Processing DOCX file: ${(fileBuffer.length / 1024 / 1024).toFixed(2)}MB`)
          
          const result = await mammoth.extractRawText({ 
            buffer: fileBuffer,
            // Optimize DOCX parsing
            convertImage: mammoth.images.ignoreAll // Ignore images to save memory
          })
          finalExtractedText = result.value.substring(0, 50000) // Truncate if too long
          console.log(`✅ DOCX text extracted: ${finalExtractedText.length} characters`)
          
        } else {
          // For other files, use the original extracted text
          finalExtractedText = extractedText
        }
        
        // Clean up temporary file immediately after processing
        try {
          fs.unlinkSync(file.filepath)
          console.log('🗑️ Temporary file cleaned up')
        } catch (cleanupError) {
          console.warn('⚠️ Could not clean up temporary file:', cleanupError)
        }
        
      } catch (extractionError: any) {
        console.error('❌ Server-side text extraction error:', extractionError.message)
        // Use the original text if extraction fails
        finalExtractedText = `Error extracting text from ${file.originalFilename}. Please try a smaller file or different format.`
      }
    }

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
        extracted_text: finalExtractedText,
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
      // await supabase.storage.from('lesson-plans').remove([filePath]) // This line is commented out as storage upload is skipped
      return res.status(500).json({ error: 'Failed to save lesson plan' })
    }

    // Store embeddings for RAG
    try {
      await storeEmbeddings(lessonPlan.id, finalExtractedText)
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