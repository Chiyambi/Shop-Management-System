export const MANAGEMENT_ROLES = new Set(['Owner', 'Admin', 'Manager'])

export const isManagementRole = (role) => MANAGEMENT_ROLES.has(role)

// All authenticated users can LOG expenses
export const canCreateExpenses = () => true

// Only management can EDIT or DELETE expenses
export const canEditExpenses = (role) => isManagementRole(role)
