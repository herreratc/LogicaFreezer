import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../auth/useAuthStore'
import StatCard from '../../components/StatCard'
import ActionCard from '../../components/ActionCard'

export default function Dashboard() {
  const profile = useAuthStore((s) => s.profile)
  const navigate = useNavigate()

  const role = profile?.role || 'conferente'

  const content = useMemo(() => {
    const common = {
      title: 'Dashboard',
      stats: [],
      actions: [],
      extra: null,
    }

    if (role === 'conferente') {
      return {
        ...common,
        title: 'Dashboard - Conferente',
        stats: [
          {
            title: 'Conferir Freezer',
            value: 'Iniciar conferencias',
            tone: 'primary',
          },
        ],
        extra: (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ marginBottom: 8 }}>Ultimas conferencias</h3>
            <p>Em construcao.</p>
          </div>
        ),
      }
    }

    if (role === 'adm') {
      return {
        ...common,
        title: 'Dashboard - Administracao',
        stats: [
          { title: 'Freezers ativos', value: 'Em construcao', tone: 'neutral' },
          {
            title: 'Conferencias hoje',
            value: 'Em construcao',
            tone: 'neutral',
          },
        ],
        actions: [
          {
            label: 'Cadastrar freezer',
            description: 'Abrir cadastro de freezer',
            to: '/app/freezers',
          },
        ],
      }
    }

    if (role === 'gerente') {
      return {
        ...common,
        title: 'Dashboard - Gerencia',
        stats: [
          { title: 'Freezers ativos', value: 'Em construcao', tone: 'neutral' },
          {
            title: 'Conferencias hoje',
            value: 'Em construcao',
            tone: 'neutral',
          },
        ],
        actions: [
          {
            label: 'Cadastrar freezer',
            description: 'Abrir cadastro de freezer',
            to: '/app/freezers',
          },
          {
            label: 'Usuarios',
            description: 'Gerenciar usuarios',
            to: '/app/users',
          },
        ],
      }
    }

    return common
  }, [role])

  if (!profile) return <p>Carregando perfil...</p>

  return (
    <div>
      <h1 style={{ marginBottom: 16 }}>{content.title}</h1>

      {content.stats.length > 0 && (
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          {content.stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              tone={stat.tone}
            />
          ))}
        </section>
      )}

      {content.actions.length > 0 && (
        <section style={{ marginTop: 24 }}>
          <h3 style={{ marginBottom: 12 }}>Acoes rapidas</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            {content.actions.map((action) => (
              <ActionCard
                key={action.label}
                label={action.label}
                description={action.description}
                onClick={() => navigate(action.to)}
              />
            ))}
          </div>
        </section>
      )}

      {content.extra}
    </div>
  )
}
