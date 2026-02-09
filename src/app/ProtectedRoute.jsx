import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../features/auth/useAuthStore'
import LoadingScreen from '../components/LoadingScreen'

export default function ProtectedRoute({ children }) {
  const session = useAuthStore((s) => s.session)
  const loading = useAuthStore((s) => s.loading)

  if (loading) {
    return <LoadingScreen />
  }

  if (!session) {
    return <Navigate to="/login" />
  }

  return children
}
