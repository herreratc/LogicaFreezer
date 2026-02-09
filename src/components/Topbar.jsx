import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../features/auth/useAuthStore'

export default function Topbar() {
  const profile = useAuthStore((s) => s.profile)
  const signOut = useAuthStore((s) => s.signOut)
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <header
      style={{
        alignItems: 'center',
        background: '#f4f6f8',
        borderBottom: '1px solid #d9dee3',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '12px 24px',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 18 }}>Freezer Control</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 600 }}>{profile?.name || 'Usuário'}</div>
          <div style={{ fontSize: 12, color: '#5f6b7a' }}>
            {profile?.role || 'Sem perfil'}
          </div>
        </div>
        <button
          onClick={handleSignOut}
          style={{
            background: '#ffffff',
            border: '1px solid #c5ccd3',
            borderRadius: 6,
            cursor: 'pointer',
            padding: '8px 14px',
          }}
          type="button"
        >
          Sair
        </button>
      </div>
    </header>
  )
}
