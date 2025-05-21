import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { useAuthStore } from '@/stores/useAuthStore'
import { supabase } from '@/lib/supabaseClient'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const { setUser, setSession } = useAuthStore()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginFormValues) {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        console.error('Login failed:', error.message)
        return
      }

      setUser(authData.user)
      setSession(authData.session)
      // Optionally redirect or show success message here
    } catch (error: any) {
      console.error('Login failed:', error.message)
    }
  }

  return (
    <Card className='bg-background'>
      <CardHeader>
        <CardTitle>Bem vindo de volta</CardTitle>
        <CardDescription>
          Acesse sua conta para continuar
        </CardDescription>
      </CardHeader>

      <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
        <CardContent className='space-y-3'>
          <div>
            <Input
              id='email'
              type='email'
              placeholder='Email'
              {...register('email')}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <span className='text-xs text-red-500'>{errors.email.message}</span>
            )}
          </div>
          <div>
            <Input
              id='password'
              type='password'
              placeholder='Senha'
              {...register('password')}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <span className='text-xs text-red-500'>{errors.password.message}</span>
            )}
          </div>
        </CardContent>

        <CardFooter className='flex flex-col items-stretch gap-1'>
          <Button type='submit' disabled={isSubmitting}>Entrar</Button>
          <Button variant='outline' type='button'>Entrar com Google</Button>
          <div className='flex self-center items-center justify-center gap-1 text-xs'>
            <span className='text-muted-foreground'>Primeira acesso à plataforma?</span>
            <Link to='/auth/first-access'>Criar senha</Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}