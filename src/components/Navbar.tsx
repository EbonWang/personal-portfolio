import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useContent } from '../lib/content'
import { SocialIcon } from './SocialIcon'

const NAV_LINKS = [
  { label: '首页', hash: '#home' },
  { label: '关于', hash: '#about' },
  { label: '技能', hash: '#skills' },
  { label: '项目', hash: '#projects' },
  { label: '博客', hash: '#blog' },
  { label: '联系', hash: '#contact' },
]

export default function Navbar() {
  const { content } = useContent()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')
  const { pathname } = useLocation()
  const { profile, socials } = content

  const isHome = pathname === '/'

  useEffect(() => {
    if (!isHome) return
    const ids = NAV_LINKS.map((l) => l.hash.slice(1))
    const onScroll = () => {
      const pos = window.scrollY + 160
      let current = '#home'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= pos) current = `#${id}`
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = NAV_LINKS[NAV_LINKS.length - 1].hash
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  return (
    <header className="glass fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="group flex items-center gap-2 text-lg font-bold text-white" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20 text-accent-300 transition group-hover:bg-accent/30">
            {profile.name.charAt(0)}
          </span>
          <span>{profile.name}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => {
            const activeLink = isHome && active === l.hash
            return (
              <Link
                key={l.hash}
                to={`/${l.hash}`}
                className={`rounded-lg px-3 py-1.5 text-sm transition ${
                  activeLink ? 'bg-white/[0.07] text-white' : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </div>

        <div className="hidden items-center gap-1.5 md:flex">
          {socials.map((s) => (
            <a
              key={s.label + s.url}
              href={s.url}
              target={s.url.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              title={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
            >
              <SocialIcon icon={s.icon} />
            </a>
          ))}
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-200 transition hover:bg-white/[0.06] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? '关闭菜单' : '打开菜单'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.06] px-5 py-4 md:hidden">
          <div className="grid grid-cols-2 gap-1">
            {NAV_LINKS.map((l) => {
              const activeLink = isHome && active === l.hash
              return (
                <Link
                  key={l.hash}
                  to={`/${l.hash}`}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm transition ${
                    activeLink ? 'bg-white/[0.08] text-white' : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-white/[0.06] pt-3">
            {socials.map((s) => (
              <a
                key={s.label + s.url}
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/[0.06]"
                onClick={() => setOpen(false)}
              >
                <SocialIcon icon={s.icon} />
                {s.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
