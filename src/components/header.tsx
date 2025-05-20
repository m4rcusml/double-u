import Logo from '@/assets/logo.svg'
import { Button } from './ui/button'
import { Bell, Hamburger, Menu, Moon } from 'lucide-react'
import { useSidebar } from './ui/sidebar'

type Props = {}

export function Header({ }: Props) {
  const { toggleSidebar} = useSidebar()
  
  return (
    <header className='bg-muted w-full p-4 flex items-center gap-3'>
      <Button size='icon' variant='ghost' className='cursor-pointer' onClick={toggleSidebar}>
        <Menu style={{ width: 32, height: 32 }} />
      </Button>

      <div className="flex-1" />
      
      <Button size='icon' variant='ghost' className='cursor-pointer'>
        <Moon style={{ width: 32, height: 32 }} />
      </Button>
      <Button size='icon' variant='ghost' className='cursor-pointer'>
        <Bell style={{ width: 32, height: 32 }} />
      </Button>

      <div className='bg-border self-stretch w-0.5 min-h-10' />
      
      <img src={Logo} alt='logo' className='invert w-12' />
    </header>
  )
}