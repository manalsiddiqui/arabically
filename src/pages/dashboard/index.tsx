import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Link from 'next/link'
import UploadModal from '@/components/dashboard/UploadModal'
import { 
  Upload, 
  FileText, 
  MessageCircle, 
  Download, 
  Trash2, 
  Plus,
  ArrowLeft,
  BookOpen,
  Calendar,
  FileIcon,
  Search
} from 'lucide-react'

type LessonPlan = {
  id: string
  title: string
  filename: string
  file_size: number
  upload_date: string
  age_group?: string
  subject?: string
  language: string
}

export default function DashboardPage() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const isRTL = router.locale === 'ar'

  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)

  // Fetch lesson plans from API
  useEffect(() => {
    fetchLessonPlans()
  }, [])

  const fetchLessonPlans = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/lesson-plans')
      if (response.ok) {
        const data = await response.json()
        setLessonPlans(data.lessonPlans || [])
      } else {
        console.error('Failed to fetch lesson plans')
        setLessonPlans([])
      }
    } catch (error) {
      console.error('Error fetching lesson plans:', error)
      setLessonPlans([])
    } finally {
      setIsLoading(false)
    }
  }

  const filteredLessonPlans = lessonPlans.filter(plan =>
    plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.filename.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(isRTL ? 'ar' : 'en', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-4 py-4 sm:px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center justify-center w-12 h-12 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className={`text-xl font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'خطط دروسي' : 'My Lesson Plans'}
              </h1>
            </div>
            <p className={`text-sm text-gray-600 ml-13 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL ? 'ارفع وادر خطط دروسك في العربية' : 'Upload and manage your Arabic lesson plans'}
            </p>
          </div>

          <button
            onClick={() => router.push(router.asPath, router.asPath, { 
              locale: router.locale === 'en' ? 'ar' : 'en' 
            })}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            🌍 {router.locale === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        {/* Search and Upload Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={isRTL ? 'ابحث في خطط الدروس...' : 'Search lesson plans...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all duration-200 ${isRTL ? 'font-arabic text-right' : ''}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>
            </div>

            <button
              onClick={() => setShowUploadModal(true)}
              className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3 ${isRTL ? 'font-arabic' : ''}`}
            >
              <Plus className="w-5 h-5" />
              {isRTL ? 'ارفع خطة درس جديدة' : 'Upload New Lesson Plan'}
            </button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className={`text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'جاري التحميل...' : 'Loading...'}
              </p>
            </div>
          </div>
        ) : filteredLessonPlans.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {searchTerm 
                ? (isRTL ? 'لا توجد نتائج' : 'No results found')
                : (isRTL ? 'لا توجد خطط دروس بعد' : 'No lesson plans yet')
              }
            </h2>
            <p className={`text-gray-600 mb-8 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {searchTerm 
                ? (isRTL ? 'جرب مصطلحات بحث مختلفة' : 'Try different search terms')
                : (isRTL ? 'ابدأ برفع خطة درسك الأولى للحصول على نصائح تعليمية مخصصة' : 'Start by uploading your first lesson plan to get personalized teaching advice')
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowUploadModal(true)}
                className={`px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto ${isRTL ? 'font-arabic' : ''}`}
              >
                <Upload className="w-6 h-6" />
                {isRTL ? 'ارفع خطة درسك الأولى' : 'Upload Your First Lesson Plan'}
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessonPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                    <FileIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 bg-gray-100 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors group">
                      <Trash2 className="w-4 h-4 text-gray-500 group-hover:text-red-500" />
                    </button>
                  </div>
                </div>

                <h3 className={`text-lg font-bold text-gray-900 mb-2 line-clamp-2 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {plan.title}
                </h3>

                <p className={`text-sm text-gray-600 mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {plan.filename}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(plan.upload_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FileIcon className="w-4 h-4" />
                    <span>{formatFileSize(plan.file_size)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href="/chat"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className={isRTL ? 'font-arabic' : ''}>
                      {isRTL ? 'دردش مع هدايا' : 'Chat with HedAia'}
                    </span>
                  </Link>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center justify-center">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal 
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUpload={(uploadResponse) => {
            // Transform the API response to match our LessonPlan type
            const newPlan: LessonPlan = {
              id: uploadResponse.lessonPlan.id,
              title: uploadResponse.lessonPlan.title,
              filename: uploadResponse.lessonPlan.original_filename,
              file_size: uploadResponse.lessonPlan.file_size,
              upload_date: uploadResponse.lessonPlan.created_at,
              age_group: uploadResponse.lessonPlan.age_group,
              subject: uploadResponse.lessonPlan.subject,
              language: uploadResponse.lessonPlan.language
            }
            setLessonPlans(prev => [newPlan, ...prev])
            setShowUploadModal(false)
          }}
          isRTL={isRTL}
        />
      )}
    </div>
  )
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}