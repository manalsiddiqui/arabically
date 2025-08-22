import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ArrowLeft, Sprout } from 'lucide-react'

export default function Module1Page() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const isRTL = router.locale === 'ar'

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-4 py-4 sm:px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link
            href="/lesson-plans/uae-trees"
            className="flex items-center justify-center w-12 h-12 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Sprout className="w-4 h-4 text-white" />
              </div>
              <h1 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'الوحدة الأولى: ما ينمو في صحرائنا؟' : 'Module 1: What Grows in Our Desert?'}
              </h1>
            </div>
            <p className={`text-sm text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL 
                ? 'مقدمة عن أشجار الإمارات وأهميتها' 
                : 'Introduction to UAE trees and their importance'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <Sprout className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
            {isRTL ? 'قيد التطوير' : 'Coming Soon'}
          </h2>
          <p className={`text-gray-600 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
            {isRTL 
              ? 'محتوى هذه الوحدة قيد التطوير وسيكون متاحًا قريبًا'
              : 'This module content is under development and will be available soon'
            }
          </p>
          <Link
            href="/lesson-plans/uae-trees"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {isRTL ? 'العودة إلى نظرة عامة' : 'Back to Overview'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
} 