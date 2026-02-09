export const navConfig = {
  conferente: [
    { label: 'Dashboard', to: '/app/dashboard' },
    { label: 'Conferir Freezer', to: '/app/checkin' },
  ],
  adm: [
    { label: 'Dashboard', to: '/app/dashboard' },
    { label: 'Freezers', to: '/app/freezers' },
    { label: 'Relatorios', to: '/app/reports' },
  ],
  gerente: [
    { label: 'Dashboard', to: '/app/dashboard' },
    { label: 'Freezers', to: '/app/freezers' },
    { label: 'Usuarios', to: '/app/users' },
    { label: 'Relatorios', to: '/app/reports' },
  ],
}

export const getNavItemsForRole = (role) => navConfig[role] ?? []
