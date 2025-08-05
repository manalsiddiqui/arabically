import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import { Mail, Lock, LogIn } from 'lucide-react'

export default function SignIn() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { signIn, loading } = useAuth()
  const isRTL = router.locale === 'ar'

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(formData.email, formData.password)
    } catch (error) {
      // Error is handled by the hook
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className={`text-3xl font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
            {t('auth.welcome')}
          </h2>
          <p className={`mt-2 text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
            {t('auth.signIn')}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
                  className={`appearance-none relative block w-full ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 ${isRTL ? 'font-arabic text-right' : ''}`}
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
                  className={`appearance-none relative block w-full ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 ${isRTL ? 'font-arabic text-right' : ''}`}
                  placeholder={t('auth.password')}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${isRTL ? 'font-arabic' : ''}`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-primary-500 group-hover:text-primary-400" />
              </span>
              {loading ? t('common.loading') : t('auth.signIn')}
            </button>
          </div>

          <div className="text-center">
            <p className={`text-sm text-gray-600 ${isRTL ? 'font-arabic' : ''}`}>
              {t('auth.dontHaveAccount')}{' '}
              <Link href="/auth/signup" className="font-medium text-primary-600 hover:text-primary-500">
                {t('auth.signUp')}
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