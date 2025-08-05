'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useAuth } from '@/hooks/useAuth'
import LanguageToggle from '@/components/ui/LanguageToggle'
import { BookOpen, User, LogOut } from 'lucide-react'

export default function Header() {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { user, signOut } = useAuth()
  const isRTL = router.locale === 'ar'

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-primary-600" />
              <span className={`text-xl font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>
                {t('appName')}
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className={`text-gray-700 hover:text-primary-600 transition-colors ${
                    router.pathname === '/dashboard' ? 'text-primary-600 font-medium' : ''
                  }`}
                >
                  {t('navigation.dashboard')}
                </Link>
                <Link
                  href="/lesson-plans"
                  className={`text-gray-700 hover:text-primary-600 transition-colors ${
                    router.pathname === '/lesson-plans' ? 'text-primary-600 font-medium' : ''
                  }`}
                >
                  {t('navigation.lessonPlans')}
                </Link>
              </>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <LanguageToggle />
            
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline truncate max-w-32">
                    {user.email}
                  </span>
                </div>
                <button
                  onClick={signOut}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                  title={t('auth.signOut')}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('auth.signOut')}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {t('auth.signIn')}
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 text-sm text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
                >
                  {t('auth.signUp')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 