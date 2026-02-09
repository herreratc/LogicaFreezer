import { Outlet } from 'react-router-dom'
import { useAuthStore } from '../features/auth/useAuthStore'
import LoadingScreen from './LoadingScreen'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AppLayout() {
  const profile = useAuthStore((s) => s.profile)
  const loading = useAuthStore((s) => s.loading)
  if (loading || !profile) {
    return <LoadingScreen />
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar role={profile.role} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar />

        <main style={{ flex: 1, padding: 32, backgroundColor: '#f9fafb' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
