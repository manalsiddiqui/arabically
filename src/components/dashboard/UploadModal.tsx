'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { validateFile, extractTextFromFile } from '@/utils/fileProcessing'
import { X, Upload, File, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (lessonPlan: any) => void
  isRTL: boolean
}

export default function UploadModal({ isOpen, onClose, onUpload, isRTL }: UploadModalProps) {
  const { t } = useTranslation('common')
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    tags: '',
    language: 'ar',
  })

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (file: File) => {
    const validation = validateFile(file)
    if (!validation.isValid) {
      toast.error(validation.error!)
      return
    }

    setSelectedFile(file)
    // Auto-fill title from filename
    if (!formData.title) {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '')
      setFormData(prev => ({ ...prev, title: nameWithoutExt }))
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!selectedFile) {
      toast.error(isRTL ? 'يرجى اختيار ملف للرفع' : 'Please select a file to upload')
      return
    }

    if (!formData.title.trim()) {
      toast.error(isRTL ? 'يرجى إدخال عنوان الدرس' : 'Please enter a lesson title')
      return
    }

    setIsUploading(true)
    setUploadProgress(10)

    try {
      console.log('🚀 Starting upload process...')
      
      // Extract text from file
      setUploadProgress(20)
      const { text, metadata } = await extractTextFromFile(selectedFile)
      
      if (!text || text.length < 10) {
        throw new Error('File appears to be empty or unreadable. Please try a different file.')
      }

      console.log(`📄 Text extracted: ${text.length} characters`)
      setUploadProgress(40)

      // Prepare form data
      const uploadData = new FormData()
      uploadData.append('file', selectedFile)
      uploadData.append('title', formData.title)
      uploadData.append('ageGroup', '0-6') // Default age group for early childhood
      uploadData.append('subject', formData.subject)
      uploadData.append('tags', formData.tags)
      uploadData.append('language', formData.language)
      uploadData.append('extractedText', text)
      uploadData.append('wordCount', metadata.wordCount.toString())
      uploadData.append('detectedLanguage', metadata.language || 'en')

      setUploadProgress(60)
      console.log('📤 Uploading to server...')

      // Upload to API with timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 120000) // 2 minute timeout

      const response = await fetch('/api/lesson-plans/upload', {
        method: 'POST',
        body: uploadData,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Upload failed with status: ${response.status}`)
      }

      const result = await response.json()
      setUploadProgress(90)

      // Show warning if there was a processing issue
      if (result.warning) {
        toast(`⚠️ Upload successful but: ${result.warning}`, { 
          duration: 6000,
          icon: '⚠️' 
        })
      } else {
        toast.success(t('upload.success'))
      }
      
      setUploadProgress(100)
      
      // Reset form
      setSelectedFile(null)
      setFormData({
        title: '',
        subject: '',
        tags: '',
        language: 'ar',
      })
      
      console.log('✅ Upload completed successfully')
      onUpload(result)

      // Show embedding progress message
      toast('🧠 Processing lesson content for AI chat...', {
        duration: 4000,
        icon: '🧠'
      })
      
    } catch (error: any) {
      console.error('❌ Upload error:', error)
      
      let errorMessage = t('upload.error')
      
      if (error.name === 'AbortError') {
        errorMessage = 'Upload timeout. Please try with a smaller file.'
      } else if (error.message.includes('empty or unreadable')) {
        errorMessage = 'File content could not be read. Please try a different file format.'
      } else if (error.message.includes('too large')) {
        errorMessage = 'File is too large. Please try a smaller file (max 50MB).'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      toast.error(errorMessage, { duration: 6000 })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className={`text-lg font-medium text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
              {t('upload.title')}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
              disabled={isUploading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* File Upload Area */}
            <div className="mb-6">
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive
                    ? 'border-primary-500 bg-primary-50'
                    : selectedFile
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  disabled={isUploading}
                />

                {selectedFile ? (
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500 mr-2" />
                    <div>
                      <p className={`text-sm font-medium text-green-700 ${isRTL ? 'font-arabic' : ''}`}>
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-green-600">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className={`text-sm text-gray-600 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                      {t('upload.dragDrop')}
                    </p>
                    <p className={`text-xs text-gray-500 ${isRTL ? 'font-arabic' : ''}`}>
                      {t('upload.supportedFormats')}
                    </p>
                    <p className={`text-xs text-gray-500 ${isRTL ? 'font-arabic' : ''}`}>
                      {t('upload.maxSize')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                  {t('upload.metadata.title')} *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 ${isRTL ? 'font-arabic text-right' : ''}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  disabled={isUploading}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                  {t('upload.metadata.subject')}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={isRTL ? 'القراءة والكتابة' : 'Reading & Writing'}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 ${isRTL ? 'font-arabic text-right' : ''}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  disabled={isUploading}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                  {t('upload.metadata.tags')}
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder={isRTL ? 'الأحرف، الكلمات، التدريبات' : 'letters, words, exercises'}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 ${isRTL ? 'font-arabic text-right' : ''}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  disabled={isUploading}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                  {t('upload.metadata.language')}
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 ${isRTL ? 'font-arabic' : ''}`}
                  disabled={isUploading}
                >
                  <option value="ar">{isRTL ? 'العربية' : 'Arabic'}</option>
                  <option value="en">{isRTL ? 'الإنجليزية' : 'English'}</option>
                  <option value="both">{isRTL ? 'كلاهما' : 'Both'}</option>
                </select>
              </div>
            </div>

            {/* Progress Bar */}
            {isUploading && (
              <div className="mt-4">
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className={`text-sm text-gray-600 mt-2 text-center ${isRTL ? 'font-arabic' : ''}`}>
                  {t('upload.processing')}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={isUploading}
                className={`flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 ${isRTL ? 'font-arabic' : ''}`}
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                disabled={!selectedFile || !formData.title.trim() || isUploading}
                className={`flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors disabled:opacity-50 ${isRTL ? 'font-arabic' : ''}`}
              >
                {isUploading ? t('common.loading') : t('common.upload')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 