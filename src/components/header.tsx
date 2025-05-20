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

  const iconColorClass = useDarkMode ? 'text-white' : 'text-black'
  const logoStyle = useDarkMode ? '' : 'invert'
  
  // Apply glassmorphism style when user is not logged in
  const headerClass = isLogged 
    ? `bg-muted w-full px-4 py-3 flex items-center justify-between shadow-sm ${useDarkMode ? 'dark' : ''}` 
    : `w-full px-4 py-3 flex items-center justify-between ${useDarkMode ? 'dark' : ''} backdrop-blur-sm bg-background/70 border-b border-border/40`

  return (
    <header className={`bg-muted w-full p-4 flex items-center gap-3 ${useDarkMode ? 'dark' : ''}`}>
      {isLogged ? (
        <Button size='icon' variant='ghost' className='cursor-pointer hover:bg-background' onClick={toggleSidebar}>
          <Menu color={useDarkMode ? 'white' : 'black'} style={{ width: 28, height: 28 }} />
        </Button>
      ) : (
        <Button variant='outline' className='cursor-pointer text-foreground' onClick={() => navigate('/auth')}>
          ENTRAR
        </Button>
      )}
    <header className={headerClass}>
      <div className="flex items-center gap-3">
        {isLogged ? (
          <Button size="icon" variant="ghost" onClick={toggleSidebar}>
            <Menu className={`w-6 h-6 ${iconColorClass}`} />
          </Button>
        ) : (
          <Button variant="outline" onClick={() => navigate('/auth')} className="text-foreground">
            ENTRAR
          </Button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button size="icon" variant="ghost">
          {useDarkMode ? (
            <Sun className={`w-6 h-6 ${iconColorClass}`} />
          ) : (
            <Moon className={`w-6 h-6 ${iconColorClass}`} />
          )}
        </Button>

        <Button size="icon" variant="ghost">
          <Bell className={`w-6 h-6 ${iconColorClass}`} />
        </Button>

        <div className="hidden sm:block h-6 border-l border-border mx-2" />

        <img
          src={Logo}
          alt="logo"
          className={`w-10 ${logoStyle}`}
        />
      </div>
    </header>
  )
}