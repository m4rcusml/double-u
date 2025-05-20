import { Outlet } from 'react-router'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Header } from '@/components/header'
// import { Footer } from '@/components/footer'

export function NotLoggedLayout() {
  return (
    <SidebarProvider>
      <main className='h-full w-full flex flex-col'>
        <Header useDarkMode />

        <Outlet />

        {/* <Footer /> */}
      </main>
    </SidebarProvider>
  )
}