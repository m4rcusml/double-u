import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { useAuthStore } from '@/stores/useAuthStore'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'sonner'

const createPasswordSchema = z.object({
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas devem ser iguais',
  path: ['confirmPassword'],
})

type LoginFormValues = z.infer<typeof createPasswordSchema>

export function CreatePasswordForm() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(createPasswordSchema),
  })

  async function onSubmit(data: LoginFormValues) {
    const user = useAuthStore.getState().user
    if (!user) {
      toast('Usuário não autenticado.')
      return
    }

    const { error } = await supabase.auth.updateUser({
      password: data.password,
    })

    if (error) {
      toast(error.message)
      return
    }

    toast('Senha criada com sucesso!')
    navigate('/auth/login')
  }

  return (
    <Card className='bg-background'>
      <CardHeader>
        <CardTitle>Crie uma senha</CardTitle>
        <CardDescription>
          Crie uma senha para acessar sua conta
        </CardDescription>
      </CardHeader>

      <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
        <CardContent className='space-y-3'>
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
          <div>
            <Input
              id='confirmPassword'
              type='password'
              placeholder='Confirmar senha'
              {...register('confirmPassword')}
              aria-invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <span className='text-xs text-red-500'>{errors.confirmPassword.message}</span>
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