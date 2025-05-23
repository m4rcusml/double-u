import Logo from '@/assets/logo.svg'
import { Button } from './ui/button'
import { Bell, Menu } from 'lucide-react'
import { useSidebar } from './ui/sidebar'
import { useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'

type Props = {
  useDarkMode?: boolean
}

export function Header({ useDarkMode = false }: Props) {
  const location = useLocation()
  const isLogged = !location.pathname.includes('not-logged')
  const navigate = useNavigate()
  const { toggleSidebar } = useSidebar()
  const [isScrolled, setIsScrolled] = useState(false)

  const isDarkMode = document.documentElement.classList.contains('dark') || useDarkMode
  const iconColorClass = isDarkMode ? 'text-white' : 'text-black'
  const logoStyle = isDarkMode ? '' : 'invert'

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50) // Muda quando scroll passar de 50px
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Apply glassmorphism style when user is not logged in
  const headerClass = isLogged
    ? `bg-muted w-full px-4 py-4 flex items-center justify-between shadow-sm ${isDarkMode ? 'dark' : ''}`
    : `${!isScrolled ? 'bg-black' : ''} transition w-full px-4 py-4 flex items-center justify-between ${isDarkMode ? 'dark' : ''} backdrop-blur-sm bg-background/85 border-b border-border/40`

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