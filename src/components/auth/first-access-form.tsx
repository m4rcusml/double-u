import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Link, useNavigate } from 'react-router'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { supabase } from '@/lib/supabaseClient'

type FormSchema = z.infer<typeof schema>

const schema = z.object({
  email: z.string().email({ message: 'Email inválido' }).nonempty('Este campo é obrigatório')
});

export function FirstAccessForm() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  async function submit(data: FormSchema) {
    try {
      const { email } = data
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: undefined, // Prevents magic link, only sends OTP code
        }
      })
      if (error) {
        alert(error.message)
        return
      }
      navigate('verification', { state: { email } })
    } catch (err: any) {
      alert('Erro ao enviar o código de verificação.')
    }
  }

  return (
    <Card className='bg-background'>
      <CardHeader>
        <CardTitle>Primeiro acesso</CardTitle>
        <CardDescription>
          Insira seu email e clique em continuar para receber um código de verificação
        </CardDescription>
      </CardHeader>

      <CardContent className='space-y-2'>
        <Input id='email' type='email' placeholder='Email' {...register('email')} />
        <span className='text-sm text-red-700'>{errors.email?.message}</span>
      </CardContent>

      <CardFooter className='flex flex-col items-stretch gap-1'>
        <Button onClick={handleSubmit(submit)}>Continuar</Button>
        <Button variant='outline'>Continuar com Google</Button>

        <div className='flex self-center items-center justify-center gap-1 text-xs'>
          <span className='text-muted-foreground'>Já possui uma conta?</span>
          <Link to='/auth/login'>Entrar</Link>
        </div>
      </CardFooter>
    </Card>
  )
}