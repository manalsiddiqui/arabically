import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Bot, BookOpen, MessageCircle, Sparkles, ArrowRight, Globe, Upload, FileText, Users, Target, Award, Zap } from 'lucide-react'
import LanguageToggle from '../components/ui/LanguageToggle'

export default function HomePage() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const isRTL = router.locale === 'ar'

  const exampleQuestions = isRTL ? [
    "كيف أُعدل هذا الدرس ليناسب مستوى A1 في إطار CEFR؟",
    "ما الأنشطة التفاعلية المناسبة لهذا المحتوى؟",
    "كيف أطبق مبادئ التعلم القائم على اللعب الموجه؟",
    "كيف أقيم تقدم الطلاب في هذا الدرس؟"
  ] : [
    "How can I adapt this lesson for CEFR A1 level?",
    "What guided play activities work with this content?",
    "How can I assess early years development with this lesson?",
    "What nature-based activities fit this material?"
  ]

  const features = isRTL ? [
    {
      icon: Award,
      title: "مدرب من قبل معلمين خبراء",
      description: "ذكاء اصطناعي مدرب من قبل فريق من المعلمين المتخصصين في إطار CEFR والتعلم القائم على اللعب الموجه"
    },
    {
      icon: Target,
      title: "متخصص لتدريس العربية",
      description: "على عكس ChatGPT العام، هدايا مصمم خصيصاً لمعلمي العربية ومعايير التدريس المبكر"
    },
    {
      icon: Zap,
      title: "محتوى جاهز للاستخدام",
      description: "ينتج مواد تعليمية مخصصة وجاهزة للاستخدام توفر وقتك وتلبي احتياجات صفك"
    }
  ] : [
    {
      icon: Award,
      title: "Teacher-Trained AI",
      description: "AI trained by expert teachers specializing in CEFR framework and guided play approach"
    },
    {
      icon: Target,
      title: "Arabic Teaching Specialist",
      description: "Unlike general ChatGPT, HedAia is designed specifically for Arabic teachers and early years standards"
    },
    {
      icon: Zap,
      title: "Ready-to-Use Content",
      description: "Generates tailored, classroom-ready materials that save time and meet your students' specific needs"
    }
  ]

  const differentiators = isRTL ? [
    {
      question: "كيف تعرف هدايا مستويات الكفاءة المختلفة؟",
      answer: "لدينا فريق من المعلمين المتخصصين الذين يدربون ذكاءنا الاصطناعي ليتماشى مع إطار التعلم القائم على اللعب الموجه وإطار CEFR. بفضلهم، تتحسن هدايا باستمرار في مطابقة المحتوى المناسب لمستويات طلابك!"
    },
    {
      question: "من ينشئ المحتوى عند طلبه؟",
      answer: "المحتوى ينشئه ذكاءنا الاصطناعي الخاص، والذي تم تطويره خلال العام الماضي باستخدام ملاحظات المعلمين لفهم احتياجاتك بعمق وتلبية جميع معايير التدريس."
    },
    {
      question: "كيف تختلف هدايا عن ChatGPT؟",
      answer: "هدايا مصممة خصيصاً للمعلمين، على عكس ChatGPT العام. أدواتنا مخصصة لتلبية معايير التدريس القائم على الطبيعة ودعم تطوير السنوات المبكرة وتوفير وقتك."
    }
  ] : [
    {
      question: "How does HedAia know different proficiency levels?",
      answer: "We have a team of dedicated teachers who train our AI to align with the Guided Play framework as well as the Common European Framework of Reference for Languages (CEFR). Thanks to them, our AI keeps getting better at matching the right content to your students' levels!"
    },
    {
      question: "Who creates the content when I request it?",
      answer: "The content is created by our own AI, which has been refined over the last year using feedback from teachers to deeply understand your needs and meet all teaching standards, delivering materials perfectly tailored for your class."
    },
    {
      question: "How is HedAia different from ChatGPT?",
      answer: "HedAia is specifically designed for teachers, unlike ChatGPT, which is a general-purpose AI. Our tools are tailored to meet nature-based teaching standards, support early years development, and save you time by generating ready-to-use lesson materials."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'هدايا' : 'HedAia'}
              </h1>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              {isRTL ? 'مدرب من قبل معلمين • متخصص لتدريس العربية' : 'Teacher-Trained • Arabic Teaching Specialist'}
            </div>
            
            <h1 className={`text-5xl md:text-7xl font-bold mb-8 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {isRTL ? 'مساعدك الذكي' : 'Your AI Teaching'}
              </span>
              <br />
              <span className="text-gray-900">
                {isRTL ? 'لتدريس العربية' : 'Assistant for Arabic'}
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {isRTL 
                ? 'مدرب من قبل معلمين خبراء، متوافق مع إطار CEFR والتعلم القائم على اللعب الموجه. ارفع دروسك واحصل على مواد تعليمية مخصصة وجاهزة للاستخدام'
                : 'Trained by expert teachers, aligned with CEFR framework and guided play approach. Upload your lessons and get tailored, classroom-ready teaching materials'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/dashboard"
                className={`group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3 ${isRTL ? 'font-arabic' : ''}`}
              >
                <Upload className="w-6 h-6" />
                {isRTL ? 'ابدأ مع هدايا' : 'Start with HedAia'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/demo"
                className={`px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200 flex items-center gap-3 ${isRTL ? 'font-arabic' : ''}`}
              >
                <MessageCircle className="w-6 h-6" />
                {isRTL ? 'جرب درس تجريبي' : 'Try Demo Lesson'}
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span className={isRTL ? 'font-arabic' : ''}>
                  {isRTL ? 'متوافق مع CEFR' : 'CEFR Aligned'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                <span className={isRTL ? 'font-arabic' : ''}>
                  {isRTL ? 'مدرب من قبل معلمين' : 'Teacher Trained'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                <span className={isRTL ? 'font-arabic' : ''}>
                  {isRTL ? 'متخصص للعربية' : 'Arabic Specialist'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-indigo-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {isRTL ? 'لماذا هدايا؟' : 'Why HedAia?'}
            </h2>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {isRTL 
                ? 'مساعد ذكي متخصص في تدريس العربية، مدرب من قبل معلمين خبراء لتلبية احتياجاتك التعليمية'
                : 'A specialized AI assistant for Arabic teaching, trained by expert teachers to meet your educational needs'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {feature.title}
                </h3>
                <p className={`text-gray-600 leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {isRTL ? 'أسئلة شائعة' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-8">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className={`text-xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic text-right' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  {item.question}
                </h3>
                <p className={`text-gray-600 leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Questions Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {isRTL ? 'أسئلة يمكنك طرحها' : 'Questions You Can Ask'}
            </h2>
            <p className={`text-xl text-gray-600 max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
              {isRTL 
                ? 'بعد رفع درسك، اسأل هدايا عن تطبيق إطار CEFR والتعلم القائم على اللعب الموجه'
                : 'After uploading your lesson, ask HedAia about CEFR framework application and guided play integration'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {exampleQuestions.map((question, index) => (
              <div
                key={index}
                className={`group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-blue-200 ${isRTL ? 'text-right font-arabic' : ''}`}
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-gray-700 leading-relaxed flex-1">
                    {question}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/dashboard"
              className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl ${isRTL ? 'font-arabic' : ''}`}
            >
              <Upload className="w-6 h-6" />
              {isRTL ? 'جرب هدايا الآن' : 'Try HedAia Now'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-xl font-bold ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'هدايا' : 'HedAia'}
              </h3>
            </div>
            <p className={`text-gray-400 ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
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