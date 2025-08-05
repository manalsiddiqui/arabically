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
  onSuccess: () => void
}

export default function UploadModal({ isOpen, onClose, onSuccess }: UploadModalProps) {
  const { t } = useTranslation('common')
  const router = useRouter()
  const isRTL = router.locale === 'ar'
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    title: '',
    ageGroup: '',
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
    
    if (!selectedFile) {
      toast.error('Please select a file to upload')
      return
    }

    if (!formData.title.trim()) {
      toast.error('Please enter a lesson title')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Extract text from file
      setUploadProgress(25)
      const { text, metadata } = await extractTextFromFile(selectedFile)
      
      // Create form data for upload
      const uploadData = new FormData()
      uploadData.append('file', selectedFile)
      uploadData.append('title', formData.title.trim())
      uploadData.append('ageGroup', formData.ageGroup)
      uploadData.append('subject', formData.subject)
      uploadData.append('tags', formData.tags)
      uploadData.append('language', formData.language)
      uploadData.append('extractedText', text)
      uploadData.append('wordCount', metadata.wordCount.toString())
      uploadData.append('detectedLanguage', metadata.language || 'en')

      setUploadProgress(50)

      // Upload to API
      const response = await fetch('/api/lesson-plans/upload', {
        method: 'POST',
        body: uploadData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      setUploadProgress(100)
      toast.success(t('upload.success'))
      
      // Reset form
      setSelectedFile(null)
      setFormData({
        title: '',
        ageGroup: '',
        subject: '',
        tags: '',
        language: 'ar',
      })
      
      onSuccess()
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(t('upload.error'))
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                    {t('upload.metadata.ageGroup')}
                  </label>
                  <input
                    type="text"
                    name="ageGroup"
                    value={formData.ageGroup}
                    onChange={handleInputChange}
                    placeholder="5-7 years"
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