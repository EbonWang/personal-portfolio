import { useState, type FormEvent } from 'react'
import { Plus, RotateCcw, Trash2 } from 'lucide-react'
import { useContent } from '../lib/content'
import { DEFAULT_CONTENT } from '../lib/defaultData'
import type { Social, SocialIcon as SocialIconType } from '../lib/types'
import { Field, PageHeader } from './ui'

const ICON_OPTIONS: { value: SocialIconType; label: string }[] = [
  { value: 'github', label: 'GitHub' },
  { value: 'blog', label: '博客' },
  { value: 'mail', label: '邮箱' },
]

export default function SettingsPage() {
  const { content, update, reset } = useContent()
  const [siteName, setSiteName] = useState(content.settings.siteName)
  const [siteDescription, setSiteDescription] = useState(content.settings.siteDescription)
  const [socials, setSocials] = useState<Social[]>(content.socials)
  const [saved, setSaved] = useState(false)

  const setSocial = (i: number, patch: Partial<Social>) =>
    setSocials((arr) => arr.map((s, idx) => (idx === i ? { ...s, ...patch } : s)))

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    update((prev) => ({
      ...prev,
      settings: { siteName: siteName.trim(), siteDescription: siteDescription.trim() },
      socials: socials.filter((s) => s.label.trim() && s.url.trim()),
    }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const restoreDefaults = () => {
    if (!window.confirm('确定要恢复默认数据吗？当前所有内容修改都会丢失。')) return
    reset()
    setSiteName(DEFAULT_CONTENT.settings.siteName)
    setSiteDescription(DEFAULT_CONTENT.settings.siteDescription)
    setSocials(DEFAULT_CONTENT.socials)
  }

  return (
    <div>
      <PageHeader
        title="站点设置"
        description="站点信息与社交链接"
        actions={
          <button
            type="button"
            onClick={restoreDefaults}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition hover:border-rose-500/50 hover:text-rose-400"
          >
            <RotateCcw className="h-4 w-4" /> 恢复默认数据
          </button>
        }
      />

      <form onSubmit={onSubmit} className="space-y-6">
        <section className="card space-y-5 p-6">
          <h2 className="text-base font-semibold text-white">站点信息</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="站点名称" required>
              <input value={siteName} onChange={(e) => setSiteName(e.target.value)} className="input" />
            </Field>
            <Field label="站点描述" required>
              <input value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} className="input" />
            </Field>
          </div>
        </section>

        <section className="card space-y-5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">社交链接</h2>
            <button
              type="button"
              onClick={() => setSocials([...socials, { label: '', url: '', icon: 'github' }])}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-200 transition hover:border-white/25"
            >
              <Plus className="h-3.5 w-3.5" /> 添加链接
            </button>
          </div>

          {socials.map((s, i) => (
            <div key={i} className="grid items-end gap-3 sm:grid-cols-[1fr_1.4fr_auto_auto]">
              <Field label="名称" required>
                <input value={s.label} onChange={(e) => setSocial(i, { label: e.target.value })} className="input" />
              </Field>
              <Field label="链接" required>
                <input value={s.url} onChange={(e) => setSocial(i, { url: e.target.value })} className="input" />
              </Field>
              <Field label="图标">
                <select value={s.icon} onChange={(e) => setSocial(i, { icon: e.target.value as SocialIconType })} className="input">
                  {ICON_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
              <button
                type="button"
                onClick={() => setSocials(socials.filter((_, idx) => idx !== i))}
                className="mb-0.5 flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-400"
                aria-label="删除"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {socials.length === 0 && <p className="text-sm text-slate-500">暂无社交链接。</p>}
        </section>

        <div className="flex items-center gap-3">
          <button type="submit" className="btn-primary">
            保存设置
          </button>
          {saved && <span className="text-sm text-emerald-400">已保存 ✓</span>}
        </div>
      </form>
    </div>
  )
}
