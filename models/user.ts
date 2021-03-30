export interface AuthUser {
  uid: string
  email: string
  displayName: string
}

export interface User extends AuthUser {}
