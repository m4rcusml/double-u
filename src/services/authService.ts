import { supabase } from '@/lib/supabaseClient'

export const verifyEmail = async (email: string) => {
  return await supabase.auth.verifyOtp({
    email: email,
    token: '123456',
    type: 'email',
  })
}

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({ email, password })
}

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password })
}

export const signOut = async () => {
  return await supabase.auth.signOut()
}

export const getSession = async () => {
  return await supabase.auth.getSession()
}
