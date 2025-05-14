import {
  LayoutDashboard,
  Shapes,
  FileText,
  UsersRound,
  MessageCircleMore,
  Settings,
  Moon,
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
} from '@/components/ui/sidebar'

import Logo from '@/assets/logo.png'

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
    title: 'Falar com consultor',
    url: 'consultor',
    icon: MessageCircleMore,
  },
  {
    title: 'Configurações',
    url: 'settings',
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className='px-4 py-6'>
        <img src={Logo} alt="logo" className='self-start' />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div>
                    <Moon fill="currentColor" />
                    <span>Modo escuro</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}
