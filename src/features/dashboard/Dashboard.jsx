import { useAuthStore } from '../auth/useAuthStore'
import Sidebar from '../../components/Sidebar'

export default function Dashboard() {
  const profile = useAuthStore((s) => s.profile)
  const signOut = useAuthStore((s) => s.signOut)

  if (!profile) return <p>Carregando perfil...</p>

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <Sidebar role={profile.role} />
      <main style={{ padding: 40, flex: 1 }}>
        <h1>Dashboard</h1>
        <p><strong>Nome:</strong> {profile.name}</p>
        <p><strong>Perfil:</strong> {profile.role}</p>

        <button onClick={signOut}>Sair</button>
      </main>
    </div>
  )
}
