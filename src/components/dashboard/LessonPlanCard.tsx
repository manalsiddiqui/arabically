'use client'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { Database } from '@/lib/supabase/database.types'
import { MessageSquare, Download, Trash2, Calendar, FileText, Tag } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { enUS, ar } from 'date-fns/locale'
import toast from 'react-hot-toast'

type LessonPlan = Database['public']['Tables']['lesson_plans']['Row']

interface LessonPlanCardProps {
  lessonPlan: LessonPlan
  onDelete: (id: string) => void
}

export default function LessonPlanCard({ lessonPlan, onDelete }: LessonPlanCardProps) {
  const { t } = useTranslation('common')
  const router = useRouter()
  const isRTL = router.locale === 'ar'
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/lesson-plans/${lessonPlan.id}/download`)
      if (!response.ok) throw new Error('Download failed')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = lessonPlan.original_filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      
      toast.success(t('common.success'))
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Download failed')
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this lesson plan?')) {
      return
    }

    setIsDeleting(true)
    try {
      await onDelete(lessonPlan.id)
      toast.success('Lesson plan deleted successfully')
    } catch (error) {
      toast.error('Failed to delete lesson plan')
    } finally {
      setIsDeleting(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return '📄'
    if (fileType.includes('word') || fileType.includes('docx')) return '📝'
    if (fileType.includes('text')) return '📃'
    return '📁'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold text-gray-900 mb-1 line-clamp-2 ${isRTL ? 'font-arabic' : ''}`}>
            {lessonPlan.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{getFileIcon(lessonPlan.file_type)}</span>
            <span>{lessonPlan.original_filename}</span>
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="space-y-2 mb-4">
        {lessonPlan.subject && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileText className="w-4 h-4" />
            <span className={isRTL ? 'font-arabic' : ''}>{lessonPlan.subject}</span>
          </div>
        )}
        
        {lessonPlan.age_group && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>👥</span>
            <span className={isRTL ? 'font-arabic' : ''}>{lessonPlan.age_group}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>
            {formatDistanceToNow(new Date(lessonPlan.created_at), {
              addSuffix: true,
              locale: isRTL ? ar : enUS,
            })}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>💾</span>
          <span>{formatFileSize(lessonPlan.file_size)}</span>
        </div>
      </div>

      {/* Tags */}
      {lessonPlan.tags && lessonPlan.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {lessonPlan.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full ${isRTL ? 'font-arabic' : ''}`}
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            {lessonPlan.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                +{lessonPlan.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <Link
          href="/chat"
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors ${isRTL ? 'font-arabic' : ''}`}
        >
          <MessageSquare className="w-4 h-4" />
          {isRTL ? 'دردش مع هدايا' : 'Chat with HedAia'}
        </Link>

        <button
          onClick={handleDownload}
          className="flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          title={t('lessonPlan.download')}
        >
          <Download className="w-4 h-4" />
        </button>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex items-center justify-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors disabled:opacity-50"
          title={t('lessonPlan.delete')}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
} 