import { useAuthStore } from '../features/auth/useAuthStore'
import LoadingScreen from '../components/LoadingScreen'
import Forbidden from '../features/errors/Forbidden'

export default function RoleRoute({ allow, children }) {
  const profile = useAuthStore((s) => s.profile)
  const loading = useAuthStore((s) => s.loading)

  if (loading || !profile) {
    return <LoadingScreen />
  }

  if (!allow.includes(profile.role)) {
    return <Forbidden />
  }

  return children
}
