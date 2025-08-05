'use client'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Globe } from 'lucide-react'

export default function LanguageToggle() {
  const router = useRouter()
  const { t } = useTranslation('common')
  
  const toggleLanguage = () => {
    const newLocale = router.locale === 'en' ? 'ar' : 'en'
    router.push(router.asPath, router.asPath, { locale: newLocale })
    
    // Update document direction
    if (typeof document !== 'undefined') {
      document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = newLocale
    }
  }
  
  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      title={t('navigation.language') || 'Language'}
    >
      <Globe className="w-4 h-4" />
      <span className="hidden sm:inline">
        {router.locale === 'en' ? 'العربية' : 'English'}
      </span>
    </button>
  )
} 