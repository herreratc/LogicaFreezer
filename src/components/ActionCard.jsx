export default function ActionCard({ label, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #d1d5db',
        borderRadius: 10,
        background: '#ffffff',
        padding: '12px 16px',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <span>
        <span style={{ display: 'block', fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 12, color: '#6b7280' }}>{description}</span>
      </span>
      <span style={{ fontSize: 18, color: '#9ca3af' }}>&gt;</span>
    </button>
  )
}
