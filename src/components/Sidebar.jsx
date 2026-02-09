import { NavLink } from 'react-router-dom'
import { getNavItemsForRole } from '../app/navConfig'

export default function Sidebar({ role }) {
  const items = getNavItemsForRole(role)

  return (
    <aside
      style={{
        width: 240,
        padding: '24px 16px',
        borderRight: '1px solid rgba(255, 255, 255, 0.15)',
      }}
    >
      <h2 style={{ marginTop: 0 }}>Menu</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              padding: '8px 12px',
              borderRadius: 8,
              color: isActive ? '#fff' : undefined,
              background: isActive ? '#4c5cff' : 'transparent',
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
