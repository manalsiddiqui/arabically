'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'

// Simple Supabase client setup - only on client side
const getSupabaseClient = () => {
  if (typeof window === 'undefined') return null
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  
  return createClient(supabaseUrl, supabaseAnonKey)
}

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function useAuthProvider() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const supabase = getSupabaseClient()
    if (!supabase) return

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Error getting session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        if (event === 'SIGNED_IN') {
          router.push('/dashboard')
        } else if (event === 'SIGNED_OUT') {
          router.push('/')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router, mounted])

  const signIn = async (email: string, password: string) => {
    const supabase = getSupabaseClient()
    if (!supabase) throw new Error('Supabase not available')

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      
      toast.success('Welcome back!')
    } catch (error) {
      console.error('Sign in error:', error)
      toast.error(error instanceof Error ? error.message : 'Sign in failed')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const supabase = getSupabaseClient()
    if (!supabase) throw new Error('Supabase not available')

    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) throw error
      
      toast.success('Account created! Please check your email to verify your account.')
    } catch (error) {
      console.error('Sign up error:', error)
      toast.error(error instanceof Error ? error.message : 'Sign up failed')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    const supabase = getSupabaseClient()
    if (!supabase) throw new Error('Supabase not available')

    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()

      if (error) throw error
      
      toast.success('Signed out successfully')
    } catch (error) {
      console.error('Sign out error:', error)
      toast.error('Error signing out')
    } finally {
      setLoading(false)
    }
  }

  // Don't render anything until mounted on client
  if (!mounted) {
    return {
      user: null,
      session: null,
      loading: true,
      signIn: async () => {},
      signUp: async () => {},
      signOut: async () => {},
    }
  }

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  }
} 