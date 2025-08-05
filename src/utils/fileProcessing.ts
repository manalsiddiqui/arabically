export interface ProcessedFile {
  text: string
  metadata: {
    pageCount?: number
    wordCount: number
    language?: string
  }
}

export async function extractTextFromFile(file: File): Promise<ProcessedFile> {
  const fileType = file.type.toLowerCase()
  const fileExtension = file.name.split('.').pop()?.toLowerCase()
  
  let text = ''
  let metadata: ProcessedFile['metadata'] = { wordCount: 0 }
  
  try {
    if (fileType === 'text/plain' || fileExtension === 'txt') {
      text = await file.text()
    } else {
      // For PDF and DOCX files, we'll extract text on the server-side
      // For now, just return a placeholder that indicates server-side processing is needed
      text = `[File: ${file.name}] - Text will be extracted on server`
    }
    
    metadata.wordCount = countWords(text)
    metadata.language = detectLanguage(text)
    
    return { text, metadata }
  } catch (error) {
    console.error('Error extracting text from file:', error)
    throw new Error(`Failed to process file: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

function detectLanguage(text: string): string {
  // Simple Arabic text detection
  const arabicChars = text.match(/[\u0600-\u06FF]/g)
  const totalChars = text.replace(/\s/g, '').length
  
  if (arabicChars && totalChars > 0) {
    const arabicRatio = arabicChars.length / totalChars
    return arabicRatio > 0.3 ? 'ar' : 'en'
  }
  
  return 'en'
}

export function validateFile(file: File): { isValid: boolean; error?: string } {
  const maxSize = 50 * 1024 * 1024 // 50MB (increased from 10MB)
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ]
  const allowedExtensions = ['pdf', 'docx', 'txt']
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size must be less than 50MB' }
  }
  
  const fileExtension = file.name.split('.').pop()?.toLowerCase()
  const isValidType = allowedTypes.includes(file.type) || 
                     (fileExtension && allowedExtensions.includes(fileExtension))
  
  if (!isValidType) {
    return { isValid: false, error: 'File must be PDF, DOCX, or TXT format' }
  }
  
  return { isValid: true }
} 