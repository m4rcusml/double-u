import { StrictMode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'
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
import { OtpVerificationForm } from './components/auth/otp-verification-form'
import { CreatePasswordForm } from './components/auth/create-password-form'
import { useAuthStore } from './stores/useAuthStore'
import { Toaster } from './components/ui/sonner'
import { Settings } from './pages/settings'
import { Properties } from './pages/properties'
import { Documents } from './pages/documents'
import { MyJourney } from './pages/my-journey'
import { Dashboard } from './pages/dashboard'

export function RequireAuth({ children }: any) {
  const auth = useAuthStore(); // This hook should return if user is authenticated
  const location = useLocation();

  if (!auth.user) {
    // Redirect to login page if not authenticated
    // Save the attempted location for redirecting after login
    return <Navigate to="/not-logged" state={{ from: location }} replace />;
  }

  return children;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <RootLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="simulations" element={<Simulations />} />
          <Route path="my-journey" element={<MyJourney />} />
          <Route path="documents" element={<Documents />} />
          <Route path="properties" element={<Properties />} />
          <Route path="chat" element={<Chat />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route
          path="/not-logged"
          element={<NotLoggedLayout />}>
          <Route index element={<Landing />} />
          <Route path="simulations" element={<Simulations />} />
          <Route path="landing" element={<Landing />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="first-access">
            <Route index element={<FirstAccessForm />} />
            <Route path="verification" element={<OtpVerificationForm />} />
            <Route path="create-password" element={<CreatePasswordForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    <Toaster />
  </StrictMode>,
)
