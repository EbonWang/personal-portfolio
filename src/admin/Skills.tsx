import { useState, type FormEvent } from 'react'
import { useContent } from '../lib/content'
import type { Skill } from '../lib/types'
import { Field, PageHeader } from './ui'

const EMPTY: Skill = { category: '', name: '', level: 3, icon: '', years: 1 }

export default function Skills() {
  const { content, update } = useContent()
  const [form, setForm] = useState<Skill>(EMPTY)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [error, setError] = useState('')

  const categories = [...new Set(content.skills.map((s) => s.category))]

  const set = (patch: Partial<Skill>) => setForm((f) => ({ ...f, ...patch }))

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.category.trim() || !form.name.trim()) {
      setError('请填写分类和技能名')
      return
    }
    setError('')

    const skill: Skill = {
      category: form.category.trim(),
      name: form.name.trim(),
      level: Math.min(5, Math.max(1, Number(form.level) || 1)),
      icon: form.icon.trim(),
      years: Math.max(0, Number(form.years) || 0),
    }

    update((prev) => {
      const skills = [...prev.skills]
      if (editingIndex !== null) {
        skills[editingIndex] = skill
      } else {
        skills.push(skill)
      }
      return { ...prev, skills }
    })

    setForm(EMPTY)
    setEditingIndex(null)
  }

  const startEdit = (index: number) => {
    setForm(content.skills[index])
    setEditingIndex(index)
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const remove = (index: number) => {
    if (!window.confirm('确定要删除这个技能吗？')) return
    update((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }))
    if (editingIndex === index) {
      setForm(EMPTY)
      setEditingIndex(null)
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1)
    }
  }

  return (
    <div>
      <PageHeader title="技能管理" description="管理技能分类与熟练度" />

      <form onSubmit={onSubmit} className="card mb-8 p-6">
        <h2 className="mb-4 text-base font-semibold text-white">
          {editingIndex !== null ? '编辑技能' : '新增技能'}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Field label="分类" required>
            <input value={form.category} onChange={(e) => set({ category: e.target.value })} placeholder="如：前端" className="input" />
          </Field>
          <Field label="技能名" required>
            <input value={form.name} onChange={(e) => set({ name: e.target.value })} placeholder="如：React" className="input" />
          </Field>
          <Field label="熟练度 (1-5)" required>
            <select value={form.level} onChange={(e) => set({ level: Number(e.target.value) })} className="input">
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
          <Field label="图标（可选）" hint="单个 emoji 或图标名">
            <input value={form.icon} onChange={(e) => set({ icon: e.target.value })} placeholder="如：⚛️" className="input" />
          </Field>
          <Field label="年限（可选）">
            <input type="number" min={0} value={form.years} onChange={(e) => set({ years: Number(e.target.value) })} className="input" />
          </Field>
        </div>
        {error && <p className="mt-4 rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-400">{error}</p>}
        <div className="mt-4 flex items-center gap-3">
          <button type="submit" className="btn-primary">
            {editingIndex !== null ? '更新' : '添加'}
          </button>
          {editingIndex !== null && (
            <button
              type="button"
              onClick={() => {
                setForm(EMPTY)
                setEditingIndex(null)
              }}
              className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition hover:border-white/25"
            >
              取消编辑
            </button>
          )}
        </div>
      </form>

      {categories.length === 0 && (
        <p className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-10 text-center text-slate-400">
          暂无技能，请先添加。
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((cat) => (
          <div key={cat} className="card p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent-300">{cat}</h3>
            <ul className="space-y-2">
              {content.skills.map((s, i) =>
                s.category === cat ? (
                  <li key={i} className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 transition hover:bg-white/[0.03]">
                    <span className="flex items-center gap-2.5 text-sm text-slate-200">
                      {s.icon && <span aria-hidden>{s.icon}</span>}
                      <span>{s.name}</span>
                      <span className="text-xs text-slate-500">
                        {s.years} 年 · {s.level}/5
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => startEdit(i)}
                        className="rounded-md px-2.5 py-1 text-xs text-slate-300 transition hover:bg-white/[0.06]"
                      >
                        编辑
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(i)}
                        className="rounded-md px-2.5 py-1 text-xs text-slate-300 transition hover:text-rose-400"
                      >
                        删除
                      </button>
                    </span>
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
