import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isAuthed } from '../lib/auth'

export default function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation()
  if (!isAuthed()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }
  return <>{children}</>
}
