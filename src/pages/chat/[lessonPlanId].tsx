import { useState, useEffect, useRef } from 'react'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { Send, Bot, User, ArrowLeft, Lightbulb, BookOpen, Sparkles, FileText, Download } from 'lucide-react'
import Link from 'next/link'

type Message = {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

type LessonPlan = {
  id: string
  title: string
  filename: string
  content?: string
  age_group?: string
  subject?: string
  language: string
}

export default function LessonChatPage() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { lessonPlanId } = router.query
  const isRTL = router.locale === 'ar'

  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isLoadingLesson, setIsLoadingLesson] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load lesson plan data
  useEffect(() => {
    if (lessonPlanId) {
      // Mock lesson plan data - replace with actual Supabase query
      setTimeout(() => {
        setLessonPlan({
          id: lessonPlanId as string,
          title: isRTL ? 'درس الحروف الأبجدية' : 'Arabic Alphabet Lesson',
          filename: 'arabic-alphabet.pdf',
          content: isRTL 
            ? 'هذا درس تعليم الحروف العربية للأطفال من سن 5-7 سنوات. يتضمن الدرس تعليم الحروف الأبجدية العربية من الألف إلى الياء مع أمثلة وأنشطة تفاعلية.'
            : 'This is a lesson for teaching Arabic letters to children aged 5-7 years. The lesson includes teaching the Arabic alphabet from Alif to Ya with examples and interactive activities.',
          age_group: '5-7',
          subject: isRTL ? 'الحروف' : 'Letters',
          language: isRTL ? 'ar' : 'en'
        })
        setIsLoadingLesson(false)
      }, 1000)
    }
  }, [lessonPlanId, isRTL])

  // Add welcome message when lesson plan loads
  useEffect(() => {
    if (lessonPlan && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: isRTL
            ? `مرحباً! لقد حللت محتوى درس "${lessonPlan.title}". أستطيع أن أساعدك في تطوير هذا الدرس، اقتراح أنشطة مناسبة، وتقديم نصائح تعليمية مبنية على محتوى درسك المحدد. كيف يمكنني مساعدتك؟`
            : `Hello! I've analyzed the content of your lesson "${lessonPlan.title}". I can help you develop this lesson, suggest appropriate activities, and provide teaching tips based on your specific lesson content. How can I help you?`,
          timestamp: new Date(),
        },
      ])
    }
  }, [lessonPlan, isRTL])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentMessage.trim() || isLoading || !lessonPlan) return

    const userMessage = currentMessage.trim()
    setCurrentMessage('')
    setIsLoading(true)
    setIsTyping(true)

    // Add user message
    const userMsg: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMsg])

    try {
      const response = await fetch('/api/chat/lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          lessonPlanId: lessonPlan.id,
          lessonContent: lessonPlan.content,
          lessonTitle: lessonPlan.title,
          ageGroup: lessonPlan.age_group,
          subject: lessonPlan.subject,
          isRTL: isRTL,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const { response: aiResponse } = await response.json()

      // Add AI response
      const aiMsg: Message = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiMsg])
    } catch (error) {
      console.error('Chat error:', error)

      // Add error message
      const errorMsg: Message = {
        role: 'assistant',
        content: isRTL
          ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.'
          : 'Sorry, there was an error. Please try again.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const exampleQuestions = lessonPlan ? (isRTL ? [
    `كيف أُعدل درس "${lessonPlan.title}" للأطفال الأصغر سناً؟`,
    "ما الأنشطة التفاعلية المناسبة لهذا المحتوى؟",
    "كيف أقيم فهم الطلاب لهذا الدرس؟",
    "ما التحديات المتوقعة وكيف أتعامل معها؟"
  ] : [
    `How can I adapt "${lessonPlan.title}" for younger children?`,
    "What interactive activities work well with this content?",
    "How can I assess student understanding of this lesson?",
    "What challenges might I face and how can I address them?"
  ]) : []

  const handleExampleClick = (question: string) => {
    setCurrentMessage(question)
  }

  if (isLoadingLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`text-lg text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
            {isRTL ? 'جاري تحميل خطة الدرس...' : 'Loading lesson plan...'}
          </p>
        </div>
      </div>
    )
  }

  if (!lessonPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-12 h-12 text-red-600" />
          </div>
          <h1 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
            {isRTL ? 'خطة الدرس غير موجودة' : 'Lesson Plan Not Found'}
          </h1>
          <p className={`text-gray-600 mb-8 ${isRTL ? 'font-arabic' : ''}`}>
            {isRTL ? 'لم يتم العثور على خطة الدرس المطلوبة' : 'The requested lesson plan could not be found'}
          </p>
          <Link
            href="/dashboard"
            className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 ${isRTL ? 'font-arabic' : ''}`}
          >
            {isRTL ? 'العودة إلى خطط الدروس' : 'Back to Lesson Plans'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-4 py-4 sm:px-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center justify-center w-12 h-12 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className={`text-lg font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
                  {lessonPlan.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{lessonPlan.filename}</span>
                  {lessonPlan.age_group && (
                    <>
                      <span>•</span>
                      <span>{lessonPlan.age_group} {isRTL ? 'سنوات' : 'years'}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="w-5 h-5" />
            </button>
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
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-3xl rounded-2xl px-6 py-4 shadow-lg ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-white border border-gray-100 text-gray-800'
                  } ${isRTL ? 'font-arabic' : ''}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <div className="whitespace-pre-wrap break-words leading-relaxed">
                    {message.content}
                  </div>
                  <div className={`text-xs mt-3 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-lg">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4 justify-start animate-fadeIn">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-lg">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Example Questions */}
      {messages.length <= 1 && (
        <div className="bg-white/80 backdrop-blur-lg border-t border-gray-200/50 px-4 py-6 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-white" />
              </div>
              <span className={`text-lg font-semibold text-gray-800 ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'جرب أن تسأل عن درسك:' : 'Try asking about your lesson:'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {exampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(question)}
                  className={`group text-sm px-4 py-3 bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-indigo-50 border border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-200 text-left hover:shadow-md transform hover:-translate-y-1 ${isRTL ? 'font-arabic text-right' : ''}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <span className="text-blue-600 text-xs">💡</span>
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 leading-relaxed">
                      {question}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="bg-white/80 backdrop-blur-lg border-t border-gray-200/50 px-4 py-6 sm:px-6 sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder={isRTL ? `اسأل عن درس "${lessonPlan.title}"...` : `Ask about "${lessonPlan.title}"...`}
                disabled={isLoading}
                className={`w-full px-6 py-4 pr-12 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 bg-white shadow-lg text-lg placeholder-gray-400 transition-all duration-200 ${isRTL ? 'font-arabic text-right' : ''}`}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <button
              type="submit"
              disabled={!currentMessage.trim() || isLoading}
              className={`px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold ${isRTL ? 'font-arabic' : ''}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span className="hidden sm:inline">
                {isRTL ? 'إرسال' : 'Send'}
              </span>
            </button>
          </form>
          
          <div className="flex items-center justify-center mt-4 text-xs text-gray-500 gap-2">
            <Sparkles className="w-3 h-3" />
            <span className={isRTL ? 'font-arabic' : ''}>
              {isRTL 
                ? 'يحلل محتوى درسك المحدد • مدعوم بـ OpenAI GPT-3.5'
                : 'Analyzing your specific lesson content • Powered by OpenAI GPT-3.5'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
} 