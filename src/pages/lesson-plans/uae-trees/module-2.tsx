import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { 
  ArrowLeft,
  TreePine,
  Download,
  Clock,
  Users,
  Target,
  CheckCircle,
  FileText,
  Eye,
  Play,
  User,
  Lightbulb,
  BookOpen,
  ClipboardCheck
} from 'lucide-react'

export default function Module2Page() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const isRTL = router.locale === 'ar'

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
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
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                <TreePine className="w-4 h-4 text-white" />
              </div>
              <h1 className={`text-2xl font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'الوحدة الثانية: أجزاء الشجرة' : 'Module 2: Parts of a Tree'}
              </h1>
            </div>
            <p className={`text-sm text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL 
                ? 'التعرف على أجزاء الشجرة وتكيفاتها' 
                : 'Recognizing tree parts and adaptations'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL 
                ? 'النشاط الأساسي: البحث عن الكنوز'
                : 'Core Activity: Scavenger Hunt'
              }
            </h2>
            <p className={`text-lg mb-6 text-orange-100 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL
                ? 'استكشاف وتحديد الأجزاء الرئيسية للشجرة من خلال الملاحظة والحركة والاستكشاف الحسي واللعب الموجه'
                : 'Exploring and identifying the main parts of a tree through observation, movement, sensorial exploration and guided play'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - You'll Need & Lesson Plan */}
          <div className="lg:col-span-1 space-y-6">
            {/* You'll Need */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className={`text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 ${isRTL ? 'font-arabic' : ''}`}>
                <CheckCircle className="w-6 h-6 text-orange-500" />
                {isRTL ? 'ستحتاج إلى' : "You'll need"}
              </h3>
              <ul className={`space-y-2 text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{isRTL ? 'قائمة تدقيق لصيد الكنوز بالعربية' : 'Picture scavenger hunt checklist in Arabic'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{isRTL ? 'أقلام رصاص/أقلام تلوين' : 'Clipboards / pencils/crayons'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{isRTL ? 'سلال صغيرة/أكياس للعناصر المتساقطة الآمنة' : 'Small baskets/bags (for safe, fallen items)'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{isRTL ? 'عدسة مكبرة (اختيارية)' : 'Magnifying glass (optional)'}</span>
                </li>
              </ul>
              
              {/* Download Button */}
              <div className="mt-4">
                <button className="w-full px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-medium hover:bg-orange-200 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  <span className={isRTL ? 'font-arabic' : ''}>
                    {isRTL ? 'تحميل القائمة' : 'Download Checklist'}
                  </span>
                </button>
              </div>
            </div>

            {/* Lesson Plan */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className={`text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 ${isRTL ? 'font-arabic' : ''}`}>
                <BookOpen className="w-6 h-6 text-orange-500" />
                {isRTL ? 'خطة الدرس' : 'Lesson Plan'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className={`font-semibold text-gray-700 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                    {isRTL ? '1. مقدمة' : '1. Introduction'}
                  </h4>
                  <ul className={`text-sm text-gray-600 space-y-1 ${isRTL ? 'font-arabic' : ''}`}>
                    <li>• {isRTL ? 'اجمع الأطفال في دائرة بالقرب من شجرة نخيل' : 'Gather children in a circle near a date palm tree'}</li>
                    <li>• {isRTL ? 'اسأل بإيجاز: "ما هي الشجرة؟ لماذا الأشجار مهمة؟"' : 'Briefly ask: "What is a tree? Why trees important?"'}</li>
                    <li>• {isRTL ? 'قدم مفردات أجزاء الشجرة بالعربية' : 'Introduce Parts of a tree vocabulary in Arabic'}</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className={`font-semibold text-gray-700 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                    {isRTL ? '2. تعليمات البحث عن الكنوز' : '2. Instructions for the Scavenger Hunt'}
                  </h4>
                  <ul className={`text-sm text-gray-600 space-y-1 ${isRTL ? 'font-arabic' : ''}`}>
                    <li>• {isRTL ? 'وضح أنهم سيتحركون مع مجموعتهم للعثور على كل جزء' : 'Explain that they will move around with their group to find each part'}</li>
                    <li>• {isRTL ? 'اشرح أنهم سيتحركون مع مجموعتهم للعثور على كل جزء' : 'Explain that they will move around with their group to find each part'}</li>
                    <li>• {isRTL ? 'قاعدة اللعب: انظر، المس برفق، لا تقطف أو تكسر شيئًا' : 'Play rule: Look, touch gently, don\'t pick or break anything'}</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className={`font-semibold text-gray-700 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                    {isRTL ? '3. البحث عن الكنوز' : '3. Scavenger Hunt'}
                  </h4>
                  <p className={`text-sm text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
                    {isRTL 
                      ? 'يتجول الأطفال مع مرشد من معلم/مساعد' 
                      : 'Children walk around, guided by a teacher/assistant'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Activity Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className={`text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 ${isRTL ? 'font-arabic' : ''}`}>
                <Play className="w-6 h-6 text-orange-500" />
                {isRTL ? 'تفاصيل النشاط' : 'Activity details'}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span className={`font-medium ${isRTL ? 'font-arabic' : ''}`}>
                    {isRTL ? '45 دقيقة' : '45 minutes'}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <Users className="w-5 h-5 text-orange-600" />
                  <span className={`font-medium ${isRTL ? 'font-arabic' : ''}`}>
                    {isRTL ? 'نسبة 4:1' : '4:1 ratio'}
                  </span>
                </div>
              </div>

              {/* Scavenger Hunt Checklist */}
              <div className="mt-6">
                <h4 className={`font-semibold text-gray-700 mb-3 ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL ? 'قائمة تدقيق البحث عن الكنوز:' : 'Scavenger hunt checklist:'}
                </h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <span className={`text-sm font-medium ${isRTL ? 'font-arabic' : ''}`}>
                      {isRTL ? 'أجزاء الشجرة' : 'Parts of tree'}
                    </span>
                  </div>
                  <p className={`text-xs text-gray-600 ml-8 ${isRTL ? 'font-arabic' : ''}`}>
                    {isRTL ? 'ملف PDF - 245 كيلوبايت' : 'PDF - 245 KB'}
                  </p>
                  <button className="mt-2 ml-8 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {isRTL ? 'تحميل' : 'Download'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Learning Outcomes & Assessment */}
          <div className="lg:col-span-1 space-y-6">
            {/* Learning Outcomes */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className={`text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 ${isRTL ? 'font-arabic' : ''}`}>
                <Target className="w-6 h-6 text-orange-500" />
                {isRTL ? 'نتائج التعلم' : 'Learning Outcomes'}
              </h3>
              
              <div className={`text-sm text-gray-600 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL 
                  ? 'بنهاية هذا النشاط، سيتمكن الأطفال من:'
                  : 'By the end of this activity, children will be able to:'
                }
              </div>
              
              <ul className={`space-y-3 ${isRTL ? 'font-arabic' : ''}`}>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-700">
                      {isRTL ? 'المعرفية' : 'Cognitive'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {isRTL ? 'تسمية الأجزاء الرئيسية للشجرة' : 'Name the main parts of a tree'}
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-700">
                      {isRTL ? 'اللغوية' : 'Language'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {isRTL ? 'استخدام المفردات المستهدفة' : 'Use target vocabulary'}
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-700">
                      {isRTL ? 'الحسية' : 'Sensory'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {isRTL ? 'التمييز بين القوام (خشن، ناعم، مورق، صلب، ناعم) والأشكال في الطبيعة' : 'Differentiate textures (rough, smooth, leafy, solid, soft) and shapes in nature'}
                    </div>
                  </div>
                </li>
              </ul>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <a href="#" className={`text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL ? 'اقرأ المزيد >' : 'Read more >'}
                  <Eye className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Assessment/Evaluation */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className={`text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 ${isRTL ? 'font-arabic' : ''}`}>
                <ClipboardCheck className="w-6 h-6 text-orange-500" />
                {isRTL ? 'التقييم/التقويم' : 'Assessment/Evaluation'}
              </h3>
              
              <ul className={`space-y-3 text-sm text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{isRTL ? 'لاحظ ما إذا كان بإمكان الأطفال تحديد وتسمية أجزاء الشجرة بشكل صحيح' : 'Observe if children can correctly identify and name tree parts'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{isRTL ? 'تحقق من استخدام المفردات أثناء النشاط' : 'Check vocabulary usage during the activity'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{isRTL ? 'لاحظ العمل الجماعي والمشاركة' : 'Observe teamwork and participation'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{isRTL ? 'اكتب أي لحظات مؤثرة' : 'Note down any AHA moments'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to Lesson Plans Link */}
        <div className="mt-12 text-center">
          <Link
            href="/lesson-plans/uae-trees"
            className={`inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-medium ${isRTL ? 'font-arabic' : ''}`}
          >
            <ArrowLeft className="w-4 h-4" />
            {isRTL ? 'العودة إلى خطط الدروس (الوحدة 1)' : 'Back to Lesson Plans (Module 1)'}
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