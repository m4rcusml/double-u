import { Outlet } from 'react-router'

export function RootLayout() {
  return (
    <main className='h-full flex flex-row'>
      <section className='flex-1'>
        <Outlet />
      </section>
    </main>
  )
}