import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Database } from '@/db/types'

export const AuthService = {
  getServerClient: async () => {
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    return createClient<Database>(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: `Bearer ${cookieStore.get('sb-auth-token')?.value}` } },
    })
  },
  getCurrentUser: async () => {
    const supabase = await AuthService.getServerClient()
    const { data: { session } } = await supabase.auth.getSession()
    return session?.user ?? null
  },
  requireAuth: async () => {
    const user = await AuthService.getCurrentUser()
    if (!user) redirect('/login')
    return user
  },
  requireAdmin: async () => {
    const user = await AuthService.requireAuth()
    const role = user.user_metadata?.role || 'user'
    if (role !== 'admin') throw new Error('Unauthorized: Admin access required')
    return user
  },
  signUp: async (email: string, password: string, metadata?: { full_name?: string; phone?: string }) => {
    const supabase = await AuthService.getServerClient()
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: metadata } })
    if (error) throw error
    return data
  },
  signIn: async (email: string, password: string) => {
    const supabase = await AuthService.getServerClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },
  signOut: async () => {
    const supabase = await AuthService.getServerClient()
    await supabase.auth.signOut()
  },
}
