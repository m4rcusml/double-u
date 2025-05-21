import { StrictMode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RootLayout } from './layouts/root-layout'
import { AuthLayout } from './layouts/auth-layout'

import { FirstAccessForm } from './components/auth/first-access-form'
import { LoginForm } from './components/auth/login-form'
import { Simulations } from './pages/simulations'
import { NotLoggedLayout } from './layouts/not-logged-layout'
import { Chat } from './pages/chat'
import Landing from './pages/landing'
import { OtpVerificationForm } from './components/auth/otp-verification'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<h1>Dashboard</h1>} />
          <Route path='dashboard' element={<h1>Dashboard</h1>} />
          <Route path='simulations' element={<Simulations />} />
          <Route path='my-journey' element={<h1>My Jorney</h1>} />
          <Route path='documents' element={<h1>Documentos</h1>} />
          <Route path='properties' element={<h1>Imóveis</h1>} />
          <Route path='chat' element={<Chat />} />
          <Route path='settings' element={<h1>Configurações</h1>} />
        </Route>
        <Route path='/not-logged' element={<NotLoggedLayout />}>
          <Route index element={<Landing />} />
          <Route path='simulations' element={<Simulations />} />
          <Route path='landing' element={<Landing />} />
        </Route>
        <Route path='/auth' element={<AuthLayout />}>
          <Route index element={<LoginForm />} />
          <Route path='login' element={<LoginForm />} />
          <Route path='first-access'>
            <Route index element={<FirstAccessForm />} />
            <Route path='verification' element={<OtpVerificationForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
