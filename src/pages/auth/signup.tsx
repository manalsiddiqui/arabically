import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import { Mail, Lock, User, UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SignUp() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const isRTL = router.locale === 'ar'
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState<string[]>([])

  const validateForm = () => {
    const newErrors: string[] = []

    if (formData.password.length < 6) {
      newErrors.push('Password must be at least 6 characters long')
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.push('Passwords do not match')
    }

    if (!formData.fullName.trim()) {
      newErrors.push('Full name is required')
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setErrors([])

    try {
      // Create Supabase client inside the function
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      })

      if (error) {
        throw error
      }

      toast.success(
        isRTL 
          ? 'تم إنشاء الحساب بنجاح! تحقق من بريدك الإلكتروني'
          : 'Account created successfully! Check your email'
      )

      // Redirect to dashboard or sign in
      router.push('/auth/signin')
    } catch (error: any) {
      console.error('Sign up error:', error)
      setErrors([error.message || 'Failed to create account'])
      toast.error(error.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-6">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h2 className={`text-3xl font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
            {isRTL ? 'إنشاء حساب جديد' : 'Create Account'}
          </h2>
          <p className={`mt-2 text-sm text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
            {isRTL ? 'انضم إلى هدايا وابدأ رحلتك في تدريس العربية' : 'Join HedAia and start your Arabic teaching journey'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {isRTL ? 'يرجى تصحيح الأخطاء التالية:' : 'Please fix the following errors:'}
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc list-inside space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className={`block text-sm font-medium text-gray-700 ${isRTL ? 'font-arabic text-right' : ''}`}>
                {isRTL ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <div className="mt-1 relative">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm ${isRTL ? 'font-arabic text-right pr-10 pl-3' : ''}`}
                  placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                <User className={`absolute top-3 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={`block text-sm font-medium text-gray-700 ${isRTL ? 'font-arabic text-right' : ''}`}>
                {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm ${isRTL ? 'font-arabic text-right pr-10 pl-3' : ''}`}
                  placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                <Mail className={`absolute top-3 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium text-gray-700 ${isRTL ? 'font-arabic text-right' : ''}`}>
                {isRTL ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm ${isRTL ? 'font-arabic text-right pr-10 pl-3' : ''}`}
                  placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                <Lock className={`absolute top-3 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium text-gray-700 ${isRTL ? 'font-arabic text-right' : ''}`}>
                {isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm ${isRTL ? 'font-arabic text-right pr-10 pl-3' : ''}`}
                  placeholder={isRTL ? 'أعد إدخال كلمة المرور' : 'Re-enter your password'}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                <Lock className={`absolute top-3 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${isRTL ? 'font-arabic' : ''}`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  {isRTL ? 'جاري الإنشاء...' : 'Creating Account...'}
                </div>
              ) : (
                <div className="flex items-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  {isRTL ? 'إنشاء الحساب' : 'Create Account'}
                </div>
              )}
            </button>
          </div>

          <div className="text-center">
            <p className={`text-sm text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
              <Link 
                href="/auth/signin" 
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                {isRTL ? 'تسجيل الدخول' : 'Sign in'}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
} 