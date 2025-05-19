import { Link } from 'react-router'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'

export function LoginForm() {
  return (
    <Card className='bg-background'>
      <CardHeader>
        <CardTitle>Bem vindo de volta</CardTitle>
        <CardDescription>
          Acesse sua conta para continuar
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <Input id="email" type="email" placeholder="Email" />
        <Input id="password" type="password" placeholder="Senha" />
      </CardContent>

      <CardFooter className='flex flex-col items-stretch gap-1'>
        <Button>Entrar</Button>
        <Button variant='outline'>Entrar com Google</Button>
        <div className='flex self-center items-center justify-center gap-1 text-sm'>
          <span className='text-muted-foreground'>Primeira acesso à plataforma?</span>
          <Link to='/auth/first-access'>Criar senha</Link>
        </div>
      </CardFooter>
    </Card>
  )
}