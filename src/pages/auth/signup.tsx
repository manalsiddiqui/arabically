import { useState } from 'react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import { Mail, Lock, User, UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'

// Simple Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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
    
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      })

      if (error) throw error
      
      toast.success('Account created! Please check your email to verify your account.')
      router.push('/auth/signin')
    } catch (error) {
      console.error('Sign up error:', error)
      toast.error(error instanceof Error ? error.message : 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([])
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className={`text-3xl font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
            {t('auth.createAccount')}
          </h2>
          <p className={`mt-2 text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
            {t('auth.signUp')}
          </p>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                {t('auth.fullName')}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 ${isRTL ? 'font-arabic text-right' : ''}`}
                  placeholder={t('auth.fullName')}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                {t('auth.email')}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 ${isRTL ? 'font-arabic text-right' : ''}`}
                  placeholder={t('auth.email')}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                {t('auth.password')}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 ${isRTL ? 'font-arabic text-right' : ''}`}
                  placeholder={t('auth.password')}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium text-gray-700 mb-1 ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 ${isRTL ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 ${isRTL ? 'font-arabic text-right' : ''}`}
                  placeholder={isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${isRTL ? 'font-arabic' : ''}`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <UserPlus className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
              </span>
              {loading ? 'Creating account...' : t('auth.signUp')}
            </button>
          </div>

          <div className="text-center">
            <p className={`text-sm text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
              {t('auth.alreadyHaveAccount')}{' '}
              <Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">
                {t('auth.signIn')}
              </Link>
            </p>
          </div>
        </form>
      </div>
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