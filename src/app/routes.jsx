import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Login from '../features/auth/Login'
import Dashboard from '../features/dashboard/Dashboard'
import FreezersList from '../features/freezers/FreezersList'
import FreezerForm from '../features/freezers/FreezerForm'
import FreezerQR from '../features/freezers/FreezerQR'
import CheckinPage from '../features/checkin/CheckinPage'
import UsersPage from '../features/users/UsersPage'
import ReportsPage from '../features/reports/ReportsPage'
import NotFound from '../features/errors/NotFound'
import ProtectedRoute from './ProtectedRoute'
import RoleRoute from './RoleRoute'
import { useAuthStore } from '../features/auth/useAuthStore'
import AppLayout from '../components/AppLayout'

export default function AppRoutes() {
  const loadSession = useAuthStore((s) => s.loadSession)

  useEffect(() => {
    loadSession()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="freezers"
            element={
              <RoleRoute allow={['adm', 'gerente']}>
                <FreezersList />
              </RoleRoute>
            }
          />
          <Route
            path="freezers/new"
            element={
              <RoleRoute allow={['adm', 'gerente']}>
                <FreezerForm />
              </RoleRoute>
            }
          />
          <Route
            path="freezers/:id/edit"
            element={
              <RoleRoute allow={['adm', 'gerente']}>
                <FreezerForm />
              </RoleRoute>
            }
          />
          <Route
            path="freezers/:id/qr"
            element={
              <RoleRoute allow={['adm', 'gerente']}>
                <FreezerQR />
              </RoleRoute>
            }
          />
          <Route
            path="checkin"
            element={
              <RoleRoute allow={['conferente']}>
                <CheckinPage />
              </RoleRoute>
            }
          />
          <Route
            path="users"
            element={
              <RoleRoute allow={['gerente']}>
                <UsersPage />
              </RoleRoute>
            }
          />
          <Route
            path="reports"
            element={
              <RoleRoute allow={['adm', 'gerente']}>
                <ReportsPage />
              </RoleRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
