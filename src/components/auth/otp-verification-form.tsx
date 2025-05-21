import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Link, useNavigate } from 'react-router'
import { Button } from '../ui/button'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp'
import { supabase } from '../../lib/supabaseClient' // adjust path as needed
import { useLocation } from 'react-router'
import { toast } from 'sonner'

export function OtpVerificationForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit() {
    setLoading(true)
    setError('')
    if (!email) {
      setError('Email não encontrado.')
      setLoading(false)
      return
    }
    // Try to sign up with the OTP (for emails that don't have an account)
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    })
    if (error) {
      setError(error.message)
    } else {
      // OTP verified and account created, proceed to next step
      toast('Conta criada e OTP verificado com sucesso!')
      navigate('/auth/first-access', { state: { email } })
    }
    setLoading(false)
  }

  return (
    <Card className='bg-background'>
      <CardHeader>
        <CardTitle>Primeiro acesso</CardTitle>
        <CardDescription>
          Insira o código de verificação enviado para o seu email
        </CardDescription>
      </CardHeader>

      <CardContent className='space-y-2 mx-auto'>
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <span className='text-sm text-red-700'>{error}</span>
      </CardContent>

      <CardFooter className='flex flex-col items-stretch gap-1'>
        <Button onClick={submit} disabled={loading || otp.length !== 6}>
          {loading ? 'Verificando...' : 'Continuar'}
        </Button>
        <Button variant='outline'>Continuar com Google</Button>

        <div className='flex self-center items-center justify-center gap-1 text-xs'>
          <span className='text-muted-foreground'>Já possui uma conta?</span>
          <Link to='/auth/login'>Entrar</Link>
        </div>
      </CardFooter>
    </Card>
  )
}