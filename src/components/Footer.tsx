import { useContent } from '../lib/content'
import { SocialIcon } from './SocialIcon'

export default function Footer() {
  const { content } = useContent()
  const { profile, socials } = content
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 text-sm text-slate-400 sm:flex-row">
        <p>
          © {year} {profile.name} · 由 React + Vite 构建
        </p>
        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label + s.url}
              href={s.url}
              target={s.url.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
              title={s.label}
            >
              <SocialIcon icon={s.icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
