import { Outlet } from 'react-router'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Header } from '@/components/header'

export function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className='h-full w-full flex flex-col'>
        <Header />

        <Outlet />
      </main>
    </SidebarProvider>
  )
}