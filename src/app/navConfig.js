export const navConfig = {
  conferente: [
    { label: 'Dashboard', to: '/app' },
    { label: 'Conferir Freezer', to: '/app/conferir-freezer' },
  ],
  adm: [
    { label: 'Dashboard', to: '/app' },
    { label: 'Freezers', to: '/app/freezers' },
    { label: 'Relatórios', to: '/app/relatorios' },
  ],
  gerente: [
    { label: 'Dashboard', to: '/app' },
    { label: 'Freezers', to: '/app/freezers' },
    { label: 'Usuários', to: '/app/usuarios' },
    { label: 'Relatórios', to: '/app/relatorios' },
  ],
}

export const getNavItemsForRole = (role) => navConfig[role] ?? []
