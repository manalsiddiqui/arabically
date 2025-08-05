import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { 
  MessageCircle, 
  Send, 
  Upload,
  Sparkles,
  BookOpen,
  Users,
  Target
} from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export default function ChatPage() {
  const router = useRouter()
  const { locale } = router
  const isRTL = locale === 'ar'
  const { t } = useTranslation('common')

  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage = inputValue.trim()
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: userMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputValue('')
    setIsLoading(true)
    setIsTyping(true)

    try {
      // Use the comprehensive RAG endpoint that searches ALL lesson plans
      const response = await fetch('/api/chat/comprehensive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage, 
          chatHistory: messages.slice(-5),
          language: isRTL ? 'ar' : 'en'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'ai',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: isRTL 
          ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.'
          : 'Sorry, there was an error. Please try again.',
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const exampleQuestions = isRTL ? [
    'كيف يمكنني جعل درس الحروف أكثر تفاعلاً؟',
    'ما هي أفضل طريقة لتعليم الأطفال الأرقام؟',
    'اقترح أنشطة لدرس المفردات',
    'كيف أقيم فهم الطلاب للدرس؟'
  ] : [
    'How can I make letter lessons more interactive?',
    'What\'s the best way to teach numbers to children?',
    'Suggest activities for vocabulary lessons',
    'How do I assess student understanding?'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      {/* Header */}
      <div className="bg-white border-b border-secondary-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-desert rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold text-neutral-900 ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL ? 'هدايا - مساعد المعلم الذكي' : 'HedAia - AI Teaching Assistant'}
                </h1>
                <p className={`text-sm text-neutral-600 ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL ? 'مدرب على جميع خطط دروس أرابيكالي' : 'Trained on all Arabically lesson plans'}
                </p>
              </div>
            </div>
            
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors ${isRTL ? 'font-arabic' : ''}`}
            >
              <Upload className="w-4 h-4" />
              {isRTL ? 'إدارة الدروس' : 'Manage Lessons'}
            </Link>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-secondary-200 h-[600px] flex flex-col">
          
          {/* Welcome Message */}
          {messages.length === 0 && (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-2xl">
                <div className="w-16 h-16 bg-gradient-desert rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h2 className={`text-2xl font-bold text-neutral-900 mb-4 ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL ? 'مرحباً بك في هدايا!' : 'Welcome to HedAia!'}
                </h2>
                <p className={`text-neutral-600 mb-8 leading-relaxed ${isRTL ? 'font-arabic' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                  {isRTL 
                    ? 'أنا مساعدك الذكي المدرب على جميع خطط دروس أرابيكالي. اسألني عن أي شيء متعلق بتدريس العربية وسأقدم لك نصائح مبنية على خبرة المعلمين.'
                    : 'I\'m your AI assistant trained on all Arabically lesson plans. Ask me anything about Arabic teaching and I\'ll provide advice based on expert teacher knowledge.'
                  }
                </p>
                
                {/* Example Questions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {exampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(question)}
                      className={`p-3 text-left bg-secondary-50 hover:bg-primary-50 border border-secondary-200 hover:border-primary-300 rounded-lg transition-all ${isRTL ? 'font-arabic text-right' : ''}`}
                    >
                      <div className="flex items-start gap-2">
                        <MessageCircle className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-neutral-700">{question}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className={`font-semibold text-neutral-900 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                      {isRTL ? 'جميع الدروس' : 'All Lessons'}
                    </h3>
                    <p className={`text-xs text-neutral-600 ${isRTL ? 'font-arabic' : ''}`}>
                      {isRTL ? 'مدرب على كامل مكتبة دروس أرابيكالي' : 'Trained on entire Arabically lesson library'}
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-accent-600" />
                    </div>
                    <h3 className={`font-semibold text-neutral-900 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                      {isRTL ? 'خبرة المعلمين' : 'Teacher Expertise'}
                    </h3>
                    <p className={`text-xs text-neutral-600 ${isRTL ? 'font-arabic' : ''}`}>
                      {isRTL ? 'مبني على خبرة معلمين متخصصين' : 'Built on expert teacher knowledge'}
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="w-12 h-12 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-earth-600" />
                    </div>
                    <h3 className={`font-semibold text-neutral-900 mb-2 ${isRTL ? 'font-arabic' : ''}`}>
                      {isRTL ? 'نصائح عملية' : 'Practical Tips'}
                    </h3>
                    <p className={`text-xs text-neutral-600 ${isRTL ? 'font-arabic' : ''}`}>
                      {isRTL ? 'اقتراحات جاهزة للتطبيق في الصف' : 'Ready-to-use classroom suggestions'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.length > 0 && (
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-desert text-white'
                        : 'bg-secondary-100 text-neutral-800'
                    } ${isRTL ? 'font-arabic' : ''}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary-100 p-4 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input Form */}
          <div className="border-t border-secondary-200 p-4">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isRTL ? 'اكتب سؤالك هنا...' : 'Type your question here...'}
                className={`flex-1 px-4 py-3 border border-secondary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none ${isRTL ? 'font-arabic text-right' : ''}`}
                dir={isRTL ? 'rtl' : 'ltr'}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="px-6 py-3 bg-gradient-desert text-white rounded-xl hover:from-primary-700 hover:to-earth-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                {isRTL ? 'إرسال' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
} 