import { Link } from 'react-router-dom'
import { FileText, FolderKanban, Tag, Wrench } from 'lucide-react'
import { useContent } from '../lib/content'
import { formatDate } from '../lib/format'
import { PageHeader } from './ui'

export default function Dashboard() {
  const { content } = useContent()
  const posts = [...content.posts].sort((a, b) => +new Date(b.date) - +new Date(a.date))
  const projects = [...content.projects].sort((a, b) => +new Date(b.date) - +new Date(a.date))
  const tagCount = new Set(content.posts.flatMap((p) => p.tags)).size

  const stats = [
    { label: '文章', value: content.posts.length, icon: FileText, to: '/admin/posts' },
    { label: '项目', value: content.projects.length, icon: FolderKanban, to: '/admin/projects' },
    { label: '技能', value: content.skills.length, icon: Wrench, to: '/admin/skills' },
    { label: '标签', value: tagCount, icon: Tag, to: '/admin/posts' },
  ]

  return (
    <div>
      <PageHeader title="仪表盘" description="站点内容概览" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="card group p-5 transition hover:border-accent/40">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent-300">
                <s.icon className="h-5 w-5" />
              </span>
              <span className="text-3xl font-bold text-white">{s.value}</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="card p-6">
          <h2 className="mb-4 text-base font-semibold text-white">最近文章</h2>
          <ul className="space-y-3">
            {posts.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link to={`/admin/posts/${p.slug}/edit`} className="group flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 transition hover:bg-white/[0.03]">
                  <span className="truncate text-sm text-slate-200 group-hover:text-accent-300">{p.title}</span>
                  <span className="shrink-0 text-xs text-slate-500">{formatDate(p.date)}</span>
                </Link>
              </li>
            ))}
            {posts.length === 0 && <li className="text-sm text-slate-500">暂无文章</li>}
          </ul>
        </section>

        <section className="card p-6">
          <h2 className="mb-4 text-base font-semibold text-white">最近项目</h2>
          <ul className="space-y-3">
            {projects.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link to={`/admin/projects/${p.slug}/edit`} className="group flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 transition hover:bg-white/[0.03]">
                  <span className="truncate text-sm text-slate-200 group-hover:text-accent-300">{p.title}</span>
                  <span className="shrink-0 text-xs text-slate-500">{formatDate(p.date)}</span>
                </Link>
              </li>
            ))}
            {projects.length === 0 && <li className="text-sm text-slate-500">暂无项目</li>}
          </ul>
        </section>
      </div>
    </div>
  )
}
