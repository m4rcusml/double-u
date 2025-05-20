import Logo from '@/assets/logo.svg'
import { Button } from './ui/button'
import { Bell, Menu, Moon, Sun } from 'lucide-react'
import { useSidebar } from './ui/sidebar'
import { useLocation, useNavigate } from 'react-router'

type Props = {
  useDarkMode?: boolean
}

export function Header({ useDarkMode = false }: Props) {
  const isLogged = !useLocation().pathname.includes('not-logged')
  const navigate = useNavigate()
  const { toggleSidebar } = useSidebar()

  return (
    <header className={`bg-muted w-full p-4 flex items-center gap-3 ${useDarkMode ? 'dark' : ''}`}>
      {isLogged ? (
        <Button size='icon' variant='ghost' className='cursor-pointer' onClick={toggleSidebar}>
          <Menu color={useDarkMode ? 'white' : 'black'} style={{ width: 28, height: 28 }} />
        </Button>
      ) : (
        <Button variant='outline' className='cursor-pointer text-foreground' onClick={() => navigate('/auth')}>
          ENTRAR
        </Button>
      )}

      <div className="flex-1" />

      <Button size='icon' variant='ghost' className='cursor-pointer'>
        {useDarkMode ? (
          <Sun color={useDarkMode ? 'white' : 'black'} style={{ width: 28, height: 28 }} />
        ) : (
          <Moon color={useDarkMode ? 'white' : 'black'} style={{ width: 28, height: 28 }} />
        )}
      </Button>

      <Button size='icon' variant='ghost' className='cursor-pointer'>
        <Bell color={useDarkMode ? 'white' : 'black'} style={{ width: 28, height: 28 }} />
      </Button>

      <div className='bg-border self-stretch w-0.25 min-h-10' />

      <img src={Logo} alt='logo' className={`${useDarkMode ? '' : 'invert'} w-10`} />
    </header>
  )
}