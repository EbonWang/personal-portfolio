import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useContent } from '../lib/content'
import { slugify } from '../lib/slug'
import { formatDateInput } from '../lib/format'
import type { Project } from '../lib/types'
import { Field, PageHeader } from './ui'
import MarkdownEditor from './MarkdownEditor'
import ImageUpload from './ImageUpload'

export default function ProjectEdit() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { content, update } = useContent()

  const existing = slug ? content.projects.find((p) => p.slug === slug) : undefined
  const isNew = !existing

  const [title, setTitle] = useState(existing?.title ?? '')
  const [date, setDate] = useState(formatDateInput(existing?.date ?? new Date().toISOString()))
  const [summary, setSummary] = useState(existing?.summary ?? '')
  const [cover, setCover] = useState(existing?.cover ?? '')
  const [tags, setTags] = useState(existing?.tags.join(', ') ?? '')
  const [demo, setDemo] = useState(existing?.links.demo ?? '')
  const [github, setGithub] = useState(existing?.links.github ?? '')
  const [featured, setFeatured] = useState(existing?.featured ?? false)
  const [contentText, setContentText] = useState(existing?.content ?? '')
  const [error, setError] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title.trim() || !summary.trim() || !contentText.trim() || !date) {
      setError('请填写标题、摘要、日期与内容')
      return
    }
    setError('')

    const tagList = tags
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean)

    const links: Project['links'] = {}
    if (demo.trim()) links.demo = demo.trim()
    if (github.trim()) links.github = github.trim()

    const newProject: Project = {
      slug: existing?.slug ?? slugify(title),
      title: title.trim(),
      summary: summary.trim(),
      date: new Date(date).toISOString(),
      tags: tagList,
      cover,
      links,
      featured,
      content: contentText,
    }

    update((prev) => {
      const projects = existing
        ? prev.projects.map((p) => (p.slug === existing.slug ? newProject : p))
        : [newProject, ...prev.projects]
      return { ...prev, projects }
    })

    navigate('/admin/projects')
  }

  return (
    <div>
      <Link to="/admin/projects" className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
        <ArrowLeft className="h-4 w-4" /> 返回列表
      </Link>
      <PageHeader
        title={isNew ? '新建项目' : '编辑项目'}
        description="字段说明：标题、摘要、标签、封面、日期，内容使用 Markdown"
      />

      <form onSubmit={onSubmit} className="card space-y-6 p-6">
        <Field label="标题" required>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="项目名称" className="input" />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="日期" required>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
          </Field>
          <Field label="标签" hint="以逗号分隔，如：react, typescript">
            <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="react, typescript" className="input" />
          </Field>
        </div>

        <Field label="摘要" required>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={2} placeholder="一句话概括项目内容" className="input resize-none" />
        </Field>

        <Field label="封面图" hint="支持 jpg / png / svg / webp 等，不超过 2MB">
          <ImageUpload value={cover} onChange={setCover} />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="演示链接">
            <input value={demo} onChange={(e) => setDemo(e.target.value)} placeholder="https://" className="input" />
          </Field>
          <Field label="GitHub 链接">
            <input value={github} onChange={(e) => setGithub(e.target.value)} placeholder="https://github.com/" className="input" />
          </Field>
        </div>

        <label className="flex cursor-pointer items-center gap-3">
          <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/10 transition peer-checked:bg-accent">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="peer sr-only"
            />
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${featured ? 'translate-x-6' : 'translate-x-1'}`} />
          </span>
          <span className="text-sm text-slate-300">设为精选项目</span>
        </label>

        <Field label="内容" required>
          <MarkdownEditor value={contentText} onChange={setContentText} />
        </Field>

        {error && <p className="rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-400">{error}</p>}

        <div className="flex items-center justify-end gap-3">
          <Link to="/admin/projects" className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-slate-300 transition hover:border-white/25">
            取消
          </Link>
          <button type="submit" className="btn-primary">
            保存
          </button>
        </div>
      </form>
    </div>
  )
}
