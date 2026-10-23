import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useContent } from '../lib/content'
import { formatDate } from '../lib/format'
import { PageHeader } from './ui'

export default function Projects() {
  const { content, update } = useContent()
  const projects = [...content.projects].sort((a, b) => +new Date(b.date) - +new Date(a.date))

  const remove = (slug: string) => {
    if (!window.confirm('确定要删除这个项目吗？此操作不可撤销。')) return
    update((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.slug !== slug) }))
  }

  return (
    <div>
      <PageHeader
        title="项目管理"
        description="管理项目内容"
        actions={
          <Link to="/admin/projects/new" className="btn-primary">
            <Plus className="h-4 w-4" /> 新建项目
          </Link>
        }
      />

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.slug} className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              {project.cover && (
                <img src={project.cover} alt="" className="hidden h-14 w-20 shrink-0 rounded-lg border border-white/[0.06] object-cover sm:block" />
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-semibold text-white">{project.title}</h3>
                  {project.featured && (
                    <span className="shrink-0 rounded-full bg-accent/90 px-2 py-0.5 text-xs font-medium text-white">精选</span>
                  )}
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-slate-400">{project.summary}</p>
                <p className="mt-1 text-xs text-slate-500">{formatDate(project.date)}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                to={`/admin/projects/${project.slug}/edit`}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-200 transition hover:border-white/25"
              >
                编辑
              </Link>
              <button
                type="button"
                onClick={() => remove(project.slug)}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-300 transition hover:border-rose-500/50 hover:text-rose-400"
              >
                删除
              </button>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <p className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-10 text-center text-slate-400">
            暂无项目，点击「新建项目」开始添加。
          </p>
        )}
      </div>
    </div>
  )
}
