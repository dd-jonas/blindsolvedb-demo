export const enum Roles {
  user = 'user',
  admin = 'admin',
}

export const rolesKey = `${import.meta.env.VITE_AUTH0_NAMESPACE}/roles`;
