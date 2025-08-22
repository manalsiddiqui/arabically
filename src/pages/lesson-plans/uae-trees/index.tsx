import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { 
  ArrowLeft,
  TreePine,
  MapPin,
  BookOpen,
  Play,
  Clock,
  Users,
  Target,
  Leaf,
  Sprout,
  Download,
  Eye,
  Search,
  Home,
  Puzzle,
  Heart,
  Award
} from 'lucide-react'

const modules = [
  {
    id: 'curriculum-map',
    title: {
      en: 'Curriculum Map',
      ar: 'خريطة المنهج'
    },
    description: {
      en: 'Complete overview of the UAE Trees learning journey for Term 1',
      ar: 'نظرة شاملة على رحلة تعلم أشجار الإمارات للفصل الأول'
    },
    icon: MapPin,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    type: 'overview',
    duration: 'Overview',
    activities: 6,
    moduleNumber: null
  },
  {
    id: 'module-1',
    title: {
      en: 'Module 1: What Grows in Our Desert?',
      ar: 'الوحدة الأولى: ما ينمو في صحرائنا؟'
    },
    description: {
      en: 'Introduction to UAE trees and their importance. Children will be able to spot and name local tree species in their surroundings.',
      ar: 'مقدمة عن أشجار الإمارات وأهميتها. سيتمكن الأطفال من تحديد وتسمية أنواع الأشجار المحلية في بيئتهم.'
    },
    icon: Sprout,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    type: 'module',
    duration: '45 min',
    activities: 3,
    moduleNumber: 1,
    coreActivity: 'Nature walk in a park/desert',
    focus: 'Introduction to UAE trees and their importance',
    skillsDeveloped: ['Cognitive: Observation', 'Language: Vocabulary', 'Environmental awareness']
  },
  {
    id: 'module-2',
    title: {
      en: 'Module 2: Parts of a Tree (Local Focus)',
      ar: 'الوحدة الثانية: أجزاء الشجرة (تركيز محلي)'
    },
    description: {
      en: 'Recognizing roots, trunk, branches, leaves, flowers, and fruits on Ghaf/Date Palm. Children will be able to name each part in Arabic and describe desert tree adaptations.',
      ar: 'التعرف على الجذور والجذع والأغصان والأوراق والزهور والثمار في الغاف/نخيل التمر. سيتمكن الأطفال من تسمية كل جزء بالعربية ووصف تكيفات أشجار الصحراء.'
    },
    icon: TreePine,
    color: 'from-orange-500 to-amber-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    type: 'module',
    duration: '45 min',
    activities: 4,
    moduleNumber: 2,
    coreActivity: 'Scavenger Hunt: Finding and labeling tree parts',
    focus: 'Recognizing tree parts and adaptations',
    skillsDeveloped: ['Cognitive: Classification', 'Language: Naming', 'Sensory: Touch & sight']
  },
  {
    id: 'module-3',
    title: {
      en: 'Module 3: Trees as Homes in the Desert',
      ar: 'الوحدة الثالثة: الأشجار كبيوت في الصحراء'
    },
    description: {
      en: 'How UAE desert trees benefit birds and animals. Children will name animals/insects and the way they use desert trees for shelter and describe animals with thick tongues.',
      ar: 'كيف تفيد أشجار الصحراء في الإمارات الطيور والحيوانات. سيسمي الأطفال الحيوانات/الحشرات والطريقة التي تستخدم بها أشجار الصحراء للمأوى.'
    },
    icon: Home,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    type: 'module',
    duration: '40 min',
    activities: 3,
    moduleNumber: 3,
    coreActivity: 'Observation & animal-tree matching card game',
    focus: 'Trees as homes for desert animals',
    skillsDeveloped: ['Cognitive: Matching & memory', 'Language: Animals and their habitats', 'Social: Cooperative play']
  },
  {
    id: 'module-4',
    title: {
      en: 'Module 4: How Desert Trees Grow and Survive',
      ar: 'الوحدة الرابعة: كيف تنمو أشجار الصحراء وتبقى على قيد الحياة'
    },
    description: {
      en: 'Understanding tree adaptations to heat & little water. Children will explain how roots, leaves, and flower adapt and survive in harsh climates.',
      ar: 'فهم تكيفات الأشجار مع الحرارة والمياه القليلة. سيشرح الأطفال كيف تتكيف الجذور والأوراق والزهور وتنجو في المناخ القاسي.'
    },
    icon: Puzzle,
    color: 'from-teal-500 to-cyan-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    type: 'module',
    duration: '50 min',
    activities: 4,
    moduleNumber: 4,
    coreActivity: 'Tree Survival Game: kids drinking water, leaves making shade, cooling in sand',
    focus: 'Understanding survival needs and adaptations',
    skillsDeveloped: ['Cognitive: Understanding survival needs', 'Language: Contextual vocabulary', 'Physical: Gross motor & fine motor']
  },
  {
    id: 'module-5',
    title: {
      en: 'Module 5: Why We Love Our Trees',
      ar: 'الوحدة الخامسة: لماذا نحب أشجارنا'
    },
    description: {
      en: 'Exploring uses of trees in UAE life (shade, fruit, wood, honey). Children will list uses of Ghafa, Sidr, and Date Palm in daily life.',
      ar: 'استكشاف استخدامات الأشجار في حياة الإمارات (الظل، الفاكهة، الخشب، العسل). سيسرد الأطفال استخدامات الغافة والسدر ونخيل التمر في الحياة اليومية.'
    },
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    type: 'module',
    duration: '45 min',
    activities: 4,
    moduleNumber: 5,
    coreActivity: 'Tree Gift Mystery bag: tree fruits, palm leaves, tree parts',
    focus: 'Uses of trees in daily life',
    skillsDeveloped: ['Cognitive: Categorizing & matching', 'Language: Vocabulary recall', 'Cultural awareness: UAE traditions']
  },
  {
    id: 'module-6',
    title: {
      en: 'Module 6: Review & Celebration',
      ar: 'الوحدة السادسة: مراجعة واحتفال'
    },
    description: {
      en: 'Consolidating learning of local tree facts & vocabulary. Children will recall species, parts, and uses of UAE trees.',
      ar: 'ترسيخ التعلم لحقائق الأشجار المحلية والمفردات. سيتذكر الأطفال الأنواع والأجزاء واستخدامات أشجار الإمارات.'
    },
    icon: Award,
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    type: 'module',
    duration: '60 min',
    activities: 5,
    moduleNumber: 6,
    coreActivity: 'Desert Tree Quiz Game & mini-exhibition',
    focus: 'Review and celebration of learning',
    skillsDeveloped: ['Cognitive: Recall & review', 'Language: Consolidation', 'Social: Presentation', 'Confidence: Presenting']
  }
]

const stats = [
  {
    label: { en: 'Total Modules', ar: 'إجمالي الوحدات' },
    value: '6',
    icon: BookOpen
  },
  {
    label: { en: 'Learning Hours', ar: 'ساعات التعلم' },
    value: '4.5',
    icon: Clock
  },
  {
    label: { en: 'Activities', ar: 'الأنشطة' },
    value: '23+',
    icon: Play
  },
  {
    label: { en: 'Age Group', ar: 'الفئة العمرية' },
    value: '3-6',
    icon: Users
  }
]

export default function UAETreesPage() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const isRTL = router.locale === 'ar'

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-4 py-4 sm:px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link
            href="/lesson-plans"
            className="flex items-center justify-center w-12 h-12 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <TreePine className="w-4 h-4 text-white" />
              </div>
              <h1 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'أشجار الإمارات' : 'UAE Trees'}
              </h1>
              <div className="px-3 py-1 bg-gradient-desert text-white text-xs font-semibold rounded-full">
                {isRTL ? 'موضوع وظيفي' : 'Functional Theme'}
              </div>
            </div>
            <p className={`text-sm text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL 
                ? 'استكشف النباتات والأشجار المحلية في دولة الإمارات العربية المتحدة - الفصل الأول' 
                : 'Explore the native plants and trees of the United Arab Emirates - Term 1'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL 
                ? 'رحلة اكتشاف الطبيعة المحلية'
                : 'Discovering Our Local Nature'
              }
            </h2>
            <p className={`text-xl mb-8 text-green-100 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL
                ? 'تعلم عن الأشجار والنباتات التي تنمو في بيئتنا الصحراوية الجميلة وكيف تتكيف مع المناخ المحلي'
                : 'Learn about the trees and plants that grow in our beautiful desert environment and how they adapt to the local climate'
              }
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <Icon className="w-6 h-6 mx-auto mb-2 text-green-200" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className={`text-sm text-green-200 ${isRTL ? 'font-arabic' : ''}`}>
                      {stat.label[isRTL ? 'ar' : 'en']}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full"></div>
        <div className="absolute bottom-10 right-20 w-20 h-20 bg-white/5 rounded-full"></div>
        <div className="absolute top-1/2 right-32 w-16 h-16 bg-white/5 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {modules.map((module) => {
            const Icon = module.icon
            const href = module.id === 'curriculum-map' 
              ? '#' 
              : `/lesson-plans/uae-trees/${module.id}`
            
            return (
              <Link
                key={module.id}
                href={href}
                className={`group relative overflow-hidden rounded-2xl border-2 ${module.borderColor} ${module.bgColor} p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}
              >
                {/* Module Type Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    module.type === 'overview' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {module.type === 'overview' 
                      ? (isRTL ? 'نظرة عامة' : 'Overview')
                      : (isRTL ? `الوحدة ${module.moduleNumber}` : `Module ${module.moduleNumber}`)
                    }
                  </div>
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${module.color} rounded-xl mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h3 className={`text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors ${isRTL ? 'font-arabic' : ''}`}>
                    {module.title[isRTL ? 'ar' : 'en']}
                  </h3>
                  <p className={`text-gray-600 leading-relaxed mb-4 text-sm ${isRTL ? 'font-arabic' : ''}`}>
                    {module.description[isRTL ? 'ar' : 'en']}
                  </p>

                  {/* Module Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Play className="w-4 h-4" />
                      <span>{module.activities} {isRTL ? 'نشاط' : 'activities'}</span>
                    </div>
                    {module.coreActivity && (
                      <div className="mt-3 p-2 bg-white/70 rounded-lg">
                        <div className="text-xs font-semibold text-gray-700 mb-1">
                          {isRTL ? 'النشاط الأساسي' : 'Core Activity'}
                        </div>
                        <div className="text-xs text-gray-600">
                          {module.coreActivity}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${module.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              </Link>
            )
          })}
        </div>

        {/* Learning Objectives */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-emerald-600" />
            <h3 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL ? 'أهداف التعلم' : 'Learning Objectives'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={isRTL ? 'font-arabic' : ''}>
              <h4 className="font-semibold text-gray-900 mb-3">
                {isRTL ? 'المعرفة' : 'Knowledge'}
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <Leaf className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{isRTL ? 'التعرف على النباتات المحلية في الإمارات' : 'Identify native UAE plants and trees'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Leaf className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{isRTL ? 'فهم أجزاء الشجرة ووظائفها' : 'Understand tree parts and their functions'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Leaf className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{isRTL ? 'تعلم كيفية تكيف النباتات مع المناخ الصحراوي' : 'Learn how plants adapt to desert climate'}</span>
                </li>
              </ul>
            </div>

            <div className={isRTL ? 'font-arabic' : ''}>
              <h4 className="font-semibold text-gray-900 mb-3">
                {isRTL ? 'المهارات' : 'Skills'}
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <Leaf className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{isRTL ? 'مهارات الملاحظة والاستكشاف' : 'Observation and exploration skills'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Leaf className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{isRTL ? 'التفكير النقدي حول البيئة' : 'Critical thinking about environment'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Leaf className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{isRTL ? 'مهارات التواصل والوصف' : 'Communication and description skills'}</span>
                </li>
              </ul>
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