import { Outlet } from 'react-router'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Header } from '@/components/header'
import Footer from '@/components/landing/footer'
// import { Footer } from '@/components/footer'

export function NotLoggedLayout() {
  return (
    <SidebarProvider className='flex flex-col'>
      <main className='h-full w-full flex flex-col'>
        <div className='fixed top-0 left-0 w-full z-50'>
          <Header useDarkMode />
        </div>
        <Outlet />

        <Footer />
      </main>
    </SidebarProvider>
  )
}