import { useState, type FormEvent } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useContent } from '../lib/content'
import type { EducationItem, Profile, TimelineItem } from '../lib/types'
import { Field, PageHeader } from './ui'
import ImageUpload from './ImageUpload'

export default function ProfilePage() {
  const { content, update } = useContent()
  const [profile, setProfile] = useState<Profile>(content.profile)
  const [saved, setSaved] = useState(false)

  const set = (patch: Partial<Profile>) => setProfile((p) => ({ ...p, ...patch }))

  const setTimeline = (i: number, patch: Partial<TimelineItem>) =>
    setProfile((p) => ({ ...p, timeline: p.timeline.map((t, idx) => (idx === i ? { ...t, ...patch } : t)) }))

  const setEducation = (i: number, patch: Partial<EducationItem>) =>
    setProfile((p) => ({ ...p, education: p.education.map((t, idx) => (idx === i ? { ...t, ...patch } : t)) }))

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    update((prev) => ({ ...prev, profile }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <PageHeader title="个人信息" description="管理个人资料、经历与教育背景" />

      <form onSubmit={onSubmit} className="space-y-6">
        <section className="card space-y-5 p-6">
          <h2 className="text-base font-semibold text-white">基本信息</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="姓名" required>
              <input value={profile.name} onChange={(e) => set({ name: e.target.value })} className="input" />
            </Field>
            <Field label="职位 / 头衔" required>
              <input value={profile.title} onChange={(e) => set({ title: e.target.value })} className="input" />
            </Field>
          </div>
          <Field label="一句话介绍">
            <input value={profile.tagline} onChange={(e) => set({ tagline: e.target.value })} className="input" />
          </Field>
          <Field label="头像" hint="支持 jpg / png / svg / webp 等，不超过 2MB">
            <ImageUpload value={profile.avatar} onChange={(v) => set({ avatar: v })} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="邮箱" required>
              <input type="email" value={profile.email} onChange={(e) => set({ email: e.target.value })} className="input" />
            </Field>
            <Field label="所在地区">
              <input value={profile.location} onChange={(e) => set({ location: e.target.value })} className="input" />
            </Field>
          </div>
          <Field label="简历文件路径">
            <input value={profile.resume} onChange={(e) => set({ resume: e.target.value })} className="input" />
          </Field>
          <Field label="个人简介">
            <textarea value={profile.bio} onChange={(e) => set({ bio: e.target.value })} rows={3} className="input resize-none" />
          </Field>
        </section>

        <section className="card space-y-5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">工作经历</h2>
            <button
              type="button"
              onClick={() =>
                set({ timeline: [...profile.timeline, { period: '', role: '', org: '', description: '' }] })
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-200 transition hover:border-white/25"
            >
              <Plus className="h-3.5 w-3.5" /> 添加经历
            </button>
          </div>

          {profile.timeline.map((item, i) => (
            <div key={i} className="relative space-y-4 rounded-xl border border-white/[0.06] p-4">
              <button
                type="button"
                onClick={() => set({ timeline: profile.timeline.filter((_, idx) => idx !== i) })}
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-400"
                aria-label="删除"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="时间段" required>
                  <input value={item.period} onChange={(e) => setTimeline(i, { period: e.target.value })} className="input" />
                </Field>
                <Field label="职位" required>
                  <input value={item.role} onChange={(e) => setTimeline(i, { role: e.target.value })} className="input" />
                </Field>
                <Field label="公司 / 组织" required>
                  <input value={item.org} onChange={(e) => setTimeline(i, { org: e.target.value })} className="input" />
                </Field>
              </div>
              <Field label="描述">
                <textarea value={item.description} onChange={(e) => setTimeline(i, { description: e.target.value })} rows={2} className="input resize-none" />
              </Field>
            </div>
          ))}
          {profile.timeline.length === 0 && <p className="text-sm text-slate-500">暂无工作经历。</p>}
        </section>

        <section className="card space-y-5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">教育背景</h2>
            <button
              type="button"
              onClick={() => set({ education: [...profile.education, { period: '', school: '', degree: '', description: '' }] })}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-200 transition hover:border-white/25"
            >
              <Plus className="h-3.5 w-3.5" /> 添加教育
            </button>
          </div>

          {profile.education.map((item, i) => (
            <div key={i} className="relative space-y-4 rounded-xl border border-white/[0.06] p-4">
              <button
                type="button"
                onClick={() => set({ education: profile.education.filter((_, idx) => idx !== i) })}
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-400"
                aria-label="删除"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="时间段" required>
                  <input value={item.period} onChange={(e) => setEducation(i, { period: e.target.value })} className="input" />
                </Field>
                <Field label="学校" required>
                  <input value={item.school} onChange={(e) => setEducation(i, { school: e.target.value })} className="input" />
                </Field>
                <Field label="专业 / 学位" required>
                  <input value={item.degree} onChange={(e) => setEducation(i, { degree: e.target.value })} className="input" />
                </Field>
              </div>
              <Field label="描述（可选）">
                <textarea value={item.description} onChange={(e) => setEducation(i, { description: e.target.value })} rows={2} className="input resize-none" />
              </Field>
            </div>
          ))}
          {profile.education.length === 0 && <p className="text-sm text-slate-500">暂无教育背景。</p>}
        </section>

        <div className="flex items-center gap-3">
          <button type="submit" className="btn-primary">
            保存修改
          </button>
          {saved && <span className="text-sm text-emerald-400">已保存 ✓</span>}
        </div>
      </form>
    </div>
  )
}
