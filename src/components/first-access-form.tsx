import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Link } from 'react-router'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from './ui/button'
import { Input } from './ui/input'

type FormSchema = z.infer<typeof schema>

const schema = z.object({
  email: z.string().email({ message: 'Email inválido' }).nonempty('Este campo é obrigatório')
});

export function FirstAccessForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  function submit(data: FormSchema) {
    alert(JSON.stringify(data))
  }

  return (
    <Card className='bg-background'>
      <CardHeader>
        <CardTitle>Primeiro acesso</CardTitle>
        <CardDescription>
          Preencha os dados abaixo para criar sua senha
        </CardDescription>
      </CardHeader>

      <CardContent className='space-y-2'>
        <Input id='email' type='email' placeholder='Email' {...register('email')} />
        <span className='text-sm text-red-700'>{errors.email?.message}</span>
      </CardContent>

      <CardFooter className='flex flex-col items-stretch gap-1'>
        <Button onClick={handleSubmit(submit)}>Continuar</Button>
        <Button variant='outline'>Continuar com Google</Button>

        <div className='flex self-center items-center justify-center gap-1 text-sm'>
          <span className='text-muted-foreground'>Já possui uma conta?</span>
          <Link to='/auth/login'>Entrar</Link>
        </div>
      </CardFooter>
    </Card>
  )
}