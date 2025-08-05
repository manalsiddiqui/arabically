'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from './Header'
import { Toaster } from 'react-hot-toast'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
}

export default function Layout({ children, title, description }: LayoutProps) {
  const router = useRouter()
  const isRTL = router.locale === 'ar'
  
  useEffect(() => {
    // Set document direction and language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = router.locale || 'en'
    
    // Update body font class
    document.body.className = isRTL 
      ? 'font-arabic' 
      : 'font-en'
  }, [isRTL, router.locale])

  const pageTitle = title ? `${title} | Arabically` : 'Arabically - AI Arabic Teaching Assistant'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {description && <meta name="description" content={description} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Arabic font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        {/* English font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      
      <div className={`min-h-screen bg-gray-50 ${isRTL ? 'font-arabic' : 'font-en'}`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Toaster 
          position={isRTL ? 'top-left' : 'top-right'}
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: isRTL ? 'Noto Sans Arabic' : 'Inter',
            },
          }} 
        />
      </div>
    </>
  )
} 