// src/pages/AuthPage.tsx
import { useAuthStore } from '@/stores/useAuthStore'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { AuthForm } from '../components//auth-form'

export default function AuthPage() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  return <AuthForm />
}
