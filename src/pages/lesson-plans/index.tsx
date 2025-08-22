import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { 
  TreePine, 
  Apple, 
  Eye, 
  Rocket, 
  Leaf,
  ArrowLeft,
  BookOpen
} from 'lucide-react'

const themes = [
  {
    id: 'uae-trees',
    title: {
      en: 'UAE Trees',
      ar: 'أشجار الإمارات'
    },
    description: {
      en: 'Explore the native trees and plants of the UAE desert',
      ar: 'استكشف الأشجار والنباتات المحلية في صحراء الإمارات'
    },
    icon: TreePine,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    functional: true
  },
  {
    id: 'superfoods',
    title: {
      en: 'Superfoods of Arabia',
      ar: 'الأطعمة الخارقة في الجزيرة العربية'
    },
    description: {
      en: 'Discover nutritious foods from the Arabian Peninsula',
      ar: 'اكتشف الأطعمة المغذية من شبه الجزيرة العربية'
    },
    icon: Apple,
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  {
    id: 'senses',
    title: {
      en: 'The Five Senses',
      ar: 'الحواس الخمس'
    },
    description: {
      en: 'Learn about sight, sound, smell, taste, and touch',
      ar: 'تعلم عن البصر والسمع والشم والذوق واللمس'
    },
    icon: Eye,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    id: 'space',
    title: {
      en: 'Space & Stars',
      ar: 'الفضاء والنجوم'
    },
    description: {
      en: 'Journey through the cosmos and celestial bodies',
      ar: 'رحلة عبر الكون والأجرام السماوية'
    },
    icon: Rocket,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 'nature-cycles',
    title: {
      en: 'Nature Cycles',
      ar: 'دورات الطبيعة'
    },
    description: {
      en: 'Understanding seasons, water cycle, and life cycles',
      ar: 'فهم الفصول ودورة المياه ودورات الحياة'
    },
    icon: Leaf,
    color: 'from-teal-500 to-cyan-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200'
  }
]

export default function LessonPlansPage() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const isRTL = router.locale === 'ar'

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
            <h1 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'font-arabic text-right' : ''}`}>
              {isRTL ? 'خطط الدروس' : 'Lesson Plans'}
            </h1>
            <p className={`text-sm text-gray-600 ${isRTL ? 'font-arabic text-right' : ''}`}>
              {isRTL 
                ? 'استكشف المناهج التعليمية المتنوعة للطفولة المبكرة' 
                : 'Explore diverse educational curricula for early childhood'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gradient-desert text-white rounded-full text-sm font-semibold mb-4">
            {isRTL ? 'مناهج هدايا' : 'HedAia Curricula'}
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold text-neutral-900 mb-6 ${isRTL ? 'font-arabic' : ''}`}>
            {isRTL ? 'تعلم تفاعلي قائم على الطبيعة' : 'Nature-Based Interactive Learning'}
          </h2>
          <p className={`text-xl text-neutral-600 max-w-3xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            {isRTL
              ? 'مناهج تعليمية شاملة مصممة خصيصاً للأطفال في سن ما قبل المدرسة، تدمج التعلم مع الطبيعة والثقافة المحلية'
              : 'Comprehensive educational curricula designed specifically for preschoolers, integrating learning with nature and local culture'
            }
          </p>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {themes.map((theme) => {
            const Icon = theme.icon
            return (
              <Link
                key={theme.id}
                href={`/lesson-plans/${theme.id}`}
                className={`group relative overflow-hidden rounded-2xl border-2 ${theme.borderColor} ${theme.bgColor} p-8 hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                {/* Functional Theme Badge */}
                {theme.functional && (
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 bg-gradient-desert text-white text-xs font-semibold rounded-full">
                      {isRTL ? 'وظيفي' : 'Functional'}
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${theme.color} rounded-xl mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h3 className={`text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                    {theme.title[isRTL ? 'ar' : 'en']}
                  </h3>
                  <p className={`text-gray-600 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                    {theme.description[isRTL ? 'ar' : 'en']}
                  </p>
                </div>

                {/* Arrow Indicator */}
                <div className={`absolute bottom-6 ${isRTL ? 'left-6' : 'right-6'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <div className={`w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm ${isRTL ? 'rotate-180' : ''}`}>
                    <ArrowLeft className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${theme.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              </Link>
            )
          })}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="text-center mb-8">
            <BookOpen className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <h3 className={`text-2xl font-bold text-gray-900 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL ? 'ميزات المناهج' : 'Curriculum Features'}
            </h3>
            <p className={`text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL 
                ? 'مناهج مصممة خصيصاً للطفولة المبكرة'
                : 'Specially designed for early childhood development'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`text-center p-6 ${isRTL ? 'font-arabic' : ''}`}>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TreePine className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {isRTL ? 'قائم على الطبيعة' : 'Nature-Based'}
              </h4>
              <p className="text-sm text-gray-600">
                {isRTL 
                  ? 'تعلم من خلال استكشاف البيئة الطبيعية المحلية'
                  : 'Learning through exploration of local natural environment'
                }
              </p>
            </div>

            <div className={`text-center p-6 ${isRTL ? 'font-arabic' : ''}`}>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {isRTL ? 'تفاعلي' : 'Interactive'}
              </h4>
              <p className="text-sm text-gray-600">
                {isRTL 
                  ? 'أنشطة تشاركية تحفز المشاركة الفعالة'
                  : 'Hands-on activities that encourage active participation'
                }
              </p>
            </div>

            <div className={`text-center p-6 ${isRTL ? 'font-arabic' : ''}`}>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {isRTL ? 'ثقافي' : 'Cultural'}
              </h4>
              <p className="text-sm text-gray-600">
                {isRTL 
                  ? 'يدمج التراث والثقافة المحلية في التعلم'
                  : 'Integrates local heritage and culture into learning'
                }
              </p>
            </div>
          </div>
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