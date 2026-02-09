export default function StatCard({ title, value, tone = 'neutral' }) {
  const toneStyles =
    tone === 'primary'
      ? {
          backgroundColor: '#e0e7ff',
          borderColor: '#6366f1',
          color: '#1e1b4b',
        }
      : {
          backgroundColor: '#ffffff',
          borderColor: '#e5e7eb',
          color: '#111827',
        }

  return (
    <div
      style={{
        border: `1px solid ${toneStyles.borderColor}`,
        background: toneStyles.backgroundColor,
        color: toneStyles.color,
        borderRadius: 12,
        padding: 16,
        boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ fontSize: 12, textTransform: 'uppercase', opacity: 0.7 }}>
        {title}
      </div>
      <div style={{ marginTop: 8, fontSize: 20, fontWeight: 700 }}>
        {value}
      </div>
    </div>
  )
}
