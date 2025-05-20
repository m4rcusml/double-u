import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Outlet, useLocation, useNavigate } from 'react-router'
import Logo from '@/assets/logo.svg'

export function AuthLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  return <main className='h-full flex flex-col justify-center items-center gap-12'>
    <img src={Logo} className='invert' alt='logo' />

    <Tabs defaultValue={location.pathname === '/auth' ? '/auth/login' : location.pathname} className='min-w-[320px] max-w-lg w-full px-2'>
      <TabsList className='grid w-full grid-cols-2 bg-muted'>
        <TabsTrigger value='/auth/login' onClick={() => navigate('login')}>Entrar</TabsTrigger>
        <TabsTrigger value='/auth/first-access' onClick={() => navigate('first-access')}>Primeiro acesso</TabsTrigger>
      </TabsList>

      <Outlet />
    </Tabs>
  </main>
}