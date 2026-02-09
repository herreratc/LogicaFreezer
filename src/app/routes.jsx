import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../features/auth/Login'
import Dashboard from '../features/dashboard/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import { useEffect } from 'react'
import { useAuthStore } from '../features/auth/useAuthStore'

export default function AppRoutes() {
  const loadSession = useAuthStore((s) => s.loadSession)
  const user = useAuthStore((s) => s.user)

  useEffect(() => {
    loadSession()
  }, [])

  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ Acessou / -> vai pra /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
