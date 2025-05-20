import { StrictMode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RootLayout } from './layouts/root-layout'
import { AuthLayout } from './layouts/auth-layout'

import { FirstAccessForm } from './components/first-access-form'
import { LoginForm } from './components/login-form'
import { Simulations } from './pages/simulations'
import { NotLoggedLayout } from './layouts/not-logged-layout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<h1>Dashboard</h1>} />
          <Route path='simulations' element={<Simulations />} />
        </Route>
        <Route path='/not-logged' element={<NotLoggedLayout />}>
          <Route index element={<h1>landing page</h1>} />
          <Route path='simulations' element={<Simulations />} />
        </Route>
        <Route path='/auth' element={<AuthLayout />}>
          <Route index element={<LoginForm />} />
          <Route path='login' element={<LoginForm />} />
          <Route path='first-access' element={<FirstAccessForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
