import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BookOpen, MessageCircle, Upload, Sparkles } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const isRTL = router.locale === 'ar'

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-primary-50 to-accent-50">
      {/* Header */}
      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-earth rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className={`text-2xl font-bold bg-gradient-to-r from-primary-600 to-earth-600 bg-clip-text text-transparent ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'هدايا' : 'HedAia'}
              </h1>
            </div>
            <button
              onClick={() => {
                const newLocale = router.locale === 'en' ? 'ar' : 'en'
                router.push(router.asPath, router.asPath, { locale: newLocale })
              }}
              className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-800 bg-secondary-100 hover:bg-secondary-200 rounded-lg transition-colors border border-secondary-200 hover:border-primary-300"
            >
              🌍 {router.locale === 'en' ? 'العربية' : 'English'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`text-5xl md:text-7xl font-bold mb-8 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              <span className="bg-gradient-to-r from-primary-600 via-earth-600 to-accent-600 bg-clip-text text-transparent">
                {isRTL ? 'مساعدك الذكي' : 'Your AI Teaching'}
              </span>
              <br />
              <span className="text-neutral-900">
                {isRTL ? 'لتدريس العربية' : 'Assistant for Arabic'}
              </span>
            </h1>

            <p className={`text-xl md:text-2xl text-neutral-600 mb-12 max-w-4xl mx-auto leading-relaxed ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {isRTL
                ? 'مدرب من قبل معلمين خبراء، مصمم خصيصاً لمعلمي اللغة العربية'
                : 'Trained by expert teachers, designed specifically for Arabic language educators'
              }
            </p>

            <div className="flex justify-center items-center mb-16">
              <Link
                href="/chat"
                className={`group px-12 py-5 bg-gradient-desert text-white rounded-xl font-semibold text-xl hover:from-primary-700 hover:to-earth-700 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl flex items-center gap-4 ${isRTL ? 'font-arabic' : ''}`}
              >
                <MessageCircle className="w-7 h-7" />
                {isRTL ? 'تحدث مع هدايا' : 'Chat with HedAia'}
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-neutral-600">
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-secondary-200">
                <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                <span className={isRTL ? 'font-arabic' : ''}>
                  {isRTL ? 'تعلم تفاعلي' : 'Interactive Learning'}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-secondary-200">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className={isRTL ? 'font-arabic' : ''}>
                  {isRTL ? 'مدرب من قبل معلمين' : 'Teacher Trained'}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-secondary-200">
                <div className="w-2 h-2 bg-earth-500 rounded-full"></div>
                <span className={isRTL ? 'font-arabic' : ''}>
                  {isRTL ? 'متخصص للعربية' : 'Arabic Specialist'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements with Desert colors */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary-200 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-accent-200 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-accent-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold text-neutral-900 mb-6 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {isRTL ? 'كيف يعمل هدايا؟' : 'How HedAia Works'}
            </h2>
            <p className={`text-xl text-neutral-600 max-w-3xl mx-auto ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {isRTL
                ? 'ثلاث خطوات بسيطة للحصول على مساعدة مخصصة في تدريس العربية'
                : 'Three simple steps to get personalized Arabic teaching assistance'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-earth-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
              </div>
              <h3 className={`text-2xl font-bold text-neutral-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'ابدأ المحادثة' : 'Start Chatting'}
              </h3>
              <p className={`text-neutral-600 leading-relaxed ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {isRTL
                  ? 'انقر على "تحدث مع هدايا" واحصل على نصائح عامة في تدريس العربية'
                  : 'Click "Chat with HedAia" and get general Arabic teaching advice'
                }
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              </div>
              <h3 className={`text-2xl font-bold text-neutral-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'اسأل عن أي موضوع' : 'Ask About Any Topic'}
              </h3>
              <p className={`text-neutral-600 leading-relaxed ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {isRTL ? 'هدايا مدرب على جميع دروس أرابيكالي ويقدم نصائح مخصصة تلقائياً' : 'HedAia is trained on all Arabically lessons and provides tailored advice automatically'}
              </p>
            </div>
            
            {/* Step 3: Get Expert Guidance */}
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-earth-500 to-accent-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-earth-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              </div>
              <h3 className={`text-2xl font-bold text-neutral-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'احصل على إرشاد الخبراء' : 'Get Expert Guidance'}
              </h3>
              <p className={`text-neutral-600 leading-relaxed ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {isRTL ? 'تلقى نصائح عملية مبنية على خبرة معلمين متخصصين في تدريس العربية' : 'Receive practical advice based on expert Arabic teaching experience'}
              </p>
            </div>
          </div>

          {/* Example Flow */}
          <div className="bg-white rounded-2xl shadow-lg border border-secondary-200 p-8">
            <div className="text-center mb-6">
              <h3 className={`text-2xl font-bold text-neutral-900 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'مثال على المحادثة' : 'Example Conversation'}
              </h3>
              <p className={`text-neutral-600 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                {isRTL ? 'شاهد كيف يساعدك هدايا تلقائياً باستخدام مكتبة دروس أرابيكالي' : 'See how HedAia automatically helps using the Arabically lesson library'}
              </p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              {/* User message */}
              <div className="flex justify-end">
                <div className={`bg-primary-500 text-white px-4 py-3 rounded-2xl max-w-xs ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  {isRTL ? 'كيف يمكنني جعل درس الحروف أكثر تفاعلاً للأطفال؟' : 'How can I make letter lessons more interactive for kids?'}
                </div>
              </div>
              {/* AI response */}
              <div className="flex justify-start">
                <div className={`bg-secondary-100 text-neutral-800 px-4 py-3 rounded-2xl max-w-md ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  {isRTL ? 'بناءً على درس "الحروف الأبجدية" في مكتبة أرابيكالي، إليك 3 أنشطة تفاعلية: 1) الرسم بالرمال (من قائمة المواد) 2) لعبة البحث عن الحروف 3) أغنية الحروف مع الحركات...' : 'Based on the "Arabic Alphabet" lesson from Arabically\'s library, here are 3 interactive activities: 1) Sand tray tracing (from materials list) 2) Letter hunt game 3) Arabic letter song with movements...'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold text-neutral-900 mb-6 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {isRTL ? 'لماذا هدايا؟' : 'Why HedAia?'}
            </h2>
            <p className={`text-xl text-neutral-600 max-w-3xl mx-auto ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {isRTL
                ? 'مساعد ذكي متخصص في تدريس العربية، مدرب من قبل معلمين خبراء'
                : 'A specialized AI assistant for Arabic teaching, trained by expert teachers'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 bg-gradient-to-br from-accent-50 to-white rounded-2xl border border-accent-100 hover:border-accent-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-green rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold text-neutral-900 mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
                {isRTL ? 'مدرب من قبل معلمين خبراء' : 'Teacher-Trained AI'}
              </h3>
              <p className={`text-neutral-600 leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                {isRTL 
                  ? 'ذكاء اصطناعي مدرب من قبل فريق من المعلمين المتخصصين في تدريس العربية'
                  : 'AI trained by expert teachers specializing in Arabic language education'
                }
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-sand rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold text-neutral-900 mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
                {isRTL ? 'متخصص لتدريس العربية' : 'Arabic Teaching Specialist'}
              </h3>
              <p className={`text-neutral-600 leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                {isRTL 
                  ? 'على عكس ChatGPT العام، هدايا مصمم خصيصاً لمعلمي العربية'
                  : 'Unlike general ChatGPT, HedAia is designed specifically for Arabic teachers'
                }
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-gradient-to-br from-earth-50 to-white rounded-2xl border border-earth-100 hover:border-earth-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-earth rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold text-neutral-900 mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
                {isRTL ? 'محتوى جاهز للاستخدام' : 'Ready-to-Use Content'}
              </h3>
              <p className={`text-neutral-600 leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                {isRTL 
                  ? 'ينتج مواد تعليمية مخصصة وجاهزة للاستخدام توفر وقتك'
                  : 'Generates tailored, classroom-ready materials that save you time'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-earth rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-xl font-bold ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'هدايا' : 'HedAia'}
              </h3>
            </div>
            <p className={`text-neutral-400 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {isRTL
                ? 'مساعدك الذكي المتخصص في تدريس العربية • مدرب من قبل معلمين خبراء'
                : 'Your specialized AI assistant for Arabic teaching • Trained by expert teachers'
              }
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
} 