import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

export default function FreezersList() {
  const navigate = useNavigate()
  const [freezers, setFreezers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    let active = true

    const loadFreezers = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('freezers')
        .select('id,codigo,descricao,ativo,raio_metros')
        .order('codigo')

      if (!active) return

      if (error) {
        setFreezers([])
      } else {
        setFreezers(data ?? [])
      }
      setLoading(false)
    }

    loadFreezers()

    return () => {
      active = false
    }
  }, [])

  const filteredFreezers = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return freezers
    return freezers.filter((freezer) => {
      const codigo = freezer.codigo?.toLowerCase() ?? ''
      const descricao = freezer.descricao?.toLowerCase() ?? ''
      return codigo.includes(term) || descricao.includes(term)
    })
  }, [freezers, search])

  const handleDelete = async (freezerId, codigo) => {
    const confirmed = window.confirm(
      `Excluir freezer ${codigo}? Esta acao nao pode ser desfeita.`
    )
    if (!confirmed) return

    setDeletingId(freezerId)
    const { error } = await supabase.from('freezers').delete().eq('id', freezerId)
    setDeletingId(null)

    if (error) {
      window.alert('Erro ao excluir freezer. Tente novamente.')
      return
    }

    setFreezers((prev) => prev.filter((freezer) => freezer.id !== freezerId))
  }

  return (
    <div>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ marginBottom: 6 }}>Freezers</h1>
          <p style={{ margin: 0 }}>Gerencie o cadastro e o QR de cada freezer.</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/app/freezers/new')}
          style={{
            border: 'none',
            borderRadius: 8,
            padding: '10px 16px',
            background: '#4c5cff',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Novo freezer
        </button>
      </header>

      <div style={{ marginBottom: 20, display: 'flex', gap: 12 }}>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por codigo ou descricao"
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'transparent',
            color: '#fff',
          }}
        />
      </div>

      {loading ? (
        <p>Carregando freezers...</p>
      ) : filteredFreezers.length === 0 ? (
        <div
          style={{
            border: '1px dashed rgba(255, 255, 255, 0.3)',
            borderRadius: 12,
            padding: 24,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Nenhum freezer encontrado</h3>
          <p style={{ marginBottom: 0 }}>
            Ajuste a busca ou cadastre um novo freezer.
          </p>
        </div>
      ) : (
        <section style={{ display: 'grid', gap: 12 }}>
          {filteredFreezers.map((freezer) => (
            <article
              key={freezer.id}
              style={{
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 12,
                padding: 16,
                display: 'grid',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <h3 style={{ margin: 0 }}>{freezer.codigo}</h3>
                  <p style={{ margin: '6px 0 0 0' }}>{freezer.descricao}</p>
                </div>
                <span
                  style={{
                    alignSelf: 'flex-start',
                    padding: '4px 10px',
                    borderRadius: 999,
                    fontSize: 12,
                    background: freezer.ativo
                      ? 'rgba(46, 213, 115, 0.2)'
                      : 'rgba(255, 71, 87, 0.2)',
                    color: freezer.ativo ? '#2ed573' : '#ff4757',
                  }}
                >
                  {freezer.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </div>

              <div style={{ fontSize: 14, opacity: 0.8 }}>
                Raio: {freezer.raio_metros ?? 80} metros
              </div>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => navigate(`/app/freezers/${freezer.id}/edit`)}
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: 8,
                    padding: '8px 12px',
                    background: 'transparent',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/app/freezers/${freezer.id}/qr`)}
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: 8,
                    padding: '8px 12px',
                    background: 'transparent',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  Ver QR
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(freezer.id, freezer.codigo)}
                  disabled={deletingId === freezer.id}
                  style={{
                    border: '1px solid rgba(255, 71, 87, 0.6)',
                    borderRadius: 8,
                    padding: '8px 12px',
                    background: 'transparent',
                    color: '#ff4757',
                    cursor: 'pointer',
                    opacity: deletingId === freezer.id ? 0.6 : 1,
                  }}
                >
                  {deletingId === freezer.id ? 'Excluindo...' : 'Excluir'}
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  )
}
