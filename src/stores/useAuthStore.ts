import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'

type AuthStore = {
  user: User | null
  session: Session | null
  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
    }),
    {
      name: 'auth-storage', // nome único para o storage
    }
  )
)

// Verificar sessão existente ao inicializar
supabase.auth.getSession().then(({ data: { session } }) => {
  if (session) {
    useAuthStore.getState().setUser(session.user)
    useAuthStore.getState().setSession(session)
  }
})

// Listen to auth changes
supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.getState().setUser(session?.user ?? null)
  useAuthStore.getState().setSession(session)
})
