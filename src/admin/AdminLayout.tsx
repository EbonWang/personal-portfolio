import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  ExternalLink,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Settings,
  User,
  Wrench,
  X,
} from 'lucide-react'
import { getAuthUser, logout } from '../lib/auth'

const NAV = [
  { to: '/admin', label: '仪表盘', icon: LayoutDashboard, end: true },
  { to: '/admin/profile', label: '个人信息', icon: User },
  { to: '/admin/skills', label: '技能管理', icon: Wrench },
  { to: '/admin/projects', label: '项目管理', icon: FolderKanban },
  { to: '/admin/posts', label: '博客管理', icon: FileText },
  { to: '/admin/settings', label: '站点设置', icon: Settings },
]

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate()
  const user = getAuthUser()

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent-300">
          <LayoutDashboard className="h-5 w-5" />
        </span>
        <span className="text-lg font-bold text-white">管理后台</span>
      </div>

      <div className="grid grid-cols-2 gap-2 px-4 pb-3">
        <NavLink
          to="/admin/posts/new"
          onClick={onNavigate}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-accent/15 px-3 py-2 text-xs font-medium text-accent-300 transition hover:bg-accent/25"
        >
          <Plus className="h-3.5 w-3.5" /> 新建文章
        </NavLink>
        <NavLink
          to="/admin/projects/new"
          onClick={onNavigate}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-accent/15 px-3 py-2 text-xs font-medium text-accent-300 transition hover:bg-accent/25"
        >
          <Plus className="h-3.5 w-3.5" /> 新建项目
        </NavLink>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                isActive ? 'bg-accent/15 text-white' : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-100'
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-1 border-t border-white/[0.06] px-3 py-3">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/[0.04] hover:text-slate-100"
        >
          <ExternalLink className="h-4 w-4" />
          查看前台 ↗
        </a>
        <div className="px-3 py-1 text-xs text-slate-500">已登录：{user?.name ?? '管理员'}</div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-400"
        >
          <LogOut className="h-4 w-4" />
          退出登录
        </button>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-ink-900">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/[0.06] bg-ink-800/50 lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 border-r border-white/[0.06] bg-ink-900">
            <button
              type="button"
              className="absolute right-3 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-white/[0.06]"
              onClick={() => setOpen(false)}
              aria-label="关闭菜单"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        {/* Mobile top bar */}
        <div className="glass sticky top-0 z-30 flex h-14 items-center gap-3 px-4 lg:hidden">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-200 hover:bg-white/[0.06]"
            onClick={() => setOpen(true)}
            aria-label="打开菜单"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-semibold text-white">管理后台</span>
        </div>

        <main className="mx-auto max-w-5xl px-5 py-8 lg:px-10 lg:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
