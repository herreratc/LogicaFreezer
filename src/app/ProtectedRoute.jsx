import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../features/auth/useAuthStore'

export default function ProtectedRoute({ children }) {
  const session = useAuthStore((s) => s.session)

  if (!session) {
    return <Navigate to="/login" />
  }

  return children
}
