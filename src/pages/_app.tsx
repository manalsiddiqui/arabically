import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from '@/components/ErrorBoundary'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </ErrorBoundary>
  )
}

export default appWithTranslation(MyApp) 