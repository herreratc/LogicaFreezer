import { useAuthStore } from '../auth/useAuthStore'

export default function Dashboard() {
  const profile = useAuthStore((s) => s.profile)
  const signOut = useAuthStore((s) => s.signOut)

  if (!profile) return <p>Carregando perfil...</p>

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p><strong>Nome:</strong> {profile.name}</p>
      <p><strong>Perfil:</strong> {profile.role}</p>

      <button onClick={signOut}>Sair</button>
    </div>
  )
}
