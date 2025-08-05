import mammoth from 'mammoth'
import pdfParse from 'pdf-parse'

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
    if (fileType === 'application/pdf' || fileExtension === 'pdf') {
      text = await extractFromPDF(file)
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileExtension === 'docx'
    ) {
      text = await extractFromDOCX(file)
    } else if (fileType === 'text/plain' || fileExtension === 'txt') {
      text = await extractFromTXT(file)
    } else {
      throw new Error(`Unsupported file type: ${fileType}`)
    }
    
    // Calculate metadata
    metadata.wordCount = countWords(text)
    metadata.language = detectLanguage(text)
    
    return { text, metadata }
  } catch (error) {
    console.error('Error extracting text from file:', error)
    throw new Error(`Failed to process file: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

async function extractFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  
  const pdfData = await pdfParse(buffer)
  return pdfData.text
}

async function extractFromDOCX(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  
  const result = await mammoth.extractRawText({ buffer })
  return result.value
}

async function extractFromTXT(file: File): Promise<string> {
  return await file.text()
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length
}

function detectLanguage(text: string): string {
  // Simple Arabic text detection
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/
  const arabicMatches = text.match(arabicRegex)
  const englishMatches = text.match(/[a-zA-Z]/)
  
  if (arabicMatches && arabicMatches.length > (englishMatches?.length || 0)) {
    return 'ar'
  }
  return 'en'
}

export function validateFile(file: File): { isValid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ]
  const allowedExtensions = ['pdf', 'docx', 'txt']
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size exceeds 10MB limit' }
  }
  
  const fileExtension = file.name.split('.').pop()?.toLowerCase()
  
  if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension || '')) {
    return { isValid: false, error: 'File type not supported. Please upload PDF, DOCX, or TXT files.' }
  }
  
  return { isValid: true }
} 