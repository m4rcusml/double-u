import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
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
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage), // explicitly use localStorage
      partialize: (state) => ({
        user: state.user,
        session: state.session
      }), // only persist these fields
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
