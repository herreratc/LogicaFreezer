import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import QRCode from 'react-qr-code'
import { supabase } from '../../lib/supabaseClient'

export default function FreezerQR() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [freezer, setFreezer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const loadFreezer = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('freezers')
        .select('codigo,qrcode_token')
        .eq('id', id)
        .single()

      if (!active) return

      if (error || !data) {
        setFreezer(null)
      } else {
        setFreezer(data)
      }
      setLoading(false)
    }

    loadFreezer()

    return () => {
      active = false
    }
  }, [id])

  const qrValue = freezer?.qrcode_token
    ? `FREEZER:${freezer.qrcode_token}`
    : ''

  if (loading) return <p>Carregando QR...</p>

  if (!freezer) {
    return (
      <div>
        <h1 style={{ marginBottom: 8 }}>QR do freezer</h1>
        <p>Freezer nao encontrado.</p>
        <button
          type="button"
          onClick={() => navigate('/app/freezers')}
          style={{
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: 8,
            padding: '8px 12px',
            background: 'transparent',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Voltar para lista
        </button>
      </div>
    )
  }

  return (
    <div>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ marginBottom: 6 }}>QR do freezer</h1>
        <p style={{ margin: 0 }}>Codigo: {freezer.codigo}</p>
      </header>

      <section
        style={{
          display: 'grid',
          placeItems: 'center',
          gap: 16,
          padding: 24,
          border: '1px dashed rgba(255, 255, 255, 0.3)',
          borderRadius: 12,
        }}
      >
        <div style={{ background: '#fff', padding: 16, borderRadius: 12 }}>
          <QRCode value={qrValue} size={240} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: '0 0 6px 0', fontWeight: 600 }}>
            Token: {freezer.qrcode_token}
          </p>
          <p style={{ margin: 0, opacity: 0.8 }}>
            Conteudo do QR: {qrValue}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => window.print()}
            style={{
              border: 'none',
              borderRadius: 8,
              padding: '8px 12px',
              background: '#4c5cff',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Imprimir
          </button>
          <button
            type="button"
            onClick={() => navigate('/app/freezers')}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 8,
              padding: '8px 12px',
              background: 'transparent',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Voltar para lista
          </button>
        </div>
      </section>
    </div>
  )
}
