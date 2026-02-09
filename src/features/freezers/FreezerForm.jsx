import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAuthStore } from '../auth/useAuthStore'

const emptyForm = {
  codigo: '',
  descricao: '',
  lat: '',
  lng: '',
  raio_metros: 80,
  ativo: true,
}

export default function FreezerForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const user = useAuthStore((s) => s.user)

  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let active = true

    const loadFreezer = async () => {
      if (!isEdit) return
      setLoading(true)

      const { data, error } = await supabase
        .from('freezers')
        .select('codigo,descricao,lat,lng,raio_metros,ativo')
        .eq('id', id)
        .single()

      if (!active) return

      if (error || !data) {
        setForm(emptyForm)
      } else {
        setForm({
          codigo: data.codigo ?? '',
          descricao: data.descricao ?? '',
          lat: data.lat ?? '',
          lng: data.lng ?? '',
          raio_metros: data.raio_metros ?? 80,
          ativo: data.ativo ?? true,
        })
      }
      setLoading(false)
    }

    loadFreezer()

    return () => {
      active = false
    }
  }, [id, isEdit])

  const errors = useMemo(() => {
    const next = {}
    if (!form.codigo?.trim()) next.codigo = 'Codigo obrigatorio'
    if (form.lat === '' || Number.isNaN(Number(form.lat))) {
      next.lat = 'Latitude obrigatoria e numerica'
    }
    if (form.lng === '' || Number.isNaN(Number(form.lng))) {
      next.lng = 'Longitude obrigatoria e numerica'
    }
    return next
  }, [form])

  const hasErrors = Object.keys(errors).length > 0

  const handleChange = (field) => (event) => {
    const { value, type, checked } = event.target
    setForm((prev) => ({
      ...prev,
      [field]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleCodigoChange = (event) => {
    const value = event.target.value.toUpperCase()
    setForm((prev) => ({
      ...prev,
      codigo: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (hasErrors) {
      window.alert('Preencha codigo, latitude e longitude corretamente.')
      return
    }

    setSaving(true)

    const payload = {
      codigo: form.codigo.trim(),
      descricao: form.descricao.trim() || null,
      lat: Number(form.lat),
      lng: Number(form.lng),
      raio_metros:
        form.raio_metros === '' ? 80 : Number(form.raio_metros),
      ativo: Boolean(form.ativo),
    }

    let result
    if (isEdit) {
      result = await supabase
        .from('freezers')
        .update(payload)
        .eq('id', id)
        .select('id')
        .single()
    } else {
      if (!user?.id) {
        window.alert('Usuario nao autenticado.')
        setSaving(false)
        return
      }
      result = await supabase
        .from('freezers')
        .insert({ ...payload, created_by: user.id })
        .select('id')
        .single()
    }

    setSaving(false)

    if (result.error) {
      if (result.error.code === '23505') {
        window.alert('Codigo ja cadastrado. Use outro codigo.')
      } else {
        window.alert('Erro ao salvar freezer. Tente novamente.')
      }
      return
    }

    window.alert('Freezer salvo com sucesso.')
    navigate('/app/freezers')
  }

  if (loading) return <p>Carregando freezer...</p>

  return (
    <div>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ marginBottom: 6 }}>
          {isEdit ? 'Editar freezer' : 'Novo freezer'}
        </h1>
        <p style={{ margin: 0 }}>
          {isEdit
            ? 'Atualize as informacoes do freezer selecionado.'
            : 'Preencha os dados para cadastrar um novo freezer.'}
        </p>
      </header>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          Codigo
          <input
            name="codigo"
            placeholder="FRZ-0001"
            value={form.codigo}
            onChange={handleCodigoChange}
            required
            style={{
              padding: 10,
              borderRadius: 8,
              border: errors.codigo ? '1px solid #ff4757' : '1px solid #2f2f2f',
            }}
          />
          {errors.codigo && (
            <span style={{ color: '#ff4757', fontSize: 12 }}>
              {errors.codigo}
            </span>
          )}
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          Descricao
          <input
            name="descricao"
            placeholder="Freezer Loja Centro"
            value={form.descricao}
            onChange={handleChange('descricao')}
            style={{ padding: 10, borderRadius: 8, border: '1px solid #2f2f2f' }}
          />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          Latitude
          <input
            name="lat"
            type="number"
            step="0.0000001"
            value={form.lat}
            onChange={handleChange('lat')}
            required
            style={{
              padding: 10,
              borderRadius: 8,
              border: errors.lat ? '1px solid #ff4757' : '1px solid #2f2f2f',
            }}
          />
          {errors.lat && (
            <span style={{ color: '#ff4757', fontSize: 12 }}>{errors.lat}</span>
          )}
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          Longitude
          <input
            name="lng"
            type="number"
            step="0.0000001"
            value={form.lng}
            onChange={handleChange('lng')}
            required
            style={{
              padding: 10,
              borderRadius: 8,
              border: errors.lng ? '1px solid #ff4757' : '1px solid #2f2f2f',
            }}
          />
          {errors.lng && (
            <span style={{ color: '#ff4757', fontSize: 12 }}>{errors.lng}</span>
          )}
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          Raio (metros)
          <input
            name="raio_metros"
            type="number"
            value={form.raio_metros}
            onChange={handleChange('raio_metros')}
            style={{ padding: 10, borderRadius: 8, border: '1px solid #2f2f2f' }}
          />
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            name="ativo"
            type="checkbox"
            checked={form.ativo}
            onChange={handleChange('ativo')}
          />
          Ativo
        </label>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              border: 'none',
              borderRadius: 8,
              padding: '10px 16px',
              background: '#4c5cff',
              color: '#fff',
              cursor: 'pointer',
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving
              ? 'Salvando...'
              : isEdit
              ? 'Salvar alteracoes'
              : 'Cadastrar freezer'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/app/freezers')}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 8,
              padding: '10px 16px',
              background: 'transparent',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
