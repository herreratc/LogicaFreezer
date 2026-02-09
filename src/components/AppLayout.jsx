import { Outlet } from 'react-router-dom'
import { useAuthStore } from '../features/auth/useAuthStore'
import LoadingScreen from './LoadingScreen'

export default function AppLayout() {
  const profile = useAuthStore((s) => s.profile)
  const loading = useAuthStore((s) => s.loading)
  const signOut = useAuthStore((s) => s.signOut)

  if (loading || !profile) {
    return <LoadingScreen />
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          width: 220,
          backgroundColor: '#1f2937',
          color: '#fff',
          padding: '24px 16px',
        }}
      >
        <h2 style={{ margin: 0, fontSize: 20 }}>LogicaFreezer</h2>
        <nav style={{ marginTop: 24, display: 'grid', gap: 12 }}>
          <span>Dashboard</span>
          <span>Relatórios</span>
          <span>Configurações</span>
        </nav>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            height: 64,
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            backgroundColor: '#fff',
          }}
        >
          <div>
            <div style={{ fontWeight: 600 }}>{profile.name}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>{profile.role}</div>
          </div>
          <button
            type="button"
            onClick={signOut}
            style={{
              border: '1px solid #d1d5db',
              backgroundColor: '#fff',
              padding: '8px 12px',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Sair
          </button>
        </header>

        <main style={{ flex: 1, padding: 32, backgroundColor: '#f9fafb' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
