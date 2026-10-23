import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useContent } from '../lib/content'
import { readingTimeOf, slugify } from '../lib/slug'
import { formatDateInput } from '../lib/format'
import type { Post } from '../lib/types'
import { Field, PageHeader } from './ui'
import MarkdownEditor from './MarkdownEditor'
import ImageUpload from './ImageUpload'

export default function PostEdit() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { content, update } = useContent()

  const existing = slug ? content.posts.find((p) => p.slug === slug) : undefined
  const isNew = !existing

  const [title, setTitle] = useState(existing?.title ?? '')
  const [date, setDate] = useState(formatDateInput(existing?.date ?? new Date().toISOString()))
  const [excerpt, setExcerpt] = useState(existing?.excerpt ?? '')
  const [cover, setCover] = useState(existing?.cover ?? '')
  const [tags, setTags] = useState(existing?.tags.join(', ') ?? '')
  const [contentText, setContentText] = useState(existing?.content ?? '')
  const [error, setError] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title.trim() || !excerpt.trim() || !contentText.trim() || !date) {
      setError('请填写标题、摘要、日期与内容')
      return
    }
    setError('')

    const tagList = tags
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean)

    const newPost: Post = {
      slug: existing?.slug ?? slugify(title),
      title: title.trim(),
      excerpt: excerpt.trim(),
      date: new Date(date).toISOString(),
      tags: tagList,
      readingTime: readingTimeOf(contentText),
      content: contentText,
      cover,
    }

    update((prev) => {
      const posts = existing
        ? prev.posts.map((p) => (p.slug === existing.slug ? newPost : p))
        : [newPost, ...prev.posts]
      return { ...prev, posts }
    })

    navigate('/admin/posts')
  }

  return (
    <div>
      <Link to="/admin/posts" className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
        <ArrowLeft className="h-4 w-4" /> 返回列表
      </Link>
      <PageHeader
        title={isNew ? '新建文章' : '编辑文章'}
        description="字段说明：标题、摘要、标签、封面、日期，内容使用 Markdown"
      />

      <form onSubmit={onSubmit} className="card space-y-6 p-6">
        <Field label="标题" required>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="文章标题" className="input" />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="日期" required>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
          </Field>
          <Field label="标签" hint="以逗号分隔，如：react, 性能优化">
            <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="react, 性能优化" className="input" />
          </Field>
        </div>

        <Field label="摘要" required>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} placeholder="一句话概括文章内容" className="input resize-none" />
        </Field>

        <Field label="封面图" hint="支持 jpg / png / svg / webp 等，不超过 2MB">
          <ImageUpload value={cover} onChange={setCover} />
        </Field>

        <Field label="内容" required>
          <MarkdownEditor value={contentText} onChange={setContentText} />
        </Field>

        {error && <p className="rounded-lg bg-rose-500/10 px-3 py-2 text-sm text-rose-400">{error}</p>}

        <div className="flex items-center justify-end gap-3">
          <Link to="/admin/posts" className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-slate-300 transition hover:border-white/25">
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
