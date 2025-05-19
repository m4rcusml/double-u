import { Outlet } from 'react-router'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '../components/app-sidebar'

export function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className='h-full flex flex-row'>
        <SidebarTrigger />
        <section className='flex-1'>
          <Outlet />
        </section>
      </main>
    </SidebarProvider>
  )
}