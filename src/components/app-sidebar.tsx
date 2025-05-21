import {
  LayoutDashboard,
  Shapes,
  FileText,
  UsersRound,
  MessageCircleMore,
  Settings,
  Landmark,
  SidebarClose,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

import Logo from '@/assets/logo.svg'

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: 'dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Simulações',
    url: 'simulations',
    icon: Shapes,
  },
  {
    title: 'Minha jornada',
    url: 'my-journey',
    icon: UsersRound,
  },
  {
    title: 'Documentos',
    url: 'documents',
    icon: FileText,
  },
  {
    title: 'Imóveis',
    url: 'properties',
    icon: Landmark,
  },
  {
    title: 'Falar com consultor',
    url: 'chat',
    icon: MessageCircleMore,
  },
  {
    title: 'Configurações',
    url: 'settings',
    icon: Settings,
  },
]

export function AppSidebar() {
  const { toggleSidebar } = useSidebar()
  
  return (
    <Sidebar>
      <SidebarHeader className="px-6 py-8">
        <img src={Logo} alt="logo" className="self-start max-h-8 w-auto" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className='transition-colors px-4 py-6' asChild>
                    <a href={item.url}>
                      <item.icon style={{ width: 28, height: 28 }} />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='flex flex-row-reverse'>
        <SidebarMenuButton className='w-min transition-colors px-4 py-6' onClick={toggleSidebar}>
          <SidebarClose style={{ width: 28, height: 28 }} />
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}
