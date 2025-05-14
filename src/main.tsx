import { StrictMode } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RootLayout } from './components/root-layout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<h1>Home</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
