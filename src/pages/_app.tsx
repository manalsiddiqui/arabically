import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { createContext, useEffect, useState } from 'react'
import { useAuthProvider } from '@/hooks/useAuth'
import { Toaster } from 'react-hot-toast'
import '@/styles/globals.css'

// Create Auth Context
export const AuthContext = createContext<ReturnType<typeof useAuthProvider> | undefined>(undefined)

function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthProvider()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

// Hydration-safe wrapper
function ClientOnlyWrapper({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <>{children}</>
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClientOnlyWrapper>
        <AuthProvider>
          <Component {...pageProps} />
          <Toaster position="top-right" />
        </AuthProvider>
      </ClientOnlyWrapper>
    </>
  )
}

export default appWithTranslation(MyApp) 