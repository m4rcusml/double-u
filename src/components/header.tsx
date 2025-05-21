import Logo from '@/assets/logo.svg'
import { Button } from './ui/button'
import { Bell, Menu, Moon, Sun } from 'lucide-react'
import { useSidebar } from './ui/sidebar'
import { useLocation, useNavigate } from 'react-router'

type Props = {
  useDarkMode?: boolean
}

export function Header({ useDarkMode = false }: Props) {
  const location = useLocation()
  const isLogged = !location.pathname.includes('not-logged')
  const navigate = useNavigate()
  const { toggleSidebar } = useSidebar()

  const isDarkMode = document.documentElement.classList.contains('dark') || useDarkMode
  const iconColorClass = isDarkMode ? 'text-white' : 'text-black'
  const logoStyle = isDarkMode ? '' : 'invert'
  

  // Apply glassmorphism style when user is not logged in
  const headerClass = isLogged
    ? `bg-muted w-full px-4 py-4 flex items-center justify-between shadow-sm ${isDarkMode ? 'dark' : ''}`
    : `w-full px-4 py-4 flex items-center justify-between ${isDarkMode ? 'dark' : ''} backdrop-blur-sm bg-background/70 border-b border-border/40`

  function toggleTheme() {
    document.documentElement.classList.toggle('dark')
  }

  return (
    <header className={headerClass}>
      <div className='flex items-center gap-3'>
        {isLogged ? (
          <button className='cursor-pointer' onClick={toggleSidebar}>
            <Menu className={`w-6 h-6 ${iconColorClass}`} />
          </button>
        ) : (
          <Button variant='outline' onClick={() => navigate('/auth')} className='cursor-pointer text-foreground'>
            ENTRAR
          </Button>
        )}
      </div>

      <div className='flex items-center gap-3'>
        <button className='cursor-pointer' onClick={toggleTheme}>
          {isDarkMode ? (
            <Sun className={`w-6 h-6 ${iconColorClass}`} />
          ) : (
            <Moon className={`w-6 h-6 ${iconColorClass}`} />
          )}
        </button>

        <button >
          <Bell className={`w-6 h-6 ${iconColorClass}`} />
        </button>

        <div className='hidden sm:block h-6 border-l border-border mx-2' />

        <img
          src={Logo}
          alt='logo'
          className={`w-10 ${logoStyle}`}
        />
      </div>
    </header>
  )
}