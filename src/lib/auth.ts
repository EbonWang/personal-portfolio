import type { AuthUser } from './types'

const TOKEN_KEY = 'myshow.auth.token'
const USER_KEY = 'myshow.auth.user'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123'

export function login(username: string, password: string): boolean {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = 'tok_' + Math.random().toString(36).slice(2) + Date.now().toString(36)
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
    localStorage.setItem(USER_KEY, JSON.stringify({ username, name: '管理员' } satisfies AuthUser))
    return true
  }
  return false
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function isAuthed(): boolean {
  return !!localStorage.getItem(TOKEN_KEY)
}

export function getAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}
