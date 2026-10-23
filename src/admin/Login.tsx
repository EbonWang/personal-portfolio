import { useState, type FormEvent } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { ArrowLeft, Lock } from 'lucide-react'
import { login } from '../lib/auth'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const from = (location.state as { from?: string } | null)?.from ?? '/admin'

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    // Simulate a short async auth round-trip.
    setTimeout(() => {
      const ok = login(username, password)
      setLoading(false)
      if (ok) {
        navigate(from, { replace: true })
      } else {
        setError('账号或密码错误')
      }
    }, 350)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 px-5">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" /> 返回前台
        </Link>

        <div className="card p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent-300">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold text-white">管理后台</h1>
            <p className="mt-1 text-sm text-slate-400">登录以管理站点内容</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="mb-1.5 block text-sm text-slate-300">
                账号 <span className="text-accent-300">*</span>
              </label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                required
                className="input"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm text-slate-300">
                密码 <span className="text-accent-300">*</span>
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="input"
              />
            </div>

            {error && <p className="rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-400">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? '登录中…' : '登录'}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-slate-500">演示账号：admin / admin123</p>
        </div>
      </div>
    </div>
  )
}
