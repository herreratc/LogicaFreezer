import { useAuthStore } from '../auth/useAuthStore'
import Topbar from '../../components/Topbar'

export default function Dashboard() {
  const profile = useAuthStore((s) => s.profile)

  if (!profile) return <p>Carregando perfil...</p>

  return (
    <div>
      <Topbar />
      <main style={{ padding: 40 }}>
        <h1>Dashboard</h1>
        <p><strong>Nome:</strong> {profile.name}</p>
        <p><strong>Perfil:</strong> {profile.role}</p>
      </main>
    </div>
  )
}
